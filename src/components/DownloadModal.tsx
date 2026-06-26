/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { X, ShieldCheck } from 'lucide-react';

const DOWNLOAD_URL =
  'https://play.google.com/store/apps/details?id=com.nexaflowtech.pride';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const handleDownload = () => {
    onClose();
    // Open the Google Play Store listing in a new tab
    window.open(DOWNLOAD_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 24 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="relative max-w-md w-full rounded-[2rem] border border-white/10 p-8 shadow-2xl overflow-hidden"
            style={{
              background:
                'linear-gradient(145deg, #1e0a38 0%, #160726 55%, #0d0019 100%)',
            }}
          >
            {/* ── Rainbow top-edge bar ───────────────────────────── */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background:
                  'linear-gradient(90deg,#e40303,#ff8c00,#ffed00,#008026,#004dff,#750787)',
              }}
            />

            {/* ── Soft glow orb in bg ───────────────────────────── */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(167,62,255,0.18) 0%, transparent 70%)',
              }}
            />

            {/* ── Close button ──────────────────────────────────── */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* ── Shield icon ───────────────────────────────────── */}
            <div className="flex justify-center mb-4 relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border border-brand-primary/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,62,255,0.2), rgba(167,62,255,0.05))',
                  boxShadow: '0 0 28px rgba(167,62,255,0.25)',
                }}
              >
                <ShieldCheck size={30} className="text-brand-primary" />
              </div>
            </div>

            {/* ── Emoji headline ────────────────────────────────── */}
            <p className="text-center text-2xl mb-2 relative z-10">🌈💜</p>

            {/* ── Title ─────────────────────────────────────────── */}
            <h3
              className="font-geist text-[22px] font-extrabold text-white text-center mb-4 tracking-tight leading-tight relative z-10"
            >
              You're In — Exclusive Access!
            </h3>

            {/* ── Body message ──────────────────────────────────── */}
            <div
              className="rounded-2xl border border-white/8 px-5 py-4 mb-7 relative z-10"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <p className="font-sans text-[13px] text-brand-on-surface-variant text-center leading-relaxed">
                <span className="font-bold text-white">Pride is now live on Google Play! 🎉</span>{' '}
                Download the app directly from the Play Store and join our{' '}
                <span className="text-brand-primary font-semibold">growing community</span>{' '}
                of LGBTQ+ people connecting, sharing, and thriving together.
              </p>
            </div>

            {/* ── Action buttons ────────────────────────────────── */}
            <div className="flex flex-col gap-3 relative z-10">
              <button
                onClick={handleDownload}
                className="w-full py-4 rounded-2xl font-geist font-bold text-[15px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(168,85,247,0.35)',
                }}
              >
                <FontAwesomeIcon icon={faGooglePlay} className="w-5 h-5" />
                Get it on Google Play
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-sm font-geist text-white/35 hover:text-white/70 transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
