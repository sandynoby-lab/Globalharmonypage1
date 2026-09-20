import { PageConfig, Subscriber } from '../types';

export const getDefaultConfig = (): PageConfig => {
  return {
    domainName: 'GlobalHarmonyRun.in',
    brandName: 'GlobalHarmonyRun',
    tagline: 'Educating & Empowering Organizers for Peace & Harmony Marathons',
    headline: 'GlobalHarmonyRun is Currently Under Construction',
    subheadline:
      'A comprehensive knowledge and guidance portal designed to educate, support, and empower organizers on everything they need to take care of before, during, and after organizing a marathon event.',
    announcementBadge: '🕊️ GlobalHarmonyRun.in • Organizer Knowledge Portal • Under Construction',
    badgeStatusText: 'Coming Soon Sept, 2026',
    targetLaunchDate: 'Coming Soon Sept, 2026',
    progressPercentage: 88,
    contactEmail: 'globalharmonyrun@gmail.com',
    allowInquiries: true,
    theme: 'warm-cream',
    seoTitle: 'GlobalHarmonyRun.in — Marathon Organizer Portal | Coming Soon Sept, 2026',
    seoDescription:
      'GlobalHarmonyRun.in is an upcoming educational portal for marathon organizers covering everything required before, during, and after organizing peace marathon events. Contact globalharmonyrun@gmail.com.',
    socials: [],
    features: [],
    milestones: [],
  };
};

export const INITIAL_SUBSCRIBERS: Subscriber[] = [];

