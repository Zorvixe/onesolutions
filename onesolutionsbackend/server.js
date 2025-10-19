require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const crypto = require("crypto")
const nodemailer = require('nodemailer')

// -------------------------------------------
// 🔹 Database Connection
// -------------------------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
  max: 20,
})

  // Test database connection
  ; (async () => {
    try {
      const client = await pool.connect()
      console.log("✅ Database connected successfully")
      client.release()
    } catch (err) {
      console.error("❌ Database connection error:", err.message)
    }
  })()

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
})

// -------------------------------------------
// 🔹 Express App Setup
// -------------------------------------------
const app = express()

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
)

// Handle preflight requests
app.options('*', cors())

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// -------------------------------------------
// 🔹 Multer Configuration for File Uploads
// -------------------------------------------
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

// -------------------------------------------
// 🔹 Database Table Creation
// -------------------------------------------
const createTables = async () => {
  // Students table
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
      is_current_batch BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `

  // Student progress table
  const progressTableQuery = `
    CREATE TABLE IF NOT EXISTS student_subtopic_progress (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
      subtopic_name VARCHAR(500) NOT NULL,
      module_name VARCHAR(500) NOT NULL,
      course_name VARCHAR(500) NOT NULL,
      goal_name VARCHAR(500) NOT NULL,
      completed BOOLEAN DEFAULT false,
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(student_id, subtopic_name, module_name, course_name, goal_name)
    );
  `

  const subtopicSlugTableQuery = `
    CREATE TABLE IF NOT EXISTS subtopics_slug_map (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(64) UNIQUE NOT NULL,
      subtopic_name VARCHAR(500) NOT NULL,
      module_name VARCHAR(500) NOT NULL,
      course_name VARCHAR(500) NOT NULL,
      goal_name VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (subtopic_name, module_name, course_name, goal_name)
    );
  `

  // OTP table for persistent storage (optional - for production)
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
  `

  try {
    await pool.query(studentsTableQuery)
    console.log("✅ Students table ready")

    await pool.query(progressTableQuery)
    console.log("✅ Student progress table ready")

    await pool.query(subtopicSlugTableQuery)
    console.log("✅ Subtopic slug map table ready")

    await pool.query(otpTableQuery)
    console.log("✅ OTP store table ready")
  } catch (error) {
    console.error("❌ Table creation error:", error.message)
    throw error
  }
}

// -------------------------------------------
// 🔹 JWT Token Generator
// -------------------------------------------
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables")
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

// -------------------------------------------
// 🔹 Auth Middleware
// -------------------------------------------
const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization")

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      })
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length)
    }

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      })
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing")
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const result = await pool.query(
      `SELECT id, student_id, email, first_name, last_name, phone, 
              profile_image, batch_month, batch_year, is_current_batch, created_at 
       FROM students WHERE id = $1`,
      [decoded.id],
    )

    const student = result.rows[0]
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Token is not valid - user not found",
      })
    }

    req.student = student
    next()
  } catch (error) {
    console.error("Auth middleware error:", error.message)

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      })
    }

    res.status(401).json({
      success: false,
      message: "Token verification failed",
    })
  }
}

// -------------------------------------------
// 🔹 Slug Utilities
// -------------------------------------------
const generateSlug = (len = 6) => crypto.randomBytes(len).toString("base64url")

async function getOrCreateSubtopicSlug({ goalName, courseName, moduleName, subtopicName }) {
  const params = [subtopicName, moduleName, courseName, goalName]

  const existing = await pool.query(
    `SELECT slug FROM subtopics_slug_map
     WHERE subtopic_name = $1 AND module_name = $2 AND course_name = $3 AND goal_name = $4`,
    params,
  )

  if (existing.rows[0]?.slug) return existing.rows[0].slug

  let slug
  while (true) {
    const candidate = generateSlug(6)
    const dupe = await pool.query(`SELECT 1 FROM subtopics_slug_map WHERE slug = $1`, [candidate])
    if (dupe.rowCount === 0) {
      slug = candidate
      break
    }
  }

  await pool.query(
    `INSERT INTO subtopics_slug_map (slug, subtopic_name, module_name, course_name, goal_name)
     VALUES ($1, $2, $3, $4, $5)`,
    [slug, ...params],
  )

  return slug
}

