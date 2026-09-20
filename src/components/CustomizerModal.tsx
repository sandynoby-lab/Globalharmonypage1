import React, { useState } from 'react';
import { PageConfig, ThemeId, Milestone, SocialLink } from '../types';
import { THEMES, ThemeStyle } from '../utils/themes';
import { X, Sliders, Globe, Palette, Clock, Share2, ListPlus, Sparkles, Check, RefreshCw, Trash2, Plus } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PageConfig;
  onSave: (newConfig: PageConfig) => void;
  onResetToDefault: () => void;
  currentTheme: ThemeStyle;
}

type TabType = 'general' | 'theme' | 'countdown' | 'roadmap' | 'socials' | 'seo';

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onResetToDefault,
  currentTheme,
}) => {
  const [formData, setFormData] = useState<PageConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [saveToast, setSaveToast] = useState(false);

  if (!isOpen) return null;

  const handleChange = <K extends keyof PageConfig>(field: K, value: PageConfig[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
    const updated = [...formData.milestones];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const handleAddMilestone = () => {
    const newM: Milestone = {
      id: 'm-' + Date.now(),
      title: 'New Milestone Stage',
      description: 'Describe the upcoming release phase or feature rollout.',
      status: 'upcoming',
      date: 'Phase ' + (formData.milestones.length + 1),
    };
    setFormData((prev) => ({ ...prev, milestones: [...prev.milestones, newM] }));
  };

  const handleRemoveMilestone = (index: number) => {
    const updated = formData.milestones.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, milestones: updated }));
  };

  const handleSocialToggle = (index: number) => {
    const updated = [...formData.socials];
    updated[index] = {
      ...updated[index],
      enabled: !updated[index].enabled,
    };
    setFormData((prev) => ({ ...prev, socials: updated }));
  };

  const handleSocialUrlChange = (index: number, url: string) => {
    const updated = [...formData.socials];
    updated[index] = {
      ...updated[index],
      url,
    };
    setFormData((prev) => ({ ...prev, socials: updated }));
  };

  const handleSave = () => {
    onSave(formData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg animate-in fade-in duration-200">
      <div
        id="page-customizer-modal"
        className={`w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${currentTheme.accentBadge}`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading">Page Customizer</h2>
              <p className={`text-xs ${currentTheme.mutedText}`}>
                Personalize your domain details, countdown date, copy, and visual style
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${currentTheme.primaryButton}`}
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes</span>
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

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800/60 px-6 overflow-x-auto gap-2 py-2 bg-neutral-950/30 shrink-0 text-xs">
          {[
            { id: 'general', label: 'Domain & Content', icon: Globe },
            { id: 'theme', label: 'Theme & Styling', icon: Palette },
            { id: 'countdown', label: 'Launch Timer', icon: Clock },
            { id: 'roadmap', label: 'Roadmap & Teasers', icon: ListPlus },
            { id: 'socials', label: 'Socials & Email', icon: Share2 },
            { id: 'seo', label: 'SEO & Metadata', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? `bg-white/10 text-white shadow-sm`
                    : `${currentTheme.mutedText} hover:text-white hover:bg-white/5`
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? currentTheme.accentText : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                    Registered Domain Name
                  </label>
                  <input
                    type="text"
                    value={formData.domainName}
                    onChange={(e) => handleChange('domainName', e.target.value)}
                    placeholder="e.g. yourcompany.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none font-mono ${currentTheme.inputBg}`}
                  />
                  <span className="text-[11px] opacity-60 mt-1 block">
                    Shown in header status badge and title banner
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                    Brand / Project Name
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => handleChange('brandName', e.target.value)}
                    placeholder="e.g. NextGen"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="Short one-line proposition"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  Announcement Badge Text
                </label>
                <input
                  type="text"
                  value={formData.announcementBadge}
                  onChange={(e) => handleChange('announcementBadge', e.target.value)}
                  placeholder="e.g. ⚡ Launching in Spring 2026 • Private Beta Soon"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  Main Headline
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => handleChange('headline', e.target.value)}
                  placeholder="Headline displayed on hero"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  Subheading Description
                </label>
                <textarea
                  rows={3}
                  value={formData.subheadline}
                  onChange={(e) => handleChange('subheadline', e.target.value)}
                  placeholder="Detailed context for visitors"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none resize-none ${currentTheme.inputBg}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  Status Indicator Text
                </label>
                <input
                  type="text"
                  value={formData.badgeStatusText}
                  onChange={(e) => handleChange('badgeStatusText', e.target.value)}
                  placeholder="e.g. Systems Under Construction"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                />
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-90">
                Select Color Palette & Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {Object.values(THEMES).map((t) => {
                  const isSelected = formData.theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleChange('theme', t.id as ThemeId)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? `ring-2 ring-cyan-400 border-transparent shadow-lg`
                          : `border-neutral-800 hover:border-neutral-700 bg-neutral-900/40`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{t.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <span className="text-xs opacity-60 block mb-3">{t.badge}</span>
                      <div className="flex gap-1.5">
                        <div
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ background: t.glowColor1.replace('0.15', '0.9') }}
                        />
                        <div
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ background: t.glowColor2.replace('0.15', '0.9') }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'countdown' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                    Target Launch Date Label / Text
                  </label>
                  <input
                    type="text"
                    value={formData.targetLaunchDate}
                    onChange={(e) => handleChange('targetLaunchDate', e.target.value)}
                    placeholder="e.g. Coming Soon Sept, 2026"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none font-medium ${currentTheme.inputBg}`}
                  />
                  <span className="text-[11px] opacity-60 mt-1 block">
                    Displays the official target launch date/schedule on the hero section.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                    Deployment Readiness Percentage ({formData.progressPercentage}%)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={formData.progressPercentage}
                    onChange={(e) => handleChange('progressPercentage', Number(e.target.value))}
                    className="w-full h-2 rounded-lg accent-amber-500 cursor-pointer mt-3"
                  />
                  <div className="flex justify-between text-[11px] opacity-60 mt-1">
                    <span>Just Started (5%)</span>
                    <span>Almost Ready (80%)</span>
                    <span>100% Ready</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold">Launch Milestones</h4>
                  <p className={`text-xs ${currentTheme.mutedText}`}>
                    Show visitors the structured progress toward public availability
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMilestone}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${currentTheme.accentBadge} cursor-pointer`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Phase</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.milestones.map((m, idx) => (
                  <div
                    key={m.id || idx}
                    className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/40 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)}
                        placeholder="Milestone Title"
                        className={`flex-1 px-3 py-1.5 rounded-lg border text-xs font-semibold outline-none ${currentTheme.inputBg}`}
                      />
                      <select
                        value={m.status}
                        onChange={(e) =>
                          handleMilestoneChange(
                            idx,
                            'status',
                            e.target.value as 'completed' | 'in-progress' | 'upcoming'
                          )
                        }
                        className={`px-2.5 py-1.5 rounded-lg border text-xs outline-none ${currentTheme.inputBg}`}
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="upcoming">Upcoming</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveMilestone(idx)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <textarea
                      rows={2}
                      value={m.description}
                      onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)}
                      placeholder="Milestone description"
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs outline-none resize-none ${currentTheme.inputBg}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'socials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                    Contact / Inquiries Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    placeholder="contact@yourdomain.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium">
                    <input
                      type="checkbox"
                      checked={formData.allowInquiries}
                      onChange={(e) => handleChange('allowInquiries', e.target.checked)}
                      className="w-4 h-4 rounded accent-cyan-400"
                    />
                    <span>Show "Get in Touch" inquiry button on landing page</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider mb-2.5 opacity-90">
                  Social Channels & Links
                </h4>
                <div className="space-y-2.5">
                  {formData.socials.map((s, idx) => (
                    <div
                      key={s.platform}
                      className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-900/30"
                    >
                      <input
                        type="checkbox"
                        checked={s.enabled}
                        onChange={() => handleSocialToggle(idx)}
                        className="w-4 h-4 rounded accent-cyan-400"
                      />
                      <span className="w-24 text-xs font-semibold capitalize">{s.platform}</span>
                      <input
                        type="text"
                        value={s.url}
                        onChange={(e) => handleSocialUrlChange(idx, e.target.value)}
                        placeholder={`https://${s.platform}.com/...`}
                        className={`flex-1 px-3 py-1.5 rounded-lg border text-xs outline-none ${currentTheme.inputBg}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  SEO Page Title
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange('seoTitle', e.target.value)}
                  placeholder="Brand — Under Construction & Coming Soon"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 opacity-90">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={formData.seoDescription}
                  onChange={(e) => handleChange('seoDescription', e.target.value)}
                  placeholder="Summary for search engines and social share cards"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none resize-none ${currentTheme.inputBg}`}
                />
              </div>

              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50">
                <span className="text-[11px] font-semibold uppercase tracking-wider opacity-60 block mb-2">
                  Google Search Snippet Preview
                </span>
                <div className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">
                  {formData.seoTitle || 'Coming Soon'}
                </div>
                <div className="text-emerald-400 text-xs font-mono my-0.5">
                  https://{formData.domainName || 'yourdomain.com'}
                </div>
                <div className="text-xs text-neutral-400 line-clamp-2">
                  {formData.seoDescription || 'Something remarkable is under construction.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800/60 flex items-center justify-between shrink-0 bg-neutral-900/40">
          <button
            type="button"
            onClick={onResetToDefault}
            className={`text-xs flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Applied!
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium hover:bg-white/10 text-neutral-300 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer ${currentTheme.primaryButton}`}
            >
              Save & Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
