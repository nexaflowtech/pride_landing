/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { handleSpotlightMouseMove } from '../utils';
import { Mail, Globe, Heart, ShieldAlert } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface-container-lowest border-t border-white/5 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-16 max-w-7xl mx-auto gap-8">
        
        {/* Brand Details */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-2.5">
            <img
              alt="Pride Logo"
              className="h-6 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Q20oobEIlyIV2Yl3sBLpInxez5TfUCkgNurmGH93URqG1kR1md5-7bBhxKcNeNy6AJdw4Mqy_vvJRzDguy-PKBJC_rUZmR03GZMohoOAYRwmQd8Kt1IKjUfzvW8G3ecJGHb7P6wiZd_4OXbh3THjOHdJmmWti0wtUhQHniCdkPCljqogulBe_AlWg7VhBNFMINkEr49JyP7Grj7unFckWJIvcD5Q-YVlpPKZ_0cO4Bofft6ddzuAXnmsx6hYGfDgM8Lf8j7WrQ"
            />
            <span className="font-geist text-xl font-bold text-brand-primary tracking-tight">
              Pride
            </span>
          </div>
          <p className="text-brand-on-surface-variant text-xs text-center md:text-left opacity-80 max-w-xs font-sans">
            © {currentYear} Pride. A secure sanctuary waitlist for every beautiful identity, advocate, and ally.
          </p>
        </div>

        {/* Links list */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          <a className="text-brand-on-surface-variant text-xs hover:text-brand-primary transition-colors font-medium font-sans" href="#">
            Privacy Policy
          </a>
          <a className="text-brand-on-surface-variant text-xs hover:text-brand-primary transition-colors font-medium font-sans" href="#">
            Terms of Service
          </a>
          <a className="text-brand-on-surface-variant text-xs hover:text-brand-primary transition-colors font-medium font-sans" href="#">
            Community Guidelines
          </a>
          <a className="text-brand-on-surface-variant text-xs hover:text-brand-primary transition-colors font-medium font-sans" href="#">
            Safety Center
          </a>
          <a className="text-brand-on-surface-variant text-xs hover:text-brand-primary transition-colors font-medium font-sans" href="#">
            Contact Us
          </a>
        </div>

        {/* Dynamic Buttons */}
        <div className="flex gap-4">
          <a
            href="mailto:contact@pridesanctuary.community"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/80 hover:text-brand-primary hover:border-brand-primary/40 transition-all cursor-pointer"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="https://pridesanctuary.community"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/80 hover:text-brand-primary hover:border-brand-primary/40 transition-all cursor-pointer"
            aria-label="Website"
          >
            <Globe size={16} />
          </a>
        </div>

      </div>
    </footer>
  );
}
