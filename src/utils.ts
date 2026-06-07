/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * Updates CSS custom properties on a container element to track pointer coordinates relative to its boundaries.
 * This is used for creating highly dynamic spotlight background glow highlights on glass cards.
 */
export function handleSpotlightMouseMove(e: React.MouseEvent<HTMLElement>) {
  const container = e.currentTarget;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Set percentage string
  container.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
  container.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
}

/**
 * Handles smooth magnetic pull effect for interactive layout buttons.
 */
export function handleMagneticMouseMove(e: React.MouseEvent<HTMLElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.03)`;
}

export function handleMagneticMouseLeave(e: React.MouseEvent<HTMLElement>) {
  const btn = e.currentTarget;
  btn.style.transform = `translate(0px, 0px) scale(1)`;
}

/**
 * Generates initial random statistics for the waiting list.
 */
export function getWaitlistStats() {
  const baseCount = 14328;
  const targetLaunch = new Date('2026-10-31T00:00:00Z');
  return {
    totalWaiters: baseCount,
    targetLaunch,
  };
}
