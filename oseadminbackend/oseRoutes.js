// oseRoutes.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken"); // ADD THIS

const router = express.Router();

const studentBackendService = require("./services/studentBackendService");

// Initialize PostgreSQL pool using environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(
    token,
    process.env.JWT_SECRET || "MY_SECRET_TOKEN",
    (err, user) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    }
  );
};

const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

const createTables = async () => {
  try {
    // Add this after your existing table creations in initializeDbAndServer
    await pool.query(`
        CREATE TABLE IF NOT EXISTS live_classes (
          id SERIAL PRIMARY KEY,
          class_name TEXT NOT NULL,
          mentor_name TEXT NOT NULL,
          mentor_id INT REFERENCES admin(id),
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP NOT NULL,
          description TEXT,
          batch_month TEXT,
          batch_year TEXT,
          zoom_link TEXT,
          status VARCHAR(20) DEFAULT 'upcoming',
          progress FLOAT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    // Add these columns to the live_classes table
    await pool.query(`
        ALTER TABLE  live_classes 
        ADD COLUMN IF NOT EXISTS student_type VARCHAR(50) 
        CHECK (student_type IN ('zorvixe_core', 'zorvixe_pro', 'zorvixe_elite', 'all')) 
        DEFAULT 'all',
        ADD COLUMN IF NOT EXISTS course_selection VARCHAR(50) 
        CHECK (course_selection IN ('web_development', 'digital_marketing', 'java_programming', 'all')) 
        DEFAULT 'all';
      `);

    // Create placement_achievements table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS placement_achievements (
        id SERIAL PRIMARY KEY,
        student_name TEXT NOT NULL,
        role TEXT NOT NULL,
        batch TEXT NOT NULL,
        college TEXT NOT NULL,
        company TEXT NOT NULL,
        package TEXT NOT NULL,
        feedback TEXT NOT NULL,
        image_url TEXT,
        created_by INT REFERENCES admin(id),
        approved_by INT REFERENCES admin(id),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.error("Error creating OSE tables:", error);
    throw error; // Re-throw to handle in calling function
  }
};

// ==========================================
// 🔹 UPDATED: Create live class with proper defaults
// ==========================================
// In oseRoutes.js, modify the POST route (around line 189)

router.post(
  "/api/live-classes",
  authenticateToken,
  [
    body("class_name").notEmpty().withMessage("Class name is required"),
    body("start_time").isISO8601().withMessage("Valid start time is required"),
    body("end_time").isISO8601().withMessage("Valid end time is required"),
    body("student_type")
      .optional()
      .isIn(["zorvixe_core", "zorvixe_pro", "zorvixe_elite", "all"]),
    body("course_selection")
      .optional()
      .isIn([
        "web_development",
        "digital_marketing",
        "java_programming",
        "all",
      ]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      class_name,
      start_time,
      end_time,
      description,
      zoom_link,
      batch_month,
      batch_year,
      status,
      progress,
      student_type,
      course_selection,
    } = req.body;

    console.log("Received course_selection:", course_selection); // Add logging

    const mentor_id = req.user.id;

    try {
      // Check if mentor exists
      const mentorResult = await pool.query(
        "SELECT adminname FROM admin WHERE id = $1",
        [mentor_id]
      );

      if (!mentorResult.rows.length) {
        return res.status(404).json({ error: "Mentor not found" });
      }

      const mentor_name = mentorResult.rows[0].adminname;

      // Set default values with validation
      const validStudentTypes = [
        "zorvixe_core",
        "zorvixe_pro",
        "zorvixe_elite",
        "all",
      ];
      const validCourseSelections = [
        "web_development",
        "digital_marketing",
        "java_programming",
        "all",
      ];

      const finalStudentType =
        student_type && validStudentTypes.includes(student_type)
          ? student_type
          : "all";

      const finalCourseSelection =
        course_selection && validCourseSelections.includes(course_selection)
          ? course_selection
          : "all";

      console.log("Final course_selection:", finalCourseSelection); // Log the final value

      const finalBatchMonth =
        batch_month && batch_month.trim() !== "" ? batch_month : null;
      const finalBatchYear =
        batch_year && batch_year.trim() !== "" ? batch_year : null;

      // Check for scheduling conflicts
      const conflictCheck = await pool.query(
        `SELECT * FROM live_classes 
         WHERE mentor_id = $1 
         AND (
           (start_time <= $2 AND end_time >= $2) OR
           (start_time <= $3 AND end_time >= $3) OR
           ($2 <= start_time AND $3 >= start_time)
         )
         AND id != COALESCE($4, -1)`,
        [mentor_id, start_time, end_time, req.body.id || null]
      );

      if (conflictCheck.rows.length > 0) {
        return res.status(400).json({
          error: "Schedule conflict: Another class exists in this time slot",
        });
      }

      const insertQuery = `
        INSERT INTO live_classes (
          class_name, 
          mentor_name, 
          mentor_id, 
          start_time, 
          end_time, 
          description, 
          zoom_link, 
          batch_month, 
          batch_year, 
          status, 
          progress,
          student_type,
          course_selection
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *;
      `;

      const result = await pool.query(insertQuery, [
        class_name,
        mentor_name,
        mentor_id,
        start_time,
        end_time,
        description || null,
        zoom_link || null,
        finalBatchMonth,
        finalBatchYear,
        status || "upcoming",
        progress || 0,
        finalStudentType,
        finalCourseSelection,
      ]);

      console.log("✅ Live class created successfully:", result.rows[0].id);

      res.status(201).json({
        message: "Live class created successfully",
        class: result.rows[0],
      });
    } catch (error) {
      console.error(`❌ Error creating live class: ${error.message}`);
      console.error(error.stack);

      // Check if it's the check constraint violation
      if (error.message.includes("violates check constraint")) {
        return res.status(400).json({
          error: "Invalid course selection value",
          details:
            "Course selection must be one of: web_development, digital_marketing, java_programming, all",
          received: course_selection,
        });
      }

      res.status(500).json({
        error: "Failed to create live class",
        details: error.message,
      });
    }
  }
);

// ==========================================
// 🔹 UPDATED: Update live class
// ==========================================
router.put("/api/live-classes/:id", authenticateToken,
[
  body("class_name").notEmpty().withMessage("Class name is required"),
  body("start_time").isISO8601().withMessage("Valid start time is required"),
  body("end_time").isISO8601().withMessage("Valid end time is required"),
  body("student_type").optional().isIn(['zorvixe_core', 'zorvixe_pro', 'zorvixe_elite', 'all']),
  body("course_selection").optional().isIn(['web_development', 'digital_marketing', 'java_programming', 'all']),
],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const {
    class_name,
    start_time,
    end_time,
    description,
    zoom_link,
    batch_month,
    batch_year,
    status,
    progress,
    student_type,
    course_selection,
  } = req.body;
  const mentor_id = req.user.id;

  try {
    // Check if class exists
    const classCheck = await pool.query(
      "SELECT * FROM live_classes WHERE id = $1",
      [id]
    );

    if (!classCheck.rows.length) {
      return res.status(404).json({ error: "Live class not found" });
    }

    const liveClass = classCheck.rows[0];

    // Allow update only if user is the creator or an admin
    if (liveClass.mentor_id !== mentor_id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized to update this class" });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (class_name !== undefined) {
      updates.push(`class_name = $${paramCount++}`);
      values.push(class_name);
    }
    if (start_time !== undefined) {
      updates.push(`start_time = $${paramCount++}`);
      values.push(start_time);
    }
    if (end_time !== undefined) {
      updates.push(`end_time = $${paramCount++}`);
      values.push(end_time);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description || null);
    }
    if (zoom_link !== undefined) {
      updates.push(`zoom_link = $${paramCount++}`);
      values.push(zoom_link || null);
    }

    if (batch_month !== undefined) {
      const finalBatchMonth =
        batch_month && batch_month.trim() !== "" ? batch_month : null;
      updates.push(`batch_month = $${paramCount++}`);
      values.push(finalBatchMonth);
    }
    if (batch_year !== undefined) {
      const finalBatchYear =
        batch_year && batch_year.trim() !== "" ? batch_year : null;
      updates.push(`batch_year = $${paramCount++}`);
      values.push(finalBatchYear);
    }

    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(status);
    }
    if (progress !== undefined) {
      updates.push(`progress = $${paramCount++}`);
      values.push(progress);
    }

    if (student_type !== undefined) {
      updates.push(`student_type = $${paramCount++}`);
      values.push(student_type || "all");
    }
    if (course_selection !== undefined) {
      updates.push(`course_selection = $${paramCount++}`);
      values.push(course_selection || "all");
    }

    updates.push(`updated_at = $${paramCount++}`);
    values.push(new Date().toISOString());

    values.push(id);

    const updateQuery = `
          UPDATE live_classes 
          SET ${updates.join(", ")}
          WHERE id = $${paramCount}
          RETURNING *;
        `;

    const result = await pool.query(updateQuery, values);

    console.log(`✅ Live class ${id} updated successfully`);

    res.json({
      message: "Live class updated successfully",
      class: result.rows[0],
    });
  } catch (error) {
    console.error(`❌ Error updating live class: ${error.message}`);
    console.error(error.stack);
    res.status(500).json({
      error: "Failed to update live class",
      details: error.message,
    });
  }
});

// ==========================================
// 🔹 UPDATED: GET live classes for students with proper filtering
// ==========================================
router.get("/api/live-classes", async (req, res) => {
  try {
    const {
      batch_month,
      batch_year,
      student_type,
      course_selection,
      include_completed = "true",
    } = req.query;

    console.log("📚 Fetching live classes with filters:", {
      batch_month,
      batch_year,
      student_type,
      course_selection,
      include_completed,
    });

    let query = `
        SELECT lc.*, 
               a.adminname as mentor_display_name,
               a.admin_image_link as mentor_image
        FROM live_classes lc
        LEFT JOIN admin a ON lc.mentor_id = a.id
        WHERE 1=1
      `;

    const queryParams = [];
    let paramCount = 1;

    if (student_type) {
      query += ` AND (lc.student_type = $${paramCount} OR lc.student_type = 'all' OR lc.student_type IS NULL)`;
      queryParams.push(student_type);
      paramCount++;
    }

    if (course_selection) {
      query += ` AND (lc.course_selection = $${paramCount} OR lc.course_selection = 'all' OR lc.course_selection IS NULL)`;
      queryParams.push(course_selection);
      paramCount++;
    }

    if (batch_month && batch_year) {
      query += ` AND (
          (lc.batch_month = $${paramCount} AND lc.batch_year = $${
        paramCount + 1
      }) 
          OR lc.batch_month IS NULL 
          OR lc.batch_year IS NULL
        )`;
      queryParams.push(batch_month, batch_year);
      paramCount += 2;
    } else if (batch_month) {
      query += ` AND (lc.batch_month = $${paramCount} OR lc.batch_month IS NULL)`;
      queryParams.push(batch_month);
      paramCount++;
    } else if (batch_year) {
      query += ` AND (lc.batch_year = $${paramCount} OR lc.batch_year IS NULL)`;
      queryParams.push(batch_year);
      paramCount++;
    }

    if (include_completed === "false") {
      query += ` AND lc.status IN ('upcoming', 'live')`;
    }

    query += ` ORDER BY 
        CASE 
          WHEN lc.status = 'live' THEN 1
          WHEN lc.status = 'upcoming' THEN 2
          WHEN lc.status = 'completed' THEN 3
          ELSE 4
        END,
        lc.start_time ASC;
      `;

    const result = await pool.query(query, queryParams);

    const formattedClasses = result.rows.map((cls) => ({
      id: cls.id,
      letter: cls.class_name?.charAt(0)?.toUpperCase() || "C",
      name: cls.class_name,
      mentor: cls.mentor_display_name,
      status: cls.status,
      progress: `${Math.min(100, Math.max(0, Math.round(cls.progress || 0)))}%`,
      numericProgress: Math.min(
        100,
        Math.max(0, Math.round(cls.progress || 0))
      ),
      time: `${new Date(cls.start_time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })} - ${new Date(cls.end_time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      start_time: cls.start_time,
      end_time: cls.end_time,
      description: cls.description,
      zoom_link: cls.zoom_link,
      mentor_image: cls.mentor_image,
      batch_month: cls.batch_month,
      batch_year: cls.batch_year,
      student_type: cls.student_type,
      course_selection: cls.course_selection,
    }));

    res.json(formattedClasses);
  } catch (error) {
    console.error("❌ Error fetching live classes:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      error: "Failed to fetch live classes",
      details: error.message,
    });
  }
});

