import React, { useState } from 'react';
import { ArrowLeft, Clock, Play, BookOpen } from 'lucide-react';

interface PreviewAsUserProps {
  onBack: () => void;
  onPublish: () => void;
}

const PreviewAsUser: React.FC<PreviewAsUserProps> = ({ onBack, onPublish }) => {
  const [activeTab, setActiveTab] = useState('tutorials');

  const tutorials = [
    { id: 1, title: 'Audio-Guided Post-Surgical Care', duration: '12:30', completed: false },
    { id: 2, title: 'How to Use Eye Drops Properly', duration: '8:45', completed: true },
    { id: 3, title: 'Managing Post-Surgery Pain', duration: '15:20', completed: false },
  ];

  const medications = [
    { time: '8:00 AM', medication: 'Eye Drops', status: 'completed' },
    { time: '2:00 PM', medication: 'Eye Drops', status: 'pending' },
    { time: '8:00 PM', medication: 'Eye Drops', status: 'pending' },
  ];

  const exercises = [
    { name: 'Eye Movement Exercise', duration: '5 min', completed: true },
    { name: 'Blinking Exercise', duration: '3 min', completed: false },
    { name: 'Focus Training', duration: '10 min', completed: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Edit
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Preview</h2>
            <p className="text-gray-600">See how users will view your content</p>
          </div>
        </div>
        <button
          onClick={onPublish}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Publish Changes
        </button>
      </div>

      {/* User View Simulation */}
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
        <div className="bg-white rounded-lg shadow-sm">
          {/* User Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="text-lg font-semibold">Welcome, Robert</h3>
            <p className="text-blue-100">Your post-operative care dashboard</p>
          </div>

          {/* User Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-4">
              <button
                onClick={() => setActiveTab('tutorials')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tutorials'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Tutorials
              </button>
              <button
                onClick={() => setActiveTab('medication')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'medication'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Medication Schedule
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'exercises'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Exercises
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'tutorials' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Tutorials</h4>
                {tutorials.map((tutorial) => (
                  <div key={tutorial.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tutorial.completed ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {tutorial.completed ? (
                          <BookOpen size={16} className="text-green-600" />
                        ) : (
                          <Play size={16} className="text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{tutorial.title}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {tutorial.duration}
                        </p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      tutorial.completed 
                        ? 'bg-gray-200 text-gray-600' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {tutorial.completed ? 'Completed' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'medication' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h4>
                {medications.map((med, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        med.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{med.time}</p>
                        <p className="text-sm text-gray-500">{med.medication}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      med.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {med.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'exercises' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Daily Exercises</h4>
                {exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded border-2 ${
                        exercise.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {exercise.completed && <div className="w-2 h-2 bg-white rounded-sm m-0.5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{exercise.name}</p>
                        <p className="text-sm text-gray-500">{exercise.duration}</p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      exercise.completed 
                        ? 'bg-gray-200 text-gray-600' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {exercise.completed ? 'Done' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Preview Mode:</strong> This shows exactly how users will see the updated content. 
          Make sure everything looks correct before publishing.
        </p>
      </div>
    </div>
  );
};

export default PreviewAsUser;