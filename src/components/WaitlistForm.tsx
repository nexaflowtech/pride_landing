/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, Sparkles, User, Mail, Globe, ArrowRight, Share2, Plus, Zap, Heart } from 'lucide-react';
import { handleSpotlightMouseMove } from '../utils';

interface WaitlistFormProps {
  id?: string;
}

export default function WaitlistForm({ id = 'waitlist' }: WaitlistFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [isJoined, setIsJoined] = useState(false);
  const [userPosition, setUserPosition] = useState(14328);
  const [ticketNumber, setTicketNumber] = useState('PRIDE-23849');
  const [points, setPoints] = useState(0);
  const [hasAnsweredPoll, setHasAnsweredPoll] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(null);

  // Load existing registration if any
  useEffect(() => {
    const storedUser = localStorage.getItem('pride_waitlist_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setFullName(parsed.fullName);
      setEmail(parsed.email);
      setCountry(parsed.country);
      setIsJoined(true);
      // Generate standard pseudo-random queue position and ticket index for that user
      generateQueueDetails(parsed.email);
    }
  }, []);

  const generateQueueDetails = (userEmail: string) => {
    // Generate simple deterministic code
    let hash = 0;
    for (let i = 0; i < userEmail.length; i++) {
      hash = userEmail.charCodeAt(i) + ((hash << 5) - hash);
    }
    const derivedPos = 10000 + Math.abs(hash % 4500);
    const derivedTicket = `PRD-${Math.abs(hash % 90000 + 10000)}`;
    setUserPosition(derivedPos);
    setTicketNumber(derivedTicket);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const userObj = { fullName, email, country, registeredAt: new Date().toISOString() };
    localStorage.setItem('pride_waitlist_user', JSON.stringify(userObj));
    setIsJoined(true);
    generateQueueDetails(email);
  };

  const answerPollAndClimb = (option: string) => {
    if (hasAnsweredPoll) return;
    setSelectedPollOption(option);
    setHasAnsweredPoll(true);
    setPoints(100);
    // Climb up 120 slots!
    setUserPosition((prev) => Math.max(prev - 120, 10001));
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setPoints((prev) => prev + 50);
    alert('Copied link to clipboard! Earned 50 bonus placement points.');
  };

  const handleReset = () => {
    localStorage.removeItem('pride_waitlist_user');
    setFullName('');
    setEmail('');
    setIsJoined(false);
    setHasAnsweredPoll(false);
    setSelectedPollOption(null);
    setPoints(0);
  };

  return (
    <section className="py-24 relative overflow-hidden" id={id}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 text-center">
        <div className="max-w-3xl mx-auto glass-card p-10 md:p-14 rounded-[3rem] border border-brand-primary/20 shadow-2xl shadow-brand-primary/5">
          
          {!isJoined ? (
            /* WAITLIST NOTIFICATION FORM */
            <>
              <h2 className="font-font-geist text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
                Join the Movement
              </h2>
              <p className="font-sans text-brand-on-surface-variant mb-10 text-base max-w-xl mx-auto">
                Reserve your custom username and claim early access priority status in the safe digital sanctuary we represent.
              </p>

              <form onSubmit={handleRegister} className="space-y-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name Input */}
                  <div className="space-y-2 relative">
                    <label className="font-geist text-xs font-bold text-brand-on-surface-variant ml-2 tracking-widest uppercase">
                      FULL NAME
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-brand-surface-container border border-white/10 rounded-xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-brand-on-background placeholder:text-white/20 transition-all text-sm font-sans"
                        placeholder="Alex Rivera"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2 relative">
                    <label className="font-geist text-xs font-bold text-brand-on-surface-variant ml-2 tracking-widest uppercase">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-surface-container border border-white/10 rounded-xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-brand-on-background placeholder:text-white/20 transition-all text-sm font-sans"
                        placeholder="alex@example.com"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                    </div>
                  </div>
                </div>

                {/* Country Toggle */}
                <div className="space-y-2 relative">
                  <label className="font-geist text-xs font-bold text-brand-on-surface-variant ml-2 tracking-widest uppercase">
                    COUNTRY
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-brand-surface-container border border-white/10 rounded-xl pl-11 pr-10 py-4 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-brand-on-background appearance-none transition-all text-sm font-sans"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>Australia</option>
                    </select>
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                  </div>
                </div>

                {/* Confirm Register Action Button */}
                <button
                  type="submit"
                  className="w-full bg-brand-primary-container text-brand-on-primary-container font-geist font-bold text-lg py-5 rounded-2xl hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-brand-primary-container/30 cursor-pointer"
                >
                  Reserve My Spot
                </button>

                <p className="text-center text-[11px] text-brand-on-surface-variant/70 leading-relaxed max-w-sm mx-auto">
                  By joining, you agree to our respectful community terms, our Privacy Guidelines, and access codes.
                </p>
              </form>
            </>
          ) : (
            /* ACTIVE SUCCESS QUEUE ACCOUNT STATUS CARD */
            <div className="space-y-8 text-left animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <h3 className="font-font-geist text-2xl font-bold text-white">
                    Hurrah! You are on the waitlist 🎉
                  </h3>
                  <p className="text-sm font-sans text-brand-on-surface-variant mt-1">
                    Welcome to the family, {fullName}.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-brand-primary/80 hover:text-brand-primary font-mono transition-colors border border-brand-primary/25 rounded px-2.5 py-1"
                >
                  Edit Registration
                </button>
              </div>

              {/* Status Info Block */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner text-center">
                  <p className="text-xs text-brand-on-surface-variant font-mono uppercase tracking-widest">
                    Your Queue Position
                  </p>
                  <p className="text-3xl font-font-geist font-extrabold text-brand-primary mt-2">
                    #{userPosition.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">
                    Ahead of 43,109 others
                  </p>
                </div>

                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner text-center">
                  <p className="text-xs text-brand-on-surface-variant font-mono uppercase tracking-widest">
                    Invitation Ticket
                  </p>
                  <p className="text-3xl font-font-geist font-extrabold text-white mt-2">
                    {ticketNumber}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">
                    Save for login credentials
                  </p>
                </div>

                <div className="bg-gradient-to-tr from-brand-primary-container/20 to-black/20 p-5 rounded-2xl border border-brand-primary/20 shadow-inner text-center">
                  <p className="text-xs text-brand-on-surface-variant font-mono uppercase tracking-widest">
                    Priority Points
                  </p>
                  <p className="text-3xl font-font-geist font-extrabold text-brand-tertiary mt-2">
                    {points} PTS
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">
                    Climb up with polls below
                  </p>
                </div>
              </div>

              {/* Simulated Queue Action Game (Climb up the queue ladder!) */}
              {!hasAnsweredPoll ? (
                <div className="bg-[#241318] p-6 rounded-2xl border border-brand-primary-container/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-sm font-font-geist font-extrabold text-brand-primary mb-2 flex items-center gap-1.5">
                      <Zap size={14} /> Waitlist Climber Challenge
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed mb-4">
                      Answer this anonymous poll question to help us calibrate server circles, and skip <strong className="text-brand-tertiary">120 places ahead</strong> instantly!
                    </p>
                    <p className="text-sm font-semibold text-white mb-3 bg-black/20 p-2.5 rounded border border-white/5">
                      "Which Pride community experience maps to your current primary focus?"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => answerPollAndClimb('Friends')}
                        className="text-xs bg-white/5 hover:bg-brand-primary/10 hover:border-brand-primary/30 border border-white/10 text-white py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Making Queer Friends
                      </button>
                      <button
                        onClick={() => answerPollAndClimb('Love')}
                        className="text-xs bg-white/5 hover:bg-brand-primary/10 hover:border-brand-primary/30 border border-white/10 text-white py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Dating & Finding Love
                      </button>
                      <button
                        onClick={() => answerPollAndClimb('Groups')}
                        className="text-xs bg-white/5 hover:bg-brand-primary/10 hover:border-brand-primary/30 border border-white/10 text-white py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Local Clubs & Hikes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-[#1b2b1d] p-5 rounded-2xl border border-brand-tertiary/20 flex items-center gap-4">
                  <CheckCircle className="text-brand-tertiary" size={24} />
                  <div>
                    <h4 className="text-sm font-font-geist font-bold text-brand-tertiary">
                      Skipped 120 places ahead successfully!
                    </h4>
                    <p className="text-xs text-white/70">
                      Your response helps us prepare custom servers matching your select focus. Earned 100 PTS!
                    </p>
                  </div>
                </div>
              )}

              {/* Share & refer friends */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleShareClick}
                  className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 p-4 rounded-xl text-center text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Share2 size={16} /> Copy Referral Link (+50 PTS)
                </button>
                <a
                  href="#features"
                  className="flex-1 bg-brand-primary/10 hover:bg-brand-primary/15 border border-brand-primary/20 p-4 rounded-xl text-center text-sm font-semibold text-brand-primary flex items-center justify-center gap-2"
                >
                  Explore Pride Features <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
