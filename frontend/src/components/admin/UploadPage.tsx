import React, { useState, useEffect } from 'react';
import { Upload, FileIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { uploadAPI } from '../../services/api';

interface UploadItem {
  id: string;
  filename: string;
  originalName: string;
  uploadedAt: string;
  fileSize: number;
  fileType: string;
}

const UploadPage: React.FC = () => {
  const [uploadHistory, setUploadHistory] = useState<UploadItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadUploadHistory();
  }, []);

  const loadUploadHistory = async () => {
    try {
      const data = await uploadAPI.getUploadHistory();
      setUploadHistory(data);
    } catch (error) {
      console.error('Failed to load upload history:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadAPI.uploadFile(formData);
      setMessage({ type: 'success', text: 'File uploaded successfully!' });
      loadUploadHistory(); // Refresh the list
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload file. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Upload Content</h1>
          <p className="text-gray-600 mt-1">Upload documents, images, and other files</p>
        </div>
      </div>

      <div className="p-6">
        {/* Upload Area */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to upload
            </h3>
            <p className="text-gray-600 mb-4">
              Support for PDF, DOC, DOCX, JPG, PNG files up to 10MB
            </p>
            
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
            />
            
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload size={18} className="mr-2" />
              Choose Files
            </label>
            
            {uploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Uploading...</p>
              </div>
            )}
            
            {message && (
              <div className={`mt-4 p-3 rounded-lg flex items-center justify-center ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle size={18} className="mr-2" />
                ) : (
                  <AlertCircle size={18} className="mr-2" />
                )}
                {message.text}
              </div>
            )}
          </div>

          {/* Upload History */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Uploads</h2>
            
            {uploadHistory.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <FileIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">No files uploaded yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Uploaded
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {uploadHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileIcon className="h-5 w-5 text-gray-400 mr-3" />
                              <span className="text-sm font-medium text-gray-900">
                                {item.originalName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {item.fileType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatFileSize(item.fileSize)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
