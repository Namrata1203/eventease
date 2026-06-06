/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Event, Attendee, CopilotLog } from './types';

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'ev-1',
    title: 'Global DevCon & Generative AI Summit',
    date: '2026-06-12',
    time: '09:00 AM - 05:00 PM',
    location: 'Silicon Valley Convention Center & Virtual',
    description: 'Join industry visionaries, platform Engineers, and model architects as we shape the future of software construction and agentic AI systems. Features keynote panels, interactive sandboxes, and deep dives.',
    organizer: 'NextGen Engineering Guild',
    capacity: 250,
    registeredCount: 184,
    category: 'Conference',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'ev-2',
    title: 'Advanced React & Vite Performance Sandbox',
    date: '2026-06-18',
    time: '01:00 PM - 04:30 PM',
    location: 'Apex Labs Tech Hub (Suite 404)',
    description: 'Learn the internals of the Vite dev server, server-side-rendering optimizations, reactive hook dependencies, and advanced state orchestration to achieve peak application speeds.',
    organizer: 'Frontend Guild SF',
    capacity: 65,
    registeredCount: 52,
    category: 'Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'ev-3',
    title: 'Angel Syndicate & Founder Networking',
    date: '2026-06-25',
    time: '06:30 PM - 09:30 PM',
    location: 'The Luminary Rooftop Lounge',
    description: 'An exclusive networking event connecting early-stage founders building in deep tech, developer tooling, and healthcare with angels and seed investors eager to back visionary teams.',
    organizer: 'Founders Collective',
    capacity: 100,
    registeredCount: 94,
    category: 'Social',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'ev-4',
    title: 'Designing Accessible Agentic Interfaces',
    date: '2026-07-02',
    time: '11:00 AM - 12:30 PM',
    location: 'Live on Google Meet & YouTube Stream',
    description: 'Explore the guidelines of human-agent symbiosis, feedback mechanisms for background tasks, layout fluidity, and screen reader parsing of dynamically updated logs.',
    organizer: 'Interaction Design Foundation',
    capacity: 500,
    registeredCount: 312,
    category: 'Webinar',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60'
  }
];

export const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: 'at-1',
    eventId: 'ev-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.io',
    ticketType: 'VIP',
    registeredAt: '2026-06-01T10:30:00Z',
    checkedIn: true,
    checkedInAt: '2026-06-06T14:15:00Z',
    notes: 'Keynote speaker for afternoon panel on Agent Orchestration.'
  },
  {
    id: 'at-2',
    eventId: 'ev-1',
    name: 'Marcus Vance',
    email: 'm.vance@capitalpartners.com',
    ticketType: 'VIP',
    registeredAt: '2026-06-02T16:45:00Z',
    checkedIn: false,
    notes: 'Interested in seed pipeline & partner matchmaking.'
  },
  {
    id: 'at-3',
    eventId: 'ev-1',
    name: 'Aria Takahashi',
    email: 'aria.t@tokyolabs.org',
    ticketType: 'Speaker',
    registeredAt: '2026-06-01T09:12:00Z',
    checkedIn: true,
    checkedInAt: '2026-06-06T17:10:00Z',
    notes: 'Leading morning lab on Large Multimodal Models.'
  },
  {
    id: 'at-4',
    eventId: 'ev-2',
    name: 'Alex Rivera',
    email: 'alex.r@frontenddev.net',
    ticketType: 'General',
    registeredAt: '2026-06-03T11:20:00Z',
    checkedIn: true,
    checkedInAt: '2026-06-06T17:22:00Z'
  },
  {
    id: 'at-5',
    eventId: 'ev-2',
    name: 'Elena Rostova',
    email: 'elena.rostova@cloudscale.net',
    ticketType: 'Student',
    registeredAt: '2026-06-04T15:05:00Z',
    checkedIn: false,
    notes: 'Requires assistive subtitles for live stream.'
  },
  {
    id: 'at-6',
    eventId: 'ev-3',
    name: 'Liam Gallagher',
    email: 'liam@oasisventuring.com',
    ticketType: 'General',
    registeredAt: '2026-06-02T18:30:00Z',
    checkedIn: false
  },
  {
    id: 'at-7',
    eventId: 'ev-3',
    name: 'Diana Prince',
    email: 'diana.prince@themyscira.co',
    ticketType: 'VIP',
    registeredAt: '2026-06-05T12:00:00Z',
    checkedIn: true,
    checkedInAt: '2026-06-06T17:40:00Z',
    notes: 'Arriving with a cohort of 3 founders.'
  }
];

export const COPILOT_LOGS: CopilotLog[] = [
  {
    id: "cop-1",
    stage: "Activity 1: Foundational Development",
    taskTitle: "Creating Event Cards & Real-Time Two-Way Data Binding",
    challenge: "Defining static models and establishing a direct way to support two-way bindings in components, where changing fields instantly reflects in the card layout previews without state lag.",
    promptUsed: "Generate a custom Blazor component and corresponding C# structures for an Event Card with fields like Title, Date, Time, Location, and Organizer. The component must support full two-way data-binding (`@bind-value`) with validation error triggers so changes immediately update the live layout preview and notify parent controls.",
    assistanceReceived: "Copilot generated a clean declarative model, customized form handlers with native React-style state handlers (adapted from Blazor's @bind mechanism), and structured visual preview containers where labels adapt fluidly as characters are typed.",
    outcomeAndValue: "Created dynamic cards with responsive inputs, customized tags matching event categories (e.g. Conference, Webinar, Social), and live availability bars tracking registered ratio against capacity thresholds."
  },
  {
    id: "cop-2",
    stage: "Activity 2: Debugging and Optimization",
    taskTitle: "Custom Route Resolution, Navigation Guards & Input Validation",
    challenge: "Fixing boundary edge-cases with routing parameters (e.g., event IDs that do not exist), preventing negative/illegal event capacity values, and validating input emails against patterns before form completion.",
    promptUsed: "I need to configure a bulletproof validation system for a registration form with strict email regex checks, ticket capacity limits, and route mismatch handling. Please provide optimal pattern matches and advise on React/Blazor route guards to gracefully reject empty queries and fake IDs.",
    assistanceReceived: "Provided highly responsive regex rules, error-boundary state structures, automatic fallback route redirection logic, and user-level warning alerts ensuring email formats are valid and booking spaces are available.",
    outcomeAndValue: "Form submission is strictly prevented if errors exist; input borders shift beautifully to error state (high-contrast coral border), and navigating to invalid URIs triggers a delightful custom 404 screen instead of white-screens."
  },
  {
    id: "cop-3",
    stage: "Activity 3: Advanced Feature Implementation",
    taskTitle: "Registration Form, Sessions & Interactive Attendance Tracker",
    challenge: "Handling complex multi-level states: checking user registrations, incrementing event participant counters, storing active user session headers, and tracking attendance status (checked-in/checked-out) in real-time.",
    promptUsed: "Help me design an enterprise-grade attendee check-in and search terminal where administrators can toggle check-in statuses, register new VIP or General track attendees, search queries by name or email, and view active statistical gauges of current attendance percentage.",
    assistanceReceived: "Copilot outputted sophisticated search-filter patterns, local-storage state synchronization tricks, and reactive calculations for attendance ratios. It also structured the registration flow to increment registered count on successful join.",
    outcomeAndValue: "Admin controls feature beautiful instant metrics: total registrations, checked-in percentage gauges, real-time filtering, and visual toggles to immediately flip statuses without reloading page."
  }
];
