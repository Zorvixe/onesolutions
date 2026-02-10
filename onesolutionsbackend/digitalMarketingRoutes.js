// Add this to your existing backend
const express = require('express');
const { Pool } = require("pg");
const { verifyContentAccess, generateSecureUrl } = require('.middleware/secureContent');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Configure upload for videos
const uploadDirDigital = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDirDigital)) {
  fs.mkdirSync(uploadDirDigital, { recursive: true });
}

const videoStorageDigital = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirDigital);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, "video-" + uniqueName);
  },
});

const videoUploadDigital = multer({
  storage: videoStorageDigital,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed!"), false);
    }
  },
});

// ========================================
// ADMIN COURSE MANAGEMENT APIs
// ========================================

// 1. GET all goals
app.get('/api/admin/course/goals', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM course_goals ORDER BY order_number'
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. CREATE goal
app.post('/api/admin/course/goals', async (req, res) => {
    try {
        const { name, description, duration_months, certificate_name } = req.body;
        const result = await pool.query(
            `INSERT INTO course_goals (name, description, duration_months, certificate_name, order_number)
             VALUES ($1, $2, $3, $4, (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_goals))
             RETURNING *`,
            [name, description, duration_months, certificate_name]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. GET modules by goal
app.get('/api/admin/course/goals/:goalId/modules', async (req, res) => {
    try {
        const { goalId } = req.params;
        const result = await pool.query(
            'SELECT * FROM course_modules WHERE goal_id = $1 ORDER BY order_number',
            [goalId]
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. CREATE module
app.post('/api/admin/course/modules', async (req, res) => {
    try {
        const { goal_id, name, description } = req.body;
        const result = await pool.query(
            `INSERT INTO course_modules (goal_id, name, description, order_number)
             VALUES ($1, $2, $3, 
                (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_modules WHERE goal_id = $1)
             ) RETURNING *`,
            [goal_id, name, description]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. GET topics by module
app.get('/api/admin/course/modules/:moduleId/topics', async (req, res) => {
    try {
        const { moduleId } = req.params;
        const result = await pool.query(
            'SELECT * FROM course_topics WHERE module_id = $1 ORDER BY order_number',
            [moduleId]
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 6. CREATE topic
app.post('/api/admin/course/topics', async (req, res) => {
    try {
        const { module_id, name, description } = req.body;
        const result = await pool.query(
            `INSERT INTO course_topics (module_id, name, description, order_number)
             VALUES ($1, $2, $3,
                (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_topics WHERE module_id = $1)
             ) RETURNING *`,
            [module_id, name, description]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 7. GET subtopics by topic
app.get('/api/admin/course/topics/:topicId/subtopics', async (req, res) => {
    try {
        const { topicId } = req.params;
        const result = await pool.query(
            'SELECT * FROM course_subtopics WHERE topic_id = $1 ORDER BY order_number',
            [topicId]
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 8. CREATE subtopic
app.post('/api/admin/course/subtopics', async (req, res) => {
    try {
        const { topic_id, name, description } = req.body;
        const result = await pool.query(
            `INSERT INTO course_subtopics (topic_id, name, description, order_number)
             VALUES ($1, $2, $3,
                (SELECT COALESCE(MAX(order_number), 0) + 1 FROM course_subtopics WHERE topic_id = $1)
             ) RETURNING *`,
            [topic_id, name, description]
        );
        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 9. GET content by subtopic
app.get('/api/admin/course/subtopics/:subtopicId/content', async (req, res) => {
    try {
        const { subtopicId } = req.params;
        const result = await pool.query(
            'SELECT * FROM subtopic_content WHERE subtopic_id = $1 ORDER BY created_at DESC',
            [subtopicId]
        );
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 10. UPLOAD VIDEO for subtopic
app.post('/api/admin/course/subtopics/:subtopicId/video', videoUpload.single('video'), async (req, res) => {
    try {
        const { subtopicId } = req.params;
        const { title, description, duration } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Video file is required' });
        }
        
        const videoUrl = `/uploads/videos/${req.file.filename}`;
        
        const contentUuid = crypto.randomUUID();
        const accessToken = crypto.randomUUID();
        
        const result = await pool.query(
            `INSERT INTO subtopic_content 
             (subtopic_id, content_type, content_uuid, access_token,
              video_title, video_url, video_description, video_duration, video_type)
             VALUES ($1, 'video', $2, $3, $4, $5, $6, $7, 'uploaded') 
             RETURNING *`,
            [subtopicId, contentUuid, accessToken, title, videoUrl, description, duration || 0]
        );
        
        const content = result.rows[0];
        
        res.json({ 
            success: true, 
            data: {
                ...content,
                secureUrls: {
                    view: generateSecureUrl(content.content_uuid),
                    stream: generateSecureUrl(content.content_uuid, content.access_token, 'stream')
                }
            }
        });    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 11. CREATE CHEATSHEET (Rich Text)
app.post('/api/admin/course/subtopics/:subtopicId/cheatsheet', async (req, res) => {
    try {
        const { subtopicId } = req.params;
        const { title, content } = req.body;
        
        const contentUuid = crypto.randomUUID();
        const accessToken = crypto.randomUUID();
        
        const result = await pool.query(
            `INSERT INTO subtopic_content 
             (subtopic_id, content_type, content_uuid, access_token,
              cheatsheet_title, cheatsheet_content)
             VALUES ($1, 'cheatsheet', $2, $3, $4, $5) 
             RETURNING *`,
            [subtopicId, contentUuid, accessToken, title, content]
        );
        
        const contentItem = result.rows[0];
        
        res.json({ 
            success: true, 
            data: {
                ...contentItem,
                secureUrls: {
                    view: generateSecureUrl(contentItem.content_uuid),
                    download: generateSecureUrl(contentItem.content_uuid, contentItem.access_token, 'download')
                }
            }
        });    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 12. CREATE MCQ
app.post('/api/admin/course/subtopics/:subtopicId/mcq', async (req, res) => {
    try {
        const { subtopicId } = req.params;
        const { title, questions } = req.body;
        
        // Validate questions structure
        const validatedQuestions = questions.map(q => ({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || ''
        }));
        
        
        const contentUuid = crypto.randomUUID();
        const accessToken = crypto.randomUUID();
        
        const result = await pool.query(
            `INSERT INTO subtopic_content 
             (subtopic_id, content_type, content_uuid, access_token,
              mcq_title, questions)
             VALUES ($1, 'mcq', $2, $3, $4, $5) 
             RETURNING *`,
            [subtopicId, contentUuid, accessToken, title, JSON.stringify(validatedQuestions)]
        );
        
        const contentItem = result.rows[0];
        
        res.json({ 
            success: true, 
            data: {
                ...contentItem,
                secureUrls: {
                    view: generateSecureUrl(contentItem.content_uuid)
                }
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// ========================================
// STUDENT PORTAL APIs
// ========================================

// 1. GET available courses for student
app.get('/api/student/courses', async (req, res) => {
    try {
        const studentId = req.user.id; // From auth middleware
        
        // Get all goals with enrollment status
        const goalsResult = await pool.query(
            `SELECT cg.*, 
                    sce.enrolled_at,
                    sce.completed_at,
                    sce.status as enrollment_status,
                    sce.progress_percentage
             FROM course_goals cg
             LEFT JOIN student_course_enrollments sce 
                    ON cg.id = sce.goal_id AND sce.student_id = $1
             WHERE cg.is_active = true
             ORDER BY cg.order_number`,
            [studentId]
        );
        
        res.json({ success: true, data: goalsResult.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. ENROLL in a goal
app.post('/api/student/courses/enroll/:goalId', async (req, res) => {
    try {
        const studentId = req.user.id;
        const { goalId } = req.params;
        
        const result = await pool.query(
            `INSERT INTO student_course_enrollments (student_id, goal_id)
             VALUES ($1, $2)
             ON CONFLICT (student_id, goal_id) DO NOTHING
             RETURNING *`,
            [studentId, goalId]
        );
        
        res.json({ 
            success: true, 
            message: 'Enrolled successfully',
            data: result.rows[0] 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 3. GET goal content with progress
app.get('/api/student/courses/goal/:goalId', async (req, res) => {
    try {
        const studentId = req.user.id;
        const { goalId } = req.params;
        
        // Get goal details
        const goalResult = await pool.query(
            'SELECT * FROM course_goals WHERE id = $1',
            [goalId]
        );
        
        if (goalResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Goal not found' });
        }
        
        // Get all modules with topics and subtopics
        const modulesResult = await pool.query(
            `SELECT cm.*,
                    json_agg(
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
                                        'content', (
                                            SELECT json_agg(
                                                json_build_object(
                                                    'id', sc.id,
                                                    'content_type', sc.content_type,
                                                    'video_title', sc.video_title,
                                                    'video_url', sc.video_url,
                                                    'cheatsheet_title', sc.cheatsheet_title,
                                                    'cheatsheet_content', sc.cheatsheet_content,
                                                    'mcq_title', sc.mcq_title,
                                                    'questions', sc.questions,
                                                    'progress', scp.status
                                                )
                                            )
                                            FROM subtopic_content sc
                                            LEFT JOIN student_course_progress scp 
                                                ON sc.id = scp.content_id AND scp.student_id = $1
                                            WHERE sc.subtopic_id = cs.id
                                        )
                                    )
                                )
                                FROM course_subtopics cs
                                WHERE cs.topic_id = ct.id
                                ORDER BY cs.order_number
                            )
                        )
                    ) as topics
             FROM course_modules cm
             LEFT JOIN course_topics ct ON cm.id = ct.module_id
             WHERE cm.goal_id = $2
             GROUP BY cm.id
             ORDER BY cm.order_number`,
            [studentId, goalId]
        );
        
        res.json({ 
            success: true, 
            data: {
                goal: goalResult.rows[0],
                modules: modulesResult.rows
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. MARK CONTENT AS COMPLETED
app.post('/api/student/courses/content/complete', async (req, res) => {
    try {
        const studentId = req.user.id;
        const { content_id, goal_id, module_id, subtopic_id, quiz_score } = req.body;
        
        // Update or insert progress
        const result = await pool.query(
            `INSERT INTO student_course_progress 
             (student_id, goal_id, module_id, subtopic_id, content_id, status, completed_at, quiz_score)
             VALUES ($1, $2, $3, $4, $5, 'completed', CURRENT_TIMESTAMP, $6)
             ON CONFLICT (student_id, content_id) 
             DO UPDATE SET status = 'completed', completed_at = CURRENT_TIMESTAMP, quiz_score = $6
             RETURNING *`,
            [studentId, goal_id, module_id, subtopic_id, content_id, quiz_score || null]
        );
        
        // Update overall progress percentage
        await updateGoalProgress(studentId, goal_id);
        
        res.json({ 
            success: true, 
            message: 'Progress updated',
            data: result.rows[0] 
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



// 1. Get content by UUID (with access control)
app.get('/api/content/:contentUuid', verifyContentAccess, async (req, res) => {
    try {
        const content = req.content;
        
        // Return content based on type
        const response = {
            success: true,
            data: {
                id: content.id,
                uuid: content.content_uuid,
                type: content.content_type,
                title: content.video_title || content.cheatsheet_title || content.mcq_title,
                description: content.video_description,
                createdAt: content.created_at,
                secureUrls: {
                    view: generateSecureUrl(content.content_uuid),
                    download: content.content_type === 'cheatsheet' 
                        ? generateSecureUrl(content.content_uuid, content.access_token, 'download')
                        : null
                }
            }
        };

        // Add type-specific data
        switch (content.content_type) {
            case 'video':
                response.data.video = {
                    url: generateSecureUrl(content.content_uuid, content.access_token, 'stream'),
                    duration: content.video_duration,
                    thumbnail: content.thumbnail_url
                };
                break;
                
            case 'cheatsheet':
                response.data.cheatsheet = {
                    content: content.cheatsheet_content,
                    fileUrl: content.file_url
                };
                break;
                
            case 'mcq':
                response.data.quiz = {
                    questions: content.questions,
                    passingScore: 70
                };
                break;
        }

        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. Stream video securely
app.get('/api/content/:contentUuid/stream', verifyContentAccess, async (req, res) => {
    try {
        const content = req.content;
        
        if (content.content_type !== 'video') {
            return res.status(400).json({ 
                success: false, 
                message: 'Not a video content' 
            });
        }

        // Check if video exists
        const videoPath = path.join(__dirname, '..', content.video_url);
        if (!fs.existsSync(videoPath)) {
            return res.status(404).json({ 
                success: false, 
                message: 'Video file not found' 
            });
        }

        // Get video stats
        const stat = fs.statSync(videoPath);
        const fileSize = stat.size;
        const range = req.headers.range;

        // Handle range requests for streaming
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            
            // Create read stream
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
                'Cache-Control': 'private, max-age=31536000'
            };
            
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            // Send entire file
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
                'Cache-Control': 'private, max-age=31536000'
            };
            
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    } catch (error) {
        console.error('Video streaming error:', error);
        res.status(500).json({ success: false, error: 'Failed to stream video' });
    }
});

// 3. Download cheatsheet securely
app.get('/api/content/:contentUuid/download', verifyContentAccess, async (req, res) => {
    try {
        const content = req.content;
        
        if (content.content_type !== 'cheatsheet') {
            return res.status(400).json({ 
                success: false, 
                message: 'Not a cheatsheet' 
            });
        }

        if (!content.file_url) {
            return res.status(404).json({ 
                success: false, 
                message: 'No file available for download' 
            });
        }

        const filePath = path.join(__dirname, '..', content.file_url);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ 
                success: false, 
                message: 'File not found' 
            });
        }

        // Set download headers
        const fileName = path.basename(filePath);
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({ 
                    success: false, 
                    message: 'Failed to download file' 
                });
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. Generate secure temporary access token
app.post('/api/content/:contentUuid/generate-token', verifyContentAccess, async (req, res) => {
    try {
        const { contentUuid } = req.params;
        const { expiresIn = 3600 } = req.body; // Default 1 hour
        
        // Generate new access token
        const newToken = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        
        await pool.query(
            `UPDATE subtopic_content 
             SET access_token = $1, expires_at = $2 
             WHERE content_uuid = $3 
             RETURNING access_token, expires_at`,
            [newToken, expiresAt, contentUuid]
        );
        
        res.json({
            success: true,
            data: {
                accessToken: newToken,
                expiresAt: expiresAt,
                secureUrl: generateSecureUrl(contentUuid, newToken, 'download')
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 5. Revoke access token
app.post('/api/content/:contentUuid/revoke-token', verifyContentAccess, async (req, res) => {
    try {
        const { contentUuid } = req.params;
        
        await pool.query(
            `UPDATE subtopic_content 
             SET access_token = gen_random_uuid(), expires_at = NULL 
             WHERE content_uuid = $1`,
            [contentUuid]
        );
        
        res.json({
            success: true,
            message: 'Access token revoked successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 6. Get content analytics
app.get('/api/content/:contentUuid/analytics', verifyContentAccess, async (req, res) => {
    try {
        const { contentUuid } = req.params;
        
        const analytics = await pool.query(
            `SELECT 
                COUNT(*) as total_views,
                COUNT(DISTINCT student_id) as unique_viewers,
                MIN(accessed_at) as first_view,
                MAX(accessed_at) as last_view
             FROM content_access_logs 
             WHERE content_uuid = $1`,
            [contentUuid]
        );
        
        res.json({
            success: true,
            data: analytics.rows[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



// Helper function to update goal progress
async function updateGoalProgress(studentId, goalId) {
    // Count total content in this goal
    const totalResult = await pool.query(
        `SELECT COUNT(DISTINCT sc.id) as total
         FROM subtopic_content sc
         JOIN course_subtopics cs ON sc.subtopic_id = cs.id
         JOIN course_topics ct ON cs.topic_id = ct.id
         JOIN course_modules cm ON ct.module_id = cm.id
         WHERE cm.goal_id = $1`,
        [goalId]
    );
    
    // Count completed content by student
    const completedResult = await pool.query(
        `SELECT COUNT(DISTINCT scp.content_id) as completed
         FROM student_course_progress scp
         JOIN subtopic_content sc ON scp.content_id = sc.id
         JOIN course_subtopics cs ON sc.subtopic_id = cs.id
         JOIN course_topics ct ON cs.topic_id = ct.id
         JOIN course_modules cm ON ct.module_id = cm.id
         WHERE scp.student_id = $1 AND cm.goal_id = $2 AND scp.status = 'completed'`,
        [studentId, goalId]
    );
    
    const total = parseInt(totalResult.rows[0]?.total || 0);
    const completed = parseInt(completedResult.rows[0]?.completed || 0);
    const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Update enrollment progress
    await pool.query(
        `UPDATE student_course_enrollments 
         SET progress_percentage = $1,
             updated_at = CURRENT_TIMESTAMP,
             completed_at = CASE WHEN $1 = 100 THEN CURRENT_TIMESTAMP ELSE completed_at END,
             status = CASE WHEN $1 = 100 THEN 'completed' ELSE status END
         WHERE student_id = $2 AND goal_id = $3`,
        [progressPercentage, studentId, goalId]
    );
    
    return progressPercentage;
}

module.exports = app;