import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Popup } from '../shared/Popup';
import { SurgeryDetailsModal } from './SurgeryDetailsModal';
import { UserNavbar } from '../layout/UserNavbar';
import { UserSidebar } from '../layout/UserSidebar';
import { surgeries, reminders } from '../../data/surgeryData';

interface SurgeryInfo {
  surgery: string;
  date: string;
  time: string;
  savedAt: string;
}

const UserDashboard: React.FC = () => {
  const [selectedSurgery, setSelectedSurgery] = useState(surgeries[0]);
  const [showPopup, setShowPopup] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [savedSurgeryInfo, setSavedSurgeryInfo] = useState<SurgeryInfo | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisibilityHigh, setIsVisibilityHigh] = useState(false);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveSurgery = () => {
    if (selectedDate && selectedTime) {
      const surgeryInfo: SurgeryInfo = {
        surgery: selectedSurgery,
        date: selectedDate,
        time: selectedTime,
        savedAt: new Date().toLocaleString()
      };
      setSavedSurgeryInfo(surgeryInfo);
      localStorage.setItem('savedSurgery', JSON.stringify(surgeryInfo));
      alert('Surgery details saved successfully!');
    } else {
      alert('Please select both date and time before saving.');
    }
  };

  const handleViewDetails = () => {
    setShowDetails(true);
  };

  const calculateDaysUntilSurgery = () => {
    if (!savedSurgeryInfo?.date) return '--';
    
    const surgeryDate = new Date(savedSurgeryInfo.date);
    const today = new Date();
    const diffTime = surgeryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays.toString() : '0';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <>
      {showPopup && (
        <Popup 
          message="Welcome to Recover! Select your surgery to get started." 
          onClose={handleClosePopup}
        />
      )}

      {showDetails && (
        <SurgeryDetailsModal 
          savedInfo={savedSurgeryInfo}
          onClose={() => setShowDetails(false)}
        />
      )}

      <div className={`flex min-h-screen font-sans transition-colors ${
        isDarkMode 
          ? 'bg-gray-900' 
          : 'bg-gray-100'
      }`}>
        <UserNavbar 
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isVisibilityHigh={isVisibilityHigh}
          setIsVisibilityHigh={setIsVisibilityHigh}
        />
        
        <div className="flex pt-20 w-full">
          <UserSidebar 
            onLogout={handleLogout}
            onViewDetails={handleViewDetails}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Welcome Section */}
            <div className={`px-6 py-4 border-b transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-gray-100 border-gray-700' 
                : 'bg-gray-100 text-gray-800 border-gray-200'
            }`}>
              <h1 className={`text-2xl font-bold ${
                isVisibilityHigh ? 'font-extrabold text-3xl' : ''
              }`}>Welcome back, Felicia</h1>
              <p className={`text-sm ${
                isDarkMode 
                  ? 'text-gray-300' 
                  : 'text-gray-600'
              } ${
                isVisibilityHigh ? 'font-semibold text-base' : ''
              }`}>One Step Closer To Recovery</p>
            </div>

            {/* Dashboard Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-6 transition-colors ${
              isDarkMode 
                ? 'bg-gray-900' 
                : 'bg-gray-100'
            }`}>
              {/* Left Column */}
              <div className="space-y-6">
                {/* Surgery Selection */}
                <div className={`rounded-xl p-4 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-200'
                }`}>
                  <label className={`block font-semibold mb-2 ${
                    isDarkMode 
                      ? 'text-gray-100' 
                      : 'text-gray-900'
                  } ${
                    isVisibilityHigh ? 'font-bold text-lg' : ''
                  }`}>
                    Select a Procedure:
                  </label>
                  <select
                    className={`w-full p-2 rounded border transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-100' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } ${
                      isVisibilityHigh ? 'text-lg font-semibold' : ''
                    }`}
                    value={selectedSurgery}
                    onChange={(e) => setSelectedSurgery(e.target.value)}
                  >
                    {surgeries.map((surgery) => (
                      <option key={surgery} value={surgery}>
                        {surgery}
                      </option>
                    ))}
                  </select>

                  {/* Date & Time Inputs */}
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-700'
                      } ${
                        isVisibilityHigh ? 'font-semibold text-base' : ''
                      }`}>Select Date:</label>
                      <input
                        type="date"
                        className={`w-full p-2 rounded border transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-100' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${
                        isDarkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-700'
                      } ${
                        isVisibilityHigh ? 'font-semibold text-base' : ''
                      }`}>Select Time:</label>
                      <input
                        type="time"
                        className={`w-full p-2 rounded border transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-100' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    className={`mt-4 w-full text-white rounded py-2 font-semibold transition-colors ${
                      isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-700 hover:bg-blue-800'
                    } ${
                      isVisibilityHigh ? 'font-bold py-3 text-lg' : ''
                    }`}
                    onClick={handleSaveSurgery}
                  >
                    Save
                  </button>

                  <button 
                    className={`mt-2 w-full text-white rounded py-2 font-semibold transition-colors ${
                      isDarkMode 
                        ? 'bg-gray-600 hover:bg-gray-700' 
                        : 'bg-gray-400 hover:bg-gray-500'
                    } ${
                      isVisibilityHigh ? 'font-bold py-3 text-lg' : ''
                    }`}
                    onClick={handleViewDetails}
                  >
                    View full surgery details
                  </button>
                </div>

                {/* Days until surgery */}
                <div className={`rounded-xl p-4 flex items-center space-x-4 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {calculateDaysUntilSurgery().split('').map((digit, index) => (
                      <span 
                        key={index} 
                        className={`text-white font-bold px-3 py-1 rounded transition-colors ${
                          isDarkMode 
                            ? 'bg-blue-600' 
                            : 'bg-blue-700'
                        } ${
                          isVisibilityHigh ? 'text-3xl px-4 py-2' : 'text-2xl'
                        }`}
                      >
                        {digit}
                      </span>
                    ))}
                  </div>
                  <span className={`font-semibold ${
                    isDarkMode 
                      ? 'text-gray-100' 
                      : 'text-gray-900'
                  } ${
                    isVisibilityHigh ? 'font-bold text-lg' : ''
                  }`}>Days till surgery</span>
                </div>

                {/* Reminders */}
                <div className={`rounded-xl p-4 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-200'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    isDarkMode 
                      ? 'text-gray-100' 
                      : 'text-gray-900'
                  } ${
                    isVisibilityHigh ? 'font-bold text-lg' : ''
                  }`}>Reminders</h3>
                  <div className="space-y-2">
                    {reminders.map((reminder, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded border-l-4 border-blue-500 transition-colors ${
                          isDarkMode 
                            ? 'bg-gray-700 text-gray-200' 
                            : 'bg-white text-gray-900'
                        }`}
                      >
                        <p className={`text-sm ${
                          isVisibilityHigh ? 'font-semibold text-base' : ''
                        }`}>{reminder}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className={`rounded-xl p-4 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold ${
                      isDarkMode 
                        ? 'text-gray-100' 
                        : 'text-gray-900'
                    } ${
                      isVisibilityHigh ? 'font-bold text-lg' : ''
                    }`}>Felicia's Progress:</span>
                    <span className={`text-2xl font-bold ${
                      isDarkMode 
                        ? 'text-blue-400' 
                        : 'text-blue-700'
                    } ${
                      isVisibilityHigh ? 'text-3xl' : ''
                    }`}>0%</span>
                  </div>
                  <div className={`w-full rounded-full h-4 mb-2 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700' 
                      : 'bg-blue-100'
                  }`}>
                    <div
                      className={`h-4 rounded-full transition-colors ${
                        isDarkMode 
                          ? 'bg-blue-500' 
                          : 'bg-blue-500'
                      }`}
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                  <p className={`${
                    isDarkMode 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                  } ${
                    isVisibilityHigh ? 'font-semibold text-base' : ''
                  }`}>Select procedure type to view progress.</p>
                  <button className={`mt-3 w-full text-white rounded py-2 font-semibold transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-700' 
                      : 'bg-gray-400 hover:bg-gray-500'
                  } ${
                    isVisibilityHigh ? 'font-bold py-3 text-lg' : ''
                  }`}>
                    View more progress here
                  </button>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Recovery Products */}
                <div className={`rounded-xl p-4 transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-gray-200'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    isDarkMode 
                      ? 'text-gray-100' 
                      : 'text-gray-900'
                  } ${
                    isVisibilityHigh ? 'font-bold text-lg' : ''
                  }`}>
                    Recovery Picks to help you be prepared
                  </h3>
                  <div className="flex space-x-4 overflow-x-auto">
                    <div className="flex flex-col items-center">
                      <img
                        src="https://images.pexels.com/photos/3845128/pexels-photo-3845128.jpeg?auto=compress&w=80"
                        alt="Walker"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className={`text-xs mt-1 text-center ${
                        isDarkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-700'
                      } ${
                        isVisibilityHigh ? 'text-sm font-semibold' : ''
                      }`}>
                        Folding Paddle Walker
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://images.pexels.com/photos/3952236/pexels-photo-3952236.jpeg?auto=compress&w=80"
                        alt="Pads"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className={`text-xs mt-1 text-center ${
                        isDarkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-700'
                      } ${
                        isVisibilityHigh ? 'text-sm font-semibold' : ''
                      }`}>
                        Sterile Abdominal Pads
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&w=80"
                        alt="Commode"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <span className={`text-xs mt-1 text-center ${
                        isDarkMode 
                          ? 'text-gray-300' 
                          : 'text-gray-700'
                      } ${
                        isVisibilityHigh ? 'text-sm font-semibold' : ''
                      }`}>
                        DMI Drop-Arm Steel Commodes
                      </span>
                    </div>
                  </div>
                  <button className={`mt-3 w-full text-white rounded py-2 font-semibold transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-600 hover:bg-gray-700' 
                      : 'bg-gray-400 hover:bg-gray-500'
                  } ${
                    isVisibilityHigh ? 'font-bold py-3 text-lg' : ''
                  }`}>
                    Shop for more products here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
