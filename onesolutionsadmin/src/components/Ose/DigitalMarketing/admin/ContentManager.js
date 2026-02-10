const ContentManager = ({ subtopic }) => {
    // ... existing code ...
    
    const getSecureUrl = (content) => {
        switch (content.content_type) {
            case 'video':
                return `/api/content/${content.content_uuid}/stream`;
            case 'cheatsheet':
                return `/api/content/${content.content_uuid}`;
            case 'mcq':
                return `/api/content/${content.content_uuid}`;
            default:
                return '#';
        }
    };
    
    const handleCopySecureUrl = (content) => {
        const secureUrl = `${window.location.origin}/api/content/${content.content_uuid}`;
        navigator.clipboard.writeText(secureUrl)
            .then(() => alert('Secure URL copied to clipboard!'))
            .catch(err => console.error('Copy failed:', err));
    };
    
    const generateTemporaryLink = async (content) => {
        try {
            const res = await fetch(`/api/content/${content.content_uuid}/generate-token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expiresIn: 86400 }) // 24 hours
            });
            const data = await res.json();
            if (data.success) {
                alert(`Temporary link generated! Expires at: ${new Date(data.data.expiresAt).toLocaleString()}`);
                console.log('Secure URL:', data.data.secureUrl);
            }
        } catch (error) {
            console.error('Error generating temporary link:', error);
        }
    };
    
    return (
        <div className="content-manager">
            {/* ... existing code ... */}
            
            {/* Content List with Secure URLs */}
            {content.map(item => (
                <div key={item.id} className="content-item border rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {item.content_type === 'video' && <Video className="w-5 h-5 mr-3 text-red-500" />}
                            {item.content_type === 'cheatsheet' && <FileText className="w-5 h-5 mr-3 text-green-500" />}
                            {item.content_type === 'mcq' && <HelpCircle className="w-5 h-5 mr-3 text-purple-500" />}
                            <div>
                                <p className="font-medium">
                                    {item.video_title || item.cheatsheet_title || item.mcq_title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    UUID: {item.content_uuid?.substring(0, 8)}...
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            {/* Secure URL Actions */}
                            <button 
                                onClick={() => handleCopySecureUrl(item)}
                                className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
                                title="Copy secure URL"
                            >
                                Copy URL
                            </button>
                            
                            {item.content_type === 'cheatsheet' && (
                                <button 
                                    onClick={() => generateTemporaryLink(item)}
                                    className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm hover:bg-green-200"
                                    title="Generate temporary download link"
                                >
                                    Temp Link
                                </button>
                            )}
                            
                            <button 
                                onClick={() => viewContent(item)}
                                className="px-3 py-1 bg-purple-100 text-purple-600 rounded text-sm hover:bg-purple-200"
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};