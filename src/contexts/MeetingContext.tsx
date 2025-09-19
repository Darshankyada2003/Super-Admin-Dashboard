import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { aiService } from '../services/aiService';
import type { MeetingSummary, MeetingMOM } from '../types/meeting';

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  attendees: string[];
  organizer: string;
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  attachments: string[];
  isRecurring: boolean;
  recurrencePattern?: string;
  aiSummary?: MeetingSummary;
  meetingMOM?: MeetingMOM;
}

export interface ActiveMeeting extends Meeting {
  startTime: Date;
  realTimeSummary?: MeetingSummary;
  transcriptEnabled: boolean;
  participantCount: number;
}

interface MeetingContextType {
  meetings: Meeting[];
  activeMeeting: ActiveMeeting | null;
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  updateMeeting: (id: string, updates: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  startMeeting: (meetingId: string) => void;
  endMeeting: (meetingId: string) => void;
  generateRealTimeSummary: () => Promise<void>;
  getRealTimeInsights: () => Promise<any>;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const MeetingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Weekly Team Standup',
      description: 'Weekly progress review and planning',
      date: '2024-01-15',
      time: '09:00',
      duration: 30,
      location: 'Conference Room A',
      attendees: ['john.doe@company.com', 'jane.smith@company.com', 'mike.johnson@company.com'],
      organizer: 'john.doe@company.com',
      status: 'scheduled',
      attachments: [],
      isRecurring: true,
      recurrencePattern: 'weekly'
    },
    {
      id: '2',
      title: 'Q4 Budget Review',
      description: 'Quarterly budget analysis and planning for next quarter',
      date: '2024-01-16',
      time: '14:00',
      duration: 90,
      location: 'Board Room',
      attendees: ['john.doe@company.com', 'sarah.wilson@company.com', 'mike.johnson@company.com'],
      organizer: 'sarah.wilson@company.com',
      status: 'scheduled',
      attachments: ['Q4_Budget_Report.pdf'],
      isRecurring: false
    }
  ]);

  const [activeMeeting, setActiveMeeting] = useState<ActiveMeeting | null>(null);

  const addMeeting = (meeting: Omit<Meeting, 'id'>) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: Math.random().toString(36).substr(2, 9),
    };
    setMeetings(prev => [...prev, newMeeting]);
  };

  const updateMeeting = (id: string, updates: Partial<Meeting>) => {
    setMeetings(prev => prev.map(meeting =>
      meeting.id === id ? { ...meeting, ...updates } : meeting
    ));
  };

  const deleteMeeting = (id: string) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  };

  const startMeeting = async (meetingId: string) => {
    const meeting = meetings.find(m => m.id === meetingId);
    if (!meeting) return;

    const activeM: ActiveMeeting = {
      ...meeting,
      status: 'active',
      startTime: new Date(),
      transcriptEnabled: true,
      participantCount: meeting.attendees.length,
    };

    setActiveMeeting(activeM);
    updateMeeting(meetingId, { status: 'active' });

    // Start AI services
    await aiService.startRealTimeTranscription(meetingId);
  };

  const endMeeting = async (meetingId: string) => {
    if (!activeMeeting) return;

    const endTime = new Date();
    const durationMinutes = Math.floor((endTime.getTime() - activeMeeting.startTime.getTime()) / 1000 / 60);

    // Generate final MOM
    try {
      const mom = await aiService.generateMeetingMOM(
        meetingId,
        activeMeeting.title,
        activeMeeting.attendees,
        durationMinutes
      );

      updateMeeting(meetingId, {
        status: 'completed',
        meetingMOM: mom
      });
    } catch (error) {
      console.error('Error generating MOM:', error);
    }

    setActiveMeeting(null);
    aiService.cleanup();
  };

  const generateRealTimeSummary = async () => {
    if (!activeMeeting) return;

    try {
      const summary = await aiService.generateRealTimeSummary(activeMeeting.id);
      setActiveMeeting(prev => prev ? { ...prev, realTimeSummary: summary } : null);
    } catch (error) {
      console.error('Error generating real-time summary:', error);
    }
  };

  const getRealTimeInsights = async () => {
    if (!activeMeeting) return null;

    try {
      return await aiService.getRealTimeInsights(activeMeeting.id);
    } catch (error) {
      console.error('Error getting real-time insights:', error);
      return null;
    }
  };

  // Auto-generate real-time summaries every 5 minutes during active meetings
  useEffect(() => {
    if (!activeMeeting) return;

    const interval = setInterval(() => {
      generateRealTimeSummary();
    }, 5 * 60 * 1000); // 5 minutes

    // Generate initial summary after 2 minutes
    const initialTimeout = setTimeout(() => {
      generateRealTimeSummary();
    }, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [activeMeeting]);

  return (
    <MeetingContext.Provider value={{
      meetings,
      activeMeeting,
      addMeeting,
      updateMeeting,
      deleteMeeting,
      startMeeting,
      endMeeting,
      generateRealTimeSummary,
      getRealTimeInsights,
    }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (context === undefined) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
};
