import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple' | 'teal';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  success: { bg: colors.successBg, color: colors.success, border: 'transparent' },
  warning: { bg: colors.warningBg, color: colors.warning, border: 'transparent' },
  danger: { bg: colors.dangerBg, color: colors.danger, border: 'transparent' },
  info: { bg: colors.infoBg, color: colors.info, border: 'transparent' },
  neutral: { bg: colors.bgPage, color: colors.textSecondary, border: colors.border },
  purple: { bg: '#F3EAFD', color: colors.chartPurple, border: 'transparent' },
  teal: { bg: '#E0F7F6', color: colors.chartTeal, border: 'transparent' },
};

export default function Badge({ label, variant = 'neutral', size = 'sm' }: BadgeProps) {
  const styles = variantStyles[variant];
  const fontSize = size === 'sm' ? 11 : 13;
  const paddingH = size === 'sm' ? spacing.sm : spacing.md;
  const paddingV = size === 'sm' ? 2 : 4;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: styles.bg,
        color: styles.color,
        border: `1px solid ${styles.border}`,
        borderRadius: radius.full,
        padding: `${paddingV}px ${paddingH}px`,
        fontSize,
        fontFamily: font.family,
        fontWeight: font.weights.semibold,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}