async function resolveSlug(slug) {
  const r = await pool.query(
    `SELECT slug, subtopic_name, module_name, course_name, goal_name
     FROM subtopics_slug_map WHERE slug = $1`,
    [slug],
  )
  return r.rows[0] || null
}

// -------------------------------------------
// 🔹 Email Configuration with Better Error Handling
// -------------------------------------------
const otpStore = new Map();
const otpExpiryTime = 5 * 60 * 1000; // 5 minutes

// Improved email transporter with better configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER || 'onesolutionsekam@gmail.com',
      pass: process.env.SMTP_PASS || 'qwns ptkl ntht beda',
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
    console.error('❌ Email transporter verification failed:', error);
  } else {
    console.log('✅ Email transporter is ready to send messages');
  }
});

// Enhanced sendOtpEmail function with timeout and retry
async function sendOtpEmail(email, otp, purpose) {
  return new Promise(async (resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Email sending timeout after 25 seconds'));
    }, 25000);

    try {
      const mailOptions = {
        from: `"OneSolutians" <${process.env.SMTP_USER || 'onesolutionsekam@gmail.com'}>`,
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
      console.error('❌ Email sending error:', error);

      // Try to recreate transporter if there's an issue
      if (error.code === 'EAUTH' || error.code === 'ECONNECTION') {
        console.log('🔄 Recreating email transporter...');
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
    attempts: 0 // Track verification attempts
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

// -------------------------------------------
// 🔹 OTP Routes with Better Error Handling
// -------------------------------------------

// Login Step 1: Request OTP
app.post(
  "/api/auth/login/request-otp",
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
          errors: errors.array()
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
          message: "Invalid credentials"
        });
      }

      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        console.log(`❌ Invalid password for: ${normalizedEmail}`);
        return res.status(400).json({
          success: false,
          message: "Invalid credentials"
        });
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
          email: normalizedEmail
        });
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);

        // For development/debugging - don't reveal OTP in production
        if (process.env.NODE_ENV === 'development') {
          console.log(`🛠️ DEBUG OTP for ${normalizedEmail}: ${otp}`);
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP email. Please try again.",
            debug: `OTP: ${otp}`
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again in a moment."
        });
      }

    } catch (err) {
      console.error("❌ Login OTP request error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during login. Please try again."
      });
    }
  }
);

// Login Step 2: Verify OTP
app.post(
  "/api/auth/login/verify-otp",
  [
    body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("otp").isLength({ min: 6, max: 6 }).withMessage("OTP must be 6 digits"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array()
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
          remainingAttempts
        });
      }

      // OTP is valid, get user data and generate token
      const result = await pool.query(
        `SELECT id, student_id, email, first_name, last_name, phone, 
                profile_image, batch_month, batch_year, is_current_batch, created_at 
         FROM students WHERE email = $1`,
        [normalizedEmail]
      );

      const student = result.rows[0];
      if (!student) {
        return res.status(400).json({
          success: false,
          message: "User not found after OTP verification"
        });
      }

      const token = generateToken(student.id);
      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`;

      const studentResponse = {
        id: student.id,
        studentId: student.student_id,
        email: student.email,
        firstName: student.first_name,
        lastName: student.last_name,
        phone: student.phone,
        profileImage: student.profile_image ? `${baseUrl}${student.profile_image}` : null,
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
          token
        }
      });

    } catch (err) {
      console.error("❌ Login OTP verify error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during OTP verification"
      });
    }
  }
);

// Forgot Password Step 1: Request OTP
app.post(
  "/api/auth/forgot-password/request-otp",
  [body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array()
        });
      }

      const { email } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(`🔑 Forgot password OTP request for: ${normalizedEmail}`);

      const result = await pool.query("SELECT id, first_name FROM students WHERE email = $1", [normalizedEmail]);
      if (result.rows.length === 0) {
        console.log(`❌ Email not registered: ${normalizedEmail}`);
        return res.status(400).json({
          success: false,
          message: "Email not registered"
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
          email: normalizedEmail
        });
      } catch (emailError) {
        console.error("❌ Password reset email failed:", emailError);

        // For debugging in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🛠️ DEBUG Password Reset OTP for ${normalizedEmail}: ${otp}`);
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP email. Please try again.",
            debug: `OTP: ${otp}`
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to send OTP email. Please try again."
        });
      }

    } catch (err) {
      console.error("❌ Forgot password OTP request error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during password reset request"
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
          errors: errors.array()
        });
      }

      const { email, otp, newPassword } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(`🔑 Password reset attempt for: ${normalizedEmail}`);

      const verification = verifyOtp(normalizedEmail, otp, "forgot_password");

      if (!verification.valid) {
        const remainingAttempts = getOtpAttempts(normalizedEmail, "forgot_password");

        return res.status(400).json({
          success: false,
          message: verification.message,
          remainingAttempts
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const result = await pool.query(
        `UPDATE students SET password = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE email = $2 RETURNING id`,
        [hashedPassword, normalizedEmail]
      );

      if (result.rowCount === 0) {
        return res.status(400).json({
          success: false,
          message: "Failed to update password"
        });
      }

      console.log(`✅ Password successfully reset for: ${normalizedEmail}`);

      res.json({
        success: true,
        message: "Password updated successfully"
      });

    } catch (err) {
      console.error("❌ Forgot password reset error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error during password reset"
      });
    }
  }
);

