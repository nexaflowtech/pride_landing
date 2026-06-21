/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, Sparkles, User, Mail, Globe, ArrowRight, Share2, Zap, Loader2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';

// ─── All Countries List ────────────────────────────────────────────────────
const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
  "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe",
];

// ─── Web3Forms Access Key ───────────────────────────────────────────────────
const WEB3FORMS_KEY = '5c22c4f3-fff5-4794-9364-dd079fac4c8a';

// ─── Google Sheets Web App URL ────────────────────────────────────────────────
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwvgeLVkrIJUk6mouct0B_c2K8podWDJovqMte01ANHLT1JyrLeKFo9V-HZBuZ9P-Lr/exec';

interface WaitlistFormProps {
  id?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

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
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Load existing registration if any
  useEffect(() => {
    const storedUser = localStorage.getItem('pride_waitlist_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setFullName(parsed.fullName);
      setEmail(parsed.email);
      setCountry(parsed.country);
      setIsJoined(true);
      generateQueueDetails(parsed.email);
    }
  }, []);

  const generateQueueDetails = (userEmail: string) => {
    let hash = 0;
    for (let i = 0; i < userEmail.length; i++) {
      hash = userEmail.charCodeAt(i) + ((hash << 5) - hash);
    }
    const derivedPos = 10000 + Math.abs(hash % 4500);
    const derivedTicket = `PRD-${Math.abs(hash % 90000 + 10000)}`;
    setUserPosition(derivedPos);
    setTicketNumber(derivedTicket);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    setFormStatus('submitting');
    setErrorMessage('');

    try {
      // ── Compute queue details early (needed for Sheet payload) ───────────
      let hash = 0;
      for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash);
      }
      const derivedPos = 10000 + Math.abs(hash % 4500);
      const derivedTicket = `PRD-${Math.abs(hash % 90000 + 10000)}`;

