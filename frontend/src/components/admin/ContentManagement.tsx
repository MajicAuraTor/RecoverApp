import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Save, 
  X,
  Search,
  Filter,
  Upload,
  Download,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import AdminLayout from '../shared/AdminLayout';

interface ContentItem {
  id: string;
  title: string;
  type: 'procedure' | 'exercise' | 'medication' | 'education';
  status: 'draft' | 'published';
  lastUpdated: string;
  author: string;
  version: string;
  content?: string;
  priority: 'low' | 'medium' | 'high';
}

const ContentManagement: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Post-Op Knee Replacement Protocol',
      type: 'procedure',
      status: 'published',
      lastUpdated: '2024-07-28',
      author: 'Ian Brooks',
      version: 'v2.1',
      priority: 'high',
      content: 'Comprehensive post-operative care instructions for knee replacement patients...'
    },
    {
      id: '2',
      title: 'Knee Surgery Exercise Recommendations',
      type: 'exercise',
      status: 'draft',
      lastUpdated: '2024-08-01',
      author: 'Ian Brooks',
      version: 'v1.3',
      priority: 'medium',
      content: 'Week-by-week exercise progression for knee replacement recovery...'
    },
    {
      id: '3',
      title: 'Medication Schedule - Knee Recovery',
      type: 'medication',
      status: 'published',
      lastUpdated: '2024-08-02',
      author: 'Ian Brooks',
      version: 'v1.8',
      priority: 'high',
      content: 'Pain management and medication schedule for knee replacement patients...'
    },
    {
      id: '4',
      title: 'Knee Replacement Tutorial Videos',
      type: 'education',
      status: 'published',
      lastUpdated: '2024-07-25',
      author: 'Ian Brooks',
      version: 'v1.0',
      priority: 'low',
      content: 'Educational video content for patient preparation...'
    },
    {
      id: '5',
      title: 'Pre-Surgery Knee Preparation Guide',
      type: 'education',
      status: 'draft',
      lastUpdated: '2024-08-03',
      author: 'Ian Brooks',
      version: 'v1.0',
      priority: 'medium',
      content: 'Complete preparation guide for patients scheduled for knee replacement...'
    }
  ]);

  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || content.type === filterType;
    const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (content: ContentItem) => {
    setSelectedContent({ ...content });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedContent) {
      setContents(prev => 
        prev.map(content => 
          content.id === selectedContent.id 
            ? { ...selectedContent, lastUpdated: new Date().toISOString().split('T')[0] }
            : content
        )
      );
      setIsEditing(false);
      setSelectedContent(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContents(prev => prev.filter(content => content.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: 'draft' | 'published') => {
    setContents(prev =>
      prev.map(content =>
        content.id === id ? { ...content, status: newStatus } : content
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle size={16} />;
      case 'draft': return <Edit2 size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'procedure': return '🏥';
      case 'exercise': return '💪';
      case 'medication': return '💊';
      case 'education': return '📚';
      default: return '📄';
    }
  };

  return (
    <AdminLayout currentPage="content">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage knee replacement surgical content and patient education materials</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="procedure">Procedures</option>
              <option value="exercise">Exercises</option>
              <option value="medication">Medication</option>
              <option value="education">Education</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus size={18} />
              <span>New Content</span>
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h2 className="font-semibold text-lg">Knee Replacement Content ({filteredContents.length})</h2>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredContents.map((content) => (
                <div 
                  key={content.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedContent?.id === content.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedContent(content)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="text-xl">{getTypeIcon(content.type)}</span>
                      <h3 className="font-medium text-gray-900">{content.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(content.priority)}`}>
                        {content.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(content.status)}`}>
                        {getStatusIcon(content.status)}
                        <span>{content.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Version {content.version}</span>
                    <span>Updated {content.lastUpdated}</span>
                  </div>
                  
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-400">by {content.author}</span>
                    <div className="flex space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(content);
                        }}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Preview feature coming soon!');
                        }}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(content.id);
                        }}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content Editor/Viewer */}
          <div className="bg-white rounded-lg shadow-sm border">
            {selectedContent ? (
              <>
                <div className="bg-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    {isEditing ? 'Edit Content' : 'Content Details'}
                  </h2>
                  <div className="flex space-x-2">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-100 hover:text-white transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSave}
                          className="text-blue-100 hover:text-white transition-colors"
                        >
                          <Save size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setSelectedContent(contents.find(c => c.id === selectedContent.id) || null);
                          }}
                          className="text-blue-100 hover:text-white transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={selectedContent.title}
                        onChange={(e) => setSelectedContent({ ...selectedContent, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{selectedContent.title}</p>
                    )}
                  </div>

                  {/* Type and Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      {isEditing ? (
                        <select
                          value={selectedContent.type}
                          onChange={(e) => setSelectedContent({ ...selectedContent, type: e.target.value as any })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="procedure">Procedure</option>
                          <option value="exercise">Exercise</option>
                          <option value="medication">Medication</option>
                          <option value="education">Education</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 capitalize flex items-center space-x-1">
                          <span>{getTypeIcon(selectedContent.type)}</span>
                          <span>{selectedContent.type}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={selectedContent.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as 'draft' | 'published';
                          if (isEditing) {
                            setSelectedContent({ ...selectedContent, status: newStatus });
                          } else {
                            handleStatusChange(selectedContent.id, newStatus);
                          }
                        }}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    {isEditing ? (
                      <select
                        value={selectedContent.priority}
                        onChange={(e) => setSelectedContent({ ...selectedContent, priority: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedContent.priority)}`}>
                        {selectedContent.priority}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    {isEditing ? (
                      <textarea
                        value={selectedContent.content || ''}
                        onChange={(e) => setSelectedContent({ ...selectedContent, content: e.target.value })}
                        rows={8}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter content details..."
                      />
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {selectedContent.content || 'No content available'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Version: {selectedContent.version}</span>
                      <span>Author: {selectedContent.author}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Last Updated: {selectedContent.lastUpdated}</span>
                      <span>ID: {selectedContent.id}</span>
                    </div>
                  </div>

                  {/* Content Management Info */}
                  {selectedContent.status === 'draft' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <div>
                          <p className="font-medium text-blue-800">Draft Content</p>
                          <p className="text-sm text-blue-700">
                            This content is in draft mode and can be published immediately when ready.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Content Selected</h3>
                <p>Select a content item from the list to view or edit details</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Quick Actions</h3>
              <p className="text-sm text-blue-700">Manage your knee replacement content efficiently</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                <Upload size={16} />
                <span>Import</span>
              </button>
              <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1">
                <Download size={16} />
                <span>Export</span>
              </button>
              <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-1">
                <Eye size={16} />
                <span>Preview All</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;