import React, { useState } from 'react';
import { Subscriber } from '../types';
import { ThemeStyle } from '../utils/themes';
import { X, Users, Download, Copy, Check, Trash2, Mail, Calendar, UserCheck } from 'lucide-react';

interface SubscribersModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscribers: Subscriber[];
  onClearSubscribers: () => void;
  theme: ThemeStyle;
}

export const SubscribersModal: React.FC<SubscribersModalProps> = ({
  isOpen,
  onClose,
  subscribers,
  onClearSubscribers,
  theme,
}) => {
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopyAll = () => {
    const emails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (subscribers.length === 0) return;
    const header = 'ID,Name,Email,SubscribedAt,Source\n';
    const rows = subscribers
      .map(
        (s) =>
          `"${s.id}","${s.name || ''}","${s.email}","${s.subscribedAt}","${s.source || ''}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `launch-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        id="subscribers-manager-modal"
        className={`w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${theme.cardBg} ${theme.cardBorder}`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${theme.accentBadge}`}>
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-heading">Early Access Priority List</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${theme.accentBadge}`}>
                  {subscribers.length} total
                </span>
              </div>
              <p className={`text-xs ${theme.mutedText}`}>
                Leads collected from your Coming Soon page
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

        {/* Action Toolbar */}
        <div className="p-4 border-b border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-950/20">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email or name..."
            className={`w-full sm:w-64 px-3.5 py-1.5 rounded-xl border text-xs outline-none ${theme.inputBg}`}
          />

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleCopyAll}
              disabled={subscribers.length === 0}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 ${theme.cardBorder} hover:bg-white/5`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Emails' : 'Copy All'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadCsv}
              disabled={subscribers.length === 0}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-40 ${theme.primaryButton}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Mail className={`w-10 h-10 mx-auto mb-3 opacity-30 ${theme.accentText}`} />
              <p className="text-sm font-semibold mb-1">No subscribers found</p>
              <p className={`text-xs ${theme.mutedText}`}>
                When visitors register their email on your coming soon page, they will appear here.
              </p>
            </div>
          ) : (
            filtered.map((sub) => {
              const formattedDate = new Date(sub.subscribedAt).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={sub.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${theme.cardBg} ${theme.cardBorder}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white">{sub.email}</span>
                        {sub.name && (
                          <span className={`text-[11px] px-1.5 py-0.5 rounded ${theme.cardBg} ${theme.mutedText}`}>
                            {sub.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] opacity-60 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formattedDate}
                        </span>
                        {sub.source && <span>• {sub.source}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          {subscribers.length > 0 && (
            <button
              type="button"
              onClick={onClearSubscribers}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear list</span>
            </button>
          )}
          <div className="ml-auto">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-semibold ${theme.primaryButton}`}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
