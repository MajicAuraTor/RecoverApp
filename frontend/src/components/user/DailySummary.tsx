import React from 'react';
import { ArrowLeft, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';

interface DailySummaryProps {
  onBack: () => void;
}

const DailySummary: React.FC<DailySummaryProps> = ({ onBack }) => {
  const todaysProgress = [
    { task: 'Eye-drop reminders completed', completed: true, time: '8:00 AM, 2:00 PM, 8:00 PM' },
    { task: 'Tutorial watched', completed: true, time: 'How to Use Eye Drops Properly' },
    { task: 'Milestone logged', completed: true, time: 'Day 3 - Pain Level 4, Vision 6' },
    { task: 'Exercise completed', completed: false, time: 'Blinking exercises (due 4:00 PM)' },
  ];

  const weeklyStats = [
    { label: 'Reminders Completed', value: '18/21', percentage: 86 },
    { label: 'Tutorials Watched', value: '2/4', percentage: 50 },
    { label: 'Milestones Logged', value: '3/3', percentage: 100 },
    { label: 'Overall Progress', value: 'Good', percentage: 78 },
  ];

  const upcomingTasks = [
    { task: 'Complete blinking exercises', time: 'Today, 4:00 PM', priority: 'medium' },
    { task: 'Take evening eye drops', time: 'Today, 8:00 PM', priority: 'high' },
    { task: 'Log Day 4 milestone', time: 'Tomorrow morning', priority: 'medium' },
    { task: 'Watch pain management tutorial', time: 'Tomorrow', priority: 'low' },
  ];

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
          <h2 className="text-2xl font-bold text-gray-900">Daily Summary</h2>
          <p className="text-gray-600">Your recovery progress for today</p>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Today's Checklist</h3>
          <div className="text-sm text-gray-500">
            March 15, 2024 - Day 3
          </div>
        </div>

        <div className="space-y-4">
          {todaysProgress.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                item.completed ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                {item.completed && <CheckCircle size={16} className="text-white" />}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  item.completed ? 'text-gray-900' : 'text-gray-600'
                }`}>
                  {item.task}
                </p>
                <p className="text-sm text-gray-500 mt-1">{item.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-green-800 font-medium">Great progress today!</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            You've completed 3 out of 4 tasks. Keep up the excellent work!
          </p>
        </div>
      </div>

      {/* Weekly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
              <span className="text-lg font-bold text-gray-900">{stat.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${stat.percentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">{stat.percentage}% complete</div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <Clock size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Next Steps</h3>
        </div>

        <div className="space-y-3">
          {upcomingTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900">{task.task}</p>
                  <p className="text-sm text-gray-500">{task.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <p className="text-blue-800 font-medium">Tomorrow's Focus:</p>
          <p className="text-blue-700 text-sm mt-1">
            Add new milestone and continue drops. Remember to complete your blinking exercises today.
          </p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">You're doing great!</h3>
            <p className="text-green-100">
              Day 3 of recovery completed. Your consistency is helping your healing process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySummary;