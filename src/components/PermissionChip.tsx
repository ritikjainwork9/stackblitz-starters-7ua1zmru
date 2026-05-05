import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

interface PermissionChipProps {
  label: string;
  expiry?: string;
  checked?: boolean;
  onCheck?: () => void;
  timeLimited?: boolean;
}

export default function PermissionChip({ label, expiry, checked = false, timeLimited = false }: PermissionChipProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,
        padding: `${spacing.xs}px ${spacing.md}px`,
        backgroundColor: timeLimited ? '#EAF6FF' : colors.bgWhite,
        border: `1px solid ${timeLimited ? colors.cyan : colors.border}`,
        borderRadius: radius.sm,
        fontSize: 13,
        fontFamily: font.family,
        color: colors.textPrimary,
      }}
    >
      {checked !== undefined && (
        <div
          style={{
            width: 14,
            height: 14,
            border: `2px solid ${checked ? colors.sfBlue : colors.borderHover}`,
            borderRadius: 3,
            backgroundColor: checked ? colors.sfBlue : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {checked && (
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
              <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      )}
      {timeLimited && <span style={{ fontSize: 13 }}>🔑</span>}
      <span style={{ fontWeight: font.weights.medium, flex: 1 }}>{label}</span>
      {expiry && (
        <span
          style={{
            fontSize: 11,
            color: colors.warning,
            fontWeight: font.weights.semibold,
            backgroundColor: colors.warningBg,
            padding: `1px ${spacing.xs}px`,
            borderRadius: radius.full,
          }}
        >
          Expires {expiry}
        </span>
      )}
    </div>
  );
}
