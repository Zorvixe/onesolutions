require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cron = require('node-cron');

const {
  router: digitalMarketingRouter,
  createDigitalMarketingTables,
} = require("./digitalMarketingRoutes");

const {
  app: javaProgrammingApp,
  createJavaTables,
} = require("./javaProgrammingRoutes");

// -------------------------------------------
// 🔹 Database Connection
// -------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20,
});

// Test database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected successfully");
    client.release();
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// -------------------------------------------
// 🔹 Express App Setup
// -------------------------------------------
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// -------------------------------------------
// 🔹 Multer Configuration for Video Uploads (FIXED)
// -------------------------------------------
// -------------------------------------------
// 🔹 PRODUCTION SAFE UPLOAD CONFIGURATION
// -------------------------------------------
const UPLOAD_BASE_PATH =
  process.env.UPLOAD_PATH || path.join(__dirname, "uploads");
console.log(`📁 Uploads will be stored in: ${UPLOAD_BASE_PATH}`);

// Ensure directories exist
if (!fs.existsSync(UPLOAD_BASE_PATH)) {
  fs.mkdirSync(UPLOAD_BASE_PATH, { recursive: true });
}

const uploadsDir = UPLOAD_BASE_PATH; // Keep for backward compatibility

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2GB
});

// Enhanced storage configuration for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const videoDir = path.join(uploadsDir, "videos");
    if (!fs.existsSync(videoDir)) {
      fs.mkdirSync(videoDir, { recursive: true });
    }
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Preserve original extension
    const ext = path.extname(file.originalname);
    cb(null, "video-" + uniqueSuffix + ext);
  },
});

// Enhanced video upload configuration
const videoUpload = multer({
  storage: videoStorage,
  fileFilter: (req, file, cb) => {
    console.log(
      `📹 Processing video file: ${file.originalname}, MIME: ${file.mimetype}`
    );

    // Allow all video MIME types and check extension
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      console.error(`❌ Invalid file type: ${file.mimetype}`);
      cb(new Error("Only video files are allowed!"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
  },
});

// Add this helper function to check file validity
const validateVideoFile = (file) => {
  if (!file) {
    throw new Error("No video file provided");
  }

  const allowedExtensions = [
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm",
    ".wmv",
    ".flv",
    ".m4v",
  ];
  const allowedMimes = [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
    "video/webm",
    "video/x-ms-wmv",
    "video/x-flv",
    "video/mp4",
  ];

  const fileExt = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(fileExt)) {
    throw new Error(
      `Invalid file extension. Allowed: ${allowedExtensions.join(", ")}`
    );
  }

  if (!allowedMimes.includes(file.mimetype)) {
    throw new Error(`Invalid MIME type. Allowed: ${allowedMimes.join(", ")}`);
  }

  return true;
};
// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "2gb" }));
app.use(express.urlencoded({ limit: "2gb", extended: true }));

app.use("/uploads", express.static(UPLOAD_BASE_PATH));
// -------------------------------------------
// 🔹 Database Table Creation
// -------------------------------------------
const createTables = async () => {
  // Students table with new fields
  const studentsTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      student_id VARCHAR(20) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      profile_image VARCHAR(500),
      batch_month VARCHAR(20),
      batch_year INTEGER,
      join_date DATE DEFAULT CURRENT_DATE,
      status VARCHAR(20) DEFAULT 'active',
      is_current_batch BOOLEAN DEFAULT false,
      
      -- New Personal Details Fields
      name_on_certificate VARCHAR(255),
      gender VARCHAR(20),
      preferred_languages VARCHAR(255)[],
      date_of_birth DATE,
      code_playground_username VARCHAR(100),
      linkedin_profile_url VARCHAR(500),
      github_profile_url VARCHAR(500),
      hackerrank_profile_url VARCHAR(500),
      leetcode_profile_url VARCHAR(500),
      resume_url VARCHAR(500),
      
      -- Parent/Guardian Details
      parent_first_name VARCHAR(100),
      parent_last_name VARCHAR(100),
      parent_relation VARCHAR(50),
      
      -- Current Address
      address_line_1 VARCHAR(500),
      address_line_2 VARCHAR(500),
      country VARCHAR(100),
      state VARCHAR(100),
      district VARCHAR(100),
      city VARCHAR(100),
      postal_code VARCHAR(20),
      
      -- Current Expertise
      current_coding_level VARCHAR(100),
      technical_skills TEXT[],
      has_laptop BOOLEAN,
      
      -- Job Preferences
      job_search_status VARCHAR(100),
      preferred_job_locations VARCHAR(255)[],
      expected_ctc_range VARCHAR(100),
      preferred_teaching_language VARCHAR(100),
      preferred_video_language VARCHAR(100),
      
      -- Education Details
      tenth_marks_type VARCHAR(50),
      tenth_marks VARCHAR(20),
      twelfth_education_type VARCHAR(50),
      twelfth_marks_type VARCHAR(50),
      twelfth_marks VARCHAR(20),
      bachelor_degree VARCHAR(200),
      bachelor_branch VARCHAR(200),
      bachelor_cgpa VARCHAR(10),
      bachelor_start_year INTEGER,
      bachelor_end_year INTEGER,
      bachelor_status VARCHAR(100),
      bachelor_institute VARCHAR(500),
      bachelor_institute_state VARCHAR(100),
      bachelor_institute_city VARCHAR(100),
      bachelor_institute_pincode VARCHAR(20),
      bachelor_institute_district VARCHAR(100),
      
      -- Work Experience
      occupation_status VARCHAR(100),
      has_work_experience BOOLEAN,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;


  await pool.query(`
  CREATE OR REPLACE FUNCTION generate_thread_slug_function(title VARCHAR)
  RETURNS VARCHAR AS $$
  DECLARE
    base_slug VARCHAR;
    final_slug VARCHAR;
    random_str VARCHAR;
    timestamp_str VARCHAR;
  BEGIN
    random_str := substring(md5(random()::text), 1, 8);
    timestamp_str := to_char(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::integer, 'FM9999999999');
    
    base_slug := lower(title);
    base_slug := regexp_replace(base_slug, '[^a-z0-9\\s-]', '', 'g');
    base_slug := regexp_replace(base_slug, '\\s+', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(both '-' from base_slug);
    base_slug := substring(base_slug from 1 for 100);
    
    IF base_slug = '' THEN
      base_slug := 'thread';
    END IF;
    
    final_slug := base_slug || '-' || timestamp_str || '-' || random_str;
    RETURN final_slug;
  END;
  $$ LANGUAGE plpgsql;
`);

  // Work Experience table
  const workExperiencesTableQuery = `
    CREATE TABLE IF NOT EXISTS student_work_experiences (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      company_name VARCHAR(500) NOT NULL,
      job_role VARCHAR(500) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE,
      is_current BOOLEAN DEFAULT false,
      job_type VARCHAR(100),
      job_sector VARCHAR(100),
      key_skills TEXT[],
      work_location VARCHAR(200),
      role_description TEXT,
      achievements TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(workExperiencesTableQuery);
  console.log("✅ Student work experiences table ready");

  // Student progress table
  const progressTableQuery = `
    CREATE TABLE IF NOT EXISTS student_content_progress (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      content_id VARCHAR(500) NOT NULL,
      goal_name VARCHAR(500),
      course_name VARCHAR(500),
      completed BOOLEAN DEFAULT false,
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, content_id)
    );
  `;

  // Projects table
  const projectsTableQuery = `
    CREATE TABLE IF NOT EXISTS student_projects (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      project_title VARCHAR(500) NOT NULL,
      project_description TEXT,
      project_link VARCHAR(500),
      skills TEXT[],
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Achievements table
  const achievementsTableQuery = `
    CREATE TABLE IF NOT EXISTS student_achievements (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      achievement_title VARCHAR(500) NOT NULL,
      achievement_description TEXT,
      achievement_link VARCHAR(500),
      achievement_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const otpTableQuery = `
    CREATE TABLE IF NOT EXISTS otp_store (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      otp VARCHAR(10) NOT NULL,
      purpose VARCHAR(50) NOT NULL,
      attempts INTEGER DEFAULT 0,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const codingPracticeProgressTableQuery = `
    CREATE TABLE IF NOT EXISTS coding_practice_progress (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      practice_id VARCHAR(100) NOT NULL,
      question_id VARCHAR(100) NOT NULL,
      language VARCHAR(50) NOT NULL,
      status VARCHAR(20) DEFAULT 'unsolved',
      code TEXT,
      score INTEGER DEFAULT 0,
      attempts JSONB DEFAULT '[]',
      last_attempt TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, question_id)
    );
  `;

  const codingPracticeCompletionTableQuery = `
    CREATE TABLE IF NOT EXISTS coding_practice_completion (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      practice_id VARCHAR(100) NOT NULL,
      goal_name VARCHAR(500),
      course_name VARCHAR(500),
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, practice_id)
    );
  `;

  // ==========================================
  // 🔹 DISCUSSION SYSTEM - TABLES CREATION
  // ==========================================

  const discussionThreadsTableQuery = `
  CREATE TABLE IF NOT EXISTS discussion_threads (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    subtopic_id VARCHAR(500) NOT NULL,
    module_name VARCHAR(500),
    topic_name VARCHAR(500),
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'open',
    is_important BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    thread_slug VARCHAR(255) NOT NULL UNIQUE
  );
`;

  // Add this trigger to automatically generate slugs if not provided
  const addSlugTriggerQuery = `
  CREATE OR REPLACE FUNCTION generate_thread_slug()
  RETURNS TRIGGER AS $$
  BEGIN
    -- If thread_slug is not provided, generate one
    IF NEW.thread_slug IS NULL OR NEW.thread_slug = '' THEN
      NEW.thread_slug := generate_thread_slug_function(NEW.title);
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS set_thread_slug_trigger ON discussion_threads;
  CREATE TRIGGER set_thread_slug_trigger
  BEFORE INSERT ON discussion_threads
  FOR EACH ROW
  EXECUTE FUNCTION generate_thread_slug();
`;

  await pool.query(`
ALTER TABLE students
ADD COLUMN IF NOT EXISTS student_type VARCHAR(250)
DEFAULT 'zorvixe_core'
CHECK (student_type IN (
  'zorvixe_core',
  'zorvixe_pro',
  'zorvixe_elite'
));
`);
  // In the students table creation query, add this field after student_type:
  await pool.query(`
  ALTER TABLE students
  ADD COLUMN IF NOT EXISTS course_selection VARCHAR(250)
  DEFAULT 'web_development'
  CHECK (course_selection IN (
    'web_development',
    'digital_marketing',
    'java_programming'
  ));
  `);

  await pool.query(`
       SELECT id, student_id, course_selection 
FROM students 
WHERE course_selection IS NULL 
   OR course_selection NOT IN ('web_development', 'digital_marketing', 'java_programming');

   -- Update NULL values to default
UPDATE students 
SET course_selection = 'web_development' 
WHERE course_selection IS NULL;

-- Update any other invalid values
UPDATE students 
SET course_selection = 'web_development' 
WHERE course_selection NOT IN ('web_development', 'digital_marketing', 'java_programming');
      `);

  const aiChatSessions = `
  CREATE TABLE IF NOT EXISTS ai_chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    title VARCHAR(255) DEFAULT 'New Discussion',
    messages JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ai_sessions_student ON ai_chat_sessions(student_id);

  `;


  // ==========================================
  // 🔹 PASSWORD INTEGRITY & AUDIT SYSTEM (NEVER EXPIRES)
  // ==========================================
  const passwordSecurityQuery = `
  -- Audit log table (no pgcrypto needed)
  CREATE TABLE IF NOT EXISTS password_change_log (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(100),
    source VARCHAR(50),
    old_hash VARCHAR(255),
    new_hash VARCHAR(255)
  );

  -- Function to log password changes
  CREATE OR REPLACE FUNCTION log_password_change()
  RETURNS TRIGGER AS $$
  BEGIN
    IF OLD.password IS DISTINCT FROM NEW.password THEN
      INSERT INTO password_change_log 
        (student_id, changed_by, source, old_hash, new_hash)
      VALUES (
        NEW.id, 
        COALESCE(current_setting('myapp.changed_by', true), 'system'), 
        COALESCE(current_setting('myapp.change_source', true), 'unknown'),
        OLD.password, 
        NEW.password
      );
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS password_change_trigger ON students;
  CREATE TRIGGER password_change_trigger
  AFTER UPDATE OF password ON students
  FOR EACH ROW
  EXECUTE FUNCTION log_password_change();

  -- Block any password change that doesn't come from application
  CREATE OR REPLACE FUNCTION block_unauthorized_password_change()
  RETURNS TRIGGER AS $$
  BEGIN
    IF TG_OP = 'UPDATE' AND OLD.password IS DISTINCT FROM NEW.password THEN
      IF current_setting('myapp.change_source', true) IS NULL THEN
        RAISE EXCEPTION 'Password changes are only allowed via application. Set myapp.change_source.';
      END IF;
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  DROP TRIGGER IF EXISTS block_unauthorized_password_change_trigger ON students;
  CREATE TRIGGER block_unauthorized_password_change_trigger
  BEFORE UPDATE OF password ON students
  FOR EACH ROW
  EXECUTE FUNCTION block_unauthorized_password_change();
`;
  await pool.query(passwordSecurityQuery);
  console.log("✅ Password audit & block system ready (pgcrypto‑free)");

  // In your createTables function, after creating the discussion_threads table:
  try {
    // Ensure no null slugs exist
    const nullSlugsCheck = await pool.query(`
    UPDATE discussion_threads 
    SET thread_slug = generate_thread_slug_function(title)
    WHERE thread_slug IS NULL OR thread_slug = ''
  `);

    if (nullSlugsCheck.rowCount > 0) {
      console.log(
        `✅ Fixed ${nullSlugsCheck.rowCount} threads with null slugs`
      );
    }
  } catch (error) {
    console.error("Error fixing null slugs:", error.message);
  }

  try {
    // Check if column exists
    const checkResult = await pool.query(`
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name='discussion_threads' AND column_name='thread_slug'
  `);

    if (checkResult.rows.length === 0) {
      // Add the column as nullable first
      await pool.query(`
      ALTER TABLE discussion_threads 
      ADD COLUMN thread_slug VARCHAR(255)
    `);
      console.log("✅ Added thread_slug column");

      // Generate slugs for existing rows
      const existingThreads = await pool.query(
        "SELECT id, title FROM discussion_threads WHERE thread_slug IS NULL"
      );

      for (const thread of existingThreads.rows) {
        const slug = generateThreadSlug(thread.title);
        await pool.query(
          "UPDATE discussion_threads SET thread_slug = $1 WHERE id = $2",
          [slug, thread.id]
        );
      }

      // Now make it unique and not null
      await pool.query(`
      ALTER TABLE discussion_threads 
      ALTER COLUMN thread_slug SET NOT NULL,
      ADD CONSTRAINT thread_slug_unique UNIQUE (thread_slug)
    `);
      console.log("✅ Updated thread_slug constraints");
    } else {
      console.log("✅ thread_slug column already exists");
    }
  } catch (columnError) {
    console.error(
      "❌ Error setting up thread_slug column:",
      columnError.message
    );
  }

  const discussionRepliesTableQuery = `
  CREATE TABLE IF NOT EXISTS discussion_replies (
    id SERIAL PRIMARY KEY,
    thread_id INTEGER REFERENCES discussion_threads(id) ON DELETE CASCADE,
    replied_by_student INTEGER REFERENCES students(id) ON DELETE CASCADE,
    replied_by_admin INTEGER, -- Store admin ID (no foreign key since admin DB is separate)
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  const feedbackTableQuery = `
CREATE TABLE IF NOT EXISTS student_feedback (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  subtopic_id VARCHAR(500) NOT NULL,
  module_name VARCHAR(500),
  topic_name VARCHAR(500),
  rating_understanding INTEGER CHECK (rating_understanding >= 1 AND rating_understanding <= 5),
  rating_instructor INTEGER CHECK (rating_instructor >= 1 AND rating_instructor <= 5),
  rating_pace INTEGER CHECK (rating_pace >= 1 AND rating_pace <= 5),
  feedback_text TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

  // Create class_videos table
  const classVideosTableQuery = `
  CREATE TABLE IF NOT EXISTS class_videos (
    id SERIAL PRIMARY KEY,
    subtopic_id VARCHAR(500) UNIQUE NOT NULL,
    video_title VARCHAR(500) NOT NULL,
    video_description TEXT,
    video_url VARCHAR(1000) NOT NULL,
    video_type VARCHAR(50) DEFAULT 'youtube', -- youtube, vimeo, uploaded
    module_name VARCHAR(500),
    topic_name VARCHAR(500),
    duration INTEGER, -- in seconds
    thumbnail_url VARCHAR(1000),
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER REFERENCES students(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  // Code snippets table
  const codeSnippetsTableQuery = `
  CREATE TABLE IF NOT EXISTS code_snippets (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    snippet_name VARCHAR(255) NOT NULL,
    language VARCHAR(50) NOT NULL,
    html_code TEXT,
    css_code TEXT,
    javascript_code TEXT,
    python_code TEXT,
    java_code TEXT,
    sql_code TEXT,
    is_public BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    tags TEXT[] DEFAULT '{}',
    description TEXT,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

  // Code snippet likes table
  const snippetLikesTableQuery = `
  CREATE TABLE IF NOT EXISTS code_snippet_likes (
    id SERIAL PRIMARY KEY,
    snippet_id INTEGER REFERENCES code_snippets(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(snippet_id, student_id)
  );
`;

  // AI Learning Content Table
  const aiContentTableQuery = `
    CREATE TABLE IF NOT EXISTS ai_learning_content (
      id SERIAL PRIMARY KEY,
      category VARCHAR(100) NOT NULL,
      subcategory VARCHAR(100),
      title VARCHAR(500) NOT NULL,
      content TEXT NOT NULL,
      keywords TEXT[] DEFAULT '{}',
      content_type VARCHAR(50) DEFAULT 'text',
      file_url VARCHAR(500),
      priority INTEGER DEFAULT 1,
      is_active BOOLEAN DEFAULT true,
      created_by INTEGER REFERENCES students(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Student Questions Knowledge Base
  const studentQuestionsTableQuery = `
    CREATE TABLE IF NOT EXISTS student_questions_kb (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      question TEXT NOT NULL,
      answer TEXT,
      category VARCHAR(100),
      tags TEXT[] DEFAULT '{}',
      is_important BOOLEAN DEFAULT false,
      status VARCHAR(50) DEFAULT 'pending',
      asked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      answered_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Content Categories Table
  const contentCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS ai_content_categories (
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      icon_url VARCHAR(500),
      parent_category VARCHAR(100),
      is_active BOOLEAN DEFAULT true,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Inside createTables(), after other tables
  const resumeTableQuery = `
      CREATE TABLE IF NOT EXISTS student_resumes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        target_role VARCHAR(255),
        company VARCHAR(255),
        resume_data JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_resumes_student ON student_resumes(student_id);
    `;
  await pool.query(resumeTableQuery);
  console.log("✅ Student resumes table ready");

  try {
    await pool.query(aiContentTableQuery);
    console.log("✅ AI Learning Content table ready");

    await pool.query(studentQuestionsTableQuery);
    console.log("✅ Student Questions KB table ready");

    await pool.query(contentCategoriesTableQuery);
    console.log("✅ Content Categories table ready");

    // Insert default categories
    await insertDefaultCategories();
  } catch (error) {
    console.error("❌ New tables creation error:", error.message);
  }

  // Add to your existing createTables function
  try {
    await pool.query(codeSnippetsTableQuery);
    console.log("✅ Code snippets table ready");

    await pool.query(snippetLikesTableQuery);
    console.log("✅ Code snippet likes table ready");
  } catch (error) {
    console.error("❌ Code snippets table creation error:", error.message);
  }

  // Add to createTables function
  (async () => {
    try {
      await pool.query(classVideosTableQuery);
      console.log("✅ Class videos table ready");
    } catch (error) {
      console.error("❌ Class videos table creation error:", error.message);
    }
  })();

  (async () => {
    try {
      await pool.query(feedbackTableQuery);
      console.log("✅ Student feedback table ready");
    } catch (error) {
      console.error("❌ Feedback table creation error:", error.message);
    }
  })();

  try {
    await checkAndAddMissingColumns();

    await pool.query(aiChatSessions);
    console.log("Ai Chat Table Queries");

    // Add to your createTables function
    await pool.query(discussionThreadsTableQuery);
    console.log("✅ Discussion threads table ready");
    await pool.query(discussionRepliesTableQuery);
    console.log("✅ Discussion replies table ready");

    await pool.query(studentsTableQuery);
    console.log("✅ Students table ready");

    await pool.query(progressTableQuery);
    console.log("✅ Student progress table ready");

    await pool.query(projectsTableQuery);
    console.log("✅ Student projects table ready");

    await pool.query(achievementsTableQuery);
    console.log("✅ Student achievements table ready");

    await pool.query(otpTableQuery);
    console.log("✅ OTP store table ready");

    await pool.query(codingPracticeProgressTableQuery);
    console.log("✅ Coding practice progress table ready");

    await pool.query(codingPracticeCompletionTableQuery);
    console.log("✅ Coding practice completion table ready");
  } catch (error) {
    console.error("❌ Table creation error:", error.message);
    throw error;
  }
};


// -------------------------------------------
// 🔹 JWT Token Generator
// -------------------------------------------
// -------------------------------------------
// 🔹 JWT Token Generator (Updated)
// -------------------------------------------
const generateToken = (id) => {
  const JWT_SECRET =
    process.env.JWT_SECRET ||
    "your-fallback-secret-key-for-development-only-change-in-production";

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
    issuer: "onesolutions-backend",
    subject: id.toString(),
  });
};

// -------------------------------------------
// 🔹 Auth Middleware
// -------------------------------------------
// -------------------------------------------
// 🔹 Enhanced Auth Middleware
// -------------------------------------------
// -------------------------------------------
// 🔹 ENHANCED AUTH MIDDLEWARE WITH FULL STUDENT DATA
// -------------------------------------------
const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    console.log(`🔐 Auth attempt - Token present: ${!!token}`);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }

    // Extract token from Bearer format
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const JWT_SECRET =
      process.env.JWT_SECRET ||
      "your-fallback-secret-key-for-development-only-change-in-production";

    if (!JWT_SECRET) {
      console.error("❌ JWT_SECRET is not configured");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    console.log(
      `🔐 Verifying token with secret: ${JWT_SECRET ? "Set" : "Not set"}`
    );

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(`✅ Token decoded for user ID: ${decoded.id}`);

    // 🔥 FIXED: Include ALL student fields including student_type and course_selection
    const result = await pool.query(
      `SELECT id, student_id, email, first_name, last_name, phone, 
              profile_image, student_type, course_selection, batch_month, batch_year, is_current_batch,
              name_on_certificate, gender, preferred_languages, date_of_birth,
              code_playground_username, linkedin_profile_url, github_profile_url,
              hackerrank_profile_url, leetcode_profile_url, resume_url,
              parent_first_name, parent_last_name, parent_relation,
              address_line_1, address_line_2, country, state, district, city, postal_code,
              current_coding_level, technical_skills, has_laptop,
              job_search_status, preferred_job_locations, expected_ctc_range,
              preferred_teaching_language, preferred_video_language,
              tenth_marks_type, tenth_marks, twelfth_education_type, twelfth_marks_type,
              twelfth_marks, bachelor_degree, bachelor_branch, bachelor_cgpa,
              bachelor_start_year, bachelor_end_year, bachelor_status,
              bachelor_institute, bachelor_institute_state, bachelor_institute_city,
              bachelor_institute_pincode, bachelor_institute_district,
              occupation_status, has_work_experience,
              created_at 
       FROM students WHERE id = $1 AND status = 'active'`,
      [decoded.id]
    );

    if (result.rows.length === 0) {
      console.log(`❌ User not found or inactive: ${decoded.id}`);
      return res.status(401).json({
        success: false,
        message: "User not found or account inactive",
      });
    }

    req.student = result.rows[0];
    console.log(`✅ Auth successful for: ${req.student.email}`);
    console.log(
      `📊 Student Type: ${req.student.student_type}, Course: ${req.student.course_selection}`
    );
    next();
  } catch (error) {
    console.error("🔐 Auth middleware error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token - please login again",
        error: "invalid_token",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired - please login again",
        error: "token_expired",
      });
    } else if (error.name === "NotBeforeError") {
      return res.status(401).json({
        success: false,
        message: "Token not active",
        error: "token_not_active",
      });
    }

    res.status(401).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    });
  }
};

// Helper function to generate unique slug
function generateThreadSlug(title) {
  if (!title) {
    throw new Error("Title is required to generate slug");
  }

  const randomString = crypto.randomBytes(4).toString("hex");
  const timestamp = Date.now().toString(36);

  // Create slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim() // Trim whitespace
    .substring(0, 100); // Limit length

  // If slug is empty (e.g., title was all special characters), use fallback
  const finalSlug = slug || "thread";

  return `${finalSlug}-${timestamp}-${randomString}`;
}
// -------------------------------------------
// 🔹 Email Configuration with Better Error Handling
// -------------------------------------------
const otpStore = new Map();
const otpExpiryTime = 5 * 60 * 1000; // 5 minutes

// Improved email transporter with better configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER || "onesolutionsekam@gmail.com",
      pass: process.env.SMTP_PASS || "qwns ptkl ntht beda",
    },
    // Better timeout settings
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    // Retry logic
    maxConnections: 5,
    maxMessages: 100,
  });
};

let transporter = createTransporter();

// Verify transporter on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Email transporter verification failed:", error);
  } else {
    console.log("✅ Email transporter is ready to send messages");
  }
});

