import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Plus, 
  Video, 
  FileText, 
  HelpCircle,
  Edit,
  Trash2,
  FolderOpen,
  File,
  Upload
} from 'lucide-react';
import VideoUploadModal from '../components/admin/VideoUploadModal';
import CheatsheetEditor from '../components/admin/CheatsheetEditor';
import MCQCreator from '../components/admin/MCQCreator';

const CourseManagement = () => {
  const [goals, setGoals] = useState([]);
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [content, setContent] = useState([]);
  
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCheatsheetModal, setShowCheatsheetModal] = useState(false);
  const [showMCQModal, setShowMCQModal] = useState(false);
  
  const [newGoalName, setNewGoalName] = useState('');
  const [newModuleName, setNewModuleName] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newSubtopicName, setNewSubtopicName] = useState('');

  // Fetch goals on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/admin/course/goals');
      const data = await res.json();
      setGoals(data.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchModules = async (goalId) => {
    try {
      const res = await fetch(`/api/admin/course/goals/${goalId}/modules`);
      const data = await res.json();
      setModules(data.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const fetchTopics = async (moduleId) => {
    try {
      const res = await fetch(`/api/admin/course/modules/${moduleId}/topics`);
      const data = await res.json();
      setTopics(data.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const fetchSubtopics = async (topicId) => {
    try {
      const res = await fetch(`/api/admin/course/topics/${topicId}/subtopics`);
      const data = await res.json();
      setSubtopics(data.data);
    } catch (error) {
      console.error('Error fetching subtopics:', error);
    }
  };

  const fetchContent = async (subtopicId) => {
    try {
      const res = await fetch(`/api/admin/course/subtopics/${subtopicId}/content`);
      const data = await res.json();
      setContent(data.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setSelectedModule(null);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    fetchModules(goal.id);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    fetchTopics(module.id);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    fetchSubtopics(topic.id);
  };

  const handleSubtopicSelect = (subtopic) => {
    setSelectedSubtopic(subtopic);
    fetchContent(subtopic.id);
  };

  const createGoal = async () => {
    if (!newGoalName.trim()) return;
    
    try {
      const res = await fetch('/api/admin/course/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newGoalName,
          description: 'New goal description',
          duration_months: 2,
          certificate_name: `${newGoalName} Certificate`
        })
      });
      const data = await res.json();
      if (data.success) {
        setGoals([...goals, data.data]);
        setNewGoalName('');
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const createModule = async () => {
    if (!newModuleName.trim() || !selectedGoal) return;
    
    try {
      const res = await fetch('/api/admin/course/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          goal_id: selectedGoal.id,
          name: newModuleName,
          description: 'New module description'
        })
      });
      const data = await res.json();
      if (data.success) {
        setModules([...modules, data.data]);
        setNewModuleName('');
      }
    } catch (error) {
      console.error('Error creating module:', error);
    }
  };

  const createTopic = async () => {
    if (!newTopicName.trim() || !selectedModule) return;
    
    try {
      const res = await fetch('/api/admin/course/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          module_id: selectedModule.id,
          name: newTopicName,
          description: 'New topic description'
        })
      });
      const data = await res.json();
      if (data.success) {
        setTopics([...topics, data.data]);
        setNewTopicName('');
      }
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  const createSubtopic = async () => {
    if (!newSubtopicName.trim() || !selectedTopic) return;
    
    try {
      const res = await fetch('/api/admin/course/subtopics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic_id: selectedTopic.id,
          name: newSubtopicName,
          description: 'New subtopic description'
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubtopics([...subtopics, data.data]);
        setNewSubtopicName('');
      }
    } catch (error) {
      console.error('Error creating subtopic:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Manage your digital marketing course hierarchy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Hierarchy */}
        <div className="lg:col-span-1 space-y-4">
          {/* Goals Section */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Goals</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  placeholder="New goal name"
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
                <button 
                  onClick={createGoal}
                  className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedGoal?.id === goal.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleGoalSelect(goal)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FolderOpen className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{goal.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Modules Section (visible when goal selected) */}
          {selectedGoal && (
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Modules</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newModuleName}
                    onChange={(e) => setNewModuleName(e.target.value)}
                    placeholder="New module"
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <button 
                    onClick={createModule}
                    className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {modules.map(module => (
                  <div
                    key={module.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedModule?.id === module.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleModuleSelect(module)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FolderOpen className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium">{module.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics Section (visible when module selected) */}
          {selectedModule && (
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Topics</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    placeholder="New topic"
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <button 
                    onClick={createTopic}
                    className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {topics.map(topic => (
                  <div
                    key={topic.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTopic?.id === topic.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleTopicSelect(topic)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="w-4 h-4 mr-2 text-purple-500" />
                        <span className="font-medium">{topic.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subtopics Section (visible when topic selected) */}
          {selectedTopic && (
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Subtopics</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSubtopicName}
                    onChange={(e) => setNewSubtopicName(e.target.value)}
                    placeholder="New subtopic"
                    className="flex-1 border rounded px-2 py-1 text-sm"
                  />
                  <button 
                    onClick={createSubtopic}
                    className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                {subtopics.map(subtopic => (
                  <div
                    key={subtopic.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedSubtopic?.id === subtopic.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSubtopicSelect(subtopic)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <File className="w-4 h-4 mr-2 text-yellow-500" />
                        <span className="font-medium">{subtopic.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          {selectedSubtopic ? (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                    <span className="font-medium text-blue-600">{selectedGoal?.name}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-medium text-green-600">{selectedModule?.name}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-medium text-purple-600">{selectedTopic?.name}</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="font-medium text-yellow-600">{selectedSubtopic?.name}</span>
                  </div>
                  <h2 className="text-2xl font-bold">{selectedSubtopic.name}</h2>
                  <p className="text-gray-600">{selectedSubtopic.description}</p>
                </div>
              </div>

              {/* Content Management Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Content for this Subtopic</h3>
                
                {/* Add Content Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition"
                  >
                    <Video className="w-8 h-8 mb-2" />
                    <span className="font-medium">Upload Video</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowCheatsheetModal(true)}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition"
                  >
                    <FileText className="w-8 h-8 mb-2" />
                    <span className="font-medium">Create Cheatsheet</span>
                  </button>
                  
                  <button 
                    onClick={() => setShowMCQModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg flex flex-col items-center justify-center hover:opacity-90 transition"
                  >
                    <HelpCircle className="w-8 h-8 mb-2" />
                    <span className="font-medium">Create MCQ Quiz</span>
                  </button>
                </div>

                {/* Existing Content List */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-700">Existing Content:</h4>
                  {content.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No content added yet. Use buttons above to add content.</p>
                    </div>
                  ) : (
                    content.map(item => (
                      <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {item.content_type === 'video' && (
                              <Video className="w-5 h-5 mr-3 text-red-500" />
                            )}
                            {item.content_type === 'cheatsheet' && (
                              <FileText className="w-5 h-5 mr-3 text-green-500" />
                            )}
                            {item.content_type === 'mcq' && (
                              <HelpCircle className="w-5 h-5 mr-3 text-purple-500" />
                            )}
                            <div>
                              <p className="font-medium">
                                {item.video_title || item.cheatsheet_title || item.mcq_title}
                              </p>
                              <p className="text-sm text-gray-500 capitalize">
                                {item.content_type} • Created on {new Date(item.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <FolderOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select a Subtopic</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Navigate through the hierarchy on the left: Goals → Modules → Topics → Subtopics
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Once you select a subtopic, you can add videos, cheatsheets, and quizzes.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showVideoModal && (
        <VideoUploadModal 
          subtopicId={selectedSubtopic?.id}
          onClose={() => setShowVideoModal(false)}
          onSuccess={() => {
            setShowVideoModal(false);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}

      {showCheatsheetModal && (
        <CheatsheetEditor 
          subtopicId={selectedSubtopic?.id}
          onClose={() => setShowCheatsheetModal(false)}
          onSuccess={() => {
            setShowCheatsheetModal(false);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}

      {showMCQModal && (
        <MCQCreator 
          subtopicId={selectedSubtopic?.id}
          onClose={() => setShowMCQModal(false)}
          onSuccess={() => {
            setShowMCQModal(false);
            fetchContent(selectedSubtopic.id);
          }}
        />
      )}
    </div>
  );
};

export default CourseManagement;