import React, { useState } from 'react';
import { Upload, Save, Eye, FileText, Video, Image, Plus } from 'lucide-react';

interface ContentManagementProps {
  onPreview: () => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({ onPreview }) => {
  const [activeTab, setActiveTab] = useState('educational');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
  };

  const existingContent = [
    { id: 1, title: 'Knee Replacement Recovery Guide', type: 'Educational', status: 'Published', lastUpdated: '2024-03-10' },
    { id: 2, title: 'Post-Surgery Eye Drop Instructions', type: 'Care Instructions', status: 'Draft', lastUpdated: '2024-03-12' },
    { id: 3, title: 'Physical Therapy Exercises', type: 'Educational', status: 'Published', lastUpdated: '2024-03-08' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
        <p className="text-gray-600">Create and manage educational materials and care instructions</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('educational')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'educational'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Educational Materials
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'care'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Care Instructions
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Files</h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload size={32} className="mx-auto text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Drag and drop files here
            </p>
            <p className="text-xs text-gray-500 mb-3">or click to browse</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Upload File
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium text-gray-700">Supported formats:</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <FileText size={12} className="mr-1" />
                PDF
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <Video size={12} className="mr-1" />
                MP4
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                <Image size={12} className="mr-1" />
                JPG/PNG
              </span>
            </div>
            <p className="text-xs text-gray-500">Max file size: 50MB</p>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Content Editor</h3>
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Plus size={16} className="mr-1" />
              New Content
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter content title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <div className="border border-gray-300 rounded-lg">
                <div className="flex items-center space-x-2 p-3 border-b border-gray-200 bg-gray-50">
                  <button className="p-1 text-gray-600 hover:text-gray-900 rounded">
                    <strong>B</strong>
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-900 rounded italic">
                    I
                  </button>
                  <button className="p-1 text-gray-600 hover:text-gray-900 rounded underline">
                    U
                  </button>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full p-3 resize-none focus:outline-none"
                  placeholder="Enter your content here..."
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Save size={16} className="mr-2" />
                Save Draft
              </button>
              <button
                onClick={onPreview}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={16} className="mr-2" />
                Preview as Patient
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Existing Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {existingContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-green-600 hover:text-green-900">Preview</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;