// Enhanced sendOtpEmail function with timeout and retry
async function sendOtpEmail(email, otp, purpose) {
  return new Promise(async (resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("Email sending timeout after 25 seconds"));
    }, 25000);

    try {
      const mailOptions = {
        from: `"OneSolutians" <${process.env.SMTP_USER || "onesolutionsekam@gmail.com"
          }>`,
        to: email,
        subject: `${purpose} OTP Verification - OneSolutians`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">OneSolutians - OTP Verification</h2>
            <p>Your OTP for ${purpose} is:</p>
            <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This OTP is valid for 5 minutes.</p>
            <p style="color: #6b7280; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
          </div>
        `,
      };

      const result = await transporter.sendMail(mailOptions);
      clearTimeout(timeout);
      console.log(`✅ OTP email sent to ${email}:`, result.messageId);
      resolve(true);
    } catch (error) {
      clearTimeout(timeout);
      console.error("❌ Email sending error:", error);

      // Try to recreate transporter if there's an issue
      if (error.code === "EAUTH" || error.code === "ECONNECTION") {
        console.log("🔄 Recreating email transporter...");
        transporter = createTransporter();
      }

      reject(new Error(`Failed to send OTP email: ${error.message}`));
    }
  });
}

// Generate OTP helper
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store OTP with expiry
function storeOtp(email, otp, purpose) {
  const key = `${email}_${purpose}`;
  otpStore.set(key, {
    otp,
    expiresAt: Date.now() + otpExpiryTime,
    attempts: 0, // Track verification attempts
  });
}

// Verify OTP with attempt tracking
function verifyOtp(email, otp, purpose) {
  const key = `${email}_${purpose}`;
  const data = otpStore.get(key);

  if (!data) return { valid: false, message: "OTP not found or expired" };

  if (data.expiresAt < Date.now()) {
    otpStore.delete(key);
    return { valid: false, message: "OTP expired" };
  }

  // Track attempts to prevent brute force
  data.attempts += 1;
  if (data.attempts > 5) {
    otpStore.delete(key);
    return { valid: false, message: "Too many attempts. OTP invalidated." };
  }

  if (data.otp === otp) {
    otpStore.delete(key);
    return { valid: true, message: "OTP verified" };
  }

  return { valid: false, message: "Invalid OTP" };
}

// Get remaining OTP attempts
function getOtpAttempts(email, purpose) {
  const key = `${email}_${purpose}`;
  const data = otpStore.get(key);
  return data ? 5 - data.attempts : 0;
}

// Clean expired OTPs (run periodically)
function cleanExpiredOtps() {
  const now = Date.now();
  for (let [key, data] of otpStore.entries()) {
    if (data.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}

// Run cleanup every minute
setInterval(cleanExpiredOtps, 60 * 1000);



// Helper to generate PDF from resume data using the selected template
const generateResumePDF = async (resumeData, templateId = 1) => {
  let browser = null;
  try {
    console.log(`📄 Generating PDF with template ID: ${templateId}`);
    console.log('📄 Resume data received:', JSON.stringify(resumeData).substring(0, 200) + '...');

    // Launch browser with better options for production
    const launchOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    };

    // Try to find Chrome in various locations
    const possiblePaths = [
      process.env.PUPPETEER_EXECUTABLE_PATH,
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
      '/snap/bin/chromium',
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ].filter(Boolean);

    const fs = require('fs');
    for (const path of possiblePaths) {
      if (path && fs.existsSync(path)) {
        launchOptions.executablePath = path;
        console.log(`✅ Found Chrome at: ${path}`);
        break;
      }
    }

    console.log('🚀 Launching browser...');
    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({
      width: 1240,
      height: 1754,
      deviceScaleFactor: 2
    });

    // Generate HTML
    const htmlContent = generateTemplateHTML(resumeData, templateId);

    // Load HTML
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Generate PDF with proper settings
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      },
      preferCSSPageSize: true
    });

    console.log(`✅ PDF generated successfully (${pdfBuffer.length} bytes)`);

    // Ensure we're returning a proper buffer
    return Buffer.from(pdfBuffer);

  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    console.error('Error stack:', error.stack);
    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
      console.log('✅ Browser closed');
    }
  }
};

// Helper function to generate HTML for each template
const generateTemplateHTML = (resumeData, templateId) => {
  const data = resumeData;

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Helper function to join array
  const joinArray = (arr, separator = ', ') => {
    return Array.isArray(arr) ? arr.join(separator) : arr || '';
  };

  // Template 1: Classic
  const template1HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.header?.fullName || 'Resume'} - Resume</title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,700;1,400&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Spectral", serif;
        line-height: 1.4;
        color: #000;
        background-color: #fff;
      }

      @page {
        size: 8.5in 11in;
        margin: 0.6in;
      }

      .resume-container {
        padding: 0.6in;
        background-color: #fff;
      }

      /* Header Styles */
      .header {
        text-align: center;
        margin-bottom: 20pt;
      }

      .name {
        font-size: 1.75rem;
        font-weight: 700;
        margin-bottom: 4pt;
      }

      .designation {
        font-size: 15pt;
        font-weight: 700;
        margin-bottom: 8pt;
      }

      .contact-info {
        font-size: 10pt;
        color: #000;
      }

      /* Section Styles */
      .section {
        margin-bottom: 16pt;
      }

      .section-title {
        font-size: 11pt;
        font-weight: 700;
        border-bottom: 0.8pt solid #000;
        padding-bottom: 1pt;
        margin-bottom: 8pt;
        text-transform: uppercase;
      }

      .section-content {
        font-size: 10pt;
        line-height: 1.2;
      }

      /* Experience Styles */
      .experience-item {
        margin-bottom: 12pt;
      }

      .experience-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2pt;
      }

      .company-location {
        font-weight: 700;
        font-size: 10pt;
      }

      .position-dates {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4pt;
      }

      .position {
        font-weight: 700;
        font-size: 10pt;
      }

      .dates {
        font-weight: 700;
        font-size: 10pt;
      }

      .description {
        margin-left: 18pt;
        position: relative;
      }

      .description:before {
        content: "•";
        position: absolute;
        left: -12pt;
      }

      /* Education Styles */
      .education-item {
        margin-bottom: 8pt;
      }

      .education-item h4 {
        font-size: 10pt;
        font-weight: 700;
        margin-bottom: 2pt;
      }

      .education-details {
        font-size: 10pt;
        margin-bottom: 2pt;
      }

      .education-meta {
        font-size: 10pt;
        color: #666;
      }

      /* Skills Styles */
      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8pt;
      }

      .skill-tag {
        background-color: #f0f0f0;
        padding: 4pt 8pt;
        border-radius: 4pt;
        font-size: 9pt;
        border: 1pt solid #ddd;
      }

      /* List Styles */
      .custom-list {
        list-style: none;
        margin-left: 18pt;
      }

      .custom-list li {
        position: relative;
        margin-bottom: 4pt;
      }

      .custom-list li:before {
        content: "•";
        position: absolute;
        left: -12pt;
      }

      /* Project Styles */
      .project-item {
        margin-bottom: 12pt;
      }

      .project-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2pt;
      }

      .project-name {
        font-weight: 700;
        font-size: 10pt;
      }

      .project-dates {
        font-weight: 700;
        font-size: 10pt;
      }

      .project-institution {
        font-weight: 700;
        font-size: 10pt;
        margin-bottom: 4pt;
      }

      /* Certification Styles */
      .certification-item {
        margin-bottom: 8pt;
      }

      .cert-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2pt;
      }

      .cert-name {
        font-weight: 700;
        font-size: 10pt;
      }

      .cert-date {
        font-weight: 700;
        font-size: 10pt;
      }

      .cert-institution {
        font-size: 10pt;
      }

      /* Utility Classes */
      .spacer {
        height: 8pt;
      }

      .small-spacer {
        height: 4pt;
      }
    </style>
    </head>
    <body>
    <div class="resume-container">
      <!-- Header Section -->
      <div class="header">
        <div class="name">${data.header?.fullName || ''}</div>
        <div class="designation">${data.header?.designation || ''}</div>
        <div class="contact-info">
          ${data.header?.location || ''} ${data.header?.location ? '•' : ''} ${data.header?.email || ''} ${data.header?.email && data.header?.phone ? '•' : ''} ${data.header?.phone || ''}
        </div>
      </div>

      <!-- Summary Section (only if exists) -->
      ${data.summary?.text ? `
      <div class="section">
        <div class="section-title">Summary</div>
        <div class="section-content">${data.summary.text}</div>
      </div>
      ` : ''}

      <!-- Professional Experience Section (only if experience exists) -->
      ${data.experience?.length ? `
      <div class="section">
        <div class="section-title">Professional Experience</div>
        <div class="section-content">
          ${data.experience.map(exp => `
          <div class="experience-item">
            <div class="experience-header">
              <span class="company-location">${exp.company || ''}</span>
              <span class="company-location">${exp.location || ''}</span>
            </div>
            <div class="position-dates">
              <span class="position">${exp.title || ''}</span>
              <span class="dates">${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
            </div>
            <div class="description">${exp.description || ''}</div>
            ${exp.achievements ? `
            <div class="description" style="margin-top: 2pt;">Achievements: ${exp.achievements}</div>
            ` : ''}
          </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Selected Project Experience Section (only if projects exist) -->
      ${data.additional?.projects?.length ? `
      <div class="section">
        <div class="section-title">Project Experience</div>
        <div class="section-content">
          ${data.additional.projects.map(project => `
          <ul class="custom-list">
            <li><strong>${project.title || ''}</strong></li>
            <li style="margin-left: 18pt">${project.description || ''}</li>
            ${project.skills ? `
            <li style="margin-left: 18pt; list-style: none; margin-top: 2pt;">Skills: ${joinArray(project.skills)}</li>
            ` : ''}
            ${project.link ? `
            <li style="margin-left: 18pt; list-style: none; font-size: 9pt;">Link: ${project.link}</li>
            ` : ''}
          </ul>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Achievements & Certifications Section (only if exists) -->
      ${data.additional?.certifications?.length ? `
      <div class="section">
        <div class="section-title">Certifications</div>
        <div class="section-content">
          ${data.additional.certifications.map(cert => `
          <div class="certification-item">
            <div class="cert-header">
              <span class="cert-name">${cert.title || ''}</span>
              <span class="cert-date">${cert.date || ''}</span>
            </div>
            <div class="cert-institution">${cert.issuer || ''}</div>
          </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Education Section -->
      <div class="section">
        <div class="section-title">Education</div>
        <div class="section-content">
          ${data.education?.tenth?.marks ? `
          <div class="education-item">
            <h4>10th Grade</h4>
            <div class="education-details">
              ${data.education.tenth.school || ''} ${data.education.tenth.marksType ? ',' : ''} ${data.education.tenth.marksType || ''}: ${data.education.tenth.marks || ''}${data.education.tenth.percentage ? ` (${data.education.tenth.percentage}%)` : ''}
            </div>
            ${data.education.tenth.year ? `
            <div class="education-meta">
              Year of Passout: ${data.education.tenth.year}
            </div>
            ` : ''}
          </div>
          ` : ''}

          ${data.education?.twelfth?.marks ? `
          <div class="education-item">
            <h4>12th Grade</h4>
            <div class="education-details">
              ${data.education.twelfth.institute || ''} ${data.education.twelfth.marksType ? ',' : ''} ${data.education.twelfth.marksType || ''}: ${data.education.twelfth.marks || ''}${data.education.twelfth.percentage ? ` (${data.education.twelfth.percentage}%)` : ''}
            </div>
            ${data.education.twelfth.year ? `
            <div class="education-meta">
              Year of Passout: ${data.education.twelfth.year}
            </div>
            ` : ''}
          </div>
          ` : ''}

          ${data.education?.bachelor?.degree ? `
          <div class="education-item">
            <h4>Undergraduate</h4>
            <div class="education-details">
              ${data.education.bachelor.institute || ''}, ${data.education.bachelor.degree || ''}${data.education.bachelor.branch ? ` in ${data.education.bachelor.branch}` : ''}
            </div>
            <div class="education-meta">
              Year of Passout: ${data.education.bachelor.endYear || ''}${data.education.bachelor.cgpa ? `, CGPA: ${data.education.bachelor.cgpa}` : ''}
            </div>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Skills Section (only if skills exist) -->
      ${data.skills?.length ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="section-content">
          <div class="skills-container">
            ${data.skills.map(skill => `
            <span class="skill-tag">${skill}</span>
            `).join('')}
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Languages Section (only if languages exist) -->
      ${data.additional?.languages?.length ? `
      <div class="section">
        <div class="section-title">Languages</div>
        <div class="section-content">
          <ul class="custom-list">
            ${data.additional.languages.map(lang => `
            <li>${lang.language || ''}${lang.proficiency ? ` (${lang.proficiency})` : ''}</li>
            `).join('')}
          </ul>
        </div>
      </div>
      ` : ''}

      <!-- Websites & Links Section (only if exists) -->
      ${data.additional?.websites?.length ? `
      <div class="section">
        <div class="section-title">Online Profiles</div>
        <div class="section-content">
          <ul class="custom-list">
            ${data.additional.websites.map(site => `
            <li>${site.label || ''}: ${site.url || ''}</li>
            `).join('')}
          </ul>
        </div>
      </div>
      ` : ''}
    </div>
    </body>
    </html>
  `;

  // Template 2: Modern
  const template2HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
      @media print {
        @page {
          size: A4;
          margin: 0;
        }

        body {
          margin: 0;
        }
      }

      * {
        margin: 0;
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .resume-container {
        width: 100%;
        margin: 0 auto;
        padding: 2rem;
        background: white;
        box-sizing: border-box;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      }

      .header {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .header h1 {
        font-size: 1.875rem;
        font-weight: 600;
        color: #111827;
      }

      .header h2 {
        font-size: 1.25rem;
        font-weight: 400;
        color: #374151;
      }

      .contact-info {
        margin-top: 0.5rem;
        color: #4b5563;
        font-weight: 300;
      }

      .social-links {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .social-links a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 400;
      }

      .social-links a:hover {
        text-decoration: underline;
      }

      .content-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .section-title {
        font-size: 1.125rem;
        font-weight: 700;
        border-bottom: 2px solid #d1d5db;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
      }

      .education-item {
        padding: 0.5rem;
        border-radius: 6px;
      }

      .education-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
        margin-top: 0.3rem;
      }

      .education-meta {
        color: #4b5563;
        font-weight: 300;
        font-size: 0.875rem;
      }

      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .skill-tag {
        padding: 0.3rem 0.8rem;
        background: #dbeafe;
        border-radius: 9999px;
        font-weight: 400;
      }

      .project-item {
        padding: 1rem;
        border-radius: 6px;
      }

      .project-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
      }

      .project-meta {
        color: #4b5563;
        font-weight: 300;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .certificate-item {
        padding: 1rem;
        border-radius: 6px;
      }

      .certificate-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
      }

      .certificate-meta {
        color: #4b5563;
        font-weight: 300;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .experience-item {
        padding: 1rem;
        border-radius: 6px;
      }

      .experience-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
      }

      .experience-meta {
        color: #4b5563;
        font-weight: 300;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      /* Additional styles for better hierarchy */
      p {
        font-weight: 300;
        line-height: 1.5;
        color: #374151;
      }

      .custom-list {
        list-style: none;
        margin-left: 1rem;
      }

      .custom-list li {
        position: relative;
        margin-bottom: 0.3rem;
        padding-left: 1.2rem;
      }

      .custom-list li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #374151;
      }

      .company-name,
      .institution-name {
        font-weight: 400;
        color: #1f2937;
      }

      .summary-text {
        font-weight: 300;
        line-height: 1.6;
        padding: 0.5rem;
        color: #374151;
      }
    </style>
    </head>
    <body>

    <div class="resume-container">
      <header class="header">
        <h1>${data.header?.fullName || ''}</h1>
        ${data.header?.designation ? `
        <h2>${data.header.designation}</h2>
        ` : ''}
        <p class="contact-info">
          ${data.header?.location || ''}
          ${data.header?.location && data.header?.phone ? ' • ' : ''}
          ${data.header?.phone || ''}
          ${(data.header?.phone && data.header?.email) || (data.header?.location && data.header?.email) ? ' • ' : ''}
          ${data.header?.email || ''}
        </p>
        <div class="social-links">
          ${data.header?.linkedin ? `
          <a href="${data.header.linkedin}" target="_blank">LinkedIn</a>
          ` : ''}
          ${data.header?.github ? `
          <a href="${data.header.github}" target="_blank">GitHub</a>
          ` : ''}
          ${data.header?.portfolio ? `
          <a href="${data.header.portfolio}" target="_blank">Portfolio</a>
          ` : ''}
        </div>
      </header>

      <div class="content-grid">
        ${data.summary?.text ? `
        <section>
          <h3 class="section-title">Summary</h3>
          <p class="summary-text">${data.summary.text}</p>
        </section>
        ` : ''}

        ${data.experience?.length ? `
        <section>
          <h3 class="section-title">Experience</h3>
          ${data.experience.map(exp => `
          <div class="experience-item">
            <h4>${exp.title || ''}</h4>
            <p class="company-name">${exp.company || ''}${exp.location ? `, ${exp.location}` : ''}</p>
            <p class="experience-meta">
              ${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
            </p>
            <p>${exp.description || ''}</p>
            ${exp.achievements ? `
            <p style="margin-top: 0.5rem; font-style: italic;">Achievements: ${exp.achievements}</p>
            ` : ''}
          </div>
          `).join('')}
        </section>
        ` : ''}

        ${data.additional?.projects?.length ? `
        <section>
          <h3 class="section-title">Projects</h3>
          ${data.additional.projects.map(project => `
          <div class="project-item">
            <h4>${project.title || ''}</h4>
            ${project.company ? `
            <p class="institution-name">${project.company}</p>
            ` : ''}
            ${project.startDate ? `
            <p class="project-meta">
              ${formatDate(project.startDate)} - ${project.isCurrent ? 'Present' : formatDate(project.endDate)}
            </p>
            ` : ''}
            <p>${project.description || ''}</p>
            ${project.skills?.length ? `
            <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #4b5563;">
              <strong>Skills:</strong> ${joinArray(project.skills)}
            </p>
            ` : ''}
            ${project.link ? `
            <p style="margin-top: 0.3rem;">
              <a href="${project.link}" target="_blank" style="color: #2563eb; font-size: 0.875rem;">Project Link</a>
            </p>
            ` : ''}
          </div>
          `).join('')}
        </section>
        ` : ''}

        ${data.additional?.certifications?.length ? `
        <section>
          <h3 class="section-title">Certifications</h3>
          ${data.additional.certifications.map(cert => `
          <div class="certificate-item">
            <h4>${cert.title || ''}</h4>
            ${cert.issuer ? `
            <p class="institution-name">${cert.issuer}</p>
            ` : ''}
            ${cert.date ? `
            <p class="certificate-meta">${cert.date}</p>
            ` : ''}
            ${cert.link ? `
            <p>
              <a href="${cert.link}" target="_blank" style="color: #2563eb; font-size: 0.875rem;">Certificate Link</a>
            </p>
            ` : ''}
          </div>
          `).join('')}
        </section>
        ` : ''}

        <section>
          <h3 class="section-title">Education</h3>
          
          ${data.education?.tenth?.marks ? `
          <div class="education-item">
            <h4>10th Grade</h4>
            <p>
              ${data.education.tenth.school || ''}${data.education.tenth.marksType ? ` (${data.education.tenth.marksType})` : ''}: ${data.education.tenth.marks || ''}${data.education.tenth.percentage ? ` (${data.education.tenth.percentage}%)` : ''}
            </p>
            ${data.education.tenth.year ? `
            <p class="education-meta">
              Year of Passout: ${data.education.tenth.year}
            </p>
            ` : ''}
          </div>
          ` : ''}

          ${data.education?.twelfth?.marks ? `
          <div class="education-item">
            <h4>12th Grade</h4>
            <p>
              ${data.education.twelfth.institute || ''}${data.education.twelfth.marksType ? ` (${data.education.twelfth.marksType})` : ''}: ${data.education.twelfth.marks || ''}${data.education.twelfth.percentage ? ` (${data.education.twelfth.percentage}%)` : ''}
            </p>
            ${data.education.twelfth.year ? `
            <p class="education-meta">
              Year of Passout: ${data.education.twelfth.year}
            </p>
            ` : ''}
          </div>
          ` : ''}

          ${data.education?.bachelor?.degree ? `
          <div class="education-item">
            <h4>Undergraduate</h4>
            <p>${data.education.bachelor.institute || ''}, ${data.education.bachelor.degree || ''}${data.education.bachelor.branch ? ` in ${data.education.bachelor.branch}` : ''}</p>
            <p class="education-meta">
              Year of Passout: ${data.education.bachelor.endYear || ''}${data.education.bachelor.cgpa ? `, CGPA: ${data.education.bachelor.cgpa}` : ''}
            </p>
          </div>
          ` : ''}
        </section>

        ${data.skills?.length ? `
        <section>
          <h3 class="section-title">Skills</h3>
          <div class="skills-container">
            ${data.skills.map(skill => `
            <span class="skill-tag">${skill}</span>
            `).join('')}
          </div>
        </section>
        ` : ''}

        ${data.additional?.languages?.length ? `
        <section>
          <h3 class="section-title">Languages</h3>
          <div class="section-content">
            <ul class="custom-list">
              ${data.additional.languages.map(lang => `
              <li>${lang.language || ''}${lang.proficiency ? ` (${lang.proficiency})` : ''}</li>
              `).join('')}
            </ul>
          </div>
        </section>
        ` : ''}

        ${data.additional?.websites?.length ? `
        <section>
          <h3 class="section-title">Websites & Links</h3>
          <div class="section-content">
            <ul class="custom-list">
              ${data.additional.websites.map(site => `
              <li><a href="${site.url || '#'}" target="_blank" style="color: #2563eb;">${site.label || site.url}</a></li>
              `).join('')}
            </ul>
          </div>
        </section>
        ` : ''}
      </div>
    </div>
    </body>
    </html>
  `;

  // Template 3: Minimal
  const template3HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap");

      @media print {
        @page {
          size: A4;
          margin: 0;
        }

        body {
          margin: 0;
        }
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .resume-container {
        width: 100%;
        margin: 0 auto;
        padding: 2rem;
        background: white;
        box-sizing: border-box;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        font-family: "Source Sans Pro", sans-serif;
      }

      .header {
        text-align: center;
        margin-bottom: 2rem;
        border-bottom: 3px double #2563eb;
        padding-bottom: 1rem;
      }

      .header h1 {
        font-family: "Playfair Display", serif;
        font-size: 2.5rem;
        font-weight: 700;
        color: #1e40af;
        margin-bottom: 0.5rem;
      }

      .header h2 {
        font-family: "Playfair Display", serif;
        font-size: 1.25rem;
        color: #4b5563;
        font-style: italic;
        font-weight: 500;
      }

      .content-wrapper {
        display: grid;
        grid-template-columns: 1fr;
        max-width: 900px;
        margin: 0 auto;
      }

      .section-title {
        font-family: "Playfair Display", serif;
        font-size: 1.5rem;
        color: #1e40af;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
      }

      .section-title::after {
        content: "";
        flex: 1;
        height: 1px;
        background: linear-gradient(to right, #2563eb, transparent);
      }

      .experience-item {
        margin-bottom: 1.5rem;
        padding-left: 1rem;
        border-left: 2px solid #e5e7eb;
      }

      .experience-item:hover {
        border-left-color: #2563eb;
      }

      .experience-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .experience-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
      }

      .experience-company {
        font-style: italic;
        color: #4b5563;
      }

      .experience-date {
        font-size: 0.875rem;
        color: #6b7280;
        font-weight: 300;
      }

      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 1rem;
      }

      .skill-item {
        background: #f3f4f6;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        text-align: center;
        transition: all 0.3s ease;
        font-weight: 400;
        white-space: nowrap;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        margin-top: 1rem;
      }

      .contact-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #4b5563;
        font-weight: 400;
      }

      .contact-item a {
        color: #2563eb;
        text-decoration: none;
        font-weight: 600;
      }

      .contact-item a:hover {
        text-decoration: underline;
      }

      /* New styles for Education and Projects */
      .education-item {
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: #f8fafc;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .education-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
        margin-top: 0.3rem;
      }

      .education-meta {
        color: #4b5563;
        font-weight: 400;
        font-size: 0.875rem;
      }

      .project-item {
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .project-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
      }

      .project-meta {
        color: #4b5563;
        font-weight: 400;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
      }

      .certificate-item {
        margin-bottom: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-radius: 6px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .certificate-item h4 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.3rem;
      }

      .section-content {
        margin: 0 -42px;
      }

      .custom-list {
        list-style: none;
        margin-left: 0;
        padding-left: 1rem;
      }

      .custom-list li {
        position: relative;
        margin-bottom: 0.3rem;
        padding-left: 1.2rem;
      }

      .custom-list li:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #2563eb;
        font-weight: bold;
      }
    </style>
    </head>
    <body>

    <div class="resume-container">
      <header class="header">
        <h1>${data.header?.fullName || ''}</h1>
        ${data.header?.designation ? `
        <h2>${data.header.designation}</h2>
        ` : ''}
      </header>
      
      <div class="content-wrapper">
        ${data.summary?.text ? `
        <section class="section">
          <h3 class="section-title">Summary</h3>
          <p>${data.summary.text}</p>
        </section>
        ` : ''}

        <section class="section">
          <h3 class="section-title">Contact Information</h3>
          <div class="contact-grid">
            ${data.header?.location ? `
            <div class="contact-item">📍 ${data.header.location}</div>
            ` : ''}
            ${data.header?.phone ? `
            <div class="contact-item">📞 ${data.header.phone}</div>
            ` : ''}
            ${data.header?.email ? `
            <div class="contact-item">📧 ${data.header.email}</div>
            ` : ''}
            ${data.header?.linkedin ? `
            <div class="contact-item">
              <a href="${data.header.linkedin}" target="_blank">🔗 LinkedIn</a>
            </div>
            ` : ''}
            ${data.header?.github ? `
            <div class="contact-item">
              <a href="${data.header.github}" target="_blank">💻 GitHub</a>
            </div>
            ` : ''}
            ${data.header?.portfolio ? `
            <div class="contact-item">
              <a href="${data.header.portfolio}" target="_blank">🌐 Portfolio</a>
            </div>
            ` : ''}
          </div>
        </section>

        ${data.experience?.length ? `
        <section class="section">
          <h3 class="section-title">Professional Experience</h3>
          ${data.experience.map(exp => `
          <div class="experience-item">
            <div class="experience-header">
              <div>
                <div class="experience-title">${exp.title || ''}</div>
                <div class="experience-company">${exp.company || ''}</div>
              </div>
              <div class="experience-date">
                ${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
              </div>
            </div>
            <p>${exp.description || ''}</p>
            ${exp.achievements ? `
            <p style="margin-top: 0.5rem; font-style: italic; color: #4b5563;">Achievements: ${exp.achievements}</p>
            ` : ''}
          </div>
          `).join('')}
        </section>
        ` : ''}

        ${data.additional?.projects?.length ? `
        <section class="section">
          <h3 class="section-title">Projects</h3>
          ${data.additional.projects.map(project => `
          <div class="project-item">
            <h4>${project.title || ''}</h4>
            ${project.company ? `
            <p>${project.company}</p>
            ` : ''}
            ${project.startDate ? `
            <p class="project-meta">
              ${formatDate(project.startDate)} - ${project.isCurrent ? 'Present' : formatDate(project.endDate)}
            </p>
            ` : ''}
            <p>${project.description || ''}</p>
            ${project.skills?.length ? `
            <p style="margin-top: 0.5rem; color: #4b5563;">
              <strong>Skills:</strong> ${joinArray(project.skills)}
            </p>
            ` : ''}
            ${project.link ? `
            <p style="margin-top: 0.3rem;">
              <a href="${project.link}" target="_blank" style="color: #2563eb;">Project Link →</a>
            </p>
            ` : ''}
          </div>
          `).join('')}
        </section>
        ` : ''}

        ${data.additional?.certifications?.length ? `
        <section class="section">
          <h3 class="section-title">Certifications</h3>
          ${data.additional.certifications.map(cert => `
          <div class="certificate-item">
            <h4>${cert.title || ''}</h4>
            ${cert.issuer ? `
            <p>${cert.issuer}</p>
            ` : ''}
            ${cert.date ? `
            <p class="project-meta">${cert.date}</p>
            ` : ''}
            ${cert.link ? `
            <p>
              <a href="${cert.link}" target="_blank" style="color: #2563eb;">View Certificate →</a>
            </p>
            ` : ''}
          </div>
          `).join('')}
        </section>
        ` : ''}

        <section class="section">
          <h3 class="section-title">Education</h3>
          
          ${data.education?.tenth?.marks ? `
          <div class="education-item">
            <h4>10th Grade</h4>
            <p>
              ${data.education.tenth.school || ''}${data.education.tenth.marksType ? ` (${data.education.tenth.marksType})` : ''}: ${data.education.tenth.marks || ''}${data.education.tenth.percentage ? ` (${data.education.tenth.percentage}%)` : ''}
            </p>
            ${data.education.tenth.year ? `
            <p class="education-meta">
              Year of Passout: ${data.education.tenth.year}
            </p>
            ` : ''}
          </div>
          ` : ''}

          ${data.education?.twelfth?.marks ? `
          <div class="education-item">
            <h4>12th Grade</h4>
            <p>
              ${data.education.twelfth.institute || ''}${data.education.twelfth.marksType ? ` (${data.education.twelfth.marksType})` : ''}: ${data.education.twelfth.marks || ''}${data.education.twelfth.percentage ? ` (${data.education.twelfth.percentage}%)` : ''}
            </p>
            ${data.education.twelfth.year ? `
            <p class="education-meta">
              Year of Passout: ${data.education.twelfth.year}
            </p>
            ` : ''}
          </div>
          ` : ''}

          ${data.education?.bachelor?.degree ? `
          <div class="education-item">
            <h4>Undergraduate</h4>
            <p>${data.education.bachelor.institute || ''}, ${data.education.bachelor.degree || ''}${data.education.bachelor.branch ? ` in ${data.education.bachelor.branch}` : ''}</p>
            <p class="education-meta">
              Year of Passout: ${data.education.bachelor.endYear || ''}${data.education.bachelor.cgpa ? `, CGPA: ${data.education.bachelor.cgpa}` : ''}
            </p>
          </div>
          ` : ''}
        </section>

        ${data.skills?.length ? `
        <section class="section">
          <h3 class="section-title">Skills</h3>
          <div class="skills">
            ${data.skills.map(skill => `
            <div class="skill-item">${skill}</div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        ${data.additional?.languages?.length ? `
        <section class="section">
          <h3 class="section-title">Languages</h3>
          <div class="section-content">
            <ul class="custom-list">
              ${data.additional.languages.map(lang => `
              <li>${lang.language || ''}${lang.proficiency ? ` (${lang.proficiency})` : ''}</li>
              `).join('')}
            </ul>
          </div>
        </section>
        ` : ''}

        ${data.additional?.websites?.length ? `
        <section class="section">
          <h3 class="section-title">Websites & Links</h3>
          <div class="section-content">
            <ul class="custom-list">
              ${data.additional.websites.map(site => `
              <li><a href="${site.url || '#'}" target="_blank" style="color: #2563eb;">${site.label || site.url}</a></li>
              `).join('')}
            </ul>
          </div>
        </section>
        ` : ''}
      </div>
    </div>
    </body>
    </html>
  `;

  // Template 4: Creative
  const template4HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.header?.fullName || 'Resume'} - Resume</title>
    <style>
      * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
      }

      @media print {
        @page {
          size: A4;
          margin: 0;
          padding: 40px;
        }
      }

      .container {
        padding: 40px;
        line-height: 1.5;
        background-color: #ffff;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 20px;
      }

      .header-left {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5px;
      }

      .name {
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
      }

      .title {
        font-size: 18px;
        font-weight: bold;
        margin: 20px 0;
        border-bottom: 2px solid #000;
        padding-bottom: 5px;
      }

      .section-content {
        margin-bottom: 20px;
      }

      .section-content-title {
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }

      .section-content-description {
        font-size: 14px;
      }

      .bullet-point {
        margin-left: 20px;
        position: relative;
        margin-bottom: 5px;
      }

      .bullet-point::before {
        content: "•";
        position: absolute;
        left: -15px;
      }

      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }

      .skill-tag {
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
        background-color: #f0f0f0;
      }

      .custom-list {
        list-style-type: none;
        padding-left: 20px;
      }

      .custom-list li {
        position: relative;
        margin-bottom: 5px;
      }

      .custom-list li::before {
        content: "•";
        position: absolute;
        left: -15px;
      }

      a {
        color: #2563eb;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    </style>
    </head>
    <body>

    <div class="container">
      <section class="header">
        <div class="header-left">
          <div class="name">${data.header?.fullName || ''}</div>
          ${data.header?.designation ? `
          <div>${data.header.designation}</div>
          ` : ''}
          ${data.education?.bachelor?.degree ? `
          <div>${data.education.bachelor.degree}${data.education.bachelor.branch ? ` (${data.education.bachelor.branch})` : ''}</div>
          ` : ''}
          ${data.education?.bachelor?.institute ? `
          <div>${data.education.bachelor.institute}</div>
          ` : ''}
        </div>
        <div class="contact-info">
          ${data.header?.location ? `
          <div>${data.header.location}</div>
          ` : ''}
          ${data.header?.phone ? `
          <div>${data.header.phone}</div>
          ` : ''}
          ${data.header?.email ? `
          <div>${data.header.email}</div>
          ` : ''}
          ${data.header?.linkedin ? `
          <div><a href="${data.header.linkedin}" target="_blank">${data.header.linkedin}</a></div>
          ` : ''}
          ${data.header?.github ? `
          <div><a href="${data.header.github}" target="_blank">${data.header.github}</a></div>
          ` : ''}
          ${data.header?.portfolio ? `
          <div><a href="${data.header.portfolio}" target="_blank">${data.header.portfolio}</a></div>
          ` : ''}
        </div>
      </section>

      ${data.summary?.text ? `
      <section class="section">
        <h3 class="title">Summary</h3>
        <p>${data.summary.text}</p>
      </section>
      ` : ''}

      ${data.experience?.length ? `
      <section class="section">
        <div class="title">PROFESSIONAL EXPERIENCE</div>
        <div class="section-contents">
          ${data.experience.map(exp => `
          <div class="section-content">
            <div class="section-content-title">
              <div>${exp.title || ''}</div>
              <div>${formatDate(exp.startDate)} – ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</div>
            </div>
            <div class="section-content-description">
              <div>${exp.company || ''}${exp.location ? `, ${exp.location}` : ''}</div>
              <p>${exp.description || ''}</p>
              ${exp.achievements ? `
              <p style="margin-top: 5px;"><strong>Achievements:</strong> ${exp.achievements}</p>
              ` : ''}
            </div>
          </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${data.additional?.projects?.length ? `
      <section class="section">
        <div class="title">PROJECTS</div>
        <div class="section-contents">
          ${data.additional.projects.map(project => `
          <div class="section-content">
            <div class="section-content-title">
              <div>${project.title || ''}</div>
              ${project.startDate ? `
              <div>${formatDate(project.startDate)} - ${project.isCurrent ? 'Present' : formatDate(project.endDate)}</div>
              ` : ''}
            </div>
            <div class="section-content-description">
              ${project.company ? `
              <div>${project.company}</div>
              ` : ''}
              <p>${project.description || ''}</p>
              ${project.skills?.length ? `
              <p style="margin-top: 5px;"><strong>Skills:</strong> ${joinArray(project.skills)}</p>
              ` : ''}
              ${project.link ? `
              <p style="margin-top: 5px;"><a href="${project.link}" target="_blank">Project Link →</a></p>
              ` : ''}
            </div>
          </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${data.additional?.certifications?.length ? `
      <section class="section">
        <div class="title">CERTIFICATIONS</div>
        <div class="section-contents">
          ${data.additional.certifications.map(cert => `
          <div class="section-content">
            <div class="section-content-title">
              <div>${cert.title || ''}</div>
              ${cert.date ? `
              <div>${cert.date}</div>
              ` : ''}
            </div>
            <div class="section-content-description">
              ${cert.issuer ? `
              <div>${cert.issuer}</div>
              ` : ''}
              ${cert.link ? `
              <p><a href="${cert.link}" target="_blank">View Certificate →</a></p>
              ` : ''}
            </div>
          </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      <section class="section">
        <div class="title">EDUCATION</div>
        <div class="section-contents">
          ${data.education?.tenth?.marks ? `
          <div class="section-content">
            <div class="section-content-title">
              <div>10th Grade</div>
            </div>
            <div class="section-content-description">
              <div>
                ${data.education.tenth.school || ''}${data.education.tenth.marksType ? ` (${data.education.tenth.marksType})` : ''}: ${data.education.tenth.marks || ''}${data.education.tenth.percentage ? ` (${data.education.tenth.percentage}%)` : ''}
              </div>
              ${data.education.tenth.year ? `
              <div>Year of Passout: ${data.education.tenth.year}</div>
              ` : ''}
            </div>
          </div>
          ` : ''}

          ${data.education?.twelfth?.marks ? `
          <div class="section-content">
            <div class="section-content-title">
              <div>12th Grade</div>
            </div>
            <div class="section-content-description">
              <div>
                ${data.education.twelfth.institute || ''}${data.education.twelfth.marksType ? ` (${data.education.twelfth.marksType})` : ''}: ${data.education.twelfth.marks || ''}${data.education.twelfth.percentage ? ` (${data.education.twelfth.percentage}%)` : ''}
              </div>
              ${data.education.twelfth.year ? `
              <div>Year of Passout: ${data.education.twelfth.year}</div>
              ` : ''}
            </div>
          </div>
          ` : ''}

          ${data.education?.bachelor?.degree ? `
          <div class="section-content">
            <div class="section-content-title">
              <div>Undergraduate</div>
            </div>
            <div class="section-content-description">
              <div>${data.education.bachelor.institute || ''}, ${data.education.bachelor.degree || ''}${data.education.bachelor.branch ? ` in ${data.education.bachelor.branch}` : ''}</div>
              <div>
                Year of Passout: ${data.education.bachelor.endYear || ''}${data.education.bachelor.cgpa ? `, CGPA: ${data.education.bachelor.cgpa}` : ''}
              </div>
            </div>
          </div>
          ` : ''}
        </div>
      </section>

      ${data.skills?.length ? `
      <section class="section">
        <h3 class="title">Skills</h3>
        <div class="skills-container">
          ${data.skills.map(skill => `
          <span class="skill-tag">${skill}</span>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${data.additional?.languages?.length ? `
      <section class="section">
        <div class="title">Languages</div>
        <div class="section-content">
          <ul class="custom-list">
            ${data.additional.languages.map(lang => `
            <li>${lang.language || ''}${lang.proficiency ? ` (${lang.proficiency})` : ''}</li>
            `).join('')}
          </ul>
        </div>
      </section>
      ` : ''}

      ${data.additional?.websites?.length ? `
      <section class="section">
        <div class="title">Websites & Links</div>
        <div class="section-content">
          <ul class="custom-list">
            ${data.additional.websites.map(site => `
            <li><a href="${site.url || '#'}" target="_blank">${site.label || site.url}</a></li>
            `).join('')}
          </ul>
        </div>
      </section>
      ` : ''}
    </div>
    </body>
    </html>
  `;

  // Template 5: Professional
  const template5HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.header?.fullName || 'Resume'} - Resume</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer">
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      @media print {
        @page {
          size: A4;
          margin: 0;
        }
      }

      .mainContainer {
        width: 100%;
        min-height: 100vh;
        padding: 40px 50px;
        background-color: white;
      }

      .templateHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        padding: 20px;
        flex-wrap: wrap;
        gap: 15px;
      }

      .templateHeader h2 {
        font-size: 30px;
        color: #333;
      }

      .templateHeader p {
        font-size: 16px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px;
      }

      .templateHeader p a {
        color: blue;
        text-decoration: none;
      }

      .templateHeader p a:hover {
        text-decoration: underline;
      }

      .box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #000;
        overflow: hidden;
        margin: 20px 0 10px 0;
      }

      .box h3 {
        padding: 5px 10px;
        font-size: 20px;
      }

      .tableWrapper {
        border: 1px solid #000;
        margin-bottom: 20px;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
      }

      .table th {
        background-color: #f1f1f1;
        font-weight: bold;
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
        font-size: 18px;
      }

      .tableHeading {
        background-color: #f1f1f1;
        font-weight: bold;
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-size: 20px;
        width: 100%;
      }

      .table td {
        padding: 8px 12px;
        text-align: left;
        border: 1px solid #ddd;
        font-size: 16px;
        vertical-align: top;
      }

      .contentHeading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 15px;
        font-size: 18px;
        font-weight: 600;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        background-color: #f9f9f9;
        flex-wrap: wrap;
        gap: 10px;
      }

      .contentSubHeading {
        font-size: 18px;
        font-style: italic;
        text-decoration: underline;
        padding: 10px 15px;
        background-color: #f5f5f5;
      }

      .contentDescription {
        padding: 15px 25px;
        font-size: 16px;
        line-height: 1.5;
        list-style-type: none;
      }

      .contentDescription li {
        margin-bottom: 8px;
        position: relative;
        padding-left: 20px;
      }

      .contentDescription li::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #333;
        font-weight: bold;
      }

      .custom-list {
        padding: 15px 25px;
        list-style-type: none;
      }

      .custom-list li {
        margin-bottom: 8px;
        position: relative;
        padding-left: 20px;
        font-size: 16px;
      }

      .custom-list li::before {
        content: "•";
        position: absolute;
        left: 0;
        color: #333;
        font-weight: bold;
      }

      .skills-container {
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .skill-tag {
        background-color: #f0f0f0;
        border-radius: 5px;
        padding: 5px 15px;
        font-size: 15px;
        border: 1px solid #ddd;
      }

      .company-name {
        font-weight: 600;
        color: #444;
      }

      .project-links {
        margin-top: 10px;
      }

      .project-links a {
        color: blue;
        text-decoration: none;
        margin-right: 15px;
        display: inline-block;
      }

      .project-links a:hover {
        text-decoration: underline;
      }

      .achievements-text {
        margin-top: 8px;
        font-style: italic;
        color: #555;
      }

      .certification-item {
        padding: 12px 15px;
        border-bottom: 1px solid #eee;
      }

      .certification-item:last-child {
        border-bottom: none;
      }

      .certification-title {
        font-weight: 600;
        font-size: 17px;
      }

      .certification-meta {
        color: #666;
        font-size: 14px;
        margin-top: 4px;
      }
    </style>
    </head>
    <body>

    <div class="mainContainer">
      <!-- header -->
      <div class="templateHeader">
        <h2>${data.header?.fullName || ''}</h2>
        <p>
          ${data.header?.email ? `
          <strong>Email ID: </strong>
          <a href="mailto:${data.header.email}">${data.header.email}</a>
          ` : ''}
          ${data.header?.email && data.header?.phone ? ' | ' : ''}
          ${data.header?.phone ? `
          <span><strong>Ph No:</strong> ${data.header.phone}</span>
          ` : ''}
        </p>
      </div>

      <!-- Skills Section -->
      ${data.skills?.length ? `
      <div class="tableWrapper">
        <div class="tableHeading">Skills</div>
        <div class="skills-container">
          ${data.skills.map(skill => `
          <span class="skill-tag">${skill}</span>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- Work Experience Section -->
      ${data.experience?.length ? `
      <div class="tableWrapper">
        <div class="tableHeading">Work Experience</div>
        ${data.experience.map(exp => `
        <div style="margin-bottom: 15px;">
          <table class="table">
            <tbody>
              <tr>
                <th class="company-name">${exp.company || ''}${exp.location ? `, ${exp.location}` : ''}</th>
              </tr>
            </tbody>
          </table>
          <div class="contentHeading">
            <span class="position-title">${exp.title || ''}</span>
            <span class="experience-date">${formatDate(exp.startDate)} - ${exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</span>
          </div>
          <ul class="contentDescription">
            <li>${exp.description || ''}</li>
            ${exp.achievements ? `
            <li class="achievements-text"><strong>Achievements:</strong> ${exp.achievements}</li>
            ` : ''}
          </ul>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Projects Section -->
      ${data.additional?.projects?.length ? `
      <div class="tableWrapper">
        <div class="tableHeading">Projects</div>
        ${data.additional.projects.map(project => `
        <div style="margin-bottom: 15px;">
          <table class="table">
            <tbody>
              <tr>
                <th>${project.company || project.title || ''}</th>
              </tr>
            </tbody>
          </table>
          <div class="contentHeading">
            <span>${project.title || ''}</span>
            ${project.startDate ? `
            <span>${formatDate(project.startDate)} - ${project.isCurrent ? 'Present' : formatDate(project.endDate)}</span>
            ` : ''}
          </div>
          <ul class="contentDescription">
            <li>${project.description || ''}</li>
            ${project.skills?.length ? `
            <li><strong>Skills:</strong> ${joinArray(project.skills)}</li>
            ` : ''}
            ${project.link ? `
            <li class="project-links">
              <a href="${project.link}" target="_blank"><i class="fa-solid fa-link"></i> Project Link</a>
            </li>
            ` : ''}
          </ul>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Certifications Section -->
      ${data.additional?.certifications?.length ? `
      <div class="tableWrapper">
        <div class="tableHeading">Certifications</div>
        ${data.additional.certifications.map(cert => `
        <div class="certification-item">
          <div class="certification-title">${cert.title || ''}</div>
          <div class="certification-meta">
            ${cert.issuer || ''}
            ${cert.issuer && cert.date ? ' | ' : ''}
            ${cert.date || ''}
          </div>
          ${cert.link ? `
          <div class="project-links" style="margin-top: 5px;">
            <a href="${cert.link}" target="_blank"><i class="fa-solid fa-certificate"></i> View Certificate</a>
          </div>
          ` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Education Section -->
      <div>
        <div class="box">
          <h3>Education Details</h3>
        </div>
      </div>
      <div class="tableWrapper">
        <table class="table">
          <tbody>
            ${data.education?.bachelor?.degree ? `
            <tr>
              <th>Degree</th>
              <th>Institute</th>
              <th>Year</th>
            </tr>
            <tr>
              <td>${data.education.bachelor.degree || ''}${data.education.bachelor.branch ? ` (${data.education.bachelor.branch})` : ''}</td>
              <td>${data.education.bachelor.institute || ''}</td>
              <td>${data.education.bachelor.endYear || ''}${data.education.bachelor.cgpa ? `<br><small>CGPA: ${data.education.bachelor.cgpa}</small>` : ''}</td>
            </tr>
            ` : ''}
            
            <tr>
              <th>Class</th>
              <th>School/College</th>
              <th>Year</th>
            </tr>
            
            ${data.education?.twelfth?.marks ? `
            <tr>
              <td>Class XII${data.education.twelfth.marksType ? ` (${data.education.twelfth.marksType})` : ''}</td>
              <td>${data.education.twelfth.institute || ''}<br><small>Marks: ${data.education.twelfth.marks || ''}${data.education.twelfth.percentage ? ` (${data.education.twelfth.percentage}%)` : ''}</small></td>
              <td>${data.education.twelfth.year || ''}</td>
            </tr>
            ` : ''}
            
            ${data.education?.tenth?.marks ? `
            <tr>
              <td>Class X${data.education.tenth.marksType ? ` (${data.education.tenth.marksType})` : ''}</td>
              <td>${data.education.tenth.school || ''}<br><small>Marks: ${data.education.tenth.marks || ''}${data.education.tenth.percentage ? ` (${data.education.tenth.percentage}%)` : ''}</small></td>
              <td>${data.education.tenth.year || ''}</td>
            </tr>
            ` : ''}
          </tbody>
        </table>
      </div>

      <!-- Languages Section -->
      ${data.additional?.languages?.length ? `
      <div>
        <div class="box">
          <h3>Languages</h3>
        </div>
      </div>
      <div class="tableWrapper">
        <ul class="custom-list">
          ${data.additional.languages.map(lang => `
          <li>${lang.language || ''}${lang.proficiency ? ` (${lang.proficiency})` : ''}</li>
          `).join('')}
        </ul>
      </div>
      ` : ''}

      <!-- Websites & Links Section -->
      ${data.additional?.websites?.length ? `
      <div>
        <div class="box">
          <h3>Websites & Links</h3>
        </div>
      </div>
      <div class="tableWrapper">
        <ul class="custom-list">
          ${data.additional.websites.map(site => `
          <li><a href="${site.url || '#'}" target="_blank">${site.label || site.url}</a></li>
          `).join('')}
        </ul>
      </div>
      ` : ''}
    </div>
    </body>
    </html>
  `;

  // Return the appropriate template based on templateId
  switch (templateId) {
    case 1:
      return template1HTML;
    case 2:
      return template2HTML;
    case 3:
      return template3HTML;
    case 4:
      return template4HTML;
    case 5:
      return template5HTML;
    default:
      return template1HTML;
  }
};

async function ensureChromeInstalled() {
  try {
    const execPath = puppeteer.executablePath();
    console.log(`✅ Chrome found at: ${execPath}`);
  } catch (error) {
    console.log('⚠️ Chrome not found. Installing...');
    try {
      const { stdout, stderr } = await execPromise('npx puppeteer browsers install chrome');
      console.log('Installation stdout:', stdout);
      if (stderr) console.error('Installation stderr:', stderr);
      console.log('✅ Chrome installed successfully.');
    } catch (installError) {
      console.error('❌ Failed to install Chrome:', installError.message);
      process.exit(1);
    }
  }
}

// ==========================================
// 🔹 RESUME MANAGEMENT ROUTES
// ==========================================

// Create a new resume (optionally prefill with profile data)
app.post("/api/resumes", auth, async (req, res) => {
  try {
    const { title, target_role, company, prefill = true } = req.body;

    let resumeData = {};

    if (prefill) {
      // Fetch complete profile to prefill
      const profileResult = await pool.query(
        `SELECT * FROM students WHERE id = $1`,
        [req.student.id]
      );
      const student = profileResult.rows[0];

      // Get projects and achievements
      const projectsResult = await pool.query(
        `SELECT * FROM student_projects WHERE student_id = $1`,
        [req.student.id]
      );
      const achievementsResult = await pool.query(
        `SELECT * FROM student_achievements WHERE student_id = $1`,
        [req.student.id]
      );

      // Structure data as per resume sections
      resumeData = {
        header: {
          fullName: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
          email: student.email,
          phone: student.phone,
          linkedin: student.linkedin_profile_url,
          github: student.github_profile_url,
          portfolio: student.code_playground_username, // or separate field
          address: student.city ? `${student.city}, ${student.state}` : '',
        },
        education: {
          tenth: {
            school: null, // not stored in profile currently – can be added later
            marks: student.tenth_marks,
            marksType: student.tenth_marks_type,
            year: null,
          },
          twelfth: {
            educationType: student.twelfth_education_type,
            marks: student.twelfth_marks,
            marksType: student.twelfth_marks_type,
            year: null,
          },
          bachelor: {
            degree: student.bachelor_degree,
            branch: student.bachelor_branch,
            institute: student.bachelor_institute,
            cgpa: student.bachelor_cgpa,
            startYear: student.bachelor_start_year,
            endYear: student.bachelor_end_year,
            status: student.bachelor_status,
          },
        },
        experience: [], // from work experience? we don't have a separate table yet; could be filled manually
        summary: {
          text: '',
        },
        skills: student.technical_skills || [],
        additional: {
          certifications: achievementsResult.rows.map(a => ({
            title: a.achievement_title,
            description: a.achievement_description,
            link: a.achievement_link,
            date: a.achievement_date,
          })),
          websites: [], // manual
          languages: student.preferred_languages || [],
          projects: projectsResult.rows.map(p => ({
            title: p.project_title,
            description: p.project_description,
            link: p.project_link,
            skills: p.skills,
          })),
        },
      };
    }

    const result = await pool.query(
      `INSERT INTO student_resumes (student_id, title, target_role, company, resume_data)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.student.id, title || 'Untitled Resume', target_role || null, company || null, resumeData]
    );

    res.status(201).json({
      success: true,
      data: { resume: result.rows[0] },
    });
  } catch (error) {
    console.error("Resume creation error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create resume" });
  }
});

// Get all resumes for the logged-in student
app.get("/api/resumes", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, target_role, company, created_at, updated_at
       FROM student_resumes
       WHERE student_id = $1
       ORDER BY updated_at DESC`,
      [req.student.id]
    );
    res.json({ success: true, data: { resumes: result.rows } });
  } catch (error) {
    console.error("Fetch resumes error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch resumes" });
  }
});

// Get a single resume by ID
app.get("/api/resumes/:resumeId", auth, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const result = await pool.query(
      `SELECT * FROM student_resumes WHERE id = $1 AND student_id = $2`,
      [resumeId, req.student.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.json({ success: true, data: { resume: result.rows[0] } });
  } catch (error) {
    console.error("Fetch resume error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch resume" });
  }
});

// Update entire resume
app.put("/api/resumes/:resumeId", auth, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { title, target_role, company, resume_data } = req.body;

    // Ensure resume belongs to student
    const check = await pool.query(
      `SELECT id FROM student_resumes WHERE id = $1 AND student_id = $2`,
      [resumeId, req.student.id]
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    const result = await pool.query(
      `UPDATE student_resumes
       SET title = COALESCE($1, title),
           target_role = COALESCE($2, target_role),
           company = COALESCE($3, company),
           resume_data = COALESCE($4, resume_data),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, target_role, company, resume_data, resumeId]
    );

    res.json({ success: true, data: { resume: result.rows[0] } });
  } catch (error) {
    console.error("Update resume error:", error.message);
    res.status(500).json({ success: false, message: "Failed to update resume" });
  }
});

// Delete a resume
app.delete("/api/resumes/:resumeId", auth, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const result = await pool.query(
      `DELETE FROM student_resumes WHERE id = $1 AND student_id = $2 RETURNING id`,
      [resumeId, req.student.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.json({ success: true, message: "Resume deleted" });
  } catch (error) {
    console.error("Delete resume error:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete resume" });
  }
});


// Generate PDF from provided data (for unsaved resumes)
app.post('/api/resumes/generate-pdf', auth, async (req, res) => {
  try {
    const { resumeData, templateId } = req.body;

    if (!resumeData) {
      return res.status(400).json({
        success: false,
        message: 'Resume data required'
      });
    }

    // Get template ID from either location
    const selectedTemplateId = templateId || resumeData.templateId || 1;

    console.log('📄 Generating PDF with template:', selectedTemplateId);

    const pdfBuffer = await generateResumePDF(resumeData, selectedTemplateId);

    // Set proper headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume-${Date.now()}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Send the PDF buffer
    res.end(pdfBuffer);

  } catch (error) {
    console.error('❌ PDF generation error:', error.message);
    console.error('Error stack:', error.stack);

    // Send error response
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF: ' + error.message
    });
  }
});

// Generate PDF from saved resume by ID
// Generate PDF from saved resume by ID
app.get('/api/resumes/:resumeId/pdf', auth, async (req, res) => {
  try {
    const { resumeId } = req.params;
    const result = await pool.query(
      'SELECT resume_data FROM student_resumes WHERE id = $1 AND student_id = $2',
      [resumeId, req.student.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Resume not found'
      });
    }

    const resumeData = result.rows[0].resume_data;
    const templateId = resumeData.templateId || 1;

    console.log(`📄 Generating PDF for saved resume ${resumeId} with template:`, templateId);

    const pdfBuffer = await generateResumePDF(resumeData, templateId);

    // Set proper headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume-${resumeId}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.end(pdfBuffer);

  } catch (error) {
    console.error('❌ PDF generation error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate PDF'
    });
  }
});
// Save code snippet
app.post("/api/code-snippets/save", auth, async (req, res) => {
  try {
    const {
      snippetName,
      language,
      htmlCode,
      cssCode,
      javascriptCode,
      pythonCode,
      javaCode,
      sqlCode,
      isPublic = false,
      tags = [],
      description = "",
    } = req.body;

    if (!snippetName || !language) {
      return res.status(400).json({
        success: false,
        message: "Snippet name and language are required",
      });
    }

    console.log(
      `💾 Saving snippet: ${snippetName} for student ${req.student.id}`
    );

    const result = await pool.query(
      `INSERT INTO code_snippets 
       (student_id, snippet_name, language, html_code, css_code, 
        javascript_code, python_code, java_code, sql_code, 
        is_public, tags, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        req.student.id,
        snippetName,
        language,
        htmlCode || null,
        cssCode || null,
        javascriptCode || null,
        pythonCode || null,
        javaCode || null,
        sqlCode || null,
        isPublic,
        tags,
        description,
      ]
    );

    const snippet = result.rows[0];
    console.log(`✅ Snippet saved with ID: ${snippet.id}`);

    res.status(201).json({
      success: true,
      message: "Code snippet saved successfully",
      data: { snippet },
    });
  } catch (error) {
    console.error("❌ Save snippet error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to save code snippet",
      error: error.message,
    });
  }
});
// Get student's snippets
app.get("/api/code-snippets/my-snippets", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cs.*, 
              s.first_name, 
              s.last_name,
              COUNT(csl.id) as like_count,
              EXISTS (
                SELECT 1 FROM code_snippet_likes csl2 
                WHERE csl2.snippet_id = cs.id AND csl2.student_id = $1
              ) as is_liked
       FROM code_snippets cs
       LEFT JOIN students s ON cs.student_id = s.id
       LEFT JOIN code_snippet_likes csl ON cs.id = csl.snippet_id
       WHERE cs.student_id = $1
       GROUP BY cs.id, s.first_name, s.last_name
       ORDER BY cs.updated_at DESC`,
      [req.student.id]
    );

    res.json({
      success: true,
      data: { snippets: result.rows },
    });
  } catch (error) {
    console.error("Get snippets error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch snippets",
    });
  }
}); // Get published snippets
app.get("/api/code-snippets/published", auth, async (req, res) => {
  try {
    const { page = 1, limit = 20, language, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT cs.*, 
              s.first_name, 
              s.last_name,
              s.profile_image,
              COUNT(csl.id) as like_count,
              EXISTS (
                SELECT 1 FROM code_snippet_likes csl2 
                WHERE csl2.snippet_id = cs.id AND csl2.student_id = $1
              ) as is_liked
       FROM code_snippets cs
       LEFT JOIN students s ON cs.student_id = s.id
       LEFT JOIN code_snippet_likes csl ON cs.id = csl.snippet_id
       WHERE cs.is_published = true AND (cs.is_public = true OR cs.student_id = $1)
    `;

    const queryParams = [req.student.id];
    let paramCount = 2;

    if (language && language !== "all") {
      query += ` AND cs.language = $${paramCount}`;
      queryParams.push(language);
      paramCount++;
    }

    if (search) {
      query += ` AND (
        cs.snippet_name ILIKE $${paramCount} OR 
        cs.description ILIKE $${paramCount} OR
        s.first_name ILIKE $${paramCount} OR
        s.last_name ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    query += `
      GROUP BY cs.id, s.first_name, s.last_name, s.profile_image
      ORDER BY cs.likes DESC, cs.views DESC, cs.published_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    queryParams.push(parseInt(limit), offset);

    const result = await pool.query(query, queryParams);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM code_snippets cs
      LEFT JOIN students s ON cs.student_id = s.id
      WHERE cs.is_published = true AND (cs.is_public = true OR cs.student_id = $1)
    `;

    const countParams = [req.student.id];
    paramCount = 2;

    if (language && language !== "all") {
      countQuery += ` AND cs.language = $${paramCount}`;
      countParams.push(language);
      paramCount++;
    }

    if (search) {
      countQuery += ` AND (
        cs.snippet_name ILIKE $${paramCount} OR 
        cs.description ILIKE $${paramCount} OR
        s.first_name ILIKE $${paramCount} OR
        s.last_name ILIKE $${paramCount}
      )`;
      countParams.push(`%${search}%`);
      paramCount++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0]?.total || 0);

    res.json({
      success: true,
      data: {
        snippets: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Get published snippets error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch published snippets",
    });
  }
}); // Update snippet
app.put("/api/code-snippets/:snippetId", auth, async (req, res) => {
  try {
    const { snippetId } = req.params;
    const {
      snippetName,
      htmlCode,
      cssCode,
      javascriptCode,
      pythonCode,
      javaCode,
      sqlCode,
      isPublic,
      tags,
      description,
    } = req.body;

    // Check if snippet belongs to student
    const snippetCheck = await pool.query(
      `SELECT * FROM code_snippets WHERE id = $1 AND student_id = $2`,
      [snippetId, req.student.id]
    );

    if (snippetCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found or access denied",
      });
    }

    const result = await pool.query(
      `UPDATE code_snippets 
       SET snippet_name = COALESCE($1, snippet_name),
           html_code = COALESCE($2, html_code),
           css_code = COALESCE($3, css_code),
           javascript_code = COALESCE($4, javascript_code),
           python_code = COALESCE($5, python_code),
           java_code = COALESCE($6, java_code),
           sql_code = COALESCE($7, sql_code),
           is_public = COALESCE($8, is_public),
           tags = COALESCE($9, tags),
           description = COALESCE($10, description),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $11 AND student_id = $12
       RETURNING *`,
      [
        snippetName,
        htmlCode,
        cssCode,
        javascriptCode,
        pythonCode,
        javaCode,
        sqlCode,
        isPublic,
        tags,
        description,
        snippetId,
        req.student.id,
      ]
    );

    res.json({
      success: true,
      message: "Snippet updated successfully",
      data: { snippet: result.rows[0] },
    });
  } catch (error) {
    console.error("Update snippet error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update snippet",
    });
  }
}); // Publish snippet
app.post("/api/code-snippets/:snippetId/publish", auth, async (req, res) => {
  try {
    const { snippetId } = req.params;
    const { publish = true } = req.body;

    const snippetCheck = await pool.query(
      `SELECT * FROM code_snippets WHERE id = $1 AND student_id = $2`,
      [snippetId, req.student.id]
    );

    if (snippetCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found or access denied",
      });
    }

    const result = await pool.query(
      `UPDATE code_snippets 
       SET is_published = $1,
           published_at = ${publish ? "CURRENT_TIMESTAMP" : "NULL"},
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND student_id = $3
       RETURNING *`,
      [publish, snippetId, req.student.id]
    );

    res.json({
      success: true,
      message: publish
        ? "Snippet published successfully"
        : "Snippet unpublished",
      data: { snippet: result.rows[0] },
    });
  } catch (error) {
    console.error("Publish snippet error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update publish status",
    });
  }
}); // Delete snippet
app.delete("/api/code-snippets/:snippetId", auth, async (req, res) => {
  try {
    const { snippetId } = req.params;

    const snippetCheck = await pool.query(
      `SELECT * FROM code_snippets WHERE id = $1 AND student_id = $2`,
      [snippetId, req.student.id]
    );

    if (snippetCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found or access denied",
      });
    }

    await pool.query("DELETE FROM code_snippets WHERE id = $1", [snippetId]);

    res.json({
      success: true,
      message: "Snippet deleted successfully",
    });
  } catch (error) {
    console.error("Delete snippet error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete snippet",
    });
  }
}); // Like snippet
app.post("/api/code-snippets/:snippetId/like", auth, async (req, res) => {
  try {
    const { snippetId } = req.params;
    const { like = true } = req.body;

    // Check if snippet exists and is published
    const snippetCheck = await pool.query(
      `SELECT id, is_published FROM code_snippets WHERE id = $1`,
      [snippetId]
    );

    if (snippetCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    if (!snippetCheck.rows[0].is_published) {
      return res.status(403).json({
        success: false,
        message: "Cannot like unpublished snippet",
      });
    }

    if (like) {
      // Add like
      try {
        await pool.query(
          `INSERT INTO code_snippet_likes (snippet_id, student_id)
           VALUES ($1, $2)
           ON CONFLICT (snippet_id, student_id) DO NOTHING`,
          [snippetId, req.student.id]
        );

        // Update like count
        await pool.query(
          `UPDATE code_snippets 
           SET likes = likes + 1
           WHERE id = $1`,
          [snippetId]
        );
      } catch (err) {
        // Ignore duplicate likes
      }
    } else {
      // Remove like
      await pool.query(
        `DELETE FROM code_snippet_likes 
         WHERE snippet_id = $1 AND student_id = $2`,
        [snippetId, req.student.id]
      );

      // Update like count
      await pool.query(
        `UPDATE code_snippets 
         SET likes = GREATEST(likes - 1, 0)
         WHERE id = $1`,
        [snippetId]
      );
    }

    // Get updated like count
    const updatedSnippet = await pool.query(
      `SELECT cs.*,
              EXISTS (
                SELECT 1 FROM code_snippet_likes csl 
                WHERE csl.snippet_id = cs.id AND csl.student_id = $1
              ) as is_liked
       FROM code_snippets cs
       WHERE cs.id = $2`,
      [req.student.id, snippetId]
    );

    res.json({
      success: true,
      message: like ? "Snippet liked" : "Snippet unliked",
      data: { snippet: updatedSnippet.rows[0] },
    });
  } catch (error) {
    console.error("Like snippet error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update like",
    });
  }
}); // Get single snippet by ID
app.get("/api/code-snippets/:snippetId", auth, async (req, res) => {
  try {
    const { snippetId } = req.params;

    // Increment view count
    await pool.query(
      `UPDATE code_snippets 
       SET views = views + 1
       WHERE id = $1 AND is_published = true`,
      [snippetId]
    );

    const result = await pool.query(
      `SELECT cs.*, 
              s.first_name, 
              s.last_name,
              s.profile_image,
              s.student_id as author_id,
              COUNT(csl.id) as like_count,
              EXISTS (
                SELECT 1 FROM code_snippet_likes csl2 
                WHERE csl2.snippet_id = cs.id AND csl2.student_id = $1
              ) as is_liked
       FROM code_snippets cs
       LEFT JOIN students s ON cs.student_id = s.id
       LEFT JOIN code_snippet_likes csl ON cs.id = csl.snippet_id
       WHERE cs.id = $2 AND (cs.is_published = true OR cs.student_id = $1)
       GROUP BY cs.id, s.first_name, s.last_name, s.profile_image, s.student_id`,
      [req.student.id, snippetId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Snippet not found",
      });
    }

    res.json({
      success: true,
      data: { snippet: result.rows[0] },
    });
  } catch (error) {
    console.error("Get snippet error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch snippet",
    });
  }
}); // Get all published snippets (for public gallery)
app.get("/api/code-snippets/gallery", async (req, res) => {
  try {
    const { page = 1, limit = 20, language, sort = "newest" } = req.query;
    const offset = (page - 1) * limit;

    let sortClause;
    switch (sort) {
      case "popular":
        sortClause = "cs.likes DESC, cs.views DESC";
        break;
      case "trending":
        sortClause = "cs.views DESC, cs.likes DESC";
        break;
      default:
        sortClause = "cs.published_at DESC";
    }

    let query = `
      SELECT cs.id, cs.snippet_name, cs.language, cs.description, 
             cs.tags, cs.likes, cs.views, cs.published_at,
             s.first_name, s.last_name, s.profile_image
      FROM code_snippets cs
      LEFT JOIN students s ON cs.student_id = s.id
      WHERE cs.is_published = true AND cs.is_public = true
    `;

    const queryParams = [];
    let paramCount = 1;

    if (language && language !== "all") {
      query += ` AND cs.language = $${paramCount}`;
      queryParams.push(language);
      paramCount++;
    }

    query += `
      ORDER BY ${sortClause}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    queryParams.push(parseInt(limit), offset);

    const result = await pool.query(query, queryParams);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM code_snippets cs
      WHERE cs.is_published = true AND cs.is_public = true
    `;

    const countParams = [];
    paramCount = 1;

    if (language && language !== "all") {
      countQuery += ` AND cs.language = $${paramCount}`;
      countParams.push(language);
      paramCount++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0]?.total || 0);

    res.json({
      success: true,
      data: {
        snippets: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Gallery error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery snippets",
    });
  }
});

