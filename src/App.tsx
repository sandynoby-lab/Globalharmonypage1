import React, { useState, useEffect } from 'react';
import { PageConfig, InquiryMessage } from './types';
import { getDefaultConfig } from './data/defaultConfig';
import { THEMES } from './utils/themes';
import { BackgroundMesh } from './components/BackgroundMesh';
import { SikhWorshipIllustration } from './components/SikhWorshipIllustration';
import { MarathonLineArt } from './components/MarathonLineArt';
import { ContactModal } from './components/ContactModal';
import {
  Sparkles,
  Mail,
  Radio,
  CheckCircle,
  Flame,
  Award,
  Info,
} from 'lucide-react';

const STORAGE_KEY_CONFIG = 'globalharmonyrun_config_v5';

export default function App() {
  const [config, setConfig] = useState<PageConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return getDefaultConfig();
  });

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync document title
  useEffect(() => {
    document.title = config.seoTitle || `${config.brandName}.in | Coming Soon Sept, 2026`;
  }, [config.seoTitle, config.brandName]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInquiryMessage = (msg: InquiryMessage) => {
    showToast(`Inquiry sent from ${msg.name}! We will reach out shortly.`);
  };

  const currentTheme = THEMES[config.theme] || THEMES['warm-cream'];
  const isLight = config.theme === 'warm-cream' || config.theme === 'opal-light';

  return (
    <div
      id="app-root-container"
      className={`min-h-screen relative flex flex-col justify-between transition-colors duration-500 font-sans ${currentTheme.bgClass}`}
    >
      {/* Ambient background glow */}
      <BackgroundMesh theme={currentTheme} />

      {/* Main Body Layout */}
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Brand Header */}
        <header className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg font-mono shadow-md border ${
                isLight
                  ? 'border-amber-400/50 bg-amber-100 text-amber-800'
                  : 'border-amber-500/40 bg-gradient-to-br from-amber-500/20 to-orange-600/30 text-amber-300'
              }`}
            >
              <Flame className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-extrabold text-xl sm:text-2xl tracking-tight font-heading block ${
                    isLight
                      ? 'text-neutral-900'
                      : 'bg-gradient-to-r from-amber-100 via-amber-300 to-orange-300 bg-clip-text text-transparent'
                  }`}
                >
                  {config.brandName || 'GlobalHarmonyRun'}
                </span>
              </div>
              <span className={`text-xs block ${currentTheme.mutedText}`}>
                {config.tagline || 'Educating & Empowering Organizers for Peace & Harmony Marathons'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-900 shadow-xs'
                  : 'bg-amber-950/40 border-amber-500/30 text-amber-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-mono text-[11px] font-semibold">{config.domainName || 'GlobalHarmonyRun.in'}</span>
            </div>

            {/* Get Information Button (Opens Contact & Information Popup) */}
            <button
              type="button"
              id="btn-get-information"
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-amber-400/80 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-md flex items-center gap-2 transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <Info className="w-4 h-4" />
              <span>Get Information</span>
            </button>
          </div>
        </header>

        {/* Hero Area: Side-by-Side Under Construction & Sikh Worship Artwork */}
        <main className="my-auto py-4 sm:py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Under Construction Announcement & Organizer Education Vision */}
            <div className="lg:col-span-7 text-left space-y-5">
              
              {/* Announcement Pill */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all shadow-xs ${
                  isLight
                    ? 'border-amber-300 bg-amber-100/80 text-amber-900'
                    : 'border-amber-500/30 bg-amber-950/50 text-amber-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{config.announcementBadge || '🕊️ GlobalHarmonyRun.in • Organizer Knowledge Portal • Under Construction'}</span>
              </div>

              {/* Main Headline */}
              <h1
                id="hero-headline"
                className={`text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight font-heading leading-[1.15] ${
                  isLight ? 'text-neutral-900' : 'text-white'
                }`}
              >
                {config.headline}
              </h1>

              {/* Subheading focusing on educating organizers */}
              <p
                id="hero-subheadline"
                className={`text-base sm:text-lg leading-relaxed ${currentTheme.mutedText}`}
              >
                {config.subheadline}
              </p>

              {/* Quick Contact & Action Callout */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  id="btn-hero-get-info"
                  onClick={() => setIsContactOpen(true)}
                  className="px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-yellow-500 text-white shadow-md flex items-center gap-2 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  <Info className="w-4 h-4" />
                  <span>Get Information</span>
                </button>

                <a
                  href="mailto:globalharmonyrun@gmail.com"
                  className="px-4 py-3 rounded-2xl font-semibold text-sm border border-[#e8dfcf] bg-white hover:bg-amber-50 text-neutral-800 shadow-xs flex items-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 text-amber-700" />
                  <span>globalharmonyrun@gmail.com</span>
                </a>
              </div>

            </div>

            {/* Right Column: Sikh Men Worship Artwork (Frozen static artwork, face on the left side) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm">
                <SikhWorshipIllustration isFlipped={true} />
              </div>
            </div>

          </div>

        </main>

        {/* Bottom Section: Marathon Line Sketches Graphic */}
        <div
          id="marathon-bottom-graphics-section"
          className={`mt-10 pt-6 border-t ${
            isLight ? 'border-[#e8dfcf]' : 'border-amber-950/50'
          }`}
        >
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
            <div
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-amber-900' : 'text-amber-400'
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Global Harmony Marathon • Running for Unity</span>
            </div>
            <span className={`text-[11px] font-mono ${currentTheme.mutedText}`}>
              Educating Organizers • 5K • 10K • Half & Full Marathon
            </span>
          </div>

          {/* Marathon Runners Illustration */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden transition-all ${
              isLight
                ? 'border-[#e8dfcf] bg-white shadow-amber-950/5'
                : 'border-amber-500/20 bg-black/60 shadow-xl backdrop-blur-sm'
            }`}
          >
            <MarathonLineArt />
          </div>

        </div>

        {/* Footer */}
        <footer
          className={`mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isLight ? 'border-[#e8dfcf]' : 'border-neutral-800/40'
          }`}
        >
          <div className={`${currentTheme.mutedText} flex items-center gap-2`}>
            <span>
              &copy; {new Date().getFullYear()} {config.brandName || 'GlobalHarmonyRun'}.in. All rights reserved.
            </span>
            <span className="opacity-40">•</span>
            <span className="font-mono font-semibold text-neutral-700">{config.domainName || 'GlobalHarmonyRun.in'}</span>
          </div>

          {/* Direct Email Contact in Footer */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:globalharmonyrun@gmail.com"
              className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 font-medium transition-all ${
                isLight
                  ? 'border-[#e8dfcf] bg-white hover:bg-amber-50 text-amber-900 shadow-xs'
                  : `${currentTheme.cardBorder} hover:bg-white/10 text-amber-300`
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-700" />
              <span>globalharmonyrun@gmail.com</span>
            </a>
          </div>
        </footer>

      </div>

      {/* Get Information Popup Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        theme={currentTheme}
        contactEmail="globalharmonyrun@gmail.com"
        brandName={config.brandName}
        onSendMessage={handleInquiryMessage}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-2xl bg-neutral-900 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

