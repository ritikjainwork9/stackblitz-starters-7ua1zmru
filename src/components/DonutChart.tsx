import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors, font } from '../theme/tokens';
import { barFill } from '../utils/animations';

interface DonutChartProps {
  pct: number;
  color?: string;
  size?: number;
  label?: string;
  sublabel?: string;
  startFrame?: number;
}

export default function DonutChart({
  pct,
  color = colors.sfBlue,
  size = 140,
  label,
  sublabel,
  startFrame = 0,
}: DonutChartProps) {
  const frame = useCurrentFrame();
  const animatedPct = barFill(frame, startFrame, 60, pct / 100) * 100;

  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - animatedPct / 100);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={colors.bgPage} strokeWidth={10} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: size * 0.22,
              fontFamily: font.family,
              fontWeight: font.weights.extrabold,
              color: colors.textPrimary,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {label}
          </div>
          {sublabel && (
            <div
              style={{
                fontSize: size * 0.1,
                fontFamily: font.family,
                color: colors.textSecondary,
                marginTop: 2,
              }}
            >
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