// Login Step 1: Request OTP
app.post(
  "/api/auth/login/request-otp",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(`🔐 OTP login request for: ${normalizedEmail}`);

      // Check if user exists and password is valid
      const result = await pool.query(
        `SELECT id, email, password, first_name FROM students WHERE email = $1`,
        [normalizedEmail]
      );
      const student = result.rows[0];

      if (!student) {
        console.log(`❌ User not found: ${normalizedEmail}`);
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      let isValid = false;
      let storedHash = student.password;

      // Check if hash is a valid bcrypt hash (length 60, starts with $2b$)
      const isValidBcrypt = storedHash && storedHash.startsWith('$2b$') && storedHash.length === 60;

      if (isValidBcrypt) {
        isValid = await bcrypt.compare(password, storedHash);
      } else {
        // Corrupted hash – repair it
        console.warn(`⚠️ Corrupted password hash for user ${student.email}, repairing...`);
        const newHash = await bcrypt.hash(password, 10);
        await pool.query(
          `UPDATE students SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
          [newHash, student.id]
        );
        isValid = true; // after repair, login succeeds
      }

      if (!isValid) {
        return res.status(400).json({ success: false, message: "Invalid credentials" });
      }

      // Generate and send OTP
      const otp = generateOTP();
      storeOtp(normalizedEmail, otp, "login");

      try {
        console.log(`📧 Sending OTP to: ${normalizedEmail}`);
        await sendOtpEmail(normalizedEmail, otp, "Login");
        console.log(`✅ OTP ${otp} generated for ${normalizedEmail}`);

        res.json({
          success: true,
          message: "OTP sent to your email. Please check your inbox.",
          email: normalizedEmail,
        });
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);

        // For development/debugging - don't reveal OTP in production
        if (process.env.NODE_ENV === "development") {
          console.log(`🛠️ DEBUG OTP for ${normalizedEmail}: ${otp}`);
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP email. Please try again.",
            debug: `OTP: ${otp}`,
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again in a moment.",
        });
      }
    } catch (err) {
      console.error("❌ Login OTP request error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during login. Please try again.",
      });
    }
  }
);

// Login Step 2: Verify OTP
// Login Step 2: Verify OTP - UPDATED WITH STUDENT_TYPE & COURSE_SELECTION
app.post(
  "/api/auth/login/verify-otp",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be 6 digits"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { email, otp } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(`🔐 OTP verification attempt for: ${normalizedEmail}`);

      const verification = verifyOtp(normalizedEmail, otp, "login");

      if (!verification.valid) {
        const remainingAttempts = getOtpAttempts(normalizedEmail, "login");

        return res.status(400).json({
          success: false,
          message: verification.message,
          remainingAttempts,
        });
      }

      // 🔥 FIXED: Include student_type and course_selection
      const result = await pool.query(
        `SELECT id, student_id, email, first_name, last_name, phone, 
                profile_image, student_type, course_selection, batch_month, batch_year, is_current_batch, created_at 
         FROM students WHERE email = $1`,
        [normalizedEmail]
      );

      const student = result.rows[0];
      if (!student) {
        return res.status(400).json({
          success: false,
          message: "User not found after OTP verification",
        });
      }

      // 🔥 FIXED: Include student_type and course_selection in JWT
      const token = jwt.sign(
        {
          id: student.id,
          studentId: student.student_id,
          email: student.email,
          firstName: student.first_name,
          lastName: student.last_name,
          studentType: student.student_type,
          courseSelection: student.course_selection,
          batchMonth: student.batch_month,
          batchYear: student.batch_year,
        },
        process.env.JWT_SECRET ||
        "your-fallback-secret-key-for-development-only-change-in-production",
        { expiresIn: "30d" }
      );

      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;

      const studentResponse = {
        id: student.id,
        studentId: student.student_id,
        email: student.email,
        firstName: student.first_name,
        lastName: student.last_name,
        phone: student.phone,
        profileImage: student.profile_image
          ? `${baseUrl}${student.profile_image}`
          : null,
        studentType: student.student_type,
        courseSelection: student.course_selection,
        batchMonth: student.batch_month,
        batchYear: student.batch_year,
        isCurrentBatch: student.is_current_batch,
        createdAt: student.created_at,
      };

      console.log(`✅ Successful OTP login for: ${normalizedEmail}`);

      res.json({
        success: true,
        message: "Login successful",
        data: {
          student: studentResponse,
          token,
        },
      });
    } catch (err) {
      console.error("❌ Login OTP verify error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during OTP verification",
      });
    }
  }
);

// Forgot Password Step 1: Request OTP
app.post(
  "/api/auth/forgot-password/request-otp",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { email } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(`🔑 Forgot password OTP request for: ${normalizedEmail}`);

      const result = await pool.query(
        "SELECT id, first_name FROM students WHERE email = $1",
        [normalizedEmail]
      );
      if (result.rows.length === 0) {
        console.log(`❌ Email not registered: ${normalizedEmail}`);
        return res.status(400).json({
          success: false,
          message: "Email not registered",
        });
      }

      const otp = generateOTP();
      storeOtp(normalizedEmail, otp, "forgot_password");

      try {
        await sendOtpEmail(normalizedEmail, otp, "Password Reset");
        console.log(`✅ Password reset OTP sent to: ${normalizedEmail}`);

        res.json({
          success: true,
          message: "OTP sent to your email to verify identity",
          email: normalizedEmail,
        });
      } catch (emailError) {
        console.error("❌ Password reset email failed:", emailError);

        // For debugging in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            `🛠️ DEBUG Password Reset OTP for ${normalizedEmail}: ${otp}`
          );
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP email. Please try again.",
            debug: `OTP: ${otp}`,
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again.",
        });
      }
    } catch (err) {
      console.error("❌ Forgot password OTP request error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during password reset request",
      });
    }
  }
);

// Forgot Password Step 2: Verify OTP and reset password
app.post(
  "/api/auth/forgot-password/verify-otp-reset",
  [
    body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
    body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { email, otp, newPassword } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      const verification = verifyOtp(normalizedEmail, otp, "forgot_password");

      if (!verification.valid) {
        const remainingAttempts = getOtpAttempts(normalizedEmail, "forgot_password");
        return res.status(400).json({
          success: false,
          message: verification.message,
          remainingAttempts,
        });
      }

      // 🔥 Set audit context
      await pool.query("SET myapp.changed_by = $1", [normalizedEmail]);
      await pool.query("SET myapp.change_source = $1", ['forgot_password']);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const result = await pool.query(
        `UPDATE students SET password = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE email = $2 RETURNING id`,
        [hashedPassword, normalizedEmail]
      );

      if (result.rowCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Failed to update password",
        });
      }

      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (err) {
      console.error("❌ Forgot password reset error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during password reset",
      });
    }
  }
);

// Resend OTP endpoint
app.post(
  "/api/auth/resend-otp",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("purpose")
      .isIn(["login", "forgot_password"])
      .withMessage("Invalid purpose"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { email, purpose } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(
        `🔄 Resend OTP request for: ${normalizedEmail}, purpose: ${purpose}`
      );

      // For login purpose, verify user exists
      if (purpose === "login") {
        const userResult = await pool.query(
          "SELECT id FROM students WHERE email = $1",
          [normalizedEmail]
        );
        if (userResult.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: "Email not registered",
          });
        }
      }

      const otp = generateOTP();
      storeOtp(normalizedEmail, otp, purpose);

      try {
        const emailPurpose = purpose === "login" ? "Login" : "Password Reset";
        await sendOtpEmail(normalizedEmail, otp, emailPurpose);
        console.log(`✅ Resent OTP to: ${normalizedEmail}`);

        res.json({
          success: true,
          message: "OTP resent successfully",
        });
      } catch (emailError) {
        console.error("❌ Resend OTP email failed:", emailError);

        // For debugging
        if (process.env.NODE_ENV === "development") {
          console.log(`🛠️ DEBUG Resent OTP for ${normalizedEmail}: ${otp}`);
          return res.status(500).json({
            success: false,
            message: "Failed to resend OTP. Please try again.",
            debug: `OTP: ${otp}`,
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to resend OTP. Please try again.",
        });
      }
    } catch (err) {
      console.error("❌ Resend OTP error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error while resending OTP",
      });
    }
  }
);

// -------------------------------------------
// Progress Routes with ID-based tracking
// -------------------------------------------
// -------------------------------------------
// Enhanced Progress Routes with Proper Tracking
// -------------------------------------------
app.post("/api/progress/content/complete", auth, async (req, res) => {
  try {
    const { contentId, goalName, courseName } = req.body;

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required",
      });
    }

    // First, check if this content already exists for the student
    const existingRecord = await pool.query(
      `SELECT * FROM student_content_progress 
       WHERE student_id = $1 AND content_id = $2`,
      [req.student.id, contentId]
    );

    if (existingRecord.rows.length > 0) {
      // Update existing record
      const result = await pool.query(
        `UPDATE student_content_progress 
         SET completed = $1, completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
         WHERE student_id = $2 AND content_id = $3
         RETURNING *`,
        [true, req.student.id, contentId]
      );

      return res.json({
        success: true,
        message: "Content marked as completed",
        data: result.rows[0],
      });
    } else {
      // Insert new record
      const result = await pool.query(
        `INSERT INTO student_content_progress 
         (student_id, content_id, goal_name, course_name, completed, completed_at) 
         VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
         RETURNING *`,
        [req.student.id, contentId, goalName || null, courseName || null, true]
      );

      return res.json({
        success: true,
        message: "Content marked as completed",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Progress update error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating progress",
    });
  }
});

app.get("/api/progress/summary", auth, async (req, res) => {
  try {
    // Get progress by goal and course
    const result = await pool.query(
      `SELECT 
         goal_name,
         course_name,
         COUNT(*) as total_content,
         SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed_content
       FROM student_content_progress 
       WHERE student_id = $1
       GROUP BY goal_name, course_name`,
      [req.student.id]
    );

    // Calculate overall progress for goals and courses
    const goalProgress = {};
    const courseProgress = {};
    const progressSummary = [];

    // Calculate individual goal and course progress
    result.rows.forEach((row) => {
      const progressPercentage =
        row.total_content > 0
          ? Math.round(
            (Number(row.completed_content) / Number(row.total_content)) * 100
          )
          : 0;

      if (row.goal_name) {
        goalProgress[row.goal_name] = progressPercentage;
      }
      if (row.course_name) {
        courseProgress[row.course_name] = progressPercentage;
      }

      progressSummary.push({
        goalName: row.goal_name,
        courseName: row.course_name,
        totalContent: Number(row.total_content),
        completedContent: Number(row.completed_content),
        progressPercentage: progressPercentage,
      });
    });

    res.json({
      success: true,
      data: {
        progressSummary,
        goalProgress,
        courseProgress,
      },
    });
  } catch (error) {
    console.error("Progress summary error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress summary",
    });
  }
});

// Get overall student progress
app.get("/api/progress/overall", auth, async (req, res) => {
  try {
    const totalResult = await pool.query(
      `SELECT 
         COUNT(*) as total_content,
         SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed_content
       FROM student_content_progress 
       WHERE student_id = $1`,
      [req.student.id]
    );

    const totalContent = Number(totalResult.rows[0]?.total_content || 0);
    const completedContent = Number(
      totalResult.rows[0]?.completed_content || 0
    );
    const overallProgress =
      totalContent > 0
        ? Math.round((completedContent / totalContent) * 100)
        : 0;

    res.json({
      success: true,
      data: {
        totalContent,
        completedContent,
        overallProgress,
      },
    });
  } catch (error) {
    console.error("Overall progress error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching overall progress",
    });
  }
});

app.post("/api/progress/content/incomplete", auth, async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({
        success: false,
        message: "Content ID is required",
      });
    }

    await pool.query(
      `DELETE FROM student_content_progress 
       WHERE student_id = $1 AND content_id = $2`,
      [req.student.id, contentId]
    );

    res.json({
      success: true,
      message: "Content marked as incomplete",
    });
  } catch (error) {
    console.error("Progress delete error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while removing progress",
    });
  }
});

app.get("/api/progress/completed", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT content_id, goal_name, course_name, completed_at
       FROM student_content_progress 
       WHERE student_id = $1 AND completed = true
       ORDER BY completed_at DESC`,
      [req.student.id]
    );

    res.json({
      success: true,
      data: {
        completedContent: result.rows,
      },
    });
  } catch (error) {
    console.error("Progress fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress",
    });
  }
});

app.get("/api/progress/summary", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         goal_name,
         course_name,
         COUNT(*) as total_content,
         SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed_content
       FROM student_content_progress 
       WHERE student_id = $1 AND (goal_name IS NOT NULL OR course_name IS NOT NULL)
       GROUP BY goal_name, course_name`,
      [req.student.id]
    );

    // Calculate progress percentages
    const summary = result.rows.map((row) => ({
      goalName: row.goal_name,
      courseName: row.course_name,
      totalContent: Number.parseInt(row.total_content),
      completedContent: Number.parseInt(row.completed_content),
      progressPercentage:
        Number.parseInt(row.total_content) > 0
          ? Math.round(
            (Number.parseInt(row.completed_content) /
              Number.parseInt(row.total_content)) *
            100
          )
          : 0,
    }));

    res.json({
      success: true,
      data: {
        progressSummary: summary,
      },
    });
  } catch (error) {
    console.error("Progress summary error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress summary",
    });
  }
});

app.get("/api/progress/course/:courseName", auth, async (req, res) => {
  try {
    const { courseName } = req.params;

    const result = await pool.query(
      `SELECT 
         content_id,
         completed,
         completed_at
       FROM student_content_progress 
       WHERE student_id = $1 AND course_name = $2`,
      [req.student.id, courseName]
    );

    const totalContent = result.rows.length;
    const completedContent = result.rows.filter((r) => r.completed).length;
    const progressPercentage =
      totalContent > 0
        ? Math.round((completedContent / totalContent) * 100)
        : 0;

    res.json({
      success: true,
      data: {
        courseName,
        totalContent,
        completedContent,
        progressPercentage,
        details: result.rows,
      },
    });
  } catch (error) {
    console.error("Course progress error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching course progress",
    });
  }
});

app.get("/api/progress/goal/:goalName", auth, async (req, res) => {
  try {
    const { goalName } = req.params;

    const result = await pool.query(
      `SELECT 
         content_id,
         completed,
         completed_at,
         course_name
       FROM student_content_progress 
       WHERE student_id = $1 AND goal_name = $2`,
      [req.student.id, goalName]
    );

    const totalContent = result.rows.length;
    const completedContent = result.rows.filter((r) => r.completed).length;
    const progressPercentage =
      totalContent > 0
        ? Math.round((completedContent / totalContent) * 100)
        : 0;

    res.json({
      success: true,
      data: {
        goalName,
        totalContent,
        completedContent,
        progressPercentage,
        details: result.rows,
      },
    });
  } catch (error) {
    console.error("Goal progress error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching goal progress",
    });
  }
});

// In server.js, find the /api/coding-practice/save-progress route and update it:

// Save or update question progress
app.post("/api/coding-practice/save-progress", auth, async (req, res) => {
  try {
    const { practiceId, questionId, language, code, status, score, attempt } =
      req.body;

    if (!practiceId || !questionId || !language) {
      return res.status(400).json({
        success: false,
        message: "Practice ID, Question ID, and Language are required",
      });
    }

    console.log(`💾 Saving progress for:`, {
      practiceId,
      questionId,
      language,
      status,
      score,
      hasCode: !!code,
      codeLength: code ? code.length : 0,
    });

    // Check if record exists
    const existing = await pool.query(
      `SELECT * FROM coding_practice_progress 
       WHERE student_id = $1 AND question_id = $2`,
      [req.student.id, questionId]
    );

    let result;
    let newAttempts;

    if (existing.rows.length > 0) {
      // Update existing record
      const previousAttempts = existing.rows[0].attempts || [];

      // Add new attempt if provided
      if (attempt) {
        newAttempts = [...previousAttempts, attempt];
      } else {
        newAttempts = previousAttempts;
      }

      // Ensure code is properly stored as JSON string
      let codeToStore = code;
      if (typeof code === "object") {
        codeToStore = JSON.stringify(code);
      }

      result = await pool.query(
        `UPDATE coding_practice_progress 
         SET code = $1, status = $2, score = $3, attempts = $4, 
             last_attempt = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP,
             practice_id = $5, language = $6
         WHERE student_id = $7 AND question_id = $8
         RETURNING *`,
        [
          codeToStore,
          status,
          score || 0,
          JSON.stringify(newAttempts),
          practiceId,
          language,
          req.student.id,
          questionId,
        ]
      );
    } else {
      // Insert new record
      newAttempts = attempt ? [attempt] : [];

      // Ensure code is properly stored as JSON string
      let codeToStore = code;
      if (typeof code === "object") {
        codeToStore = JSON.stringify(code);
      }

      result = await pool.query(
        `INSERT INTO coding_practice_progress 
         (student_id, practice_id, question_id, language, code, status, score, attempts, last_attempt)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
         RETURNING *`,
        [
          req.student.id,
          practiceId,
          questionId,
          language,
          codeToStore,
          status,
          score || 0,
          JSON.stringify(newAttempts),
        ]
      );
    }

    console.log(`✅ Progress saved successfully for question: ${questionId}`);

    res.json({
      success: true,
      message: "Progress saved successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Coding practice save error:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      success: false,
      message: "Failed to save progress",
      error: error.message,
    });
  }
});

// Also update the get question progress endpoint:
app.get("/api/coding-practice/question/:questionId", auth, async (req, res) => {
  try {
    const { questionId } = req.params;

    const result = await pool.query(
      `SELECT * FROM coding_practice_progress 
       WHERE student_id = $1 AND question_id = $2`,
      [req.student.id, questionId]
    );

    const progress = result.rows[0] || null;

    // Try to parse code if it exists
    if (progress && progress.code) {
      try {
        progress.code = JSON.parse(progress.code);
      } catch (e) {
        // If it's not valid JSON, leave it as is
        console.log("Code is not JSON, keeping as string");
      }
    }

    res.json({
      success: true,
      data: {
        progress,
      },
    });
  } catch (error) {
    console.error("Coding practice fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch progress",
    });
  }
});

// Update the get all progress endpoint:
app.get("/api/coding-practice/progress", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM coding_practice_progress 
       WHERE student_id = $1
       ORDER BY updated_at DESC`,
      [req.student.id]
    );

    // Parse code for each progress record
    const progressWithParsedCode = result.rows.map((record) => {
      if (record.code) {
        try {
          record.code = JSON.parse(record.code);
        } catch (e) {
          // If parsing fails, keep as is
          console.log(
            `Failed to parse code for ${record.question_id}:`,
            e.message
          );
        }
      }
      return record;
    });

    res.json({
      success: true,
      data: {
        progress: progressWithParsedCode,
      },
    });
  } catch (error) {
    console.error("Coding practice progress fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch practice progress",
    });
  }
});

// Mark entire practice as completed
app.post("/api/coding-practice/complete-practice", auth, async (req, res) => {
  try {
    const { practiceId, goalName, courseName } = req.body;

    if (!practiceId) {
      return res.status(400).json({
        success: false,
        message: "Practice ID is required",
      });
    }

    // Check if practice is already completed
    const existing = await pool.query(
      `SELECT * FROM coding_practice_completion 
       WHERE student_id = $1 AND practice_id = $2`,
      [req.student.id, practiceId]
    );

    let result;

    if (existing.rows.length > 0) {
      result = existing.rows[0];
    } else {
      // Insert new completion record
      const insertResult = await pool.query(
        `INSERT INTO coding_practice_completion 
         (student_id, practice_id, goal_name, course_name, completed_at)
         VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
         RETURNING *`,
        [req.student.id, practiceId, goalName || null, courseName || null]
      );
      result = insertResult.rows[0];
    }

    // Also mark in student_content_progress for course/goal tracking
    if (goalName || courseName) {
      const contentId = `practice-${practiceId}`;
      const progressResult = await pool.query(
        `SELECT * FROM student_content_progress 
         WHERE student_id = $1 AND content_id = $2`,
        [req.student.id, contentId]
      );

      if (progressResult.rows.length > 0) {
        await pool.query(
          `UPDATE student_content_progress 
           SET completed = true, completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
           WHERE student_id = $1 AND content_id = $2`,
          [req.student.id, contentId]
        );
      } else {
        await pool.query(
          `INSERT INTO student_content_progress 
           (student_id, content_id, goal_name, course_name, completed, completed_at)
           VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP)`,
          [req.student.id, contentId, goalName || null, courseName || null]
        );
      }
    }

    res.json({
      success: true,
      message: "Practice marked as completed",
      data: result,
    });
  } catch (error) {
    console.error("Practice completion error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to mark practice as completed",
    });
  }
});

// Get practice completion status
app.get(
  "/api/coding-practice/completion/:practiceId",
  auth,
  async (req, res) => {
    try {
      const { practiceId } = req.params;

      const result = await pool.query(
        `SELECT * FROM coding_practice_completion 
       WHERE student_id = $1 AND practice_id = $2`,
        [req.student.id, practiceId]
      );

      const isCompleted = result.rows.length > 0;

      res.json({
        success: true,
        data: {
          isCompleted,
          completion: isCompleted ? result.rows[0] : null,
        },
      });
    } catch (error) {
      console.error("Practice completion fetch error:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch completion status",
      });
    }
  }
);

// Get practice summary (all questions status for a practice)
app.get("/api/coding-practice/summary/:practiceId", auth, async (req, res) => {
  try {
    const { practiceId } = req.params;

    const result = await pool.query(
      `SELECT * FROM coding_practice_progress 
       WHERE student_id = $1 AND practice_id = $2
       ORDER BY question_id`,
      [req.student.id, practiceId]
    );

    const totalQuestions = result.rows.length;
    const solvedQuestions = result.rows.filter(
      (q) => q.status === "solved"
    ).length;
    const attemptedQuestions = result.rows.filter(
      (q) => q.status === "attempted" || q.status === "solved"
    ).length;

    res.json({
      success: true,
      data: {
        practiceId,
        totalQuestions,
        solvedQuestions,
        attemptedQuestions,
        progress: result.rows,
      },
    });
  } catch (error) {
    console.error("Practice summary error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch practice summary",
    });
  }
});

