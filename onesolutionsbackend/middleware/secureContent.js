// middleware/secureContent.js
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

const verifyContentAccess = async (req, res, next) => {
  try {
    const { contentUuid } = req.params;
    const token = req.query.token;

    if (!contentUuid) {
      return res.status(400).json({
        success: false,
        message: "Content UUID is required",
      });
    }

    const result = await pool.query(
      "SELECT * FROM subtopic_content WHERE content_uuid = $1",
      [contentUuid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    const content = result.rows[0];

    if (token && content.access_token === token) {
      req.content = content;
      return next();
    }

    if (req.student) {
      const enrollmentCheck = await pool.query(
        `SELECT sce.* FROM student_course_enrollments sce
         JOIN course_goals cg ON sce.goal_id = cg.id
         JOIN course_modules cm ON cm.goal_id = cg.id
         JOIN course_topics ct ON ct.module_id = cm.id
         JOIN course_subtopics cs ON cs.topic_id = ct.id
         JOIN subtopic_content sc ON sc.subtopic_id = cs.id
         WHERE sce.student_id = $1 AND sc.content_uuid = $2`,
        [req.student.id, contentUuid]
      );

      if (enrollmentCheck.rows.length > 0) {
        req.content = content;
        return next();
      }
    }

    return res.status(403).json({
      success: false,
      message: "You do not have access to this content",
    });

  } catch (error) {
    console.error("Content access verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying content access",
      error: error.message,
    });
  }
};

const generateSecureUrl = (baseUrl, contentUuid, accessToken) => {
  return `${baseUrl}/api/content/${contentUuid}/stream?token=${accessToken}`;
};

module.exports = {
  verifyContentAccess,
  generateSecureUrl,
};