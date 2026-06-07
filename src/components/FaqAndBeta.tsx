/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Minus, Star } from 'lucide-react';
import { handleSpotlightMouseMove } from '../utils';

export default function FaqAndBeta() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'When is the official launch?',
      answer: 'We are currently in a closed beta phase. Our public launch is slated for Q3 2024. Waitlist members will be invited in waves based on their position.',
    },
    {
      question: 'Is Pride free to use?',
      answer: "The core community experience will always be free. We will offer premium features (Pride+) for users who want to support the platform's growth and safety efforts.",
    },
    {
      question: 'What makes Pride different from other apps?',
      answer: 'Absolute, zero liveness simulation (everyone is real), a safety framework with actual human oversight from LGBTQ+ moderators, and complete data privacy control tools.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* FAQ Column */}
          <div>
            <div className="text-left mb-10">
              <label className="font-geist text-xs font-bold text-brand-primary tracking-widest uppercase mb-3 block">
                CLEAR COMPREHENSION
              </label>
              <h2 className="font-font-geist text-4xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    onMouseMove={handleSpotlightMouseMove}
                    className="glass-card rounded-2xl p-6 cursor-pointer border border-white/5 bg-black/20"
                    onClick={() => toggleFaq(idx)}
                  >
                    <div className="flex justify-between items-center text-left">
                      <h4 className="font-font-geist font-bold text-lg text-white">
                        {faq.question}
                      </h4>
                      <div className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors ml-4 shrink-0">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-sm text-brand-on-surface-variant leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials Column */}
          <div>
            <div className="text-left mb-10">
              <label className="font-geist text-xs font-bold text-brand-tertiary tracking-widest uppercase mb-3 block">
                REAL VOICES
              </label>
              <h2 className="font-font-geist text-4xl font-extrabold text-white">
                Voices from Beta
              </h2>
            </div>

            <div className="space-y-6">
              <div
                onMouseMove={handleSpotlightMouseMove}
                className="glass-card p-8 rounded-3xl border-l-4 border-brand-primary bg-gradient-to-tr from-brand-primary/5 to-transparent relative group hover:border-brand-primary/40"
              >
                <div className="absolute top-6 right-8 text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors pointer-events-none">
                  <Star size={48} className="fill-current" />
                </div>

                <p className="italic text-lg text-white/95 leading-relaxed mb-6 font-sans">
                  "Finally, a social space that doesn't feel like a predatory market. I've met my best friend and an amazing D&D collective already."
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-primary/20 border-2 border-brand-primary">
                    <img
                      alt="Jordan S. Portrait"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA204GFoFXzBpP1EOA6yPL8fhJsbZ7Xfd8dC76-LrD8IdYpfC0CU6arVseQrDec5SwUAjboFb04wtYZ37NQLOTjuHmDGjDqZRwvdOJZwmitPFKOZCMECFfVPgxr0SHVYbrEEVoxFsQs6MsdEwwGKT_zJBl_6rZiqOoGkzXXBzgNUoMDzivMx8q-BkjOnZl0xvmzDfCm1DfmDSgtd9Y5q_MEKzdSJru4ejHBTpGvcRibJubVnxwed-AQLjL8rBHuH0GBpn15Avc38Q"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-font-geist font-bold text-white text-base">Jordan S.</p>
                    <p className="font-sans text-xs text-brand-on-surface-variant">Beta Member since Jan '24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
