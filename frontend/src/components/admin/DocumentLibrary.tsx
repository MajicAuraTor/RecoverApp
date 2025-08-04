import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  Download, 
  Upload, 
  Eye, 
  Edit2, 
  Trash2,
  Search,
  Filter,
  Calendar,
  User,
  Star,
  Share2
} from 'lucide-react';
import AdminLayout from '../shared/AdminLayout';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'video' | 'image';
  category: 'procedures' | 'forms' | 'education' | 'templates';
  size: string;
  lastModified: string;
  author: string;
  downloads: number;
  isFavorite: boolean;
  description: string;
}

const DocumentLibrary: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Knee Replacement Surgery Checklist',
      type: 'pdf',
      category: 'procedures',
      size: '1.2 MB',
      lastModified: '2024-08-03',
      author: 'Ian Brooks',
      downloads: 45,
      isFavorite: true,
      description: 'Comprehensive pre and post-operative checklist for knee replacement patients'
    },
    {
      id: '2',
      name: 'Patient Consent Form Template',
      type: 'doc',
      category: 'forms',
      size: '0.8 MB',
      lastModified: '2024-08-01',
      author: 'Ian Brooks',
      downloads: 23,
      isFavorite: false,
      description: 'Standard consent form template for surgical procedures'
    },
    {
      id: '3',
      name: 'Recovery Exercise Video Series',
      type: 'video',
      category: 'education',
      size: '125 MB',
      lastModified: '2024-07-28',
      author: 'Physical Therapy Team',
      downloads: 78,
      isFavorite: true,
      description: 'Week-by-week exercise videos for knee replacement recovery'
    },
    {
      id: '4',
      name: 'Medication Schedule Template',
      type: 'pdf',
      category: 'templates',
      size: '0.5 MB',
      lastModified: '2024-07-25',
      author: 'Ian Brooks',
      downloads: 34,
      isFavorite: false,
      description: 'Customizable medication schedule template for patients'
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesType = filterType === 'all' || doc.type === filterType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const toggleFavorite = (id: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
      )
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'video': return '🎥';
      case 'image': return '🖼️';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'procedures': return 'bg-blue-100 text-blue-800';
      case 'forms': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      case 'templates': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout currentPage="documents">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Document Library</h1>
          <p className="text-gray-600 mt-2">Manage and organize surgical documents, forms, and educational materials</p>
        </div>

        {/* Library Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-blue-600">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-green-600">180</p>
              </div>
              <Download className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-yellow-600">{documents.filter(d => d.isFavorite).length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-purple-600">127 MB</p>
              </div>
              <Folder className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="procedures">Procedures</option>
              <option value="forms">Forms</option>
              <option value="education">Education</option>
              <option value="templates">Templates</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="doc">Document</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Upload size={18} />
              <span>Upload Document</span>
            </button>
          </div>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h2 className="font-semibold text-lg">Documents ({filteredDocuments.length})</h2>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {filteredDocuments.map((document) => (
                <div 
                  key={document.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedDocument?.id === document.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedDocument(document)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="text-xl">{getFileIcon(document.type)}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{document.name}</h3>
                        <p className="text-sm text-gray-500">{document.size} • {document.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(document.id);
                        }}
                        className={`p-1 rounded ${document.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                      >
                        <Star size={16} fill={document.isFavorite ? 'currentColor' : 'none'} />
                      </button>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                        {document.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {document.author}</span>
                    <span>{document.downloads} downloads</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{document.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Document Details */}
          <div className="bg-white rounded-lg shadow-sm border">
            {selectedDocument ? (
              <>
                <div className="bg-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                  <h2 className="font-semibold text-lg">Document Details</h2>
                  <div className="flex space-x-2">
                    <button className="text-blue-100 hover:text-white transition-colors">
                      <Share2 size={18} />
                    </button>
                    <button className="text-blue-100 hover:text-white transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{getFileIcon(selectedDocument.type)}</span>
                      <h3 className="font-medium text-gray-900 text-lg">{selectedDocument.name}</h3>
                      <button
                        onClick={() => toggleFavorite(selectedDocument.id)}
                        className={`p-1 rounded ${selectedDocument.isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
                      >
                        <Star size={20} fill={selectedDocument.isFavorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedDocument.category)}`}>
                      {selectedDocument.category}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-gray-900">{selectedDocument.description}</p>
                  </div>

                  <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">File Size:</span>
                      <p className="text-gray-900">{selectedDocument.size}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <p className="text-gray-900">{selectedDocument.type.toUpperCase()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Author:</span>
                      <p className="text-gray-900">{selectedDocument.author}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Downloads:</span>
                      <p className="text-gray-900">{selectedDocument.downloads}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Modified:</span>
                      <p className="text-gray-900">{selectedDocument.lastModified}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Document ID:</span>
                      <p className="text-gray-900">{selectedDocument.id}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <span className="font-medium text-gray-700">Actions:</span>
                    <div className="flex flex-wrap gap-2">
                      <button className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <Eye size={16} />
                        <span>Preview</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Download size={16} />
                        <span>Download</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-yellow-600 text-white px-3 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-1 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        <Share2 size={16} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h3>
                <p>Select a document from the library to view details and access actions</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Upload Area */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Quick Upload</h3>
              <p className="text-sm text-blue-700">Drag and drop files here or click to browse</p>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                <Upload size={16} />
                <span>Browse Files</span>
              </button>
              <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1">
                <Folder size={16} />
                <span>New Folder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DocumentLibrary;
