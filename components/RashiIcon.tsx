import React from 'react';

export type RashiName = 
  | 'mesha' | 'vrishabha' | 'mithuna' | 'karka' | 'simha' | 'kanya'
  | 'tula' | 'vrishchika' | 'dhanu' | 'makara' | 'kumbha' | 'meena';

interface RashiIconProps {
  rashi: RashiName;
  size?: number;
  className?: string;
}

const RashiIcons: Record<RashiName, React.ReactNode | null> = {
  mesha: null,
  vrishabha: null,
  mithuna: null,
  karka: null,
  simha: null,
  kanya: null,
  tula: null,
  vrishchika: null,
  dhanu: null,
  makara: null,
  // Kumbha (Water Bearer) - Figure pouring water from pitcher
  kumbha: (
    <>
      {/* Figure - simplified kneeling silhouette */}
      {/* Head (profile left) */}
      <circle cx="7" cy="7" r="2" fill="currentColor" />
      {/* Hair flowing down */}
      <path d="M7 9C7 9 6 11 5 13C4 15 4 17 4 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Torso */}
      <ellipse cx="8" cy="12" rx="2" ry="3.5" fill="currentColor" />
      {/* Right leg (kneeling) */}
      <path d="M7 15.5L6 19L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Left leg (bent) */}
      <path d="M9 15.5L10 17.5L11 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Arms holding pitcher */}
      <path d="M9 10L12 8L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M9 11L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Pitcher - simplified shape */}
      <path d="M14 5C14 5 15 4 16 5C17 6 17 7 16 8C15 9 14 9 14 9V11C14 12 15 13 16 13C17 13 17 12 17 11V8" 
            fill="currentColor" />
      {/* Pitcher handle */}
      <path d="M16 5L16 8" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Water stream - flowing down with curl */}
      <path d="M14 9C14 10 13 12 12 14C11 16 10 18 9 20C8 21 7 21 6 20" 
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Water curl at bottom */}
      <path d="M6 20C6 20 5 21 4 20C3 19 3 18 4 17" 
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ),
  meena: null,
};

export const RashiIcon: React.FC<RashiIconProps> = ({ 
  rashi, 
  size = 20, 
  className = '' 
}) => {
  const icon = RashiIcons[rashi];
  if (!icon) {
    return null;
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {icon}
    </svg>
  );
};

// Helper function to get emoji fallback (for backward compatibility)
export const getRashiEmoji = (rashi: RashiName): string => {
  const emojiMap: Record<RashiName, string> = {
    mesha: '🐏',
    vrishabha: '🐂',
    mithuna: '👥',
    karka: '🦀',
    simha: '🦁',
    kanya: '👧',
    tula: '⚖️',
    vrishchika: '🦂',
    dhanu: '🏹',
    makara: '🐐',
    kumbha: '🪣',
    meena: '🐟',
  };
  return emojiMap[rashi];
};

