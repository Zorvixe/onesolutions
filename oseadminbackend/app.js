// Import required modules
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
const WebSocket = require("ws"); // Add WebSocket support
require("dotenv").config(); // Load environment variables
// Add these missing imports at the top
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { OpenAI } = require("openai");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");

// Initialize OpenAI client
defaults = {};
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Configure multer for in-memory file uploads

const PORT = process.env.PORT || 5003;
const JWT_SECRET = process.env.JWT_SECRET || "MY_SECRET_TOKEN"; // JWT secret from environment variables

// Initialize PostgreSQL pool using environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This bypasses certificate verification
  },
});

const generateNonce = (req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("base64");
  next();
};

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(generateNonce);

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Backend WebSocket handling
wss.on("connection", (ws, req) => {
  console.log("New WebSocket connection");
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) {
        ws.userPhone = user.phone; // Attach phone instead of ID
      }
    });
  }

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "register_phone":
        ws.userPhone = data.phone;
        break;
      case "direct_message":
        handleDirectMessage(data);
        break;
    }
  });
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Basic security headers
app.use(morgan("combined")); // Logging
// Configure CORS for external access
const corsOptions = {
  origin: "*", // Replace "*" with specific domains for production
};
app.use(cors(corsOptions));

const getClientIp = (req) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  return ip.split(",")[0].trim(); // Handles proxies and IPv6
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user; // Save decoded token data (e.g., user id and role)
    next();
  });
};
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

// Configure passport with Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://ose.onesolutionsekam.in/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists in database
        const existingUser = await pool.query(
          "SELECT * FROM users WHERE google_id = $1",
          [profile.id]
        );

        if (existingUser.rows.length) {
          // User exists, update last login
          await pool.query(
            "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE google_id = $1",
            [profile.id]
          );
          return done(null, existingUser.rows[0]);
        }

        // Create new user
        const newUser = await pool.query(
          `INSERT INTO users (
          google_id, 
          display_name, 
          email, 
          photo_url, 
          created_at, 
          last_login
        ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
          [
            profile.id,
            profile.displayName,
            profile.emails[0].value,
            profile.photos[0].value,
          ]
        );

        return done(null, newUser.rows[0]);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, user.rows[0]);
  } catch (error) {
    done(error, null);
  }
});

// Initialize passport middleware
app.use(passport.initialize());

// Modified admin registration route
app.post(
  "/api/admin/register",
  [
    body("adminname").notEmpty(),
    body("username").notEmpty(),
    body("password").isLength({ min: 6 }),
    body("phone").isMobilePhone(),
    body("admin_image_link").isURL(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { adminname, username, password, phone, admin_image_link } = req.body;

    try {
      // Check if any admin exists
      const adminCount = await pool.query("SELECT COUNT(*) FROM admin;");
      const isFirstAdmin = adminCount.rows[0].count === "0"; // Check if it's the first admin

      // Check if username or phone exists
      const existingAdmin = await pool.query(
        "SELECT * FROM admin WHERE username = $1 OR phone = $2;",
        [username, phone]
      );
      if (existingAdmin.rows.length) {
        return res
          .status(400)
          .json({ error: "Username or phone already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Determine status, is_approved, and created_by
      const status = isFirstAdmin ? "approved" : "pending";
      const isApproved = isFirstAdmin;
      const createdBy = isFirstAdmin ? null : req.user?.id; // First admin has no creator

      const insertAdminQuery = `
        INSERT INTO admin (adminname, username, password, phone, admin_image_link, status, is_approved, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, status, is_approved;
      `;

      const newAdmin = await pool.query(insertAdminQuery, [
        adminname,
        username,
        hashedPassword,
        phone,
        admin_image_link || null,
        status,
        isApproved,
        createdBy,
      ]);

      const responseData = {
        message: isFirstAdmin
          ? "First admin registered successfully"
          : "Registration submitted for approval",
        adminId: newAdmin.rows[0].id,
        status: newAdmin.rows[0].status,
        is_approved: newAdmin.rows[0].is_approved,
      };

      res.status(201).json(responseData);
    } catch (error) {
      console.error(`Error registering admin: ${error.message}`);
      res.status(500).json({ error: "Registration failed" });
    }
  }
);

// Modified admin login route
// Update the login route to include phone in JWT
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const adminResult = await pool.query(
      "SELECT * FROM admin WHERE username = $1;",
      [username]
    );

    if (!adminResult.rows.length) {
      return res
        .status(401)
        .json({ error: "Invalid credentials or Please Register" });
    }

    const admin = adminResult.rows[0];
    const isFirstAdmin = admin.created_by === null && admin.is_approved;

    if (admin.status !== "approved") {
      return res.status(403).json({ error: "Account pending approval" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Passward" });
    }

    // Include phone in JWT
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        phone: admin.phone, // Add this line
        role: "admin",
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        adminname: admin.adminname,
        username: admin.username,
        phone: admin.phone,
        admin_image_link: admin.admin_image_link,
        status: admin.status,
        isFirstAdmin,
      },
    });
  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ error: "Login failed" });
  }
});

// New route to get pending admins (admin access only)
app.get(
  "/api/admin/pending",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const pendingAdmins = await pool.query(
        "SELECT id, adminname, username, phone, admin_image_link, createdat FROM admin WHERE status = 'pending';"
      );
      res.json(pendingAdmins.rows);
    } catch (error) {
      console.error(`Error fetching pending admins: ${error.message}`);
      res.status(500).json({ error: "Failed to retrieve pending admins" });
    }
  }
);

// New route to approve admins (admin access only)
app.put(
  "/api/admin/approve/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;

    // Validate ID (Ensure it's a positive number)
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid admin ID" });
    }

    try {
      // Check if the admin exists and is still pending approval
      const checkAdmin = await pool.query(
        "SELECT * FROM admin WHERE id = $1 AND status = 'pending';",
        [id]
      );

      if (checkAdmin.rows.length === 0) {
        return res
          .status(404)
          .json({ error: "Admin not found or already approved" });
      }

      // Approve admin and set created_by (who approved them)
      const result = await pool.query(
        "UPDATE admin SET status = 'approved', is_approved = TRUE, created_by = $1 WHERE id = $2 RETURNING *;",
        [req.user.id, id]
      );

      res.json({
        message: "Admin approved successfully",
        admin: result.rows[0],
      });
    } catch (error) {
      console.error(`Approval error: ${error.message}`);
      res.status(500).json({ error: "Approval failed" });
    }
  }
);

// New route to reject admins (admin access only)
app.put(
  "/api/admin/reject/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM admin WHERE id = $1 RETURNING *;",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Admin not found" });
      }

      res.json({ message: "Admin rejected and removed from the system" });
    } catch (error) {
      console.error(`Rejection error: ${error.message}`);
      res.status(500).json({ error: "Rejection failed" });
    }
  }
);

// ... (rest of the code remains the same)

// Initialize DB and start server
const initializeDbAndServer = async () => {
  try {
    // Update the admin table creation to include 'status' and 'created_by'
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        adminname TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        admin_image_link TEXT,
        is_approved BOOLEAN DEFAULT FALSE,
        status TEXT NOT NULL DEFAULT 'pending',
        created_by INT REFERENCES admin(id), -- This should work as long as 'id' is a primary key
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS job (
        id SERIAL PRIMARY KEY,
        companyname TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        apply_link TEXT NOT NULL,
        image_link TEXT NOT NULL,
        url TEXT NOT NULL,
        salary TEXT NOT NULL,
        location TEXT NOT NULL,
        job_type TEXT NOT NULL,
        experience TEXT NOT NULL,
        batch TEXT NOT NULL,
        job_uploader TEXT NOT NULL,
        approved_by INT REFERENCES admin(id),
        created_by INT REFERENCES admin(id), -- This field references the admin who created the job
        status VARCHAR(20) DEFAULT 'pending',
        advanced_data TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_viewers (
        id SERIAL PRIMARY KEY,
    job_id INT NOT NULL REFERENCES job(id) ON DELETE CASCADE,
        ip_address TEXT NOT NULL,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (job_id, ip_address)
    );
    `);
    // Create popup_content table
    await pool.query(`
          CREATE TABLE IF NOT EXISTS popup_content (
          id SERIAL PRIMARY KEY,
          popup_heading TEXT NOT NULL,
          popup_text TEXT NOT NULL,
          popup_link TEXT NOT NULL,
          popup_belowtext TEXT NOT NULL,
          popup_routing_link TEXT NOT NULL,
          created_by INT REFERENCES admin(id),
          approved_by INT REFERENCES admin(id),
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Add tables for chat functionality
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_rooms (
        id SERIAL PRIMARY KEY,
        room_name TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        room_id INT NOT NULL REFERENCES chat_rooms(id),
        sender_id INT NOT NULL REFERENCES admin(id),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create table for direct messages (one-to-one chats)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS direct_messages (
          id SERIAL PRIMARY KEY,
          sender_phone TEXT NOT NULL REFERENCES admin(phone),
          recipient_phone TEXT NOT NULL REFERENCES admin(phone),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    // Add new tables
    await pool.query(`
        CREATE TABLE IF NOT EXISTS admin_sessions (
          id SERIAL PRIMARY KEY,
          admin_id INT REFERENCES admin(id),
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP,
          duration INTERVAL
        );
      `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS monthly_reports (
          id SERIAL PRIMARY KEY,
          admin_id INT REFERENCES admin(id),
          month INT,
          year INT,
          total_time BIGINT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    // Add these to your existing table creation
    await pool.query(`
        CREATE TABLE IF NOT EXISTS job_approval_requests (
          id SERIAL PRIMARY KEY,
          job_id INT NOT NULL REFERENCES job(id),
          requester_admin_id INT NOT NULL REFERENCES admin(id),
          owner_admin_id INT NOT NULL REFERENCES admin(id),
          requester_image TEXT, -- Keep as regular TEXT instead of foreign key
          action VARCHAR(10) NOT NULL,
          data JSONB,
          status VARCHAR(10) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

    // Add new table for tracking clicks
    await pool.query(`
  CREATE TABLE IF NOT EXISTS job_clicks (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL REFERENCES job(id) ON DELETE CASCADE,
    ip_address TEXT NOT NULL,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (job_id, ip_address)
  );
`);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    job_id INT NOT NULL REFERENCES job(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

    // Create resumes table
    await pool.query(`
  CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES job(id),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_file BYTEA NOT NULL,
    file_type TEXT NOT NULL,
    skills TEXT[],
    experience TEXT,
    match_percentage FLOAT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

    await pool.query(`
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  course TEXT NOT NULL,
  education_level TEXT,
  experience_level TEXT,
  motivation TEXT,
  schedule_preference TEXT,
  agreed_to_terms BOOLEAN DEFAULT FALSE,
  subscribe_to_newsletter BOOLEAN DEFAULT FALSE,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  admin_notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

    // Create contacts table
    await pool.query(`
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'unread',
  admin_notes TEXT,
  responded_at TIMESTAMP,
  response TEXT
);
`);

    try {
      await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      google_id TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      photo_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP
    );
  `);
      console.log("Users table initialized");
    } catch (error) {
      console.error("Error initializing users table:", error.message);
    }

    // Add this after your existing table creations in initializeDbAndServer
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
  ALTER TABLE live_classes 
  ADD COLUMN IF NOT EXISTS student_type VARCHAR(50) 
  CHECK (student_type IN ('zorvixe_core', 'zorvixe_pro', 'zorvixe_elite', 'all')) 
  DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS course_selection VARCHAR(50) 
  CHECK (course_selection IN ('web_development', 'digital_marketing', 'all')) 
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

    const popUpCountResult = await pool.query(
      "SELECT COUNT(*) as count FROM popup_content"
    );
    const popupCount = popUpCountResult.rows[0].count;

    if (popupCount == 0) {
      try {
        const data = await fs.readFile("pops.json", "utf8");
        const popList = JSON.parse(data); // popList should be an array

        if (!Array.isArray(popList)) {
          throw new Error("pops.json content is not an array");
        }
        const insertPopQuery = `
          INSERT INTO popup_content (popup_heading, popup_text, popup_link, popup_belowtext, popup_routing_link)
          VALUES ($1, $2, $3, $4, $5);
        `;
        for (const popup_content of popList) {
          await pool.query(insertPopQuery, [
            popup_content.popup_heading,
            popup_content.popup_text,
            popup_content.popup_link,
            popup_content.popup_belowtext,
            popup_content.popup_routing_link,
          ]);
        }
        console.log("Pop Data Imported Successfully");
      } catch (error) {
        console.error("Error reading or processing pops.json:", error.message);
        throw error; // rethrow the error to prevent the server from starting
      }
    }
    // Insert jobs if table is empty
    const jobsCountResult = await pool.query(
      "SELECT COUNT(*) as count FROM job;"
    );
    const jobsCount = jobsCountResult.rows[0].count;

    if (jobsCount == 0) {
      const data = await fs.readFile("jobs.json", "utf8");
      const jobList = JSON.parse(data);

      const insertJobQuery = `
         INSERT INTO job (companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch, job_uploader)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
       `;

      for (const job of jobList) {
        await pool.query(insertJobQuery, [
          job.companyname,
          job.title,
          job.description,
          job.apply_link,
          job.image_link,
          job.url,
          job.salary,
          job.location,
          job.job_type,
          job.experience,
          job.batch,
          job.job_uploader,
        ]);
      }
      console.log("Job data has been imported successfully.");
    }

    // Check if there are any admins in the table
    const adminCountResult = await pool.query(
      "SELECT COUNT(*) as count FROM admin;"
    );
    const adminCount = adminCountResult.rows[0].count;
    if (adminCount == 0) {
      const data = await fs.readFile("admin.json", "utf8");
      const adminList = JSON.parse(data);
      const insertAdminQuery = `
         INSERT INTO admin (adminname, username, password, phone, admin_image_link)
         VALUES ($1, $2, $3, $4, $5);
       `;

      for (const admin of adminList) {
        await pool.query(insertAdminQuery, [
          admin.adminname,
          admin.username,
          admin.password,
          admin.phone,
          admin.admin_image_link,
        ]);
      }
      console.log("Admin data has been imported successfully.");
    }

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });

    // Upgrade HTTP server to WebSocket
    server.on("upgrade", (request, socket, head) => {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    });
  } catch (error) {
    console.error(`Error initializing the database: ${error.message}`);
    process.exit(1);
  }
};
// Get comments for a job
app.get("/api/comments/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM comments WHERE job_id = $1 ORDER BY created_at DESC",
      [jobId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Post new comment
app.post(
  "/api/comments",
  [
    body("user_name").trim().notEmpty().withMessage("Name is required"),
    body("comment_text")
      .trim()
      .notEmpty()
      .withMessage("Comment cannot be empty"),
    body("job_id").isInt().withMessage("Invalid job ID"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { job_id, user_name, comment_text } = req.body;

    try {
      const result = await pool.query(
        "INSERT INTO comments (job_id, user_name, comment_text) VALUES ($1, $2, $3) RETURNING *",
        [job_id, user_name, comment_text]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error posting comment:", error);
      res.status(500).json({ error: "Failed to post comment" });
    }
  }
);
// Route to record apply clicks
app.post("/api/jobs/:id/click", async (req, res) => {
  const { id } = req.params;
  const ipAddress = getClientIp(req);

  try {
    const query = `
      INSERT INTO job_clicks (job_id, ip_address, clicked_at)
      VALUES ($1, $2, CURRENT_TIMESTAMP)
      ON CONFLICT (job_id, ip_address)
      DO UPDATE SET clicked_at = CURRENT_TIMESTAMP;
    `;
    await pool.query(query, [id, ipAddress]);

    // Get updated click count
    const countQuery = `
      SELECT COUNT(DISTINCT ip_address) AS click_count
      FROM job_clicks
      WHERE job_id = $1;
    `;
    const result = await pool.query(countQuery, [id]);

    res.status(200).json({
      message: "Click recorded successfully",
      click_count: result.rows[0].click_count,
    });
  } catch (error) {
    console.error(`Error recording job click: ${error.message}`);
    res.status(500).json({ error: "Failed to record click" });
  }
});
// Add this route to get session status
app.get("/api/session/status", authenticateToken, async (req, res) => {
  try {
    const adminId = req.user.id;

    // Get current session
    const activeSession = await pool.query(
      `SELECT * FROM admin_sessions 
       WHERE admin_id = $1 AND end_time IS NULL`,
      [adminId]
    );

    // Calculate today's total time
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayResult = await pool.query(
      `SELECT SUM(EXTRACT(EPOCH FROM duration)) as total
       FROM admin_sessions 
       WHERE admin_id = $1 AND start_time >= $2`,
      [adminId, todayStart]
    );

    res.json({
      isOnline: activeSession.rows.length > 0,
      todayTotal: todayResult.rows[0].total || 0,
      currentSessionStart: activeSession.rows[0]?.start_time,
    });
  } catch (error) {
    console.error("Error fetching session status:", error);
    res.status(500).json({ error: "Failed to get session status" });
  }
});

// Session endpoints
// Add this route in your backend code
app.get(
  "/api/admins/status/individual",
  authenticateToken,
  async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT a.id, 
             EXISTS (
               SELECT 1 FROM admin_sessions 
               WHERE admin_id = a.id AND end_time IS NULL
             ) as is_online
      FROM admin a
      WHERE a.is_approved = TRUE;
    `);
      res.json(result.rows);
    } catch (error) {
      console.error(`Error fetching admin statuses: ${error.message}`);
      res.status(500).json({ error: "Failed to retrieve admin statuses" });
    }
  }
);

app.post("/api/session/start", authenticateToken, async (req, res) => {
  try {
    const adminId = req.user.id;
    const existingSession = await pool.query(
      "SELECT * FROM admin_sessions WHERE admin_id = $1 AND end_time IS NULL",
      [adminId]
    );

    if (existingSession.rows.length > 0) {
      return res.status(400).json({ error: "Session already active" });
    }

    const startTime = new Date();
    await pool.query(
      "INSERT INTO admin_sessions (admin_id, start_time) VALUES ($1, $2)",
      [adminId, startTime]
    );

    res.json({ message: "Session started", startTime });
  } catch (error) {
    console.error("Error starting session:", error);
    res.status(500).json({ error: "Failed to start session" });
  }
});

app.post("/api/session/end", authenticateToken, async (req, res) => {
  try {
    const adminId = req.user.id;
    const activeSession = await pool.query(
      "SELECT * FROM admin_sessions WHERE admin_id = $1 AND end_time IS NULL",
      [adminId]
    );

    if (activeSession.rows.length === 0) {
      return res.status(400).json({ error: "No active session" });
    }

    const endTime = new Date();
    const startTime = activeSession.rows[0].start_time;
    const duration = Math.floor((endTime - startTime) / 1000);

    await pool.query(
      `UPDATE admin_sessions 
       SET end_time = $1, duration = $2 * INTERVAL '1 second'
       WHERE id = $3`,
      [endTime, duration, activeSession.rows[0].id]
    );

    res.json({ message: "Session ended", duration });
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({ error: "Failed to end session" });
  }
});

app.post("/api/session/update", authenticateToken, async (req, res) => {
  try {
    const adminId = req.user.id;
    const { duration } = req.body;

    await pool.query(
      `UPDATE admin_sessions 
       SET duration = $1 * INTERVAL '1 second'
       WHERE admin_id = $2 AND end_time IS NULL`,
      [duration, adminId]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Failed to update session" });
  }
});
// Monthly report job
const schedule = require("node-schedule");
// Monthly report generation (runs last day of month at 23:59)
schedule.scheduleJob("59 23 L * *", async () => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const result = await pool.query(
      `INSERT INTO monthly_reports (admin_id, month, year, total_time)
       SELECT 
         admin_id,
         $1 as month,
         $2 as year,
         SUM(EXTRACT(EPOCH FROM duration)) as total
       FROM admin_sessions
       WHERE EXTRACT(MONTH FROM start_time) = $1
         AND EXTRACT(YEAR FROM start_time) = $2
       GROUP BY admin_id`,
      [month, year]
    );
  } catch (error) {
    console.error("Error generating monthly report:", error);
  }
});

