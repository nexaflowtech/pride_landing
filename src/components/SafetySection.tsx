/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Lock, Users2 } from 'lucide-react';
import { handleSpotlightMouseMove } from '../utils';

export default function SafetySection() {
  return (
    <section className="py-24" id="safety">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="glass-card rounded-[3rem] p-12 md:p-20 overflow-hidden relative border border-white/10 group hover:border-brand-primary/20">
          
          {/* Huge background giant protective crest icon */}
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
            <Shield size={220} className="text-white fill-current" />
          </div>

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-mono text-xs font-bold px-3 py-1.5 rounded-full mb-6">
              <Lock size={12} />
              <span>RADICAL PROTECTION</span>
            </div>
            
            <h2 className="font-font-geist text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight">
              Safety is Our Baseline, Not a Feature.
            </h2>
            
            <p className="font-sans text-brand-on-surface-variant text-lg mb-10 leading-relaxed">
              We employ a strict zero-tolerance policy for hate speech, harassment, tokenization, and discrimination. Our ecosystem relies on highly specialized filtration mechanisms integrated with compassionate, empathetic human reviewers who understand our language, safety requirements, and culture.
            </p>

            {/* Check list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Point 1 */}
              <div
                onMouseMove={handleSpotlightMouseMove}
                className="flex items-start gap-4 glass-card bg-black/30 p-5 rounded-2xl border border-white/5 shadow-inner"
              >
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <h5 className="font-font-geist text-base font-bold text-white mb-1">Encrypted by Design</h5>
                  <p className="font-sans text-xs text-brand-on-surface-variant leading-relaxed">
                    Your personal chat history, matches, and identity choices are strictly encrypted. They belong only to you.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div
                onMouseMove={handleSpotlightMouseMove}
                className="flex items-start gap-4 glass-card bg-black/30 p-5 rounded-2xl border border-white/5 shadow-inner"
              >
                <div className="w-10 h-10 bg-brand-tertiary/10 rounded-xl flex items-center justify-center text-brand-tertiary shrink-0">
                  <Users2 size={20} />
                </div>
                <div>
                  <h5 className="font-font-geist text-base font-bold text-white mb-1">Human Moderation</h5>
                  <p className="font-sans text-xs text-brand-on-surface-variant leading-relaxed">
                    Support collectives comprised of members from our communities who actually understand cultural subtleties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
