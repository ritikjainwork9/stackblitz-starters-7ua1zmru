import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

interface Tab {
  label: string;
  active?: boolean;
  highlighted?: boolean;
}

interface BrowserChromeProps {
  url?: string;
  tabs?: Tab[];
  children?: React.ReactNode;
  title?: string;
}

export default function BrowserChrome({
  url = 'https://myorg.lightning.force.com',
  tabs = [],
  children,
  title,
}: BrowserChromeProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f1f3f4',
        borderRadius: radius.md,
        overflow: 'hidden',
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Browser chrome top bar */}
      <div
        style={{
          height: 36,
          backgroundColor: '#dee1e6',
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${spacing.md}px`,
          gap: spacing.sm,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 24,
            backgroundColor: '#fff',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${spacing.md}px`,
            fontSize: 12,
            fontFamily: font.family,
            color: colors.textSecondary,
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          🔒 {url}
        </div>
      </div>

      {/* Browser tabs */}
      {tabs.length > 0 && (
        <div
          style={{
            height: 34,
            backgroundColor: '#e8eaed',
            display: 'flex',
            alignItems: 'flex-end',
            padding: `0 ${spacing.sm}px`,
            gap: 2,
            flexShrink: 0,
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.label}
              style={{
                height: tab.active ? 30 : 26,
                padding: `0 ${spacing.lg}px`,
                backgroundColor: tab.active ? '#fff' : tab.highlighted ? '#c8e6fc' : '#d2d5db',
                borderRadius: '6px 6px 0 0',
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
                fontFamily: font.family,
                fontWeight: tab.active ? font.weights.semibold : font.weights.regular,
                color: tab.highlighted ? colors.sfBlue : colors.textPrimary,
                whiteSpace: 'nowrap',
                border: tab.highlighted ? `2px solid ${colors.sfBlue}` : 'none',
                borderBottom: 'none',
                outline: tab.highlighted ? `2px solid ${colors.sfBlue}40` : 'none',
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>
      )}

      {/* Salesforce top bar */}
      <div
        style={{
          height: 44,
          backgroundColor: colors.bgDark,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${spacing.xl}px`,
          gap: spacing.xl,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: 16,
            fontFamily: font.family,
            fontWeight: font.weights.bold,
          }}
        >
          ☁ Salesforce
        </div>
        <div style={{ color: '#aac', fontSize: 13, fontFamily: font.family }}>Setup</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', backgroundColor: colors.bgWhite }}>
        {children}
      </div>
    </div>
  );
}