// Edit group chat room (Admin only)
app.put(
  "/api/chat/rooms/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { room_name } = req.body;

    try {
      // Check for existing room with same name
      const existingRoom = await pool.query(
        "SELECT * FROM chat_rooms WHERE room_name = $1 AND id != $2",
        [room_name, id]
      );

      if (existingRoom.rows.length > 0) {
        return res.status(400).json({ error: "Room name already exists" });
      }

      const updateQuery = `
      UPDATE chat_rooms 
      SET room_name = $1 
      WHERE id = $2 
      RETURNING *;
    `;

      const result = await pool.query(updateQuery, [room_name, id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Room not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error(`Error updating room: ${error.message}`);
      res.status(500).json({ error: "Failed to update room" });
    }
  }
);

// Delete group chat room (Admin only)
app.delete(
  "/api/chat/rooms/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Delete related messages first
      await pool.query("DELETE FROM chat_messages WHERE room_id = $1", [id]);

      const deleteQuery = "DELETE FROM chat_rooms WHERE id = $1 RETURNING *";
      const result = await pool.query(deleteQuery, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Room not found" });
      }

      res.json({ message: "Room deleted successfully" });
    } catch (error) {
      console.error(`Error deleting room: ${error.message}`);
      res.status(500).json({ error: "Failed to delete room" });
    }
  }
);

// Chat Routes
app.post(
  "/api/chat/rooms",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { room_name } = req.body;

    try {
      const insertRoomQuery = `
      INSERT INTO chat_rooms (room_name)
      VALUES ($1)
      RETURNING *;
    `;
      const newRoom = await pool.query(insertRoomQuery, [room_name]);
      res.status(201).json(newRoom.rows[0]);
    } catch (error) {
      console.error(`Error creating chat room: ${error.message}`);
      res.status(500).json({ error: "Failed to create chat room" });
    }
  }
);

