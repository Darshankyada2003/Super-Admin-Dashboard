import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Users, 
  MessageSquare, 
  FileText, 
  Clock, 
  Brain,
  BarChart3,
  Play,
  Square,
  Download,
  Share2
} from 'lucide-react';
import { useMeeting } from '../contexts/MeetingContext';
import { useNotification } from '../contexts/NotificationContext';

const ActiveMeetingPanel: React.FC = () => {
  const { activeMeeting, endMeeting, generateRealTimeSummary, getRealTimeInsights } = useMeeting();
  const { addNotification } = useNotification();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [insights, setInsights] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);

  // Update meeting duration every second
  useEffect(() => {
    if (!activeMeeting) return;

    const interval = setInterval(() => {
      const duration = Math.floor((new Date().getTime() - activeMeeting.startTime.getTime()) / 1000);
      setMeetingDuration(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeMeeting]);

  // Load insights every 30 seconds
  useEffect(() => {
    if (!activeMeeting) return;

    const loadInsights = async () => {
      const data = await getRealTimeInsights();
      setInsights(data);
    };

    loadInsights();
    const interval = setInterval(loadInsights, 30000);

    return () => clearInterval(interval);
  }, [activeMeeting, getRealTimeInsights]);

  if (!activeMeeting) return null;

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndMeeting = async () => {
    if (window.confirm('Are you sure you want to end this meeting?')) {
      await endMeeting(activeMeeting.id);
      addNotification({
        type: 'success',
        title: 'Meeting Ended',
        message: 'Meeting has been ended successfully. AI-generated MOM will be available shortly.',
        duration: 8000,
      });
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    addNotification({
      type: isRecording ? 'info' : 'success',
      title: isRecording ? 'Recording Stopped' : 'Recording Started',
      message: isRecording ? 'Meeting recording has been stopped' : 'Meeting is now being recorded',
    });
  };

  const handleGenerateSummary = async () => {
    await generateRealTimeSummary();
    setShowSummary(true);
    addNotification({
      type: 'success',
      title: 'Summary Generated',
      message: 'Real-time meeting summary has been updated',
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-6 min-w-[600px]">
        {/* Meeting Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">{activeMeeting.title}</h3>
              <p className="text-sm text-gray-600">
                {activeMeeting.participantCount} participants • {formatDuration(meetingDuration)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isRecording && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                REC
              </div>
            )}
            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
              {formatDuration(meetingDuration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isMuted 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              !isVideoOn 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <button
            onClick={handleToggleRecording}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isRecording ? <Square size={20} /> : <Play size={20} />}
          </button>

          <button
            onClick={handleGenerateSummary}
            className="p-3 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-all duration-200"
            title="Generate AI Summary"
          >
            <Brain size={20} />
          </button>

          <button
            onClick={() => setShowSummary(!showSummary)}
            className="p-3 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
            title="View Real-time Summary"
          >
            <FileText size={20} />
          </button>

          <button
            onClick={handleEndMeeting}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 font-medium"
          >
            End Meeting
          </button>
        </div>

        {/* Real-time Summary Panel */}
        {showSummary && activeMeeting.realTimeSummary && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center">
              <Brain size={16} className="mr-2" />
              AI Real-time Summary
            </h4>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Key Points:</h5>
                <ul className="space-y-1">
                  {activeMeeting.realTimeSummary.keyPoints.slice(0, 3).map((point, index) => (
                    <li key={index} className="text-gray-600">• {point}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Action Items:</h5>
                <ul className="space-y-1">
                  {activeMeeting.realTimeSummary.actionItems.slice(0, 3).map((item, index) => (
                    <li key={index} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Confidence: {Math.round(activeMeeting.realTimeSummary.confidence * 100)}%
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeMeeting.realTimeSummary.sentiment === 'positive' 
                  ? 'bg-green-100 text-green-700'
                  : activeMeeting.realTimeSummary.sentiment === 'negative'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {activeMeeting.realTimeSummary.sentiment} mood
              </span>
            </div>
          </div>
        )}

        {/* Real-time Insights */}
        {insights && (
          <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{insights.engagement * 100}%</div>
              <div className="text-xs text-blue-600">Engagement</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{insights.participantStats.length}</div>
              <div className="text-xs text-green-600">Active Speakers</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">{insights.topTopics.length}</div>
              <div className="text-xs text-purple-600">Topics Covered</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">{formatDuration(meetingDuration)}</div>
              <div className="text-xs text-orange-600">Duration</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveMeetingPanel;
