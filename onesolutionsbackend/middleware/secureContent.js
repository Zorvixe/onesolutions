// middleware/secureContent.js
const { Pool } = require("pg");

// Middleware to verify content access
const verifyContentAccess = async (req, res, next) => {
    try {
        const { contentUuid, accessToken } = req.params;
        
        if (!contentUuid) {
            return res.status(400).json({ 
                success: false, 
                message: 'Content UUID is required' 
            });
        }

        // Check if content exists and is accessible
        const contentResult = await pool.query(
            `SELECT sc.*, 
                    cs.topic_id,
                    ct.module_id,
                    cm.goal_id,
                    sc.is_public,
                    sc.expires_at,
                    sc.access_token
             FROM subtopic_content sc
             JOIN course_subtopics cs ON sc.subtopic_id = cs.id
             JOIN course_topics ct ON cs.topic_id = ct.id
             JOIN course_modules cm ON ct.module_id = cm.id
             WHERE sc.content_uuid = $1`,
            [contentUuid]
        );

        if (contentResult.rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'Content not found' 
            });
        }

        const content = contentResult.rows[0];

        // Check if content is expired
        if (content.expires_at && new Date(content.expires_at) < new Date()) {
            return res.status(410).json({ 
                success: false, 
                message: 'Content has expired' 
            });
        }

        // Check access token if provided (for private content)
        if (!content.is_public) {
            const studentId = req.student?.id;
            
            if (!studentId) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Authentication required' 
                });
            }

            // Check if student is enrolled in this course
            const enrollmentCheck = await pool.query(
                `SELECT 1 FROM student_course_enrollments 
                 WHERE student_id = $1 AND goal_id = $2`,
                [studentId, content.goal_id]
            );

            if (enrollmentCheck.rows.length === 0) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'You are not enrolled in this course' 
                });
            }

            // Verify access token for sensitive operations
            if (accessToken && content.access_token !== accessToken) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Invalid access token' 
                });
            }
        }

        // Log access
        await logContentAccess(contentUuid, req);

        req.content = content;
        next();
    } catch (error) {
        console.error('Content access verification error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

// Log content access
async function logContentAccess(contentUuid, req) {
    try {
        await pool.query(
            `INSERT INTO content_access_logs 
             (content_uuid, student_id, ip_address, user_agent, action)
             VALUES ($1, $2, $3, $4, $5)`,
            [
                contentUuid,
                req.student?.id || null,
                req.ip,
                req.headers['user-agent'],
                req.method === 'GET' ? 'view' : 'download'
            ]
        );
    } catch (error) {
        console.error('Failed to log content access:', error);
    }
}

// Generate secure URL
function generateSecureUrl(contentUuid, accessToken = null, type = 'view') {
    const baseUrl = process.env.APP_URL || 'http://localhost:5002';
    let url = `${baseUrl}/api/content/${contentUuid}`;
    
    if (accessToken && type === 'download') {
        url += `?token=${accessToken}`;
    }
    
    return url;
}

module.exports = { verifyContentAccess, generateSecureUrl };