app.get("/api/chat/rooms", authenticateToken, async (req, res) => {
  try {
    const roomsQuery = "SELECT * FROM chat_rooms ORDER BY created_at DESC;";
    const rooms = await pool.query(roomsQuery);
    res.json(rooms.rows);
  } catch (error) {
    console.error(`Error fetching chat rooms: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch chat rooms" });
  }
});

app.post("/api/chat/messages", authenticateToken, async (req, res) => {
  const { room_id, message } = req.body;
  const sender_id = req.user.id;

  try {
    const insertMessageQuery = `
      INSERT INTO chat_messages (room_id, sender_id, message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const newMessage = await pool.query(insertMessageQuery, [
      room_id,
      sender_id,
      message,
    ]);
    res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/api/chat/messages/:room_id", authenticateToken, async (req, res) => {
  const { room_id } = req.params;

  try {
    const messagesQuery = `
      SELECT cm.*, a.adminname, a.admin_image_link
      FROM chat_messages cm
      JOIN admin a ON cm.sender_id = a.id
      WHERE cm.room_id = $1
      ORDER BY cm.created_at ASC;
    `;
    const messages = await pool.query(messagesQuery, [room_id]);
    res.json(messages.rows);
  } catch (error) {
    console.error(`Error fetching messages: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});
// GET direct messages endpoint
// In your backend routes (replace ID-based with phone-based)
// Get direct messages between two users
app.get(
  "/api/chat/direct-messages/:senderPhone/:recipientPhone",
  authenticateToken,
  async (req, res) => {
    const { senderPhone, recipientPhone } = req.params;

    try {
      const messagesQuery = `
        SELECT dm.*, a.adminname, a.admin_image_link
        FROM direct_messages dm
        JOIN admin a ON dm.sender_phone = a.phone
        WHERE (dm.sender_phone = $1 AND dm.recipient_phone = $2)
           OR (dm.sender_phone = $2 AND dm.recipient_phone = $1)
        ORDER BY dm.created_at ASC;
      `;
      const result = await pool.query(messagesQuery, [
        senderPhone,
        recipientPhone,
      ]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching direct messages:", error.message);
      res.status(500).json({ error: "Failed to fetch direct messages" });
    }
  }
);

// Send direct message
// Update direct message handler with validation
app.post("/api/chat/direct-messages", authenticateToken, async (req, res) => {
  const { recipient_phone, message } = req.body;
  const sender_phone = req.user.phone;
  // Enhanced validation
  if (!recipient_phone?.match(/^(\+\d{1,3})?\d{10}$/)) {
    return res.status(400).json({ error: "Invalid recipient phone format" });
  }

  if (!message?.trim() || message.length > 500) {
    return res.status(400).json({
      error: "Message must be between 1-500 characters",
    });
  }

  try {
    // Check if recipient exists
    const recipientCheck = await pool.query(
      "SELECT * FROM admin WHERE phone = $1",
      [recipient_phone]
    );

    if (recipientCheck.rows.length === 0) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const insertQuery = `
      INSERT INTO direct_messages (sender_phone, recipient_phone, message)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(insertQuery, [
      sender_phone,
      recipient_phone,
      message,
    ]);

    // Get sender details for real-time update
    const senderResult = await pool.query(
      "SELECT adminname, admin_image_link FROM admin WHERE phone = $1",
      [sender_phone]
    );

    const messageWithDetails = {
      ...result.rows[0],
      adminname: senderResult.rows[0].adminname,
      admin_image_link: senderResult.rows[0].admin_image_link,
    };

    // Broadcast to both sender and recipient
    wss.clients.forEach((client) => {
      if (
        client.readyState === WebSocket.OPEN &&
        (client.userPhone === sender_phone ||
          client.userPhone === recipient_phone)
      ) {
        client.send(
          JSON.stringify({
            type: "direct_message",
            message: messageWithDetails,
          })
        );
      }
    });

    res.status(201).json(messageWithDetails);
  } catch (error) {
    console.error("Error sending direct message:", error.message);
    res.status(500).json({
      error: "Failed to send direct message",
      details: error.message,
    });
  }
});

// Edit group message
app.put("/api/chat/messages/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `UPDATE chat_messages 
       SET message = $1 
       WHERE id = $2 AND sender_id = $3
       RETURNING *`,
      [message, id, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Not authorized or message not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Failed to update message" });
  }
});

// Delete group message
app.delete("/api/chat/messages/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      `DELETE FROM chat_messages 
       WHERE id = $1 AND sender_id = $2
       RETURNING *`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Not authorized or message not found" });
    }

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});

// Edit direct message
app.put(
  "/api/chat/direct-messages/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = req.body;
      const senderPhone = req.user.phone;

      const result = await pool.query(
        `UPDATE direct_messages 
       SET message = $1 
       WHERE id = $2 AND sender_phone = $3
       RETURNING *`,
        [message, id, senderPhone]
      );

      if (result.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "Not authorized or message not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating direct message:", error);
      res.status(500).json({ error: "Failed to update message" });
    }
  }
);

// Delete direct message
app.delete(
  "/api/chat/direct-messages/:id",
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const senderPhone = req.user.phone;

      const result = await pool.query(
        `DELETE FROM direct_messages 
       WHERE id = $1 AND sender_phone = $2
       RETURNING *`,
        [id, senderPhone]
      );

      if (result.rows.length === 0) {
        return res
          .status(403)
          .json({ error: "Not authorized or message not found" });
      }

      res.json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error("Error deleting direct message:", error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  }
);

// Route to get all admins approved only (admin access only)
app.get(
  "/api/admins/approved",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const adminsQuery = `
      SELECT 
        id, 
        adminname, 
        username, 
        phone, 
        admin_image_link, 
        createdat AS "createdAt"
      FROM admin 
      WHERE is_approved = TRUE
      ORDER BY createdat DESC;
    `;
      const result = await pool.query(adminsQuery);
      res.json(result.rows);
    } catch (error) {
      console.error(`Error fetching admins: ${error.message}`);
      res.status(500).json({ error: "Failed to retrieve admins" });
    }
  }
);

// Route to get all admins (admin access only)
app.get("/api/admins", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const adminsQuery = `
      SELECT 
        id, 
        adminname, 
        username, 
        phone, 
        admin_image_link, 
        createdat AS "createdAt"
      FROM admin 
      ORDER BY createdat DESC;
    `;
    const result = await pool.query(adminsQuery);
    res.json(result.rows);
  } catch (error) {
    console.error(`Error fetching admins: ${error.message}`);
    res.status(500).json({ error: "Failed to retrieve admins" });
  }
});

// Route to fetch admin's own details after login
app.get("/api/admin/me", authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; // The ID is embedded in the token during login
    const adminQuery = "SELECT * FROM admin WHERE id = $1";
    const adminResult = await pool.query(adminQuery, [id]);

    if (!adminResult.rows.length) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = adminResult.rows[0];
    res.json({
      adminname: admin.adminname,
      username: admin.username,
      phone: admin.phone,
      admin_image_link: admin.admin_image_link,
      createdAt: admin.createdAt,
    });
  } catch (error) {
    console.error(`Error fetching admin details: ${error.message}`);
    res.status(500).json({ error: "Failed to retrieve admin details" });
  }
});

// Route to update admin details
app.put(
  "/api/admin/update",
  authenticateToken, // Ensure the user is authenticated
  [
    body("adminname"),
    body("username"),
    body("phone"),
    body("admin_image_link"),
    body("password"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { adminname, username, phone, admin_image_link, password } = req.body;
    const adminId = req.user.id; // Get admin ID from the token

    try {
      // Check if the username or phone already exists for another admin
      if (username || phone) {
        const existingAdmin = await pool.query(
          "SELECT * FROM admin WHERE (username = $1 OR phone = $2) AND id != $3;",
          [username, phone, adminId]
        );

        if (existingAdmin.rows.length) {
          return res.status(400).json({
            error: "Username or phone already in use by another admin",
          });
        }
      }

      // Prepare fields for update
      const updates = [];
      const values = [];
      let index = 1;

      if (adminname) {
        updates.push(`adminname = $${index++}`);
        values.push(adminname);
      }
      if (username) {
        updates.push(`username = $${index++}`);
        values.push(username);
      }
      if (phone) {
        updates.push(`phone = $${index++}`);
        values.push(phone);
      }
      if (admin_image_link) {
        updates.push(`admin_image_link = $${index++}`);
        values.push(admin_image_link);
      }
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updates.push(`password = $${index++}`);
        values.push(hashedPassword);
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      values.push(adminId); // Add admin ID as the last parameter

      const updateQuery = `
        UPDATE admin
        SET ${updates.join(", ")}
        WHERE id = $${index};
      `;

      await pool.query(updateQuery, values);
      res.json({ message: "Admin details updated successfully" });
    } catch (error) {
      console.error(`Error updating admin details: ${error.message}`);
      res.status(500).json({ error: "Failed to update admin details" });
    }
  }
);

// Route to reset password
app.post("/api/admin/forgot-password", async (req, res) => {
  const { username, newPassword } = req.body;

  // Validate input
  if (!username || !newPassword) {
    return res
      .status(400)
      .json({ error: "Username and new password are required" });
  }

  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
  }

  try {
    // Check if the admin exists
    const adminQuery = `SELECT id FROM admin WHERE username = $1;`;
    const adminResult = await pool.query(adminQuery, [username]);

    if (!adminResult.rows.length) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const adminId = adminResult.rows[0].id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updatePasswordQuery = `
      UPDATE admin 
      SET password = $1 
      WHERE id = $2;
    `;
    await pool.query(updatePasswordQuery, [hashedPassword, adminId]);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(`Error resetting password: ${error.message}`);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// Route to get all jobs with pagination
app.get("/api/jobs", async (req, res) => {
  const { page = 1, limit = 8 } = req.query;

  try {
    const offset = (page - 1) * parseInt(limit);
    const currentTime = new Date();
    const sevenDaysAgo = new Date(
      currentTime.setDate(currentTime.getDate() - 7)
    );

    const getAllJobsQuery = `
      SELECT *, 
      CASE 
        WHEN createdAt >= $1 THEN 1 
        ELSE 0 
      END as isNew 
      FROM job 
      ORDER BY isNew DESC, createdAt DESC 
      LIMIT $2 OFFSET $3;
    `;

    const jobs = await pool.query(getAllJobsQuery, [
      sevenDaysAgo.toISOString(),
      limit,
      offset,
    ]);

    if (jobs.rows.length > 0) {
      res.json(jobs.rows);
    } else {
      res.status(404).json({ error: "No jobs found" });
    }
  } catch (error) {
    console.error(`Error fetching all jobs: ${error.message}`);
    res.status(500).json({ error: "Failed to retrieve jobs" });
  }
});

// Admin Panel: Get all jobs (admin access only)
// Modified GET /api/jobs/adminpanel
app.get(
  "/api/jobs/adminpanel",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const viewAll = req.query.view === "all";
    const adminId = req.user.id;

    try {
      let query = `
      SELECT j.*, 
        creator.admin_image_link as creator_admin_image,
        creator.adminname as creator_name,
        approver.adminname as approver_name
      FROM job j
      LEFT JOIN admin creator ON j.created_by = creator.id
      LEFT JOIN admin approver ON j.approved_by = approver.id
    `;

      if (!viewAll) {
        query += ` WHERE j.created_by = $1`;
      }

      const result = await pool.query(query, viewAll ? [] : [adminId]);
      res.json(result.rows);
    } catch (error) {
      console.error("Error retrieving jobs:", error);
      res.status(500).send("An error occurred while retrieving jobs.");
    }
  }
);

// Add these routes after your existing job routes

// Create approval request
// Modify the DELETE /api/jobs/:id route
app.delete(
  "/api/jobs/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Delete related approval requests first
      await pool.query("DELETE FROM job_approval_requests WHERE job_id = $1", [
        id,
      ]);

      // Delete related viewers
      await pool.query("DELETE FROM job_viewers WHERE job_id = $1", [id]);

      // Then delete the job
      const result = await pool.query(
        "DELETE FROM job WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.json({ message: "Job deleted successfully" });
    } catch (error) {
      console.error(`Error deleting job: ${error.message}`);
      res.status(500).json({ error: "Failed to delete job" });
    }
  }
);

const isFirstAdmin = async (adminId) => {
  const result = await pool.query(
    "SELECT created_by, is_approved FROM admin WHERE id = $1",
    [adminId]
  );
  return result.rows[0].created_by === null && result.rows[0].is_approved;
};

// Route to add a new job (admin access only, with validation)
app.post(
  "/api/jobs",
  authenticateToken,
  authorizeAdmin,
  [
    body("companyname").notEmpty(),
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("apply_link").isURL(),
    body("image_link").isURL(),
    body("url").notEmpty(),
    body("salary").notEmpty(),
    body("location").notEmpty(),
    body("job_type").notEmpty(),
    body("experience").notEmpty(),
    body("batch").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Replace this in the route:
    // const { companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch } = req.body;
    const {
      companyname,
      title,
      description,
      apply_link,
      image_link,
      url,
      salary,
      location,
      job_type,
      experience,
      batch,
      advanced_data,
    } = req.body;
    const adminId = req.user.id; // Get admin ID from the token

    try {
      // Fetch admin's full name from the database
      const adminQuery = `SELECT adminname FROM admin WHERE id = $1`;
      const adminResult = await pool.query(adminQuery, [adminId]);

      if (adminResult.rows.length === 0) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const adminName = adminResult.rows[0].adminname; // Get admin's full name

      // Replace this query:
      // const insertJobQuery = `
      //   INSERT INTO job (companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch, job_uploader, created_by)
      //   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
      // `;

      // await pool.query(insertJobQuery, [companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch, adminName, adminId]);

      // With this:
      const insertJobQuery = `
        INSERT INTO job (companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch, job_uploader, created_by, advanced_data)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);
      `;

      await pool.query(insertJobQuery, [
        companyname,
        title,
        description,
        apply_link,
        image_link,
        url,
        salary,
        location,
        job_type,
        experience,
        batch,
        adminName,
        adminId,
        advanced_data || null,
      ]);

      res.status(201).json({ message: "Job added successfully" });
    } catch (error) {
      console.error(`Error adding job: ${error.message}`);
      res.status(500).json({ error: "Failed to add job" });
    }
  }
);

//jobs Modify Approval
app.put(
  "/api/jobs/:id/approve",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const jobId = req.params.id;
    const approverId = req.user.id;

    await pool.query(
      `
    UPDATE job SET 
      status = 'approved',
      approved_by = $1
    WHERE id = $2
  `,
      [approverId, jobId]
    );
  }
);

// Route to update a job (admin access only)
app.put(
  "/api/jobs/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;
    // Replace this in the route:
    // const { companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch } = req.body;
    const {
      companyname,
      title,
      description,
      apply_link,
      image_link,
      url,
      salary,
      location,
      job_type,
      experience,
      batch,
      advanced_data,
    } = req.body;

    try {
      const existingJob = await pool.query("SELECT * FROM job WHERE id = $1;", [
        id,
      ]);

      if (!existingJob.rows.length) {
        return res.status(404).json({ error: "Job not found" });
      }

      const job = existingJob.rows[0];
      const adminIsFirst = await isFirstAdmin(req.user.id);

      if (!adminIsFirst && job.created_by !== req.user.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      // Fetch admin details to get adminname
      const adminId = req.user.id; // Get admin ID from the token
      const adminQuery = "SELECT adminname FROM admin WHERE id = $1;";
      const adminResult = await pool.query(adminQuery, [adminId]);
      const admin = adminResult.rows[0];

      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const jobUploader = admin.adminname; // Use adminname as job uploader

      // Replace this query:
      // const updateJobQuery = `
      //   UPDATE job
      //   SET companyname = $1, title = $2, description = $3, apply_link = $4, image_link = $5, url = $6, salary = $7, location = $8, job_type = $9, experience = $10, batch = $11, job_uploader = $12
      //   WHERE id = $13;
      // `;
      // await pool.query(updateJobQuery, [companyname, title, description, apply_link, image_link, url, salary, location, job_type, experience, batch, jobUploader, id]);

      // With this:
      const updateJobQuery = `
      UPDATE job
      SET companyname = $1, title = $2, description = $3, apply_link = $4, image_link = $5, url = $6, salary = $7, location = $8, job_type = $9, experience = $10, batch = $11, job_uploader = $12, advanced_data = $13
      WHERE id = $14;
    `;
      await pool.query(updateJobQuery, [
        companyname,
        title,
        description,
        apply_link,
        image_link,
        url,
        salary,
        location,
        job_type,
        experience,
        batch,
        jobUploader,
        advanced_data || null,
        id,
      ]);
      res.json({ message: "Job updated successfully" });
    } catch (error) {
      console.error(`Error updating job: ${error.message}`);
      res.status(500).json({ error: "Failed to update job" });
    }
  }
);

// Fetch job by company name and job URL
app.get("/api/jobs/company/:companyname/:url", async (req, res) => {
  const { companyname, url } = req.params;

  const getJobByCompanyNameQuery = `
    SELECT j.*, 
      (SELECT COUNT(DISTINCT ip_address) FROM job_clicks WHERE job_id = j.id) AS click_count
    FROM job j
    WHERE 
      regexp_replace(LOWER(j.companyname), '[^a-z0-9]', '', 'g') = regexp_replace(LOWER($1), '[^a-z0-9]', '', 'g')
      AND LOWER(j.url) = LOWER($2);
  `;

  try {
    const job = await pool.query(getJobByCompanyNameQuery, [companyname, url]);

    if (job.rows.length) {
      res.json(job.rows[0]);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error(
      `Error fetching job by company name and URL: ${error.message}`
    );
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

app.post("/api/jobs/:id/view", async (req, res) => {
  const { id } = req.params;
  const ipAddress = getClientIp(req);

  try {
    const query = `
          INSERT INTO job_viewers (job_id, ip_address, viewed_at)
          VALUES ($1, $2, CURRENT_TIMESTAMP)
          ON CONFLICT (job_id, ip_address)
          DO UPDATE SET viewed_at = CURRENT_TIMESTAMP;
      `;
    await pool.query(query, [id, ipAddress]);
    res.status(200).json({ message: "View recorded successfully" });
  } catch (error) {
    console.error(`Error recording job view: ${error.message}`);
    res.status(500).json({ error: "Failed to record view" });
  }
});

app.get("/api/jobs/:id/viewers", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
          SELECT COUNT(DISTINCT ip_address) AS viewer_count
          FROM job_viewers
          WHERE job_id = $1;
      `;
    const result = await pool.query(query, [id]);
    res.json({ viewer_count: result.rows[0].viewer_count });
  } catch (error) {
    console.error(`Error fetching viewers count: ${error.message}`);
    res.status(500).json({ error: "Failed to retrieve viewer count" });
  }
});
// Fetch the latest popup content
app.get("/api/popup", async (req, res) => {
  try {
    const popupResult = await pool.query(
      "SELECT * FROM popup_content ORDER BY created_at DESC LIMIT 1;"
    );
    const popup = popupResult.rows[0];
    if (popup) {
      res.json({ popup });
    } else {
      res.json({ popup: null });
    }
  } catch (error) {
    console.error(`Error fetching popup content: ${error.message}`);
    res.status(500).json({ error: "Failed to retrieve popup content" });
  }
});
// Admin Panel: Get all popup content
app.get(
  "/api/popup/adminpanel",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const popupResult = await pool.query(
        "SELECT * FROM popup_content ORDER BY created_at DESC;"
      );
      res.json(popupResult.rows);
    } catch (error) {
      console.error(`Error fetching all popup content: ${error.message}`);
      res.status(500).json({ error: "Failed to retrieve popup content" });
    }
  }
);

app.post(
  "/api/popup/adminpanel",
  authenticateToken,
  authorizeAdmin,
  [
    body("popup_heading").notEmpty(),
    body("popup_text").notEmpty(),
    body("popup_link").isURL(),
    body("popup_routing_link").isURL(),
    body("popup_belowtext").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      popup_heading,
      popup_text,
      popup_link,
      popup_routing_link,
      popup_belowtext,
    } = req.body;
    try {
      const insertPopQuery = `
      INSERT INTO popup_content (popup_heading, popup_text, popup_link, popup_belowtext, popup_routing_link)
      VALUES ($1, $2, $3, $4, $5);
    `;
      await pool.query(insertPopQuery, [
        popup_heading,
        popup_text,
        popup_link,
        popup_belowtext,
        popup_routing_link,
      ]);
      res.status(201).json({ message: "Pop added successfully" });
    } catch (error) {
      console.error(`Error adding Pop: ${error.message}`);
      res.status(500).json({ error: "Failed to add Pop" });
    }
  }
);
// Admin Panel: Update specific popup content
app.put(
  "/api/popup/adminpanel/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;
    const {
      popup_heading,
      popup_text,
      popup_link,
      popup_routing_link,
      popup_belowtext,
    } = req.body;

    try {
      const existingPopup = await pool.query(
        "SELECT * FROM popup_content WHERE id = $1;",
        [id]
      );

      if (!existingPopup.rows.length) {
        return res.status(404).json({ error: "Popup not found" });
      }

      const updatePopupQuery = `
      UPDATE popup_content
      SET popup_heading = $1,
          popup_text = $2,
          popup_link = $3,
          popup_routing_link = $4,
          popup_belowtext = $5
      WHERE id = $6;
    `;
      await pool.query(updatePopupQuery, [
        popup_heading,
        popup_text,
        popup_link,
        popup_routing_link,
        popup_belowtext,
        id,
      ]);
      res.json({ message: "Popup content updated successfully" });
    } catch (error) {
      console.error(`Error updating popup content: ${error.message}`);
      res.status(500).json({ error: "Failed to update popup content" });
    }
  }
);

// Admin Panel: Delete specific popup content by ID
app.delete(
  "/api/popup/adminpanel/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;

    try {
      const existingPopup = await pool.query(
        "SELECT * FROM popup_content WHERE id = $1;",
        [id]
      );

      if (!existingPopup.rows.length) {
        return res.status(404).json({ error: "Popup not found" });
      }

      const deletePopupQuery = `DELETE FROM popup_content WHERE id = $1;`;
      await pool.query(deletePopupQuery, [id]);
      res.json({ message: "Popup content deleted successfully" });
    } catch (error) {
      console.error(`Error deleting popup content: ${error.message}`);
      res.status(500).json({ error: "Failed to delete popup content" });
    }
  }
);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err.stack));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Job Card Details API!");
});

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Configure storage for resumes
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Get Resumes Public Endpoint
app.get("/api/public/resumes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             j.title as job_title,
             j.companyname as job_companyname,
             j.url as job_url
      FROM resumes r
      JOIN job j ON r.job_id = j.id
      ORDER BY uploaded_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

// Add this after your existing resume endpoints
app.get("/api/public/resumes/:id/download", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resumes WHERE id = $1 AND job_id IS NOT NULL",
      [req.params.id]
    );

    if (!result.rows.length) return res.status(404).send("Resume not found");

    const resume = result.rows[0];
    res.set({
      "Content-Type": resume.file_type,
      "Content-Disposition": `attachment; filename="${resume.name}_resume.${
        resume.file_type.split("/")[1]
      }"`,
    });
    res.send(resume.resume_file);
  } catch (error) {
    console.error("Public resume download error:", error);
    res.status(500).send("Download failed");
  }
});
// Download Resume Endpoint
app.get("/api/resumes/:id/download", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM resumes WHERE id = $1", [
      req.params.id,
    ]);
    if (!result.rows.length) return res.status(404).send("Resume not found");

    const resume = result.rows[0];
    res.set({
      "Content-Type": resume.file_type,
      "Content-Disposition": `attachment; filename="${resume.name}_resume.${
        resume.file_type.split("/")[1]
      }"`,
    });
    res.send(resume.resume_file);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Download failed");
  }
});

