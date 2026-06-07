/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { handleSpotlightMouseMove } from '../utils';

export default function IdentityShowcase() {
  const identities = [
    { label: 'Gay', color: 'text-brand-primary border-brand-primary/20 shadow-[0_0_15px_rgba(255,177,198,0.12)]' },
    { label: 'Lesbian', color: 'text-brand-secondary border-brand-secondary/20 shadow-[0_0_15px_rgba(196,192,255,0.12)]' },
    { label: 'Bisexual', color: 'text-brand-tertiary border-brand-tertiary/20 shadow-[0_0_15px_rgba(75,226,96,0.12)]' },
    { label: 'Transgender', color: 'text-brand-primary-container border-brand-primary-container/20 shadow-[0_0_15px_rgba(255,73,146,0.12)]' },
    { label: 'Queer', color: 'text-brand-on-surface border-brand-on-surface-variant/20 shadow-[0_0_15px_rgba(227,189,198,0.12)] font-semibold' },
    { label: 'Non-binary', color: 'text-brand-secondary border-brand-secondary/20 shadow-[0_0_15px_rgba(196,192,255,0.12)]' },
    { label: 'Allies', color: 'text-brand-tertiary border-brand-tertiary/20 shadow-[0_0_15px_rgba(75,226,96,0.12)]' },
  ];

  // Double the list for seamless looping carousel effect
  const doubleIdentities = [...identities, ...identities, ...identities];

  return (
    <section className="py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 md:px-16 mb-12">
        <h2 className="font-font-geist text-4xl md:text-5xl font-extrabold text-center text-white tracking-tight">
          A Place Where Everyone Belongs
        </h2>
        <p className="font-sans text-brand-on-surface-variant text-center max-w-xl mx-auto mt-4 text-sm">
          No filters, no compromises. We support every shade of your colorful spirit flag in our custom secure circles.
        </p>
      </div>

      {/* Looping Row */}
      <div className="relative flex items-center overflow-x-hidden py-4 w-full select-none cursor-grab">
        {/* Absolute shade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-background to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-background to-transparent z-10 pointer-events-none"></div>

        <div className="animate-infinite-scroll flex gap-6 whitespace-nowrap">
          {doubleIdentities.map((identity, index) => (
            <div
              key={`${identity.label}-${index}`}
              onMouseMove={handleSpotlightMouseMove}
              className={`glass-card glass-spotlight px-10 py-5 rounded-full border transform hover:scale-105 transition-all duration-300 ${identity.color}`}
            >
              <span className="font-geist text-lg tracking-wide font-bold">
                {identity.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