// -------------------------------------------
// 🔹 Register Route
// -------------------------------------------
// Update the registration route
// -------------------------------------------
// 🔹 REGISTER ROUTE - UPDATED WITH COURSE_SELECTION
// -------------------------------------------
app.post(
  "/api/auth/register",
  upload.single("profileImage"),
  [
    body("studentId")
      .notEmpty()
      .withMessage("Student ID is required")
      .isLength({ min: 3 })
      .withMessage("Student ID must be at least 3 characters long"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),
    body("studentType")
      .optional()
      .isIn(["zorvixe_core", "zorvixe_pro", "zorvixe_elite"])
      .withMessage("Invalid student type"),
    body("courseSelection")
      .optional()
      .isIn(["web_development", "digital_marketing", "java_programming"])
      .withMessage("Invalid course selection"),
  ],
  async (req, res) => {
    try {
      console.log("Registration request received:", req.body);
      console.log("Uploaded file:", req.file);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const {
        studentId,
        email,
        password,
        firstName,
        lastName,
        phone,
        studentType = "zorvixe_core", // Default to core
        courseSelection = "web_development", // 🔥 FIXED: Default to web_development
        batchMonth,
        batchYear,
        isCurrentBatch,
      } = req.body;

      // Check if email or student ID already exists
      const existingEmail = await pool.query(
        "SELECT * FROM students WHERE email = $1",
        [email]
      );
      const existingId = await pool.query(
        "SELECT * FROM students WHERE student_id = $1",
        [studentId]
      );

      if (existingEmail.rows.length > 0) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      if (existingId.rows.length > 0) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: "Student ID already exists",
        });
      }

      // Hash password
      // Helper to escape single quotes for SQL literals
      const escapeSqlString = (str) => str.replace(/'/g, "''");

      await pool.query(`SET myapp.changed_by = '${escapeSqlString(email)}'`);
      await pool.query(`SET myapp.change_source = 'registration'`);

      const hashedPassword = await bcrypt.hash(password, 10);

      // Handle profile image
      let profileImagePath = null;
      if (req.file) {
        profileImagePath = `/uploads/${req.file.filename}`;
      }

      // Parse batch data
      const currentBatch = isCurrentBatch === "true" || isCurrentBatch === true;
      const batchYearInt = batchYear
        ? Number.parseInt(batchYear)
        : new Date().getFullYear();

      // 🔥 FIXED: Include course_selection in INSERT
      const result = await pool.query(
        `INSERT INTO students (student_id, email, password, first_name, last_name, phone, 
                        profile_image, student_type, course_selection, batch_month, batch_year, is_current_batch, join_date)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_DATE)
         RETURNING id, student_id, email, first_name, last_name, phone, profile_image, 
                   student_type, course_selection, batch_month, batch_year, is_current_batch, join_date, created_at`,
        [
          studentId,
          email,
          hashedPassword,
          firstName,
          lastName,
          phone,
          profileImagePath,
          studentType,
          courseSelection, // 🔥 FIXED: Added course_selection
          batchMonth,
          batchYearInt,
          currentBatch,
        ]
      );

      const student = result.rows[0];

      // 🔥 FIXED: Include course_selection in JWT
      const token = jwt.sign(
        {
          id: student.id,
          studentId: student.student_id,
          email: student.email,
          firstName: student.first_name,
          lastName: student.last_name,
          studentType: student.student_type,
          courseSelection: student.course_selection,
          batchMonth: student.batch_month,
          batchYear: student.batch_year,
        },
        process.env.JWT_SECRET ||
        "your-fallback-secret-key-for-development-only-change-in-production",
        { expiresIn: "30d" }
      );

      // Construct full image URL
      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;
      const studentResponse = {
        id: student.id,
        studentId: student.student_id,
        email: student.email,
        firstName: student.first_name,
        lastName: student.last_name,
        phone: student.phone,
        profileImage: student.profile_image
          ? `${baseUrl}${student.profile_image}`
          : null,
        studentType: student.student_type,
        courseSelection: student.course_selection,
        batchMonth: student.batch_month,
        batchYear: student.batch_year,
        isCurrentBatch: student.is_current_batch,
        createdAt: student.created_at,
      };

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          student: studentResponse,
          token,
        },
      });
    } catch (err) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Registration error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      });
    }
  }
);

// -------------------------------------------
// 🔹 Login Route (Legacy - Keep for compatibility)
// -------------------------------------------
// -------------------------------------------
// 🔹 LOGIN ROUTE - UPDATED WITH STUDENT_TYPE & COURSE_SELECTION
// -------------------------------------------
app.post(
  "/api/auth/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      // Fetch student by email
      const result = await pool.query(
        `SELECT id, student_id, email, password, first_name, last_name, phone, 
                profile_image, student_type, course_selection, 
                batch_month, batch_year, is_current_batch, created_at 
         FROM students WHERE email = $1`,
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const student = result.rows[0];
      let storedHash = student.password;
      let isValid = false;

      // Check if stored hash is a valid bcrypt hash (60 chars, starts with $2b$)
      const isValidBcrypt = storedHash && storedHash.startsWith('$2b$') && storedHash.length === 60;

      if (isValidBcrypt) {
        // Normal bcrypt comparison
        isValid = await bcrypt.compare(password, storedHash);
      } else {
        // Corrupted hash – repair it
        console.warn(`⚠️ Corrupted password hash for user ${student.email}, repairing...`);
        const newHash = await bcrypt.hash(password, 10);
        await pool.query(
          `UPDATE students SET password = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
          [newHash, student.id]
        );
        isValid = true; // after repair, login succeeds
      }

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate token (include student_type and course_selection)
      const token = jwt.sign(
        {
          id: student.id,
          studentId: student.student_id,
          email: student.email,
          firstName: student.first_name,
          lastName: student.last_name,
          studentType: student.student_type,
          courseSelection: student.course_selection,
          batchMonth: student.batch_month,
          batchYear: student.batch_year,
        },
        process.env.JWT_SECRET || "your-fallback-secret-key-for-development-only-change-in-production",
        { expiresIn: "30d" }
      );

      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;
      const studentResponse = {
        id: student.id,
        studentId: student.student_id,
        email: student.email,
        firstName: student.first_name,
        lastName: student.last_name,
        phone: student.phone,
        profileImage: student.profile_image ? `${baseUrl}${student.profile_image}` : null,
        studentType: student.student_type,
        courseSelection: student.course_selection,
        batchMonth: student.batch_month,
        batchYear: student.batch_year,
        isCurrentBatch: student.is_current_batch,
        createdAt: student.created_at,
      };

      res.json({
        success: true,
        message: "Login successful",
        data: {
          student: studentResponse,
          token,
        },
      });
    } catch (err) {
      console.error("Login error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during login",
      });
    }
  }
);

// -------------------------------------------
// 🔹 Profile Route (Protected)
// -------------------------------------------
// Update the profile route response
// -------------------------------------------
// 🔹 PROFILE ROUTE - UPDATED WITH STUDENT_TYPE & COURSE_SELECTION
// -------------------------------------------
app.get("/api/auth/profile", auth, async (req, res) => {
  try {
    const baseUrl =
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;
    const studentResponse = {
      id: req.student.id,
      studentId: req.student.student_id,
      email: req.student.email,
      firstName: req.student.first_name,
      lastName: req.student.last_name,
      phone: req.student.phone,
      profileImage: req.student.profile_image
        ? `${baseUrl}${req.student.profile_image}`
        : null,
      studentType: req.student.student_type,
      courseSelection: req.student.course_selection,
      batchMonth: req.student.batch_month,
      batchYear: req.student.batch_year,
      isCurrentBatch: req.student.is_current_batch,
      createdAt: req.student.created_at,
    };

    res.json({
      success: true,
      data: { student: studentResponse },
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    });
  }
});

app.put(
  "/api/student/update-profile-image",
  auth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const studentId = req.student.id; // Get student ID from auth middleware

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded",
        });
      }

      // Upload to cloud storage or save locally
      const imageUrl = `/uploads/${req.file.filename}`;

      console.log(`🖼️ Updating profile image for student ${studentId}`);

      // Get the old image path to delete it later if needed
      const oldImageResult = await pool.query(
        "SELECT profile_image FROM students WHERE id = $1",
        [studentId]
      );

      const oldProfileImage = oldImageResult.rows[0]?.profile_image;

      // Update student's profile image in PostgreSQL
      const updatedStudentResult = await pool.query(
        `UPDATE students 
         SET profile_image = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING id, student_id, email, first_name, last_name, profile_image, 
                   batch_month, batch_year, is_current_batch, created_at`,
        [imageUrl, studentId]
      );

      if (updatedStudentResult.rows.length === 0) {
        // If update failed, delete the uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          message: "Student not found",
        });
      }

      // Delete old profile image if it exists and is not default
      if (
        oldProfileImage &&
        oldProfileImage !== "/uploads/default-profile.png"
      ) {
        const oldImagePath = path.join(
          UPLOAD_BASE_PATH,
          oldProfileImage.replace("/uploads/", "")
        ); // ✓ CORRECT
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
            console.log(`🗑️ Deleted old profile image: ${oldProfileImage}`);
          } catch (deleteError) {
            console.error(
              "Error deleting old profile image:",
              deleteError.message
            );
          }
        }
      }

      const updatedStudent = updatedStudentResult.rows[0];
      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;

      // Format response
      const studentResponse = {
        id: updatedStudent.id,
        studentId: updatedStudent.student_id,
        email: updatedStudent.email,
        firstName: updatedStudent.first_name,
        lastName: updatedStudent.last_name,
        profileImage: updatedStudent.profile_image
          ? `${baseUrl}${updatedStudent.profile_image}`
          : null,
        batchMonth: updatedStudent.batch_month,
        batchYear: updatedStudent.batch_year,
        isCurrentBatch: updatedStudent.is_current_batch,
        createdAt: updatedStudent.created_at,
      };

      console.log(
        `✅ Profile image updated successfully for student ${studentId}`
      );

      res.json({
        success: true,
        message: "Profile image updated successfully",
        data: {
          profileImage: `${baseUrl}${imageUrl}`,
          student: studentResponse,
        },
      });
    } catch (error) {
      console.error("❌ Profile image update error:", error.message);

      // Clean up uploaded file if there was an error
      if (req.file && req.file.path) {
        try {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
            console.log("🧹 Cleaned up uploaded file due to error");
          }
        } catch (cleanupError) {
          console.error("File cleanup error:", cleanupError.message);
        }
      }

      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  }
);

// -------------------------------------------
// 🔹 Update Profile Route (Protected)
// -------------------------------------------
app.put(
  "/api/auth/profile",
  auth,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      console.log("Update profile request:", req.body);
      console.log("Update profile file:", req.file);

      const {
        firstName,
        lastName,
        phone,
        batchMonth,
        batchYear,
        isCurrentBatch,
      } = req.body;

      let profileImagePath = req.student.profile_image;

      if (req.file) {
        profileImagePath = `/uploads/${req.file.filename}`;
        if (
          req.student.profile_image &&
          req.student.profile_image !== "/uploads/default-profile.png"
        ) {
          const oldImagePath = path.join(__dirname, req.student.profile_image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      }

      const batchYearInt = batchYear
        ? Number.parseInt(batchYear)
        : req.student.batch_year;
      const currentBatch = isCurrentBatch === "true" || isCurrentBatch === true;

      const result = await pool.query(
        `UPDATE students 
         SET first_name = $1, last_name = $2, phone = $3, 
             profile_image = $4, batch_month = $5, batch_year = $6, 
             is_current_batch = $7, updated_at = CURRENT_TIMESTAMP
         WHERE id = $8
         RETURNING id, student_id, email, first_name, last_name, phone, 
                   profile_image, batch_month, batch_year, is_current_batch, created_at`,
        [
          firstName,
          lastName,
          phone,
          profileImagePath,
          batchMonth,
          batchYearInt,
          currentBatch,
          req.student.id,
        ]
      );

      const updatedStudent = result.rows[0];

      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;
      const studentResponse = {
        id: updatedStudent.id,
        studentId: updatedStudent.student_id,
        email: updatedStudent.email,
        firstName: updatedStudent.first_name,
        lastName: updatedStudent.last_name,
        phone: updatedStudent.phone,
        profileImage: updatedStudent.profile_image
          ? `${baseUrl}${updatedStudent.profile_image}`
          : null,
        batchMonth: updatedStudent.batch_month,
        batchYear: updatedStudent.batch_year,
        isCurrentBatch: updatedStudent.is_current_batch,
        createdAt: updatedStudent.created_at,
      };

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: { student: studentResponse },
      });
    } catch (err) {
      console.error("Profile update error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during profile update",
      });
    }
  }
);

// -------------------------------------------
// 🔹 Health Check
// -------------------------------------------
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Server & DB running",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error",
      error: error.message,
    });
  }
});

// -------------------------------------------
// 🔹 Test Email Route
// -------------------------------------------
app.post("/api/test-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const testOtp = generateOTP();

    await sendOtpEmail(email, testOtp, "Test Email");

    res.json({
      success: true,
      message: "Test email sent successfully",
      debug:
        process.env.NODE_ENV === "development" ? `OTP: ${testOtp}` : undefined,
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message,
    });
  }
});

// -------------------------------------------
// 🔹 NEW: Get Student Complete Profile
// -------------------------------------------
app.get("/api/student/complete-profile", auth, async (req, res) => {
  try {
    const studentId = req.student.id;

    // Get student basic info
    const studentResult = await pool.query(
      `SELECT * FROM students WHERE id = $1`,
      [studentId]
    );

    if (studentResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const student = studentResult.rows[0];

    // Get projects
    const projectsResult = await pool.query(
      `SELECT * FROM student_projects WHERE student_id = $1 ORDER BY created_at DESC`,
      [studentId]
    );

    // Get achievements
    const achievementsResult = await pool.query(
      `SELECT * FROM student_achievements WHERE student_id = $1 ORDER BY created_at DESC`,
      [studentId]
    );

    // 🔥 NEW: Get work experiences
    const workExperiencesResult = await pool.query(
      `SELECT * FROM student_work_experiences WHERE student_id = $1 ORDER BY start_date DESC, created_at DESC`,
      [studentId]
    );

    // Get progress
    const progressResult = await pool.query(
      `SELECT * FROM student_subtopic_progress WHERE student_id = $1`,
      [studentId]
    );

    const baseUrl =
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;

    // Format student response
    const studentResponse = {
      id: student.id,
      studentId: student.student_id,
      email: student.email,
      firstName: student.first_name,
      lastName: student.last_name,
      phone: student.phone,
      profileImage: student.profile_image
        ? `${baseUrl}${student.profile_image}`
        : null,
      studentType: student.student_type,
      batchMonth: student.batch_month,
      batchYear: student.batch_year,
      isCurrentBatch: student.is_current_batch,

      // Personal Details
      nameOnCertificate: student.name_on_certificate,
      gender: student.gender,
      preferredLanguages: student.preferred_languages || [],
      dateOfBirth: student.date_of_birth,
      codePlaygroundUsername: student.code_playground_username,
      linkedinProfileUrl: student.linkedin_profile_url,
      githubProfileUrl: student.github_profile_url,
      hackerrankProfileUrl: student.hackerrank_profile_url,
      leetcodeProfileUrl: student.leetcode_profile_url,
      resumeUrl: student.resume_url,

      // Parent/Guardian Details
      parentFirstName: student.parent_first_name,
      parentLastName: student.parent_last_name,
      parentRelation: student.parent_relation,

      // Current Address
      addressLine1: student.address_line_1,
      addressLine2: student.address_line_2,
      country: student.country,
      state: student.state,
      district: student.district,
      city: student.city,
      postalCode: student.postal_code,

      // Current Expertise
      currentCodingLevel: student.current_coding_level,
      technicalSkills: student.technical_skills || [],
      hasLaptop: student.has_laptop,

      // Job Preferences
      jobSearchStatus: student.job_search_status,
      preferredJobLocations: student.preferred_job_locations || [],
      expectedCtcRange: student.expected_ctc_range,
      preferredTeachingLanguage: student.preferred_teaching_language,
      preferredVideoLanguage: student.preferred_video_language,

      // Education Details
      tenthMarksType: student.tenth_marks_type,
      tenthMarks: student.tenth_marks,
      twelfthEducationType: student.twelfth_education_type,
      twelfthMarksType: student.twelfth_marks_type,
      twelfthMarks: student.twelfth_marks,
      bachelorDegree: student.bachelor_degree,
      bachelorBranch: student.bachelor_branch,
      bachelorCgpa: student.bachelor_cgpa,
      bachelorStartYear: student.bachelor_start_year,
      bachelorEndYear: student.bachelor_end_year,
      bachelorStatus: student.bachelor_status,
      bachelorInstitute: student.bachelor_institute,
      bachelorInstituteState: student.bachelor_institute_state,
      bachelorInstituteCity: student.bachelor_institute_city,
      bachelorInstitutePincode: student.bachelor_institute_pincode,
      bachelorInstituteDistrict: student.bachelor_institute_district,

      // Work Experience
      occupationStatus: student.occupation_status,
      hasWorkExperience: student.has_work_experience,

      // Additional data
      projects: projectsResult.rows,
      achievements: achievementsResult.rows,
      workExperiences: workExperiencesResult.rows, // 🔥 NEW
      progress: progressResult.rows,

      createdAt: student.created_at,
    };

    res.json({
      success: true,
      data: { student: studentResponse },
    });
  } catch (error) {
    console.error("Complete profile fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching complete profile",
    });
  }
});

// -------------------------------------------
// 🔹 NEW: Update Student Complete Profile (FIXED)
// -------------------------------------------
app.put(
  "/api/student/complete-profile",
  auth,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const studentId = req.student.id;

      console.log(
        "📝 Complete profile update request received for student:",
        studentId
      );
      console.log("📦 Request body keys:", Object.keys(req.body));

      // Helper function to safely parse values
      const parseValue = (value, type = "string") => {
        if (value === "" || value === null || value === undefined) {
          return null;
        }

        switch (type) {
          case "int":
            const intVal = parseInt(value);
            return isNaN(intVal) ? null : intVal;
          case "float":
            const floatVal = parseFloat(value);
            return isNaN(floatVal) ? null : floatVal;
          case "boolean":
            if (typeof value === "boolean") return value;
            return value === "true" || value === true || value === "1";
          case "date":
            if (!value) return null;
            // Validate date format
            const date = new Date(value);
            return isNaN(date.getTime()) ? null : value;
          case "array":
            if (Array.isArray(value)) return value;
            if (typeof value === "string") {
              try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [];
              } catch (e) {
                return value
                  .split(",")
                  .map((item) => item.trim())
                  .filter((item) => item);
              }
            }
            return [];
          default:
            return value;
        }
      };

      // Extract all fields from request body with proper parsing
      const {
        // Basic Details
        firstName,
        lastName,
        phone,
        batchMonth,
        batchYear,
        isCurrentBatch,

        // Personal Details
        nameOnCertificate,
        gender,
        preferredLanguages,
        dateOfBirth,
        codePlaygroundUsername,
        linkedinProfileUrl,
        githubProfileUrl,
        hackerrankProfileUrl,
        leetcodeProfileUrl,

        // Parent/Guardian Details
        parentFirstName,
        parentLastName,
        parentRelation,

        // Current Address
        addressLine1,
        addressLine2,
        country,
        state,
        district,
        city,
        postalCode,

        // Current Expertise
        currentCodingLevel,
        technicalSkills,
        hasLaptop,

        // Job Preferences
        jobSearchStatus,
        preferredJobLocations,
        expectedCtcRange,
        preferredTeachingLanguage,
        preferredVideoLanguage,

        // Education Details
        tenthMarksType,
        tenthMarks,
        twelfthEducationType,
        twelfthMarksType,
        twelfthMarks,
        bachelorDegree,
        bachelorBranch,
        bachelorCgpa,
        bachelorStartYear,
        bachelorEndYear,
        bachelorStatus,
        bachelorInstitute,
        bachelorInstituteState,
        bachelorInstituteCity,
        bachelorInstitutePincode,
        bachelorInstituteDistrict,

        // Work Experience
        occupationStatus,
        hasWorkExperience,

        // Projects & Achievements
        projects,
        achievements,
        workExperiences, // 🔥 NEW: work experiences array

        courseSelection,
      } = req.body;

      // Handle file uploads
      let profileImagePath = req.student.profile_image;
      let resumePath = req.student.resume_url;

      if (req.files) {
        if (req.files.profileImage && req.files.profileImage[0]) {
          profileImagePath = `/uploads/${req.files.profileImage[0].filename}`;
          // Delete old profile image if exists and is not default
          if (
            req.student.profile_image &&
            !req.student.profile_image.includes("default")
          ) {
            const oldImagePath = path.join(
              __dirname,
              req.student.profile_image
            );
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
            }
          }
        }

        if (req.files.resume && req.files.resume[0]) {
          resumePath = `/uploads/${req.files.resume[0].filename}`;
          // Delete old resume if exists
          if (req.student.resume_url) {
            const oldResumePath = path.join(__dirname, req.student.resume_url);
            if (fs.existsSync(oldResumePath)) {
              fs.unlinkSync(oldResumePath);
            }
          }
        }
      }

      // Parse all values with proper type handling
      const parsedData = {
        // Basic Details
        firstName: parseValue(firstName),
        lastName: parseValue(lastName),
        phone: parseValue(phone),
        batchMonth: parseValue(batchMonth),
        batchYear: parseValue(batchYear, "int"),
        isCurrentBatch: parseValue(isCurrentBatch, "boolean"),

        // Personal Details
        nameOnCertificate: parseValue(nameOnCertificate),
        gender: parseValue(gender),
        preferredLanguages: parseValue(preferredLanguages, "array"),
        dateOfBirth: parseValue(dateOfBirth, "date"),
        codePlaygroundUsername: parseValue(codePlaygroundUsername),
        linkedinProfileUrl: parseValue(linkedinProfileUrl),
        githubProfileUrl: parseValue(githubProfileUrl),
        hackerrankProfileUrl: parseValue(hackerrankProfileUrl),
        leetcodeProfileUrl: parseValue(leetcodeProfileUrl),

        // Parent/Guardian Details
        parentFirstName: parseValue(parentFirstName),
        parentLastName: parseValue(parentLastName),
        parentRelation: parseValue(parentRelation),

        // Current Address
        addressLine1: parseValue(addressLine1),
        addressLine2: parseValue(addressLine2),
        country: parseValue(country),
        state: parseValue(state),
        district: parseValue(district),
        city: parseValue(city),
        postalCode: parseValue(postalCode),

        // Current Expertise
        currentCodingLevel: parseValue(currentCodingLevel),
        technicalSkills: parseValue(technicalSkills, "array"),
        hasLaptop: parseValue(hasLaptop, "boolean"),

        // Job Preferences
        jobSearchStatus: parseValue(jobSearchStatus),
        preferredJobLocations: parseValue(preferredJobLocations, "array"),
        expectedCtcRange: parseValue(expectedCtcRange),
        preferredTeachingLanguage: parseValue(preferredTeachingLanguage),
        preferredVideoLanguage: parseValue(preferredVideoLanguage),

        // Education Details
        tenthMarksType: parseValue(tenthMarksType),
        tenthMarks: parseValue(tenthMarks), // Keep as string since it can be CGPA or percentage
        twelfthEducationType: parseValue(twelfthEducationType),
        twelfthMarksType: parseValue(twelfthMarksType),
        twelfthMarks: parseValue(twelfthMarks), // Keep as string
        bachelorDegree: parseValue(bachelorDegree),
        bachelorBranch: parseValue(bachelorBranch),
        bachelorCgpa: parseValue(bachelorCgpa), // Keep as string
        bachelorStartYear: parseValue(bachelorStartYear, "int"),
        bachelorEndYear: parseValue(bachelorEndYear, "int"),
        bachelorStatus: parseValue(bachelorStatus),
        bachelorInstitute: parseValue(bachelorInstitute),
        bachelorInstituteState: parseValue(bachelorInstituteState),
        bachelorInstituteCity: parseValue(bachelorInstituteCity),
        bachelorInstitutePincode: parseValue(bachelorInstitutePincode),
        bachelorInstituteDistrict: parseValue(bachelorInstituteDistrict),

        courseSelection: parseValue(courseSelection),

        // Work Experience
        occupationStatus: parseValue(occupationStatus),
        hasWorkExperience: parseValue(hasWorkExperience, "boolean"),
      };

      console.log("🔄 Updating student record in database...");

      // Update student record with proper null handling
      const updateQuery = `
UPDATE students SET
  first_name = COALESCE($1, first_name),
  last_name = COALESCE($2, last_name),
  phone = COALESCE($3, phone),
  profile_image = COALESCE($4, profile_image),
  batch_month = COALESCE($5, batch_month),
  batch_year = COALESCE($6, batch_year),
  is_current_batch = COALESCE($7, is_current_batch),
  name_on_certificate = COALESCE($8, name_on_certificate),
  gender = COALESCE($9, gender),
  preferred_languages = COALESCE($10, preferred_languages),
  date_of_birth = COALESCE($11, date_of_birth),
  code_playground_username = COALESCE($12, code_playground_username),
  linkedin_profile_url = COALESCE($13, linkedin_profile_url),
  github_profile_url = COALESCE($14, github_profile_url),
  hackerrank_profile_url = COALESCE($15, hackerrank_profile_url),
  leetcode_profile_url = COALESCE($16, leetcode_profile_url),
  resume_url = COALESCE($17, resume_url),
  parent_first_name = COALESCE($18, parent_first_name),
  parent_last_name = COALESCE($19, parent_last_name),
  parent_relation = COALESCE($20, parent_relation),
  address_line_1 = COALESCE($21, address_line_1),
  address_line_2 = COALESCE($22, address_line_2),
  country = COALESCE($23, country),
  state = COALESCE($24, state),
  district = COALESCE($25, district),
  city = COALESCE($26, city),
  postal_code = COALESCE($27, postal_code),
  current_coding_level = COALESCE($28, current_coding_level),
  technical_skills = COALESCE($29, technical_skills),
  has_laptop = COALESCE($30, has_laptop),
  job_search_status = COALESCE($31, job_search_status),
  preferred_job_locations = COALESCE($32, preferred_job_locations),
  expected_ctc_range = COALESCE($33, expected_ctc_range),
  preferred_teaching_language = COALESCE($34, preferred_teaching_language),
  preferred_video_language = COALESCE($35, preferred_video_language),
  tenth_marks_type = COALESCE($36, tenth_marks_type),
  tenth_marks = COALESCE($37, tenth_marks),
  twelfth_education_type = COALESCE($38, twelfth_education_type),
  twelfth_marks_type = COALESCE($39, twelfth_marks_type),
  twelfth_marks = COALESCE($40, twelfth_marks),
  bachelor_degree = COALESCE($41, bachelor_degree),
  bachelor_branch = COALESCE($42, bachelor_branch),
  bachelor_cgpa = COALESCE($43, bachelor_cgpa),
  bachelor_start_year = COALESCE($44, bachelor_start_year),
  bachelor_end_year = COALESCE($45, bachelor_end_year),
  bachelor_status = COALESCE($46, bachelor_status),
  bachelor_institute = COALESCE($47, bachelor_institute),
  bachelor_institute_state = COALESCE($48, bachelor_institute_state),
  bachelor_institute_city = COALESCE($49, bachelor_institute_city),
  bachelor_institute_pincode = COALESCE($50, bachelor_institute_pincode),
  bachelor_institute_district = COALESCE($51, bachelor_institute_district),
  occupation_status = COALESCE($52, occupation_status),
  has_work_experience = COALESCE($53, has_work_experience),
  course_selection = COALESCE($54, course_selection), 
  updated_at = CURRENT_TIMESTAMP
WHERE id = $55
RETURNING *
`;

      const result = await pool.query(updateQuery, [
        parsedData.firstName,
        parsedData.lastName,
        parsedData.phone,
        profileImagePath,
        parsedData.batchMonth,
        parsedData.batchYear,
        parsedData.isCurrentBatch,
        parsedData.nameOnCertificate,
        parsedData.gender,
        parsedData.preferredLanguages,
        parsedData.dateOfBirth,
        parsedData.codePlaygroundUsername,
        parsedData.linkedinProfileUrl,
        parsedData.githubProfileUrl,
        parsedData.hackerrankProfileUrl,
        parsedData.leetcodeProfileUrl,
        resumePath,
        parsedData.parentFirstName,
        parsedData.parentLastName,
        parsedData.parentRelation,
        parsedData.addressLine1,
        parsedData.addressLine2,
        parsedData.country,
        parsedData.state,
        parsedData.district,
        parsedData.city,
        parsedData.postalCode,
        parsedData.currentCodingLevel,
        parsedData.technicalSkills,
        parsedData.hasLaptop,
        parsedData.jobSearchStatus,
        parsedData.preferredJobLocations,
        parsedData.expectedCtcRange,
        parsedData.preferredTeachingLanguage,
        parsedData.preferredVideoLanguage,
        parsedData.tenthMarksType,
        parsedData.tenthMarks,
        parsedData.twelfthEducationType,
        parsedData.twelfthMarksType,
        parsedData.twelfthMarks,
        parsedData.bachelorDegree,
        parsedData.bachelorBranch,
        parsedData.bachelorCgpa,
        parsedData.bachelorStartYear,
        parsedData.bachelorEndYear,
        parsedData.bachelorStatus,
        parsedData.bachelorInstitute,
        parsedData.bachelorInstituteState,
        parsedData.bachelorInstituteCity,
        parsedData.bachelorInstitutePincode,
        parsedData.bachelorInstituteDistrict,
        parsedData.occupationStatus,
        parsedData.hasWorkExperience,
        parsedData.courseSelection, // Parameter $54
        studentId, // Parameter $55
      ]);

      console.log("✅ Student record updated successfully");

      // Handle projects if provided
      if (projects) {
        try {
          const projectsData =
            typeof projects === "string" ? JSON.parse(projects) : projects;
          console.log(`🔄 Processing ${projectsData.length} projects...`);

          // Delete existing projects
          await pool.query(
            "DELETE FROM student_projects WHERE student_id = $1",
            [studentId]
          );

          // Insert new projects
          for (const project of projectsData) {
            if (project.projectTitle && project.projectTitle.trim()) {
              const skillsArray = Array.isArray(project.skills)
                ? project.skills
                : project.skills
                  ? [project.skills]
                  : [];

              await pool.query(
                `INSERT INTO student_projects (student_id, project_title, project_description, project_link, skills)
                 VALUES ($1, $2, $3, $4, $5)`,
                [
                  studentId,
                  project.projectTitle.trim(),
                  project.projectDescription || "",
                  project.projectLink || "",
                  skillsArray,
                ]
              );
            }
          }
          console.log("✅ Projects updated successfully");
        } catch (parseError) {
          console.error("❌ Error parsing projects:", parseError.message);
        }
      }

      // Handle achievements if provided
      if (achievements) {
        try {
          const achievementsData =
            typeof achievements === "string"
              ? JSON.parse(achievements)
              : achievements;
          console.log(
            `🔄 Processing ${achievementsData.length} achievements...`
          );

          // Delete existing achievements
          await pool.query(
            "DELETE FROM student_achievements WHERE student_id = $1",
            [studentId]
          );

          // Insert new achievements
          for (const achievement of achievementsData) {
            if (
              achievement.achievementTitle &&
              achievement.achievementTitle.trim()
            ) {
              await pool.query(
                `INSERT INTO student_achievements (student_id, achievement_title, achievement_description, achievement_link, achievement_date)
                 VALUES ($1, $2, $3, $4, $5)`,
                [
                  studentId,
                  achievement.achievementTitle.trim(),
                  achievement.achievementDescription || "",
                  achievement.achievementLink || "",
                  achievement.achievementDate || null,
                ]
              );
            }
          }
          console.log("✅ Achievements updated successfully");
        } catch (parseError) {
          console.error("❌ Error parsing achievements:", parseError.message);
        }
      }

      // 🔥 NEW: Handle work experiences if provided
      if (workExperiences) {
        try {
          const workData = typeof workExperiences === 'string' ? JSON.parse(workExperiences) : workExperiences;
          console.log(`🔄 Processing ${workData.length} work experiences...`);

          // Delete existing work experiences
          await pool.query('DELETE FROM student_work_experiences WHERE student_id = $1', [studentId]);

          // Insert new work experiences
          for (const exp of workData) {
            if (exp.company_name && exp.job_role && exp.start_date) {
              await pool.query(
                `INSERT INTO student_work_experiences 
                 (student_id, company_name, job_role, start_date, end_date, is_current, 
                  job_type, job_sector, key_skills, work_location, role_description, achievements)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
                [
                  studentId,
                  exp.company_name,
                  exp.job_role,
                  exp.start_date,
                  exp.end_date || null,
                  exp.is_current || false,
                  exp.job_type || null,
                  exp.job_sector || null,
                  exp.key_skills || [],
                  exp.work_location || null,
                  exp.role_description || null,
                  exp.achievements || null,
                ]
              );
            }
          }
          console.log("✅ Work experiences updated successfully");
        } catch (parseError) {
          console.error("❌ Error parsing work experiences:", parseError.message);
        }
      }

      const updatedStudent = result.rows[0];

      // Get updated projects and achievements
      const updatedProjects = await pool.query(
        `SELECT * FROM student_projects WHERE student_id = $1 ORDER BY created_at DESC`,
        [studentId]
      );

      const updatedAchievements = await pool.query(
        `SELECT * FROM student_achievements WHERE student_id = $1 ORDER BY created_at DESC`,
        [studentId]
      );

      // 🔥 NEW: Get updated work experiences
      const updatedWorkExperiences = await pool.query(
        `SELECT * FROM student_work_experiences WHERE student_id = $1 ORDER BY start_date DESC, created_at DESC`,
        [studentId]
      );

      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;

      // Format response
      const studentResponse = {
        id: updatedStudent.id,
        studentId: updatedStudent.student_id,
        email: updatedStudent.email,
        firstName: updatedStudent.first_name,
        lastName: updatedStudent.last_name,
        phone: updatedStudent.phone,
        profileImage: updatedStudent.profile_image
          ? `${baseUrl}${updatedStudent.profile_image}`
          : null,
        batchMonth: updatedStudent.batch_month,
        batchYear: updatedStudent.batch_year,
        isCurrentBatch: updatedStudent.is_current_batch,

        // Personal Details
        nameOnCertificate: updatedStudent.name_on_certificate,
        gender: updatedStudent.gender,
        preferredLanguages: updatedStudent.preferred_languages || [],
        dateOfBirth: updatedStudent.date_of_birth,
        codePlaygroundUsername: updatedStudent.code_playground_username,
        linkedinProfileUrl: updatedStudent.linkedin_profile_url,
        githubProfileUrl: updatedStudent.github_profile_url,
        hackerrankProfileUrl: updatedStudent.hackerrank_profile_url,
        leetcodeProfileUrl: updatedStudent.leetcode_profile_url,
        resumeUrl: updatedStudent.resume_url,

        // Parent/Guardian Details
        parentFirstName: updatedStudent.parent_first_name,
        parentLastName: updatedStudent.parent_last_name,
        parentRelation: updatedStudent.parent_relation,

        // Current Address
        addressLine1: updatedStudent.address_line_1,
        addressLine2: updatedStudent.address_line_2,
        country: updatedStudent.country,
        state: updatedStudent.state,
        district: updatedStudent.district,
        city: updatedStudent.city,
        postalCode: updatedStudent.postal_code,

        // Current Expertise
        currentCodingLevel: updatedStudent.current_coding_level,
        technicalSkills: updatedStudent.technical_skills || [],
        hasLaptop: updatedStudent.has_laptop,

        // Job Preferences
        jobSearchStatus: updatedStudent.job_search_status,
        preferredJobLocations: updatedStudent.preferred_job_locations || [],
        expectedCtcRange: updatedStudent.expected_ctc_range,
        preferredTeachingLanguage: updatedStudent.preferred_teaching_language,
        preferredVideoLanguage: updatedStudent.preferred_video_language,

        // Education Details
        tenthMarksType: updatedStudent.tenth_marks_type,
        tenthMarks: updatedStudent.tenth_marks,
        twelfthEducationType: updatedStudent.twelfth_education_type,
        twelfthMarksType: updatedStudent.twelfth_marks_type,
        twelfthMarks: updatedStudent.twelfth_marks,
        bachelorDegree: updatedStudent.bachelor_degree,
        bachelorBranch: updatedStudent.bachelor_branch,
        bachelorCgpa: updatedStudent.bachelor_cgpa,
        bachelorStartYear: updatedStudent.bachelor_start_year,
        bachelorEndYear: updatedStudent.bachelor_end_year,
        bachelorStatus: updatedStudent.bachelor_status,
        bachelorInstitute: updatedStudent.bachelor_institute,
        bachelorInstituteState: updatedStudent.bachelor_institute_state,
        bachelorInstituteCity: updatedStudent.bachelor_institute_city,
        bachelorInstitutePincode: updatedStudent.bachelor_institute_pincode,
        bachelorInstituteDistrict: updatedStudent.bachelor_institute_district,

        // Work Experience
        occupationStatus: updatedStudent.occupation_status,
        hasWorkExperience: updatedStudent.has_work_experience,

        // Additional data
        projects: updatedProjects.rows,
        achievements: updatedAchievements.rows,
        workExperiences: updatedWorkExperiences.rows, // 🔥 NEW

        createdAt: updatedStudent.created_at,
      };

      console.log("✅ Complete profile update successful");

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: { student: studentResponse },
      });
    } catch (error) {
      console.error("❌ Complete profile update error:", error.message);
      console.error("Error stack:", error.stack);
      res.status(500).json({
        success: false,
        message: "Error updating profile: " + error.message,
      });
    }
  }
);