// Enhanced resume analysis function
function analyzeResume(resumeText, jobDescription) {
  // Extract job requirements
  const requirements = extractRequirements(jobDescription);

  // Extract skills from resume
  const skills = extractSkills(resumeText);

  // Compare requirements and skills
  const { pros, cons, summary } = compareRequirementsAndSkills(
    requirements,
    skills,
    resumeText
  );

  // Calculate match percentage based on matched requirements
  const matchedRequirements = requirements.filter((req) =>
    skills.some((skill) => req.toLowerCase().includes(skill.toLowerCase()))
  );

  const matchPercentage =
    requirements.length > 0
      ? (matchedRequirements.length / requirements.length) * 100
      : 50; // Default to 50% if no requirements found

  return {
    matchPercentage,
    skills,
    experience: extractExperience(resumeText),
    pros,
    cons,
    summary,
  };
}

// Extract requirements from job description
function extractRequirements(description) {
  if (!description) return [];

  // Split by lines and bullet points
  const lines = description
    .split(/[\n•\-*]/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // Filter for likely requirement lines (containing keywords like "experience", "knowledge", "skill", etc.)
  const requirementKeywords = [
    "experience",
    "knowledge",
    "skill",
    "proficiency",
    "ability",
    "familiar",
    "understand",
  ];

  const requirements = lines.filter(
    (line) =>
      requirementKeywords.some((keyword) =>
        line.toLowerCase().includes(keyword)
      ) ||
      line.toLowerCase().includes("years") ||
      /^[A-Z]/.test(line) // Lines starting with capital letters (likely bullet points)
  );

  return requirements.length > 0 ? requirements : lines.slice(0, 5); // Fallback to first 5 lines if no requirements found
}

// Enhanced skill extraction
function extractSkills(text) {
  // Common technical skills
  const technicalSkills = [
    "JavaScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "Python",
    "Java",
    "C#",
    "C++",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "SQL",
    "NoSQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Oracle",
    "Firebase",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Git",
    "HTML",
    "CSS",
    "SASS",
    "LESS",
    "Bootstrap",
    "Tailwind",
    "TypeScript",
    "Redux",
    "GraphQL",
    "REST API",
    "SOAP",
    "CI/CD",
    "Jenkins",
    "Travis",
    "Agile",
    "Scrum",
    "Kanban",
    "Jira",
    "TDD",
    "BDD",
    "Unit Testing",
    "Integration Testing",
    "E2E Testing",
    "Jest",
    "Mocha",
    "Chai",
    "Selenium",
    "Cypress",
    "Webpack",
    "Babel",
    "ESLint",
    "Prettier",
    "Linux",
    "Windows",
    "MacOS",
    "Mobile Development",
    "iOS",
    "Android",
    "React Native",
    "Flutter",
    "Xamarin",
    "UI/UX",
    "Figma",
    "Sketch",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "After Effects",
    "Data Analysis",
    "Machine Learning",
    "AI",
    "Deep Learning",
    "NLP",
    "Computer Vision",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "scikit-learn",
    "pandas",
    "numpy",
    "R",
    "Tableau",
    "Power BI",
    "Excel",
    "VBA",
    "SharePoint",
    "Salesforce",
    "SAP",
    "ERP",
    "CRM",
  ];

  // Soft skills
  const softSkills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Critical Thinking",
    "Creativity",
    "Leadership",
    "Time Management",
    "Adaptability",
    "Flexibility",
    "Work Ethic",
    "Attention to Detail",
    "Organization",
    "Interpersonal Skills",
    "Conflict Resolution",
    "Decision Making",
    "Stress Management",
    "Emotional Intelligence",
    "Collaboration",
    "Negotiation",
    "Persuasion",
    "Presentation",
    "Public Speaking",
    "Customer Service",
    "Project Management",
    "Multitasking",
    "Self-Motivation",
    "Initiative",
    "Persistence",
  ];

  const allSkills = [...technicalSkills, ...softSkills];

  // Find skills in resume text
  const foundSkills = allSkills.filter((skill) => {
    // Escape special regex characters in skill name
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escapedSkill}\\b`, "i").test(text);
  });

  // Extract years of experience for skills
  const skillsWithExperience = foundSkills.map((skill) => {
    // Escape special regex characters in skill name
    const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const expMatch = text.match(
      new RegExp(
        `(\\d+)\\s*(?:years?|yrs?)\\s*(?:of)?\\s*(?:experience)?\\s*(?:with|in)\\s*${escapedSkill}`,
        "i"
      )
    );

    if (expMatch) {
      return `${skill} (${expMatch[1]} years)`;
    }
    return skill;
  });

  return skillsWithExperience.length > 0 ? skillsWithExperience : foundSkills;
}

// Extract experience information
function extractExperience(text) {
  // Look for overall experience
  const expMatch = text.match(/(\d+)\+?\s*years?(?:\s*of)?\s*experience/i);
  if (expMatch) {
    return expMatch[0];
  }

  // Look for job titles with dates
  const jobTitleMatch = text.match(
    /(?:senior|junior|lead|principal|staff)?\s*(?:software|web|frontend|backend|fullstack|mobile)?\s*(?:engineer|developer|architect|designer)/i
  );
  if (jobTitleMatch) {
    return `${jobTitleMatch[0]} experience`;
  }

  return "Experience level not specified";
}

// Compare requirements and skills to generate pros and cons
function compareRequirementsAndSkills(requirements, skills, resumeText) {
  const pros = [];
  const cons = [];

  // Convert skills to lowercase for case-insensitive matching
  const lowerCaseSkills = skills.map((skill) => skill.toLowerCase());
  const lowerCaseResumeText = resumeText.toLowerCase();

  // Check each requirement against skills and resume text
  requirements.forEach((req) => {
    const lowerReq = req.toLowerCase();

    // Check if any skill matches this requirement or if requirement is mentioned in resume
    const hasMatch =
      lowerCaseSkills.some(
        (skill) =>
          lowerReq.includes(skill.replace(/\s*$$\d+\s*years$$$/, "")) ||
          skill
            .replace(/\s*$$\d+\s*years$$$/, "")
            .includes(lowerReq.substring(0, Math.min(lowerReq.length, 10)))
      ) || lowerCaseResumeText.includes(lowerReq);

    if (hasMatch) {
      pros.push(`Candidate has experience with ${req}`);
    } else {
      cons.push(`Candidate lacks experience with ${req}`);
    }
  });

  // Generate additional pros based on skills not mentioned in requirements
  skills.forEach((skill) => {
    const cleanSkill = skill.replace(/\s*$$\d+\s*years$$$/, "");
    const lowerSkill = cleanSkill.toLowerCase();
    const isExtraSkill = !requirements.some((req) =>
      req.toLowerCase().includes(lowerSkill)
    );

    if (isExtraSkill) {
      pros.push(`Candidate has additional skill: ${skill}`);
    }
  });

  // Generate summary
  let summary = "";
  if (pros.length > cons.length) {
    summary = `The candidate matches ${pros.length} out of ${
      pros.length + cons.length
    } job requirements. The candidate has the relevant skills for this position but may need training in some specific areas.`;
  } else if (pros.length < cons.length) {
    summary = `The candidate matches ${pros.length} out of ${
      pros.length + cons.length
    } job requirements. While the candidate has some relevant skills, there are significant gaps in meeting the job requirements.`;
  } else {
    summary = `The candidate matches ${pros.length} out of ${
      pros.length + cons.length
    } job requirements. The candidate has a balanced profile with both strengths and areas for improvement relative to this position.`;
  }

  return {
    pros: pros.slice(0, 5), // Limit to top 5 pros
    cons: cons.slice(0, 5), // Limit to top 5 cons
    summary,
  };
}

// Update your resume upload endpoint to use the enhanced analysis
app.post(
  "/api/jobs/:id/upload-resume",
  upload.single("resume"),
  async (req, res) => {
    try {
      const jobId = req.params.id;
      const { name, email, phone } = req.body;
      const file = req.file;

      // Parse resume content
      let text = "";
      if (file.mimetype === "application/pdf") {
        const pdfData = await pdfParse(file.buffer);
        text = pdfData.text;
      } else {
        // DOC/DOCX
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        text = result.value;
      }

      // Get job requirements
      const job = await pool.query("SELECT * FROM job WHERE id = $1", [jobId]);

      // Use enhanced analysis
      const analysisResult = analyzeResume(text, job.rows[0].description);

      // Add filename to result
      analysisResult.resumeFileName = file.originalname;

      // Store in database
      await pool.query(
        `INSERT INTO resumes (job_id, name, email, phone, resume_file, file_type, skills, experience, match_percentage)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          jobId,
          name,
          email,
          phone,
          file.buffer,
          file.mimetype,
          analysisResult.skills,
          analysisResult.experience,
          analysisResult.matchPercentage,
        ]
      );

      res.json(analysisResult);
    } catch (error) {
      console.error("Resume upload error:", error);
      res.status(500).json({ error: "Resume processing failed" });
    }
  }
);

