import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, Clock, CheckCircle } from 'lucide-react';

interface TutorialsPageProps {
  onBack: () => void;
}

const TutorialsPage: React.FC<TutorialsPageProps> = ({ onBack }) => {
  const [selectedTutorial, setSelectedTutorial] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const tutorials = [
    {
      id: 1,
      title: 'Audio-Guided Post-Surgical Care',
      duration: '12:30',
      description: 'Complete guide to caring for your eyes after surgery',
      completed: false,
      audioUrl: '/audio/post-surgical-care.mp3',
    },
    {
      id: 2,
      title: 'How to Use Eye Drops Properly',
      duration: '8:45',
      description: 'Step-by-step instructions for proper eye drop application',
      completed: true,
      audioUrl: '/audio/eye-drops-guide.mp3',
    },
    {
      id: 3,
      title: 'Managing Post-Surgery Pain',
      duration: '15:20',
      description: 'Techniques for managing discomfort during recovery',
      completed: false,
      audioUrl: '/audio/pain-management.mp3',
    },
    {
      id: 4,
      title: 'Eye Exercises for Recovery',
      duration: '10:15',
      description: 'Gentle exercises to help with your healing process',
      completed: false,
      audioUrl: '/audio/eye-exercises.mp3',
    },
  ];

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const rewind = () => {
    setCurrentTime(Math.max(0, currentTime - 10));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tutorial Library</h2>
          <p className="text-gray-600">Audio-guided instructions for your recovery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tutorial List */}
        <div className="lg:col-span-2 space-y-4">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer transition-all hover:shadow-md ${
                selectedTutorial === tutorial.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedTutorial(tutorial.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tutorial.completed ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {tutorial.completed ? (
                      <CheckCircle size={24} className="text-green-600" />
                    ) : (
                      <Play size={24} className="text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{tutorial.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {tutorial.duration}
                      </span>
                      {tutorial.completed && (
                        <span className="text-green-600 font-medium">Completed</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    tutorial.completed
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {tutorial.completed ? 'Replay' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Audio Player */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Player</h3>
          
          {selectedTutorial ? (
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">
                  {tutorials.find(t => t.id === selectedTutorial)?.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatTime(currentTime)} / {tutorials.find(t => t.id === selectedTutorial)?.duration}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: '35%' }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={rewind}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <RotateCcw size={20} className="text-gray-600" />
                </button>
                
                <button
                  onClick={togglePlayback}
                  className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-white" />
                  ) : (
                    <Play size={24} className="text-white ml-1" />
                  )}
                </button>

                <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                  <Volume2 size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Accessibility Features */}
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-blue-800 text-sm font-medium mb-2">Accessibility Features</p>
                <div className="flex justify-center space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    Large Text
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    Slow Speed
                  </button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                    Repeat
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Volume2 size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Select a tutorial to begin</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-4">Your Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">1</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">3</div>
            <div className="text-sm text-blue-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">4</div>
            <div className="text-sm text-gray-600">Total Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">25%</div>
            <div className="text-sm text-purple-600">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialsPage;