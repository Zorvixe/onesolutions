PS C:\Users\ekmgb\Desktop\Projects\ose> node javaProgrammingRoutes.js
[dotenv@17.3.1] injecting env (6) from .env -- tip: ⚡️ secrets for agents: https://dotenvx.com/as2
❌ Error creating Java tables: Error: read ECONNRESET
    at C:\Users\ekmgb\Desktop\Projects\ose\node_modules\pg-pool\index.js:45:11
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async createJavaTables (C:\Users\ekmgb\Desktop\Projects\ose\javaProgrammingRoutes.js:73:5) {
  errno: -4077,
  code: 'ECONNRESET',
  syscall: 'read'
}
PS C:\Users\ekmgb\Desktop\Projects\ose> 

// javaProgrammingRoutes.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");

// ----------------------------------------------------------------------
// Database connection (reuse your existing pool or create a new one)
// ----------------------------------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "1000mb" }));
app.use(express.urlencoded({ limit: "1000mb", extended: true }));
// ----------------------------------------------------------------------
// Authentication middleware (assumes you have JWT_SECRET in env)
// ----------------------------------------------------------------------
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    req.student = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ----------------------------------------------------------------------
// Multer configuration for video uploads (if needed)
// ----------------------------------------------------------------------
const UPLOAD_BASE_PATH = process.env.JAVA_UPLOAD_PATH || path.join(__dirname, "uploads_java");
const videosDir = path.join(UPLOAD_BASE_PATH, "videos");

if (!fs.existsSync(UPLOAD_BASE_PATH)) fs.mkdirSync(UPLOAD_BASE_PATH, { recursive: true });
if (!fs.existsSync(videosDir)) fs.mkdirSync(videosDir, { recursive: true });

const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, videosDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "video-" + unique + path.extname(file.originalname));
  },
});
const videoUpload = multer({
  storage: videoStorage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files are allowed"));
  },
}).single("video");

// ----------------------------------------------------------------------
// Database table creation
// ----------------------------------------------------------------------
const createJavaTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_goals (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        duration_months INTEGER DEFAULT 2,
        certificate_name VARCHAR(255),
        order_number INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_modules (
        id SERIAL PRIMARY KEY,
        goal_id INTEGER REFERENCES java_goals(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        order_number INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_topics (
        id SERIAL PRIMARY KEY,
        module_id INTEGER REFERENCES java_modules(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        order_number INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_subtopics (
        id SERIAL PRIMARY KEY,
        topic_id INTEGER REFERENCES java_topics(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        order_number INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_content (
        id SERIAL PRIMARY KEY,
        subtopic_id INTEGER REFERENCES java_subtopics(id) ON DELETE CASCADE,
        content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('video', 'cheatsheet', 'mcq', 'coding')),
        content_uuid UUID DEFAULT gen_random_uuid(),
        access_token UUID DEFAULT gen_random_uuid(),
        order_number INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        -- Video specific
        video_title VARCHAR(500),
        video_url VARCHAR(1000),
        video_description TEXT,
        video_duration INTEGER,
        thumbnail_url VARCHAR(1000),
        slides_id VARCHAR(255),

        -- Cheatsheet specific
        cheatsheet_title VARCHAR(500),
        cheatsheet_content TEXT,
        file_url VARCHAR(1000),

        -- MCQ specific
        mcq_title VARCHAR(500),
        questions JSONB DEFAULT '[]',
        time_limit INTEGER,
        passing_score INTEGER DEFAULT 70,

        -- Coding specific
        coding_title VARCHAR(500),
        coding_description TEXT,
        starter_code TEXT,
        coding_time_limit INTEGER,
        coding_memory_limit INTEGER
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_test_cases (
        id SERIAL PRIMARY KEY,
        content_id INTEGER REFERENCES java_content(id) ON DELETE CASCADE,
        input TEXT NOT NULL,
        expected_output TEXT NOT NULL,
        is_sample BOOLEAN DEFAULT false,
        order_number INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_enrollments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL,
        goal_id INTEGER REFERENCES java_goals(id) ON DELETE CASCADE,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_at TIMESTAMP,
        status VARCHAR(50) DEFAULT 'active',
        progress_percentage INTEGER DEFAULT 0,
        UNIQUE(student_id, goal_id)
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS java_progress (
        id SERIAL PRIMARY KEY,
        student_id INTEGER NOT NULL,
        goal_id INTEGER,
        content_id INTEGER REFERENCES java_content(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'completed',
        quiz_score INTEGER,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, content_id)
      )
    `);

    console.log("✅ Java Programming tables created/verified");
  } catch (err) {
    console.error("❌ Error creating Java tables:", err);
  }
};


// ----------------------------------------------------------------------
// Helper: get goal ID for a content item
// ----------------------------------------------------------------------
const getGoalIdForContent = async (contentId) => {
  const result = await pool.query(
    `SELECT jg.id as goal_id
     FROM java_content jc
     JOIN java_subtopics js ON jc.subtopic_id = js.id
     JOIN java_topics jt ON js.topic_id = jt.id
     JOIN java_modules jm ON jt.module_id = jm.id
     JOIN java_goals jg ON jm.goal_id = jg.id
     WHERE jc.id = $1`,
    [contentId]
  );
  return result.rows[0]?.goal_id;
};

// ----------------------------------------------------------------------
// ADMIN ROUTES
// ----------------------------------------------------------------------

// ---------- Goals ----------
app.get("/admin/java/goals", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM java_goals ORDER BY order_number");
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/admin/java/goals", async (req, res) => {
  try {
    const { name, description, duration_months, certificate_name } = req.body;
    const result = await pool.query(
      `INSERT INTO java_goals (name, description, duration_months, certificate_name, order_number)
       VALUES ($1, $2, $3, $4, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM java_goals))
       RETURNING *`,
      [name, description, duration_months, certificate_name]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.put("/admin/java/goals/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;
    const { name, description, duration_months, certificate_name } = req.body;
    const result = await pool.query(
      `UPDATE java_goals SET name = COALESCE($1, name),
                             description = COALESCE($2, description),
                             duration_months = COALESCE($3, duration_months),
                             certificate_name = COALESCE($4, certificate_name)
       WHERE id = $5 RETURNING *`,
      [name, description, duration_months, certificate_name, goalId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Goal not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/admin/java/goals/:goalId", async (req, res) => {
  const { goalId } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("DELETE FROM java_goals WHERE id = $1 RETURNING *", [goalId]);
    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, message: "Goal not found" });
    }
    await client.query("COMMIT");
    res.json({ success: true, message: "Goal deleted" });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: e.message });
  } finally {
    client.release();
  }
});

// ---------- Modules ----------
app.get("/admin/java/goals/:goalId/modules", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM java_modules WHERE goal_id = $1 ORDER BY order_number",
      [req.params.goalId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/admin/java/modules", async (req, res) => {
  try {
    const { goal_id, name, description } = req.body;
    const result = await pool.query(
      `INSERT INTO java_modules (goal_id, name, description, order_number)
       VALUES ($1, $2, $3, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM java_modules WHERE goal_id = $1))
       RETURNING *`,
      [goal_id, name, description]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.put("/admin/java/modules/:moduleId", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(
      `UPDATE java_modules SET name = COALESCE($1, name), description = COALESCE($2, description)
       WHERE id = $3 RETURNING *`,
      [name, description, moduleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Module not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/admin/java/modules/:moduleId", async (req, res) => {
  const { moduleId } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("DELETE FROM java_modules WHERE id = $1 RETURNING *", [moduleId]);
    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, message: "Module not found" });
    }
    await client.query("COMMIT");
    res.json({ success: true, message: "Module deleted" });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: e.message });
  } finally {
    client.release();
  }
});

// ---------- Topics ----------
app.get("/admin/java/modules/:moduleId/topics", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM java_topics WHERE module_id = $1 ORDER BY order_number",
      [req.params.moduleId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/admin/java/topics", async (req, res) => {
  try {
    const { module_id, name, description } = req.body;
    const result = await pool.query(
      `INSERT INTO java_topics (module_id, name, description, order_number)
       VALUES ($1, $2, $3, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM java_topics WHERE module_id = $1))
       RETURNING *`,
      [module_id, name, description]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.put("/admin/java/topics/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(
      `UPDATE java_topics SET name = COALESCE($1, name), description = COALESCE($2, description)
       WHERE id = $3 RETURNING *`,
      [name, description, topicId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Topic not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/admin/java/topics/:topicId", async (req, res) => {
  const { topicId } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("DELETE FROM java_topics WHERE id = $1 RETURNING *", [topicId]);
    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, message: "Topic not found" });
    }
    await client.query("COMMIT");
    res.json({ success: true, message: "Topic deleted" });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: e.message });
  } finally {
    client.release();
  }
});

// ---------- Subtopics ----------
app.get("/admin/java/topics/:topicId/subtopics", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM java_subtopics WHERE topic_id = $1 ORDER BY order_number",
      [req.params.topicId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post("/admin/java/subtopics", async (req, res) => {
  try {
    const { topic_id, name, description } = req.body;
    const result = await pool.query(
      `INSERT INTO java_subtopics (topic_id, name, description, order_number)
       VALUES ($1, $2, $3, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM java_subtopics WHERE topic_id = $1))
       RETURNING *`,
      [topic_id, name, description]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.put("/admin/java/subtopics/:subtopicId", async (req, res) => {
  try {
    const { subtopicId } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(
      `UPDATE java_subtopics SET name = COALESCE($1, name), description = COALESCE($2, description)
       WHERE id = $3 RETURNING *`,
      [name, description, subtopicId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Subtopic not found" });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.delete("/admin/java/subtopics/:subtopicId", async (req, res) => {
  const { subtopicId } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query("DELETE FROM java_subtopics WHERE id = $1 RETURNING *", [subtopicId]);
    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, message: "Subtopic not found" });
    }
    await client.query("COMMIT");
    res.json({ success: true, message: "Subtopic deleted" });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ success: false, error: e.message });
  } finally {
    client.release();
  }
});

// ---------- Content (All types) ----------
app.get("/admin/java/subtopics/:subtopicId/content", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM java_content WHERE subtopic_id = $1 ORDER BY order_number",
      [req.params.subtopicId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----- Video upload -----
app.post("/admin/java/subtopics/:subtopicId/video", authenticate, (req, res) => {
  videoUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    try {
      const { subtopicId } = req.params;
      const { title, description, duration, slides_id } = req.body;
      if (!req.file) {
        return res.status(400).json({ success: false, error: "No video file" });
      }
      if (!title) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ success: false, error: "Title required" });
      }

      const videoUrl = `/uploads_java/videos/${req.file.filename}`;
      const uuid = crypto.randomUUID();
      const token = crypto.randomUUID();

      const result = await pool.query(
        `INSERT INTO java_content (
          subtopic_id, content_type, content_uuid, access_token,
          video_title, video_description, video_duration, video_url, slides_id,
          order_number
        ) VALUES ($1, 'video', $2, $3, $4, $5, $6, $7, $8,
          (SELECT COALESCE(MAX(order_number), -1) + 1 FROM java_content WHERE subtopic_id = $1))
        RETURNING *`,
        [subtopicId, uuid, token, title, description || "", duration || 0, videoUrl, slides_id || null]
      );

      res.json({ success: true, data: result.rows[0] });
    } catch (e) {
      if (req.file) fs.unlinkSync(req.file.path);
      res.status(500).json({ success: false, error: e.message });
    }
  });
});

// ----- Cheatsheet -----
app.post("/admin/java/subtopics/:subtopicId/cheatsheet", authenticate, async (req, res) => {
  try {
    const { subtopicId } = req.params;
    const { title, content } = req.body;
    const uuid = crypto.randomUUID();
    const token = crypto.randomUUID();
    const result = await pool.query(
      `INSERT INTO java_content (
        subtopic_id, content_type, content_uuid, access_token,
        cheatsheet_title, cheatsheet_content,
        order_number
      ) VALUES ($1, 'cheatsheet', $2, $3, $4, $5,
        (SELECT COALESCE(MAX(order_number), -1) + 1 FROM java_content WHERE subtopic_id = $1))
      RETURNING *`,
      [subtopicId, uuid, token, title, content]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----- MCQ -----
app.post("/admin/java/subtopics/:subtopicId/mcq", authenticate, async (req, res) => {
  try {
    const { subtopicId } = req.params;
    const { title, questions, time_limit, passing_score } = req.body;
    const uuid = crypto.randomUUID();
    const token = crypto.randomUUID();
    const result = await pool.query(
      `INSERT INTO java_content (
        subtopic_id, content_type, content_uuid, access_token,
        mcq_title, questions, time_limit, passing_score,
        order_number
      ) VALUES ($1, 'mcq', $2, $3, $4, $5, $6, $7,
        (SELECT COALESCE(MAX(order_number), -1) + 1 FROM java_content WHERE subtopic_id = $1))
      RETURNING *`,
      [subtopicId, uuid, token, title, JSON.stringify(questions), time_limit || null, passing_score || 70]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----- Coding Problem -----
app.post("/admin/java/subtopics/:subtopicId/coding", authenticate, async (req, res) => {
  const client = await pool.connect();
  try {
    const { subtopicId } = req.params;
    const { title, description, starterCode, testCases, time_limit, memory_limit } = req.body;
    // testCases = [{ input, expectedOutput, isSample }, ...]

    await client.query("BEGIN");

    const uuid = crypto.randomUUID();
    const token = crypto.randomUUID();
    const contentResult = await client.query(
      `INSERT INTO java_content (
        subtopic_id, content_type, content_uuid, access_token,
        coding_title, coding_description, starter_code, coding_time_limit, coding_memory_limit,
        order_number
      ) VALUES ($1, 'coding', $2, $3, $4, $5, $6, $7, $8,
        (SELECT COALESCE(MAX(order_number), -1) + 1 FROM java_content WHERE subtopic_id = $1))
      RETURNING *`,
      [subtopicId, uuid, token, title, description, starterCode, time_limit, memory_limit]
    );
    const contentId = contentResult.rows[0].id;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      await client.query(
        `INSERT INTO java_test_cases (content_id, input, expected_output, is_sample, order_number)
         VALUES ($1, $2, $3, $4, $5)`,
        [contentId, tc.input, tc.expectedOutput, tc.isSample || false, i]
      );
    }

    await client.query("COMMIT");
    res.json({ success: true, data: contentResult.rows[0] });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Create coding problem error:", e);
    res.status(500).json({ success: false, error: e.message });
  } finally {
    client.release();
  }
});


// ----- Update content (any type) -----
app.put("/admin/java/content/:contentId", authenticate, async (req, res) => {
  const client = await pool.connect();
  try {
    const { contentId } = req.params;
    const {
      content_type,
      // video
      video_title, video_description, video_duration, slides_id,
      // cheatsheet
      cheatsheet_title, cheatsheet_content,
      // mcq
      mcq_title, questions, time_limit, passing_score,
      // coding
      coding_title, coding_description, starter_code, coding_time_limit, coding_memory_limit, testCases
    } = req.body;

    await client.query("BEGIN");

    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (content_type === 'video') {
      if (video_title !== undefined) { updates.push(`video_title = $${paramIndex++}`); values.push(video_title); }
      if (video_description !== undefined) { updates.push(`video_description = $${paramIndex++}`); values.push(video_description); }
      if (video_duration !== undefined) { updates.push(`video_duration = $${paramIndex++}`); values.push(video_duration); }
      if (slides_id !== undefined) { updates.push(`slides_id = $${paramIndex++}`); values.push(slides_id); }
    } else if (content_type === 'cheatsheet') {
      if (cheatsheet_title !== undefined) { updates.push(`cheatsheet_title = $${paramIndex++}`); values.push(cheatsheet_title); }
      if (cheatsheet_content !== undefined) { updates.push(`cheatsheet_content = $${paramIndex++}`); values.push(cheatsheet_content); }
    } else if (content_type === 'mcq') {
      if (mcq_title !== undefined) { updates.push(`mcq_title = $${paramIndex++}`); values.push(mcq_title); }
      if (questions !== undefined) { updates.push(`questions = $${paramIndex++}`); values.push(JSON.stringify(questions)); }
      if (time_limit !== undefined) { updates.push(`time_limit = $${paramIndex++}`); values.push(time_limit); }
      if (passing_score !== undefined) { updates.push(`passing_score = $${paramIndex++}`); values.push(passing_score); }
    } else if (content_type === 'coding') {
      if (coding_title !== undefined) { updates.push(`coding_title = $${paramIndex++}`); values.push(coding_title); }
      if (coding_description !== undefined) { updates.push(`coding_description = $${paramIndex++}`); values.push(coding_description); }
      if (starter_code !== undefined) { updates.push(`starter_code = $${paramIndex++}`); values.push(starter_code); }
      if (coding_time_limit !== undefined) { updates.push(`coding_time_limit = $${paramIndex++}`); values.push(coding_time_limit); }
      if (coding_memory_limit !== undefined) { updates.push(`coding_memory_limit = $${paramIndex++}`); values.push(coding_memory_limit); }

      // Replace test cases: delete old, insert new
      await client.query("DELETE FROM java_test_cases WHERE content_id = $1", [contentId]);
      if (testCases && Array.isArray(testCases)) {
        for (let i = 0; i < testCases.length; i++) {
          const tc = testCases[i];
          await client.query(
            `INSERT INTO java_test_cases (content_id, input, expected_output, is_sample, order_number)
             VALUES ($1, $2, $3, $4, $5)`,
            [contentId, tc.input, tc.expectedOutput, tc.isSample || false, i]
          );
        }
      }
    }

    if (updates.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    const query = `UPDATE java_content SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;
    values.push(contentId);
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    await client.query("COMMIT");
    res.json({ success: true, data: result.rows[0] });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("Update content error:", e);
    res.status(500).json({ success: false, error: e.message });
  } finally {
    client.release();
  }
});

// ----- Delete content -----
app.delete("/admin/java/content/:contentId", authenticate, async (req, res) => {
  try {
    const { contentId } = req.params;
    const result = await pool.query("DELETE FROM java_content WHERE id = $1 RETURNING *", [contentId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }
    res.json({ success: true, message: "Content deleted" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----- Reorder content -----
app.post("/admin/java/content/reorder", authenticate, async (req, res) => {
  try {
    const { subtopicId, orderedIds } = req.body;
    await pool.query("BEGIN");
    for (let i = 0; i < orderedIds.length; i++) {
      await pool.query(
        "UPDATE java_content SET order_number = $1 WHERE id = $2 AND subtopic_id = $3",
        [i, orderedIds[i], subtopicId]
      );
    }
    await pool.query("COMMIT");
    res.json({ success: true, message: "Content reordered" });
  } catch (e) {
    await pool.query("ROLLBACK");
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----------------------------------------------------------------------
// STUDENT ROUTES
// ----------------------------------------------------------------------

// Get all goals with enrollment status
app.get("/student/java/courses", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const result = await pool.query(
      `SELECT jg.*, je.enrolled_at, je.progress_percentage,
              CASE WHEN je.id IS NOT NULL THEN true ELSE false END as is_enrolled
       FROM java_goals jg
       LEFT JOIN java_enrollments je ON jg.id = je.goal_id AND je.student_id = $1
       WHERE jg.is_active = true
       ORDER BY jg.order_number`,
      [studentId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Enroll in a goal
app.post("/student/java/courses/enroll/:goalId", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const goalId = req.params.goalId;
    await pool.query(
      `INSERT INTO java_enrollments (student_id, goal_id)
       VALUES ($1, $2)
       ON CONFLICT (student_id, goal_id) DO NOTHING`,
      [studentId, goalId]
    );
    res.json({ success: true, message: "Enrolled successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Get full structure of all goals (with progress)
app.get("/student/java/courses/all-structure", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const goalsResult = await pool.query(
      `SELECT jg.*, je.enrolled_at, je.progress_percentage, je.status as enrollment_status,
              CASE WHEN je.id IS NOT NULL THEN true ELSE false END as is_enrolled
       FROM java_goals jg
       LEFT JOIN java_enrollments je ON jg.id = je.goal_id AND je.student_id = $1
       WHERE jg.is_active = true
       ORDER BY jg.order_number`,
      [studentId]
    );

    const goalsWithStructure = [];
    for (const goal of goalsResult.rows) {
      const modulesResult = await pool.query(
        `SELECT jm.id, jm.name, jm.description, jm.order_number,
                COALESCE(
                  (SELECT json_agg(
                    json_build_object(
                      'id', jt.id,
                      'name', jt.name,
                      'description', jt.description,
                      'order_number', jt.order_number,
                      'subtopics', COALESCE(
                        (SELECT json_agg(
                          json_build_object(
                            'id', js.id,
                            'name', js.name,
                            'description', js.description,
                            'order_number', js.order_number,
                            'content', COALESCE(
                              (SELECT json_agg(
                                json_build_object(
                                  'id', jc.id,
                                  'content_type', jc.content_type,
                                  'content_uuid', jc.content_uuid,
                                  'video_title', jc.video_title,
                                  'cheatsheet_title', jc.cheatsheet_title,
                                  'mcq_title', jc.mcq_title,
                                  'coding_title', jc.coding_title,
                                  'is_completed', CASE WHEN jp.id IS NOT NULL THEN true ELSE false END
                                ) ORDER BY jc.order_number
                              ) FROM java_content jc
                              LEFT JOIN java_progress jp ON jc.id = jp.content_id AND jp.student_id = $1
                              WHERE jc.subtopic_id = js.id
                              ), '[]'::json
                            )
                          ) ORDER BY js.order_number
                        ) FROM java_subtopics js WHERE js.topic_id = jt.id
                        ), '[]'::json
                      )
                    ) ORDER BY jt.order_number
                  ) FROM java_topics jt WHERE jt.module_id = jm.id
                ), '[]'::json) as topics
         FROM java_modules jm
         WHERE jm.goal_id = $2
         ORDER BY jm.order_number`,
        [studentId, goal.id]
      );

      // Calculate progress for the goal
      let total = 0, completed = 0;
      for (const mod of modulesResult.rows) {
        if (mod.topics) {
          for (const topic of mod.topics) {
            if (topic.subtopics) {
              for (const sub of topic.subtopics) {
                if (sub.content) {
                  total += sub.content.length;
                  completed += sub.content.filter(c => c.is_completed).length;
                }
              }
            }
          }
        }
      }
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

      goalsWithStructure.push({
        ...goal,
        modules: modulesResult.rows,
        stats: {
          total_content: total,
          completed_content: completed,
          progress_percentage: progress,
        },
      });
    }

    res.json({ success: true, data: goalsWithStructure });
  } catch (e) {
    console.error("Error fetching all Java structure:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});

// Get content by UUID (with sample test cases for coding)
app.get("/student/java/content/:contentUuid", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { contentUuid } = req.params;

    // Verify enrollment
    const enrollmentCheck = await pool.query(
      `SELECT je.* FROM java_enrollments je
       JOIN java_goals jg ON je.goal_id = jg.id
       JOIN java_modules jm ON jg.id = jm.goal_id
       JOIN java_topics jt ON jm.id = jt.module_id
       JOIN java_subtopics js ON jt.id = js.topic_id
       JOIN java_content jc ON js.id = jc.subtopic_id
       WHERE je.student_id = $1 AND jc.content_uuid = $2`,
      [studentId, contentUuid]
    );
    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).json({ success: false, message: "Not enrolled in this course" });
    }

    const contentResult = await pool.query(
      `SELECT jc.*, js.id as subtopic_id, jt.id as topic_id, jm.id as module_id, jg.id as goal_id
       FROM java_content jc
       JOIN java_subtopics js ON jc.subtopic_id = js.id
       JOIN java_topics jt ON js.topic_id = jt.id
       JOIN java_modules jm ON jt.module_id = jm.id
       JOIN java_goals jg ON jm.goal_id = jg.id
       WHERE jc.content_uuid = $1`,
      [contentUuid]
    );
    if (contentResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }
    const content = contentResult.rows[0];

    const baseUrl = process.env.BACKEND_URL || "http://localhost:5002";
    let responseData = {
      id: content.id,
      content_type: content.content_type,
      content_uuid: content.content_uuid,
      goal_id: content.goal_id,
      module_id: content.module_id,
      topic_id: content.topic_id,
      subtopic_id: content.subtopic_id,
    };

    if (content.content_type === 'video') {
      responseData = {
        ...responseData,
        video_title: content.video_title,
        video_description: content.video_description,
        video_duration: content.video_duration,
        video_url: `${baseUrl}/api/java/content/${content.content_uuid}/stream?token=${content.access_token}`,
        thumbnail_url: content.thumbnail_url,
        slides_id: content.slides_id,
      };
    } else if (content.content_type === 'cheatsheet') {
      responseData = {
        ...responseData,
        cheatsheet_title: content.cheatsheet_title,
        cheatsheet_content: content.cheatsheet_content,
        file_url: content.file_url,
      };
    } else if (content.content_type === 'mcq') {
      responseData = {
        ...responseData,
        mcq_title: content.mcq_title,
        questions: content.questions || [],
        time_limit: content.time_limit,
        passing_score: content.passing_score,
      };
    } else if (content.content_type === 'coding') {
      // Fetch ONLY sample test cases
      const sampleTestCases = await pool.query(
        `SELECT input, expected_output FROM java_test_cases
         WHERE content_id = $1 AND is_sample = true ORDER BY order_number`,
        [content.id]
      );
      responseData = {
        ...responseData,
        coding_title: content.coding_title,
        coding_description: content.coding_description,
        starter_code: content.starter_code,
        coding_time_limit: content.coding_time_limit,
        coding_memory_limit: content.coding_memory_limit,
        sample_test_cases: sampleTestCases.rows,
      };
    }

    res.json({ success: true, data: responseData });
  } catch (e) {
    console.error("Error fetching Java content:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});
app.post("/student/java/content/:contentId/complete", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { contentId } = req.params;
    const { quiz_score } = req.body;

    const goalId = await getGoalIdForContent(contentId);

    await pool.query(
      `INSERT INTO java_progress (student_id, goal_id, content_id, quiz_score)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (student_id, content_id)
       DO UPDATE SET quiz_score = $4`,
      [studentId, goalId, contentId, quiz_score || null]
    );

    res.json({
      success: true,
      message: "Content marked as completed",
    });

  } catch (error) {
    console.error("Complete content error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
app.post("/student/java/coding/run", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { contentId, code } = req.body;

    // Verify enrollment (optional, but good)
    const enrollmentCheck = await pool.query(
      `SELECT 1 FROM java_enrollments je
       JOIN java_goals jg ON je.goal_id = jg.id
       JOIN java_modules jm ON jg.id = jm.goal_id
       JOIN java_topics jt ON jm.id = jt.module_id
       JOIN java_subtopics js ON jt.id = js.topic_id
       JOIN java_content jc ON js.id = jc.subtopic_id
       WHERE je.student_id = $1 AND jc.id = $2`,
      [studentId, contentId]
    );
    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).json({ success: false, message: "Not enrolled" });
    }

    // Fetch sample test cases only
    const testCases = await pool.query(
      `SELECT id, input, expected_output FROM java_test_cases
       WHERE content_id = $1 AND is_sample = true ORDER BY order_number`,
      [contentId]
    );

    if (testCases.rows.length === 0) {
      return res.json({ success: true, results: [], message: "No sample test cases" });
    }

    // ---- Placeholder for actual code execution ----
    // Replace with real sandbox execution.
    const results = testCases.rows.map(tc => ({
      testCaseId: tc.id,
      input: tc.input,
      expected: tc.expected_output,
      output: "Simulated output", // In real implementation, run the code with tc.input
      passed: true, // Simulate all pass for now
    }));

    res.json({ success: true, results });
  } catch (e) {
    console.error("Run error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});

// Stream video
app.get("/api/java/content/:contentUuid/stream", authenticate, async (req, res) => {
  try {
    const { contentUuid } = req.params;
    const token = req.query.token;
    const contentResult = await pool.query(
      "SELECT * FROM java_content WHERE content_uuid = $1 AND access_token = $2",
      [contentUuid, token]
    );
    if (contentResult.rows.length === 0) {
      return res.status(403).json({ success: false, message: "Invalid access" });
    }
    const content = contentResult.rows[0];
    if (content.content_type !== 'video') {
      return res.status(400).json({ success: false, message: "Not a video" });
    }

    const filename = content.video_url.replace('/uploads_java/videos/', '');
    const videoPath = path.join(UPLOAD_BASE_PATH, 'videos', filename);
    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ success: false, message: "Video file not found" });
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
      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (e) {
    console.error("Stream error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----- Progress marking for video/cheatsheet/mcq -----
app.post("/student/java/content/complete", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { contentId, goalId, quizScore } = req.body;

    if (!contentId || !goalId) {
      return res.status(400).json({ success: false, message: "Content ID and Goal ID required" });
    }

    await pool.query(
      `INSERT INTO java_progress (student_id, goal_id, content_id, quiz_score)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (student_id, content_id) DO UPDATE SET
         status = 'completed',
         quiz_score = COALESCE($4, java_progress.quiz_score),
         completed_at = CURRENT_TIMESTAMP`,
      [studentId, goalId, contentId, quizScore || null]
    );

    // Update enrollment progress percentage
    const progressCalc = await pool.query(
      `WITH
        total AS (SELECT COUNT(*) as total FROM java_content jc
                  JOIN java_subtopics js ON jc.subtopic_id = js.id
                  JOIN java_topics jt ON js.topic_id = jt.id
                  JOIN java_modules jm ON jt.module_id = jm.id
                  WHERE jm.goal_id = $1),
        completed AS (SELECT COUNT(*) as completed FROM java_progress
                      WHERE student_id = $2 AND goal_id = $1)
       SELECT total.total, completed.completed,
              CASE WHEN total.total > 0 THEN ROUND((completed.completed::DECIMAL / total.total) * 100) ELSE 0 END as percentage
       FROM total, completed`,
      [goalId, studentId]
    );
    const percent = progressCalc.rows[0]?.percentage || 0;
    await pool.query(
      `UPDATE java_enrollments SET progress_percentage = $1,
          completed_at = CASE WHEN $1 >= 100 THEN CURRENT_TIMESTAMP ELSE completed_at END,
          status = CASE WHEN $1 >= 100 THEN 'completed' ELSE status END
       WHERE student_id = $2 AND goal_id = $3`,
      [percent, studentId, goalId]
    );

    res.json({ success: true, progress: percent });
  } catch (e) {
    console.error("Progress marking error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----- Coding submission and evaluation (placeholder) -----
app.post("/student/java/coding/submit", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { contentId, code } = req.body;

    // Verify enrollment
    const enrollmentCheck = await pool.query(
      `SELECT 1 FROM java_enrollments je
       JOIN java_goals jg ON je.goal_id = jg.id
       JOIN java_modules jm ON jg.id = jm.goal_id
       JOIN java_topics jt ON jm.id = jt.module_id
       JOIN java_subtopics js ON jt.id = js.topic_id
       JOIN java_content jc ON js.id = jc.subtopic_id
       WHERE je.student_id = $1 AND jc.id = $2`,
      [studentId, contentId]
    );
    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).json({ success: false, message: "Not enrolled" });
    }

    // Fetch all test cases
    const testCases = await pool.query(
      `SELECT id, input, expected_output FROM java_test_cases
       WHERE content_id = $1 ORDER BY order_number`,
      [contentId]
    );

    if (testCases.rows.length === 0) {
      return res.status(400).json({ success: false, error: "No test cases found" });
    }

    // ---- Placeholder for actual code execution ----
    // Replace with real sandbox.
    const allPassed = code.includes("PASS"); // Dummy condition
    const results = testCases.rows.map(tc => ({
      testCaseId: tc.id,
      input: tc.input,
      expected: tc.expected_output,
      output: allPassed ? tc.expected_output : "Wrong output",
      passed: allPassed,
    }));

    if (allPassed) {
      // Mark as completed
      const goalId = await getGoalIdForContent(contentId);
      await pool.query(
        `INSERT INTO java_progress (student_id, goal_id, content_id)
         VALUES ($1, $2, $3)
         ON CONFLICT (student_id, content_id) DO NOTHING`,
        [studentId, goalId, contentId]
      );
    }

    res.json({
      success: true,
      allPassed,
      results,
    });
  } catch (e) {
    console.error("Submit error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
});


// Get completed content IDs for a student
app.get("/student/java/completed-content", authenticate, async (req, res) => {
  try {
    const studentId = req.student.id;
    const result = await pool.query(
      `SELECT content_id, completed_at, quiz_score FROM java_progress
       WHERE student_id = $1 AND status = 'completed'`,
      [studentId]
    );
    res.json({ success: true, data: result.rows });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// ----------------------------------------------------------------------
// Health check
// ----------------------------------------------------------------------
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Java Programming API running" });
});

// ----------------------------------------------------------------------
// Initialize tables when this module is loaded
// ----------------------------------------------------------------------

module.exports = { app, createJavaTables:  createJavaTables };
