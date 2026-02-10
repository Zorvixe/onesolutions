// middleware/secureContent.js
const { Pool } = require("pg");

// Database pool for digital marketing
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

exports.verifyContentAccess = async (req, res, next) => {
    try {
        const { contentUuid } = req.params;
        const { token } = req.query;
        
        const contentResult = await pool.query(
            `SELECT sc.*, cm.goal_id 
             FROM subtopic_content sc
             JOIN course_subtopics cs ON sc.subtopic_id = cs.id
             JOIN course_topics ct ON cs.topic_id = ct.id
             JOIN course_modules cm ON ct.module_id = cm.id
             WHERE sc.content_uuid = $1`,
            [contentUuid]
        );

        if (contentResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }

        const content = contentResult.rows[0];
        req.content = content;

        // Strategy A: Bearer Token
        if (req.headers.authorization) {
            next();
            return;
        }

        // Strategy B: Temporary Access Token
        if (token) {
            if (content.access_token === token) {
                next();
                return;
            }
        }

        return res.status(403).json({ success: false, message: 'Access denied' });

    } catch (error) {
        console.error('Content verification error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.generateSecureUrl = (contentUuid, accessToken = null, type = 'view') => {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5002'; 
    let url = `${baseUrl}/api/content/${contentUuid}`;
    
    if (accessToken && (type === 'stream' || type === 'download')) {
        url += `/${type}?token=${accessToken}`;
    }
    
    return url;
};