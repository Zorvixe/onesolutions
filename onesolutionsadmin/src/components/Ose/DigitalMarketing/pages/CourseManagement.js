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
  Upload,
  Layout
} from 'lucide-react';
import VideoUploadModal from './VideoUploadModal';
import CheatsheetEditor from './CheatsheetEditor';
import MCQCreator from './MCQCreator';

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

  // Authentication Token
  const getToken = () => localStorage.getItem('token');

  // Fetch goals on mount
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/admin/course/goals', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setGoals(data.data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const fetchModules = async (goalId) => {
    try {
      const res = await fetch(`/api/admin/course/goals/${goalId}/modules`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setModules(data.data || []);
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  const fetchTopics = async (moduleId) => {
    try {
      const res = await fetch(`/api/admin/course/modules/${moduleId}/topics`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setTopics(data.data || []);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const fetchSubtopics = async (topicId) => {
    try {
      const res = await fetch(`/api/admin/course/topics/${topicId}/subtopics`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setSubtopics(data.data || []);
    } catch (error) {
      console.error('Error fetching subtopics:', error);
    }
  };

  const fetchContent = async (subtopicId) => {
    try {
      const res = await fetch(`/api/admin/course/subtopics/${subtopicId}/content`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setContent(data.data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  // Selection Handlers
  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setSelectedModule(null);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setModules([]);
    setTopics([]);
    setSubtopics([]);
    fetchModules(goal.id);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setTopics([]);
    setSubtopics([]);
    fetchTopics(module.id);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    setSubtopics([]);
    fetchSubtopics(topic.id);
  };

  const handleSubtopicSelect = (subtopic) => {
    setSelectedSubtopic(subtopic);
    fetchContent(subtopic.id);
  };

  // Creation Handlers
  const createGoal = async () => {
    if (!newGoalName.trim()) return;
    try {
      const res = await fetch('/api/admin/course/goals', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ 
          name: newGoalName,
          description: 'New goal',
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
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ 
          goal_id: selectedGoal.id,
          name: newModuleName,
          description: 'New module'
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
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ 
          module_id: selectedModule.id,
          name: newTopicName,
          description: 'New topic'
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
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ 
          topic_id: selectedTopic.id,
          name: newSubtopicName,
          description: 'New subtopic'
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
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Content Manager</h1>
          <p className="text-gray-500 mt-1">Organize your digital marketing curriculum hierarchy</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        
        {/* Level 1: Goals */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-4 border-b bg-gray-50 rounded-t-xl">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><Layout className="w-4 h-4 mr-2"/> Goals</h3>
            <div className="flex gap-1">
              <input 
                value={newGoalName}
                onChange={e => setNewGoalName(e.target.value)}
                placeholder="Add Goal..."
                className="flex-1 text-sm border rounded px-2 py-1"
              />
              <button onClick={createGoal} className="bg-blue-600 text-white p-1 rounded"><Plus className="w-4 h-4"/></button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {goals.map(goal => (
              <div 
                key={goal.id}
                onClick={() => handleGoalSelect(goal)}
                className={`p-3 rounded-lg cursor-pointer text-sm font-medium flex justify-between items-center ${selectedGoal?.id === goal.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                {goal.name}
                <ChevronRight className="w-4 h-4 opacity-50"/>
              </div>
            ))}
          </div>
        </div>

        {/* Level 2: Modules (Conditional) */}
        {selectedGoal && (
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col animation-fade-in">
            <div className="p-4 border-b bg-gray-50 rounded-t-xl">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><FolderOpen className="w-4 h-4 mr-2"/> Modules</h3>
              <div className="flex gap-1">
                <input 
                  value={newModuleName}
                  onChange={e => setNewModuleName(e.target.value)}
                  placeholder="Add Module..."
                  className="flex-1 text-sm border rounded px-2 py-1"
                />
                <button onClick={createModule} className="bg-green-600 text-white p-1 rounded"><Plus className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {modules.map(module => (
                <div 
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className={`p-3 rounded-lg cursor-pointer text-sm font-medium flex justify-between items-center ${selectedModule?.id === module.id ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  {module.name}
                  <ChevronRight className="w-4 h-4 opacity-50"/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level 3: Topics (Conditional) */}
        {selectedModule && (
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col animation-fade-in">
            <div className="p-4 border-b bg-gray-50 rounded-t-xl">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><File className="w-4 h-4 mr-2"/> Topics</h3>
              <div className="flex gap-1">
                <input 
                  value={newTopicName}
                  onChange={e => setNewTopicName(e.target.value)}
                  placeholder="Add Topic..."
                  className="flex-1 text-sm border rounded px-2 py-1"
                />
                <button onClick={createTopic} className="bg-purple-600 text-white p-1 rounded"><Plus className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {topics.map(topic => (
                <div 
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className={`p-3 rounded-lg cursor-pointer text-sm font-medium flex justify-between items-center ${selectedTopic?.id === topic.id ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  {topic.name}
                  <ChevronRight className="w-4 h-4 opacity-50"/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level 4: Subtopics (Conditional) */}
        {selectedTopic && (
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col animation-fade-in">
             <div className="p-4 border-b bg-gray-50 rounded-t-xl">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center"><FileText className="w-4 h-4 mr-2"/> Subtopics</h3>
              <div className="flex gap-1">
                <input 
                  value={newSubtopicName}
                  onChange={e => setNewSubtopicName(e.target.value)}
                  placeholder="Add Subtopic..."
                  className="flex-1 text-sm border rounded px-2 py-1"
                />
                <button onClick={createSubtopic} className="bg-orange-600 text-white p-1 rounded"><Plus className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {subtopics.map(subtopic => (
                <div 
                  key={subtopic.id}
                  onClick={() => handleSubtopicSelect(subtopic)}
                  className={`p-3 rounded-lg cursor-pointer text-sm font-medium flex justify-between items-center ${selectedSubtopic?.id === subtopic.id ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  {subtopic.name}
                  <ChevronRight className="w-4 h-4 opacity-50"/>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
          {selectedSubtopic ? (
            <>
              <div className="p-6 border-b">
                 <div className="text-xs text-gray-500 mb-2 flex items-center gap-1 flex-wrap">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{selectedGoal.name}</span> / 
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">{selectedModule.name}</span> / 
                    <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded">{selectedTopic.name}</span>
                 </div>
                 <h2 className="text-xl font-bold text-gray-900">{selectedSubtopic.name}</h2>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                 <div className="grid grid-cols-3 gap-3 mb-6">
                    <button onClick={() => setShowVideoModal(true)} className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition border border-red-100">
                        <Video className="w-6 h-6 mb-2"/>
                        <span className="text-xs font-bold">Add Video</span>
                    </button>
                    <button onClick={() => setShowCheatsheetModal(true)} className="flex flex-col items-center justify-center p-4 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition border border-green-100">
                        <FileText className="w-6 h-6 mb-2"/>
                        <span className="text-xs font-bold">Add Cheatsheet</span>
                    </button>
                    <button onClick={() => setShowMCQModal(true)} className="flex flex-col items-center justify-center p-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition border border-purple-100">
                        <HelpCircle className="w-6 h-6 mb-2"/>
                        <span className="text-xs font-bold">Add Quiz</span>
                    </button>
                 </div>

                 <h3 className="font-semibold text-gray-700 mb-3">Existing Content</h3>
                 <div className="space-y-3">
                    {content.length === 0 && <p className="text-gray-400 text-sm text-center py-4">No content added yet.</p>}
                    {content.map(item => (
                        <div key={item.id} className="flex items-center p-3 border rounded-lg hover:shadow-sm transition bg-white">
                            {item.content_type === 'video' && <Video className="w-5 h-5 text-red-500 mr-3"/>}
                            {item.content_type === 'cheatsheet' && <FileText className="w-5 h-5 text-green-500 mr-3"/>}
                            {item.content_type === 'mcq' && <HelpCircle className="w-5 h-5 text-purple-500 mr-3"/>}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{item.video_title || item.cheatsheet_title || item.mcq_title}</p>
                                <p className="text-xs text-gray-500 capitalize">{item.content_type}</p>
                            </div>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4"/></button>
                        </div>
                    ))}
                 </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                <Layout className="w-16 h-16 mb-4 opacity-20"/>
                <p>Select a subtopic from the navigation to manage content.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showVideoModal && selectedSubtopic && (
        <VideoUploadModal 
            subtopicId={selectedSubtopic.id}
            onClose={() => setShowVideoModal(false)}
            onSuccess={() => {
                setShowVideoModal(false);
                fetchContent(selectedSubtopic.id);
            }}
        />
      )}
      
      {showCheatsheetModal && selectedSubtopic && (
        <CheatsheetEditor 
            subtopicId={selectedSubtopic.id}
            onClose={() => setShowCheatsheetModal(false)}
            onSuccess={() => {
                setShowCheatsheetModal(false);
                fetchContent(selectedSubtopic.id);
            }}
        />
      )}

      {showMCQModal && selectedSubtopic && (
        <MCQCreator 
            subtopicId={selectedSubtopic.id}
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