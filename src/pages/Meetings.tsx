import React, { useState, useCallback } from 'react';
import { Calendar, Clock, Users, Plus, Search, Filter, MapPin, Edit, Trash2, Play, Brain, Zap, FileText, Download, Share2 } from 'lucide-react';
import MeetingModals from '../components/MeetingModals';
import ActiveMeetingPanel from '../components/ActiveMeetingPanel';
import { useMeeting } from '../contexts/MeetingContext';
import { useNotification } from '../contexts/NotificationContext';

const Meetings: React.FC = () => {
  const { meetings, activeMeeting, addMeeting, updateMeeting, deleteMeeting, startMeeting } = useMeeting();
  const { addNotification, scheduleMeetingNotifications } = useNotification();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMOMModal, setShowMOMModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormDataState] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: 30,
    location: '',
    attendees: [] as string[],
    organizer: 'john.doe@company.com',
    status: 'scheduled' as const,
    attachments: [] as string[],
    isRecurring: false,
    recurrencePattern: ''
  });

  // Optimized setFormData to prevent unnecessary re-renders
  const setFormData = useCallback((newData: any) => {
    if (typeof newData === 'function') {
      setFormDataState(newData);
    } else {
      setFormDataState(prev => ({ ...prev, ...newData }));
    }
  }, []);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meeting.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || meeting.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddMeeting = () => {
    // Validation
    if (!formData.title.trim()) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Meeting title is required',
      });
      return;
    }
    
    if (!formData.date) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Meeting date is required',
      });
      return;
    }
    
    if (!formData.time) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Meeting time is required',
      });
      return;
    }

    // Check if meeting is in the past
    const meetingDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();
    if (meetingDateTime <= now) {
      addNotification({
        type: 'error',
        title: 'Invalid Date/Time',
        message: 'Meeting cannot be scheduled in the past',
      });
      return;
    }
    
    // Add meeting to context
    addMeeting(formData);
    
    // Schedule automatic notifications
    const meetingId = Math.random().toString(36).substr(2, 9);
    scheduleMeetingNotifications(meetingId, formData.title, meetingDateTime);
    
    addNotification({
      type: 'success',
      title: 'Meeting Scheduled Successfully! 🎉',
      message: `"${formData.title}" has been scheduled with AI-powered features. Automatic notifications will be sent to attendees.`,
      duration: 10000,
    });
    
    resetForm();
    setShowAddModal(false);
  };

  const handleEditMeeting = () => {
    if (!formData.title || !formData.date || !formData.time || !selectedMeeting) {
      alert('Please fill all required fields!');
      return;
    }
    
    updateMeeting(selectedMeeting.id, formData);
    setShowEditModal(false);
    setSelectedMeeting(null);
    
    addNotification({
      type: 'success',
      title: 'Meeting Updated',
      message: 'Meeting has been updated successfully!',
    });
  };

  const handleDeleteMeeting = () => {
    if (!selectedMeeting) return;
    
    deleteMeeting(selectedMeeting.id);
    setShowDeleteModal(false);
    setSelectedMeeting(null);
    
    addNotification({
      type: 'info',
      title: 'Meeting Deleted',
      message: 'Meeting has been deleted successfully!',
    });
  };

  const handleStartMeeting = async (meeting: any) => {
    try {
      await startMeeting(meeting.id);
      addNotification({
        type: 'success',
        title: 'Meeting Started',
        message: `"${meeting.title}" has started with AI-powered features enabled!`,
        duration: 10000,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to start meeting. Please try again.',
      });
    }
  };

  const openEditModal = useCallback((meeting: any) => {
    setSelectedMeeting(meeting);
    setFormDataState({
      title: meeting.title,
      description: meeting.description,
      date: meeting.date,
      time: meeting.time,
      duration: meeting.duration,
      location: meeting.location,
      attendees: meeting.attendees,
      organizer: meeting.organizer,
      status: meeting.status,
      attachments: meeting.attachments,
      isRecurring: meeting.isRecurring,
      recurrencePattern: meeting.recurrencePattern || ''
    });
    setShowEditModal(true);
  }, []);

  const openDeleteModal = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowDeleteModal(true);
  };

  const openMOMModal = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowMOMModal(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const fileNames = files.map(file => file.name);
    setFormDataState(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...fileNames]
    }));
  };

  const removeAttachment = (index: number) => {
    setFormDataState(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_: string, i: number) => i !== index)
    }));
  };

  const resetForm = useCallback(() => {
    setFormDataState({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: 30,
      location: '',
      attendees: [],
      organizer: 'john.doe@company.com',
      status: 'scheduled',
      attachments: [],
      isRecurring: false,
      recurrencePattern: ''
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-600';
      case 'active':
        return 'bg-green-100 text-green-600 animate-pulse';
      case 'completed':
        return 'bg-gray-100 text-gray-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AI-Powered Meetings</h1>
          <p className="text-gray-600">Smart meeting management with real-time AI summaries and automatic notifications</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span>Schedule Smart Meeting</span>
        </button>
      </div>

      {/* AI Features Info */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Auto Notifications</h3>
              <p className="text-sm text-gray-600">5 smart reminders before meeting</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Real-time AI Summary</h3>
              <p className="text-sm text-gray-600">Live meeting insights & key points</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Auto MOM Generation</h3>
              <p className="text-sm text-gray-600">AI-generated minutes after meeting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search meetings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Meetings</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Meeting Alert */}
      {activeMeeting && (
        <div className="bg-gradient-to-r from-green-100 to-blue-100 border border-green-300 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Meeting in Progress</h3>
                <p className="text-sm text-gray-600">"{activeMeeting.title}" is currently active with AI features</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                LIVE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Meetings List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">All Meetings ({filteredMeetings.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredMeetings.map((meeting) => (
            <div key={meeting.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{meeting.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
                      {meeting.status}
                    </span>
                    {meeting.isRecurring && (
                      <span className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
                        Recurring
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{meeting.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{meeting.time} ({formatDuration(meeting.duration)})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{meeting.attendees.length} attendees</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {meeting.status === 'scheduled' && (
                    <button 
                      onClick={() => handleStartMeeting(meeting)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
                      title="Start Meeting with AI"
                    >
                      <Play size={16} />
                      <span>Start</span>
                    </button>
                  )}
                  
                  {meeting.status === 'completed' && meeting.meetingMOM && (
                    <button 
                      onClick={() => openMOMModal(meeting)}
                      className="px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors duration-200 flex items-center space-x-2"
                      title="View AI-Generated MOM"
                    >
                      <Brain size={16} />
                      <span>AI MOM</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => openEditModal(meeting)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Edit Meeting"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => openDeleteModal(meeting)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete Meeting"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOM Modal */}
      {showMOMModal && selectedMeeting?.meetingMOM && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Brain size={24} className="mr-2 text-purple-600" />
                  AI-Generated Minutes of Meeting
                </h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Download size={20} />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <Share2 size={20} />
                  </button>
                  <button 
                    onClick={() => setShowMOMModal(false)}
                    className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Meeting Details</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Title:</strong> {selectedMeeting.meetingMOM.title}</p>
                    <p><strong>Date:</strong> {selectedMeeting.meetingMOM.date.toLocaleDateString()}</p>
                    <p><strong>Duration:</strong> {selectedMeeting.meetingMOM.duration}</p>
                    <p><strong>Attendees:</strong> {selectedMeeting.meetingMOM.attendees.join(', ')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Key Discussions</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {selectedMeeting.meetingMOM.keyDiscussions.slice(0, 3).map((discussion: string, index: number) => (
                      <li key={index}>• {discussion}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Decisions Made</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  {selectedMeeting.meetingMOM.decisions.map((decision: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Action Items</h3>
                <div className="space-y-2">
                  {selectedMeeting.meetingMOM.actionItems.map((item: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{item.task}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.priority === 'high' 
                            ? 'bg-red-100 text-red-600' 
                            : item.priority === 'medium' 
                            ? 'bg-yellow-100 text-yellow-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span><strong>Assignee:</strong> {item.assignee}</span>
                        {item.dueDate && (
                          <span className="ml-4"><strong>Due:</strong> {item.dueDate.toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MeetingModals
        showAddModal={showAddModal}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
        selectedMeeting={selectedMeeting}
        formData={formData}
        setFormData={setFormData}
        setShowAddModal={setShowAddModal}
        setShowEditModal={setShowEditModal}
        setShowDeleteModal={setShowDeleteModal}
        handleAddMeeting={handleAddMeeting}
        handleEditMeeting={handleEditMeeting}
        handleDeleteMeeting={handleDeleteMeeting}
        handleFileUpload={handleFileUpload}
        removeAttachment={removeAttachment}
      />

      {/* Active Meeting Panel */}
      <ActiveMeetingPanel />
    </div>
  );
};

export default Meetings;