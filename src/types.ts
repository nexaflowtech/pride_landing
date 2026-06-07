/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WaitlistUser {
  fullName: string;
  email: string;
  country: string;
  registeredAt: string;
  position: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureCard {
  id: string;
  icon: string; // Lucide icon name or Material symbol string
  title: string;
  description: string;
  badge?: string;
}
