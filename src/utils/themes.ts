import { ThemeId } from '../types';

export interface ThemeStyle {
  id: ThemeId;
  name: string;
  badge: string;
  bgClass: string;
  containerClass: string;
  cardBg: string;
  cardBorder: string;
  accentText: string;
  accentBadge: string;
  accentGradient: string;
  primaryButton: string;
  timerCardBg: string;
  progressBarColor: string;
  glowColor1: string;
  glowColor2: string;
  textColor: string;
  mutedText: string;
  inputBg: string;
}

export const THEMES: Record<ThemeId, ThemeStyle> = {
  'warm-cream': {
    id: 'warm-cream',
    name: 'Warm Harmony (FAF8F5)',
    badge: 'Flagship Light',
    bgClass: 'bg-[#FAF8F5] text-neutral-900',
    containerClass: 'border-[#eae2d5]',
    cardBg: 'bg-white/95 backdrop-blur-md shadow-lg shadow-amber-950/5',
    cardBorder: 'border-[#e8dfcf] hover:border-amber-500/50',
    accentText: 'text-amber-800',
    accentBadge: 'bg-amber-100/90 border-amber-300/80 text-amber-900',
    accentGradient: 'from-amber-600 via-yellow-600 to-amber-700',
    primaryButton: 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold shadow-md shadow-amber-900/15',
    timerCardBg: 'bg-white border-[#e8dfcf] shadow-sm',
    progressBarColor: 'from-amber-600 to-yellow-600',
    glowColor1: 'rgba(245, 158, 11, 0.08)',
    glowColor2: 'rgba(234, 88, 12, 0.05)',
    textColor: 'text-neutral-900',
    mutedText: 'text-[#6b6255]',
    inputBg: 'bg-white border-[#dcd1be] focus:border-amber-600 text-neutral-900 shadow-sm',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Neon',
    badge: 'Dark & Modern',
    bgClass: 'bg-neutral-950 text-neutral-100',
    containerClass: 'border-neutral-800/80',
    cardBg: 'bg-neutral-900/60 backdrop-blur-md',
    cardBorder: 'border-neutral-800/60 hover:border-neutral-700/80',
    accentText: 'text-cyan-400',
    accentBadge: 'bg-cyan-950/70 border-cyan-500/30 text-cyan-300',
    accentGradient: 'from-cyan-500 via-indigo-400 to-purple-500',
    primaryButton: 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-950/50',
    timerCardBg: 'bg-neutral-900/80 border-neutral-800/70 shadow-inner',
    progressBarColor: 'from-cyan-500 to-indigo-500',
    glowColor1: 'rgba(6, 182, 212, 0.15)',
    glowColor2: 'rgba(99, 102, 241, 0.15)',
    textColor: 'text-neutral-100',
    mutedText: 'text-neutral-400',
    inputBg: 'bg-neutral-900/90 border-neutral-700/60 focus:border-cyan-400',
  },
  'midnight-gold': {
    id: 'midnight-gold',
    name: 'Champagne Gold',
    badge: 'Luxury Editorial',
    bgClass: 'bg-[#0c0d0e] text-[#f4ede2]',
    containerClass: 'border-[#262420]',
    cardBg: 'bg-[#151617]/70 backdrop-blur-md',
    cardBorder: 'border-[#2e2a22]/60 hover:border-amber-500/40',
    accentText: 'text-amber-400',
    accentBadge: 'bg-amber-950/60 border-amber-500/30 text-amber-200',
    accentGradient: 'from-amber-200 via-amber-400 to-yellow-600',
    primaryButton: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-neutral-950 font-semibold shadow-lg shadow-amber-950/40',
    timerCardBg: 'bg-[#161718]/90 border-amber-900/30 shadow-inner',
    progressBarColor: 'from-amber-400 to-yellow-600',
    glowColor1: 'rgba(245, 158, 11, 0.14)',
    glowColor2: 'rgba(217, 119, 6, 0.12)',
    textColor: 'text-[#f4ede2]',
    mutedText: 'text-[#a39c91]',
    inputBg: 'bg-[#18191b] border-amber-900/40 focus:border-amber-400 text-amber-100',
  },
  'opal-light': {
    id: 'opal-light',
    name: 'Minimal Opal',
    badge: 'Clean Light',
    bgClass: 'bg-neutral-50 text-neutral-900',
    containerClass: 'border-neutral-200',
    cardBg: 'bg-white/80 backdrop-blur-md',
    cardBorder: 'border-neutral-200/80 hover:border-neutral-300',
    accentText: 'text-blue-600',
    accentBadge: 'bg-blue-50 border-blue-200 text-blue-700',
    accentGradient: 'from-blue-600 via-indigo-600 to-slate-900',
    primaryButton: 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-md shadow-neutral-900/10',
    timerCardBg: 'bg-white border-neutral-200/80 shadow-sm',
    progressBarColor: 'from-blue-600 to-indigo-600',
    glowColor1: 'rgba(59, 130, 246, 0.08)',
    glowColor2: 'rgba(99, 102, 241, 0.08)',
    textColor: 'text-neutral-900',
    mutedText: 'text-neutral-600',
    inputBg: 'bg-white border-neutral-300 focus:border-blue-600 text-neutral-900',
  },
  'deep-navy': {
    id: 'deep-navy',
    name: 'Deep Oceanic',
    badge: 'Tech Cobalt',
    bgClass: 'bg-[#070b14] text-slate-100',
    containerClass: 'border-blue-950/60',
    cardBg: 'bg-[#0e1626]/70 backdrop-blur-md',
    cardBorder: 'border-blue-900/40 hover:border-blue-700/60',
    accentText: 'text-sky-400',
    accentBadge: 'bg-sky-950/70 border-sky-500/30 text-sky-300',
    accentGradient: 'from-sky-400 via-blue-500 to-indigo-400',
    primaryButton: 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-blue-950/60',
    timerCardBg: 'bg-[#0f172a]/90 border-blue-900/40 shadow-inner',
    progressBarColor: 'from-sky-400 to-blue-600',
    glowColor1: 'rgba(14, 165, 233, 0.16)',
    glowColor2: 'rgba(59, 130, 246, 0.14)',
    textColor: 'text-slate-100',
    mutedText: 'text-slate-400',
    inputBg: 'bg-[#0a101d] border-blue-900/50 focus:border-sky-400 text-white',
  },
  'sunset-ember': {
    id: 'sunset-ember',
    name: 'Sunset Ember',
    badge: 'Warm Flame',
    bgClass: 'bg-[#100b09] text-orange-50',
    containerClass: 'border-orange-950/50',
    cardBg: 'bg-[#1a120f]/75 backdrop-blur-md',
    cardBorder: 'border-orange-900/30 hover:border-orange-700/50',
    accentText: 'text-orange-400',
    accentBadge: 'bg-orange-950/60 border-orange-500/30 text-orange-200',
    accentGradient: 'from-orange-400 via-rose-500 to-amber-400',
    primaryButton: 'bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-400 hover:to-rose-500 text-white shadow-lg shadow-orange-950/50',
    timerCardBg: 'bg-[#1c1411]/90 border-orange-900/30 shadow-inner',
    progressBarColor: 'from-orange-500 to-rose-500',
    glowColor1: 'rgba(249, 115, 22, 0.16)',
    glowColor2: 'rgba(244, 63, 94, 0.12)',
    textColor: 'text-orange-50',
    mutedText: 'text-orange-200/70',
    inputBg: 'bg-[#18110e] border-orange-900/40 focus:border-orange-400 text-white',
  },
};