// -------------------------------------------
// 🔹 Projects Management Routes
// -------------------------------------------
app.get("/api/student/projects", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM student_projects WHERE student_id = $1 ORDER BY created_at DESC`,
      [req.student.id]
    );

    res.json({
      success: true,
      data: { projects: result.rows },
    });
  } catch (error) {
    console.error("Projects fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
    });
  }
});

app.post("/api/student/projects", auth, async (req, res) => {
  try {
    const { projectTitle, projectDescription, projectLink, skills } = req.body;

    const result = await pool.query(
      `INSERT INTO student_projects (student_id, project_title, project_description, project_link, skills)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        req.student.id,
        projectTitle,
        projectDescription,
        projectLink,
        skills || [],
      ]
    );

    res.json({
      success: true,
      message: "Project added successfully",
      data: { project: result.rows[0] },
    });
  } catch (error) {
    console.error("Project creation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating project",
    });
  }
});

// -------------------------------------------
// 🔹 Achievements Management Routes
// -------------------------------------------
app.get("/api/student/achievements", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM student_achievements WHERE student_id = $1 ORDER BY created_at DESC`,
      [req.student.id]
    );

    res.json({
      success: true,
      data: { achievements: result.rows },
    });
  } catch (error) {
    console.error("Achievements fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching achievements",
    });
  }
});

app.post("/api/student/achievements", auth, async (req, res) => {
  try {
    const {
      achievementTitle,
      achievementDescription,
      achievementLink,
      achievementDate,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO student_achievements (student_id, achievement_title, achievement_description, achievement_link, achievement_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        req.student.id,
        achievementTitle,
        achievementDescription,
        achievementLink,
        achievementDate,
      ]
    );

    res.json({
      success: true,
      message: "Achievement added successfully",
      data: { achievement: result.rows[0] },
    });
  } catch (error) {
    console.error("Achievement creation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error creating achievement",
    });
  }
});

// ==========================================
// 🔹 NEW: Work Experiences Management Routes
// ==========================================

app.get("/api/student/work-experiences", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM student_work_experiences 
       WHERE student_id = $1 
       ORDER BY start_date DESC, created_at DESC`,
      [req.student.id]
    );

    res.json({
      success: true,
      data: { workExperiences: result.rows },
    });
  } catch (error) {
    console.error("❌ Fetch work experiences error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching work experiences",
    });
  }
});

app.post("/api/student/work-experiences", auth, async (req, res) => {
  try {
    const {
      company_name,
      job_role,
      start_date,
      end_date,
      is_current,
      job_type,
      job_sector,
      key_skills,
      work_location,
      role_description,
      achievements,
    } = req.body;

    // Basic validation
    if (!company_name || !job_role || !start_date) {
      return res.status(400).json({
        success: false,
        message: "Company name, job role, and start date are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO student_work_experiences 
       (student_id, company_name, job_role, start_date, end_date, is_current,
        job_type, job_sector, key_skills, work_location, role_description, achievements)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        req.student.id,
        company_name,
        job_role,
        start_date,
        end_date || null,
        is_current || false,
        job_type || null,
        job_sector || null,
        key_skills || [],
        work_location || null,
        role_description || null,
        achievements || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Work experience added successfully",
      data: { workExperience: result.rows[0] },
    });
  } catch (error) {
    console.error("❌ Add work experience error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error adding work experience",
    });
  }
});

app.put("/api/student/work-experiences/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      company_name,
      job_role,
      start_date,
      end_date,
      is_current,
      job_type,
      job_sector,
      key_skills,
      work_location,
      role_description,
      achievements,
    } = req.body;

    // Check ownership
    const ownershipCheck = await pool.query(
      `SELECT id FROM student_work_experiences WHERE id = $1 AND student_id = $2`,
      [id, req.student.id]
    );
    if (ownershipCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work experience not found or access denied",
      });
    }

    const result = await pool.query(
      `UPDATE student_work_experiences 
       SET company_name = COALESCE($1, company_name),
           job_role = COALESCE($2, job_role),
           start_date = COALESCE($3, start_date),
           end_date = $4,
           is_current = COALESCE($5, is_current),
           job_type = $6,
           job_sector = $7,
           key_skills = $8,
           work_location = $9,
           role_description = $10,
           achievements = $11,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $12 AND student_id = $13
       RETURNING *`,
      [
        company_name,
        job_role,
        start_date,
        end_date || null,
        is_current,
        job_type || null,
        job_sector || null,
        key_skills || [],
        work_location || null,
        role_description || null,
        achievements || null,
        id,
        req.student.id,
      ]
    );

    res.json({
      success: true,
      message: "Work experience updated successfully",
      data: { workExperience: result.rows[0] },
    });
  } catch (error) {
    console.error("❌ Update work experience error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating work experience",
    });
  }
});

app.delete("/api/student/work-experiences/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM student_work_experiences WHERE id = $1 AND student_id = $2 RETURNING id`,
      [id, req.student.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Work experience not found or access denied",
      });
    }

    res.json({
      success: true,
      message: "Work experience deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete work experience error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting work experience",
    });
  }
});

async function checkAndAddMissingColumns() {
  try {
    // Check for admin_name column
    const checkAdminName = await pool.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name='discussion_replies' AND column_name='admin_name'
      `);

    if (checkAdminName.rows.length === 0) {
      await pool.query(`
              ALTER TABLE discussion_replies 
              ADD COLUMN admin_name VARCHAR(255)
          `);
      console.log("✅ Added admin_name column to discussion_replies");
    }

    // Check for admin_image column
    const checkAdminImage = await pool.query(`
          SELECT column_name 
          FROM information_schema.columns 
          WHERE table_name='discussion_replies' AND column_name='admin_image'
      `);

    if (checkAdminImage.rows.length === 0) {
      await pool.query(`
              ALTER TABLE discussion_replies 
              ADD COLUMN admin_image VARCHAR(500)
          `);
      console.log("✅ Added admin_image column to discussion_replies");
    }
  } catch (error) {
    console.error("Error checking/adding columns:", error.message);
  }
}

// ==========================================
// 🔹 DISCUSSION ROUTES FOR STUDENTS
// ==========================================

app.post("/api/discussions/threads", auth, async (req, res) => {
  try {
    const { title, content, subtopicId, moduleName, topicName, images } =
      req.body;

    console.log("📝 Creating thread with data:", {
      title,
      subtopicId,
      moduleName,
      topicName,
      studentId: req.student.id,
      hasContent: !!content,
      contentLength: content?.length,
    });

    if (!title || !content || !subtopicId) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and subtopic ID are required",
      });
    }

    // Generate slug before insertion
    const threadSlug = generateThreadSlug(title);

    // Insert with thread_slug included
    const insertQuery = `
      INSERT INTO discussion_threads 
      (student_id, subtopic_id, module_name, topic_name, title, content, images, thread_slug)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const result = await pool.query(insertQuery, [
      req.student.id,
      subtopicId,
      moduleName || null,
      topicName || null,
      title,
      content,
      images || [],
      threadSlug, // Include the generated slug
    ]);

    console.log(`✅ Thread created successfully with ID: ${result.rows[0].id}`);

    res.status(201).json({
      success: true,
      message: "Thread created successfully",
      data: { thread: result.rows[0] },
    });
  } catch (error) {
    console.error("❌ Thread creation error:", error.message);
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      detail: error.detail,
      table: error.table,
      column: error.column,
    });

    // Check for common errors
    if (error.code === "23505") {
      // Unique violation
      return res.status(400).json({
        success: false,
        message:
          "A thread with similar title already exists. Please try a different title.",
      });
    }

    if (error.code === "42703") {
      // Undefined column
      return res.status(500).json({
        success: false,
        message: "Database configuration error. Please contact support.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating thread",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

app.get(
  "/api/discussions/thread-detail/:threadSlug",
  auth,
  async (req, res) => {
    try {
      const { threadSlug } = req.params;

      // Get thread details by slug
      const threadResult = await pool.query(
        `SELECT dt.*, 
            s.first_name, 
            s.last_name, 
            s.profile_image,
            s.email as student_email,
            s.student_id as author_id
     FROM discussion_threads dt
     LEFT JOIN students s ON dt.student_id = s.id
     WHERE dt.thread_slug = $1`,
        [threadSlug]
      );

      if (threadResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Thread not found",
        });
      }

      // Get replies for this thread with COALESCE for admin columns
      const repliesResult = await pool.query(
        `SELECT dr.*, 
            s.first_name as student_first_name,
            s.last_name as student_last_name, 
            s.profile_image as student_profile_image,
            COALESCE(dr.admin_name, '') as admin_name,
            COALESCE(dr.admin_image, '') as admin_image,
            CASE 
              WHEN dr.replied_by_student IS NOT NULL THEN 'student'
              WHEN dr.replied_by_admin IS NOT NULL THEN 'admin'
            END as replied_by_role,
            CASE
              WHEN dr.replied_by_student IS NOT NULL THEN COALESCE(s.first_name || ' ' || s.last_name, '')
              WHEN dr.replied_by_admin IS NOT NULL THEN COALESCE(dr.admin_name, 'Admin')
              ELSE 'Unknown'
            END as replied_by_name,
            CASE
              WHEN dr.replied_by_student IS NOT NULL THEN COALESCE(s.profile_image, '')
              WHEN dr.replied_by_admin IS NOT NULL THEN COALESCE(dr.admin_image, '')
              ELSE ''
            END as replied_by_image
     FROM discussion_replies dr
     LEFT JOIN students s ON dr.replied_by_student = s.id
     WHERE dr.thread_id = $1
     ORDER BY dr.created_at ASC`,
        [threadResult.rows[0].id]
      );

      res.json({
        success: true,
        data: {
          thread: threadResult.rows[0],
          replies: repliesResult.rows,
        },
      });
    } catch (error) {
      console.error("Thread detail fetch error:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error while fetching thread details",
      });
    }
  }
);

// ==========================================
// 🔹 GET THREAD BY NUMERIC ID (FOR BACKWARD COMPATIBILITY)
// ==========================================
app.get("/api/discussions/thread-detail/:threadId", auth, async (req, res) => {
  try {
    const { threadId } = req.params;

    // Check if threadId is numeric
    const isNumeric = /^\d+$/.test(threadId);

    let query;
    let params;

    if (isNumeric) {
      // If it's numeric, search by ID
      query = `SELECT dt.*, 
                s.first_name, 
                s.last_name, 
                s.profile_image,
                s.email as student_email,
                s.student_id as author_id
         FROM discussion_threads dt
         LEFT JOIN students s ON dt.student_id = s.id
         WHERE dt.id = $1`;
      params = [parseInt(threadId)];
    } else {
      // If it's not numeric, assume it's a slug
      query = `SELECT dt.*, 
                s.first_name, 
                s.last_name, 
                s.profile_image,
                s.email as student_email,
                s.student_id as author_id
         FROM discussion_threads dt
         LEFT JOIN students s ON dt.student_id = s.id
         WHERE dt.thread_slug = $1`;
      params = [threadId];
    }

    const threadResult = await pool.query(query, params);

    if (threadResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Get replies for this thread
    const repliesResult = await pool.query(
      `SELECT dr.*, 
              s.first_name as student_first_name,
              s.last_name as student_last_name, 
              s.profile_image as student_profile_image,
              dr.admin_name,
              dr.admin_image,
              CASE 
                WHEN dr.replied_by_student IS NOT NULL THEN 'student'
                WHEN dr.replied_by_admin IS NOT NULL THEN 'admin'
              END as replied_by_role,
              COALESCE(
                s.first_name || ' ' || s.last_name, 
                dr.admin_name
              ) as replied_by_name,
              COALESCE(
                s.profile_image, 
                dr.admin_image
              ) as replied_by_image
       FROM discussion_replies dr
       LEFT JOIN students s ON dr.replied_by_student = s.id
       WHERE dr.thread_id = $1
       ORDER BY dr.created_at ASC`,
      [threadResult.rows[0].id]
    );

    res.json({
      success: true,
      data: {
        thread: threadResult.rows[0],
        replies: repliesResult.rows,
      },
    });
  } catch (error) {
    console.error("Thread detail fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching thread details",
    });
  }
});

// Get threads by subtopic
app.get("/api/discussions/threads/:subtopicId", auth, async (req, res) => {
  try {
    const { subtopicId } = req.params;

    const result = await pool.query(
      `SELECT dt.*, 
              s.first_name, 
              s.last_name, 
              s.profile_image,
              COUNT(dr.id) as reply_count
       FROM discussion_threads dt
       LEFT JOIN students s ON dt.student_id = s.id
       LEFT JOIN discussion_replies dr ON dt.id = dr.thread_id
       WHERE dt.subtopic_id = $1
       GROUP BY dt.id, s.first_name, s.last_name, s.profile_image
       ORDER BY dt.is_important DESC, dt.created_at DESC`,
      [subtopicId]
    );

    res.json({
      success: true,
      data: { threads: result.rows },
    });
  } catch (error) {
    console.error("Threads fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching threads",
    });
  }
});

// Student reply to thread
app.post("/api/discussions/replies", auth, async (req, res) => {
  try {
    const { threadId, content } = req.body;

    if (!threadId || !content) {
      return res.status(400).json({
        success: false,
        message: "Thread ID and content are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO discussion_replies 
       (thread_id, replied_by_student, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [threadId, req.student.id, content]
    );

    // Update thread updated_at
    await pool.query(
      `UPDATE discussion_threads 
       SET updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [threadId]
    );

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: { reply: result.rows[0] },
    });
  } catch (error) {
    console.error("Reply creation error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating reply",
    });
  }
});

// Also update the admin thread detail endpoint similarly
app.get("/api/admin/discussions/threads/:threadSlug", async (req, res) => {
  try {
    const { threadSlug } = req.params;

    // Get thread details by slug
    const threadResult = await pool.query(
      `SELECT dt.*, 
                s.first_name, 
                s.last_name,
                s.email,
                s.phone,
                s.batch_month,
                s.batch_year
         FROM discussion_threads dt
         LEFT JOIN students s ON dt.student_id = s.id
         WHERE dt.thread_slug = $1`,
      [threadSlug]
    );

    if (threadResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Get all replies with COALESCE
    const repliesResult = await pool.query(
      `SELECT dr.*, 
                s.first_name as student_first_name,
                s.last_name as student_last_name,
                s.profile_image as student_image,
                COALESCE(dr.admin_name, '') as admin_name,
                COALESCE(dr.admin_image, '') as admin_image,
                CASE 
                  WHEN dr.replied_by_student IS NOT NULL THEN 'student'
                  WHEN dr.replied_by_admin IS NOT NULL THEN 'admin'
                END as replied_by_role,
                CASE
                  WHEN dr.replied_by_student IS NOT NULL THEN COALESCE(s.first_name || ' ' || s.last_name, '')
                  WHEN dr.replied_by_admin IS NOT NULL THEN COALESCE(dr.admin_name, 'Admin')
                  ELSE 'Unknown'
                END as replied_by_name,
                CASE
                  WHEN dr.replied_by_student IS NOT NULL THEN COALESCE(s.profile_image, '')
                  WHEN dr.replied_by_admin IS NOT NULL THEN COALESCE(dr.admin_image, '')
                  ELSE ''
                END as replied_by_image
         FROM discussion_replies dr
         LEFT JOIN students s ON dr.replied_by_student = s.id
         WHERE dr.thread_id = $1
         ORDER BY dr.created_at ASC`,
      [threadResult.rows[0].id]
    );

    res.json({
      success: true,
      data: {
        thread: threadResult.rows[0],
        replies: repliesResult.rows,
      },
    });
  } catch (error) {
    console.error("Admin thread detail error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch thread details",
    });
  }
});

// Add this endpoint for backward compatibility with numeric IDs
app.get(
  "/api/discussions/thread-detail-by-id/:threadId",
  auth,
  async (req, res) => {
    try {
      const { threadId } = req.params;

      // Get thread details by numeric ID
      const threadResult = await pool.query(
        `SELECT dt.*, 
              s.first_name, 
              s.last_name, 
              s.profile_image,
              s.email as student_email,
              s.student_id as author_id
       FROM discussion_threads dt
       LEFT JOIN students s ON dt.student_id = s.id
       WHERE dt.id = $1`,
        [threadId]
      );

      if (threadResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Thread not found",
        });
      }

      res.json({
        success: true,
        data: {
          thread: threadResult.rows[0],
        },
      });
    } catch (error) {
      console.error("Thread fetch by ID error:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error while fetching thread",
      });
    }
  }
);
// ==========================================
// 🔹 UPDATED ROUTES WITH AUTH INSTEAD OF verifyAdminRequest
// ==========================================

// ==========================================
// 🔹 UPDATED ADMIN THREAD DETAIL ROUTE (FIXED)
// ==========================================

// Get thread detail for admin (with auth)
app.get("/api/admin/discussions/threads/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    console.log(`🔍 Admin fetching thread with identifier: ${identifier}`);

    // Check if identifier is numeric (ID) or string (slug)
    let threadResult;
    if (/^\d+$/.test(identifier)) {
      // If it's numeric, search by ID
      threadResult = await pool.query(
        `SELECT dt.*, 
                s.first_name, 
                s.last_name,
                s.email,
                s.phone,
                s.batch_month,
                s.batch_year,
                s.student_id
         FROM discussion_threads dt
         LEFT JOIN students s ON dt.student_id = s.id
         WHERE dt.id = $1`,
        [parseInt(identifier)]
      );
    } else {
      // If it's not numeric, assume it's a slug
      threadResult = await pool.query(
        `SELECT dt.*, 
                s.first_name, 
                s.last_name,
                s.email,
                s.phone,
                s.batch_month,
                s.batch_year,
                s.student_id
         FROM discussion_threads dt
         LEFT JOIN students s ON dt.student_id = s.id
         WHERE dt.thread_slug = $1`,
        [identifier]
      );
    }

    if (threadResult.rows.length === 0) {
      console.log(`❌ Thread not found with identifier: ${identifier}`);
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Get all replies (both student and admin)
    const repliesResult = await pool.query(
      `SELECT dr.*, 
              -- Student reply details
              s.first_name as student_first_name,
              s.last_name as student_last_name,
              s.profile_image as student_image,
              dr.admin_name,
              dr.admin_image,
              -- Determine reply type and get appropriate name/image
              CASE 
                WHEN dr.replied_by_student IS NOT NULL THEN 'student'
                WHEN dr.replied_by_admin IS NOT NULL THEN 'admin'
              END as replied_by_role,
              COALESCE(
                s.first_name || ' ' || s.last_name, 
                dr.admin_name
              ) as replied_by_name,
              COALESCE(
                s.profile_image, 
                dr.admin_image
              ) as replied_by_image
       FROM discussion_replies dr
       LEFT JOIN students s ON dr.replied_by_student = s.id
       WHERE dr.thread_id = $1
       ORDER BY dr.created_at ASC`,
      [threadResult.rows[0].id]
    );

    console.log(
      `✅ Found thread: ${threadResult.rows[0].title} with ${repliesResult.rows.length} replies`
    );

    res.json({
      success: true,
      data: {
        thread: threadResult.rows[0],
        replies: repliesResult.rows,
      },
    });
  } catch (error) {
    console.error("❌ Admin thread detail error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch thread details: " + error.message,
    });
  }
});

// Admin posts a reply (with auth)
app.post("/api/admin/discussions/replies", async (req, res) => {
  try {
    const { threadId, content, adminId, adminName, adminImage } = req.body;

    console.log(
      `📝 Admin reply attempt for thread ${threadId} by admin ${adminName}`
    );

    if (!threadId || !content || !adminId || !adminName) {
      return res.status(400).json({
        success: false,
        message: "Thread ID, content, admin ID, and admin name are required",
      });
    }

    // Verify thread exists
    const threadCheck = await pool.query(
      "SELECT id FROM discussion_threads WHERE id = $1",
      [threadId]
    );

    if (threadCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Insert admin reply with admin details
    const result = await pool.query(
      `INSERT INTO discussion_replies 
       (thread_id, replied_by_admin, admin_name, admin_image, content)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [threadId, adminId, adminName, adminImage || null, content]
    );

    // Update thread's updated_at timestamp
    await pool.query(
      `UPDATE discussion_threads 
       SET updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1`,
      [threadId]
    );

    const replyWithDetails = {
      ...result.rows[0],
      replied_by_role: "admin",
      replied_by_name: adminName,
      replied_by_image: adminImage,
      admin_name: adminName,
      admin_image: adminImage,
    };

    console.log(`✅ Admin reply added successfully to thread ${threadId}`);

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: { reply: replyWithDetails },
    });
  } catch (error) {
    console.error("❌ Admin reply error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to add reply: " + error.message,
    });
  }
});