// Enhanced Resume Analysis Function for Multiple Jobs
const analyzeResumeForAllJobs = (resumeText, jobs) => {
  // Extract skills and experience from resume once
  const skills = extractSkills(resumeText);
  const experience = extractExperience(resumeText);

  // Analyze against each job
  const jobAnalyses = jobs.map((job) => {
    const requirements = extractRequirements(job.description);
    const matchedRequirements = requirements.filter((req) =>
      skills.some((skill) => req.toLowerCase().includes(skill.toLowerCase()))
    );

    const matchPercentage =
      requirements.length > 0
        ? (matchedRequirements.length / requirements.length) * 100
        : 50;

    return {
      jobId: job.id,
      title: job.title,
      company: job.companyname,
      matchPercentage,
      requirements: {
        total: requirements.length,
        matched: matchedRequirements.length,
      },
    };
  });

  // Calculate overall statistics
  const totalMatch = jobAnalyses.reduce(
    (sum, analysis) => sum + analysis.matchPercentage,
    0
  );
  const averageMatch = totalMatch / jobAnalyses.length;

  // Get top 3 matches
  const topMatches = [...jobAnalyses]
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 3);

  return {
    averageMatch,
    topMatches,
    skills,
    experience,
    totalJobsAnalyzed: jobs.length,
  };
};

