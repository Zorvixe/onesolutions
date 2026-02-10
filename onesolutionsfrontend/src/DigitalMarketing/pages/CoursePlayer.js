import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  BookOpen,
  Download,
  CheckCircle,
  Clock,
  Menu,
  X
} from 'lucide-react';
import ReactPlayer from 'react-player';

const CoursePlayer = ({ goalId }) => {
  const [courseData, setCourseData] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentSubtopic, setCurrentSubtopic] = useState(null);
  const [currentContent, setCurrentContent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchCourseData();
  }, [goalId]);

  const fetchCourseData = async () => {
    try {
      const res = await fetch(`/api/student/courses/goal/${goalId}`);
      const data = await res.json();
      if (data.success) {
        setCourseData(data.data);
        // Set first module/topic/subtopic/content as default
        if (data.data.modules.length > 0) {
          const firstModule = data.data.modules[0];
          setCurrentModule(firstModule);
          if (firstModule.topics.length > 0) {
            const firstTopic = firstModule.topics[0];
            setCurrentTopic(firstTopic);
            if (firstTopic.subtopics.length > 0) {
              const firstSubtopic = firstTopic.subtopics[0];
              setCurrentSubtopic(firstSubtopic);
              if (firstSubtopic.content.length > 0) {
                setCurrentContent(firstSubtopic.content[0]);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  };

  const markAsCompleted = async () => {
    if (!currentContent) return;
    
    try {
      await fetch('/api/student/courses/content/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_id: currentContent.id,
          goal_id: goalId,
          module_id: currentModule?.id,
          subtopic_id: currentSubtopic?.id
        })
      });
      
      // Refresh course data
      fetchCourseData();
    } catch (error) {
      console.error('Error marking as completed:', error);
    }
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100);
    // Auto-save progress every 30 seconds
    if (state.playedSeconds % 30 < 1) {
      // You can implement auto-save here
    }
  };

  const handleEnded = () => {
    setPlaying(false);
    markAsCompleted();
  };

  const renderContent = () => {
    if (!currentContent) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold">No Content Available</h3>
            <p className="text-gray-600">Select a subtopic from the sidebar</p>
          </div>
        </div>
      );
    }

    switch (currentContent.content_type) {
      case 'video':
        return (
          <div className="space-y-6">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden">
              <ReactPlayer
                url={currentContent.video_url}
                playing={playing}
                controls={true}
                width="100%"
                height="500px"
                onProgress={handleProgress}
                onEnded={handleEnded}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'
                    }
                  }
                }}
              />
            </div>

            {/* Video Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{currentContent.video_title}</h2>
                  <p className="text-gray-600 mt-2">{currentContent.video_description}</p>
                </div>
                <button
                  onClick={markAsCompleted}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark Complete</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{Math.floor((currentContent.video_duration || 0) / 60)} min</span>
                </div>
                <div className="flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  <span>{progress.toFixed(1)}% watched</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cheatsheet':
        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{currentContent.cheatsheet_title}</h2>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>Cheatsheet</span>
                  <span>•</span>
                  <span>Read time: 5 min</span>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: currentContent.cheatsheet_content }}
            />
            
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={markAsCompleted}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:opacity-90"
              >
                Mark as Read
              </button>
            </div>
          </div>
        );

      case 'mcq':
        const [selectedAnswers, setSelectedAnswers] = useState({});
        const [showResults, setShowResults] = useState(false);
        const [score, setScore] = useState(0);

        const handleAnswerSelect = (questionIndex, optionIndex) => {
          if (showResults) return;
          setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: optionIndex
          });
        };

        const calculateScore = () => {
          const questions = currentContent.questions || [];
          let correct = 0;
          questions.forEach((q, qIndex) => {
            if (selectedAnswers[qIndex] === q.correctAnswer) {
              correct++;
            }
          });
          const calculatedScore = Math.round((correct / questions.length) * 100);
          setScore(calculatedScore);
          setShowResults(true);
          
          // Save score
          fetch('/api/student/courses/content/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              content_id: currentContent.id,
              goal_id: goalId,
              module_id: currentModule?.id,
              subtopic_id: currentSubtopic?.id,
              quiz_score: calculatedScore
            })
          });
        };

        return (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold">{currentContent.mcq_title}</h2>
              <p className="text-gray-600 mt-2">Test your knowledge with this quiz</p>
            </div>

            <div className="space-y-8">
              {(currentContent.questions || []).map((question, qIndex) => (
                <div key={qIndex} className="border rounded-xl p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    {qIndex + 1}. {question.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {question.options.map((option, optIndex) => {
                      const isSelected = selectedAnswers[qIndex] === optIndex;
                      const isCorrect = optIndex === question.correctAnswer;
                      let optionClass = "p-4 border rounded-lg cursor-pointer transition-colors ";
                      
                      if (showResults) {
                        if (isCorrect) {
                          optionClass += "bg-green-50 border-green-500";
                        } else if (isSelected && !isCorrect) {
                          optionClass += "bg-red-50 border-red-500";
                        } else {
                          optionClass += "hover:bg-gray-50";
                        }
                      } else {
                        optionClass += isSelected 
                          ? "bg-blue-50 border-blue-500" 
                          : "hover:bg-gray-50";
                      }

                      return (
                        <div
                          key={optIndex}
                          className={optionClass}
                          onClick={() => handleAnswerSelect(qIndex, optIndex)}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center ${
                              isSelected ? 'bg-blue-500 border-blue-500' : ''
                            }`}>
                              {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {showResults && question.explanation && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              {showResults ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4">
                    <span className="text-2xl font-bold text-white">{score}%</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Quiz Completed!</h3>
                  <p className="text-gray-600 mb-6">
                    You scored {score}% on this quiz
                  </p>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setSelectedAnswers({});
                      markAsCompleted();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90"
                  >
                    Continue Learning
                  </button>
                </div>
              ) : (
                <button
                  onClick={calculateScore}
                  disabled={Object.keys(selectedAnswers).length !== (currentContent.questions || []).length}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'w-80' : 'w-0'
      } bg-white border-r transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Course Content</h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {courseData && (
            <div className="mt-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">{courseData.goal.name}</h4>
                <p className="text-sm text-blue-700">{courseData.goal.description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="overflow-y-auto h-[calc(100vh-120px)]">
          {courseData?.modules.map(module => (
            <div key={module.id} className="border-b">
              <div 
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setCurrentModule(module)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{module.name}</h4>
                  <ChevronLeft className={`w-4 h-4 transition-transform ${
                    currentModule?.id === module.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>

              {currentModule?.id === module.id && module.topics?.map(topic => (
                <div key={topic.id} className="ml-4 border-l">
                  <div 
                    className="p-4 hover:bg-gray-50 cursor-pointer border-l-2 border-transparent hover:border-blue-500"
                    onClick={() => setCurrentTopic(topic)}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">{topic.name}</h5>
                      <ChevronLeft className={`w-4 h-4 transition-transform ${
                        currentTopic?.id === topic.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  {currentTopic?.id === topic.id && topic.subtopics?.map(subtopic => (
                    <div key={subtopic.id} className="ml-8">
                      <div 
                        className="p-4 hover:bg-gray-50 cursor-pointer border-l-2 border-transparent hover:border-purple-500"
                        onClick={() => {
                          setCurrentSubtopic(subtopic);
                          if (subtopic.content?.[0]) {
                            setCurrentContent(subtopic.content[0]);
                          }
                        }}
                      >
                        <h6 className="font-medium">{subtopic.name}</h6>
                        {subtopic.content?.length > 0 && (
                          <div className="flex items-center space-x-2 mt-1">
                            {subtopic.content.map(content => {
                              let Icon = BookOpen;
                              let color = 'text-gray-400';
                              
                              if (content.content_type === 'video') {
                                Icon = Play;
                                color = content.progress === 'completed' ? 'text-green-500' : 'text-red-500';
                              } else if (content.content_type === 'mcq') {
                                Icon = CheckCircle;
                                color = content.progress === 'completed' ? 'text-green-500' : 'text-yellow-500';
                              }
                              
                              return (
                                <div key={content.id} className={`p-1 ${color}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!sidebarOpen && (
                  <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <h1 className="text-xl font-bold">
                    {currentSubtopic?.name || 'Select a Lesson'}
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {currentTopic?.name} • {currentModule?.name}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-4xl mx-auto">
          {renderContent()}

          {/* Navigation */}
          {currentContent && (
            <div className="mt-8 flex justify-between">
              <button className="px-6 py-3 border rounded-lg font-medium hover:bg-gray-50 flex items-center space-x-2">
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 flex items-center space-x-2">
                <span>Next Lesson</span>
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;