// GET admin live classes with filtering
router.get("/api/admin/live-classes", authenticateToken, async (req, res) => {
  try {
    const { batch_month, batch_year, status, student_type, course_selection } =
      req.query;

    let query = `
        SELECT lc.*, 
               a.adminname as mentor_name,
               a.admin_image_link as mentor_image,
               a.phone as mentor_phone
        FROM live_classes lc
        LEFT JOIN admin a ON lc.mentor_id = a.id
        WHERE 1=1
      `;

    let queryParams = [];
    let paramCount = 1;

    if (batch_month) {
      query += ` AND lc.batch_month = $${paramCount}`;
      queryParams.push(batch_month);
      paramCount++;
    }

    if (batch_year) {
      query += ` AND lc.batch_year = $${paramCount}`;
      queryParams.push(batch_year);
      paramCount++;
    }

    if (status) {
      query += ` AND lc.status = $${paramCount}`;
      queryParams.push(status);
      paramCount++;
    }

    if (student_type && student_type !== "all") {
      query += ` AND lc.student_type = $${paramCount}`;
      queryParams.push(student_type);
      paramCount++;
    }

    if (course_selection && course_selection !== "all") {
      query += ` AND lc.course_selection = $${paramCount}`;
      queryParams.push(course_selection);
      paramCount++;
    }

    query += ` ORDER BY lc.start_time ASC;`;

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching admin live classes: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch live classes" });
  }
});