// Resend OTP endpoint
app.post(
  "/api/auth/resend-otp",
  [
    body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("purpose").isIn(["login", "forgot_password"]).withMessage("Invalid purpose"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array()
        });
      }

      const { email, purpose } = req.body;
      const normalizedEmail = email.toLowerCase().trim();

      console.log(`🔄 Resend OTP request for: ${normalizedEmail}, purpose: ${purpose}`);

      // For login purpose, verify user exists
      if (purpose === "login") {
        const userResult = await pool.query("SELECT id FROM students WHERE email = $1", [normalizedEmail]);
        if (userResult.rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: "Email not registered"
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
          message: "OTP resent successfully"
        });
      } catch (emailError) {
        console.error("❌ Resend OTP email failed:", emailError);

        // For debugging
        if (process.env.NODE_ENV === 'development') {
          console.log(`🛠️ DEBUG Resent OTP for ${normalizedEmail}: ${otp}`);
          return res.status(500).json({
            success: false,
            message: "Failed to resend OTP. Please try again.",
            debug: `OTP: ${otp}`
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to resend OTP. Please try again."
        });
      }

    } catch (err) {
      console.error("❌ Resend OTP error:", err.message);
      res.status(500).json({
        success: false,
        message: "Server error while resending OTP"
      });
    }
  }
);

// -------------------------------------------
// 🔹 Progress Tracking Routes
// -------------------------------------------

app.get("/api/subtopics/slug", auth, async (req, res) => {
  try {
    const { goalName, courseName, moduleName, subtopicName } = req.query
    if (!goalName || !courseName || !moduleName || !subtopicName) {
      return res.status(400).json({ success: false, message: "Missing required query params" })
    }
    const slug = await getOrCreateSubtopicSlug({ goalName, courseName, moduleName, subtopicName })
    res.json({ success: true, data: { slug } })
  } catch (err) {
    console.error("Slug creation error:", err.message)
    res.status(500).json({ success: false, message: "Server error creating slug" })
  }
})

app.get("/api/subtopics/:slug", auth, async (req, res) => {
  try {
    const info = await resolveSlug(req.params.slug)
    if (!info) return res.status(404).json({ success: false, message: "Slug not found" })
    res.json({ success: true, data: info })
  } catch (err) {
    console.error("Slug resolve error:", err.message)
    res.status(500).json({ success: false, message: "Server error resolving slug" })
  }
})

