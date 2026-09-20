import React, { useState } from 'react';
import { ThemeStyle } from '../utils/themes';
import { X, BookOpen, Globe, Server, Lock, Mail, ExternalLink, Copy, Check } from 'lucide-react';

interface DomainGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  domainName: string;
  theme: ThemeStyle;
}

export const DomainGuideModal: React.FC<DomainGuideModalProps> = ({
  isOpen,
  onClose,
  domainName,
  theme,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const steps = [
    {
      icon: Server,
      title: '1. Host Your Coming Soon Page for Free',
      desc: 'You can host this standalone page with zero monthly cost using modern static hosting providers like Cloudflare Pages, Vercel, Netlify, or GitHub Pages. Simply export the standalone HTML file from the top bar.',
      details: [
        'Cloudflare Pages: Unlimited bandwidth, global CDN, 100% free.',
        'Vercel / Netlify: Drag & drop folder or connect a Git repository.',
        'Traditional cPanel / Apache / Nginx: Upload index.html to public_html.',
      ],
    },
    {
      icon: Globe,
      title: '2. Configure DNS Records in Your Registrar',
      desc: `Log into your domain registrar (Namecheap, GoDaddy, Cloudflare, Porkbun, Google/Squarespace) and add these standard DNS records:`,
      dnsTable: [
        { type: 'A', name: '@', value: '76.76.21.21 (or your host IP)', desc: 'Points root domain' },
        { type: 'CNAME', name: 'www', value: domainName || 'yourdomain.com', desc: 'Points www subdomain' },
        { type: 'TXT', name: '@', value: 'v=spf1 include:... ~all', desc: 'Email validation (SPF)' },
      ],
    },
    {
      icon: Lock,
      title: '3. Enable Automatic HTTPS / SSL',
      desc: 'Never launch without SSL. Free automated SSL certificates are provided out-of-the-box by Cloudflare (Universal SSL), Let’s Encrypt, or host platforms like Vercel and Netlify.',
    },
    {
      icon: Mail,
      title: '4. Set Up Professional Email Forwarding',
      desc: `Want hello@${domainName || 'yourdomain.com'} to forward directly to your personal Gmail or inbox without paying for expensive Google Workspace right away?`,
      details: [
        'Use Cloudflare Email Routing (Free): Create unlimited custom email aliases that auto-forward to your inbox.',
        'Or ImprovMX / Forward Email: Free simple email forwarding setup in 2 minutes.',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        id="domain-guide-modal"
        className={`w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${theme.cardBg} ${theme.cardBorder}`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${theme.accentBadge}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">New Domain Quickstart Guide</h2>
              <p className={`text-xs ${theme.mutedText}`}>
                How to connect, point DNS, secure, and publish on <span className="text-white font-mono">{domainName}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} space-y-3`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg border ${theme.accentBadge}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{step.title}</h3>
                </div>

                <p className={`text-xs leading-relaxed ${theme.mutedText}`}>{step.desc}</p>

                {step.details && (
                  <ul className="space-y-1.5 pl-2 text-xs">
                    {step.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className={`text-[11px] ${theme.accentText}`}>•</span>
                        <span className="text-neutral-300">{d}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.dnsTable && (
                  <div className="overflow-x-auto rounded-xl border border-neutral-800/80 bg-black/40 mt-3">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 border-b border-neutral-800 text-[10px] uppercase font-semibold text-neutral-400">
                        <tr>
                          <th className="p-2.5">Type</th>
                          <th className="p-2.5">Name / Host</th>
                          <th className="p-2.5">Value / Target</th>
                          <th className="p-2.5">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 font-mono text-[11px]">
                        {step.dnsTable.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.02]">
                            <td className="p-2.5 font-bold text-amber-400">{row.type}</td>
                            <td className="p-2.5 text-neutral-300">{row.name}</td>
                            <td className="p-2.5 text-neutral-400 truncate max-w-[200px]">
                              {row.value}
                            </td>
                            <td className="p-2.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(row.value, `dns-${rIdx}`)}
                                className={`px-2 py-1 rounded text-[10px] font-sans border flex items-center gap-1 hover:bg-white/10 ${theme.cardBorder}`}
                              >
                                {copiedField === `dns-${rIdx}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          <span className={`text-xs ${theme.mutedText}`}>
            Tip: DNS propagation usually takes 5–30 minutes globally.
          </span>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold ${theme.primaryButton}`}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
