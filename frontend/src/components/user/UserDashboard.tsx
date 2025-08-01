import React from 'react';
import { BookOpen, Target, Bell, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface UserDashboardProps {
  onNavigate: (page: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate }) => {
  const todaysTasks = [
    { id: 1, task: 'Take morning eye drops', time: '8:00 AM', completed: true },
    { id: 2, task: 'Complete eye exercises', time: '2:00 PM', completed: false },
    { id: 3, task: 'Take evening eye drops', time: '8:00 PM', completed: false },
  ];

  const upcomingReminders = [
    { id: 1, type: 'Medication', description: 'Eye drops in 2 hours', priority: 'high' },
    { id: 2, type: 'Exercise', description: 'Blinking exercises due', priority: 'medium' },
    { id: 3, type: 'Appointment', description: 'Follow-up with Dr. Smith tomorrow', priority: 'high' },
  ];

  const milestones = [
    { day: 'Day 1', status: 'completed', description: 'Initial recovery phase' },
    { day: 'Day 3', status: 'current', description: 'Vision clarity assessment' },
    { day: 'Day 7', status: 'upcoming', description: 'First week milestone' },
    { day: 'Day 14', status: 'upcoming', description: 'Two-week checkup' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Robert</h1>
        <p className="text-blue-100">Day 3 of your post-operative recovery</p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3">
          <p className="text-sm">Recovery Progress: 21%</p>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '21%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Tasks</h2>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="space-y-3">
            {todaysTasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  task.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300'
                }`}>
                  {task.completed && <div className="w-2 h-2 bg-white rounded-full m-0.5" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task.task}
                  </p>
                  <p className="text-xs text-gray-500">{task.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Reminders</h2>
            <Bell size={20} className="text-orange-500" />
          </div>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  reminder.priority === 'high' ? 'bg-red-500' : 'bg-orange-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{reminder.type}</p>
                  <p className="text-xs text-gray-500">{reminder.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('reminders')}
            className="w-full mt-4 bg-orange-100 text-orange-700 py-2 rounded-lg font-medium hover:bg-orange-200 transition-colors"
          >
            Set New Reminder
          </button>
        </div>

        {/* Tutorials */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Tutorials</h2>
            <BookOpen size={20} className="text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">New Tutorial Available</p>
              <p className="text-xs text-blue-600">Proper Eye Drop Technique</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Completed Today</p>
              <p className="text-xs text-green-600">Post-Surgical Care Basics</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('tutorials')}
            className="w-full mt-4 bg-blue-100 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
          >
            View All Tutorials
          </button>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recovery Milestones</h2>
          <Target size={20} className="text-green-500" />
        </div>
        <div className="flex items-center justify-between">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                milestone.status === 'completed' ? 'bg-green-500 text-white' :
                milestone.status === 'current' ? 'bg-blue-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {milestone.status === 'completed' ? <CheckCircle size={16} /> : 
                 milestone.status === 'current' ? <AlertCircle size={16} /> :
                 <Calendar size={16} />}
              </div>
              <p className="text-sm font-medium text-gray-900">{milestone.day}</p>
              <p className="text-xs text-gray-500 text-center max-w-20">{milestone.description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => onNavigate('milestone')}
          className="w-full mt-6 bg-green-100 text-green-700 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors"
        >
          Log New Milestone
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('reminders')}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105"
        >
          <Bell size={24} className="mx-auto mb-2" />
          <p className="font-medium">Set Reminders</p>
        </button>
        <button
          onClick={() => onNavigate('tutorials')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          <BookOpen size={24} className="mx-auto mb-2" />
          <p className="font-medium">View Tutorials</p>
        </button>
        <button
          onClick={() => onNavigate('milestone')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
        >
          <Target size={24} className="mx-auto mb-2" />
          <p className="font-medium">Log Milestone</p>
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;