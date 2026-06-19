/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { handleMagneticMouseMove, handleMagneticMouseLeave } from '../utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('features');

  useEffect(() => {
    const sections = ['features', 'community', 'safety', 'waitlist'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features', id: 'features' },
    { label: 'Community', href: '#community', id: 'community' },
    { label: 'Safety', href: '#safety', id: 'safety' },
    { label: 'Waitlist', href: '#waitlist', id: 'waitlist' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-brand-background/80 backdrop-blur-xl border-b border-white/10 shadow-sm z-50 transition-all duration-500">
        <div className="flex justify-between items-center w-full px-5 md:px-16 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <img
              alt="Pride Logo"
              className="h-8 w-auto group-hover:rotate-12 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Q20oobEIlyIV2Yl3sBLpInxez5TfUCkgNurmGH93URqG1kR1md5-7bBhxKcNeNy6AJdw4Mqy_vvJRzDguy-PKBJC_rUZmR03GZMohoOAYRwmQd8Kt1IKjUfzvW8G3ecJGHb7P6wiZd_4OXbh3THjOHdJmmWti0wtUhQHniCdkPCljqogulBe_AlWg7VhBNFMINkEr49JyP7Grj7unFckWJIvcD5Q-YVlpPKZ_0cO4Bofft6ddzuAXnmsx6hYGfDgM8Lf8j7WrQ"
            />
            <span className="font-geist text-2xl font-extrabold text-brand-primary tracking-tighter">
              Pride
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`font-geist text-sm tracking-wider font-semibold transition-colors duration-300 ${
                  activeSection === link.id
                    ? 'text-brand-primary border-b-2 border-brand-primary pb-1'
                    : 'text-brand-on-surface-variant hover:text-brand-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Call To Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://drive.google.com/uc?export=download&id=1jEh-qgMSikKx-nru39YkKK7pH884fWCL"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="magnetic-button border border-brand-primary/30 text-brand-primary font-geist text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 hover:bg-brand-primary/10 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M16.607 13.93c-.6 0-1.085-.486-1.085-1.085s.486-1.085 1.085-1.085c.6 0 1.085.486 1.085 1.085s-.485 1.085-1.085 1.085zm-9.214 0c-.6 0-1.085-.486-1.085-1.085s.486-1.085 1.085-1.085c.6 0 1.085.486 1.085 1.085s-.486 1.085-1.085 1.085zm9.539-7.234l1.378-2.387a.382.382 0 00-.14-.522.382.382 0 00-.522.14l-1.401 2.428C15.281 5.922 13.682 5.64 12 5.64c-1.682 0-3.28.282-4.686.715L5.913 3.927a.382.382 0 00-.522-.14.382.382 0 00-.14.522l1.378 2.387C3.593 8.354 1.5 11.236 1.5 14.6h21c0-3.364-2.093-6.246-5.138-7.904z" />
              </svg>
              <span>Download Now</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="block md:hidden text-brand-on-background focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[65px] bg-brand-background/95 backdrop-blur-2xl border-b border-white/10 z-40 md:hidden py-6 px-6 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-geist text-lg font-medium py-2 transition-colors duration-300 border-b border-white/5 ${
                    activeSection === link.id
                      ? 'text-brand-primary border-brand-primary/30'
                      : 'text-brand-on-surface-variant'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="https://drive.google.com/uc?export=download&id=1jEh-qgMSikKx-nru39YkKK7pH884fWCL"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="border border-brand-primary/30 text-brand-primary py-3.5 rounded-xl font-geist font-bold text-center w-full flex items-center justify-center gap-2 hover:bg-brand-primary/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M16.607 13.93c-.6 0-1.085-.486-1.085-1.085s.486-1.085 1.085-1.085c.6 0 1.085.486 1.085 1.085s-.485 1.085-1.085 1.085zm-9.214 0c-.6 0-1.085-.486-1.085-1.085s.486-1.085 1.085-1.085c.6 0 1.085.486 1.085 1.085s-.486 1.085-1.085 1.085zm9.539-7.234l1.378-2.387a.382.382 0 00-.14-.522.382.382 0 00-.522.14l-1.401 2.428C15.281 5.922 13.682 5.64 12 5.64c-1.682 0-3.28.282-4.686.715L5.913 3.927a.382.382 0 00-.522-.14.382.382 0 00-.14.522l1.378 2.387C3.593 8.354 1.5 11.236 1.5 14.6h21c0-3.364-2.093-6.246-5.138-7.904z" />
              </svg>
              <span>Download Now</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
