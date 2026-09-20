export type ThemeId = 'warm-cream' | 'obsidian' | 'midnight-gold' | 'opal-light' | 'deep-navy' | 'sunset-ember';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date?: string;
}

export interface FeatureTeaser {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'instagram' | 'discord' | 'youtube' | 'telegram' | 'email';
  url: string;
  enabled: boolean;
}

export interface PageConfig {
  domainName: string;
  brandName: string;
  tagline: string;
  headline: string;
  subheadline: string;
  announcementBadge: string;
  targetLaunchDate: string; // ISO format or YYYY-MM-DDTHH:mm
  progressPercentage: number;
  contactEmail: string;
  allowInquiries: boolean;
  theme: ThemeId;
  socials: SocialLink[];
  features: FeatureTeaser[];
  milestones: Milestone[];
  seoTitle: string;
  seoDescription: string;
  badgeStatusText: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  source?: string;
}

export interface InquiryMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string;
}