// Enhanced Resume Analysis Endpoint
// Store analyzed resume in database (add to existing /api/analyze-resume route)
app.post("/api/analyze-resume", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const { name, email, phone } = req.body; // Get user details from request

    if (!file) return res.status(400).json({ error: "No file uploaded" });
    if (!name || !email)
      return res.status(400).json({ error: "Name and email are required" });

    // Existing analysis logic
    let text = "";
    if (file.mimetype === "application/pdf") {
      const pdfData = await pdfParse(file.buffer);
      text = pdfData.text;
    } else {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      text = result.value;
    }

    const { rows: jobs } = await pool.query(
      "SELECT id, companyname, title, description FROM job"
    );
    const analysisResult = analyzeResumeForAllJobs(text, jobs);

    // Store in database with NULL job_id
    await pool.query(
      `INSERT INTO resumes (name, email, phone, resume_file, file_type, skills, experience, match_percentage)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        name,
        email,
        phone || null,
        file.buffer,
        file.mimetype,
        analysisResult.skills,
        analysisResult.experience,
        analysisResult.averageMatch,
      ]
    );

    res.json({
      success: true,
      score: analysisResult.averageMatch,
      feedback: analysisResult.summary,
      skills: analysisResult.skills,
      experience: analysisResult.experience,
      topMatches: analysisResult.topMatches,
      totalJobsAnalyzed: analysisResult.totalJobsAnalyzed,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to analyze resume",
      details: error.message,
    });
  }
});

// Get all analyzed resumes (general analysis)
app.get("/api/analyzed-resumes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, skills, experience, 
             match_percentage, uploaded_at
      FROM resumes
      WHERE job_id IS NULL
      ORDER BY uploaded_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching analyzed resumes:", error);
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

// Download analyzed resume
app.get("/api/analyzed-resumes/:id/download", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resumes WHERE id = $1 AND job_id IS NULL",
      [req.params.id]
    );

    if (!result.rows.length) return res.status(404).send("Resume not found");

    const resume = result.rows[0];
    res.set({
      "Content-Type": resume.file_type,
      "Content-Disposition": `attachment; filename="${resume.name}_resume.${
        resume.file_type.split("/")[1]
      }"`,
    });
    res.send(resume.resume_file);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Download failed");
  }
});
// Enhanced AI Career Chatbot Endpoint
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0
    ) {
      return res.status(400).json({ error: "Invalid message content" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are CareerGPT, an AI career assistant specializing in:
          - Job search strategies
          - Resume optimization tips
          - Interview preparation
          - Career development
          - Salary negotiation advice
          - Tech industry insights
          Provide concise, actionable advice. Format responses with clear headings,
          bullet points when listing items, and emojis for visual organization.`,
        },
        {
          role: "user",
          content: message.trim(),
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;

    // Store conversation in database (optional)
    await pool.query(
      "INSERT INTO chat_history (query, response) VALUES ($1, $2)",
      [message, response]
    );

    res.json({
      success: true,
      reply: response,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process message",
      system:
        "Our career assistant is currently unavailable. Please try again later.",
    });
  }
});

// Google OAuth routes
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // Create JWT token
    const token = jwt.sign(
      {
        id: req.user.id,
        googleId: req.user.google_id,
        displayName: req.user.display_name,
        email: req.user.email,
        photoURL: req.user.photo_url,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Get the nonce from res.locals
    const nonce = res.locals.nonce || "";

    // Send token and user data to client via postMessage with nonce
    res.send(`
      <html>
        <body>
          <script nonce="${nonce}">
            window.opener.postMessage(
              { 
                token: "${token}", 
                user: {
                  id: "${req.user.id}",
                  googleId: "${req.user.google_id}",
                  displayName: "${req.user.display_name}",
                  email: "${req.user.email}",
                  photoURL: "${req.user.photo_url}"
                }
              }, 
              "${process.env.FRONTEND_URL || "*"}"
            );
            window.close();
          </script>
        </body>
      </html>
    `);
  }
);

// Get current user
app.get("/api/auth/me", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, google_id, display_name, email, photo_url FROM users WHERE id = $1",
      [req.user.id]
    );

    if (!user.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.rows[0].id,
      googleId: user.rows[0].google_id,
      displayName: user.rows[0].display_name,
      email: user.rows[0].email,
      photoURL: user.rows[0].photo_url,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// Logout route
app.post("/api/auth/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Generate nonce for CSP
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("hex");
  next();
});

// Configure Helmet with security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          (req, res) => `'nonce-${res.locals.nonce}'`, // Dynamic nonce
        ],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://backend-lt9m.onrender.com",
          "https://www.googleapis.com",
        ],
      },
    },
  })
);

module.exports = { generateNonce };

// Increment job view count
app.post("/:id/view", async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      "SELECT viewer_count FROM jobs WHERE id = $1",
      [id]
    );
    if (!rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Job not found" });
    }
    const count = (rows[0].viewer_count || 0) + 1;
    const { rows: updated } = await client.query(
      `UPDATE jobs
       SET viewer_count = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, viewer_count`,
      [count, id]
    );
    await client.query("COMMIT");
    res.json({
      success: true,
      message: "Job view count incremented",
      data: updated[0],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error incrementing job view count:", err);
    res.status(500).json({
      error: "Failed to increment job view count",
      details: err.message,
    });
  } finally {
    client.release();
  }
});

// Update resume status
app.put("/:id/resumes/status", async (req, res) => {
  const { id } = req.params;
  const { resumeId, status } = req.body;
  const valid = ["pending", "reviewed", "shortlisted", "rejected", "hired"];
  if (!resumeId || !status) {
    return res.status(400).json({ error: "Resume ID and status are required" });
  }
  if (!valid.includes(status)) {
    return res.status(400).json({
      error: "Invalid status",
      message: `Status must be one of: ${valid.join(", ")}`,
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const job = await client.query("SELECT id FROM jobs WHERE id = $1", [id]);
    if (!job.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Job not found" });
    }
    const resume = await client.query("SELECT id FROM resumes WHERE id = $1", [
      resumeId,
    ]);
    if (!resume.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Resume not found" });
    }

    const rel = await client.query(
      "SELECT 1 FROM job_resumes WHERE job_id = $1 AND resume_id = $2",
      [id, resumeId]
    );
    if (rel.rows.length) {
      await client.query(
        "UPDATE job_resumes SET status = $1, updated_at = NOW() WHERE job_id = $2 AND resume_id = $3",
        [status, id, resumeId]
      );
    } else {
      await client.query(
        "INSERT INTO job_resumes (job_id, resume_id, status, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW())",
        [id, resumeId, status]
      );
    }

    await client.query("COMMIT");
    res.json({
      success: true,
      message: "Resume status updated",
      data: {
        jobId: id,
        resumeId,
        status,
        updated_at: new Date().toISOString(),
      },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error updating resume status:", err);
    res
      .status(500)
      .json({ error: "Failed to update resume status", details: err.message });
  } finally {
    client.release();
  }
});

app.get("/api/public/resumes/:id/download", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resumes WHERE id = $1 AND job_id IS NULL",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).send("Public resume not found");
    }

    const resume = result.rows[0];
    res.set({
      "Content-Type": resume.file_type,
      "Content-Disposition": `attachment; filename="${resume.name}_resume.${
        resume.file_type.split("/")[1]
      }"`,
    });
    res.send(resume.resume_file);
  } catch (error) {
    console.error("Public download error:", error);
    res.status(500).send("Download failed");
  }
});

// Download resume
app.get("/:id/download", async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      "SELECT file_path, original_filename FROM resumes WHERE id = $1",
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Resume not found" });
    }

    const { file_path, original_filename } = rows[0];
    if (!file_path || !fs.existsSync(file_path)) {
      return res.status(404).json({ error: "Resume file not found on disk" });
    }

    const ext = path.extname(file_path).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".doc") contentType = "application/msword";
    else if (ext === ".docx")
      contentType =
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    else if (ext === ".txt") contentType = "text/plain";

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${original_filename || `resume_${id}${ext}`}"`
    );

    const stream = fs.createReadStream(file_path);
    stream.on("error", (err) => {
      console.error("Error streaming file:", err);
      if (!res.headersSent) {
        res
          .status(500)
          .json({ error: "Failed to stream file", details: err.message });
      }
    });
    stream.pipe(res);
  } catch (err) {
    console.error("Error downloading resume:", err);
    if (!res.headersSent) {
      res
        .status(500)
        .json({ error: "Failed to download resume", details: err.message });
    }
  } finally {
    client.release();
  }
});

// Admin panel listing
app.get("/adminpanel", async (req, res) => {
  const client = await pool.connect();
  try {
    const view = req.query.view || "all";
    const userId = req.user?.id;
    let sql = `
      SELECT j.*, a.name AS creator_name, a.profile_image AS creator_admin_image
      FROM jobs j
      LEFT JOIN admins a ON j.creator_id = a.id
    `;
    const params = [];
    if (view === "my" && userId) {
      sql += " WHERE j.creator_id = $1";
      params.push(userId);
    }
    sql += " ORDER BY j.created_at DESC";

    const { rows } = await client.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch jobs", details: err.message });
  } finally {
    client.release();
  }
});

// Edit job
app.put("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    companyname,
    description,
    apply_link,
    image_link,
    url,
    salary,
    location,
    job_type,
    experience,
    batch,
    status,
  } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const values = [
      title,
      companyname,
      description,
      apply_link,
      image_link,
      url,
      salary,
      location,
      job_type,
      experience,
      batch,
      status,
      id,
    ];
    const { rows } = await client.query(
      `UPDATE jobs
       SET title = $1,
           companyname = $2,
           description = $3,
           apply_link = $4,
           image_link = $5,
           url = $6,
           salary = $7,
           location = $8,
           job_type = $9,
           experience = $10,
           batch = $11,
           status = $12,
           updated_at = NOW()
       WHERE id = $13
       RETURNING *`,
      values
    );
    await client.query("COMMIT");

    if (!rows.length) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json({
      success: true,
      message: "Job updated successfully",
      data: rows[0],
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error updating job:", err);
    res
      .status(500)
      .json({ error: "Failed to update job", details: err.message });
  } finally {
    client.release();
  }
});

//  Live Classes Routes

app.post(
  "/api/live-classes",
  authenticateToken,
  [
    body("class_name").notEmpty().withMessage("Class name is required"),
    body("start_time").isISO8601().withMessage("Valid start time is required"),
    body("end_time").isISO8601().withMessage("Valid end time is required"),
    body("description").optional(),
    body("zoom_link")
      .optional()
      .isURL()
      .withMessage("Zoom link must be a valid URL"),
    body("batch_month").optional(),
    body("batch_year").optional(),
    body("status")
      .optional()
      .isIn(["upcoming", "live", "completed"])
      .withMessage("Status must be upcoming, live, or completed"),
    body("progress")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Progress must be between 0 and 100"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

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
    } = req.body;
    const mentor_id = req.user.id;

    try {
      // Check if mentor exists and get their name
      const mentorResult = await pool.query(
        "SELECT adminname FROM admin WHERE id = $1",
        [mentor_id]
      );

      if (!mentorResult.rows.length) {
        return res.status(404).json({ error: "Mentor not found" });
      }

      const mentor_name = mentorResult.rows[0].adminname;

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
        INSERT INTO live_classes (class_name, mentor_name, mentor_id, start_time, end_time, description, zoom_link, batch_month, batch_year, status, progress)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;

      const result = await pool.query(insertQuery, [
        class_name,
        mentor_name,
        mentor_id,
        start_time,
        end_time,
        description || null,
        zoom_link || null, // Add zoom_link here
        batch_month || null,
        batch_year || null,
        status || "upcoming",
        progress || 0,
      ]);

      res.status(201).json({
        message: "Live class created successfully",
        class: result.rows[0],
      });
    } catch (error) {
      console.error(`Error creating live class: ${error.message}`);
      res.status(500).json({ error: "Failed to create live class" });
    }
  }
);