// Mark subtopic as completed (by names)
app.post("/api/progress/subtopic", auth, async (req, res) => {
  try {
    const { subtopicName, moduleName, courseName, goalName } = req.body

    if (!subtopicName || !moduleName || !courseName || !goalName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      })
    }

    // Upsert progress record
    const result = await pool.query(
      `INSERT INTO student_subtopic_progress 
       (student_id, subtopic_name, module_name, course_name, goal_name, completed, completed_at) 
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
       ON CONFLICT (student_id, subtopic_name, module_name, course_name, goal_name) 
       DO UPDATE SET 
         completed = EXCLUDED.completed,
         completed_at = EXCLUDED.completed_at,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [req.student.id, subtopicName, moduleName, courseName, goalName, true],
    )

    res.json({
      success: true,
      message: "Subtopic marked as completed",
      data: result.rows[0],
    })
  } catch (error) {
    console.error("Progress update error:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error while updating progress",
    })
  }
})

app.post("/api/progress/subtopic/by-slug", auth, async (req, res) => {
  try {
    const { slug } = req.body
    if (!slug) {
      return res.status(400).json({ success: false, message: "Slug is required" })
    }
    const info = await resolveSlug(slug)
    if (!info) return res.status(404).json({ success: false, message: "Slug not found" })

    const result = await pool.query(
      `INSERT INTO student_subtopic_progress 
       (student_id, subtopic_name, module_name, course_name, goal_name, completed, completed_at) 
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
       ON CONFLICT (student_id, subtopic_name, module_name, course_name, goal_name) 
       DO UPDATE SET 
         completed = EXCLUDED.completed,
         completed_at = EXCLUDED.completed_at,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [req.student.id, info.subtopic_name, info.module_name, info.course_name, info.goal_name, true],
    )

    res.json({
      success: true,
      message: "Subtopic marked as completed (slug)",
      data: { ...result.rows[0], slug },
    })
  } catch (error) {
    console.error("Progress update (slug) error:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error while updating progress by slug",
    })
  }
})

// Mark subtopic as incomplete
app.delete("/api/progress/subtopic", auth, async (req, res) => {
  try {
    const { subtopicName, moduleName, courseName, goalName } = req.body

    if (!subtopicName || !moduleName || !courseName || !goalName) {
      return res.status(400).json({
        success: false,
        message: "Subtopic/module/course/goal names are required",
      })
    }

    await pool.query(
      `DELETE FROM student_subtopic_progress 
       WHERE student_id = $1 AND subtopic_name = $2 AND module_name = $3 AND course_name = $4 AND goal_name = $5`,
      [req.student.id, subtopicName, moduleName, courseName, goalName],
    )

    res.json({
      success: true,
      message: "Subtopic progress removed",
    })
  } catch (error) {
    console.error("Progress delete error:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error while removing progress",
    })
  }
})

app.delete("/api/progress/subtopic/by-slug", auth, async (req, res) => {
  try {
    const { slug } = req.body
    if (!slug) {
      return res.status(400).json({ success: false, message: "Slug is required" })
    }
    const info = await resolveSlug(slug)
    if (!info) return res.status(404).json({ success: false, message: "Slug not found" })

    await pool.query(
      `DELETE FROM student_subtopic_progress 
       WHERE student_id = $1 AND subtopic_name = $2 AND module_name = $3 AND course_name = $4 AND goal_name = $5`,
      [req.student.id, info.subtopic_name, info.module_name, info.course_name, info.goal_name],
    )

    res.json({
      success: true,
      message: "Subtopic progress removed (slug)",
    })
  } catch (error) {
    console.error("Progress delete (slug) error:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error while removing progress by slug",
    })
  }
})

// Get all completed subtopics for a student
app.get("/api/progress/completed", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         p.subtopic_name, p.module_name, p.course_name, p.goal_name, p.completed_at,
         m.slug
       FROM student_subtopic_progress p
       LEFT JOIN subtopics_slug_map m
         ON m.subtopic_name = p.subtopic_name
        AND m.module_name = p.module_name
        AND m.course_name = p.course_name
        AND m.goal_name = p.goal_name
       WHERE p.student_id = $1 AND p.completed = true`,
      [req.student.id],
    )

    res.json({
      success: true,
      data: {
        completedSubtopics: result.rows,
      },
    })
  } catch (error) {
    console.error("Progress fetch error:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress",
    })
  }
})

// Get progress summary
app.get("/api/progress/summary", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         goal_name,
         course_name,
         module_name,
         COUNT(*) as total_subtopics,
         SUM(CASE WHEN completed THEN 1 ELSE 0 END) as completed_subtopics
       FROM student_subtopic_progress 
       WHERE student_id = $1
       GROUP BY goal_name, course_name, module_name`,
      [req.student.id],
    )

    res.json({
      success: true,
      data: {
        progressSummary: result.rows,
      },
    })
  } catch (error) {
    console.error("Progress summary error:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error while fetching progress summary",
    })
  }
})