      // ── 1. Submit to Web3Forms (email notification) ───────────────────────
      const web3Promise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🌈 New Pride Waitlist Registration — ${fullName}`,
          from_name: 'Pride Community Platform',
          name: fullName,
          email: email,
          country: country,
          message: `New waitlist registration:\n\nName: ${fullName}\nEmail: ${email}\nCountry: ${country}\nQueue Position: #${derivedPos.toLocaleString()}\nTicket: ${derivedTicket}\nRegistered At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
          botcheck: '',
        }),
      }).then((r) => r.json());

      // ── 2. Submit to Google Sheets (via Apps Script webhook) ──────────────
      // Uses no-cors because Google Apps Script doesn't send CORS headers.
      // Data is still written to the sheet successfully.
      const sheetPromise = fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',                       // required for Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: email,
          country: country,
          position: `#${derivedPos.toLocaleString()}`,
          ticket: derivedTicket,
        }),
      });

      // ── Run both in parallel ──────────────────────────────────────────────
      const [web3Result] = await Promise.allSettled([web3Promise, sheetPromise]);

      // Check Web3Forms result (primary — controls success/error state)
      const web3Data = web3Result.status === 'fulfilled' ? web3Result.value : null;

      if (web3Data?.success) {
        // ── Save locally + show success ────────────────────────────────────
        const userObj = { fullName, email, country, registeredAt: new Date().toISOString() };
        localStorage.setItem('pride_waitlist_user', JSON.stringify(userObj));
        setUserPosition(derivedPos);
        setTicketNumber(derivedTicket);
        setIsJoined(true);
        setFormStatus('success');

        // Trigger download programmatically
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/file/d/1bonuK6Cds-gYwZD756aKVTgkLPhtDWFF/view?usp=sharing';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(web3Data?.message || 'Submission failed. Please try again.');
      }
    } catch (err: unknown) {
      setFormStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  const answerPollAndClimb = (option: string) => {
    if (hasAnsweredPoll) return;
    setSelectedPollOption(option);
    setHasAnsweredPoll(true);
    setPoints(100);
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
    setCountry('United States');
    setIsJoined(false);
    setHasAnsweredPoll(false);
    setSelectedPollOption(null);
    setPoints(0);
    setFormStatus('idle');
    setErrorMessage('');
  };

  return (
    <section className="py-24 relative overflow-hidden" id={id}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 text-center">
        <div className="max-w-3xl mx-auto glass-card p-10 md:p-14 rounded-[3rem] border border-brand-primary/20 shadow-2xl shadow-brand-primary/5">

          {!isJoined ? (
            /* ── WAITLIST FORM ─────────────────────────────────────────── */
            <>
              <h2 className="font-font-geist text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
                Join the Movement
              </h2>
              <p className="font-sans text-brand-on-surface-variant mb-10 text-base max-w-xl mx-auto">
                Reserve your custom username and claim early access priority status in the safe digital sanctuary we represent.
              </p>

              <form onSubmit={handleRegister} className="space-y-6 text-left">
                {/* Honeypot — hidden from users, catches bots */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2 relative">
                    <label className="font-geist text-xs font-bold text-brand-on-surface-variant ml-2 tracking-widest uppercase">
                      FULL NAME
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="text"
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-brand-surface-container border border-white/10 rounded-xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-brand-on-background placeholder:text-white/20 transition-all text-sm font-sans"
                        placeholder="Alex Rivera"
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2 relative">
                    <label className="font-geist text-xs font-bold text-brand-on-surface-variant ml-2 tracking-widest uppercase">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-surface-container border border-white/10 rounded-xl pl-11 pr-5 py-4 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-brand-on-background placeholder:text-white/20 transition-all text-sm font-sans"
                        placeholder="alex@example.com"
                      />
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30" size={16} />
                    </div>
                  </div>
                </div>

                {/* Country — All 195 Countries ───────────────────────── */}
                <div className="space-y-2 relative">
                  <label className="font-geist text-xs font-bold text-brand-on-surface-variant ml-2 tracking-widest uppercase">
                    COUNTRY
                  </label>
                  <div className="relative">
                    <select
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-brand-surface-container border border-white/10 rounded-xl pl-11 pr-10 py-4 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none text-brand-on-background appearance-none transition-all text-sm font-sans cursor-pointer"
                    >
                      {ALL_COUNTRIES.map((c) => (
                        <option key={c} value={c} className="bg-gray-900 text-white">
                          {c}
                        </option>
                      ))}
                    </select>
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {formStatus === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3 text-red-400 text-sm text-center">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-brand-primary-container text-brand-on-primary-container font-geist font-bold text-lg py-5 rounded-2xl hover:scale-[1.01] active:scale-95 transition-all shadow-xl shadow-brand-primary-container/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Downloading Now...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faGooglePlay} className="w-5 h-5" />
                      <span>Download Now</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-brand-on-surface-variant/70 leading-relaxed max-w-sm mx-auto">
                  By joining, you agree to our respectful community terms, our Privacy Guidelines, and access codes.
                </p>
              </form>
            </>
          ) : (
            /* ── SUCCESS QUEUE CARD ────────────────────────────────────── */
            <div className="space-y-8 text-left animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <h3 className="font-font-geist text-2xl font-bold text-white">
                    Hurrah! You are on the waitlist 🎉
                  </h3>
                  <p className="text-sm font-sans text-brand-on-surface-variant mt-1">
                    Welcome to the family, {fullName}. Check your email for confirmation!
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-xs text-brand-primary/80 hover:text-brand-primary font-mono transition-colors border border-brand-primary/25 rounded px-2.5 py-1"
                >
                  Edit Registration
                </button>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner text-center">
                  <p className="text-xs text-brand-on-surface-variant font-mono uppercase tracking-widest">
                    Your Queue Position
                  </p>
                  <p className="text-3xl font-font-geist font-extrabold text-brand-primary mt-2">
                    #{userPosition.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">Ahead of 43,109 others</p>
                </div>

                <div className="bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner text-center">
                  <p className="text-xs text-brand-on-surface-variant font-mono uppercase tracking-widest">
                    Invitation Ticket
                  </p>
                  <p className="text-3xl font-font-geist font-extrabold text-white mt-2">
                    {ticketNumber}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">Save for login credentials</p>
                </div>

                <div className="bg-gradient-to-tr from-brand-primary-container/20 to-black/20 p-5 rounded-2xl border border-brand-primary/20 shadow-inner text-center">
                  <p className="text-xs text-brand-on-surface-variant font-mono uppercase tracking-widest">
                    Priority Points
                  </p>
                  <p className="text-3xl font-font-geist font-extrabold text-brand-tertiary mt-2">
                    {points} PTS
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 font-mono">Climb up with polls below</p>
                </div>
              </div>

              {/* Poll Challenge */}
              {!hasAnsweredPoll ? (
                <div className="bg-[#241318] p-6 rounded-2xl border border-brand-primary-container/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-sm font-font-geist font-extrabold text-brand-primary mb-2 flex items-center gap-1.5">
                      <Zap size={14} /> Waitlist Climber Challenge
                    </h4>
                    <p className="text-xs text-white/80 leading-relaxed mb-4">
                      Answer this anonymous poll question to help us calibrate server circles, and skip{' '}
                      <strong className="text-brand-tertiary">120 places ahead</strong> instantly!
                    </p>
                    <p className="text-sm font-semibold text-white mb-3 bg-black/20 p-2.5 rounded border border-white/5">
                      "Which Pride community experience maps to your current primary focus?"
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {['Making Queer Friends', 'Dating & Finding Love', 'Local Clubs & Hikes'].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => answerPollAndClimb(opt)}
                          className="text-xs bg-white/5 hover:bg-brand-primary/10 hover:border-brand-primary/30 border border-white/10 text-white py-2 rounded-lg transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
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
                      Your response: <span className="text-white font-medium">{selectedPollOption}</span> — Earned 100 PTS!
                    </p>
                  </div>
                </div>
              )}

              {/* Share & Refer */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://drive.google.com/file/d/1bonuK6Cds-gYwZD756aKVTgkLPhtDWFF/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-brand-primary-container text-brand-on-primary-container p-4 rounded-xl text-center text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shadow-lg shadow-brand-primary-container/20"
                >
                  <FontAwesomeIcon icon={faGooglePlay} className="w-4 h-4" />
                  <span>Download Now Again</span>
                </a>
                <button
                  onClick={handleShareClick}
                  className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 p-4 rounded-xl text-center text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Share2 size={16} /> Copy Referral Link (+50 PTS)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