// Update the PUT route for updating live classes
app.put(
  "/api/live-classes/:id",
  authenticateToken,
  [
    body("class_name").optional(),
    body("start_time").optional().isISO8601(),
    body("end_time").optional().isISO8601(),
    body("description").optional(),
    body("zoom_link").optional().isURL(),
    body("batch_month").optional(),
    body("batch_year").optional(),
    body("status").optional().isIn(["upcoming", "live", "completed"]),
    body("progress").optional().isFloat({ min: 0, max: 100 }),
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
    } = req.body;
    const mentor_id = req.user.id;

    try {
      // Check if class exists and user owns it or is admin
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

      // Build dynamic update query
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (class_name) {
        updates.push(`class_name = $${paramCount++}`);
        values.push(class_name);
      }
      if (start_time) {
        updates.push(`start_time = $${paramCount++}`);
        values.push(start_time);
      }
      if (end_time) {
        updates.push(`end_time = $${paramCount++}`);
        values.push(end_time);
      }
      if (description !== undefined) {
        updates.push(`description = $${paramCount++}`);
        values.push(description);
      }
      if (zoom_link !== undefined) {
        updates.push(`zoom_link = $${paramCount++}`);
        values.push(zoom_link);
      }
      if (batch_month !== undefined) {
        updates.push(`batch_month = $${paramCount++}`);
        values.push(batch_month);
      }
      if (batch_year !== undefined) {
        updates.push(`batch_year = $${paramCount++}`);
        values.push(batch_year);
      }
      if (status) {
        updates.push(`status = $${paramCount++}`);
        values.push(status);
      }
      if (progress !== undefined) {
        updates.push(`progress = $${paramCount++}`);
        values.push(progress);
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

      res.json({
        message: "Live class updated successfully",
        class: result.rows[0],
      });
    } catch (error) {
      console.error(`Error updating live class: ${error.message}`);
      res.status(500).json({ error: "Failed to update live class" });
    }
  }
);

// Update the GET route for live classes to include zoom_link
// GET live classes for students with filtering by student_type and course_selection
app.get("/api/live-classes", async (req, res) => {
  try {
    const { batch_month, batch_year, student_type, course_selection } = req.query;

    let query = `
      SELECT lc.*, 
             a.adminname as mentor_display_name,
             a.admin_image_link as mentor_image
      FROM live_classes lc
      LEFT JOIN admin a ON lc.mentor_id = a.id
      WHERE 1=1
    `;

    let queryParams = [];
    let paramCount = 1;

    // Filter by student type (if provided)
    if (student_type) {
      query += ` AND (lc.student_type = $${paramCount} OR lc.student_type = 'all')`;
      queryParams.push(student_type);
      paramCount++;
    }

    // Filter by course selection (if provided)
    if (course_selection) {
      query += ` AND (lc.course_selection = $${paramCount} OR lc.course_selection = 'all')`;
      queryParams.push(course_selection);
      paramCount++;
    }

    // Filter by batch month and year (if provided)
    if (batch_month && batch_year) {
      query += ` AND ((lc.batch_month = $${paramCount} AND lc.batch_year = $${paramCount + 1}) OR lc.batch_month IS NULL)`;
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

    query += ` ORDER BY 
      CASE 
        WHEN lc.status = 'live' THEN 1
        WHEN lc.status = 'upcoming' THEN 2
        WHEN lc.status = 'completed' THEN 3
      END,
      lc.start_time ASC;
    `;

    const result = await pool.query(query, queryParams);

    // Format the response
    const formattedClasses = result.rows.map((cls) => ({
      id: cls.id,
      letter: cls.class_name.charAt(0).toUpperCase(),
      name: cls.class_name,
      mentor: cls.mentor_display_name,
      status: cls.status,
      progress: `${Math.min(100, Math.max(0, Math.round(cls.progress)))}%`,
      numericProgress: Math.min(100, Math.max(0, Math.round(cls.progress))),
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
    console.error(`Error fetching live classes: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch live classes" });
  }
});

// GET admin live classes with filtering
app.get("/api/admin/live-classes", authenticateToken, async (req, res) => {
  try {
    const { 
      batch_month, 
      batch_year, 
      status, 
      student_type, 
      course_selection 
    } = req.query;

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
app.delete("/api/live-classes/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const mentor_id = req.user.id;

  try {
    // Check if class exists and user owns it or is admin
    const classCheck = await pool.query(
      "SELECT * FROM live_classes WHERE id = $1",
      [id]
    );

    if (!classCheck.rows.length) {
      return res.status(404).json({ error: "Live class not found" });
    }

    const liveClass = classCheck.rows[0];

    // Allow delete only if user is the creator or an admin
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



// Placement Achievements Routes

app.get("/api/placement-achievements", async (req, res) => {
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

// Get all placement achievements for admin panel
app.get(
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
app.post(
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
        image_url || null, // Store as null if not provided
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
app.put(
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
      // Check if achievement exists
      const existingAchievement = await pool.query(
        "SELECT * FROM placement_achievements WHERE id = $1",
        [id]
      );

      if (!existingAchievement.rows.length) {
        return res
          .status(404)
          .json({ error: "Placement achievement not found" });
      }

      // Handle empty image_url - set to null if empty string
      if (updates.image_url === "") {
        updates.image_url = null;
      }

      // Build dynamic update query
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

      // If status is being updated to approved, set approved_by
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
app.delete(
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

const studentBackendService = require("./services/studentBackendService");

// ==========================================
// 🔹 ADMIN DISCUSSION ROUTES
// ==========================================

// Get all threads for admin panel
app.get(
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

// Get thread detail for admin
app.get(
  "/api/admin/discussions/threads/:threadId",
  authenticateToken,
  async (req, res) => {
    try {
      const { threadId } = req.params;

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
app.post(
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
app.put(
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

// Add these new routes after the existing routes (before the export statement)

// ==========================================
// 🔹 ENROLLMENT FORM ROUTES
// ==========================================

// Backend Routes (app.js or your routes file)

// Create enrollments table
app.post(
  "/api/create-enrollments-table",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        course TEXT NOT NULL,
        education_level TEXT,
        experience_level TEXT,
        motivation TEXT,
        schedule_preference TEXT,
        agreed_to_terms BOOLEAN DEFAULT FALSE,
        subscribe_to_newsletter BOOLEAN DEFAULT FALSE,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'pending',
        admin_notes TEXT
      );
    `);

      // Add updated_at trigger function
      await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

      await pool.query(`
      DROP TRIGGER IF EXISTS update_enrollments_updated_at ON enrollments;
    `);

      await pool.query(`
      CREATE TRIGGER update_enrollments_updated_at
      BEFORE UPDATE ON enrollments
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);

      res.json({ message: "Enrollments table created successfully" });
    } catch (error) {
      console.error("Error creating enrollments table:", error);
      res.status(500).json({ error: "Failed to create table" });
    }
  }
);

// Submit enrollment form
app.post(
  "/api/enroll",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").optional(),
    body("course").notEmpty().withMessage("Course selection is required"),
    body("education").optional(),
    body("experience").optional(),
    body("motivation").optional(),
    body("schedule").optional(),
    body("terms").isBoolean().withMessage("Terms agreement is required"),
    body("newsletter").optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      course,
      education,
      experience,
      motivation,
      schedule,
      terms,
      newsletter,
    } = req.body;

    try {
      const insertQuery = `
        INSERT INTO enrollments (
          first_name, last_name, email, phone, course, education_level,
          experience_level, motivation, schedule_preference,
          agreed_to_terms, subscribe_to_newsletter
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
      `;

      const result = await pool.query(insertQuery, [
        firstName,
        lastName,
        email,
        phone || null,
        course,
        education || null,
        experience || null,
        motivation || null,
        schedule || null,
        terms,
        newsletter || false,
      ]);

      // Send email notification (optional)
      // await sendEnrollmentEmail(email, firstName, course);

      res.status(201).json({
        success: true,
        message: "Enrollment submitted successfully! We'll contact you soon.",
        enrollment: {
          id: result.rows[0].id,
          name: `${firstName} ${lastName}`,
          email: email,
          course: course,
        },
      });
    } catch (error) {
      console.error("Enrollment submission error:", error);

      // Check for duplicate email for same course
      if (error.code === "23505") {
        // Unique violation
        return res.status(400).json({
          success: false,
          error: "You have already enrolled for this course",
        });
      }

      res.status(500).json({
        success: false,
        error: "Failed to submit enrollment. Please try again.",
      });
    }
  }
);

// Get all enrollments (Admin only)
app.get(
  "/api/admin/enrollments",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        course,
        search,
        sortBy = "submitted_at",
        sortOrder = "DESC",
      } = req.query;

      const offset = (page - 1) * limit;

      // Validate sortBy to prevent SQL injection
      const validSortColumns = [
        "id",
        "first_name",
        "last_name",
        "email",
        "course",
        "submitted_at",
        "status",
        "updated_at",
      ];
      const safeSortBy = validSortColumns.includes(sortBy)
        ? sortBy
        : "submitted_at";
      const safeSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC";

      let query = `
      SELECT *, 
      CONCAT(first_name, ' ', last_name) as full_name,
      TO_CHAR(submitted_at, 'YYYY-MM-DD HH24:MI') as formatted_date
      FROM enrollments
      WHERE 1=1
    `;

      const queryParams = [];
      let paramCount = 1;

      if (status && status !== "all") {
        query += ` AND status = $${paramCount}`;
        queryParams.push(status);
        paramCount++;
      }

      if (course && course !== "all") {
        query += ` AND course = $${paramCount}`;
        queryParams.push(course);
        paramCount++;
      }

      if (search) {
        query += ` AND (
        first_name ILIKE $${paramCount} OR 
        last_name ILIKE $${paramCount} OR 
        email ILIKE $${paramCount} OR
        phone ILIKE $${paramCount} OR
        CONCAT(first_name, ' ', last_name) ILIKE $${paramCount}
      )`;
        queryParams.push(`%${search}%`);
        paramCount++;
      }

      // Count total records
      const countQuery = query.replace(
        "SELECT *, CONCAT(first_name, ' ', last_name) as full_name, TO_CHAR(submitted_at, 'YYYY-MM-DD HH24:MI') as formatted_date",
        "SELECT COUNT(*) as total"
      );

      const countResult = await pool.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);

      // Add sorting and pagination
      query += ` ORDER BY ${safeSortBy} ${safeSortOrder}`;
      query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
      queryParams.push(parseInt(limit), parseInt(offset));

      const result = await pool.query(query, queryParams);

      res.json({
        success: true,
        enrollments: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch enrollments",
        details: error.message,
      });
    }
  }
);

// Get enrollment statistics (Admin only) - MUST come BEFORE the :id route!
app.get(
  "/api/admin/enrollments/stats",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const stats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'contacted' THEN 1 END) as contacted,
        COUNT(CASE WHEN status = 'enrolled' THEN 1 END) as enrolled,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
        COUNT(CASE WHEN DATE(submitted_at) = CURRENT_DATE THEN 1 END) as today,
        COUNT(CASE WHEN EXTRACT(WEEK FROM submitted_at) = EXTRACT(WEEK FROM CURRENT_DATE) 
          AND EXTRACT(YEAR FROM submitted_at) = EXTRACT(YEAR FROM CURRENT_DATE) 
          THEN 1 END) as this_week
      FROM enrollments;
    `);

      const courseStats = await pool.query(`
      SELECT course, COUNT(*) as count
      FROM enrollments
      GROUP BY course
      ORDER BY count DESC;
    `);

      const monthlyStats = await pool.query(`
      SELECT 
        TO_CHAR(submitted_at, 'YYYY-MM') as month,
        COUNT(*) as count
      FROM enrollments
      WHERE submitted_at >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY TO_CHAR(submitted_at, 'YYYY-MM')
      ORDER BY month DESC;
    `);

      res.json({
        overall: stats.rows[0],
        byCourse: courseStats.rows,
        monthly: monthlyStats.rows,
      });
    } catch (error) {
      console.error("Error fetching enrollment stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  }
);

// Export enrollments as CSV (Admin only)
app.get(
  "/api/admin/enrollments/export",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT 
        id,
        first_name as "First Name",
        last_name as "Last Name",
        email as "Email",
        phone as "Phone",
        course as "Course",
        education_level as "Education Level",
        experience_level as "Experience Level",
        schedule_preference as "Schedule Preference",
        status as "Status",
        TO_CHAR(submitted_at, 'YYYY-MM-DD HH24:MI:SS') as "Submitted At",
        admin_notes as "Admin Notes"
      FROM enrollments
      ORDER BY submitted_at DESC
    `);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "No enrollments to export" });
      }

      // Convert to CSV
      const { Parser } = require("json2csv");
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(result.rows);

      // Set headers for file download
      res.header("Content-Type", "text/csv");
      res.attachment(
        `enrollments_${new Date().toISOString().split("T")[0]}.csv`
      );
      res.send(csv);
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ error: "Failed to export data" });
    }
  }
);

// Get single enrollment (Admin only) - This MUST come AFTER the /stats route!
app.get(
  "/api/admin/enrollments/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Validate that id is a number
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: "Invalid enrollment ID" });
      }

      const result = await pool.query(
        `SELECT *, 
       CONCAT(first_name, ' ', last_name) as full_name,
       TO_CHAR(submitted_at, 'YYYY-MM-DD HH24:MI:SS') as formatted_date
       FROM enrollments WHERE id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching enrollment:", error);
      res.status(500).json({ error: "Failed to fetch enrollment" });
    }
  }
);

// Update enrollment status (Admin only)
app.put(
  "/api/admin/enrollments/:id/status",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      // Validate that id is a number
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: "Invalid enrollment ID" });
      }

      if (
        !status ||
        !["pending", "contacted", "enrolled", "rejected", "followup"].includes(
          status
        )
      ) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      const updateQuery = `
      UPDATE enrollments 
      SET status = $1, 
          admin_notes = $2
      WHERE id = $3
      RETURNING *;
    `;

      const result = await pool.query(updateQuery, [status, notes || null, id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      res.json({
        message: "Enrollment status updated successfully",
        enrollment: result.rows[0],
      });
    } catch (error) {
      console.error("Error updating enrollment status:", error);
      res.status(500).json({ error: "Failed to update enrollment status" });
    }
  }
);

// Delete enrollment (Admin only)
app.delete(
  "/api/admin/enrollments/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Validate that id is a number
      if (isNaN(parseInt(id))) {
        return res.status(400).json({ error: "Invalid enrollment ID" });
      }

      const result = await pool.query(
        "DELETE FROM enrollments WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Enrollment not found" });
      }

      res.json({ message: "Enrollment deleted successfully" });
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      res.status(500).json({ error: "Failed to delete enrollment" });
    }
  }
);
// ==========================================
// 🔹 CONTACT FORM ROUTES
// ==========================================

