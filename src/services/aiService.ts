// AI Service for Meeting Summaries and MOM Generation
// In a real application, this would connect to OpenAI, Google AI, or other AI services

import type { MeetingTranscript, MeetingSummary, MeetingMOM } from '../types/meeting';

class AIService {
  private mockTranscripts: MeetingTranscript[] = [];
  
  // Simulate real-time speech-to-text and AI analysis
  async startRealTimeTranscription(_meetingId: string): Promise<void> {
    // Simulate real-time transcript generation
    const mockSpeakers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];
    const mockContents = [
      "Let's start with the quarterly review. Our sales numbers are looking good.",
      "I agree, we've seen a 15% increase compared to last quarter.",
      "The marketing campaign has been very effective. We should continue this strategy.",
      "I suggest we allocate more budget to digital marketing for next quarter.",
      "What about the technical challenges we discussed last week?",
      "We've resolved most of them. The development team worked extra hours.",
      "Great! Let's move on to the next agenda item - customer feedback analysis.",
      "We received mostly positive feedback, but there are areas for improvement.",
    ];

    // Simulate real-time transcript updates every 30 seconds
    let index = 0;
    const interval = setInterval(() => {
      if (index >= mockContents.length) {
        clearInterval(interval);
        return;
      }

      const transcript: MeetingTranscript = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        speaker: mockSpeakers[index % mockSpeakers.length],
        content: mockContents[index],
        emotion: Math.random() > 0.7 ? 'positive' : 'neutral',
        importance: Math.random() > 0.5 ? 'high' : 'medium',
      };

      this.mockTranscripts.push(transcript);
      index++;
    }, 30000); // Every 30 seconds
  }

  // Generate real-time meeting summary
  async generateRealTimeSummary(meetingId: string): Promise<MeetingSummary> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const summary: MeetingSummary = {
      id: Math.random().toString(36).substr(2, 9),
      meetingId,
      keyPoints: [
        "Quarterly sales increased by 15%",
        "Marketing campaign showing positive results",
        "Technical challenges have been resolved",
        "Customer feedback is mostly positive",
        "Budget allocation discussion for next quarter"
      ],
      actionItems: [
        "Allocate more budget to digital marketing",
        "Continue current marketing strategy",
        "Analyze customer feedback for improvements",
        "Prepare next quarter planning"
      ],
      decisions: [
        "Continue current marketing strategy",
        "Increase digital marketing budget",
        "Schedule customer feedback review meeting"
      ],
      participants: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
      sentiment: 'positive',
      confidence: 0.85,
      generatedAt: new Date(),
    };

    return summary;
  }

  // Generate comprehensive MOM after meeting ends
  async generateMeetingMOM(meetingId: string, meetingTitle: string, attendees: string[], duration: number): Promise<MeetingMOM> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mom: MeetingMOM = {
      id: Math.random().toString(36).substr(2, 9),
      meetingId,
      title: meetingTitle,
      date: new Date(),
      duration: `${Math.floor(duration / 60)}h ${duration % 60}m`,
      attendees,
      agenda: [
        "Quarterly Sales Review",
        "Marketing Campaign Analysis",
        "Technical Updates",
        "Customer Feedback Discussion",
        "Budget Planning for Next Quarter"
      ],
      keyDiscussions: [
        "Sales performance exceeded expectations with 15% growth",
        "Marketing campaigns showing strong ROI and customer engagement",
        "Technical team successfully resolved critical system issues",
        "Customer satisfaction scores improved significantly",
        "Strategic planning for Q4 budget allocation"
      ],
      decisions: [
        "Maintain current marketing strategy with increased budget",
        "Implement customer feedback suggestions in product roadmap",
        "Schedule monthly technical review meetings",
        "Approve additional marketing budget for digital channels"
      ],
      actionItems: [
        {
          task: "Prepare detailed marketing budget proposal",
          assignee: "Jane Smith",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          priority: 'high'
        },
        {
          task: "Create customer feedback analysis report",
          assignee: "Mike Johnson",
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          priority: 'medium'
        },
        {
          task: "Schedule Q4 planning workshop",
          assignee: "Sarah Wilson",
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          priority: 'high'
        }
      ],
      nextSteps: [
        "Review and approve budget proposals",
        "Implement customer feedback improvements",
        "Monitor marketing campaign performance",
        "Prepare for Q4 strategic planning"
      ],
      attachments: [
        "Q3_Sales_Report.pdf",
        "Marketing_Analytics_Dashboard.xlsx",
        "Customer_Feedback_Summary.docx"
      ],
      generatedAt: new Date(),
    };

    return mom;
  }

  // Get real-time meeting insights
  async getRealTimeInsights(_meetingId: string): Promise<{
    duration: number;
    participantStats: { name: string; speakTime: number; contributions: number }[];
    topTopics: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
    engagement: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      duration: 45,
      participantStats: [
        { name: "John Doe", speakTime: 12, contributions: 8 },
        { name: "Jane Smith", speakTime: 15, contributions: 12 },
        { name: "Mike Johnson", speakTime: 10, contributions: 6 },
        { name: "Sarah Wilson", speakTime: 8, contributions: 4 },
      ],
      topTopics: ["Sales Performance", "Marketing Strategy", "Customer Feedback", "Budget Planning"],
      sentiment: 'positive',
      engagement: 0.89,
    };
  }

  // Clean up resources
  cleanup(): void {
    this.mockTranscripts = [];
  }
}

export const aiService = new AIService();
