// Meeting-related type definitions

export interface MeetingTranscript {
  id: string;
  timestamp: Date;
  speaker: string;
  content: string;
  emotion?: 'neutral' | 'positive' | 'negative';
  importance?: 'high' | 'medium' | 'low';
}

export interface MeetingSummary {
  id: string;
  meetingId: string;
  keyPoints: string[];
  actionItems: string[];
  decisions: string[];
  participants: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
  generatedAt: Date;
}

export interface MeetingMOM {
  id: string;
  meetingId: string;
  title: string;
  date: Date;
  duration: string;
  attendees: string[];
  agenda: string[];
  keyDiscussions: string[];
  decisions: string[];
  actionItems: {
    task: string;
    assignee: string;
    dueDate?: Date;
    priority: 'high' | 'medium' | 'low';
  }[];
  nextSteps: string[];
  attachments: string[];
  generatedAt: Date;
}
