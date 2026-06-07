/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { handleMagneticMouseMove, handleMagneticMouseLeave } from '../utils';

interface NavbarProps {
  onJoinClick: () => void;
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Community', href: '#community' },
    { label: 'Safety', href: '#safety' },
    { label: 'Waitlist', href: '#waitlist', active: true },
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
                  link.active
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
            <button
              onClick={onJoinClick}
              onMouseMove={handleMagneticMouseMove}
              onMouseLeave={handleMagneticMouseLeave}
              className="magnetic-button bg-brand-primary-container text-brand-on-primary-container font-geist text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary-container/20 cursor-pointer"
            >
              Join Beta
            </button>
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
                    link.active
                      ? 'text-brand-primary border-brand-primary/30'
                      : 'text-brand-on-surface-variant'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinClick();
              }}
              className="bg-brand-primary-container text-brand-on-primary-container py-3.5 rounded-xl font-geist font-bold text-center shadow-lg shadow-brand-primary-container/20 w-full"
            >
              Join Beta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
