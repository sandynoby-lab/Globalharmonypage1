import React, { useState } from 'react';
import { ThemeStyle } from '../utils/themes';
import { Mail, CheckCircle2, ArrowRight, Shield, Bell } from 'lucide-react';
import { Subscriber } from '../types';

interface NotificationFormProps {
  theme: ThemeStyle;
  onSubscribe: (subscriber: Subscriber) => void;
  brandName: string;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
  theme,
  onSubscribe,
  brandName,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showNameField, setShowNameField] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const newSub: Subscriber = {
        id: 'sub-' + Date.now(),
        email: trimmedEmail,
        name: name.trim() || undefined,
        subscribedAt: new Date().toISOString(),
        source: 'Landing Page Form',
      };

      onSubscribe(newSub);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 450);
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setIsSubmitted(false);
    setError('');
  };

  if (isSubmitted) {
    return (
      <div
        id="notification-success-card"
        className={`w-full max-w-lg mx-auto p-6 sm:p-8 rounded-2xl border text-center transition-all duration-500 animate-in fade-in zoom-in-95 ${theme.cardBg} ${theme.cardBorder}`}
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold font-heading mb-1.5">You're on the Priority List!</h3>
        <p className={`text-sm mb-5 ${theme.mutedText}`}>
          Thank you for joining. We've reserved your spot and will send an exclusive VIP invite to{' '}
          <span className="font-semibold text-white">{email}</span> the moment {brandName} goes live.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className={`text-xs font-medium px-4 py-2 rounded-lg border transition-colors ${theme.cardBorder} hover:bg-white/5`}
        >
          Register another email
        </button>
      </div>
    );
  }

  return (
    <div id="notification-signup-container" className="w-full max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className={`p-4 sm:p-6 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 ${theme.cardBg} ${theme.cardBorder}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Bell className={`w-4 h-4 ${theme.accentText}`} />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Be the First to Know
          </span>
        </div>

        {showNameField && (
          <div className="mb-3">
            <input
              type="text"
              id="subscriber-name-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name (Optional)"
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none ${theme.inputBg}`}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.mutedText}`} />
            <input
              type="email"
              id="subscriber-email-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your email address..."
              required
              className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-colors outline-none ${theme.inputBg}`}
            />
          </div>

          <button
            type="submit"
            id="notify-submit-button"
            disabled={isLoading}
            className={`px-5 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${theme.primaryButton} disabled:opacity-50`}
          >
            {isLoading ? (
              <span>Reserving...</span>
            ) : (
              <>
                <span>Notify Me</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <p id="subscription-error-msg" className="mt-2 text-xs text-rose-400 font-medium">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-neutral-800/40 text-[11px]">
          <div className={`flex items-center gap-1.5 ${theme.mutedText}`}>
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>No spam. Unsubscribe anytime.</span>
          </div>
          {!showNameField && (
            <button
              type="button"
              onClick={() => setShowNameField(true)}
              className={`text-[11px] underline hover:opacity-80 transition-opacity ${theme.accentText}`}
            >
              + Add name
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
