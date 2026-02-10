// StudentCoursePlayer.jsx - Updated for secure access
const StudentCoursePlayer = () => {
    // ... existing code ...
    
    const fetchSecureContent = async (contentUuid) => {
        try {
            const res = await fetch(`/api/content/${contentUuid}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await res.json();
            
            if (data.success) {
                // Use secure URLs from response
                switch (data.data.type) {
                    case 'video':
                        setVideoUrl(data.data.secureUrls.view);
                        break;
                    case 'cheatsheet':
                        setCheatsheetData(data.data.cheatsheet);
                        break;
                    case 'mcq':
                        setQuizData(data.data.quiz);
                        break;
                }
            }
        } catch (error) {
            console.error('Error fetching secure content:', error);
        }
    };
    
    // Secure video player component
    const SecureVideoPlayer = ({ videoUrl }) => {
        return (
            <div className="relative">
                <ReactPlayer
                    url={videoUrl}
                    controls
                    width="100%"
                    height="500px"
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload'
                            },
                            forceVideo: true
                        }
                    }}
                />
                {/* Watermark overlay */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                    Secure Streaming
                </div>
            </div>
        );
    };
    
    // ... rest of the component ...
};