/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COPILOT_LOGS } from '../data';
import { Sparkles, Cpu, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CopilotAssistantPanel() {
  return (
    <div id="copilot-panel" className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-sm uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Copilot Integration Suite</span>
          </div>
          <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
            AI Assistant Portfolio Logs
          </h2>
          <p className="text-slate-300 mt-1 max-w-2xl text-sm md:text-base">
            Detailed log documenting how AI Copilot was leveraged across planning, validation design, debugging, and advanced feature composition.
          </p>
        </div>
        <div className="bg-indigo-550/15 border border-indigo-500/30 rounded-lg p-3 flex items-center gap-2 backdrop-blur-md">
          <Cpu className="text-indigo-400 w-5 h-5 animate-pulse" />
          <span className="text-xs font-mono font-medium text-indigo-300">COPILOT STATUS: ASSISTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {COPILOT_LOGS.map((log) => (
          <div 
            key={log.id} 
            id={`log-card-${log.id}`}
            className="bg-white/5 rounded-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all hover:bg-white/10 p-6 flex flex-col gap-6 backdrop-blur-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest block mb-1">
                  {log.stage}
                </span>
                <h3 className="text-lg font-bold text-white font-sans tracking-tight">
                  {log.taskTitle}
                </h3>
              </div>
              <span className="bg-emerald-500/10 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1 self-start md:self-center">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                    Developmental Challenge
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans">{log.challenge}</p>
                </div>

                <div className="bg-slate-950/50 rounded-lg p-4 border border-white/5 font-mono">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                    Sample Prompt Sent to Copilot
                  </h4>
                  <p className="text-xs text-indigo-150 leading-relaxed italic bg-white/5 p-3 rounded border border-white/10 shadow-inner">
                    "{log.promptUsed}"
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5 font-sans">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    Copilot Generation Guidance
                  </h4>
                  <p className="text-slate-300 leading-relaxed font-sans">{log.assistanceReceived}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-indigo-300 mb-1 flex items-center gap-1.5 font-sans bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded w-fit text-xs font-medium">
                    Outcome & Project Artifact Value
                  </h4>
                  <p className="text-indigo-200 leading-relaxed font-sans mt-2">{log.outcomeAndValue}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
