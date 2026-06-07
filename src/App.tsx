/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import ParticleCanvas from './components/ParticleCanvas';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import IdentityShowcase from './components/IdentityShowcase';
import BentoGrid from './components/BentoGrid';
import SafetySection from './components/SafetySection';
import WaitlistForm from './components/WaitlistForm';
import FaqAndBeta from './components/FaqAndBeta';
import Footer from './components/Footer';

export default function App() {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bg-brand-background text-brand-on-background font-sans min-h-screen relative overflow-x-hidden selection:bg-brand-primary-container selection:text-brand-on-primary-container">
      {/* Dynamic particles client overlay behind interactive UI but over gradient backdrops */}
      <ParticleCanvas />

      {/* Navigation Header */}
      <Navbar onJoinClick={scrollToWaitlist} />

      {/* Main Structural Body */}
      <main className="relative z-10">
        {/* Hero Section Banner */}
        <Hero onReserveClick={scrollToWaitlist} />

        {/* Holistic Ecosystem Grid info ("More than dating") */}
        <FeatureGrid />

        {/* Carousel of LGBTQ+ pride flags labels */}
        <IdentityShowcase />

        {/* Bento Grid layout features showcase */}
        <BentoGrid />

        {/* High-quality Safety Commitment Banner */}
        <SafetySection />

        {/* waitlist Signup or Custom Statistics Queue Dashboard panel */}
        <WaitlistForm id="waitlist" />

        {/* Accordions + Voice testimonials */}
        <FaqAndBeta />

        {/* Final Interactive CTA Banner */}
        <section className="py-32 relative overflow-hidden text-center">
          {/* Backing glow ribbon stream */}
          <div className="absolute inset-0 bg-brand-primary/10 animate-flow ribbon-gradient opacity-15 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10 text-center">
            <h2 className="font-font-geist text-[40px] md:text-6xl font-extrabold mb-6 text-white tracking-tight">
              Your Community Is Waiting
            </h2>
            <p className="font-sans text-brand-on-surface-variant text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Don't wait for a better world — join the one we're building together in mutual shelter and safety.
            </p>
            
            <button
              onClick={scrollToWaitlist}
              className="bg-brand-primary text-brand-on-surface font-geist text-base font-bold bg-gradient-to-r from-brand-primary to-[#ff4992] text-brand-on-primary-container px-12 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-primary/30 cursor-pointer"
            >
              Join Now
            </button>
          </div>
        </section>
      </main>

      {/* Styled Footer */}
      <Footer />
    </div>
  );
}
