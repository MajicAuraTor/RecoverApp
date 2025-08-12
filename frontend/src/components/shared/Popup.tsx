import React from 'react';

interface PopupProps {
  message: string;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-sans">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <p className="text-gray-800 mb-4">{message}</p>
        <button 
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-medium"
          onClick={onClose}
        >
          Ok!
        </button>
      </div>
    </div>
  );
};
