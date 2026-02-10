import React, { useState } from 'react';
import { X, Upload, Clock, Video } from 'lucide-react';

const VideoUploadModal = ({ subtopicId, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB
        alert('File size must be less than 500MB');
        return;
      }
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !videoFile) {
      alert('Please provide title and select a video file');
      return;
    }

    setUploading(true);
    // Simulate progress
    const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
    }, 500);

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('duration', duration); // Optional

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/admin/course/subtopics/${subtopicId}/video`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        onSuccess();
      }, 500);
      
    } catch (error) {
      clearInterval(interval);
      console.error('Upload error:', error);
      alert('Failed to upload video');
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800">Upload Video Lesson</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g., Introduction to SEO"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Brief summary of this lesson..."
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (minutes)</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="e.g., 15"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer relative">
             <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
             />
             {videoFile ? (
                <div className="space-y-2">
                   <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Video className="w-8 h-8"/>
                   </div>
                   <p className="font-medium text-gray-900">{videoFile.name}</p>
                   <p className="text-sm text-gray-500">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
             ) : (
                <>
                   <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                   <p className="font-medium text-gray-700">Drop video file here or click to browse</p>
                   <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI up to 500MB</p>
                </>
             )}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-gray-700">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !title || !videoFile}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {uploading ? 'Processing...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadModal;