using eventease.Models;

namespace eventease.Services;

public class EventDataService
{
    public List<Event> Events { get; set; } = new()
    {
        new Event
        {
            Id = "ev-1",
            Title = "Global DevCon & Generative AI Summit",
            Date = "2026-06-12",
            Time = "09:00 AM - 05:00 PM",
            Location = "Silicon Valley Convention Center & Virtual",
            Description = "Join industry visionaries, platform Engineers, and model architects as we shape the future of software construction and agentic AI systems. Features keynote panels, interactive sandboxes, and deep dives.",
            Organizer = "NextGen Engineering Guild",
            Capacity = 250,
            RegisteredCount = 184,
            Category = "Conference",
            ImageUrl = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60"
        },
        new Event
        {
            Id = "ev-2",
            Title = "Advanced React & Vite Performance Sandbox",
            Date = "2026-06-18",
            Time = "01:00 PM - 04:30 PM",
            Location = "Apex Labs Tech Hub (Suite 404)",
            Description = "Learn the internals of the Vite dev server, server-side-rendering optimizations, reactive hook dependencies, and advanced state orchestration to achieve peak application speeds.",
            Organizer = "Frontend Guild SF",
            Capacity = 65,
            RegisteredCount = 52,
            Category = "Workshop",
            ImageUrl = "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60"
        },
        new Event
        {
            Id = "ev-3",
            Title = "Angel Syndicate & Founder Networking",
            Date = "2026-06-25",
            Time = "06:30 PM - 09:30 PM",
            Location = "The Luminary Rooftop Lounge",
            Description = "An exclusive networking event connecting early-stage founders building in deep tech, developer tooling, and healthcare with angels and seed investors eager to back visionary teams.",
            Organizer = "Founders Collective",
            Capacity = 100,
            RegisteredCount = 94,
            Category = "Social",
            ImageUrl = "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60"
        },
        new Event
        {
            Id = "ev-4",
            Title = "Designing Accessible Agentic Interfaces",
            Date = "2026-07-02",
            Time = "11:00 AM - 12:30 PM",
            Location = "Live on Google Meet & YouTube Stream",
            Description = "Explore the guidelines of human-agent symbiosis, feedback mechanisms for background tasks, layout fluidity, and screen reader parsing of dynamically updated logs.",
            Organizer = "Interaction Design Foundation",
            Capacity = 500,
            RegisteredCount = 312,
            Category = "Webinar",
            ImageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60"
        }
    };

    public List<Attendee> Attendees { get; set; } = new()
    {
        new Attendee
        {
            Id = "at-1",
            EventId = "ev-1",
            Name = "Sarah Chen",
            Email = "sarah.chen@techcorp.io",
            TicketType = "VIP",
            RegisteredAt = "2026-06-01T10:30:00Z",
            CheckedIn = true,
            CheckedInAt = "2026-06-06T14:15:00Z",
            Notes = "Keynote speaker for afternoon panel on Agent Orchestration."
        },
        new Attendee
        {
            Id = "at-2",
            EventId = "ev-1",
            Name = "Marcus Vance",
            Email = "m.vance@capitalpartners.com",
            TicketType = "VIP",
            RegisteredAt = "2026-06-02T16:45:00Z",
            CheckedIn = false,
            Notes = "Interested in seed pipeline & partner matchmaking."
        },
        new Attendee
        {
            Id = "at-3",
            EventId = "ev-1",
            Name = "Aria Takahashi",
            Email = "aria.t@tokyolabs.org",
            TicketType = "Speaker",
            RegisteredAt = "2026-06-01T09:12:00Z",
            CheckedIn = true,
            CheckedInAt = "2026-06-06T17:10:00Z",
            Notes = "Leading morning lab on Large Multimodal Models."
        },
        new Attendee
        {
            Id = "at-4",
            EventId = "ev-2",
            Name = "Alex Rivera",
            Email = "alex.r@frontenddev.net",
            TicketType = "General",
            RegisteredAt = "2026-06-03T11:20:00Z",
            CheckedIn = true,
            CheckedInAt = "2026-06-06T17:22:00Z"
        },
        new Attendee
        {
            Id = "at-5",
            EventId = "ev-2",
            Name = "Elena Rostova",
            Email = "elena.rostova@cloudscale.net",
            TicketType = "Student",
            RegisteredAt = "2026-06-04T15:05:00Z",
            CheckedIn = false,
            Notes = "Requires assistive subtitles for live stream."
        },
        new Attendee
        {
            Id = "at-6",
            EventId = "ev-3",
            Name = "Liam Gallagher",
            Email = "liam@oasisventuring.com",
            TicketType = "General",
            RegisteredAt = "2026-06-02T18:30:00Z",
            CheckedIn = false
        },
        new Attendee
        {
            Id = "at-7",
            EventId = "ev-3",
            Name = "Diana Prince",
            Email = "diana.prince@themyscira.co",
            TicketType = "VIP",
            RegisteredAt = "2026-06-05T12:00:00Z",
            CheckedIn = true,
            CheckedInAt = "2026-06-06T17:40:00Z",
            Notes = "Arriving with a cohort of 3 founders."
        }
    };

