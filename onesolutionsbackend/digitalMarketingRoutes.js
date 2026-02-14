require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const {
  verifyContentAccess,
  generateSecureUrl,
} = require("./middleware/secureContent");
const jwt = require("jsonwebtoken");

// -------------------------------------------
// Database Connection
// -------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// -------------------------------------------
// Express Config
// -------------------------------------------
const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "2gb" }));
app.use(express.urlencoded({ limit: "2gb", extended: true }));

// Upload Directories
const uploadsDir = path.join(__dirname, "uploads");
const videosDir = path.join(uploadsDir, "videos");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir);

// Static files
app.use("/uploads", express.static(uploadsDir));

// -------------------------------------------
// Multer Config
// -------------------------------------------
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, videosDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "video-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files allowed"), false);
  },
});

// -------------------------------------------
// Authentication Middleware
// -------------------------------------------
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const JWT_SECRET =
      process.env.JWT_SECRET ||
      "your-fallback-secret-key-for-development-only-change-in-production";
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.student = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// -------------------------------------------
// Database Initialization
// -------------------------------------------
const createTables = async () => {
  try {
    // 1. Goals
    await pool.query(`CREATE TABLE IF NOT EXISTS course_goals (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      duration_months INTEGER DEFAULT 2,
      certificate_name VARCHAR(255),
      order_number INTEGER DEFAULT 0,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. Modules
    await pool.query(`CREATE TABLE IF NOT EXISTS course_modules (
      id SERIAL PRIMARY KEY,
      goal_id INTEGER REFERENCES course_goals(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      order_number INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // 3. Topics
    await pool.query(`CREATE TABLE IF NOT EXISTS course_topics (
      id SERIAL PRIMARY KEY,
      module_id INTEGER REFERENCES course_modules(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      order_number INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // 4. Subtopics
    await pool.query(`CREATE TABLE IF NOT EXISTS course_subtopics (
      id SERIAL PRIMARY KEY,
      topic_id INTEGER REFERENCES course_topics(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      order_number INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // 5. Content table - Create if not exists with all columns
    await pool.query(`CREATE TABLE IF NOT EXISTS subtopic_content (
      id SERIAL PRIMARY KEY,
      subtopic_id INTEGER REFERENCES course_subtopics(id) ON DELETE CASCADE,
      content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('video', 'cheatsheet', 'mcq')),
      content_uuid UUID DEFAULT gen_random_uuid(),
      access_token UUID DEFAULT gen_random_uuid(),
      
      -- Video specific
      video_title VARCHAR(500),
      video_url VARCHAR(1000),
      video_description TEXT,
      video_duration INTEGER,
      video_type VARCHAR(50) DEFAULT 'uploaded',
      thumbnail_url VARCHAR(1000),

      -- Cheatsheet specific
      cheatsheet_title VARCHAR(500),
      cheatsheet_content TEXT,
      file_url VARCHAR(1000),
      
      -- MCQ specific
      mcq_title VARCHAR(500),
      questions JSONB DEFAULT '[]',
      
      -- Common fields
      learning_objectives JSONB DEFAULT '[]',
      resources JSONB DEFAULT '[]',
      key_takeaways JSONB DEFAULT '[]',
      table_of_contents JSONB DEFAULT '[]',
      time_limit INTEGER,
      passing_score INTEGER DEFAULT 70,
      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    // Check for and add any missing columns to subtopic_content
    // In digitalMarketingRoutes.js - Update the columnsToAdd array
const columnsToAdd = [
  { name: "thumbnail_url", type: "VARCHAR(1000)" },
  { name: "learning_objectives", type: "JSONB DEFAULT '[]'" },
  { name: "resources", type: "JSONB DEFAULT '[]'" },
  { name: "key_takeaways", type: "JSONB DEFAULT '[]'" },
  { name: "table_of_contents", type: "JSONB DEFAULT '[]'" },
  { name: "time_limit", type: "INTEGER" },
  { name: "passing_score", type: "INTEGER DEFAULT 70" },
  { name: "video_type", type: "VARCHAR(50) DEFAULT 'uploaded'" },
  { name: "file_url", type: "VARCHAR(1000)" },
  { name: "questions", type: "JSONB DEFAULT '[]'" },
  { name: "slides_id", type: "VARCHAR(255)" }, // Changed to slides_id
];

    for (const column of columnsToAdd) {
      const checkColumnQuery = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'subtopic_content' AND column_name = '${column.name}'
      `;

      const columnCheck = await pool.query(checkColumnQuery);

      if (columnCheck.rows.length === 0) {
        console.log(
          `Adding ${column.name} column to subtopic_content table...`
        );
        await pool.query(
          `ALTER TABLE subtopic_content ADD COLUMN IF NOT EXISTS ${column.name} ${column.type}`
        );
        console.log(`✅ ${column.name} column added successfully`);
      }
    }

    // 6. Student Enrollments
    await pool.query(`CREATE TABLE IF NOT EXISTS student_course_enrollments (
      id SERIAL PRIMARY KEY,
      student_id INTEGER,
      goal_id INTEGER REFERENCES course_goals(id),
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completed_at TIMESTAMP,
      status VARCHAR(50) DEFAULT 'active',
      progress_percentage INTEGER DEFAULT 0,
      UNIQUE(student_id, goal_id)
    )`);

    // 7. Student Progress
    await pool.query(`CREATE TABLE IF NOT EXISTS student_course_progress (
      id SERIAL PRIMARY KEY,
      student_id INTEGER,
      goal_id INTEGER,
      module_id INTEGER,
      subtopic_id INTEGER,
      content_id INTEGER REFERENCES subtopic_content(id),
      status VARCHAR(50) DEFAULT 'completed',
      quiz_score INTEGER,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, content_id)
    )`);

    console.log("✅ Digital Marketing Schema Initialized and Verified");
  } catch (err) {
    console.error("❌ Schema Init Error:", err);
  }
};

// -------------------------------------------
// ADMIN ROUTES (Course Management)
// -------------------------------------------

// Goals
app.get("/api/admin/course/goals", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM course_goals ORDER BY order_number"
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/course/goals", async (req, res) => {
  try {
    const { name, description, duration_months, certificate_name } = req.body;
    const result = await pool.query(
      `INSERT INTO course_goals (name, description, duration_months, certificate_name, order_number)
             VALUES ($1, $2, $3, $4, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_goals)) RETURNING *`,
      [name, description, duration_months, certificate_name]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/course/goals/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;
    const { name, description, duration_months, certificate_name } = req.body;

    let query = "UPDATE course_goals SET ";
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (duration_months !== undefined) {
      updates.push(`duration_months = $${paramIndex++}`);
      values.push(duration_months);
    }
    if (certificate_name !== undefined) {
      updates.push(`certificate_name = $${paramIndex++}`);
      values.push(certificate_name);
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }

    query += updates.join(", ");
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(goalId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/api/admin/course/goals/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;
    const result = await pool.query(
      "DELETE FROM course_goals WHERE id = $1 RETURNING *",
      [goalId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Goal not found" });
    }

    res.json({ success: true, message: "Goal deleted successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Modules
app.get("/api/admin/course/goals/:goalId/modules", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM course_modules WHERE goal_id = $1 ORDER BY order_number",
      [req.params.goalId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/course/modules", async (req, res) => {
  try {
    const { goal_id, name, description } = req.body;
    const result = await pool.query(
      `INSERT INTO course_modules (goal_id, name, description, order_number)
             VALUES ($1, $2, $3, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_modules WHERE goal_id = $1)) RETURNING *`,
      [goal_id, name, description]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/course/modules/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { name, description } = req.body;

    let query = "UPDATE course_modules SET ";
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }

    query += updates.join(", ");
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(moduleId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Module not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/api/admin/course/modules/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const result = await pool.query(
      "DELETE FROM course_modules WHERE id = $1 RETURNING *",
      [moduleId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Module not found" });
    }

    res.json({ success: true, message: "Module deleted successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Topics
app.get("/api/admin/course/modules/:moduleId/topics", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM course_topics WHERE module_id = $1 ORDER BY order_number",
      [req.params.moduleId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/course/topics", async (req, res) => {
  try {
    const { module_id, name, description } = req.body;
    const result = await pool.query(
      `INSERT INTO course_topics (module_id, name, description, order_number)
             VALUES ($1, $2, $3, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_topics WHERE module_id = $1)) RETURNING *`,
      [module_id, name, description]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/course/topics/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const { name, description } = req.body;

    let query = "UPDATE course_topics SET ";
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }

    query += updates.join(", ");
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(topicId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Topic not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/api/admin/course/topics/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const result = await pool.query(
      "DELETE FROM course_topics WHERE id = $1 RETURNING *",
      [topicId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Topic not found" });
    }

    res.json({ success: true, message: "Topic deleted successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Subtopics
app.get("/api/admin/course/topics/:topicId/subtopics", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM course_subtopics WHERE topic_id = $1 ORDER BY order_number",
      [req.params.topicId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/admin/course/subtopics", async (req, res) => {
  try {
    const { topic_id, name, description } = req.body;
    const result = await pool.query(
      `INSERT INTO course_subtopics (topic_id, name, description, order_number)
             VALUES ($1, $2, $3, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_subtopics WHERE topic_id = $1)) RETURNING *`,
      [topic_id, name, description]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/course/subtopics/:subtopicId", async (req, res) => {
  try {
    const { subtopicId } = req.params;
    const { name, description } = req.body;

    let query = "UPDATE course_subtopics SET ";
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(description);
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }

    query += updates.join(", ");
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(subtopicId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Subtopic not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/api/admin/course/subtopics/:subtopicId", async (req, res) => {
  try {
    const { subtopicId } = req.params;
    const result = await pool.query(
      "DELETE FROM course_subtopics WHERE id = $1 RETURNING *",
      [subtopicId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Subtopic not found" });
    }

    res.json({ success: true, message: "Subtopic deleted successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Content
app.get("/api/admin/course/subtopics/:subtopicId/content", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM subtopic_content WHERE subtopic_id = $1 ORDER BY created_at DESC",
      [req.params.subtopicId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/api/admin/course/content/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;
    const {
      video_title,
      cheatsheet_title,
      mcq_title,
      video_description,
      cheatsheet_content,
      questions,
      learning_objectives,
      resources,
      key_takeaways,
      table_of_contents,
      time_limit,
      passing_score,
      thumbnail_url,
      slides_id, // Changed from slides_url
    } = req.body;

    let query = "UPDATE subtopic_content SET ";
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (video_title !== undefined) {
      updates.push(`video_title = $${paramIndex++}`);
      values.push(video_title);
    }
    if (cheatsheet_title !== undefined) {
      updates.push(`cheatsheet_title = $${paramIndex++}`);
      values.push(cheatsheet_title);
    }
    if (mcq_title !== undefined) {
      updates.push(`mcq_title = $${paramIndex++}`);
      values.push(mcq_title);
    }
    if (video_description !== undefined) {
      updates.push(`video_description = $${paramIndex++}`);
      values.push(video_description);
    }
    if (cheatsheet_content !== undefined) {
      updates.push(`cheatsheet_content = $${paramIndex++}`);
      values.push(cheatsheet_content);
    }
    if (questions !== undefined) {
      updates.push(`questions = $${paramIndex++}`);
      values.push(JSON.stringify(questions));
    }
    if (learning_objectives !== undefined) {
      updates.push(`learning_objectives = $${paramIndex++}`);
      values.push(JSON.stringify(learning_objectives));
    }
    if (resources !== undefined) {
      updates.push(`resources = $${paramIndex++}`);
      values.push(JSON.stringify(resources));
    }
    if (key_takeaways !== undefined) {
      updates.push(`key_takeaways = $${paramIndex++}`);
      values.push(JSON.stringify(key_takeaways));
    }
    if (table_of_contents !== undefined) {
      updates.push(`table_of_contents = $${paramIndex++}`);
      values.push(JSON.stringify(table_of_contents));
    }
    if (time_limit !== undefined) {
      updates.push(`time_limit = $${paramIndex++}`);
      values.push(time_limit);
    }
    if (passing_score !== undefined) {
      updates.push(`passing_score = $${paramIndex++}`);
      values.push(passing_score);
    }
    if (thumbnail_url !== undefined) {
      updates.push(`thumbnail_url = $${paramIndex++}`);
      values.push(thumbnail_url);
    }
    if (slides_id !== undefined) { // Changed from slides_url
      updates.push(`slides_id = $${paramIndex++}`);
      values.push(slides_id);
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });
    }

    query += updates.join(", ");
    query += ` WHERE id = $${paramIndex} RETURNING *`;
    values.push(contentId);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/api/admin/course/content/:contentId", async (req, res) => {
  try {
    const { contentId } = req.params;

    const content = await pool.query(
      "SELECT * FROM subtopic_content WHERE id = $1",
      [contentId]
    );

    if (
      content.rows.length > 0 &&
      content.rows[0].content_type === "video" &&
      content.rows[0].video_url
    ) {
      const videoPath = path.join(__dirname, content.rows[0].video_url);
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }

    const result = await pool.query(
      "DELETE FROM subtopic_content WHERE id = $1 RETURNING *",
      [contentId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    }

    res.json({ success: true, message: "Content deleted successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Upload Video
// Upload Video - Updated with slides_id
app.post(
  "/api/admin/course/subtopics/:subtopicId/video",
  videoUpload.single("video"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        duration,
        learning_objectives,
        resources,
        thumbnail_url,
        slides_id, // Changed from slides_url
      } = req.body;

      const videoUrl = `/uploads/videos/${req.file.filename}`;
      const uuid = crypto.randomUUID();
      const token = crypto.randomUUID();

      const result = await pool.query(
        `INSERT INTO subtopic_content (
          subtopic_id, 
          content_type, 
          content_uuid, 
          access_token, 
          video_title, 
          video_description, 
          video_duration, 
          video_url,
          learning_objectives,
          resources,
          thumbnail_url,
          slides_id  // Changed from slides_url
        ) VALUES ($1, 'video', $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [
          req.params.subtopicId,
          uuid,
          token,
          title,
          description,
          duration || 0,
          videoUrl,
          JSON.stringify(learning_objectives || []),
          JSON.stringify(resources || []),
          thumbnail_url || null,
          slides_id || null, // Changed from slides_url
        ]
      );
      res.json({ success: true, data: result.rows[0] });
    } catch (e) {
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ error: e.message });
    }
  }
);

// Create Cheatsheet
app.post(
  "/api/admin/course/subtopics/:subtopicId/cheatsheet",
  async (req, res) => {
    try {
      const { title, content, file_url, key_takeaways, table_of_contents } =
        req.body;

      const uuid = crypto.randomUUID();
      const token = crypto.randomUUID();

      const result = await pool.query(
        `INSERT INTO subtopic_content (
          subtopic_id, 
          content_type, 
          content_uuid,
          access_token, 
          cheatsheet_title, 
          cheatsheet_content,
          file_url,
          key_takeaways,
          table_of_contents
        ) VALUES ($1, 'cheatsheet', $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          req.params.subtopicId,
          uuid,
          token,
          title,
          content,
          file_url || null,
          JSON.stringify(key_takeaways || []),
          JSON.stringify(table_of_contents || []),
        ]
      );
      res.json({ success: true, data: result.rows[0] });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
);

// Create MCQ
app.post("/api/admin/course/subtopics/:subtopicId/mcq", async (req, res) => {
  try {
    const { title, questions, time_limit, passing_score } = req.body;

    const uuid = crypto.randomUUID();
    const token = crypto.randomUUID();

    const result = await pool.query(
      `INSERT INTO subtopic_content (
        subtopic_id, 
        content_type, 
        content_uuid,
        access_token, 
        mcq_title, 
        questions,
        time_limit,
        passing_score
      ) VALUES ($1, 'mcq', $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        req.params.subtopicId,
        uuid,
        token,
        title,
        JSON.stringify(questions),
        time_limit || null,
        passing_score || 70,
      ]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// -------------------------------------------
// STUDENT ROUTES
// -------------------------------------------

// Get Courses (Goals)
app.get("/api/student/courses", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;

    const result = await pool.query(
      `SELECT cg.*, sce.enrolled_at, sce.progress_percentage 
             FROM course_goals cg 
             LEFT JOIN student_course_enrollments sce ON cg.id = sce.goal_id AND sce.student_id = $1
             WHERE cg.is_active = true
             ORDER BY cg.order_number`,
      [studentId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Enroll
app.post(
  "/api/student/courses/enroll/:goalId",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;
      const goalId = req.params.goalId;

      const goalCheck = await pool.query(
        "SELECT id FROM course_goals WHERE id = $1 AND is_active = true",
        [goalId]
      );

      if (goalCheck.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Course not found or inactive",
        });
      }

      await pool.query(
        `INSERT INTO student_course_enrollments (student_id, goal_id) 
             VALUES ($1, $2) 
             ON CONFLICT (student_id, goal_id) DO NOTHING
             RETURNING *`,
        [studentId, goalId]
      );
      res.json({
        success: true,
        message: "Successfully enrolled in course",
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Get Full Course Structure with Progress
app.get("/api/student/courses/goal/:goalId", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { goalId } = req.params;

    const enrollment = await pool.query(
      "SELECT * FROM student_course_enrollments WHERE student_id = $1 AND goal_id = $2",
      [studentId, goalId]
    );

    if (enrollment.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    const goal = await pool.query(
      "SELECT * FROM course_goals WHERE id = $1 AND is_active = true",
      [goalId]
    );

    if (goal.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const modulesResult = await pool.query(
      `SELECT cm.*,
                (SELECT json_agg(
                    json_build_object(
                        'id', ct.id, 
                        'name', ct.name,
                        'description', ct.description,
                        'order_number', ct.order_number,
                        'subtopics', (
                            SELECT json_agg(
                                json_build_object(
                                    'id', cs.id, 
                                    'name', cs.name,
                                    'description', cs.description,
                                    'order_number', cs.order_number,
                                    'content', (
                                        SELECT json_agg(
                                            json_build_object(
                                                'id', sc.id, 
                                                'content_type', sc.content_type,
                                                'content_uuid', sc.content_uuid,
                                                'video_title', sc.video_title,
                                                'video_description', sc.video_description,
                                                'video_duration', sc.video_duration,
                                                'video_url', sc.video_url,
                                                'thumbnail_url', sc.thumbnail_url,
                                                'cheatsheet_title', sc.cheatsheet_title,
                                                'cheatsheet_content', sc.cheatsheet_content,
                                                'file_url', sc.file_url,
                                                'mcq_title', sc.mcq_title,
                                                'questions', sc.questions,
                                                'learning_objectives', sc.learning_objectives,
                                                'resources', sc.resources,
                                                'key_takeaways', sc.key_takeaways,
                                                'table_of_contents', sc.table_of_contents,
                                                'time_limit', sc.time_limit,
                                                'passing_score', sc.passing_score,
                                                'progress_status', scp.status,
                                                'completed_at', scp.completed_at,
                                                'quiz_score', scp.quiz_score,
                                                'is_completed', CASE WHEN scp.id IS NOT NULL THEN true ELSE false END
                                            )
                                        ) FROM subtopic_content sc
                                        LEFT JOIN student_course_progress scp ON sc.id = scp.content_id AND scp.student_id = $1
                                        WHERE sc.subtopic_id = cs.id
                                    )
                                ) ORDER BY cs.order_number
                            ) FROM course_subtopics cs WHERE cs.topic_id = ct.id
                        )
                    ) ORDER BY ct.order_number
                ) FROM course_topics ct WHERE ct.module_id = cm.id) as topics
             FROM course_modules cm 
             WHERE cm.goal_id = $2 
             ORDER BY cm.order_number`,
      [studentId, goalId]
    );

    res.json({
      success: true,
      data: {
        goal: goal.rows[0],
        modules: modulesResult.rows,
        enrollment: enrollment.rows[0],
      },
    });
  } catch (e) {
    console.error("Course fetch error:", e);
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

// Complete Content
app.post(
  "/api/student/courses/content/complete",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;
      const { content_id, goal_id, quiz_score, module_id, subtopic_id } =
        req.body;

      if (!content_id || !goal_id) {
        return res.status(400).json({
          success: false,
          message: "Content ID and Goal ID are required",
        });
      }

      await pool.query(
        `INSERT INTO student_course_progress (student_id, goal_id, content_id, status, quiz_score, module_id, subtopic_id)
       VALUES ($1, $2, $3, 'completed', $4, $5, $6)
       ON CONFLICT (student_id, content_id) DO UPDATE SET 
          status = 'completed',
          quiz_score = COALESCE($4, student_course_progress.quiz_score),
          module_id = COALESCE($5, student_course_progress.module_id),
          subtopic_id = COALESCE($6, student_course_progress.subtopic_id),
          completed_at = CURRENT_TIMESTAMP`,
        [
          studentId,
          goal_id,
          content_id,
          quiz_score || null,
          module_id || null,
          subtopic_id || null,
        ]
      );

      const progressCalc = await pool.query(
        `WITH 
        total_content AS (
          SELECT COUNT(sc.id) as total
          FROM course_goals cg
          JOIN course_modules cm ON cm.goal_id = cg.id
          JOIN course_topics ct ON ct.module_id = cm.id
          JOIN course_subtopics cs ON cs.topic_id = ct.id
          JOIN subtopic_content sc ON sc.subtopic_id = cs.id
          WHERE cg.id = $1
        ),
        completed_content AS (
          SELECT COUNT(scp.content_id) as completed
          FROM student_course_progress scp
          WHERE scp.student_id = $2 AND scp.goal_id = $1 AND scp.status = 'completed'
        )
        SELECT 
          total_content.total,
          completed_content.completed,
          CASE 
            WHEN total_content.total > 0 
            THEN ROUND((completed_content.completed::DECIMAL / total_content.total::DECIMAL) * 100)
            ELSE 0 
          END as progress_percentage
        FROM total_content, completed_content`,
        [goal_id, studentId]
      );

      if (progressCalc.rows.length > 0) {
        await pool.query(
          `UPDATE student_course_enrollments 
         SET progress_percentage = $1,
             completed_at = CASE WHEN $1 >= 100 THEN CURRENT_TIMESTAMP ELSE completed_at END,
             status = CASE WHEN $1 >= 100 THEN 'completed' ELSE status END
         WHERE student_id = $2 AND goal_id = $3`,
          [progressCalc.rows[0].progress_percentage, studentId, goal_id]
        );
      }

      res.json({
        success: true,
        message: "Content marked as completed",
        progress: progressCalc.rows[0]?.progress_percentage || 0,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Secure Content Serving - FIXED SQL syntax error
app.get(
  "/api/content/:contentUuid",
  authenticate,
  verifyContentAccess,
  async (req, res) => {
    try {
      const content = req.content;
      const studentId = req.student.id;

      const enrollment = await pool.query(
        `SELECT sce.* FROM student_course_enrollments sce
         JOIN course_goals cg ON sce.goal_id = cg.id
         JOIN course_modules cm ON cm.goal_id = cg.id
         JOIN course_topics ct ON ct.module_id = cm.id
         JOIN course_subtopics cs ON cs.topic_id = ct.id
         JOIN subtopic_content sc ON sc.subtopic_id = cs.id
         WHERE sce.student_id = $1 AND sc.content_uuid = $2`,
        [studentId, req.params.contentUuid]
      );

      if (enrollment.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: "You are not enrolled in this course",
        });
      }

      const baseUrl = process.env.BACKEND_URL || "http://localhost:5002";

      // Get goal_id and other IDs from the enrollment - FIXED query
      const goalResult = await pool.query(
        `SELECT cg.id as goal_id, cm.id as module_id, ct.id as topic_id, cs.id as subtopic_id
         FROM student_course_enrollments sce
         JOIN course_goals cg ON sce.goal_id = cg.id
         JOIN course_modules cm ON cm.goal_id = cg.id
         JOIN course_topics ct ON ct.module_id = cm.id
         JOIN course_subtopics cs ON cs.topic_id = ct.id
         JOIN subtopic_content sc ON sc.subtopic_id = cs.id
         WHERE sce.student_id = $1 AND sc.content_uuid = $2`,
        [studentId, req.params.contentUuid]
      );

      const goalId = goalResult.rows[0]?.goal_id || null;
      const moduleId = goalResult.rows[0]?.module_id || null;
      const topicId = goalResult.rows[0]?.topic_id || null;
      const subtopicId = goalResult.rows[0]?.subtopic_id || null;

      // In the video section of the response
      if (content.content_type === "video") {
        res.json({
          success: true,
          data: {
            id: content.id,
            type: "video",
            content_type: "video",
            content_uuid: content.content_uuid,
            video_title: content.video_title,
            video_description: content.video_description,
            video_duration: content.video_duration,
            video_url: `${baseUrl}/api/content/${content.content_uuid}/stream?token=${content.access_token}`,
            thumbnail_url: content.thumbnail_url,
            slides_id: content.slides_id,
            learning_objectives: content.learning_objectives || [],
            resources: content.resources || [],
            goal_id: goalId,
            module_id: moduleId,
            topic_id: topicId,
            subtopic_id: subtopicId,
          },
        });
      } else if (content.content_type === "cheatsheet") {
        res.json({
          success: true,
          data: {
            id: content.id,
            type: "cheatsheet",
            content_type: "cheatsheet",
            content_uuid: content.content_uuid,
            cheatsheet_title: content.cheatsheet_title,
            cheatsheet_content: content.cheatsheet_content,
            file_url: content.file_url,
            key_takeaways: content.key_takeaways || [],
            table_of_contents: content.table_of_contents || [],
            goal_id: goalId,
            module_id: moduleId,
            topic_id: topicId,
            subtopic_id: subtopicId,
          },
        });
      } else if (content.content_type === "mcq") {
        res.json({
          success: true,
          data: {
            id: content.id,
            type: "mcq",
            content_type: "mcq",
            content_uuid: content.content_uuid,
            mcq_title: content.mcq_title,
            questions: content.questions || [],
            time_limit: content.time_limit,
            passing_score: content.passing_score || 70,
            goal_id: goalId,
            module_id: moduleId,
            topic_id: topicId,
            subtopic_id: subtopicId,
          },
        });
      } else {
        res.json({
          success: true,
          data: {
            id: content.id,
            type: content.content_type,
            content_type: content.content_type,
            content_uuid: content.content_uuid,
            goal_id: goalId,
            module_id: moduleId,
            topic_id: topicId,
            subtopic_id: subtopicId,
          },
        });
      }
    } catch (e) {
      console.error("Error fetching content by UUID:", e);
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Video Stream
app.get("/api/content/:contentUuid/stream", verifyContentAccess, (req, res) => {
  try {
    const content = req.content;

    if (content.content_type !== "video") {
      return res.status(400).json({
        success: false,
        message: "This content is not a video",
      });
    }

    const videoPath = path.join(__dirname, content.video_url);

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
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

// Progress Stats Endpoint
app.get(
  "/api/student/courses/progress/overall",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;

      const progressResult = await pool.query(
        `SELECT 
                COUNT(DISTINCT sce.goal_id) as enrolled_courses,
                COUNT(DISTINCT scp.content_id) as completed_content,
                COUNT(DISTINCT scp.goal_id) as courses_with_progress,
                ROUND(AVG(sce.progress_percentage), 2) as avg_progress
             FROM student_course_enrollments sce
             LEFT JOIN student_course_progress scp ON sce.student_id = scp.student_id AND sce.goal_id = scp.goal_id
             WHERE sce.student_id = $1`,
        [studentId]
      );

      res.json({
        success: true,
        data: progressResult.rows[0],
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Get ALL goals with complete structure for student portal
app.get(
  "/api/student/courses/all-structure",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;

      const goalsResult = await pool.query(
        `SELECT cg.*, 
                sce.enrolled_at, 
                sce.progress_percentage,
                sce.status as enrollment_status,
                CASE WHEN sce.id IS NOT NULL THEN true ELSE false END as is_enrolled
         FROM course_goals cg 
         LEFT JOIN student_course_enrollments sce ON cg.id = sce.goal_id AND sce.student_id = $1
         WHERE cg.is_active = true
         ORDER BY cg.order_number`,
        [studentId]
      );

      const goalsWithStructure = [];

      for (const goal of goalsResult.rows) {
        const modulesResult = await pool.query(
          `SELECT 
            cm.*,
            (
              SELECT json_agg(
                json_build_object(
                  'id', ct.id,
                  'name', ct.name,
                  'description', ct.description,
                  'order_number', ct.order_number,
                  'subtopics', (
                    SELECT json_agg(
                      json_build_object(
                        'id', cs.id,
                        'name', cs.name,
                        'description', cs.description,
                        'order_number', cs.order_number,
                        'content', (
                          SELECT json_agg(
                            json_build_object(
                              'id', sc.id,
                              'content_type', sc.content_type,
                              'content_uuid', sc.content_uuid,
                              'video_title', sc.video_title,
                              'video_description', sc.video_description,
                              'video_duration', sc.video_duration,
                              'video_url', sc.video_url,
                              'thumbnail_url', sc.thumbnail_url,
                              'slides_id', sc.slides_id, // Changed from slides_url
                              'cheatsheet_title', sc.cheatsheet_title,
                              'cheatsheet_content', sc.cheatsheet_content,
                              'file_url', sc.file_url,
                              'mcq_title', sc.mcq_title,
                              'questions', sc.questions,
                              'learning_objectives', sc.learning_objectives,
                              'resources', sc.resources,
                              'key_takeaways', sc.key_takeaways,
                              'table_of_contents', sc.table_of_contents,
                              'time_limit', sc.time_limit,
                              'passing_score', sc.passing_score,
                              'progress_status', scp.status,
                              'completed_at', scp.completed_at,
                              'quiz_score', scp.quiz_score,
                              'is_completed', CASE WHEN scp.id IS NOT NULL THEN true ELSE false END
                            ) ORDER BY sc.id
                          ) FROM subtopic_content sc
                          LEFT JOIN student_course_progress scp ON sc.id = scp.content_id AND scp.student_id = $1
                          WHERE sc.subtopic_id = cs.id
                        )
                      ) ORDER BY cs.order_number
                    ) FROM course_subtopics cs WHERE cs.topic_id = ct.id
                  )
                ) ORDER BY ct.order_number
              ) FROM course_topics ct WHERE ct.module_id = cm.id
            ) as topics
          FROM course_modules cm 
          WHERE cm.goal_id = $2 
          ORDER BY cm.order_number`,
          [studentId, goal.id]
        );

        let totalContent = 0;
        let completedContent = 0;

        modulesResult.rows.forEach((module) => {
          if (module.topics) {
            module.topics.forEach((topic) => {
              if (topic.subtopics) {
                topic.subtopics.forEach((subtopic) => {
                  if (subtopic.content) {
                    totalContent += subtopic.content.length;
                    completedContent += subtopic.content.filter(
                      (c) => c.is_completed
                    ).length;
                  }
                });
              }
            });
          }
        });

        const progressPercentage =
          totalContent > 0
            ? Math.round((completedContent / totalContent) * 100)
            : 0;

        goalsWithStructure.push({
          ...goal,
          modules: modulesResult.rows,
          stats: {
            total_content: totalContent,
            completed_content: completedContent,
            progress_percentage: progressPercentage,
          },
        });
      }

      res.json({
        success: true,
        data: goalsWithStructure,
      });
    } catch (e) {
      console.error("Error fetching all courses structure:", e);
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Get student progress for a specific content
app.get(
  "/api/student/courses/content/:contentId/progress",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;
      const { contentId } = req.params;

      const result = await pool.query(
        `SELECT * FROM student_course_progress 
       WHERE student_id = $1 AND content_id = $2`,
        [studentId, contentId]
      );

      res.json({
        success: true,
        data: result.rows[0] || { status: "pending", is_completed: false },
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Get all completed content IDs for a student
app.get(
  "/api/student/courses/completed-content",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;

      const result = await pool.query(
        `SELECT content_id, completed_at, quiz_score 
       FROM student_course_progress 
       WHERE student_id = $1 AND status = 'completed'
       ORDER BY completed_at DESC`,
        [studentId]
      );

      res.json({
        success: true,
        data: result.rows,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Get goal progress
app.get(
  "/api/student/courses/progress/goal/:goalId",
  authenticate,
  async (req, res) => {
    try {
      const studentId = req.student.id;
      const { goalId } = req.params;

      const result = await pool.query(
        `SELECT 
         sce.progress_percentage,
         sce.status,
         sce.completed_at,
         COUNT(DISTINCT scp.content_id) as completed_content,
         (SELECT COUNT(*) FROM subtopic_content sc
          JOIN course_subtopics cs ON sc.subtopic_id = cs.id
          JOIN course_topics ct ON cs.topic_id = ct.id
          JOIN course_modules cm ON ct.module_id = cm.id
          WHERE cm.goal_id = $1) as total_content
       FROM student_course_enrollments sce
       LEFT JOIN student_course_progress scp ON sce.student_id = scp.student_id AND sce.goal_id = scp.goal_id
       WHERE sce.student_id = $2 AND sce.goal_id = $1
       GROUP BY sce.progress_percentage, sce.status, sce.completed_at`,
        [goalId, studentId]
      );

      res.json({
        success: true,
        data: result.rows[0] || { progress_percentage: 0 },
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e.message,
      });
    }
  }
);

// Get dashboard stats
app.get("/api/student/dashboard/stats", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;

    const stats = await pool.query(
      `SELECT 
          COUNT(DISTINCT sce.goal_id) as enrolled_courses,
          COUNT(DISTINCT CASE WHEN sce.progress_percentage = 100 THEN sce.goal_id END) as completed_courses,
          COUNT(DISTINCT scp.content_id) as completed_lessons,
          ROUND(AVG(sce.progress_percentage), 2) as average_progress,
          (SELECT COUNT(*) FROM subtopic_content) as total_lessons_available
        FROM student_course_enrollments sce
        LEFT JOIN student_course_progress scp ON sce.student_id = scp.student_id AND sce.goal_id = scp.goal_id
        WHERE sce.student_id = $1`,
      [studentId]
    );

    const recentActivity = await pool.query(
      `SELECT 
          scp.completed_at,
          cg.name as course_name,
          COALESCE(sc.video_title, sc.cheatsheet_title, sc.mcq_title) as content_title,
          sc.content_type
        FROM student_course_progress scp
        JOIN course_goals cg ON scp.goal_id = cg.id
        JOIN subtopic_content sc ON scp.content_id = sc.id
        WHERE scp.student_id = $1
        ORDER BY scp.completed_at DESC
        LIMIT 10`,
      [studentId]
    );

    res.json({
      success: true,
      data: {
        stats: stats.rows[0],
        recent_activity: recentActivity.rows,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
});

// -------------------------------------------
// ADMIN REORDER ENDPOINTS
// -------------------------------------------

app.post("/api/admin/course/goals/reorder", async (req, res) => {
  try {
    const { orderedIds } = req.body;

    for (let i = 0; i < orderedIds.length; i++) {
      await pool.query(
        "UPDATE course_goals SET order_number = $1 WHERE id = $2",
        [i, orderedIds[i]]
      );
    }

    res.json({ success: true, message: "Goals reordered successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/api/admin/course/modules/reorder", async (req, res) => {
  try {
    const { goalId, orderedIds } = req.body;

    for (let i = 0; i < orderedIds.length; i++) {
      await pool.query(
        "UPDATE course_modules SET order_number = $1 WHERE id = $2 AND goal_id = $3",
        [i, orderedIds[i], goalId]
      );
    }

    res.json({ success: true, message: "Modules reordered successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/api/admin/course/topics/reorder", async (req, res) => {
  try {
    const { moduleId, orderedIds } = req.body;

    for (let i = 0; i < orderedIds.length; i++) {
      await pool.query(
        "UPDATE course_topics SET order_number = $1 WHERE id = $2 AND module_id = $3",
        [i, orderedIds[i], moduleId]
      );
    }

    res.json({ success: true, message: "Topics reordered successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/api/admin/course/subtopics/reorder", async (req, res) => {
  try {
    const { topicId, orderedIds } = req.body;

    for (let i = 0; i < orderedIds.length; i++) {
      await pool.query(
        "UPDATE course_subtopics SET order_number = $1 WHERE id = $2 AND topic_id = $3",
        [i, orderedIds[i], topicId]
      );
    }

    res.json({ success: true, message: "Subtopics reordered successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// -------------------------------------------
// Health Check
// -------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Digital Marketing API is running",
    timestamp: new Date().toISOString(),
  });
});

// Export
module.exports = {
  router: app,
  createDigitalMarketingTables: createTables,
};