// -------------------------------------------
// 🔹 Register Route
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
    body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
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
  ],
  async (req, res) => {
    try {
      console.log("Registration request received:", req.body)
      console.log("Uploaded file:", req.file)

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        if (req.file) {
          fs.unlinkSync(req.file.path)
        }
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        })
      }

      const { studentId, email, password, firstName, lastName, phone, batchMonth, batchYear, isCurrentBatch } = req.body

      // Check if email or student ID already exists
      const existingEmail = await pool.query("SELECT * FROM students WHERE email = $1", [email])
      const existingId = await pool.query("SELECT * FROM students WHERE student_id = $1", [studentId])

      if (existingEmail.rows.length > 0) {
        if (req.file) fs.unlinkSync(req.file.path)
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        })
      }

      if (existingId.rows.length > 0) {
        if (req.file) fs.unlinkSync(req.file.path)
        return res.status(400).json({
          success: false,
          message: "Student ID already exists",
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Handle profile image
      let profileImagePath = null
      if (req.file) {
        profileImagePath = `/uploads/${req.file.filename}`
      }

      // Parse batch data
      const currentBatch = isCurrentBatch === "true" || isCurrentBatch === true
      const batchYearInt = batchYear ? Number.parseInt(batchYear) : new Date().getFullYear()

      // Insert new student
      const result = await pool.query(
        `INSERT INTO students (student_id, email, password, first_name, last_name, phone, 
                              profile_image, batch_month, batch_year, is_current_batch)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id, student_id, email, first_name, last_name, phone, profile_image, 
                   batch_month, batch_year, is_current_batch, created_at`,
        [
          studentId,
          email,
          hashedPassword,
          firstName,
          lastName,
          phone,
          profileImagePath,
          batchMonth,
          batchYearInt,
          currentBatch,
        ],
      )

      const student = result.rows[0]
      const token = generateToken(student.id)

      // Construct full image URL
      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`
      const studentResponse = {
        id: student.id,
        studentId: student.student_id,
        email: student.email,
        firstName: student.first_name,
        lastName: student.last_name,
        phone: student.phone,
        profileImage: student.profile_image ? `${baseUrl}${student.profile_image}` : null,
        batchMonth: student.batch_month,
        batchYear: student.batch_year,
        isCurrentBatch: student.is_current_batch,
        createdAt: student.created_at,
      }

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          student: studentResponse,
          token,
        },
      })
    } catch (err) {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      console.error("Registration error:", err.message)
      res.status(500).json({
        success: false,
        message: "Server error during registration",
      })
    }
  },
)

// -------------------------------------------
// 🔹 Login Route (Legacy - Keep for compatibility)
// -------------------------------------------
app.post(
  "/api/auth/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      const result = await pool.query(
        `SELECT id, student_id, email, password, first_name, last_name, phone, 
                profile_image, batch_month, batch_year, is_current_batch, created_at 
         FROM students WHERE email = $1`,
        [email],
      )
      const student = result.rows[0]

      if (!student) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        })
      }

      const validPassword = await bcrypt.compare(password, student.password)
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        })
      }

      const token = generateToken(student.id)

      // Construct full image URL
      const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`
      const studentResponse = {
        id: student.id,
        studentId: student.student_id,
        email: student.email,
        firstName: student.first_name,
        lastName: student.last_name,
        phone: student.phone,
        profileImage: student.profile_image ? `${baseUrl}${student.profile_image}` : null,
        batchMonth: student.batch_month,
        batchYear: student.batch_year,
        isCurrentBatch: student.is_current_batch,
        createdAt: student.created_at,
      }

      res.json({
        success: true,
        message: "Login successful",
        data: {
          student: studentResponse,
          token,
        },
      })
    } catch (err) {
      console.error("Login error:", err.message)
      res.status(500).json({
        success: false,
        message: "Server error during login",
      })
    }
  },
)

