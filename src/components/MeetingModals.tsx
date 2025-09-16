import React, { useState, useCallback, useMemo } from 'react';
import { X, Save, Upload, Trash2, FileText, Clock, Users, MapPin, Video, Plus, Brain, Zap } from 'lucide-react';

interface MeetingModalProps {
  showAddModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  selectedMeeting: any;
  formData: any;
  setFormData: (data: any) => void;
  setShowAddModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setShowDeleteModal: (show: boolean) => void;
  handleAddMeeting: () => void;
  handleEditMeeting: () => void;
  handleDeleteMeeting: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeAttachment: (index: number) => void;
}

const MeetingModals: React.FC<MeetingModalProps> = ({
  showAddModal,
  showEditModal,
  showDeleteModal,
  selectedMeeting,
  formData,
  setFormData,
  setShowAddModal,
  setShowEditModal,
  setShowDeleteModal,
  handleAddMeeting,
  handleEditMeeting,
  handleDeleteMeeting,
  handleFileUpload,
  removeAttachment
}) => {
  const [newAttendee, setNewAttendee] = useState('');

  // Memoized functions to prevent unnecessary re-renders
  const addAttendee = useCallback(() => {
    if (newAttendee.trim() && !formData.attendees.includes(newAttendee.trim())) {
      setFormData(prev => ({
        ...prev,
        attendees: [...prev.attendees, newAttendee.trim()]
      }));
      setNewAttendee('');
    }
  }, [newAttendee, formData.attendees, setFormData]);

  const removeAttendee = useCallback((email: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter((attendee: string) => attendee !== email)
    }));
  }, [setFormData]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAttendee();
    }
  }, [addAttendee]);

  // Optimized input change handlers
  const handleInputChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'duration' ? parseInt(value as string) : value
    }));
  }, [setFormData]);

  const MeetingFormFields = useMemo(() => (
    <div className="space-y-6">
      {/* AI Features Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center space-x-3 mb-2">
          <Brain size={20} className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">AI-Powered Meeting</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Zap size={16} className="text-blue-500" />
            <span className="text-gray-600">Auto notifications</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain size={16} className="text-purple-500" />
            <span className="text-gray-600">Real-time summary</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText size={16} className="text-green-500" />
            <span className="text-gray-600">Auto MOM generation</span>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Meeting Title *
          </label>
          <input
            type="text"
            value={formData.title || ''}
            onChange={handleInputChange('title')}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter meeting title"
            required
            autoComplete="off"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description || ''}
            onChange={handleInputChange('description')}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="What's this meeting about?"
            autoComplete="off"
          />
        </div>

        {/* Date and Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock size={16} className="inline mr-1" />
            Date *
          </label>
          <input
            type="date"
            value={formData.date || ''}
            onChange={handleInputChange('date')}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Clock size={16} className="inline mr-1" />
            Time *
          </label>
          <input
            type="time"
            value={formData.time || ''}
            onChange={handleInputChange('time')}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
            autoComplete="off"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <select
            value={formData.duration || 30}
            onChange={handleInputChange('duration')}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
            <option value={180}>3 hours</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin size={16} className="inline mr-1" />
            Location/Meeting Link
          </label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={handleInputChange('location')}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Conference room or meeting link"
            autoComplete="off"
          />
        </div>
      </div>

      {/* Attendees Section */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          <Users size={16} className="inline mr-1" />
          Attendees ({formData.attendees.length})
        </label>
        
        <div className="border border-gray-300 rounded-xl p-4 space-y-3">
          {/* Add Attendee Input */}
          <div className="flex space-x-2">
            <input
              type="email"
              value={newAttendee}
              onChange={(e) => setNewAttendee(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={addAttendee}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>

          {/* Attendees List */}
          {formData.attendees.length > 0 && (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {formData.attendees.map((email: string, index: number) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users size={14} className="text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-700">{email}</span>
                  </div>
                  <button
                    onClick={() => removeAttendee(email)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {formData.attendees.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Users size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No attendees added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Meeting Options */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Recurring Meeting
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isRecurring || false}
                onChange={handleInputChange('isRecurring')}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Make this a recurring meeting</span>
            </label>
            
            {formData.isRecurring && (
              <select
                value={formData.recurrencePattern || ''}
                onChange={handleInputChange('recurrencePattern')}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select recurrence</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Meeting Status
          </label>
          <select
            value={formData.status || 'scheduled'}
            onChange={handleInputChange('status')}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <FileText size={16} className="inline mr-1" />
          Attachments
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
          <Upload size={32} className="mx-auto text-gray-400 mb-3" />
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload files</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">PDF, DOC, PPT, XLS files up to 10MB each</p>
        </div>
        
        {formData.attachments.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.attachments.map((attachment: string, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-700">{attachment}</span>
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  ), [formData, handleInputChange, newAttendee, addAttendee, removeAttendee, handleKeyPress, handleFileUpload, removeAttachment]);

  return (
    <>
      {/* Add Meeting Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Schedule Smart Meeting</h2>
                    <p className="text-sm text-gray-600">AI-powered meeting with auto notifications & summaries</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-xl transition-all duration-200"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {MeetingFormFields}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMeeting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Brain size={20} />
                <span>Schedule AI Meeting</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Meeting Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Edit Meeting</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {MeetingFormFields}
            </div>
            
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditMeeting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-xl flex items-center space-x-2 transition-all duration-200"
              >
                <Save size={20} />
                <span>Update Meeting</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 size={28} className="text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Delete Meeting</h2>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700">
                  Are you sure you want to delete the meeting <span className="font-semibold">"{selectedMeeting?.title}"</span>?
                </p>
                <p className="text-sm text-red-600 mt-2">
                  • All attendees will be notified of cancellation
                  • Meeting data and AI summaries will be permanently deleted
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteMeeting}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl transition-all duration-200"
                >
                  Delete Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingModals;