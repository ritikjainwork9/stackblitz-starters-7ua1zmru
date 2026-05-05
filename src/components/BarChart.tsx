import React from 'react';
import { useCurrentFrame } from 'remotion';
import { colors, font, radius, spacing } from '../theme/tokens';
import { barFill } from '../utils/animations';

interface BarRow {
  label: string;
  current: number;
  total: number;
  color?: string;
}

interface BarChartProps {
  rows: BarRow[];
  startFrame: number;
  staggerFrames?: number;
}

function getBarColor(pct: number, overrideColor?: string): string {
  if (overrideColor) return overrideColor;
  if (pct >= 90) return colors.danger;
  if (pct >= 70) return colors.chartOrange;
  return colors.sfBlue;
}

export default function BarChart({ rows, startFrame, staggerFrames = 15 }: BarChartProps) {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
      {rows.map((row, i) => {
        const pct = (row.current / row.total) * 100;
        const rowStart = startFrame + i * staggerFrames;
        const filled = barFill(frame, rowStart, 45, pct / 100);
        const barColor = getBarColor(pct, row.color);

        return (
          <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                fontSize: 14,
                fontFamily: font.family,
              }}
            >
              <span style={{ fontWeight: font.weights.medium, color: colors.textPrimary }}>
                {row.label}
              </span>
              <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                {row.current}/{row.total} ({Math.round(pct)}%)
              </span>
            </div>
            <div
              style={{
                height: 12,
                backgroundColor: colors.bgPage,
                borderRadius: radius.full,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${filled * 100}%`,
                  height: '100%',
                  backgroundColor: barColor,
                  borderRadius: radius.full,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
