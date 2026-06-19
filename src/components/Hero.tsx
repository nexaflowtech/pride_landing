/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Shield, Users, Heart, Award, Volume2, VolumeX, X } from 'lucide-react';
import { handleSpotlightMouseMove, handleMagneticMouseMove, handleMagneticMouseLeave } from '../utils';

const appScreenshots = [
  '/pride.png',
  '/pride1.png',
  '/pride2.png'
];

const videos = [
  { id: 'video1', title: 'Pride Intro Teaser', src: '/video1.mp4' },
  { id: 'video2', title: 'Community Sanctuary', src: '/video2.mp4' },
  { id: 'video3', title: 'Platform Security', src: '/video3.mp4' },
];

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [activeVideo, setActiveVideo] = useState('/video1.mp4');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % appScreenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Close modal on browser back / hash change
  useEffect(() => {
    const handlePopState = () => {
      setIsVideoOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">
      {/* Absolute Background Ribbon Gradient Flow */}
      <div className="ribbon-bg">
        <div className="ribbon"></div>
      </div>

      {/* Decorative ambient gradient spots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-primary/25 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary-container/20 blur-[140px] rounded-full"></div>

        {/* Floating background decorative graphics */}
        <div className="absolute top-1/4 right-[8%] opacity-15 animate-float pointer-events-none" style={{ animationDelay: '-1s' }}>
          <Heart size={100} className="text-brand-primary stroke-[1.2]" />
        </div>
        <div className="absolute bottom-1/4 left-[8%] opacity-15 animate-float pointer-events-none" style={{ animationDelay: '-3s' }}>
          <Sparkles size={80} className="text-brand-secondary stroke-[1.2]" />
        </div>
      </div>

      {/* Hero Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left column text details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          {/* Join Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 relative">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-primary-container animate-ping absolute left-4"></span>
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand-primary-container relative"></span>
            <span className="font-geist text-xs font-bold text-brand-primary tracking-widest pl-1">
              JOIN 10,000+ ON THE WAITLIST
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-font-geist text-[48px] md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white">
            Where{' '}
            <span className="mask-text ribbon-gradient animate-flow inline-block">
              Pride
            </span>{' '}
            Finds Its Community
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg text-brand-on-surface-variant mb-10 max-w-xl leading-relaxed">
            Connect with people who understand you. Build friendships, discover communities, and create meaningful relationships in a safe, authentic LGBTQ+ digital sanctuary.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <a
              href="https://drive.google.com/uc?export=download&id=1jEh-qgMSikKx-nru39YkKK7pH884fWCL"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="bg-brand-primary-container text-brand-on-primary-container px-8 py-4 rounded-xl font-geist font-bold text-center hover:scale-[1.02] transition-transform shadow-lg shadow-brand-primary-container/25 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M16.607 13.93c-.6 0-1.085-.486-1.085-1.085s.486-1.085 1.085-1.085c.6 0 1.085.486 1.085 1.085s-.485 1.085-1.085 1.085zm-9.214 0c-.6 0-1.085-.486-1.085-1.085s.486-1.085 1.085-1.085c.6 0 1.085.486 1.085 1.085s-.486 1.085-1.085 1.085zm9.539-7.234l1.378-2.387a.382.382 0 00-.14-.522.382.382 0 00-.522.14l-1.401 2.428C15.281 5.922 13.682 5.64 12 5.64c-1.682 0-3.28.282-4.686.715L5.913 3.927a.382.382 0 00-.522-.14.382.382 0 00-.14.522l1.378 2.387C3.593 8.354 1.5 11.236 1.5 14.6h21c0-3.364-2.093-6.246-5.138-7.904z" />
              </svg>
              <span>Download Now</span>
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="glass-card px-8 py-4 rounded-xl font-geist font-bold text-center flex items-center justify-center gap-2.5 group hover:text-brand-primary cursor-pointer border border-white/10"
            >
              Watch Film
              <Play size={18} className="fill-current text-white group-hover:text-brand-primary transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Right column: Interactive Smartphone representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* The Phone Container */}
          <div className="relative z-20 rounded-[3rem] border-[12px] border-white/5 bg-[#17080c] shadow-2xl overflow-hidden aspect-[9/19] max-w-[325px] mx-auto group animate-float border-t-[14px] border-b-[14px]">
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#17080c] rounded-b-2xl z-30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white/10 mr-2"></span>
              <span className="w-10 h-1 rounded-full bg-white/20"></span>
            </div>

            {/* Animated screenshots */}
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentScreen}
                src={appScreenshots[currentScreen]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover z-10"
                alt={`Pride Application Screenshot ${currentScreen + 1}`}
              />
            </AnimatePresence>

            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-20"></div>

            {/* Bottom active status overlay on mockup */}
            <div className="absolute bottom-8 left-0 right-0 px-6 text-white text-left z-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border-2 border-brand-primary overflow-hidden shadow-md">
                  <img
                    alt="Jamie Miller Portrait"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkS_J1PxZf5kClo72uQreHXlhVFp6Ilq4S_DhKZbb5gCUEMmLj4oBaMzqoIHDBqqqrkCMAUZdfUL-5rFscFqhYdsCPluDZ7D1PXXh-QXNQmfANYe1a8IQ5cyiH3HQeEZWgul0rMTl2WHT6DLO09QN6JawckE5kPP7YlowZn1ggR7sLlNVGJD3DIE5yyobn6xUtcTJJ6aJ2Gn0uFyLz76cYFzDTWFMKgDVFQsU0Vbol_Hh3CkaUM28a2Bsy8Cxg41eyi6nmBiDXGg"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-white leading-none">Jamie Miller</p>
                  <p className="text-[10px] text-white/70 mt-0.5 leading-none font-medium">Exploring Pride Communities</p>
                </div>
              </div>

              <div className="glass-card bg-black/40 backdrop-blur-md p-3 rounded-lg text-xs leading-relaxed border border-white/5">
                "Found my local queer reading group through Pride! 🏳️‍🌈"
              </div>
            </div>
          </div>

          {/* Floating interactive card 1 */}
          <div
            onMouseMove={handleSpotlightMouseMove}
            style={{ animationDelay: '-2s' }}
            className="absolute top-10 -right-[5%] glass-card p-4 rounded-2xl bg-gradient-to-tr from-brand-primary-container/30 to-brand-primary/15 shadow-xl z-30 animate-float border border-white/10 flex items-center justify-center cursor-default group"
          >
            <Users size={24} className="text-white group-hover:scale-110 transition-transform" />
          </div>

          {/* Floating interactive card 2 */}
          <div
            onMouseMove={handleSpotlightMouseMove}
            style={{ animationDelay: '-4.5s' }}
            className="absolute bottom-20 -left-[5%] glass-card p-4 rounded-2xl bg-brand-tertiary-container/30 shadow-xl z-30 animate-float border border-white/10 flex items-center justify-center cursor-default group"
          >
            <Award size={24} className="text-white group-hover:scale-110 transition-transform" />
          </div>
        </motion.div>
      </div>

      {/* Watch Film Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl glass-card rounded-3xl overflow-hidden bg-[#1e0f13]/95 border border-white/10 p-4 md:p-6 flex flex-col lg:flex-row gap-6 shadow-2xl cursor-default"
            >
              {/* Left Column: Video Player */}
              <div className="flex-1 relative aspect-video rounded-2xl overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                <video
                  key={activeVideo}
                  src={activeVideo}
                  autoPlay
                  controls
                  muted={isMuted}
                  className="w-full h-full"
                />
                
                {/* Header overlay for close button */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
                  <span className="font-geist text-xs tracking-widest font-bold text-brand-primary bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                    PRIDE SPOTLIGHT
                  </span>
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-white/10 text-white transition-colors cursor-pointer border border-white/5 pointer-events-auto"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Right Column: Playlist */}
              <div className="w-full lg:w-72 flex flex-col shrink-0 text-left">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                  <span className="font-geist text-xs font-bold text-brand-on-surface-variant tracking-wider uppercase">
                    WATCH FILM PLAYLIST
                  </span>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-xs text-brand-primary font-geist flex items-center gap-1.5 cursor-pointer bg-brand-primary/10 hover:bg-brand-primary/25 px-2.5 py-1 rounded-full transition-all border border-brand-primary/20"
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />} {isMuted ? "Unmute" : "Mute"}
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {videos.map((vid, idx) => {
                    const isActive = activeVideo === vid.src;
                    return (
                      <button
                        key={vid.id}
                        onClick={() => setActiveVideo(vid.src)}
                        className={`w-full p-3 rounded-xl text-left transition-all border flex gap-3.5 items-center group cursor-pointer ${
                          isActive
                            ? 'bg-brand-primary/15 border-brand-primary text-white shadow-lg shadow-brand-primary/5'
                            : 'bg-white/5 border-white/5 text-brand-on-surface-variant hover:bg-white/10 hover:border-white/10'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? 'bg-brand-primary text-brand-on-primary-container' : 'bg-white/5 text-white/50 group-hover:text-white'
                        }`}>
                          <Play size={14} className={isActive ? "fill-current" : ""} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-geist text-sm font-semibold truncate leading-tight">
                            {vid.title}
                          </p>
                          <p className="text-[10px] text-white/40 mt-1 font-mono">
                            Video {idx + 1}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