// Delete live class (Admin/Mentor only)
router.delete("/api/live-classes/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const mentor_id = req.user.id;

  try {
    const classCheck = await pool.query(
      "SELECT * FROM live_classes WHERE id = $1",
      [id]
    );

    if (!classCheck.rows.length) {
      return res.status(404).json({ error: "Live class not found" });
    }

    const liveClass = classCheck.rows[0];

    if (liveClass.mentor_id !== mentor_id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this class" });
    }

    await pool.query("DELETE FROM live_classes WHERE id = $1", [id]);

    res.json({ message: "Live class deleted successfully" });
  } catch (error) {
    console.error(`Error deleting live class: ${error.message}`);
    res.status(500).json({ error: "Failed to delete live class" });
  }
});

// Get all placement achievements for admin panel
router.get(
  "/api/admin/placement-achievements",
  authenticateToken,
  async (req, res) => {
    try {
      const query = `
        SELECT pa.*, 
               creator.adminname as created_by_name,
               approver.adminname as approved_by_name
        FROM placement_achievements pa
        LEFT JOIN admin creator ON pa.created_by = creator.id
        LEFT JOIN admin approver ON pa.approved_by = approver.id
      `;

      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error(`Error fetching placement achievements: ${error.message}`);
      res.status(500).json({ error: "Failed to fetch placement achievements" });
    }
  }
);

