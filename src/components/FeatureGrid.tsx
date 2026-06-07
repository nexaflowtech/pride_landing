/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Users, Heart, Share2, Calendar, Smile, Search, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { handleSpotlightMouseMove } from '../utils';

export default function FeatureGrid() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'friends',
      icon: Users,
      title: 'Make Friends',
      colorClass: 'text-brand-primary bg-brand-primary/10',
      description: 'Forge platonic bonds with individuals who share your interests and identity.',
      hoverBorder: 'hover:border-brand-primary/30',
      longDescription: 'Find roommates, study partners, coffee buds, or fellow board gamers in a safe setting designed to value personality over swiping profiles.',
      badgeList: ['Board Games', 'Language Exchange', 'Local Walks'],
    },
    {
      id: 'love',
      icon: Heart,
      title: 'Find Love',
      colorClass: 'text-brand-secondary bg-brand-secondary/10',
      description: 'Discovery flows based on personality and core values, not just photos.',
      hoverBorder: 'hover:border-brand-secondary/30',
      longDescription: 'Establish pure romantic ties. Fill out your core beliefs, compatibility filters, and dating expectations to meet matches who respect your journey.',
      badgeList: ['Deep Chats', 'Intimate Dates', 'Value-Driven'],
    },
    {
      id: 'communities',
      icon: Share2,
      title: 'Join Communities',
      colorClass: 'text-brand-tertiary bg-brand-tertiary/10',
      description: 'Niche groups for everything from queer gaming to LGBTQ+ hiking clubs.',
      hoverBorder: 'hover:border-brand-tertiary/30',
      longDescription: 'Participate in active server clubs, discuss common topics, find advocacy collectives, or join recreational sports teams nearby.',
      badgeList: ['Queer Gamers', 'LGBTQ+ Hikes', 'Art Studios'],
    },
    {
      id: 'events',
      icon: Calendar,
      title: 'Attend Events',
      colorClass: 'text-brand-primary-container bg-brand-primary-container/10',
      description: 'From digital workshops to local queer nightlife, never miss out.',
      hoverBorder: 'hover:border-brand-primary-container/30',
      longDescription: 'Track workshops, mental health sessions, musical nights, drag shows, or group brunches in an structured, vetted system.',
      badgeList: ['Digital Panels', 'Comedy Nights', 'Support Circles'],
    },
  ];

  return (
    <section className="py-24 bg-brand-surface-container-lowest relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <label className="font-geist text-xs font-bold text-brand-primary tracking-widest uppercase mb-3 block">
            Ecosystem Core
          </label>
          <h2 className="font-font-geist text-4xl md:text-5xl font-extrabold mb-4 text-white">
            More Than Just Swiping
          </h2>
          <p className="font-sans text-brand-on-surface-variant max-w-2xl mx-auto">
            We're building a holistic sanctuary designed for the diverse needs of our family. Click on any card below to dive deeper.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const IconComponent = feat.icon;
            const isSelected = activeFeature === feat.id;

            return (
              <div
                key={feat.id}
                onMouseMove={handleSpotlightMouseMove}
                onClick={() => setActiveFeature(isSelected ? null : feat.id)}
                className={`glass-card glass-spotlight p-8 rounded-3xl cursor-pointer group hover:bg-[#251318] hover:scale-[1.02] transform transition-all duration-300 relative border border-white/8 ${feat.hoverBorder} ${
                  isSelected ? 'ring-2 ring-brand-primary/50 bg-[#251318]' : ''
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feat.colorClass}`}>
                  <IconComponent size={30} />
                </div>
                <h3 className="font-font-geist text-xl font-bold mb-2 text-white flex justify-between items-center">
                  {feat.title}
                </h3>
                <p className="font-sans text-sm text-brand-on-surface-variant leading-relaxed">
                  {feat.description}
                </p>

                {/* Expanded details with smooth animation */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isSelected ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-xs text-white/70 bg-white/5 p-3 rounded-xl leading-relaxed border border-white/5">
                    {feat.longDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {feat.badgeList.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] bg-white/10 text-brand-primary font-mono px-2 py-0.5 rounded"
                      >
                        #{badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{isSelected ? 'Seal Info' : 'Explore more'}</span>
                  <ArrowRight size={12} className={`transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
