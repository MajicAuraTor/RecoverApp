import React, { useState } from 'react';
import { ArrowLeft, Send, Calendar, Star, AlertCircle } from 'lucide-react';

interface LogMilestoneProps {
  onBack: () => void;
}

const LogMilestone: React.FC<LogMilestoneProps> = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [painLevel, setPainLevel] = useState(5);
  const [visionClarity, setVisionClarity] = useState(5);
  const [notes, setNotes] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const PainScale = ({ value, onChange, label }: { value: number; onChange: (value: number) => void; label: string }) => (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">1</span>
        <div className="flex-1 relative">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Better</span>
            <span>Worse</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">10</span>
        <div className="ml-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-blue-700">{value}</span>
        </div>
      </div>
    </div>
  );

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
          <h2 className="text-2xl font-bold text-gray-900">Log Milestone</h2>
          <p className="text-gray-600">Track your recovery progress</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
          {/* Day Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Recovery Day
            </label>
            <div className="grid grid-cols-4 gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Level */}
          <PainScale
            value={painLevel}
            onChange={setPainLevel}
            label="Pain Level (1 = No pain, 10 = Severe pain)"
          />

          {/* Vision Clarity */}
          <PainScale
            value={visionClarity}
            onChange={setVisionClarity}
            label="Vision Clarity (1 = Very clear, 10 = Very blurry)"
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="How are you feeling today? Any concerns or improvements you've noticed?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedDay}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            <Send size={16} />
            <span>Share with Doctor</span>
          </button>

          {/* Confirmation */}
          {showConfirmation && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Send size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-green-800 font-medium">Report sent to Dr. Smith</p>
                  <p className="text-green-600 text-sm">Your milestone has been logged and shared with your healthcare team.</p>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Tips */}
        <div className="mt-6 bg-amber-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-start space-x-3">
            <AlertCircle size={20} className="text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Logging Tips</h4>
              <ul className="space-y-1 text-amber-800 text-sm">
                <li>• Be honest about your pain and vision levels</li>
                <li>• Note any changes from the previous day</li>
                <li>• Include any side effects from medications</li>
                <li>• Mention if you have questions for your doctor</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-900">Days Logged</span>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-1">3</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Star size={16} className="text-green-500" />
              <span className="text-sm font-medium text-gray-900">Avg. Progress</span>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-1">Good</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogMilestone;