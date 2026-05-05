import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

interface NavItem {
  label: string;
  icon?: string;
}

const LIFECYCLE_ITEMS: NavItem[] = [
  { label: 'Activate User', icon: '➕' },
  { label: 'Deactivate User', icon: '⛔' },
  { label: 'Login Control', icon: '🔒' },
  { label: 'Bulk Login Control', icon: '❄️' },
  { label: 'Reset Password', icon: '🔑' },
];

interface SidebarNavProps {
  activeItem?: string;
  itemOpacities?: number[];
}

export default function SidebarNav({ activeItem = 'Deactivate User', itemOpacities }: SidebarNavProps) {
  return (
    <div
      style={{
        width: 220,
        backgroundColor: colors.bgWhite,
        borderRight: `1px solid ${colors.border}`,
        padding: `${spacing.lg}px 0`,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flexShrink: 0,
        height: '100%',
      }}
    >
      <div
        style={{
          padding: `${spacing.sm}px ${spacing.lg}px ${spacing.md}px`,
          fontSize: 11,
          fontFamily: font.family,
          fontWeight: font.weights.semibold,
          color: colors.textMuted,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        Lifecycle Actions
      </div>
      {LIFECYCLE_ITEMS.map((item, i) => {
        const isActive = item.label === activeItem;
        const opacity = itemOpacities ? itemOpacities[i] : 1;
        return (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              padding: `${spacing.md}px ${spacing.lg}px`,
              backgroundColor: isActive ? colors.sfBlueLight : 'transparent',
              borderLeft: isActive ? `3px solid ${colors.sfBlue}` : '3px solid transparent',
              cursor: 'pointer',
              opacity,
              fontFamily: font.family,
              fontSize: 14,
              fontWeight: isActive ? font.weights.semibold : font.weights.regular,
              color: isActive ? colors.sfBlue : colors.textPrimary,
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
