import React, { useState, useEffect } from 'react';
import { ThemeStyle } from '../utils/themes';
import { Clock, Calendar, Sparkles } from 'lucide-react';

interface CountdownTimerProps {
  targetDateStr: string;
  theme: ThemeStyle;
  progressPercentage: number;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDateStr,
  theme,
  progressPercentage,
}) => {
  const [time, setTime] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (isNaN(target) || difference <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTime({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const timeUnits = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  const formattedTargetDate = (() => {
    try {
      const d = new Date(targetDateStr);
      if (isNaN(d.getTime())) return 'Upcoming Launch';
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Target Launch';
    }
  })();

  return (
    <div id="countdown-section" className="w-full max-w-3xl mx-auto my-6">
      {/* Target Launch Date Pill */}
      <div className="flex items-center justify-center gap-2 mb-4 text-xs tracking-wider uppercase font-semibold">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${theme.accentBadge}`}>
          <Calendar className="w-3.5 h-3.5" />
          Target Launch: {formattedTargetDate}
        </span>
      </div>

      {/* Countdown Digits Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <div
            key={index}
            id={`countdown-unit-${unit.label.toLowerCase()}`}
            className={`flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${theme.timerCardBg} ${theme.cardBorder}`}
          >
            {/* Top subtle highlight */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="font-mono text-3xl sm:text-5xl font-bold tracking-tight mb-1 relative z-10">
              <span className={`bg-gradient-to-br ${theme.accentGradient} bg-clip-text text-transparent`}>
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>

            <div className={`text-[11px] sm:text-xs font-semibold tracking-widest uppercase ${theme.mutedText}`}>
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Readiness Progress Bar */}
      <div className={`mt-6 p-4 rounded-xl border ${theme.cardBg} ${theme.cardBorder}`}>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-1.5 font-medium">
            <Sparkles className={`w-3.5 h-3.5 ${theme.accentText}`} />
            Deployment Readiness
          </span>
          <span className="font-mono font-semibold">{progressPercentage}% Ready</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-800/40 overflow-hidden relative">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${theme.progressBarColor} transition-all duration-700 ease-out shadow-sm`}
            style={{ width: `${Math.min(Math.max(progressPercentage, 5), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
