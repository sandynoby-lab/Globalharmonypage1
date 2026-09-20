import React, { useState } from 'react';
import { Milestone, FeatureTeaser } from '../types';
import { ThemeStyle } from '../utils/themes';
import { CheckCircle, Clock, CircleDot, Zap, ShieldCheck, Sparkles, Layers, Cpu, Globe, Rocket, HelpCircle } from 'lucide-react';

interface RoadmapMilestonesProps {
  milestones: Milestone[];
  features: FeatureTeaser[];
  theme: ThemeStyle;
}

export const RoadmapMilestones: React.FC<RoadmapMilestonesProps> = ({
  milestones,
  features,
  theme,
}) => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'features'>('roadmap');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      default:
        return <Rocket className="w-5 h-5" />;
    }
  };

  return (
    <div id="roadmap-features-container" className="w-full max-w-4xl mx-auto mt-12 mb-8">
      {/* Tab Switcher */}
      <div className="flex items-center justify-center mb-8">
        <div className={`p-1 rounded-xl border flex gap-1 ${theme.cardBg} ${theme.cardBorder}`}>
          <button
            type="button"
            id="tab-roadmap-btn"
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'roadmap'
                ? `${theme.primaryButton}`
                : `${theme.mutedText} hover:text-white`
            }`}
          >
            Launch Roadmap
          </button>
          <button
            type="button"
            id="tab-features-btn"
            onClick={() => setActiveTab('features')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'features'
                ? `${theme.primaryButton}`
                : `${theme.mutedText} hover:text-white`
            }`}
          >
            What to Expect
          </button>
        </div>
      </div>

      {activeTab === 'roadmap' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';
            const isInProgress = milestone.status === 'in-progress';

            return (
              <div
                key={milestone.id || idx}
                id={`milestone-card-${idx}`}
                className={`p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${theme.cardBg} ${theme.cardBorder}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isInProgress ? (
                        <Clock className={`w-4 h-4 ${theme.accentText} shrink-0 animate-pulse`} />
                      ) : (
                        <CircleDot className="w-4 h-4 text-neutral-500 shrink-0" />
                      )}
                      <span className="font-semibold text-sm">{milestone.title}</span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                          : isInProgress
                          ? `${theme.accentBadge}`
                          : 'bg-neutral-800/60 text-neutral-400 border-neutral-700/40'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Upcoming'}
                    </span>
                  </div>

                  <p className={`text-xs leading-relaxed ${theme.mutedText}`}>
                    {milestone.description}
                  </p>
                </div>

                {milestone.date && (
                  <div className={`mt-4 pt-3 border-t border-neutral-800/40 text-[11px] font-mono ${theme.mutedText}`}>
                    {milestone.date}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <div
              key={feature.id || idx}
              id={`feature-card-${idx}`}
              className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col items-start ${theme.cardBg} ${theme.cardBorder}`}
            >
              <div
                className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center border ${theme.accentBadge}`}
              >
                {getIcon(feature.icon)}
              </div>
              <h4 className="font-bold text-base mb-1.5 font-heading">{feature.title}</h4>
              <p className={`text-xs leading-relaxed ${theme.mutedText}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
