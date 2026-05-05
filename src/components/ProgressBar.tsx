import React from 'react';
import { colors, radius } from '../theme/tokens';

interface ProgressBarProps {
  pct: number;
  color?: string;
  height?: number;
  animate?: boolean;
}

function barColor(pct: number, overrideColor?: string): string {
  if (overrideColor) return overrideColor;
  if (pct >= 90) return colors.danger;
  if (pct >= 70) return colors.warning;
  return colors.sfBlue;
}

export default function ProgressBar({ pct, color, height = 8, animate = false }: ProgressBarProps) {
  const fill = barColor(pct, color);
  const clampedPct = Math.min(100, Math.max(0, pct));

  return (
    <div
      style={{
        width: '100%',
        height,
        backgroundColor: colors.bgPage,
        borderRadius: radius.full,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${clampedPct}%`,
          height: '100%',
          backgroundColor: fill,
          borderRadius: radius.full,
          transition: animate ? 'width 0.6s ease' : undefined,
        }}
      />
    </div>
  );
}
