import React, { useState } from 'react';
import { ArrowLeft, Plus, Clock, Check, Trash2 } from 'lucide-react';

interface RemindersSetupProps {
  onBack: () => void;
}

const RemindersSetup: React.FC<RemindersSetupProps> = ({ onBack }) => {
  const [reminders, setReminders] = useState(['08:00', '14:00', '20:00']);
  const [newTime, setNewTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const addReminder = () => {
    if (newTime && reminders.length < 3) {
      setReminders([...reminders, newTime]);
      setNewTime('');
    }
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  const saveReminders = () => {
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
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
          <h2 className="text-2xl font-bold text-gray-900">Eye-Drop Schedule</h2>
          <p className="text-gray-600">Set up to 3 daily reminders</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Daily Reminders</h3>
            <Clock size={20} className="text-blue-500" />
          </div>

          {/* Current Reminders */}
          <div className="space-y-3 mb-6">
            {reminders.map((time, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock size={16} className="text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{formatTime(time)}</span>
                </div>
                <button
                  onClick={() => removeReminder(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Reminder */}
          {reminders.length < 3 && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addReminder}
                  disabled={!newTime}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Helper Text */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Need help?</strong> Ask a caregiver to assist with setting up your reminders. 
              Consistent timing is important for your recovery.
            </p>
          </div>

          {/* Save Button */}
          <button
            onClick={saveReminders}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Check size={16} />
            <span>Save Reminders</span>
          </button>

          {/* Confirmation Message */}
          {showConfirmation && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <Check size={16} className="text-green-600" />
                <p className="text-green-800 font-medium">
                  Eye-drop reminders set for {reminders.map(time => formatTime(time)).join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3">Reminder Tips</h4>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Space your reminders evenly throughout the day</li>
            <li>• Set alarms on your phone as backup reminders</li>
            <li>• Keep your eye drops in an easily accessible location</li>
            <li>• Wash your hands before applying eye drops</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RemindersSetup;