// Create new placement achievement
router.post(
  "/api/placement-achievements",
  authenticateToken,
  [
    body("student_name").notEmpty().withMessage("Student name is required"),
    body("role").notEmpty().withMessage("Role is required"),
    body("batch").notEmpty().withMessage("Batch is required"),
    body("college").notEmpty().withMessage("College is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("package").notEmpty().withMessage("Package is required"),
    body("feedback").notEmpty().withMessage("Feedback is required"),
    body("image_url").optional().isURL().withMessage("Image URL must be valid"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      student_name,
      role,
      batch,
      college,
      company,
      package: pkg,
      feedback,
      image_url,
    } = req.body;

    const created_by = req.user.id;

    try {
      const insertQuery = `
          INSERT INTO placement_achievements (
            student_name, role, batch, college, company, package, 
            feedback, image_url, created_by, status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'approved')
          RETURNING *;
        `;

      const result = await pool.query(insertQuery, [
        student_name,
        role,
        batch,
        college,
        company,
        pkg,
        feedback,
        image_url || null,
        created_by,
      ]);

      res.status(201).json({
        message: "Placement achievement added successfully",
        achievement: result.rows[0],
      });
    } catch (error) {
      console.error(`Error creating placement achievement: ${error.message}`);
      res.status(500).json({ error: "Failed to create placement achievement" });
    }
  }
);

// Update placement achievement
router.put(
  "/api/placement-achievements/:id",
  authenticateToken,
  [
    body("student_name").optional().notEmpty(),
    body("role").optional().notEmpty(),
    body("batch").optional().notEmpty(),
    body("college").optional().notEmpty(),
    body("company").optional().notEmpty(),
    body("package").optional().notEmpty(),
    body("feedback").optional().notEmpty(),
    body("image_url").optional().isURL(),
    body("status").optional().isIn(["pending", "approved", "rejected"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const updates = req.body;
    const adminId = req.user.id;

    try {
      const existingAchievement = await pool.query(
        "SELECT * FROM placement_achievements WHERE id = $1",
        [id]
      );

      if (!existingAchievement.rows.length) {
        return res
          .status(404)
          .json({ error: "Placement achievement not found" });
      }

      if (updates.image_url === "") {
        updates.image_url = null;
      }

      const updateFields = [];
      const values = [];
      let paramCount = 1;

      Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
          updateFields.push(`${key} = $${paramCount}`);
          values.push(updates[key]);
          paramCount++;
        }
      });

      if (updates.status === "approved") {
        updateFields.push(`approved_by = $${paramCount}`);
        values.push(adminId);
        paramCount++;
      }

      values.push(id);

      const updateQuery = `
          UPDATE placement_achievements 
          SET ${updateFields.join(", ")}, updated_at = CURRENT_TIMESTAMP
          WHERE id = $${paramCount}
          RETURNING *;
        `;

      const result = await pool.query(updateQuery, values);

      res.json({
        message: "Placement achievement updated successfully",
        achievement: result.rows[0],
      });
    } catch (error) {
      console.error(`Error updating placement achievement: ${error.message}`);
      res.status(500).json({ error: "Failed to update placement achievement" });
    }
  }
);

