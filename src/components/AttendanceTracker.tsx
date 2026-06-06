/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Event, Attendee } from '../types';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  Clock, 
  Trash2, 
  CheckSquare, 
  Square,
  Sparkles,
  Award
} from 'lucide-react';

interface AttendanceTrackerProps {
  events: Event[];
  attendees: Attendee[];
  onToggleCheckIn: (attendeeId: string) => void;
  onRemoveAttendee: (attendeeId: string) => void;
}

export default function AttendanceTracker({ 
  events, 
  attendees, 
  onToggleCheckIn, 
  onRemoveAttendee 
}: AttendanceTrackerProps) {
  
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'checkedIn' | 'pending'>('all');

  // Handle Event selection changes
  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(e.target.value);
  };

  // Filter attendees based on criteria
  const filteredAttendees = useMemo(() => {
    return attendees.filter(attendee => {
      // 1. Event filter
      if (selectedEventId !== 'all' && attendee.eventId !== selectedEventId) {
        return false;
      }
      // 2. Status filter
      if (statusFilter === 'checkedIn' && !attendee.checkedIn) {
        return false;
      }
      if (statusFilter === 'pending' && attendee.checkedIn) {
        return false;
      }
      // 3. Text query search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = attendee.name.toLowerCase().includes(query);
        const matchesEmail = attendee.email.toLowerCase().includes(query);
        const matchesType = attendee.ticketType.toLowerCase().includes(query);
        return matchesName || matchesEmail || matchesType;
      }
      return true;
    });
  }, [attendees, selectedEventId, statusFilter, searchQuery]);

  // Aggregate metrics for active selection
  const stats = useMemo(() => {
    const listToMeasure = selectedEventId === 'all' 
      ? attendees 
      : attendees.filter(a => a.eventId === selectedEventId);

    const total = listToMeasure.length;
    const checkedIn = listToMeasure.filter(a => a.checkedIn).length;
    const percentage = total > 0 ? Math.round((checkedIn / total) * 100) : 0;

    return { total, checkedIn, percentage };
  }, [attendees, selectedEventId]);

  return (
    <div id="attendance-tracker-box" className="space-y-6">
      {/* HEADER METRICS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="p-3 bg-indigo-500/10 text-indigo-350 rounded-xl border border-indigo-500/20">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Total Registered</p>
            <p className="text-2xl font-black text-white font-sans">{stats.total} Guests</p>
            <p className="text-xs text-slate-300 mt-0.5">
              {selectedEventId === 'all' ? 'Across all events' : 'For selected event'}
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl backdrop-blur-md">
          <div className="p-3 bg-emerald-500/10 text-emerald-350 rounded-xl border border-emerald-500/20">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Checked In</p>
            <p className="text-2xl font-black text-white font-sans">{stats.checkedIn} Guests</p>
            <p className="text-xs text-slate-300 mt-0.5">
              {stats.total - stats.checkedIn} pending admittance
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-500/10 text-teal-350 rounded-xl border border-teal-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Completion Ratio</p>
              <p className="text-2xl font-black text-white font-sans">{stats.percentage}%</p>
              <p className="text-xs text-slate-300 mt-0.5">Checked-in rate</p>
            </div>
          </div>
          
          {/* Semicircular progress bar widget */}
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-400 transition-all duration-500 stroke-dasharray"
                strokeWidth="3.5"
                strokeDasharray={`${stats.percentage}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white">
              {stats.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS HUB */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-md">
        <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span>Real-Time Roster Query Controllers</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Event Filter Selector */}
          <div className="md:col-span-4">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              Filter by Event Link
            </label>
            <select
              value={selectedEventId}
              onChange={handleEventChange}
              className="w-full px-3 py-2 border border-white/10 bg-slate-900 text-white rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all" className="bg-slate-900 text-white">Show All Registered Events</option>
              {events.map(e => (
                <option key={e.id} value={e.id} className="bg-slate-900 text-white">{e.title}</option>
              ))}
            </select>
          </div>

          {/* Search Query Parameter Input */}
          <div className="md:col-span-5 relative">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              Search Full Name / Email / Ticket
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text"
                placeholder="e.g. Sarah Chen or VIP"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-white/10 bg-white/5 text-white rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Status Radio Tier */}
          <div className="md:col-span-3">
            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
              Registration Status
            </label>
            <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-lg text-xs">
              {(['all', 'checkedIn', 'pending'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  type="button"
                  className={`flex-1 py-1 text-[10.5px] font-sans font-medium rounded-md transition-all cursor-pointer ${
                    statusFilter === f 
                      ? 'bg-indigo-650 text-white shadow-md' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'checkedIn' ? 'Present' : 'Absent'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROSTER GRID/LIST */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        <div className="px-6 py-4 bg-slate-950/40 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-mono font-bold text-slate-400">RENDERED RESULTS:</p>
            <span className="bg-indigo-500/10 text-indigo-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold border border-indigo-500/20">
              {filteredAttendees.length} records matching search criteria
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Click checkboxes to toggle check-in
          </span>
        </div>

        {filteredAttendees.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <XCircle className="w-10 h-10 mx-auto text-slate-550" />
            <p className="font-sans font-bold text-white">No matching attendees located</p>
            <p className="text-xs max-w-sm mx-auto leading-relaxed text-slate-400">
              Adjust your search keywords or register new participants on the Registration Form sub-tab to enrich this ledger.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-mono text-[10.5px] uppercase tracking-wider bg-white/5">
                  <th className="py-3 px-6 text-center w-12">Admit</th>
                  <th className="py-3 px-6">Attendee Information</th>
                  <th className="py-3 px-6">Pass Type</th>
                  <th className="py-3 px-6">Associated Event Event</th>
                  <th className="py-3 px-6">Registration Date</th>
                  <th className="py-3 px-6 text-center w-16">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAttendees.map((attendee) => {
                  const eventName = events.find(e => e.id === attendee.eventId)?.title || 'Unknown Event';
                  
                  return (
                    <tr 
                      key={attendee.id} 
                      className={`hover:bg-white/5 transition-all ${attendee.checkedIn ? 'bg-emerald-500/5' : ''}`}
                    >
                      {/* Check-In Toggle Checkbox Column */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleCheckIn(attendee.id)}
                          className="text-slate-400 hover:text-indigo-400 inline-block focus:outline-none cursor-pointer"
                        >
                          {attendee.checkedIn ? (
                            <CheckSquare className="w-5 h-5 text-emerald-400 transition-transform" />
                          ) : (
                            <Square className="w-5 h-5 text-slate-500 hover:text-indigo-400 transition-transform" />
                          )}
                        </button>
                      </td>

                      {/* Attendee Info */}
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-bold text-white font-sans">{attendee.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{attendee.email}</p>
                          {attendee.notes && (
                            <span className="inline-block mt-1 text-[10.5px] text-amber-300 bg-amber-550/10 rounded px-1.5 py-0.5 border border-amber-500/20 font-sans italic">
                              Note: {attendee.notes}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Ticket Tier Badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-sans font-bold tracking-wide uppercase border ${
                          attendee.ticketType === 'VIP' 
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' 
                            : attendee.ticketType === 'Speaker' 
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' 
                              : attendee.ticketType === 'Student' 
                                ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
                                : 'bg-white/10 text-white border-white/20'
                        }`}>
                          {attendee.ticketType}
                        </span>
                      </td>

                      {/* Linked Event Title */}
                      <td className="py-4 px-6 max-w-xs truncate">
                        <span className="text-xs font-semibold text-slate-200 font-sans">
                          {eventName}
                        </span>
                      </td>

                      {/* Log Timestamp */}
                      <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {new Date(attendee.registeredAt).toLocaleDateString()}
                          </span>
                          {attendee.checkedIn && attendee.checkedInAt && (
                            <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/15 border border-emerald-500/20 px-1 py-0.5 rounded w-fit uppercase">
                              In: {new Date(attendee.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Remove Record Button */}
                      <td className="py-4 px-6 text-center">
                        <button
                          type="button"
                          onClick={() => onRemoveAttendee(attendee.id)}
                          className="p-1 px-1.5 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 transition-all cursor-pointer"
                          title="Deregister this attendee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
