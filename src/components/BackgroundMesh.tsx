import React from 'react';
import { ThemeStyle } from '../utils/themes';

interface BackgroundMeshProps {
  theme: ThemeStyle;
}

export const BackgroundMesh: React.FC<BackgroundMeshProps> = ({ theme }) => {
  const isLight = theme.id === 'warm-cream' || theme.id === 'opal-light';

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dynamic ambient gradient orbs */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-60 transition-all duration-1000"
        style={{ background: theme.glowColor1 }}
      />
      <div
        className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full blur-[160px] opacity-40 transition-all duration-1000"
        style={{ background: theme.glowColor2 }}
      />
      <div
        className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30 transition-all duration-1000"
        style={{ background: theme.glowColor1 }}
      />

      {/* Subtle tech grid or pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] transition-opacity duration-500"
        style={{
          backgroundImage: isLight
            ? `radial-gradient(#78350f 1px, transparent 1px)`
            : `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      
      {/* Subtle top vignette */}
      <div
        className={`absolute inset-0 ${
          isLight
            ? 'bg-gradient-to-b from-transparent via-[#FAF8F5]/30 to-[#FAF8F5]'
            : 'bg-gradient-to-b from-transparent via-black/20 to-neutral-950/80'
        }`}
      />
    </div>
  );
};
