import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadStatus(null);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store file info in localStorage for content management
      const uploadedContent = {
        id: Date.now().toString(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        type: getContentType(file.name),
        status: 'draft',
        priority: 'medium',
        uploadedFile: file.name,
        uploadedAt: new Date().toISOString()
      };
      
      const existingContent = JSON.parse(localStorage.getItem('uploadedContent') || '[]');
      existingContent.push(uploadedContent);
      localStorage.setItem('uploadedContent', JSON.stringify(existingContent));
      
      setUploadStatus('success');
      setUploading(false);
      
      // Navigate to content management after 2 seconds
      setTimeout(() => {
        navigate('/admin/content');
      }, 2000);
      
    } catch (error) {
      setUploadStatus('error');
      setUploading(false);
    }
  };

  const getContentType = (filename: string): string => {
    const name = filename.toLowerCase();
    if (name.includes('exercise') || name.includes('therapy')) return 'exercise';
    if (name.includes('medication') || name.includes('drug')) return 'medication';
    if (name.includes('procedure') || name.includes('protocol')) return 'procedure';
    return 'education';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center space-x-2 hover:bg-blue-700 px-3 py-2 rounded transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-xl font-bold">Upload Materials</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Upload Content Files</h2>
          <p className="text-gray-600 mb-6">
            Upload educational materials, protocols, and resources for knee replacement patients.
          </p>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-lg font-medium">Uploading file...</p>
              </div>
            ) : uploadStatus === 'success' ? (
              <div className="flex flex-col items-center text-green-600">
                <CheckCircle size={48} className="mb-4" />
                <p className="text-lg font-medium">Upload successful!</p>
                <p className="text-sm text-gray-600">Redirecting to content management...</p>
              </div>
            ) : uploadStatus === 'error' ? (
              <div className="flex flex-col items-center text-red-600">
                <AlertCircle size={48} className="mb-4" />
                <p className="text-lg font-medium">Upload failed</p>
                <p className="text-sm text-gray-600">Please try again</p>
              </div>
            ) : (
              <div>
                <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-medium mb-2">Drop files here to upload</p>
                <p className="text-gray-600 mb-4">or</p>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx,.jpg,.png,.mp4,.mov"
                />
                <label
                  htmlFor="fileInput"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer inline-block transition-colors"
                >
                  Choose Files
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: PDF, DOC, DOCX, JPG, PNG, MP4, MOV
                </p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Upload Instructions:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Files will be automatically categorized based on filename</li>
              <li>• Include keywords like "exercise", "medication", "procedure" in filenames</li>
              <li>• Uploaded files will appear in Content Management for editing</li>
              <li>• Maximum file size: 50MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
