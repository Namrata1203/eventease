/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  imageUrl?: string;
  category: 'Conference' | 'Workshop' | 'Meetup' | 'Webinar' | 'Social';
}

export interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  ticketType: 'General' | 'VIP' | 'Speaker' | 'Student';
  registeredAt: string;
  checkedIn: boolean;
  checkedInAt?: string;
  notes?: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  email: string;
  role: 'User' | 'Admin';
}

export interface CopilotLog {
  id: string;
  stage: string;
  taskTitle: string;
  challenge: string;
  promptUsed: string;
  assistanceReceived: string;
  outcomeAndValue: string;
}

export interface RepoFile {
  name: string;
  path: string;
  content: string;
  type: 'code' | 'json' | 'css' | 'markdown';
}
