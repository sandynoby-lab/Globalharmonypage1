import React, { useState } from 'react';
import { ThemeStyle } from '../utils/themes';
import { X, Send, Mail, CheckCircle2, MessageSquare, User, Copy, Check, Info } from 'lucide-react';
import { InquiryMessage } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeStyle;
  contactEmail: string;
  brandName: string;
  onSendMessage: (msg: InquiryMessage) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  theme,
  contactEmail = 'globalharmonyrun@gmail.com',
  brandName = 'GlobalHarmonyRun',
  onSendMessage,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(text);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    const newMsg: InquiryMessage = {
      id: 'msg-' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || 'General Information Inquiry',
      message: message.trim(),
      sentAt: new Date().toISOString(),
    };

    onSendMessage(newMsg);
    setIsSent(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSent(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="contact-information-modal"
        className="w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-[#e8dfcf] bg-white shadow-2xl relative transition-all text-neutral-900"
      >
        <button
          type="button"
          id="btn-close-information-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2 text-neutral-900">Inquiry Received!</h3>
            <p className="text-sm mb-6 text-neutral-600">
              Thank you for reaching out. We will get back to you at{' '}
              <span className="font-semibold text-neutral-900">{email}</span> shortly.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl border border-amber-300 bg-amber-100/80 text-amber-900">
                <Info className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-neutral-900">Get Information</h3>
                <p className="text-xs text-neutral-500">
                  Official Contact & Communications for {brandName}.in
                </p>
              </div>
            </div>

            {/* Prominent Email Address Card */}
            <div className="mb-5">
              <div className="p-3.5 rounded-2xl border border-amber-200 bg-[#FAF8F5] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-amber-200/60 text-amber-900">
                    <Mail className="w-4 h-4 text-amber-800" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] uppercase font-bold text-amber-800 block tracking-wider">
                      Contact Email
                    </span>
                    <a
                      href="mailto:globalharmonyrun@gmail.com"
                      className="text-sm font-bold text-neutral-900 font-mono hover:text-amber-700 transition-colors truncate block"
                    >
                      globalharmonyrun@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy('globalharmonyrun@gmail.com')}
                  className="px-2.5 py-1.5 rounded-lg border border-amber-300/80 bg-white hover:bg-amber-100/60 text-amber-900 text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors shadow-xs cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail === 'globalharmonyrun@gmail.com' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-700" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Message Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-neutral-700">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm outline-none focus:border-amber-600 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-neutral-700">
                    Your Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm outline-none focus:border-amber-600 shadow-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-neutral-700">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with marathon participation, partnerships, or volunteering?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm outline-none resize-none focus:border-amber-600 shadow-xs"
                />
              </div>

              {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href="mailto:globalharmonyrun@gmail.com"
                  className="text-xs flex items-center gap-1.5 text-amber-800 hover:underline font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-700" />
                  <span>Email Directly</span>
                </a>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-md cursor-pointer transition-all"
                >
                  <span>Send Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