// Get all threads for admin panel (with auth)
app.get("/api/admin/discussions/threads", async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT dt.*, 
             s.first_name, 
             s.last_name,
             s.email as student_email,
             s.batch_month,
             s.batch_year,
             COUNT(dr.id) as reply_count,
             EXISTS (
               SELECT 1 FROM discussion_replies dr2 
               WHERE dr2.thread_id = dt.id AND dr2.replied_by_admin IS NOT NULL
             ) as has_admin_reply
      FROM discussion_threads dt
      LEFT JOIN students s ON dt.student_id = s.id
      LEFT JOIN discussion_replies dr ON dt.id = dr.thread_id
    `;

    let queryParams = [];
    let whereConditions = [];
    let paramCount = 1;

    // Filter by status
    if (status === "replied") {
      whereConditions.push(`EXISTS (
        SELECT 1 FROM discussion_replies dr2 
        WHERE dr2.thread_id = dt.id AND dr2.replied_by_admin IS NOT NULL
      )`);
    } else if (status === "unanswered") {
      whereConditions.push(`NOT EXISTS (
        SELECT 1 FROM discussion_replies dr2 
        WHERE dr2.thread_id = dt.id
      )`);
    } else if (status === "student_replied") {
      whereConditions.push(`EXISTS (
        SELECT 1 FROM discussion_replies dr2 
        WHERE dr2.thread_id = dt.id AND dr2.replied_by_student IS NOT NULL
      ) AND NOT EXISTS (
        SELECT 1 FROM discussion_replies dr3 
        WHERE dr3.thread_id = dt.id AND dr3.replied_by_admin IS NOT NULL
      )`);
    }

    // Search functionality
    if (search) {
      whereConditions.push(`(
        dt.title ILIKE $${paramCount} OR 
        dt.content ILIKE $${paramCount} OR
        s.first_name ILIKE $${paramCount} OR
        s.last_name ILIKE $${paramCount}
      )`);
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    if (whereConditions.length > 0) {
      query += ` WHERE ` + whereConditions.join(" AND ");
    }

    query += ` 
      GROUP BY dt.id, s.first_name, s.last_name, s.email, s.batch_month, s.batch_year
      ORDER BY dt.is_important DESC, dt.created_at DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(DISTINCT dt.id) as total
      FROM discussion_threads dt
      LEFT JOIN students s ON dt.student_id = s.id
    `;

    if (whereConditions.length > 0) {
      countQuery += ` WHERE ` + whereConditions.join(" AND ");
    }

    const countResult = await pool.query(countQuery, queryParams.slice(0, -2));
    const total = parseInt(countResult.rows[0].total);

    res.json({
      success: true,
      data: {
        threads: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Admin threads fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch threads",
    });
  }
});

// Get thread detail for admin (with auth)
app.get("/api/admin/discussions/threads/:threadId", async (req, res) => {
  try {
    const { threadId } = req.params;

    // Get thread details
    const threadResult = await pool.query(
      `SELECT dt.*, 
              s.first_name, 
              s.last_name,
              s.email,
              s.phone,
              s.batch_month,
              s.batch_year
       FROM discussion_threads dt
       LEFT JOIN students s ON dt.student_id = s.id
       WHERE dt.id = $1`,
      [threadId]
    );

    if (threadResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    // Get all replies (both student and admin)
    const repliesResult = await pool.query(
      `SELECT dr.*, 
              -- Student reply details
              s.first_name as student_first_name,
              s.last_name as student_last_name,
              s.profile_image as student_image,
              -- Determine reply type and get appropriate name/image
              CASE 
                WHEN dr.replied_by_student IS NOT NULL THEN 'student'
                WHEN dr.replied_by_admin IS NOT NULL THEN 'admin'
              END as replied_by_role,
              COALESCE(s.first_name || ' ' || s.last_name, dr.admin_name) as replied_by_name,
              COALESCE(s.profile_image, dr.admin_image) as replied_by_image
       FROM discussion_replies dr
       LEFT JOIN students s ON dr.replied_by_student = s.id
       WHERE dr.thread_id = $1
       ORDER BY dr.created_at ASC`,
      [threadId]
    );

    res.json({
      success: true,
      data: {
        thread: threadResult.rows[0],
        replies: repliesResult.rows,
      },
    });
  } catch (error) {
    console.error("Admin thread detail error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch thread details",
    });
  }
});

// Update thread status (important, resolved, etc.) with auth
app.put("/api/admin/discussions/threads/:threadId/status", async (req, res) => {
  try {
    const { threadId } = req.params;
    const { status, is_important } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (status) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }

    if (is_important !== undefined) {
      updates.push(`is_important = $${paramCount}`);
      values.push(is_important);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update",
      });
    }

    values.push(threadId);

    const query = `
      UPDATE discussion_threads 
      SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Thread not found",
      });
    }

    res.json({
      success: true,
      message: "Thread status updated successfully",
      data: { thread: result.rows[0] },
    });
  } catch (error) {
    console.error("Thread status update error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to update thread status",
    });
  }
});

// Get all feedback with student details (with auth)
app.get("/api/admin/feedback", async (req, res) => {
  try {
    const { page = 1, limit = 20, subtopicId, moduleName, rating } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT sf.*, 
             s.first_name, 
             s.last_name,
             s.email,
             s.batch_month,
             s.batch_year
      FROM student_feedback sf
      LEFT JOIN students s ON sf.student_id = s.id
      WHERE 1=1
    `;

    let queryParams = [];
    let paramCount = 1;

    // Filter by subtopic ID
    if (subtopicId) {
      query += ` AND sf.subtopic_id = $${paramCount}`;
      queryParams.push(subtopicId);
      paramCount++;
    }

    // Filter by module name
    if (moduleName) {
      query += ` AND sf.module_name ILIKE $${paramCount}`;
      queryParams.push(`%${moduleName}%`);
      paramCount++;
    }

    // Filter by rating
    if (rating) {
      query += ` AND (sf.rating_understanding = $${paramCount} OR sf.rating_instructor = $${paramCount} OR sf.rating_pace = $${paramCount})`;
      queryParams.push(parseInt(rating));
      paramCount++;
    }

    query += ` ORDER BY sf.submitted_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1
      }`;
    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM student_feedback sf
      WHERE 1=1
    `;

    let countParams = [];
    paramCount = 1;

    if (subtopicId) {
      countQuery += ` AND sf.subtopic_id = $${paramCount}`;
      countParams.push(subtopicId);
      paramCount++;
    }

    if (moduleName) {
      countQuery += ` AND sf.module_name ILIKE $${paramCount}`;
      countParams.push(`%${moduleName}%`);
      paramCount++;
    }

    if (rating) {
      countQuery += ` AND (sf.rating_understanding = $${paramCount} OR sf.rating_instructor = $${paramCount} OR sf.rating_pace = $${paramCount})`;
      countParams.push(parseInt(rating));
      paramCount++;
    }

    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    // Calculate average ratings
    const avgRatingsQuery = `
      SELECT 
        ROUND(AVG(rating_understanding), 2) as avg_understanding,
        ROUND(AVG(rating_instructor), 2) as avg_instructor,
        ROUND(AVG(rating_pace), 2) as avg_pace,
        COUNT(*) as total_feedbacks
      FROM student_feedback
      ${countParams.length > 0 ? "WHERE " + countQuery.split("WHERE")[1] : ""}
    `;

    const avgResult = await pool.query(
      avgRatingsQuery.split("WHERE")[0] +
      (countParams.length > 0 ? "WHERE " + countQuery.split("WHERE")[1] : ""),
      countParams
    );

    res.json({
      success: true,
      data: {
        feedbacks: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        averageRatings: avgResult.rows[0],
      },
    });
  } catch (error) {
    console.error("Admin feedback fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch feedbacks",
    });
  }
});

// Get feedback statistics (with auth)
app.get("/api/admin/feedback/stats", async (req, res) => {
  try {
    const statsQuery = `
      SELECT 
        COUNT(*) as total_feedbacks,
        COUNT(DISTINCT student_id) as unique_students,
        COUNT(DISTINCT subtopic_id) as unique_subtopics,
        ROUND(AVG(rating_understanding), 2) as avg_understanding,
        ROUND(AVG(rating_instructor), 2) as avg_instructor,
        ROUND(AVG(rating_pace), 2) as avg_pace,
        DATE(created_at) as date,
        COUNT(*) as daily_count
      FROM student_feedback 
      WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `;

    const result = await pool.query(statsQuery);

    res.json({
      success: true,
      data: {
        stats: result.rows,
      },
    });
  } catch (error) {
    console.error("Feedback stats error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch feedback statistics",
    });
  }
});
// Submit feedback
app.post("/api/feedback/submit", auth, async (req, res) => {
  try {
    const {
      subtopicId,
      moduleName,
      topicName,
      ratingUnderstanding,
      ratingInstructor,
      ratingPace,
      feedbackText,
    } = req.body;

    if (!subtopicId) {
      return res.status(400).json({
        success: false,
        message: "Subtopic ID is required",
      });
    }

    // Check if feedback already exists for this subtopic by this student
    const existingFeedback = await pool.query(
      `SELECT id FROM student_feedback 
       WHERE student_id = $1 AND subtopic_id = $2`,
      [req.student.id, subtopicId]
    );

    if (existingFeedback.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted for this class",
      });
    }

    // Insert new feedback
    const result = await pool.query(
      `INSERT INTO student_feedback 
       (student_id, subtopic_id, module_name, topic_name, 
        rating_understanding, rating_instructor, rating_pace, feedback_text)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        req.student.id,
        subtopicId,
        moduleName || null,
        topicName || null,
        ratingUnderstanding,
        ratingInstructor,
        ratingPace,
        feedbackText || null,
      ]
    );

    res.json({
      success: true,
      message: "Feedback submitted successfully",
      data: { feedback: result.rows[0] },
    });
  } catch (error) {
    console.error("Feedback submission error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
});

// Get feedback for a specific subtopic (student can see their own)
app.get("/api/feedback/subtopic/:subtopicId", auth, async (req, res) => {
  try {
    const { subtopicId } = req.params;

    const result = await pool.query(
      `SELECT * FROM student_feedback 
       WHERE student_id = $1 AND subtopic_id = $2`,
      [req.student.id, subtopicId]
    );

    res.json({
      success: true,
      data: {
        feedback: result.rows[0] || null,
      },
    });
  } catch (error) {
    console.error("Feedback fetch error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching feedback",
    });
  }
});

// ==========================================
// 🔹 STUDENT MANAGEMENT ROUTES (UPDATED)
// ==========================================
const activeStudents = new Map();

// Middleware to track student activity
app.use("/api/", (req, res, next) => {
  if (req.student) {
    const studentId = req.student.id;
    activeStudents.set(studentId, {
      studentId,
      lastActive: Date.now(),
      isOnline: true,
      student: req.student,
    });
  }
  next();
});

// Clean up inactive students (offline after 5 minutes)
setInterval(() => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  for (let [studentId, data] of activeStudents.entries()) {
    if (now - data.lastActive > fiveMinutes) {
      activeStudents.delete(studentId);
    }
  }
}, 60000); // Run every minute

// Get online students (Admin only)
app.get("/api/admin/online-students", async (req, res) => {
  try {
    const onlineStudents = Array.from(activeStudents.values()).map((data) => ({
      id: data.student.id,
      studentId: data.student.student_id,
      email: data.student.email,
      firstName: data.student.first_name,
      lastName: data.student.last_name,
      profileImage: data.student.profile_image,
      batchMonth: data.student.batch_month,
      batchYear: data.student.batch_year,
      lastActive: data.lastActive,
      isOnline: true,
    }));

    res.json({
      success: true,
      data: {
        onlineStudents,
        totalOnline: onlineStudents.length,
      },
    });
  } catch (error) {
    console.error("Online students fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch online students",
    });
  }
});

// Student heartbeat to maintain online status
app.post("/api/student/heartbeat", async (req, res) => {
  try {
    const studentId = req.student.id;

    activeStudents.set(studentId, {
      studentId,
      lastActive: Date.now(),
      isOnline: true,
      student: req.student,
    });

    res.json({
      success: true,
      message: "Heartbeat recorded",
    });
  } catch (error) {
    console.error("Heartbeat error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to record heartbeat",
    });
  }
});

// Update the students list endpoint to include online status with pagination
// -------------------------------------------
// 🔹 ADMIN STUDENT LIST - FULLY FIXED WITH COURSE FILTERING
// -------------------------------------------
app.get("/api/admin/students", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      batchMonth,
      batchYear,
      status,
      studentType,
      courseSelection, // 🔥 FIXED: Add course filter
    } = req.query;

    const offset = (page - 1) * limit;

    // Build base query
    let baseQuery = `
    SELECT 
      id, student_id, email, first_name, last_name, phone,
      profile_image, student_type, course_selection, batch_month, batch_year, is_current_batch,
      status, join_date, created_at, password,
      name_on_certificate, gender, current_coding_level,
      occupation_status, has_work_experience
    FROM students 
    WHERE 1=1
  `;

    let countQuery = `SELECT COUNT(*) as total FROM students WHERE 1=1`;
    let queryParams = [];
    let paramCount = 1;

    // Search filter
    if (search && search.trim() !== "") {
      const searchCondition = ` AND (
        first_name ILIKE $${paramCount} OR 
        last_name ILIKE $${paramCount} OR 
        email ILIKE $${paramCount} OR 
        student_id ILIKE $${paramCount} OR
        phone ILIKE $${paramCount}
      )`;
      baseQuery += searchCondition;
      countQuery += searchCondition;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    // Batch month filter
    if (batchMonth && batchMonth !== "") {
      baseQuery += ` AND batch_month = $${paramCount}`;
      countQuery += ` AND batch_month = $${paramCount}`;
      queryParams.push(batchMonth);
      paramCount++;
    }

    // Batch year filter
    if (batchYear && batchYear !== "") {
      baseQuery += ` AND batch_year = $${paramCount}`;
      countQuery += ` AND batch_year = $${paramCount}`;
      queryParams.push(parseInt(batchYear));
      paramCount++;
    }

    // Status filter
    if (status && status !== "") {
      baseQuery += ` AND status = $${paramCount}`;
      countQuery += ` AND status = $${paramCount}`;
      queryParams.push(status);
      paramCount++;
    }

    // 🔥 FIXED: Student Type filter
    if (studentType && studentType !== "") {
      baseQuery += ` AND student_type = $${paramCount}`;
      countQuery += ` AND student_type = $${paramCount}`;
      queryParams.push(studentType);
      paramCount++;
    }

    // 🔥 FIXED: Course Selection filter
    if (courseSelection && courseSelection !== "") {
      baseQuery += ` AND course_selection = $${paramCount}`;
      countQuery += ` AND course_selection = $${paramCount}`;
      queryParams.push(courseSelection);
      paramCount++;
    }

    // Add ordering and pagination
    baseQuery += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1
      }`;
    queryParams.push(parseInt(limit), offset);

    // Execute queries
    const studentsResult = await pool.query(baseQuery, queryParams);

    // For count query, remove the limit and offset parameters
    const countParams = queryParams.slice(0, -2);
    const countResult = await pool.query(countQuery, countParams);

    const total = parseInt(countResult.rows[0]?.total || 0);
    const baseUrl =
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;

    // Get online student IDs
    const onlineStudentIds = new Set(
      Array.from(activeStudents.values()).map((data) => data.student.id)
    );

    // Format students with full URLs for images and online status
    const students = studentsResult.rows.map((student) => ({
      id: student.id,
      student_id: student.student_id,
      email: student.email,
      first_name: student.first_name,
      last_name: student.last_name,
      phone: student.phone,
      password: student.password,
      profile_image: student.profile_image
        ? `${baseUrl}${student.profile_image}`
        : null,
      student_type: student.student_type,
      course_selection: student.course_selection,
      batch_month: student.batch_month,
      batch_year: student.batch_year,
      is_current_batch: student.is_current_batch,
      status: student.status || "active",
      join_date: student.join_date,
      created_at: student.created_at,
      name_on_certificate: student.name_on_certificate,
      gender: student.gender,
      current_coding_level: student.current_coding_level,
      occupation_status: student.occupation_status,
      has_work_experience: student.has_work_experience,
      fullName: `${student.first_name || ""} ${student.last_name || ""}`.trim(),
      is_online: onlineStudentIds.has(student.id),
    }));

    const response = {
      success: true,
      data: {
        students: students,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: total,
          pages: Math.ceil(total / limit),
        },
        onlineStats: {
          totalOnline: onlineStudentIds.size,
          totalStudents: total,
        },
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Admin students fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch students: " + error.message,
    });
  }
});

// Get student by ID for admin
app.get("/api/admin/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    console.log(`Fetching student details for ID: ${studentId}`);

    const result = await pool.query(`SELECT * FROM students WHERE id = $1`, [
      studentId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const student = result.rows[0];
    const baseUrl =
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;

    // Get student's projects and achievements
    const [projectsResult, achievementsResult] = await Promise.all([
      pool.query(
        `SELECT * FROM student_projects WHERE student_id = $1 ORDER BY created_at DESC`,
        [studentId]
      ),
      pool.query(
        `SELECT * FROM student_achievements WHERE student_id = $1 ORDER BY created_at DESC`,
        [studentId]
      ),
    ]);

    const studentResponse = {
      ...student,
      profileImage: student.profile_image
        ? `${baseUrl}${student.profile_image}`
        : null,
      resumeUrl: student.resume_url ? `${baseUrl}${student.resume_url}` : null,
      projects: projectsResult.rows,
      achievements: achievementsResult.rows,
      fullName: `${student.first_name} ${student.last_name}`.trim(),
    };

    res.json({
      success: true,
      data: { student: studentResponse },
    });
  } catch (error) {
    console.error("Admin student fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch student details: " + error.message,
    });
  }
});

// Update student by admin with password support
// -------------------------------------------
// 🔹 ADMIN UPDATE STUDENT - FIXED WITH COURSE_SELECTION
// -------------------------------------------
app.put("/api/admin/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { updatePassword = false, ...updateData } = req.body;

    // 🔥 Block any password update without explicit flag
    if (updateData.password && !updatePassword) {
      return res.status(403).json({
        success: false,
        message: "Password changes require 'updatePassword: true' flag for security."
      });
    }

    // Check if student exists
    const existingStudent = await pool.query(
      "SELECT * FROM students WHERE id = $1",
      [studentId]
    );
    if (existingStudent.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Build dynamic update query (exclude password unless flag is true)
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    const allowedFields = [
      "student_id", "email", "first_name", "last_name", "phone",
      "student_type", "course_selection", "batch_month", "batch_year",
      "is_current_batch", "status", "name_on_certificate", "gender"
    ];

    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        updateFields.push(`${field} = $${paramCount}`);
        updateValues.push(updateData[field]);
        paramCount++;
      }
    }

    // Handle password only if flag true
    if (updatePassword && updateData.password) {
      await pool.query("SET myapp.changed_by = $1", [req.headers['x-admin-email'] || 'admin']);
      await pool.query("SET myapp.change_source = $1", ['admin_update']);
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateFields.push(`password = $${paramCount}`);
      updateValues.push(hashedPassword);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    updateValues.push(studentId);

    const updateQuery = `
      UPDATE students 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(updateQuery, updateValues);
    const updatedStudent = result.rows[0];

    const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;
    const studentResponse = {
      ...updatedStudent,
      profileImage: updatedStudent.profile_image ? `${baseUrl}${updatedStudent.profile_image}` : null,
      fullName: `${updatedStudent.first_name} ${updatedStudent.last_name}`.trim(),
    };

    res.json({
      success: true,
      message: "Student updated successfully",
      data: { student: studentResponse },
    });
  } catch (error) {
    console.error("❌ Admin student update error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to update student: " + error.message,
    });
  }
});

// Delete student
app.delete("/api/admin/students/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Remove from active students if present
    activeStudents.delete(studentId);

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Admin student delete error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to delete student: " + error.message,
    });
  }
});

// Get video by subtopic ID
app.get("/api/class-video/:subtopicId", auth, async (req, res) => {
  try {
    const { subtopicId } = req.params;

    const result = await pool.query(
      `SELECT * FROM class_videos WHERE subtopic_id = $1 AND is_active = true`,
      [subtopicId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Video not found for this class",
      });
    }

    const video = result.rows[0];
    const baseUrl =
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;

    // Construct full URL for uploaded videos
    if (
      video.video_type === "uploaded" &&
      !video.video_url.startsWith("http")
    ) {
      video.video_url = `${baseUrl}${video.video_url}`;
    }

    if (video.thumbnail_url && !video.thumbnail_url.startsWith("http")) {
      video.thumbnail_url = `${baseUrl}${video.thumbnail_url}`;
    }

    res.json({
      success: true,
      data: { video },
    });
  } catch (error) {
    console.error("Class video fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch class video",
    });
  }
});

// Get all class videos (PUBLIC - NO AUTH)
app.get("/api/admin/class-videos", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      moduleName,
      topicName,
      isActive,
    } = req.query;
    const offset = (page - 1) * limit;

    let baseQuery = `
      SELECT cv.*,
              s.first_name as created_by_first_name,
              s.last_name as created_by_last_name
      FROM class_videos cv
      LEFT JOIN students s ON cv.created_by = s.id
      WHERE 1=1
    `;
    let countQuery = `SELECT COUNT(*) as total FROM class_videos cv WHERE 1=1`;
    const queryParams = [];
    let paramCount = 1;

    if (search && search.trim() !== "") {
      const searchCondition = ` AND (
        cv.video_title ILIKE $${paramCount} OR
        cv.video_description ILIKE $${paramCount} OR
        cv.subtopic_id ILIKE $${paramCount} OR
        cv.module_name ILIKE $${paramCount} OR
        cv.topic_name ILIKE $${paramCount}
      )`;
      baseQuery += searchCondition;
      countQuery += searchCondition;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    if (moduleName && moduleName !== "") {
      baseQuery += ` AND cv.module_name ILIKE $${paramCount}`;
      countQuery += ` AND cv.module_name ILIKE $${paramCount}`;
      queryParams.push(`%${moduleName}%`);
      paramCount++;
    }

    if (topicName && topicName !== "") {
      baseQuery += ` AND cv.topic_name ILIKE $${paramCount}`;
      countQuery += ` AND cv.topic_name ILIKE $${paramCount}`;
      queryParams.push(`%${topicName}%`);
      paramCount++;
    }

    if (isActive !== undefined && isActive !== "") {
      baseQuery += ` AND cv.is_active = $${paramCount}`;
      countQuery += ` AND cv.is_active = $${paramCount}`;
      queryParams.push(isActive === "true");
      paramCount++;
    }

    baseQuery += ` ORDER BY cv.created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1
      }`;
    queryParams.push(Number.parseInt(limit), offset);

    const videosResult = await pool.query(baseQuery, queryParams);
    const countResult = await pool.query(countQuery, queryParams.slice(0, -2));
    const total = Number.parseInt(countResult.rows[0]?.total || 0);

    const baseUrl =
      process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;

    const videos = videosResult.rows.map((video) => ({
      ...video,
      video_url:
        video.video_type === "uploaded" && !video.video_url.startsWith("http")
          ? `${baseUrl}${video.video_url}`
          : video.video_url,
      thumbnail_url:
        video.thumbnail_url && !video.thumbnail_url.startsWith("http")
          ? `${baseUrl}${video.thumbnail_url}`
          : video.thumbnail_url,
    }));

    res.json({
      success: true,
      data: {
        videos,
        pagination: {
          page: Number.parseInt(page),
          limit: Number.parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Admin class videos fetch error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch class videos",
    });
  }
});

// Create class video (PUBLIC - NO AUTH)
app.post(
  "/api/admin/class-videos",
  videoUpload.single("video"),
  async (req, res) => {
    try {
      console.log("📹 Class video creation request received");
      console.log("📦 Request body:", req.body);
      console.log("🎥 Uploaded file:", req.file);

      const {
        subtopicId,
        videoTitle,
        videoDescription,
        videoUrl,
        videoType = "youtube",
        moduleName,
        topicName,
        duration,
        isActive = true,
      } = req.body;

      if (!subtopicId || !videoTitle) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: "Subtopic ID and video title are required",
        });
      }

      const existingVideo = await pool.query(
        "SELECT * FROM class_videos WHERE subtopic_id = $1",
        [subtopicId]
      );

      if (existingVideo.rows.length > 0) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message:
            "Video already exists for this subtopic. Use update instead.",
        });
      }

      let finalVideoUrl = videoUrl;
      let finalVideoType = videoType;

      if (req.file) {
        try {
          validateVideoFile(req.file);
          finalVideoUrl = `/uploads/videos/${req.file.filename}`;
          finalVideoType = "uploaded";
          console.log(`✅ Video file validated and saved: ${finalVideoUrl}`);
        } catch (fileError) {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          return res.status(400).json({
            success: false,
            message: fileError.message,
          });
        }
      } else if (finalVideoType !== "uploaded") {
        if (!finalVideoUrl) {
          return res.status(400).json({
            success: false,
            message: "Video URL is required for YouTube/Vimeo videos",
          });
        }

        try {
          new URL(finalVideoUrl);
        } catch (urlError) {
          return res.status(400).json({
            success: false,
            message: "Invalid video URL format",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: "Video file is required for uploaded videos",
        });
      }

      console.log(`🆕 Creating new video for subtopic: ${subtopicId}`);

      const result = await pool.query(
        `INSERT INTO class_videos 
         (subtopic_id, video_title, video_description, video_url, 
          video_type, module_name, topic_name, duration, 
          is_active, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
          subtopicId,
          videoTitle,
          videoDescription || "",
          finalVideoUrl,
          finalVideoType,
          moduleName || null,
          topicName || null,
          duration ? Number.parseInt(duration) : null,
          isActive === "true" || isActive === true,
          1,
        ]
      );

      const video = result.rows[0];
      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;

      const videoResponse = {
        ...video,
        video_url:
          video.video_type === "uploaded" && !video.video_url.startsWith("http")
            ? `${baseUrl}${video.video_url}`
            : video.video_url,
      };

      console.log("✅ Video created successfully:", videoResponse);

      res.status(201).json({
        success: true,
        message: "Video created successfully",
        data: { video: videoResponse },
      });
    } catch (error) {
      console.error("❌ Class video creation error:", error.message);

      if (req.file && req.file.path) {
        try {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
            console.log("🧹 Cleaned up uploaded file due to error");
          }
        } catch (cleanupError) {
          console.error("File cleanup error:", cleanupError.message);
        }
      }

      res.status(500).json({
        success: false,
        error: "Failed to create class video: " + error.message,
      });
    }
  }
);

// Update class video (PUBLIC - NO AUTH)
app.put(
  "/api/admin/class-videos/:subtopicId",
  videoUpload.single("video"),
  async (req, res) => {
    try {
      const { subtopicId } = req.params;

      console.log("📹 Class video update request received for:", subtopicId);
      console.log("📦 Request body:", req.body);
      console.log("🎥 Uploaded file:", req.file);

      const {
        videoTitle,
        videoDescription,
        videoUrl,
        videoType = "youtube",
        moduleName,
        topicName,
        duration,
        isActive = true,
      } = req.body;

      if (!videoTitle) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({
          success: false,
          message: "Video title is required",
        });
      }

      const existingVideo = await pool.query(
        "SELECT * FROM class_videos WHERE subtopic_id = $1",
        [subtopicId]
      );

      if (existingVideo.rows.length === 0) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({
          success: false,
          message: "Video not found for this subtopic",
        });
      }

      const oldVideo = existingVideo.rows[0];
      let finalVideoUrl = videoUrl || oldVideo.video_url;
      let finalVideoType = videoType || oldVideo.video_type;

      if (req.file) {
        try {
          validateVideoFile(req.file);

          finalVideoUrl = `/uploads/videos/${req.file.filename}`;
          finalVideoType = "uploaded";
          console.log(`✅ New video file uploaded: ${finalVideoUrl}`);

          if (oldVideo.video_type === "uploaded" && oldVideo.video_url) {
            const oldVideoPath = path.join(__dirname, oldVideo.video_url);
            if (fs.existsSync(oldVideoPath)) {
              fs.unlinkSync(oldVideoPath);
              console.log("🗑️ Deleted old video file");
            }
          }
        } catch (fileError) {
          if (req.file) {
            fs.unlinkSync(req.file.path);
          }
          return res.status(400).json({
            success: false,
            message: fileError.message,
          });
        }
      } else if (videoType && videoType !== "uploaded" && videoUrl) {
        finalVideoUrl = videoUrl;
        finalVideoType = videoType;

        if (oldVideo.video_type === "uploaded" && oldVideo.video_url) {
          const oldVideoPath = path.join(__dirname, oldVideo.video_url);
          if (fs.existsSync(oldVideoPath)) {
            fs.unlinkSync(oldVideoPath);
            console.log("🗑️ Deleted old uploaded video file");
          }
        }
      }

      if (finalVideoType !== "uploaded" && !finalVideoUrl) {
        return res.status(400).json({
          success: false,
          message: "Video URL is required for YouTube/Vimeo videos",
        });
      }

      const result = await pool.query(
        `UPDATE class_videos 
         SET video_title = $1, video_description = $2, video_url = $3, 
             video_type = $4, module_name = $5, topic_name = $6, 
             duration = $7, is_active = $8, updated_at = CURRENT_TIMESTAMP
         WHERE subtopic_id = $9
         RETURNING *`,
        [
          videoTitle,
          videoDescription || "",
          finalVideoUrl,
          finalVideoType,
          moduleName || null,
          topicName || null,
          duration ? Number.parseInt(duration) : null,
          isActive === "true" || isActive === true,
          subtopicId,
        ]
      );

      const video = result.rows[0];
      const baseUrl =
        process.env.BACKEND_URL ||
        `http://localhost:${process.env.PORT || 5002}`;

      const videoResponse = {
        ...video,
        video_url:
          video.video_type === "uploaded" && !video.video_url.startsWith("http")
            ? `${baseUrl}${video.video_url}`
            : video.video_url,
      };

      console.log("✅ Video updated successfully");

      res.json({
        success: true,
        message: "Video updated successfully",
        data: { video: videoResponse },
      });
    } catch (error) {
      console.error("❌ Class video update error:", error.message);

      if (req.file && req.file.path) {
        try {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
            console.log("🧹 Cleaned up uploaded file due to error");
          }
        } catch (cleanupError) {
          console.error("File cleanup error:", cleanupError.message);
        }
      }

      res.status(500).json({
        success: false,
        error: "Failed to update class video: " + error.message,
      });
    }
  }
);