    public List<CopilotLog> CopilotLogs { get; set; } = new()
    {
        new CopilotLog
        {
            Id = "cop-1",
            Stage = "Activity 1: Foundational Development",
            TaskTitle = "Creating Event Cards & Real-Time Two-Way Data Binding",
            Challenge = "Defining static models and establishing a direct way to support two-way bindings in components, where changing fields instantly reflects in the card layout previews without state lag.",
            PromptUsed = "Generate a custom Blazor component and corresponding C# structures for an Event Card with fields like Title, Date, Time, Location, and Organizer. The component must support full two-way data-binding (`@bind-value`) with validation error triggers so changes immediately update the live layout preview and notify parent controls.",
            AssistanceReceived = "Copilot generated a clean declarative model, customized form handlers with native React-style state handlers (adapted from Blazor's @bind mechanism), and structured visual preview containers where labels adapt fluidly as characters are typed.",
            OutcomeAndValue = "Created dynamic cards with responsive inputs, customized tags matching event categories (e.g. Conference, Webinar, Social), and live availability bars tracking registered ratio against capacity thresholds."
        },
        new CopilotLog
        {
            Id = "cop-2",
            Stage = "Activity 2: Debugging and Optimization",
            TaskTitle = "Custom Route Resolution, Navigation Guards & Input Validation",
            Challenge = "Fixing boundary edge-cases with routing parameters (e.g., event IDs that do not exist), preventing negative/illegal event capacity values, and validating input emails against patterns before form completion.",
            PromptUsed = "I need to configure a bulletproof validation system for a registration form with strict email regex checks, ticket capacity limits, and route mismatch handling. Please provide optimal pattern matches and advise on React/Blazor route guards to gracefully reject empty queries and fake IDs.",
            AssistanceReceived = "Provided highly responsive regex rules, error-boundary state structures, automatic fallback route redirection logic, and user-level warning alerts ensuring email formats are valid and booking spaces are available.",
            OutcomeAndValue = "Form submission is strictly prevented if errors exist; input borders shift beautifully to error state (high-contrast coral border), and navigating to invalid URIs triggers a delightful custom 404 screen instead of white-screens."
        },
        new CopilotLog
        {
            Id = "cop-3",
            Stage = "Activity 3: Advanced Feature Implementation",
            TaskTitle = "Registration Form, Sessions & Interactive Attendance Tracker",
            Challenge = "Handling complex multi-level states: checking user registrations, incrementing event participant counters, storing active user session headers, and tracking attendance status (checked-in/checked-out) in real-time.",
            PromptUsed = "Help me design an enterprise-grade attendee check-in and search terminal where administrators can toggle check-in statuses, register new VIP or General track attendees, search queries by name or email, and view active statistical gauges of current attendance percentage.",
            AssistanceReceived = "Copilot outputted sophisticated search-filter patterns, local-storage state synchronization tricks, and reactive calculations for attendance ratios. It also structured the registration flow to increment registered count on successful join.",
            OutcomeAndValue = "Admin controls feature beautiful instant metrics: total registrations, checked-in percentage gauges, real-time filtering, and visual toggles to immediately flip statuses without reloading page."
        }
    };
}
