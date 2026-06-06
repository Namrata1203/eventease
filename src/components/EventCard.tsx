/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Event } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Tag, 
  Users, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

interface EventCardProps {
  initialEvent: Event;
  onSave?: (updatedEvent: Event) => void;
}

export default function EventCard({ initialEvent, onSave }: EventCardProps) {
  const [event, setEvent] = useState<Event>({ ...initialEvent });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaved, setIsSaved] = useState(false);

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'title':
        return value.trim() === '' ? 'Event Title is required.' : '';
      case 'organizer':
        return value.trim() === '' ? 'Organizer Name is required.' : '';
      case 'location':
        return value.trim() === '' ? 'Location is required.' : '';
      case 'capacity':
        const cap = Number(value);
        if (isNaN(cap) || cap <= 0) return 'Capacity must be at least 1 guest.';
        if (cap > 10000) return 'Capacity cannot exceed 10,000.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'capacity' ? Number(value) : value;

    // Two-way binding updates local event state immediately
    const updatedEvent = {
      ...event,
      [name]: newValue
    };
    setEvent(updatedEvent);

    // Dynamic Validation Check
    const errMessage = validateField(name, newValue);
    setErrors(prev => ({
      ...prev,
      [name]: errMessage
    }));

    setIsSaved(false);

    // Bubble updates live to parent container if handler exists
    if (onSave) {
      onSave(updatedEvent);
    }
  };

  const handleTriggerSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger full validation checks before submitting
    const newErrors: { [key: string]: string } = {};
    Object.keys(event).forEach((key) => {
      const msg = validateField(key, (event as any)[key]);
      if (msg) newErrors[key] = msg;
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some(m => m !== '')) {
      return;
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);

    if (onSave) {
      onSave(event);
    }
  };

  // Color badges based on category tags
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Conference':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/20 backdrop-blur-md';
      case 'Workshop':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20 backdrop-blur-md';
      case 'Social':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20 backdrop-blur-md';
      case 'Webinar':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20 backdrop-blur-md';
      default:
        return 'bg-white/10 text-white border-white/25 backdrop-blur-md';
    }
  };

  const fillPercentage = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));

  return (
    <div id={`event-card-container-${event.id}`} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* COLUMN 1: INTERACTIVE TWO-WAY FORM */}
      <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-4 font-sans tracking-tight border-b border-white/10 pb-2">
          Reactive Binder Controller
        </h3>
        
        <form onSubmit={handleTriggerSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              Event Title
            </label>
            <input 
              type="text" 
              name="title" 
              value={event.title}
              onChange={handleChange}
              placeholder="e.g. Virtual Reality Meetup"
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-white/5 text-white placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${errors.title ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
            />
            {errors.title && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                Category
              </label>
              <select
                name="category"
                value={event.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
              >
                <option value="Conference" className="bg-slate-900 text-white">Conference</option>
                <option value="Workshop" className="bg-slate-900 text-white">Workshop</option>
                <option value="Meetup" className="bg-slate-900 text-white">Meetup</option>
                <option value="Webinar" className="bg-slate-900 text-white">Webinar</option>
                <option value="Social" className="bg-slate-900 text-white">Social</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
                Max Capacity
              </label>
              <input 
                type="number" 
                name="capacity" 
                value={event.capacity}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm bg-white/5 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${errors.capacity ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
              />
              {errors.capacity && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{errors.capacity}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
                Date String
              </label>
              <input 
                type="date" 
                name="date" 
                value={event.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1 font-mono">
                Duration / Time
              </label>
              <input 
                type="text" 
                name="time" 
                value={event.time}
                onChange={handleChange}
                placeholder="e.g. 02:00 PM - 05:00 PM"
                className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              Organizer
            </label>
            <input 
              type="text" 
              name="organizer" 
              value={event.organizer}
              onChange={handleChange}
              placeholder="e.g. Google Developers Group"
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-white/5 text-white placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${errors.organizer ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
            />
            {errors.organizer && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{errors.organizer}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              Location
            </label>
            <input 
              type="text" 
              name="location" 
              value={event.location}
              onChange={handleChange}
              placeholder="e.g. 1600 Amphitheatre Pkwy"
              className={`w-full px-3 py-2 border rounded-lg text-sm bg-white/5 text-white placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${errors.location ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
            />
            {errors.location && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{errors.location}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-mono">
              Event Description
            </label>
            <textarea 
              name="description" 
              value={event.description}
              onChange={handleChange}
              rows={3}
              placeholder="Provide a compelling brief outline of what guests can anticipate..."
              className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-sans text-sm font-semibold py-2.5 px-4 rounded-xl hover:bg-indigo-500 cursor-pointer transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Event Settings Applied</span>
              </>
            ) : (
              <span>Persist Card Parameters</span>
            )}
          </button>
        </form>
      </div>

      {/* COLUMN 2: THE REAL-TIME BOUND DYNAMIC PREVIEW CARD */}
      <div className="lg:col-span-7 flex flex-col justify-start">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-widest block">
            ▲ Real-Time Binding Preview Card
          </span>
          <span className="text-xs font-mono text-slate-500">
            Reactive updates on compile keystrokes
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md transition-transform hover:scale-[1.005]">
          {/* Cover Hero Image Placeholder / presets */}
          <div className="h-48 md:h-56 relative bg-white/5">
            {event.imageUrl ? (
              <img 
                src={event.imageUrl} 
                alt={event.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filtering-saturate" 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-6 text-center">
                <span className="text-slate-400 font-mono text-xs uppercase tracking-widest block">No Visual Assets Configured</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-sans tracking-wide uppercase border ${getCategoryStyles(event.category)}`}>
                <Tag className="inline-block w-3 h-3 mr-1 align-text-bottom" />
                {event.category || 'Event'}
              </span>
            </div>
            
            <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-right">Organized by</p>
              <p className="text-xs font-semibold text-white font-sans text-right">
                {event.organizer || 'Unnamed Host'}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white font-sans tracking-tight leading-snug">
                {event.title || <span className="text-slate-500 italic">Untitled Event Event Card</span>}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-y border-white/10 py-4 font-sans text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Date Proposed</p>
                  <p className="font-semibold text-white">{event.date || 'To Be Confirmed'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Time / Range</p>
                  <p className="font-semibold text-white">{event.time || 'TBD'}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 md:col-span-2">
                <div className="p-2 rounded-lg bg-white/5 text-slate-300 border border-white/5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Venue Location</p>
                  <p className="font-semibold text-white">{event.location || 'Virtual Sandbox Connection Link'}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">Subject Abstract</p>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mt-1 bg-white/5 p-4 rounded-xl border border-white/10">
                {event.description || <span className="text-slate-500 italic">No description has been supplied for this EventEase card simulation. Write inside the reactive controller to observe characters binded!</span>}
              </p>
            </div>

            {/* Attendance metrics */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 mb-2">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>REGISTRATION BAROMETER</span>
                </span>
                <span>{event.registeredCount} / {event.capacity} Guests</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${fillPercentage > 90 ? 'bg-amber-500 animate-pulse' : 'bg-indigo-500'}`}
                  style={{ width: `${fillPercentage}%` }}
                ></div>
              </div>
              <p className="text-[10px] font-mono text-slate-400 mt-2 text-right">
                {event.capacity - event.registeredCount} vacancy opportunities remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
