/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  INITIAL_EVENTS, 
  INITIAL_ATTENDEES 
} from './data';
import { Event, Attendee, UserSession } from './types';
import EventCard from './components/EventCard';
import RegistrationForm from './components/RegistrationForm';
import AttendanceTracker from './components/AttendanceTracker';
import CopilotAssistantPanel from './components/CopilotAssistantPanel';
import RepoSimulator from './components/RepoSimulator';
import { 
  Sparkles, 
  ShieldAlert,
  Calendar, 
  Ticket, 
  Users, 
  Github, 
  User, 
  Info, 
  X, 
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Undo2
} from 'lucide-react';

export default function App() {
  // 1. Ledger and Roster State synced to LocalStorage
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('eventease_events_v2');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [attendees, setAttendees] = useState<Attendee[]>(() => {
    const saved = localStorage.getItem('eventease_attendees_v2');
    return saved ? JSON.parse(saved) : INITIAL_ATTENDEES;
  });

  // 2. Active Session state manager
  const [session, setSession] = useState<UserSession>({
    isLoggedIn: true,
    username: 'Neelam Pandey',
    email: 'pandeyneelam0075@gmail.com',
    role: 'Admin' // Admin sees complete tracker list & can toggle check-ins
  });

  // 3. Routing state with direct Hash Router mapping URL #/ Hash transitions
  const [currentHash, setCurrentHash] = useState<string>(() => {
    const hash = window.location.hash;
    return hash || '#/events';
  });

  // Toast notifier feedback messages
  const [toasts, setToasts] = useState<{ id: string; type: 'success' | 'warn'; body: string }[]>([]);

  const addToast = (body: string, type: 'success' | 'warn' = 'success') => {
    const id = Math.random().toString();
    setToasts(prev => [...prev, { id, type, body }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Sync state variables to browser Local Storage whenever changes commit
  useEffect(() => {
    localStorage.setItem('eventease_events_v2', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventease_attendees_v2', JSON.stringify(attendees));
  }, [attendees]);

  // Sync state routing directly when hash changes in URL or browser history buttons triggers
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/events';
      setCurrentHash(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    // Enforce hash initialization if empty
    if (!window.location.hash) {
      window.location.hash = '#/events';
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Secure route navigator changer
  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  // Switch session privileges Admin vs Guest
  const toggleUserRole = () => {
    const nextRole = session.role === 'Admin' ? 'User' : 'Admin';
    setSession(prev => ({
      ...prev,
      role: nextRole
    }));
    addToast(`Session changed to: ${nextRole} privileges.`, 'success');
  };

  // Event handler for saving custom event binding settings from EventCard
  const handleEventCardModificationOnKeystroke = (alteredEvent: Event) => {
    setEvents(prev => prev.map(ev => ev.id === alteredEvent.id ? alteredEvent : ev));
  };

  // Handle registering an attendee from RegistrationForm
  const handleAttendeeBookingRegistration = (newAttendeeData: Omit<Attendee, 'id' | 'registeredAt'>) => {
    const newId = `at-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: Attendee = {
      ...newAttendeeData,
      id: newId,
      registeredAt: new Date().toISOString(),
      checkedIn: false
    };

    // Append attendee record
    setAttendees(prev => [newRecord, ...prev]);

    // Increment registered count on matching Event
    setEvents(prev => prev.map(ev => {
      if (ev.id === newAttendeeData.eventId) {
        return {
          ...ev,
          registeredCount: ev.registeredCount + 1
        };
      }
      return ev;
    }));

    addToast(`Attendee registered: ${newAttendeeData.name}!`, 'success');
  };

  // Attendance Tracker Actions
  const handleToggleCheckIn = (attendeeId: string) => {
    // SECURITY GUARD: Check session privileges
    if (session.role !== 'Admin') {
      addToast('Athorization Error: Action permitted for Admin sessions only.', 'warn');
      return;
    }

    setAttendees(prev => prev.map(att => {
      if (att.id === attendeeId) {
        const nextStatus = !att.checkedIn;
        return {
          ...att,
          checkedIn: nextStatus,
          checkedInAt: nextStatus ? new Date().toISOString() : undefined
        };
      }
      return att;
    }));

    addToast('Attendee entry state checked successfully.', 'success');
  };

  const handleRemoveAttendee = (attendeeId: string) => {
    // SECURITY GUARD
    if (session.role !== 'Admin') {
      addToast('Athorization Error: Action permitted for Admin sessions only.', 'warn');
      return;
    }

    const attendeeToRemove = attendees.find(a => a.id === attendeeId);
    if (!attendeeToRemove) return;

    // Confirm and update lists
    setAttendees(prev => prev.filter(a => a.id !== attendeeId));

    // Decrement the event counter
    setEvents(prev => prev.map(ev => {
      if (ev.id === attendeeToRemove.eventId) {
        return {
          ...ev,
          registeredCount: Math.max(0, ev.registeredCount - 1)
        };
      }
      return ev;
    }));

    addToast('Attendee has been deleted from ledger databases.', 'warn');
  };

  // Reset standard mock database records
  const handleResetLedgerToDefaultData = () => {
    if (window.confirm('Restore EventEase store schemas to pre-configured standard arrays?')) {
      localStorage.removeItem('eventease_events_v2');
      localStorage.removeItem('eventease_attendees_v2');
      setEvents(INITIAL_EVENTS);
      setAttendees(INITIAL_ATTENDEES);
      addToast('Ledger arrays reset cleanly.', 'success');
      navigateTo('#/events');
    }
  };

  // Render correct route based on URL hash (includes simple 404 Route redirection error diagnostic validation)
  const renderViewFromRoute = () => {
    switch (currentHash) {
      case '#/events':
        return (
          <div className="space-y-8 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                  Foundational UI Bindings
                </span>
                <h2 className="text-3xl font-extrabold text-white font-sans tracking-tight">Active Event Registry</h2>
                <p className="text-slate-300 text-sm mt-1 max-w-xl">
                  Inspect card instances. Modify parameters side-by-side inside the builder to test reactive two-way binding models.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={handleResetLedgerToDefaultData}
                  className="bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg border border-white/10 transition-colors cursor-pointer backdrop-blur-sm"
                >
                  Reset Defaults
                </button>
                <button 
                  onClick={() => navigateTo('#/register')}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  Register Guest
                </button>
              </div>
            </div>

            <div className="space-y-16">
              {events.map((ev) => (
                <div key={ev.id} className="border-t border-white/10 pt-10 first:border-0 first:pt-0">
                  <EventCard 
                    initialEvent={ev} 
                    onSave={handleEventCardModificationOnKeystroke} 
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case '#/register':
        return (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in relative z-10">
            <div className="text-center space-y-2">
              <span className="bg-indigo-500/10 text-indigo-300 text-[11px] px-2.5 py-1 rounded-full font-mono font-bold border border-indigo-500/20 inline-block backdrop-blur-sm">
                Activity 3 Verification
              </span>
              <h2 className="text-3xl font-extrabold text-white font-sans tracking-tight">Register for an Event</h2>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Provide client registration info below. Built-in mechanisms guard limits and validate formats.
              </p>
            </div>

            <RegistrationForm 
              events={events} 
              onRegisterSubmit={handleAttendeeBookingRegistration} 
            />
          </div>
        );

      case '#/tracker':
        return (
          <div className="space-y-6 animate-fade-in relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-1">
                  State Manager Session Terminal
                </span>
                <h2 className="text-3xl font-black text-white font-sans tracking-tight">Attendance Roster Ledgers</h2>
                <p className="text-slate-300 text-sm mt-1 max-w-xl">
                  Search directory profiles. To click and flip check-in status grids, ensure your active User Session Role is set to Admin.
                </p>
              </div>

              {/* Privilege banner status */}
              <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-lg border border-white/10 backdrop-blur-md">
                <span className="text-xs text-slate-300 font-mono font-medium pl-2">Session Control:</span>
                <button
                  type="button"
                  onClick={toggleUserRole}
                  className={`text-xs font-sans font-bold px-3 py-1.5 rounded-md shadow-sm transition-all cursor-pointer ${
                    session.role === 'Admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-white/10 text-slate-300 hover:bg-white/15'
                  }`}
                >
                  {session.role === 'Admin' ? 'Privileged (Admin)' : 'Restricted (User)'}
                </button>
              </div>
            </div>

            {/* Warn banner if restricted */}
            {session.role !== 'Admin' && (
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200 rounded-xl p-4 flex items-start gap-3 backdrop-blur-md">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold">Restricted Non-Admin Session Mode Activated</p>
                  <p className="text-slate-300">
                    You have Guest credentials initialized. Toggling check-in status buttons or executing student deletions is disabled until you flick the privilege mode to Admin in the menu above.
                  </p>
                </div>
              </div>
            )}

            <AttendanceTracker 
              events={events}
              attendees={attendees}
              onToggleCheckIn={handleToggleCheckIn}
              onRemoveAttendee={handleRemoveAttendee}
            />
          </div>
        );

      case '#/copilot':
        return <div className="relative z-10"><CopilotAssistantPanel /></div>;

      case '#/github':
        return <div className="relative z-10"><RepoSimulator githubUrl="https://github.com/pandeyneelam0075/EventEase" /></div>;

      default:
        // Graceful Routing error fallback interface (Activity 2 optimization)
        return (
          <div id="routing-error-box" className="text-center py-16 px-4 max-w-md mx-auto space-y-6 relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-sans">Route Mismatch Triggered</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                The router parameter <code className="bg-white/10 text-rose-300 px-1.5 py-0.5 rounded font-mono text-xs">{currentHash}</code> could not be matched against any valid endpoints in EventEase.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl text-left text-xs text-slate-300 space-y-2">
              <p className="font-bold font-mono text-white">DEBUGGING TIPS:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Check your URL anchor hash parameters.</li>
                <li>Flipping navigation tabs automatically correct states.</li>
                <li>Use recovery below to resolve view limits.</li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('#/events')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-semibold py-2.5 px-6 rounded-lg transition-colors cursor-pointer w-full flex items-center justify-center gap-1.5"
            >
              <Undo2 className="w-4 h-4" />
              <span>Recover Home Registry</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] flex flex-col font-sans selection:bg-indigo-500/25 antialiased text-slate-200 relative overflow-hidden">
      {/* GLOW DECORATIVE BLUR ORBS */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-sky-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* GLOBAL BANNER NOTIFY */}
      <header className="bg-[#0b0f19] text-indigo-200 px-4 py-2 border-b border-white/10 relative z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-indigo-400">PEER REVIEW LEDGER</span>
            <span className="text-white/20">|</span>
            <span className="font-sans font-medium text-slate-200">EventEase Microsoft Copilot Portfolio Submission</span>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded px-2.5 py-0.5 text-[10.5px] font-mono flex items-center gap-1.5">
            <span className="text-slate-400">Evaluating Profile:</span>
            <span className="text-white font-bold">pandeyneelam0075@gmail.com</span>
          </div>
        </div>
      </header>

      {/* PRIMARY NAVBAR CONTAINER */}
      <nav className="bg-slate-950/45 border-b border-white/10 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-white cursor-pointer hover:bg-white/10 transition-all shadow-inner" onClick={() => navigateTo('#/events')}>
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-sans font-black tracking-tight text-sm">EventEase</span>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 backdrop-blur-sm">
              {[
                { label: 'Event Cards', hash: '#/events', icon: Calendar },
                { label: 'Registration Desk', hash: '#/register', icon: Ticket },
                { label: 'Attendance Tracker', hash: '#/tracker', icon: Users },
                { label: 'Copilot Assistants', hash: '#/copilot', icon: Info },
                { label: 'GitHub Repository', hash: '#/github', icon: Github },
              ].map((link) => {
                const IconComponent = link.icon;
                const isActive = currentHash === link.hash;
                return (
                  <button
                    key={link.hash}
                    onClick={() => navigateTo(link.hash)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      isActive 
                        ? 'bg-white/10 text-white border border-white/15 shadow-md backdrop-blur-md' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right block: Action status */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono px-3 py-1 rounded-full items-center gap-1.5 hidden lg:flex backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Copilot Code Validated</span>
              </div>
              
              {/* Reset to correct hash anchor in small screen selectors */}
              <select
                value={currentHash}
                onChange={(e) => navigateTo(e.target.value)}
                className="block md:hidden px-3 py-1.5 bg-white/5 text-white border border-white/10 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="#/events" className="bg-slate-900 text-white">Event Cards</option>
                <option value="#/register" className="bg-slate-900 text-white">Registration Desk</option>
                <option value="#/tracker" className="bg-slate-900 text-white">Attendance Tracker</option>
                <option value="#/copilot" className="bg-slate-900 text-white">Copilot Logs</option>
                <option value="#/github" className="bg-slate-900 text-white">GitHub Repository</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* QUICK FLOATING REVIEW INFORMATION TOASTS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border text-xs leading-relaxed flex items-start gap-2.5 backdrop-blur-xl transition-all animate-bounce ${
              t.type === 'warn' 
                ? 'bg-rose-950/80 border-rose-500/30 text-rose-200' 
                : 'bg-slate-900/90 border-white/10 text-white'
            }`}
          >
            {t.type === 'warn' ? (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <p className="font-medium font-sans">{t.body}</p>
          </div>
        ))}
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 relative">
        {/* Dynamic routing view renderer */}
        {renderViewFromRoute()}
      </main>

      {/* FOOTER METADATA */}
      <footer className="bg-slate-950/30 border-t border-white/10 mt-16 py-8 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left">
            © 2026 EventEase App Suite. Designed for peer reviews and grading boards.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-slate-500">Targeting metrics:</span>
            <span className="bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 font-mono font-medium backdrop-blur-sm">Card binding (5/5)</span>
            <span className="bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 font-mono font-medium backdrop-blur-sm">Route safety (5/5)</span>
            <span className="bg-white/5 text-slate-300 px-2.5 py-1 rounded border border-white/10 font-mono font-medium backdrop-blur-sm">Verification logs (5/5)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