// Create contacts table
app.post(
  "/api/create-contacts-table",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'unread',
        admin_notes TEXT,
        responded_at TIMESTAMP,
        response TEXT
      );
    `);
      res.json({ message: "Contacts table created successfully" });
    } catch (error) {
      console.error("Error creating contacts table:", error);
      res.status(500).json({ error: "Failed to create table" });
    }
  }
);

// Submit contact form
app.post(
  "/api/contact",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("subject").notEmpty().withMessage("Subject is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    try {
      const insertQuery = `
        INSERT INTO contacts (name, email, subject, message)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

      const result = await pool.query(insertQuery, [
        name,
        email,
        subject,
        message,
      ]);

      // Send notification email (optional)
      // await sendContactNotification(email, name, subject);

      res.status(201).json({
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        contact: {
          id: result.rows[0].id,
          name: name,
          email: email,
        },
      });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to submit contact form. Please try again.",
      });
    }
  }
);

// Get all contacts (Admin only)
app.get(
  "/api/admin/contacts",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        search,
        sortBy = "submitted_at",
        sortOrder = "DESC",
      } = req.query;

      const offset = (page - 1) * limit;

      let query = `
      SELECT * FROM contacts
      WHERE 1=1
    `;

      const queryParams = [];
      let paramCount = 1;

      if (status) {
        query += ` AND status = $${paramCount}`;
        queryParams.push(status);
        paramCount++;
      }

      if (search) {
        query += ` AND (
        name ILIKE $${paramCount} OR 
        email ILIKE $${paramCount} OR 
        subject ILIKE $${paramCount} OR
        message ILIKE $${paramCount}
      )`;
        queryParams.push(`%${search}%`);
        paramCount++;
      }

      // Count total records
      const countQuery = query.replace("SELECT *", "SELECT COUNT(*) as total");
      const countResult = await pool.query(countQuery, queryParams);
      const total = parseInt(countResult.rows[0].total);

      // Add sorting and pagination
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
      query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
      queryParams.push(limit, offset);

      const result = await pool.query(query, queryParams);

      res.json({
        contacts: result.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  }
);

// Get single contact (Admin only)
app.get(
  "/api/admin/contacts/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [
        id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Contact not found" });
      }

      // Mark as read when fetching
      if (result.rows[0].status === "unread") {
        await pool.query("UPDATE contacts SET status = 'read' WHERE id = $1", [
          id,
        ]);
        result.rows[0].status = "read";
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error fetching contact:", error);
      res.status(500).json({ error: "Failed to fetch contact" });
    }
  }
);

// Update contact status/response (Admin only)
app.put(
  "/api/admin/contacts/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes, response } = req.body;

      const updateQuery = `
      UPDATE contacts 
      SET status = COALESCE($1, status),
          admin_notes = COALESCE($2, admin_notes),
          response = COALESCE($3, response),
          responded_at = CASE WHEN $3 IS NOT NULL THEN CURRENT_TIMESTAMP ELSE responded_at END
      WHERE id = $4
      RETURNING *;
    `;

      const result = await pool.query(updateQuery, [
        status || null,
        notes || null,
        response || null,
        id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({
        message: "Contact updated successfully",
        contact: result.rows[0],
      });
    } catch (error) {
      console.error("Error updating contact:", error);
      res.status(500).json({ error: "Failed to update contact" });
    }
  }
);

// Delete contact (Admin only)
app.delete(
  "/api/admin/contacts/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "DELETE FROM contacts WHERE id = $1 RETURNING *",
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Contact not found" });
      }

      res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  }
);

// Get contact statistics (Admin only)
app.get(
  "/api/admin/contacts/stats",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const stats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread,
        COUNT(CASE WHEN status = 'read' THEN 1 END) as read,
        COUNT(CASE WHEN status = 'responded' THEN 1 END) as responded,
        COUNT(CASE WHEN DATE(submitted_at) = CURRENT_DATE THEN 1 END) as today,
        COUNT(CASE WHEN EXTRACT(WEEK FROM submitted_at) = EXTRACT(WEEK FROM CURRENT_DATE) 
          AND EXTRACT(YEAR FROM submitted_at) = EXTRACT(YEAR FROM CURRENT_DATE) 
          THEN 1 END) as this_week
      FROM contacts;
    `);

      const dailyStats = await pool.query(`
      SELECT 
        DATE(submitted_at) as date,
        COUNT(*) as count
      FROM contacts
      WHERE submitted_at >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY DATE(submitted_at)
      ORDER BY date DESC;
    `);

      res.json({
        overall: stats.rows[0],
        daily: dailyStats.rows,
      });
    } catch (error) {
      console.error("Error fetching contact stats:", error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  }
);

// Export contacts to CSV (Admin only)
app.get(
  "/api/admin/contacts/export",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT 
        id,
        name,
        email,
        subject,
        message,
        status,
        submitted_at,
        responded_at,
        admin_notes
      FROM contacts
      ORDER BY submitted_at DESC
    `);

      // Convert to CSV
      const csvRows = [];

      // Add headers
      csvRows.push(
        [
          "ID",
          "Name",
          "Email",
          "Subject",
          "Message",
          "Status",
          "Submitted At",
          "Responded At",
          "Notes",
        ].join(",")
      );

      // Add data rows
      result.rows.forEach((row) => {
        csvRows.push(
          [
            row.id,
            `"${row.name.replace(/"/g, '""')}"`,
            row.email,
            `"${row.subject.replace(/"/g, '""')}"`,
            `"${row.message.replace(/"/g, '""')}"`,
            row.status,
            new Date(row.submitted_at).toISOString(),
            row.responded_at ? new Date(row.responded_at).toISOString() : "",
            row.admin_notes ? `"${row.admin_notes.replace(/"/g, '""')}"` : "",
          ].join(",")
        );
      });

      const csv = csvRows.join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=contacts_export.csv"
      );
      res.send(csv);
    } catch (error) {
      console.error("Error exporting contacts:", error);
      res.status(500).json({ error: "Failed to export contacts" });
    }
  }
);

// Export enrollments to CSV (Admin only)
app.get(
  "/api/admin/enrollments/export",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const result = await pool.query(`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        course,
        education_level,
        experience_level,
        motivation,
        schedule_preference,
        status,
        submitted_at,
        agreed_to_terms,
        subscribe_to_newsletter
      FROM enrollments
      ORDER BY submitted_at DESC
    `);

      // Convert to CSV
      const csvRows = [];

      // Add headers
      csvRows.push(
        [
          "ID",
          "First Name",
          "Last Name",
          "Email",
          "Phone",
          "Course",
          "Education Level",
          "Experience Level",
          "Motivation",
          "Schedule Preference",
          "Status",
          "Submitted At",
          "Agreed to Terms",
          "Subscribed to Newsletter",
        ].join(",")
      );

      // Add data rows
      result.rows.forEach((row) => {
        csvRows.push(
          [
            row.id,
            `"${row.first_name.replace(/"/g, '""')}"`,
            `"${row.last_name.replace(/"/g, '""')}"`,
            row.email,
            row.phone || "",
            `"${row.course.replace(/"/g, '""')}"`,
            row.education_level
              ? `"${row.education_level.replace(/"/g, '""')}"`
              : "",
            row.experience_level
              ? `"${row.experience_level.replace(/"/g, '""')}"`
              : "",
            row.motivation ? `"${row.motivation.replace(/"/g, '""')}"` : "",
            row.schedule_preference || "",
            row.status,
            new Date(row.submitted_at).toISOString(),
            row.agreed_to_terms ? "Yes" : "No",
            row.subscribe_to_newsletter ? "Yes" : "No",
          ].join(",")
        );
      });

      const csv = csvRows.join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=enrollments_export.csv"
      );
      res.send(csv);
    } catch (error) {
      console.error("Error exporting enrollments:", error);
      res.status(500).json({ error: "Failed to export enrollments" });
    }
  }
);

module.exports = app;

initializeDbAndServer();
