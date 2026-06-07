/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldAlert, Sparkles, MessageCircle, EyeOff, ShieldCheck, HeartHandshake, Eye, Settings } from 'lucide-react';
import { handleSpotlightMouseMove } from '../utils';

export default function BentoGrid() {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'matching' | 'chat' | 'privacy'>('all');

  return (
    <section className="py-24 bg-brand-surface overflow-hidden relative" id="community">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <label className="font-geist text-xs font-bold text-brand-primary tracking-widest uppercase mb-3 block">
            Craftsmanship
          </label>
          <h2 className="font-font-geist text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Crafted for Your Digital Soul
          </h2>
          <p className="font-sans text-brand-on-surface-variant max-w-2xl mx-auto">
            Modern features integrated seamlessly with radical safety policies and absolute personal controls.
          </p>
        </div>

        {/* Responsive Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[620px]">
          {/* Card 1: Verified Profiles */}
          <div
            onMouseMove={handleSpotlightMouseMove}
            className="md:col-span-8 md:row-span-1 glass-card glass-spotlight p-8 rounded-3xl relative overflow-hidden group border border-white/10 flex flex-col justify-between hover:border-brand-primary/30"
          >
            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h4 className="font-geist text-2xl font-bold mb-2 text-white flex items-center gap-1.5">
                Verified Profiles
                <span className="text-xs bg-brand-primary/20 text-brand-primary font-bold px-2 py-0.5 rounded-full">
                  Zero Bots
                </span>
              </h4>
              <p className="font-sans text-brand-on-surface-variant text-sm leading-relaxed">
                Every member is fully vetted using visual verification and custom community vouchers. Meet genuine allies and friends, free from automated scam accounts, deceptive personas, and harmful actors.
              </p>
            </div>
            
            {/* Interactive check item preview */}
            <div className="mt-4 flex items-center gap-2 text-xs text-brand-primary/80 font-mono select-none">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brand-tertiary"></span>
              <span>Liveness verified via advanced selfie checks</span>
            </div>

            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-brand-primary/10 to-transparent group-hover:w-1/2 transition-all duration-700 pointer-events-none"></div>
          </div>

          {/* Card 2: Smart Matchmaking */}
          <div
            onMouseMove={handleSpotlightMouseMove}
            className="md:col-span-4 md:row-span-1 glass-card glass-spotlight p-8 rounded-3xl flex flex-col justify-between group border border-white/10 hover:border-brand-secondary/35"
          >
            <div className="w-12 h-12 bg-brand-secondary/15 rounded-xl flex items-center justify-center text-brand-secondary mb-4 group-hover:rotate-12 transition-transform">
              <Sparkles size={28} />
            </div>
            <div>
              <h4 className="font-geist text-xl font-bold mb-2 text-white">Smart Matching</h4>
              <p className="font-sans text-brand-on-surface-variant text-sm leading-relaxed">
                Smart compatibility logic that prioritizes mutual values, shared advocacy topics, communication style, and personality compatibility.
              </p>
            </div>
            {/* Soft decorative glow */}
            <div className="h-1.5 w-full bg-gradient-to-r from-brand-secondary to-brand-primary rounded-full mt-4 opacity-50"></div>
          </div>

          {/* Card 3: Real-Time Encrypted Chat */}
          <div
            onMouseMove={handleSpotlightMouseMove}
            className="md:col-span-4 md:row-span-1 glass-card glass-spotlight p-8 rounded-3xl flex flex-col justify-between group border border-white/10 hover:border-brand-tertiary/35"
          >
            <div className="w-12 h-12 bg-brand-tertiary/10 rounded-xl flex items-center justify-center text-brand-tertiary mb-4 group-hover:translate-x-2 transition-transform">
              <MessageCircle size={28} />
            </div>
            <div>
              <h4 className="font-geist text-xl font-bold mb-2 text-white">Real-Time Chat</h4>
              <p className="font-sans text-brand-on-surface-variant text-sm leading-relaxed">
                Encrypted messages with advanced block protection, screenshot alerts, disappearing gallery files, and expressive custom emoji support.
              </p>
            </div>
            <div className="flex gap-1.5 mt-4">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-tertiary animate-pulse"></span>
              <span className="text-[10px] text-brand-tertiary font-mono">End-to-End Encrypted</span>
            </div>
          </div>

          {/* Card 4: Massive Privacy Control */}
          <div
            onMouseMove={handleSpotlightMouseMove}
            className="md:col-span-8 md:row-span-1 glass-card glass-spotlight p-8 rounded-3xl relative overflow-hidden group border border-white/10 flex flex-col justify-between hover:border-[#ff4992]/30"
          >
            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-12 bg-brand-primary-container/10 rounded-xl flex items-center justify-center text-brand-primary-container mb-4">
                <Settings size={26} className="group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <h4 className="font-geist text-2xl font-bold mb-2 text-white">Privacy Controls</h4>
              <p className="font-sans text-brand-on-surface-variant text-sm leading-relaxed">
                Take precise custody over your account. Specify granular visibility parameters. Easily decide which communities can find you, hide your general state, and disable indexing with absolute ease.
              </p>
            </div>

            {/* Simulated settings switch controls */}
            <div className="mt-4 flex gap-4 text-xs font-mono text-white/60">
              <span className="flex items-center gap-1.5">
                <EyeOff size={14} className="text-brand-primary-container" /> Anonymous Mode
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldAlert size={14} className="text-brand-secondary" /> Anti-Vandal Guards
              </span>
            </div>

            <div className="absolute -right-20 -bottom-20 opacity-[0.04] rotate-12 group-hover:rotate-[2deg] transition-transform duration-1000 z-0">
              <ShieldCheck size={260} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
