import React from 'react';
import marathonWideImg from '../assets/images/marathon_finish_wide_1789917348175.jpg';
import marathonSquareImg from '../assets/images/marathon_finish_runners_1789917083406.jpg';

interface MarathonIllustrationProps {
  className?: string;
}

export const MarathonLineArt: React.FC<MarathonIllustrationProps> = ({
  className = '',
}) => {
  const [useWide, setUseWide] = React.useState(true);

  return (
    <div
      id="marathon-bottom-artwork-container"
      className={`relative w-full rounded-2xl overflow-hidden bg-white shadow-xs flex flex-col items-center justify-center ${className}`}
    >
      {/* Edge-to-edge wide panorama container */}
      <div className="relative w-full overflow-hidden bg-white flex items-center justify-center">
        <img
          src={useWide ? marathonWideImg : marathonSquareImg}
          alt="Global Harmony Marathon Runners sprinting to the finish line"
          referrerPolicy="no-referrer"
          onError={() => setUseWide(false)}
          className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] object-cover object-center transition-all duration-300 hover:scale-[1.01]"
        />

        {/* Soft edge blend overlays for seamless presentation */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />
      </div>

      {/* Caption strip */}
      <div className="w-full bg-[#FAF8F5] border-t border-[#e8dfcf]/80 py-2.5 px-4 sm:px-6 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-600 gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-amber-800">
          <span className="w-2 h-2 rounded-full bg-amber-600" />
          GLOBAL HARMONY MARATHON • FINISH LINE
        </span>
        <span className="text-neutral-500">Uniting Diverse Runners Across the Globe</span>
      </div>
    </div>
  );
};
