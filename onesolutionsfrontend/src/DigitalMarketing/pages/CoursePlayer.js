import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { 
  ChevronLeft, 
  ChevronDown,
  Play, 
  CheckCircle, 
  Menu,
  X,
  BookOpen,
  FileText,
  HelpCircle,
  Download
} from 'lucide-react';

const CoursePlayer = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Navigation State
  const [currentModule, setCurrentModule] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSubtopic, setCurrentSubtopic] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  
  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState({}); // { topicId: boolean }

  // Content specific state
  const [videoUrl, setVideoUrl] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetchCourseData();
  }, [goalId]);

  const fetchCourseData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/student/courses/goal/${goalId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        setCourseData(data.data);
        
        // Initial Selection Logic: Select first available content
        if (data.data.modules?.length > 0) {
           const firstMod = data.data.modules[0];
           setCurrentModule(firstMod);
           
           if(firstMod.topics?.length > 0) {
               const firstTopic = firstMod.topics[0];
               setCurrentTopic(firstTopic);
               setExpandedTopics({ [firstTopic.id]: true });
               
               if(firstTopic.subtopics?.length > 0) {
                   const firstSub = firstTopic.subtopics[0];
                   setCurrentSubtopic(firstSub);
                   
                   if(firstSub.content?.length > 0) {
                       handleContentSelect(firstSub.content[0]);
                   }
               }
           }
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSecureContent = async (contentUuid) => {
    try {
        const token = localStorage.getItem('token');
        const res = await fetch(`/api/content/${contentUuid}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if(data.success) {
            return data.data;
        }
    } catch(err) {
        console.error("Secure content fetch failed", err);
    }
    return null;
  };

  const handleContentSelect = async (content) => {
      setCurrentContent(content);
      // Reset quiz state
      setQuizScore(0);
      setShowQuizResult(false);
      setSelectedAnswers({});
      
      if(content.content_type === 'video') {
         const secureData = await fetchSecureContent(content.content_uuid);
         if(secureData?.video?.url) {
             setVideoUrl(secureData.video.url);
         }
      } else {
         setVideoUrl(null);
      }
      
      // Auto-mark read for cheatsheets could go here
  };

  const markCompleted = async (score = null) => {
      if(!currentContent) return;
      try {
          const token = localStorage.getItem('token');
          await fetch('/api/student/courses/content/complete', {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                  content_id: currentContent.id,
                  goal_id: goalId,
                  module_id: currentModule?.id,
                  subtopic_id: currentSubtopic?.id,
                  quiz_score: score
              })
          });
          // Refresh course progress
          fetchCourseData();
      } catch (err) {
          console.error(err);
      }
  };

  const toggleTopic = (topicId) => {
      setExpandedTopics(prev => ({
          ...prev,
          [topicId]: !prev[topicId]
      }));
  };

  const renderContent = () => {
      if(!currentContent) return <div className="p-10 text-center text-gray-500">Select a lesson to begin</div>;

      switch(currentContent.content_type) {
          case 'video':
              return (
                  <div className="space-y-6 animate-fade-in">
                      <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg relative">
                          {videoUrl ? (
                              <ReactPlayer 
                                  url={videoUrl}
                                  controls={true}
                                  width="100%"
                                  height="100%"
                                  onEnded={() => markCompleted()}
                                  config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                              />
                          ) : (
                              <div className="flex items-center justify-center h-full text-white">Loading Video...</div>
                          )}
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                          <h2 className="text-2xl font-bold text-gray-900">{currentContent.video_title}</h2>
                          <p className="mt-2 text-gray-600 leading-relaxed">{currentContent.video_description || "No description available."}</p>
                      </div>
                  </div>
              );

          case 'cheatsheet':
              return (
                  <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm animate-fade-in max-w-4xl mx-auto">
                      <div className="flex justify-between items-start border-b pb-4 mb-6">
                          <div>
                              <div className="flex items-center space-x-2 text-green-600 mb-2">
                                  <FileText className="w-5 h-5"/>
                                  <span className="font-semibold uppercase tracking-wide text-xs">Reading Material</span>
                              </div>
                              <h2 className="text-3xl font-bold text-gray-900">{currentContent.cheatsheet_title}</h2>
                          </div>
                          <button 
                            onClick={() => markCompleted()}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition"
                          >
                            Mark as Read
                          </button>
                      </div>
                      <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: currentContent.cheatsheet_content }} />
                  </div>
              );

          case 'mcq':
              const questions = currentContent.questions || [];
              
              const handleQuizSubmit = () => {
                  let correct = 0;
                  questions.forEach((q, idx) => {
                      if(selectedAnswers[idx] === q.correctAnswer) correct++;
                  });
                  const score = Math.round((correct / questions.length) * 100);
                  setQuizScore(score);
                  setShowQuizResult(true);
                  markCompleted(score);
              };

              return (
                  <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                          <div className="flex items-center space-x-2 text-purple-600 mb-2">
                                <HelpCircle className="w-5 h-5"/>
                                <span className="font-semibold uppercase tracking-wide text-xs">Quiz</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-900">{currentContent.mcq_title}</h2>
                          <p className="text-gray-500 mt-1">{questions.length} Questions</p>
                      </div>

                      {showQuizResult ? (
                          <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-purple-100">
                              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                  <span className="text-3xl font-bold text-purple-600">{quizScore}%</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">{quizScore >= 70 ? 'Great Job!' : 'Keep Practicing'}</h3>
                              <p className="text-gray-600 mb-6">You answered {Math.round((quizScore/100)*questions.length)} out of {questions.length} correctly.</p>
                              <button 
                                onClick={() => { setShowQuizResult(false); setSelectedAnswers({}); }}
                                className="text-purple-600 font-medium hover:underline"
                              >
                                Retry Quiz
                              </button>
                          </div>
                      ) : (
                          <div className="space-y-6">
                              {questions.map((q, idx) => (
                                  <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                                      <h3 className="text-lg font-medium text-gray-900 mb-4">{idx + 1}. {q.question}</h3>
                                      <div className="space-y-2">
                                          {q.options.map((opt, optIdx) => (
                                              <div 
                                                key={optIdx}
                                                onClick={() => setSelectedAnswers(prev => ({...prev, [idx]: optIdx}))}
                                                className={`p-3 rounded-lg border cursor-pointer transition flex items-center ${
                                                    selectedAnswers[idx] === optIdx 
                                                    ? 'border-purple-500 bg-purple-50 text-purple-900' 
                                                    : 'border-gray-200 hover:bg-gray-50'
                                                }`}
                                              >
                                                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${selectedAnswers[idx] === optIdx ? 'border-purple-600 bg-purple-600' : 'border-gray-400'}`}>
                                                      {selectedAnswers[idx] === optIdx && <div className="w-1.5 h-1.5 bg-white rounded-full"/>}
                                                  </div>
                                                  {opt}
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ))}
                              <button 
                                onClick={handleQuizSubmit}
                                disabled={Object.keys(selectedAnswers).length < questions.length}
                                className="w-full py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                              >
                                Submit Quiz
                              </button>
                          </div>
                      )}
                  </div>
              );
              
          default: return null;
      }
  };

  if(loading) return <div className="h-screen flex items-center justify-center bg-gray-50">Loading Course...</div>;

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
        {/* Mobile Sidebar Toggle */}
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}/>

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-30 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 flex flex-col`}>
            <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <h3 className="font-bold text-gray-800 truncate" title={courseData?.goal?.name}>{courseData?.goal?.name}</h3>
                <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5"/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {courseData?.modules.map(module => (
                    <div key={module.id} className="border-b border-gray-100">
                        <div className="bg-gray-50 p-3 font-semibold text-gray-700 text-sm uppercase tracking-wider">
                            {module.name}
                        </div>
                        {module.topics?.map(topic => (
                            <div key={topic.id}>
                                <button 
                                    onClick={() => toggleTopic(topic.id)}
                                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition text-left text-sm font-medium text-gray-800"
                                >
                                    <span>{topic.name}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedTopics[topic.id] ? 'rotate-180' : ''}`}/>
                                </button>
                                
                                {expandedTopics[topic.id] && (
                                    <div className="bg-gray-50 pb-2">
                                        {topic.subtopics?.map(subtopic => (
                                            <div key={subtopic.id}>
                                                {subtopic.content?.map(content => {
                                                    const isActive = currentContent?.id === content.id;
                                                    const isCompleted = content.progress === 'completed';
                                                    
                                                    let Icon = BookOpen;
                                                    if(content.content_type === 'video') Icon = Play;
                                                    if(content.content_type === 'mcq') Icon = HelpCircle;

                                                    return (
                                                        <button
                                                            key={content.id}
                                                            onClick={() => {
                                                                setCurrentModule(module);
                                                                setCurrentTopic(topic);
                                                                setCurrentSubtopic(subtopic);
                                                                handleContentSelect(content);
                                                                if(window.innerWidth < 1024) setSidebarOpen(false);
                                                            }}
                                                            className={`w-full flex items-center pl-6 pr-3 py-2 text-sm transition border-l-4 ${
                                                                isActive 
                                                                ? 'bg-blue-50 border-blue-600 text-blue-700' 
                                                                : 'border-transparent text-gray-600 hover:bg-gray-100'
                                                            }`}
                                                        >
                                                            <div className="mr-3 relative">
                                                                {isCompleted ? (
                                                                    <CheckCircle className="w-4 h-4 text-green-500"/>
                                                                ) : (
                                                                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}/>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 text-left truncate">
                                                                {content.video_title || content.cheatsheet_title || content.mcq_title}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
            <div className="bg-white border-b px-6 py-3 flex items-center shadow-sm z-10">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden mr-4 p-2 hover:bg-gray-100 rounded-lg">
                    <Menu className="w-6 h-6"/>
                </button>
                <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-500 hover:text-gray-900 transition mr-4">
                    <ChevronLeft className="w-5 h-5"/>
                    <span className="hidden sm:inline">Dashboard</span>
                </button>
                <div className="border-l pl-4">
                    <h1 className="text-lg font-bold text-gray-900 truncate max-w-[200px] sm:max-w-md">
                        {currentContent ? (currentContent.video_title || currentContent.cheatsheet_title || currentContent.mcq_title) : "Course Player"}
                    </h1>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gray-50">
                {renderContent()}
            </div>
        </div>
    </div>
  );
};

export default CoursePlayer;