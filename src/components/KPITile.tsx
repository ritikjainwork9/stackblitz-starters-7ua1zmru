import React from 'react';
import { colors, font, radius, shadow, spacing } from '../theme/tokens';

interface KPITileProps {
  label: string;
  value: string | number;
  subtext?: string;
  accentColor?: string;
  icon?: string;
  opacity?: number;
  scale?: number;
}

export default function KPITile({
  label,
  value,
  subtext,
  accentColor = colors.sfBlue,
  icon,
  opacity = 1,
  scale = 1,
}: KPITileProps) {
  return (
    <div
      style={{
        backgroundColor: colors.bgWhite,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.sm,
        boxShadow: shadow.card,
        padding: spacing.xl,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
        flex: 1,
        borderTop: `4px solid ${accentColor}`,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontFamily: font.family,
          fontWeight: font.weights.semibold,
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 42,
          fontFamily: font.family,
          fontWeight: font.weights.extrabold,
          color: colors.textPrimary,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </div>
      {subtext && (
        <div
          style={{
            fontSize: 13,
            fontFamily: font.family,
            fontWeight: font.weights.medium,
            color: accentColor,
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}
