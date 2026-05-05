import React from 'react';
import { colors, font, spacing } from '../theme/tokens';

const TAB_LABELS = [
  'Dashboard',
  'Persona Mapping',
  'User Onboarding',
  'Access Management',
  'User Lifecycle',
  'Cleanup & Insights',
  'Activity Logs',
];

interface AppShellProps {
  activeTab?: string;
  children?: React.ReactNode;
  tabOpacities?: number[];
}

export default function AppShell({ activeTab = 'Dashboard', children, tabOpacities }: AppShellProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bgPage,
        fontFamily: font.family,
      }}
    >
      {/* App header */}
      <div
        style={{
          backgroundColor: colors.bgDark,
          padding: `${spacing.md}px ${spacing.xxl}px`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.lg,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            backgroundColor: colors.sfBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 16,
            fontWeight: font.weights.extrabold,
          }}
        >
          R
        </div>
        <div>
          <div
            style={{
              color: colors.textOnDark,
              fontSize: 18,
              fontWeight: font.weights.bold,
              lineHeight: 1.2,
            }}
          >
            Rapt User Management
          </div>
          <div style={{ color: colors.textOnDarkMuted, fontSize: 12 }}>
            Salesforce User Lifecycle Platform
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div
        style={{
          backgroundColor: '#fff',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          padding: `0 ${spacing.xxl}px`,
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {TAB_LABELS.map((tab, i) => {
          const isActive = tab === activeTab;
          const opacity = tabOpacities ? tabOpacities[i] : 1;
          return (
            <div
              key={tab}
              style={{
                padding: `${spacing.md}px ${spacing.lg}px`,
                fontSize: 14,
                fontWeight: isActive ? font.weights.semibold : font.weights.regular,
                color: isActive ? colors.sfBlue : colors.textSecondary,
                borderBottom: isActive ? `3px solid ${colors.sfBlue}` : '3px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                opacity,
                transition: 'opacity 0.3s',
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>{children}</div>
    </div>
  );
}
