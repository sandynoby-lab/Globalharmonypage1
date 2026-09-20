import React, { useState } from 'react';
import { PageConfig } from '../types';
import { ThemeStyle, THEMES } from '../utils/themes';
import { X, Code, Download, Copy, Check, Globe } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PageConfig;
  currentTheme: ThemeStyle;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
  currentTheme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isLight = config.theme === 'opal-light';

  const generateStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.seoTitle || `${config.brandName} — Coming Soon Sept, 2026`}</title>
  <meta name="description" content="${config.seoDescription}">
  <meta property="og:title" content="${config.seoTitle}">
  <meta property="og:description" content="${config.seoDescription}">
  <meta property="og:type" content="website">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .font-heading { font-family: 'Outfit', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#FAF8F5] text-neutral-900 min-h-screen flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-900">
  
  <!-- Top Navigation -->
  <header class="w-full max-w-6xl mx-auto p-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 flex items-center justify-center font-bold font-mono text-lg shadow-sm">
        🕊️
      </div>
      <div>
        <span class="font-extrabold text-lg tracking-tight font-heading block text-neutral-900">${config.brandName}</span>
        <span class="text-xs text-neutral-500 block">${config.tagline}</span>
      </div>
    </div>
    
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border bg-amber-50 border-amber-300 text-amber-900">
      <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
      <span class="font-mono text-[11px]">${config.domainName}</span>
    </div>
  </header>

  <!-- Hero Section: Text + Sikh Worship Artwork Side-by-Side -->
  <main class="w-full max-w-6xl mx-auto px-6 py-8 flex-1 flex flex-col justify-center">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      <!-- Left Column: Construction Message, Launch Date & Email Form -->
      <div class="lg:col-span-7 text-left">
        
        <!-- Status Pill -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border bg-amber-100/80 border-amber-300/80 text-amber-900">
          <span>🕊️</span>
          <span>${config.announcementBadge}</span>
        </div>

        <!-- Main Headline -->
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight mb-4 text-neutral-900">
          ${config.headline}
        </h1>

        <!-- Subtitle -->
        <p class="text-base text-neutral-600 mb-6 leading-relaxed">
          ${config.subheadline}
        </p>

        <!-- Target Launch Date Card -->
        <div class="p-5 rounded-2xl border border-amber-900/15 bg-white shadow-md max-w-md mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Target Launch Date</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Coming Soon Sept, 2026
            </span>
          </div>
          <p class="text-sm font-bold text-neutral-900 font-heading">
            Official Peace Marathon Portal & Registration
          </p>
          <div class="w-full bg-neutral-100 rounded-full h-2 mt-3 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-600 to-yellow-600 h-2 rounded-full" style="width: 88%"></div>
          </div>
        </div>

        <!-- Priority Email Signup -->
        <div class="max-w-md">
          <form id="notify-form" class="p-2 rounded-2xl border bg-white border-neutral-200 flex flex-col sm:flex-row gap-2 shadow-lg">
            <input 
              type="email" 
              id="email-input" 
              placeholder="Enter email for race alert..." 
              required 
              class="flex-1 px-4 py-3 rounded-xl border border-neutral-300 bg-white text-neutral-900 text-sm outline-none focus:border-amber-600"
            />
            <button 
              type="submit" 
              class="px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white transition-all cursor-pointer shadow-md"
            >
              Notify Me
            </button>
          </form>
          <div id="form-feedback" class="hidden text-xs text-emerald-600 font-semibold mt-3">
            ✓ You are reserved for early race registration and updates!
          </div>
        </div>

      </div>

      <!-- Right Column: Sikh Man Worship & Harmony Artwork (Flipped Horizontally) -->
      <div class="lg:col-span-5 flex justify-center">
        <div class="w-full max-w-sm rounded-3xl p-4 border border-amber-900/15 bg-white shadow-xl">
          
          <div class="flex items-center justify-between mb-2 text-[10px] font-mono text-amber-800">
            <span>Ek Onkar • Universal Peace</span>
            <span>Spiritual Harmony</span>
          </div>

          <div class="aspect-square rounded-2xl overflow-hidden bg-[#FAF8F5] border border-amber-900/10 flex items-center justify-center p-2">
            <!-- Vector Sikh Worship Artwork (Flipped Horizontally) -->
            <div style="transform: scaleX(-1); width: 100%; height: 100%;">
              <svg viewBox="0 0 400 480" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="200" r="140" fill="#f59e0b" fill-opacity="0.12" />
                <!-- Saffron Turban -->
                <path d="M100,160 C90,110 130,40 210,35 C290,40 320,110 300,170 C280,140 240,110 200,110 C150,110 120,140 100,160 Z" fill="#f97316" />
                <path d="M85,180 C80,130 140,80 200,80 C270,80 320,135 315,185 C290,145 250,115 200,115 C140,115 105,150 85,180 Z" fill="#fb923c" />
                <path d="M75,200 C80,150 130,120 200,120 C270,120 320,160 325,210 C290,175 250,150 200,150 C140,150 95,175 75,200 Z" fill="#ea580c" />
                <path d="M80,215 L200,290 L220,270 L100,195 Z" fill="#c2410c" />
                <!-- Beard & Features in Worship -->
                <path d="M150,265 Q165,270 180,265" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
                <path d="M220,265 Q235,270 250,265" stroke="#78350f" stroke-width="2.5" stroke-linecap="round" />
                <path d="M125,310 C100,360 120,440 200,465 C280,440 300,360 275,310 C265,370 240,430 200,435 C160,430 135,370 125,310 Z" fill="#111111" />
                <path d="M170,305 C185,295 200,310 200,310 C200,310 215,295 230,305 C255,315 270,335 270,345 C250,335 230,330 200,332 C170,330 150,335 130,345 C130,335 145,315 170,305 Z" fill="#171717" />
              </svg>
            </div>
          </div>

          <div class="mt-3 text-center">
            <p class="text-xs text-neutral-900 font-semibold">Devotion & Universal Harmony</p>
            <p class="text-[10px] text-neutral-500">Promoting mutual respect, peace & selfless service</p>
          </div>

        </div>
      </div>

    </div>

  </main>

  <!-- Bottom Marathon Line Sketches Graphics -->
  <div class="w-full border-t border-amber-900/10 bg-white/80 pt-6 pb-4">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex items-center justify-between text-[11px] text-amber-800 mb-2 font-mono uppercase tracking-wider font-semibold">
        <span>🏃 Marathon Line Sketches</span>
        <span>Peace • Unity • Endurance</span>
      </div>

      <!-- Marathon Continuous Line Sketch -->
      <svg viewBox="0 0 1200 160" fill="none" class="w-full h-auto text-amber-600 stroke-current" preserveAspectRatio="xMidYMid meet">
        <path d="M0,130 C200,120 400,140 600,125 C800,110 1000,135 1200,125" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" opacity="0.4" />
        <!-- Runner 1 Torch -->
        <g transform="translate(180, 20)" stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
          <circle cx="45" cy="30" r="8" />
          <path d="M45,38 L40,75" />
          <path d="M42,48 L58,40 L65,34" />
          <path d="M42,48 L28,58 L18,50" />
          <path d="M40,75 L54,92 L70,110" />
          <path d="M40,75 L22,88 L10,115" />
        </g>
        <!-- Runner 2 -->
        <g transform="translate(420, 25)" stroke="#fbbf24" stroke-width="2" stroke-linecap="round">
          <circle cx="40" cy="28" r="8" />
          <path d="M40,36 L36,72" />
          <path d="M38,46 L50,56 L60,48" />
          <path d="M38,46 L22,38 L14,46" />
          <path d="M36,72 L50,88 L44,110" />
          <path d="M36,72 L20,86 L8,102" />
        </g>
        <!-- Runner 3 Center -->
        <g transform="translate(660, 15)" stroke="#f97316" stroke-width="2.2" stroke-linecap="round">
          <circle cx="42" cy="30" r="8.5" />
          <path d="M42,38 L36,76" />
          <path d="M40,48 L56,40 L66,48" />
          <path d="M40,48 L25,58 L15,52" />
          <path d="M36,76 L56,92 L68,114" />
          <path d="M36,76 L16,92 L2,118" />
        </g>
        <!-- Runner 4 -->
        <g transform="translate(900, 25)" stroke="#f59e0b" stroke-width="2" stroke-linecap="round">
          <circle cx="38" cy="28" r="8" />
          <path d="M38,36 L32,70" />
          <path d="M36,46 L48,56 L58,48" />
          <path d="M36,46 L20,38 L12,46" />
          <path d="M32,70 L46,86 L40,108" />
          <path d="M32,70 L16,84 L4,100" />
        </g>
      </svg>
    </div>
  </div>

  <!-- Footer -->
  <footer class="w-full max-w-6xl mx-auto p-6 border-t border-neutral-200 text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
    <div>&copy; 2026 ${config.brandName}. All rights reserved.</div>
    <div>Contact: <a href="mailto:${config.contactEmail}" class="hover:underline text-amber-700 font-medium">${config.contactEmail}</a></div>
  </footer>

  <script>
    const form = document.getElementById("notify-form");
    const feedback = document.getElementById("form-feedback");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email-input").value;
      const current = JSON.parse(localStorage.getItem("subscribers") || "[]");
      current.push({ email, time: new Date().toISOString() });
      localStorage.setItem("subscribers", JSON.stringify(current));
      form.style.display = "none";
      feedback.classList.remove("hidden");
    });
  </script>
</body>
</html>`;
  };

  const codeContent = generateStandaloneHtml();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([codeContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'index.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        id="export-code-modal"
        className={`w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${currentTheme.accentBadge}`}>
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">Export Ready-to-Host Code</h2>
              <p className={`text-xs ${currentTheme.mutedText}`}>
                Download self-contained static HTML or copy to publish on your hosting provider
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${currentTheme.cardBorder} hover:bg-white/10`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML' : 'Copy HTML'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${currentTheme.primaryButton}`}
            >
              <Download className="w-4 h-4" />
              <span>Download index.html</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-black/60 font-mono text-xs text-neutral-300 leading-relaxed">
          <pre className="overflow-x-auto whitespace-pre">{codeContent}</pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40 text-xs">
          <span className={`flex items-center gap-1.5 ${currentTheme.mutedText}`}>
            <Globe className="w-3.5 h-3.5" />
            Includes complete Sikh worship illustration & marathon line sketch graphics. Zero build steps needed.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-neutral-700 hover:bg-white/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
