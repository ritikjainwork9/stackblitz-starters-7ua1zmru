import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

export type ButtonVariant = 'brand' | 'destructive' | 'success' | 'neutral' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  disabled?: boolean;
  pressed?: boolean;
}

const variantMap: Record<ButtonVariant, { bg: string; color: string; border: string; hoverBg?: string }> = {
  brand: { bg: colors.sfBlue, color: '#fff', border: 'transparent' },
  destructive: { bg: colors.danger, color: '#fff', border: 'transparent' },
  success: { bg: colors.success, color: '#fff', border: 'transparent' },
  neutral: { bg: '#fff', color: colors.textPrimary, border: colors.border },
  outline: { bg: 'transparent', color: colors.sfBlue, border: colors.sfBlue },
};

const sizeMap: Record<ButtonSize, { height: number; fontSize: number; px: number }> = {
  sm: { height: 28, fontSize: 13, px: spacing.md },
  md: { height: 36, fontSize: 14, px: spacing.lg },
  lg: { height: 44, fontSize: 15, px: spacing.xl },
};

export default function Button({
  label,
  variant = 'brand',
  size = 'md',
  icon,
  disabled = false,
  pressed = false,
}: ButtonProps) {
  const v = variantMap[variant];
  const s = sizeMap[size];
  const opacity = disabled ? 0.5 : pressed ? 0.85 : 1;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        height: s.height,
        padding: `0 ${s.px}px`,
        backgroundColor: v.bg,
        color: v.color,
        border: `1px solid ${v.border}`,
        borderRadius: radius.sm,
        fontSize: s.fontSize,
        fontFamily: font.family,
        fontWeight: font.weights.semibold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      {icon && (
        <span style={{ fontSize: s.fontSize + 2, lineHeight: 1 }}>{icon}</span>
      )}
      {label}
    </div>
  );
}
