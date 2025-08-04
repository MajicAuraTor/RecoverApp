import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  User,
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';
import AdminLayout from '../shared/AdminLayout';

interface ReviewItem {
  id: string;
  title: string;
  type: 'content' | 'user-feedback' | 'system-alert';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  description: string;
}

const ReviewQueue: React.FC = () => {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: '1',
      title: 'Updated Exercise Protocol - Week 3',
      type: 'content',
      priority: 'high',
      submittedBy: 'Ian Brooks',
      submittedDate: '2024-08-04',
      status: 'pending',
      description: 'Updated knee replacement exercise protocol for week 3 recovery based on recent patient feedback.'
    },
    {
      id: '2',
      title: 'Pain Management Feedback',
      type: 'user-feedback',
      priority: 'medium',
      submittedBy: 'Patient #284',
      submittedDate: '2024-08-03',
      status: 'in-review',
      description: 'Patient reported concerns about current pain medication schedule effectiveness.'
    },
    {
      id: '3',
      title: 'System Alert: Content Accuracy',
      type: 'system-alert',
      priority: 'urgent',
      submittedBy: 'System',
      submittedDate: '2024-08-04',
      status: 'pending',
      description: 'Automated check detected potential inconsistency in medication dosage information.'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setReviewItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setSelectedItem(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in-review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content': return <FileText size={16} />;
      case 'user-feedback': return <User size={16} />;
      case 'system-alert': return <AlertTriangle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const pendingItems = reviewItems.filter(item => item.status === 'pending' || item.status === 'in-review');

  return (
    <AdminLayout currentPage="review">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Review Queue</h1>
          <p className="text-gray-600 mt-2">Review and approve content updates, user feedback, and system alerts</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingItems.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Today</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent Items</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Review Time</p>
                <p className="text-2xl font-bold text-blue-600">2h</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Queue List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <h2 className="font-semibold text-lg">Review Queue ({pendingItems.length})</h2>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {pendingItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedItem?.id === item.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2 flex-1">
                      {getTypeIcon(item.type)}
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {item.submittedBy}</span>
                    <span>{item.submittedDate}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Review Details */}
          <div className="bg-white rounded-lg shadow-sm border">
            {selectedItem ? (
              <>
                <div className="bg-blue-700 text-white p-4 rounded-t-lg">
                  <h2 className="font-semibold text-lg">Review Details</h2>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">{selectedItem.title}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedItem.priority)}`}>
                        {selectedItem.priority} Priority
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Submitted by:</span>
                        <p className="text-gray-900">{selectedItem.submittedBy}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date:</span>
                        <p className="text-gray-900">{selectedItem.submittedDate}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Type:</span>
                        <p className="text-gray-900 capitalize">{selectedItem.type.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">ID:</span>
                        <p className="text-gray-900">{selectedItem.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <span className="font-medium text-gray-700">Description:</span>
                    <p className="text-gray-900 mt-1">{selectedItem.description}</p>
                  </div>

                  {selectedItem.status === 'pending' && (
                    <div className="border-t pt-4 space-y-3">
                      <span className="font-medium text-gray-700">Review Actions:</span>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleStatusChange(selectedItem.id, 'approved')}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle size={16} />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedItem.id, 'rejected')}
                          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <XCircle size={16} />
                          <span>Reject</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          <Eye size={16} />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {selectedItem.priority === 'urgent' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                        <div>
                          <p className="font-medium text-red-800">Urgent Review Required</p>
                          <p className="text-sm text-red-700">
                            This item requires immediate attention and should be reviewed as soon as possible.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Clock size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Item Selected</h3>
                <p>Select an item from the review queue to view details and take action</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReviewQueue;