// Delete class video (PUBLIC - NO AUTH)
app.delete("/api/admin/class-videos/:subtopicId", async (req, res) => {
  try {
    const { subtopicId } = req.params;

    const result = await pool.query(
      "DELETE FROM class_videos WHERE subtopic_id = $1 RETURNING *",
      [subtopicId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const video = result.rows[0];
    if (video.video_type === "uploaded" && video.video_url) {
      const filename = video.video_url.replace("/uploads/videos/", "");
      const videoPath = path.join(UPLOAD_BASE_PATH, "videos", filename);
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Class video delete error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to delete class video",
    });
  }
});

// Toggle video active status (PUBLIC - NO AUTH)
app.patch(
  "/api/admin/class-videos/:subtopicId/toggle-active",
  async (req, res) => {
    try {
      const { subtopicId } = req.params;

      const result = await pool.query(
        `UPDATE class_videos 
         SET is_active = NOT is_active, updated_at = CURRENT_TIMESTAMP
         WHERE subtopic_id = $1
         RETURNING *`,
        [subtopicId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Video not found",
        });
      }

      res.json({
        success: true,
        message: `Video ${result.rows[0].is_active ? "activated" : "deactivated"
          } successfully`,
        data: { video: result.rows[0] },
      });
    } catch (error) {
      console.error("Video toggle active error:", error.message);
      res.status(500).json({
        success: false,
        error: "Failed to toggle video status",
      });
    }
  }
);

// -------------------------------------------
// 🔹 Video Streaming Route
// -------------------------------------------
app.get("/uploads/videos/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const videoPath = path.join(UPLOAD_BASE_PATH, "videos", filename);
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({
        success: false,
        message: "Video file not found",
      });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      // Handle range requests for video streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Send entire file
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error("Video streaming error:", error.message);
    res.status(500).json({
      success: false,
      message: "Error streaming video",
    });
  }
});

// ==========================================
// 🔹 AI CHAT SESSIONS ROUTES
// ==========================================

// Get all sessions for a student
app.get("/api/ai/sessions", auth, async (req, res) => {
  try {
    const studentId = req.student.id; // Note: changed from req.user.id to req.student.id

    console.log(`📱 Fetching AI sessions for student: ${studentId}`);

    const result = await pool.query(
      "SELECT id, title, messages, created_at, updated_at FROM ai_chat_sessions WHERE student_id = $1 ORDER BY updated_at DESC",
      [studentId]
    );

    // Parse messages JSON for each session
    const sessions = result.rows.map((session) => ({
      ...session,
      messages: session.messages ? JSON.parse(session.messages) : [],
      updatedAt: session.updated_at,
      createdAt: session.created_at,
    }));

    res.json({
      success: true,
      data: sessions,
    });
  } catch (err) {
    console.error("❌ AI sessions fetch error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to load chat history: " + err.message,
    });
  }
});

// Create or update a session
app.post("/api/ai/sessions", auth, async (req, res) => {
  try {
    const { id, title, messages } = req.body;
    const studentId = req.student.id;

    console.log(`📝 Saving AI session for student: ${studentId}`, {
      id,
      title,
    });

    if (!title || !messages) {
      return res.status(400).json({
        success: false,
        error: "Title and messages are required",
      });
    }

    let result;

    if (id) {
      // Update existing session
      result = await pool.query(
        `UPDATE ai_chat_sessions 
         SET title = $1, messages = $2, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $3 AND student_id = $4 
         RETURNING *`,
        [title, JSON.stringify(messages), id, studentId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Session not found or access denied",
        });
      }
    } else {
      // Create new session
      result = await pool.query(
        `INSERT INTO ai_chat_sessions (student_id, title, messages) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [studentId, title, JSON.stringify(messages)]
      );
    }

    const session = result.rows[0];
    const formattedSession = {
      ...session,
      messages: session.messages ? JSON.parse(session.messages) : [],
      updatedAt: session.updated_at,
      createdAt: session.created_at,
    };

    console.log(
      `✅ Session ${id ? "updated" : "created"} successfully: ${session.id}`
    );

    res.json({
      success: true,
      data: formattedSession,
    });
  } catch (err) {
    console.error("❌ AI session save error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to save session: " + err.message,
    });
  }
});

// Delete a session
app.delete("/api/ai/sessions/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.student.id;

    console.log(`🗑️ Deleting AI session: ${id} for student: ${studentId}`);

    // Verify the session belongs to the student
    const checkResult = await pool.query(
      "SELECT id FROM ai_chat_sessions WHERE id = $1 AND student_id = $2",
      [id, studentId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Session not found or access denied",
      });
    }

    await pool.query(
      "DELETE FROM ai_chat_sessions WHERE id = $1 AND student_id = $2",
      [id, studentId]
    );

    console.log(`✅ Session deleted successfully: ${id}`);

    res.json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (err) {
    console.error("❌ AI session delete error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to delete session: " + err.message,
    });
  }
});

// Get single session by ID
app.get("/api/ai/sessions/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.student.id;

    console.log(`📱 Fetching single AI session: ${id}`);

    const result = await pool.query(
      `SELECT id, title, messages, created_at, updated_at 
       FROM ai_chat_sessions 
       WHERE id = $1 AND student_id = $2`,
      [id, studentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Session not found or access denied",
      });
    }

    const session = result.rows[0];
    const formattedSession = {
      ...session,
      messages: session.messages ? JSON.parse(session.messages) : [],
      updatedAt: session.updated_at,
      createdAt: session.created_at,
    };

    res.json({
      success: true,
      data: formattedSession,
    });
  } catch (err) {
    console.error("❌ AI single session fetch error:", err.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch session: " + err.message,
    });
  }
});

// Function to insert default categories
async function insertDefaultCategories() {
  const defaultCategories = [
    {
      category_name: "Full Stack Development",
      description: "Complete web development from frontend to backend",
      icon_url: "/icons/dev.svg",
      display_order: 1,
    },
    {
      category_name: "Frontend",
      description: "HTML, CSS, JavaScript, React, Angular, Vue",
      parent_category: "Full Stack Development",
      icon_url: "/icons/frontend.svg",
      display_order: 2,
    },
    {
      category_name: "Backend",
      description: "Node.js, Python, Java, PHP, Databases",
      parent_category: "Full Stack Development",
      icon_url: "/icons/backend.svg",
      display_order: 3,
    },
    {
      category_name: "Python",
      description: "Python programming, Django, Flask, ML",
      icon_url: "/icons/python.svg",
      display_order: 4,
    },
    {
      category_name: "Digital Marketing",
      description: "SEO, Social Media, Content Marketing, Analytics",
      icon_url: "/icons/marketing.svg",
      display_order: 5,
    },
    {
      category_name: "Placements",
      description: "Interview prep, Resume building, Career guidance",
      icon_url: "/icons/placement.svg",
      display_order: 6,
    },
    {
      category_name: "Git & DevOps",
      description: "Version control, CI/CD, Deployment",
      icon_url: "/icons/git.svg",
      display_order: 7,
    },
    {
      category_name: "Projects",
      description: "Real-world projects and implementations",
      icon_url: "/icons/project.svg",
      display_order: 8,
    },
    {
      category_name: "FAQs",
      description: "Frequently asked questions by students",
      icon_url: "/icons/faq.svg",
      display_order: 9,
    },
  ];

  for (const category of defaultCategories) {
    try {
      await pool.query(
        `INSERT INTO ai_content_categories 
         (category_name, description, icon_url, parent_category, display_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (category_name) DO UPDATE SET
           description = EXCLUDED.description,
           icon_url = EXCLUDED.icon_url,
           parent_category = EXCLUDED.parent_category,
           display_order = EXCLUDED.display_order`,
        [
          category.category_name,
          category.description,
          category.icon_url,
          category.parent_category || null,
          category.display_order,
          true,
        ]
      );
      console.log(`✅ Category added/updated: ${category.category_name}`);
    } catch (error) {
      console.error(
        `Error inserting category ${category.category_name}:`,
        error.message
      );
    }
  }
}

// ==========================================
// 🔹 ENHANCED AI CHAT WITH CONTENT INTEGRATION
// ==========================================

// Enhanced GeminiService with content search

// ==========================================
// 🔹 ENHANCED GEMINI SERVICE
// ==========================================
class EnhancedGeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      console.error(
        "❌ GEMINI_API_KEY is not configured in environment variables"
      );
    }
  }

  static async searchContent(keywords, category = null) {
    try {
      let query = `
        SELECT title, content, category, subcategory 
        FROM ai_learning_content 
        WHERE is_active = true 
        AND (keywords @> $1 OR title ILIKE $2 OR content ILIKE $2)
      `;

      const params = [keywords, `%${keywords[0]}%`];

      if (category) {
        query += ` AND category = $${params.length + 1}`;
        params.push(category);
      }

      query += ` ORDER BY priority DESC LIMIT 5`;

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Content search error:", error);
      return [];
    }
  }

  static async findStudentQuestions(question, studentId = null) {
    try {
      let query = `
        SELECT question, answer, category 
        FROM student_questions_kb 
        WHERE status = 'answered' 
        AND (question ILIKE $1 OR answer ILIKE $1)
      `;

      const params = [`%${question}%`];

      if (studentId) {
        query += ` AND student_id = $${params.length + 1}`;
        params.push(studentId);
      }

      query += ` ORDER BY is_important DESC, asked_at DESC LIMIT 3`;

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Questions search error:", error);
      return [];
    }
  }

  static async getEnhancedGeminiResponse(message, context) {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API key is not configured");
      }

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        systemInstruction: `
        You are "BroOne AI", the official AI assistant of OneSolutions Institute.
        Your role: Expert tutor, mentor, and career guide for students.

        INSTRUCTIONS:
        1. Use the provided context to give accurate, personalized answers
        2. If context doesn't match perfectly, use your general knowledge
        3. Always be encouraging and supportive
        4. Structure complex answers with bullet points or steps
        5. Include code examples when relevant
        6. Suggest next learning steps
        7. Relate answers to real-world applications
        8. Keep responses concise but thorough

        FORMAT GUIDELINES:
        - Start with a brief acknowledgment
        - Present main answer clearly
        - Use examples when helpful
        - End with key takeaways or next steps
        `,
      });

      const prompt = `Context Information:\n${context}\n\nStudent Question: ${message}\n\nPlease provide a helpful, accurate response based on the context above. If the context doesn't fully answer the question, use your knowledge to supplement.`;

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      return "I'm here to help! Based on our learning materials and your question, I recommend checking our course content on this topic. You can also reach out to your mentors for personalized guidance.";
    }
  }
}

// Helper functions for AI content
function extractKeywords(text) {
  if (!text) return [];
  const stopWords = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "as",
    "is",
    "it",
    "that",
    "this",
    "was",
    "are",
    "be",
    "have",
    "has",
    "had",
  ];
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.includes(word));

  return [...new Set(words)].slice(0, 10);
}

function detectCategory(message) {
  if (!message) return "General";

  const categories = {
    "react|jsx|component|hook|state|props|frontend|javascript|js": "Frontend",
    "node|express|server|api|backend|database|mongodb|postgres|mysql":
      "Backend",
    "python|django|flask|ml|ai|data|pandas|numpy|tensorflow": "Python",
    "html|css|tailwind|bootstrap|responsive|design": "Frontend",
    "git|github|version|control|commit|devops|deployment|ci/cd": "Git & DevOps",
    "marketing|seo|social|media|digital|content|analytics": "Digital Marketing",
    "interview|resume|placement|job|career|salary|ctc|hiring": "Placements",
    "project|portfolio|build|create|implementation|real-world": "Projects",
  };

  const lowerMsg = message.toLowerCase();
  for (const [keywords, category] of Object.entries(categories)) {
    if (keywords.split("|").some((keyword) => lowerMsg.includes(keyword))) {
      return category;
    }
  }

  return "General";
}

function prepareAIContext(content, questions, student) {
  let context = `STUDENT CONTEXT:\n`;
  context += `- Name: ${student?.first_name || "Student"} ${student?.last_name || ""
    }\n`;
  context += `- Batch: ${student?.batch_month || ""} ${student?.batch_year || ""
    }\n`;
  context += `- Current Level: ${student?.current_coding_level || "Not specified"
    }\n`;
  context += `- Technical Skills: ${student?.technical_skills?.join(", ") || "Not specified"
    }\n`;
  context += `- Job Search Status: ${student?.job_search_status || "Not specified"
    }\n\n`;

  context += `RELEVANT LEARNING CONTENT:\n`;

  if (content && content.length > 0) {
    content.forEach((item, index) => {
      context += `${index + 1}. [${item.category}] ${item.title
        }: ${item.content.substring(0, 200)}...\n`;
    });
  } else {
    context += "No direct content matches found.\n";
  }

  context += "\nSIMILAR PREVIOUS QUESTIONS:\n";
  if (questions && questions.length > 0) {
    questions.forEach((q, index) => {
      context += `${index + 1}. Q: ${q.question}\n   A: ${q.answer?.substring(0, 150) || "No answer yet"
        }...\n`;
    });
  } else {
    context += "No similar questions found.\n";
  }

  return context;
}

// ==========================================
// 🔹 ADMIN CONTENT MANAGEMENT ROUTES
// ==========================================

// Get all categories
app.get("/api/admin/ai-content/categories", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM ai_content_categories 
       ORDER BY display_order, category_name`
    );

    res.json({
      success: true,
      data: { categories: result.rows },
    });
  } catch (error) {
    console.error("Categories fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
    });
  }
});

// Add/Update category
app.post("/api/admin/ai-content/categories", async (req, res) => {
  try {
    const {
      id,
      category_name,
      description,
      icon_url,
      parent_category,
      is_active,
      display_order,
    } = req.body;

    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    let result;
    if (id) {
      // Update existing category
      result = await pool.query(
        `UPDATE ai_content_categories 
         SET category_name = $1, description = $2, icon_url = $3, 
             parent_category = $4, is_active = $5, display_order = $6,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $7
         RETURNING *`,
        [
          category_name,
          description,
          icon_url,
          parent_category,
          is_active,
          display_order,
          id,
        ]
      );
    } else {
      // Insert new category
      result = await pool.query(
        `INSERT INTO ai_content_categories 
         (category_name, description, icon_url, parent_category, is_active, display_order)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [
          category_name,
          description,
          icon_url,
          parent_category,
          is_active,
          display_order,
        ]
      );
    }

    res.json({
      success: true,
      message: `Category ${id ? "updated" : "created"} successfully`,
      data: { category: result.rows[0] },
    });
  } catch (error) {
    console.error("Category save error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save category",
    });
  }
});

// Get all content with filters
app.get("/api/admin/ai-content", async (req, res) => {
  try {
    const { page = 1, limit = 20, category, search, is_active } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT alc.*, 
             s.first_name as created_by_first_name,
             s.last_name as created_by_last_name,
             acc.category_name as category_display
      FROM ai_learning_content alc
      LEFT JOIN students s ON alc.created_by = s.id
      LEFT JOIN ai_content_categories acc ON alc.category = acc.category_name
      WHERE 1=1
    `;

    let countQuery = `
      SELECT COUNT(*) as total
      FROM ai_learning_content alc
      WHERE 1=1
    `;

    const queryParams = [];
    let paramCount = 1;

    if (category && category !== "all") {
      query += ` AND alc.category = $${paramCount}`;
      countQuery += ` AND alc.category = $${paramCount}`;
      queryParams.push(category);
      paramCount++;
    }

    if (search && search.trim() !== "") {
      query += ` AND (
        alc.title ILIKE $${paramCount} OR 
        alc.content ILIKE $${paramCount} OR 
        alc.keywords::text ILIKE $${paramCount}
      )`;
      countQuery += ` AND (
        alc.title ILIKE $${paramCount} OR 
        alc.content ILIKE $${paramCount} OR 
        alc.keywords::text ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    if (is_active !== undefined && is_active !== "") {
      query += ` AND alc.is_active = $${paramCount}`;
      countQuery += ` AND alc.is_active = $${paramCount}`;
      queryParams.push(is_active === "true");
      paramCount++;
    }

    query += ` ORDER BY alc.priority DESC, alc.created_at DESC 
               LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(parseInt(limit), offset);

    const result = await pool.query(query, queryParams);
    const countResult = await pool.query(countQuery, queryParams.slice(0, -2));

    res.json({
      success: true,
      data: {
        content: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(countResult.rows[0]?.total || 0),
          pages: Math.ceil(parseInt(countResult.rows[0]?.total || 0) / limit),
        },
      },
    });
  } catch (error) {
    console.error("Content fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch content",
    });
  }
});

// Add/Update content
app.post("/api/admin/ai-content", async (req, res) => {
  try {
    const {
      id,
      category,
      subcategory,
      title,
      content,
      keywords,
      content_type,
      file_url,
      priority,
      is_active,
    } = req.body;

    if (!category || !title || !content) {
      return res.status(400).json({
        success: false,
        message: "Category, title, and content are required",
      });
    }

    // Parse keywords if string
    const keywordsArray = Array.isArray(keywords)
      ? keywords
      : keywords
        ? keywords.split(",").map((k) => k.trim())
        : [];

    let result;
    if (id) {
      // Update existing content
      result = await pool.query(
        `UPDATE ai_learning_content 
         SET category = $1, subcategory = $2, title = $3, content = $4,
             keywords = $5, content_type = $6, file_url = $7, 
             priority = $8, is_active = $9, updated_at = CURRENT_TIMESTAMP
         WHERE id = $10
         RETURNING *`,
        [
          category,
          subcategory,
          title,
          content,
          keywordsArray,
          content_type,
          file_url,
          priority,
          is_active,
          id,
        ]
      );
    } else {
      // Insert new content
      result = await pool.query(
        `INSERT INTO ai_learning_content 
         (category, subcategory, title, content, keywords, 
          content_type, file_url, priority, is_active, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [
          category,
          subcategory,
          title,
          content,
          keywordsArray,
          content_type,
          file_url,
          priority,
          is_active,
          1,
        ] // Admin user ID
      );
    }

    res.json({
      success: true,
      message: `Content ${id ? "updated" : "created"} successfully`,
      data: { content: result.rows[0] },
    });
  } catch (error) {
    console.error("Content save error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save content",
    });
  }
});

// Delete content
app.delete("/api/admin/ai-content/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM ai_learning_content WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.json({
      success: true,
      message: "Content deleted successfully",
    });
  } catch (error) {
    console.error("Content delete error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete content",
    });
  }
});

// Get student questions for admin
app.get("/api/admin/ai-content/student-questions", async (req, res) => {
  try {
    const { page = 1, limit = 20, status, category, search } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT sqk.*, 
             s.first_name, 
             s.last_name,
             s.email,
             s.batch_month,
             s.batch_year
      FROM student_questions_kb sqk
      LEFT JOIN students s ON sqk.student_id = s.id
      WHERE 1=1
    `;

    const queryParams = [];
    let paramCount = 1;

    if (status && status !== "all") {
      query += ` AND sqk.status = $${paramCount}`;
      queryParams.push(status);
      paramCount++;
    }

    if (category && category !== "all") {
      query += ` AND sqk.category = $${paramCount}`;
      queryParams.push(category);
      paramCount++;
    }

    if (search && search.trim() !== "") {
      query += ` AND (
        sqk.question ILIKE $${paramCount} OR 
        sqk.answer ILIKE $${paramCount} OR
        s.first_name ILIKE $${paramCount} OR
        s.last_name ILIKE $${paramCount}
      )`;
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    query += ` ORDER BY sqk.is_important DESC, sqk.asked_at DESC 
               LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(parseInt(limit), offset);

    const result = await pool.query(query, queryParams);

    res.json({
      success: true,
      data: { questions: result.rows },
    });
  } catch (error) {
    console.error("Student questions fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch student questions",
    });
  }
});

// Update student question (add answer or mark important)
app.put("/api/admin/ai-content/student-questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { answer, is_important, status, category, tags } = req.body;

    const result = await pool.query(
      `UPDATE student_questions_kb 
       SET answer = COALESCE($1, answer),
           is_important = COALESCE($2, is_important),
           status = COALESCE($3, status),
           category = COALESCE($4, category),
           tags = COALESCE($5, tags),
           answered_at = CASE WHEN $1 IS NOT NULL THEN CURRENT_TIMESTAMP ELSE answered_at END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [answer, is_important, status, category, tags, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.json({
      success: true,
      message: "Question updated successfully",
      data: { question: result.rows[0] },
    });
  } catch (error) {
    console.error("Question update error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update question",
    });
  }
});

// ==========================================
// 🔹 ENHANCED AI CHAT ENDPOINT WITH CONTEXT
// ==========================================

// ==========================================
// 🔹 ENHANCED AI CHAT ENDPOINT WITH CONTEXT
// ==========================================

app.post("/api/ai/enhanced-chat", auth, async (req, res) => {
  try {
    const { message, sessionId, category } = req.body;
    const studentId = req.student.id;

    console.log(`🤖 Enhanced chat request from student ${studentId}`);
    console.log(`📝 Message: ${message?.substring(0, 200) || "No message"}...`);

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Extract keywords from message
    const keywords = extractKeywords(message);

    // 1. Search in learning content
    const relevantContent = await EnhancedGeminiService.searchContent(
      keywords,
      category
    );

    // 2. Search in student questions KB
    const similarQuestions = await EnhancedGeminiService.findStudentQuestions(
      message,
      studentId
    );

    // 3. Save this question to KB
    try {
      await pool.query(
        `INSERT INTO student_questions_kb (student_id, question, category, tags, status, asked_at)
         VALUES ($1, $2, $3, $4, 'pending', CURRENT_TIMESTAMP)`,
        [studentId, message, detectCategory(message), keywords]
      );
    } catch (insertError) {
      console.error("Failed to save question to KB:", insertError.message);
      // Continue even if saving fails
    }

    // 4. Prepare context for Gemini
    const context = prepareAIContext(
      relevantContent,
      similarQuestions,
      req.student
    );

    // 5. Get response from Gemini with context
    let geminiResponse;
    try {
      geminiResponse = await EnhancedGeminiService.getEnhancedGeminiResponse(
        message,
        context
      );
    } catch (geminiError) {
      console.error("Gemini service error:", geminiError);
      geminiResponse =
        "I'm currently experiencing technical difficulties. Please try again in a moment or contact support.";
    }

    // 6. Try to save the response (but don't fail if it doesn't work)
    try {
      await pool.query(
        `UPDATE student_questions_kb 
         SET answer = $1, status = 'answered', answered_at = CURRENT_TIMESTAMP
         WHERE student_id = $2 AND question = $3 AND status = 'pending'
         ORDER BY asked_at DESC LIMIT 1`,
        [geminiResponse, studentId, message]
      );
    } catch (updateError) {
      console.error(
        "Failed to update question with answer:",
        updateError.message
      );
    }

    res.json({
      success: true,
      data: {
        response: geminiResponse,
        contextFound: relevantContent.length > 0 || similarQuestions.length > 0,
        relevantContent: relevantContent.slice(0, 3),
        similarQuestions: similarQuestions.slice(0, 2),
      },
    });
  } catch (error) {
    console.error("Enhanced chat error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process chat request: " + error.message,
    });
  }
});

async function getEnhancedGeminiResponse(message, context) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      systemInstruction: `
      You are "BroOne AI", the official AI assistant of OneSolutions Institute.
      Your role: Expert tutor, mentor, and career guide for students.

      INSTRUCTIONS:
      1. Use the provided context to give accurate, personalized answers
      2. If context doesn't match perfectly, use your general knowledge
      3. Always be encouraging and supportive
      4. Structure complex answers with bullet points or steps
      5. Include code examples when relevant
      6. Suggest next learning steps
      7. Relate answers to real-world applications
      8. Keep responses concise but thorough

      FORMAT GUIDELINES:
      - Start with a brief acknowledgment
      - Present main answer clearly
      - Use examples when helpful
      - End with key takeaways or next steps
      `,
    });

    const prompt = `Context Information:\n${context}\n\nStudent Question: ${message}\n\nPlease provide a helpful, accurate response based on the context above. If the context doesn't fully answer the question, use your knowledge to supplement.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm here to help! Based on our learning materials and your question, I recommend checking our course content on this topic. You can also reach out to your mentors for personalized guidance.";
  }
}

// Get learning content for students
app.get("/api/ai/learning-content", auth, async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = `
      SELECT id, category, subcategory, title, content, 
             content_type, file_url, created_at
      FROM ai_learning_content 
      WHERE is_active = true
    `;

    const params = [];
    let paramCount = 1;

    if (category && category !== "all") {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (search && search.trim() !== "") {
      query += ` AND (
        title ILIKE $${paramCount} OR 
        content ILIKE $${paramCount} OR 
        keywords::text ILIKE $${paramCount}
      )`;
      params.push(`%${search}%`);
      paramCount++;
    }

    query += ` ORDER BY priority DESC, created_at DESC LIMIT 50`;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: { content: result.rows },
    });
  } catch (error) {
    console.error("Learning content fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch learning content",
    });
  }
});

// Get content categories for students
app.get("/api/ai/categories", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT category_name, description, icon_url 
       FROM ai_content_categories 
       WHERE is_active = true
       ORDER BY display_order, category_name`
    );

    res.json({
      success: true,
      data: { categories: result.rows },
    });
  } catch (error) {
    console.error("Categories fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
    });
  }
});

// -------------------------------------------
// 🔹 PASSWORD INTEGRITY CHECK (Admin only)
// -------------------------------------------
app.get("/api/admin/password-integrity", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, email, 
             CASE 
               WHEN password LIKE '$2b$%' AND LENGTH(password) = 60 THEN 'valid'
               WHEN password = 'RESET_REQUIRED' THEN 'reset_required'
               ELSE 'corrupted'
             END as status,
             LENGTH(password) as hash_length,
             created_at,
             updated_at
      FROM students
      ORDER BY id
    `);
    const corrupted = result.rows.filter(r => r.status === 'corrupted');
    res.json({
      success: true,
      data: {
        total: result.rows.length,
        corruptedCount: corrupted.length,
        corrupted: corrupted
      }
    });
  } catch (error) {
    console.error("❌ Integrity check error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to check password integrity"
    });
  }
});

// Add the router (somewhere before your 404 handler)
app.use("/", digitalMarketingRouter, javaProgrammingApp);

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// -------------------------------------------
// 🔹 Error handling middleware for Multer
// -------------------------------------------
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large. Maximum size is 5MB.",
      });
    }
  }

  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

// -------------------------------------------
// 🔹 Start Server
// -------------------------------------------
const PORT = process.env.PORT || 5002;
(async () => {
  try {
    await createTables();
    // Add digital marketing tables
    await createDigitalMarketingTables();
    await createJavaTables();
    await ensureChromeInstalled();

    console.log("✅ All database tables initialized");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `🔑 JWT Secret: ${process.env.JWT_SECRET ? "Set" : "Not set!"}`
      );
      console.log(
        `🔗 CORS Origin: ${process.env.FRONTEND_URL || "http://localhost:3000"}`
      );
      console.log(
        `📧 Email Service: ${process.env.SMTP_USER ? "Configured" : "Not configured"
        }`
      );
      console.log(`📁 Upload directory: ${uploadsDir}`);
      console.log(`⏰ OTP Expiry: ${otpExpiryTime / 60000} minutes`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
})();