// Delete placement achievement
router.delete(
  "/api/placement-achievements/:id",
  authenticateToken,
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM placement_achievements WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Placement achievement not found" });
      }

      res.json({ message: "Placement achievement deleted successfully" });
    } catch (error) {
      console.error(`Error deleting placement achievement: ${error.message}`);
      res.status(500).json({ error: "Failed to delete placement achievement" });
    }
  }
);

// Placement Achievements Routes
router.get("/api/placement-achievements", async (req, res) => {
  try {
    const query = `
        SELECT pa.*, 
               creator.adminname as created_by_name,
               approver.adminname as approved_by_name
        FROM placement_achievements pa
        LEFT JOIN admin creator ON pa.created_by = creator.id
        LEFT JOIN admin approver ON pa.approved_by = approver.id
        WHERE pa.status = 'approved'
        ORDER BY pa.created_at DESC
        LIMIT 10;
      `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching placement achievements: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch placement achievements" });
  }
});

// ==========================================
// 🔹 ADMIN DISCUSSION ROUTES
// ==========================================

// Get thread detail for admin
router.get(
  "/api/admin/discussions/threads/:threadId",
  authenticateToken,
  async (req, res) => {
    try {
      const { threadId } = req.params;

      // You'll need to import studentBackendService
      const result = await studentBackendService.getThreadDetail(threadId);
      res.json(result);
    } catch (error) {
      console.error("Admin thread detail error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Admin posts a reply
router.post(
  "/api/admin/discussions/replies",
  authenticateToken,
  async (req, res) => {
    try {
      const { threadId, content } = req.body;
      const adminData = {
        id: req.user.id,
        adminname: req.user.adminname,
        admin_image_link: req.user.admin_image_link,
      };

      if (!threadId || !content) {
        return res.status(400).json({
          success: false,
          error: "Thread ID and content are required",
        });
      }

      const result = await studentBackendService.postAdminReply(
        threadId,
        content,
        adminData
      );
      res.json(result);
    } catch (error) {
      console.error("Admin reply error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Update thread status
router.put(
  "/api/admin/discussions/threads/:threadId/status",
  authenticateToken,
  async (req, res) => {
    try {
      const { threadId } = req.params;
      const { status, is_important } = req.body;

      const result = await studentBackendService.updateThreadStatus(threadId, {
        status,
        is_important,
      });

      res.json(result);
    } catch (error) {
      console.error("Thread status update error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// Get all threads for admin panel
router.get(
  "/api/admin/discussions/threads",
  authenticateToken,
  async (req, res) => {
    try {
      const { status, page, limit, search } = req.query;

      const result = await studentBackendService.getThreads({
        status,
        page,
        limit,
        search,
      });

      res.json(result);
    } catch (error) {
      console.error("Admin threads fetch error:", error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

module.exports = {
  router: router, // Fix: use router, not app
  createOseTables: createTables,
};
