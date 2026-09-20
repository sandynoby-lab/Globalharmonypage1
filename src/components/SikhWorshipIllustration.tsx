import React, { useState } from 'react';
import sikhArtworkPath from '../assets/images/sikh_man_worship_1789915289135.jpg';

interface SikhWorshipIllustrationProps {
  className?: string;
  isFlipped?: boolean;
}

export const SikhWorshipIllustration: React.FC<SikhWorshipIllustrationProps> = ({
  className = '',
  isFlipped = true,
}) => {
  const [useGeneratedImg, setUseGeneratedImg] = useState(true);

  return (
    <div
      id="sikh-worship-artwork-container"
      className={`relative rounded-3xl overflow-hidden border border-amber-900/15 bg-white/95 p-3.5 sm:p-4 shadow-lg shadow-amber-950/5 ${className}`}
    >
      {/* Decorative Top Badge */}
      <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-800 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
          Spiritual Harmony & Devotion
        </span>
        <span className="text-[10px] text-amber-700/80 font-mono font-medium">Ek Onkar • Unity</span>
      </div>

      {/* Main Illustration View - static and clean with face on the left side */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-amber-900/10 bg-[#FAF8F5] flex items-center justify-center shadow-inner">
        {useGeneratedImg ? (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={sikhArtworkPath}
              alt="Sikh Man in Worship & Meditation with Saffron Turban"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center ${
                isFlipped ? '-scale-x-100' : ''
              }`}
              onError={() => setUseGeneratedImg(false)}
            />
            {/* Subtle bottom gradient to blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          /* High Precision Vector Illustration Fallback with face on left */
          <div className={`w-full h-full ${isFlipped ? '-scale-x-100' : ''}`}>
            <svg
              viewBox="0 0 400 480"
              className="w-full h-full text-amber-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="turbanOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff8c00" />
                  <stop offset="40%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <linearGradient id="beardBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e1e1e" />
                  <stop offset="100%" stopColor="#0a0a0a" />
                </linearGradient>
              </defs>

              {/* Background Halo / Sun */}
              <circle cx="200" cy="200" r="140" fill="#f59e0b" fillOpacity="0.12" />
              <circle cx="200" cy="200" r="110" stroke="#f59e0b" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Saffron Turban Top & Folds */}
              <path
                d="M100,160 C90,110 130,40 210,35 C290,40 320,110 300,170 C280,140 240,110 200,110 C150,110 120,140 100,160 Z"
                fill="url(#turbanOrange)"
              />
              {/* Front Peak / Folds of Turban */}
              <path
                d="M85,180 C80,130 140,80 200,80 C270,80 320,135 315,185 C290,145 250,115 200,115 C140,115 105,150 85,180 Z"
                fill="#fb923c"
              />
              <path
                d="M75,200 C80,150 130,120 200,120 C270,120 320,160 325,210 C290,175 250,150 200,150 C140,150 95,175 75,200 Z"
                fill="#f97316"
              />
              {/* Diagonal Band of Turban across forehead */}
              <path
                d="M80,215 L200,290 L220,270 L100,195 Z"
                fill="#ea580c"
              />
              <path
                d="M320,215 L200,290 L180,270 L300,195 Z"
                fill="#c2410c"
              />

              {/* Peaceful Closed Eyes & Serene Facial Contour */}
              <path d="M150,265 Q165,270 180,265" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M220,265 Q235,270 250,265" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Nose Contour */}
              <path d="M200,255 L200,295 L208,295" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />

              {/* Mustache & Flowing Beard */}
              <path
                d="M170,305 C185,295 200,310 200,310 C200,310 215,295 230,305 C255,315 270,335 270,345 C250,335 230,330 200,332 C170,330 150,335 130,345 C130,335 145,315 170,305 Z"
                fill="url(#beardBlack)"
              />
              {/* Full Beard */}
              <path
                d="M125,310 C100,360 120,440 200,465 C280,440 300,360 275,310 C265,370 240,430 200,435 C160,430 135,370 125,310 Z"
                fill="url(#beardBlack)"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Caption description */}
      <div className="mt-3 px-1 text-center">
        <p className="text-xs text-neutral-900 font-semibold">
          Peace, Faith & Harmony in Motion
        </p>
        <p className="text-[11px] text-neutral-600 mt-0.5">
          Dedicated to universal peace, unity, and the spirit of selfless service.
        </p>
      </div>
    </div>
  );
};
