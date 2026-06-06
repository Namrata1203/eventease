/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Event, Attendee } from '../types';
import { 
  CheckCircle, 
  AlertTriangle, 
  Ticket, 
  Sparkles, 
  Loader2 
} from 'lucide-react';

interface RegistrationFormProps {
  events: Event[];
  selectedEventId?: string;
  onRegisterSubmit: (attendee: Omit<Attendee, 'id' | 'registeredAt'>) => void;
}

export default function RegistrationForm({ events, selectedEventId, onRegisterSubmit }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    eventId: selectedEventId || (events[0]?.id || ''),
    name: '',
    email: '',
    ticketType: 'General' as Attendee['ticketType'],
    notes: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ attendeeName: string; ticketCode: string } | null>(null);

  const activeEvent = events.find(e => e.id === formData.eventId);

  const validate = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters.';
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailPattern.test(formData.email)) {
      errors.email = 'Please provide a valid email format (e.g. john@doe.com).';
    }

    if (!formData.eventId) {
      errors.eventId = 'Please select an event.';
    } else if (activeEvent) {
      // Check event capacity threshold
      if (activeEvent.registeredCount >= activeEvent.capacity) {
        errors.eventId = 'This event is fully booked! Capacity limit reached.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field errors instantly on typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate standard network processing with state dispatching delay
    setTimeout(() => {
      onRegisterSubmit({
        eventId: formData.eventId,
        name: formData.name,
        email: formData.email,
        ticketType: formData.ticketType,
        notes: formData.notes,
        checkedIn: false
      });

      setIsSubmitting(false);
      setSuccessInfo({
        attendeeName: formData.name,
        ticketCode: `EE-2026-${Math.floor(1000 + Math.random() * 9000)}`
      });

      // Clear input fields for future bookings
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        notes: ''
      }));
    }, 800);
  };

  return (
    <div id="register-form-root" className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
      <div className="bg-slate-950/50 px-6 py-6 text-white border-b border-white/10">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-1.5">
          <Ticket className="w-4 h-4" />
          <span>Activity 3 Form Terminal</span>
        </div>
        <h3 className="text-xl font-bold font-sans tracking-tight text-white">Verified Registration Desk</h3>
        <p className="text-slate-300 text-xs mt-1">
          Full validation constraint testing, capacity checking, secure submission, and session ledgering.
        </p>
      </div>

      <div className="p-6 md:p-8">
        {successInfo ? (
          <div id="registration-success-card" className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center space-y-4 animate-fade-in backdrop-blur-md">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white font-sans">Booking Authenticated!</h4>
              <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
                Congratulations <span className="font-semibold text-white">{successInfo.attendeeName}</span>, your entry pass to {activeEvent?.title} has been generated and appended to the ledger.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-xs mx-auto text-left font-mono shadow-inner">
              <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest mb-2 border-b border-dotted border-white/10 pb-2">
                <span>EASE PASS</span>
                <span className="font-semibold text-indigo-400">CONFIRMED</span>
              </div>
              <p className="text-xs text-slate-400">TICKET ASSIGNMENT</p>
              <p className="text-sm font-bold text-white mb-2 font-sans">{formData.ticketType} Admission</p>
              <p className="text-xs text-slate-400">REFERENCE CODE</p>
              <p className="text-sm font-bold text-indigo-350 bg-white/5 px-2 py-1 rounded inline-block border border-white/5">{successInfo.ticketCode}</p>
            </div>

            <button 
              type="button"
              onClick={() => setSuccessInfo(null)}
              className="text-xs text-indigo-400 font-mono font-medium hover:underline hover:text-indigo-300 focus:outline-none"
            >
              ← Register another attendee for tracking
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                Select Event ease
              </label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${formErrors.eventId ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
              >
                {events.map((e) => (
                  <option key={e.id} value={e.id} className="bg-slate-900 text-white">
                    {e.title} ({e.capacity - e.registeredCount} spots open)
                  </option>
                ))}
              </select>
              {formErrors.eventId && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{formErrors.eventId}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                  Full Name
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Johnathan Doe"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white/5 text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${formErrors.name ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                />
                {formErrors.name && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                    <AlertTriangle className="w-3.5 h-3.5 font-sans" />
                    <span>{formErrors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                  Email Address
                </label>
                <input 
                  type="text" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@company.com"
                  className={`w-full px-3 py-2 border rounded-lg text-sm bg-white/5 text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 ${formErrors.email ? 'border-rose-500/50 focus:border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500'}`}
                />
                {formErrors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                Admission / Ticket Option
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['General', 'VIP', 'Speaker', 'Student'] as Attendee['ticketType'][]).map((type) => (
                  <label 
                    key={type}
                    onClick={() => setFormData(prev => ({ ...prev, ticketType: type }))}
                    className={`border rounded-xl p-3 text-center cursor-pointer block transition-all backdrop-blur-md ${
                      formData.ticketType === type 
                        ? 'border-indigo-500 bg-indigo-500/20 text-white ring-2 ring-indigo-500/20' 
                        : 'border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-305'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="ticketType" 
                      value={type}
                      checked={formData.ticketType === type}
                      onChange={() => {}} // handled via label click
                      className="sr-only"
                    />
                    <span className="text-xs font-bold font-sans block">{type}</span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                      {type === 'VIP' ? 'Premium' : type === 'Speaker' ? 'Invited' : 'Standard'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                Special Dietary, ADA, or Collaborative Notes (Optional)
              </label>
              <textarea 
                name="notes" 
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Mention any specifications or preferences..."
                className="w-full px-3 py-2 border border-white/10 rounded-lg text-sm bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-sans text-sm font-semibold py-3 px-4 rounded-xl hover:bg-indigo-500 disabled:bg-slate-700 cursor-pointer transition-all active:scale-[0.985] flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating Ledger Credentials...</span>
                </>
              ) : (
                <>
                  <span>Commit Secure Registration Ledger</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