// -------------------------------------------
// 🔹 Profile Route (Protected)
// -------------------------------------------
app.get("/api/auth/profile", auth, async (req, res) => {
  try {
    const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`
    const studentResponse = {
      id: req.student.id,
      studentId: req.student.student_id,
      email: req.student.email,
      firstName: req.student.first_name,
      lastName: req.student.last_name,
      phone: req.student.phone,
      profileImage: req.student.profile_image ? `${baseUrl}${req.student.profile_image}` : null,
      batchMonth: req.student.batch_month,
      batchYear: req.student.batch_year,
      isCurrentBatch: req.student.is_current_batch,
      createdAt: req.student.created_at,
    }

    res.json({
      success: true,
      data: { student: studentResponse },
    })
  } catch (error) {
    console.error("Profile error:", error.message)
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
    })
  }
})

// -------------------------------------------
// 🔹 Update Profile Route (Protected)
// -------------------------------------------
app.put("/api/auth/profile", auth, upload.single("profileImage"), async (req, res) => {
  try {
    console.log("Update profile request:", req.body)
    console.log("Update profile file:", req.file)

    const { firstName, lastName, phone, batchMonth, batchYear, isCurrentBatch } = req.body

    let profileImagePath = req.student.profile_image

    if (req.file) {
      profileImagePath = `/uploads/${req.file.filename}`
      if (req.student.profile_image && req.student.profile_image !== "/uploads/default-profile.png") {
        const oldImagePath = path.join(__dirname, req.student.profile_image)
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
    }

    const batchYearInt = batchYear ? Number.parseInt(batchYear) : req.student.batch_year
    const currentBatch = isCurrentBatch === "true" || isCurrentBatch === true

    const result = await pool.query(
      `UPDATE students 
         SET first_name = $1, last_name = $2, phone = $3, 
             profile_image = $4, batch_month = $5, batch_year = $6, 
             is_current_batch = $7, updated_at = CURRENT_TIMESTAMP
         WHERE id = $8
         RETURNING id, student_id, email, first_name, last_name, phone, 
                   profile_image, batch_month, batch_year, is_current_batch, created_at`,
      [firstName, lastName, phone, profileImagePath, batchMonth, batchYearInt, currentBatch, req.student.id],
    )

    const updatedStudent = result.rows[0]

    const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5002}`
    const studentResponse = {
      id: updatedStudent.id,
      studentId: updatedStudent.student_id,
      email: updatedStudent.email,
      firstName: updatedStudent.first_name,
      lastName: updatedStudent.last_name,
      phone: updatedStudent.phone,
      profileImage: updatedStudent.profile_image ? `${baseUrl}${updatedStudent.profile_image}` : null,
      batchMonth: updatedStudent.batch_month,
      batchYear: updatedStudent.batch_year,
      isCurrentBatch: updatedStudent.is_current_batch,
      createdAt: updatedStudent.created_at,
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { student: studentResponse },
    })
  } catch (err) {
    console.error("Profile update error:", err.message)
    res.status(500).json({
      success: false,
      message: "Server error during profile update",
    })
  }
})

// -------------------------------------------
// 🔹 Health Check
// -------------------------------------------
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()")
    res.json({
      success: true,
      message: "Server & DB running",
      time: result.rows[0].now,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database error",
      error: error.message,
    })
  }
})

// -------------------------------------------
// 🔹 Test Email Route
// -------------------------------------------
app.post("/api/test-email", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const testOtp = generateOTP();

    await sendOtpEmail(email, testOtp, "Test Email");

    res.json({
      success: true,
      message: "Test email sent successfully",
      debug: process.env.NODE_ENV === 'development' ? `OTP: ${testOtp}` : undefined
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message
    });
  }
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
      })
    }
  }

  console.error("Unhandled error:", error);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
  })
})

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// -------------------------------------------
// 🔹 Start Server
// -------------------------------------------
const PORT = process.env.PORT || 5002
  ; (async () => {
    try {
      await createTables()
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
        console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`)
        console.log(`🔑 JWT Secret: ${process.env.JWT_SECRET ? "Set" : "Not set!"}`)
        console.log(`🔗 CORS Origin: ${process.env.FRONTEND_URL || "http://localhost:3000"}`)
        console.log(`📧 Email Service: ${process.env.SMTP_USER ? "Configured" : "Not configured"}`)
        console.log(`📁 Upload directory: ${uploadsDir}`)
        console.log(`⏰ OTP Expiry: ${otpExpiryTime / 60000} minutes`)
      })
    } catch (error) {
      console.error("❌ Failed to start server:", error.message)
      process.exit(1)
    }
  })()