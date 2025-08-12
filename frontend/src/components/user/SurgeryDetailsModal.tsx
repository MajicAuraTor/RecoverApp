import React from 'react';
import { getSurgeryDetails } from '../../data/surgeryData';

interface SurgeryDetailsModalProps {
  savedInfo: {
    surgery: string;
    date: string;
    time: string;
    savedAt: string;
  } | null;
  onClose: () => void;
}

export const SurgeryDetailsModal: React.FC<SurgeryDetailsModalProps> = ({ savedInfo, onClose }) => {
  const surgeryDetails = savedInfo ? getSurgeryDetails(savedInfo.surgery) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col mx-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">My Procedures - Surgery Details</h2>
          <button 
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">{savedInfo && surgeryDetails ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Procedure:</label>
                  <p className="text-lg font-semibold text-gray-800">{savedInfo.surgery}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Date:</label>
                  <p className="text-lg text-gray-800">{new Date(savedInfo.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Time:</label>
                  <p className="text-lg text-gray-800">{savedInfo.time}</p>
                </div>
              </div>
            </div>

            {/* Procedure Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Procedure Overview</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Description:</label>
                    <p className="text-sm text-gray-700">{surgeryDetails.description}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Duration:</label>
                    <p className="text-sm text-gray-700">{surgeryDetails.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Anesthesia:</label>
                    <p className="text-sm text-gray-700">{surgeryDetails.anesthesia}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Recovery Time:</label>
                    <p className="text-sm text-gray-700">{surgeryDetails.recovery}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Pre-Surgery Preparation</h3>
                <ul className="space-y-1">
                  {surgeryDetails.preparation.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Post-Surgery Care</h3>
                <ul className="space-y-1">
                  {surgeryDetails.postCare.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Potential Risks</h3>
                <ul className="space-y-1">
                  {surgeryDetails.risks.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-600">Saved At:</label>
              <p className="text-sm text-gray-600">{savedInfo.savedAt}</p>
            </div>
          </div>
          ) : (
            <p className="text-gray-600">No surgery details saved yet. Please save your surgery information first.</p>
          )}
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button 
            className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-medium transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
