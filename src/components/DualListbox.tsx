import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

interface DualListboxProps {
  availableItems: string[];
  assignedItems: string[];
  label?: string;
  movedCount?: number;
}

export default function DualListbox({ availableItems, assignedItems, label }: DualListboxProps) {
  return (
    <div>
      {label && (
        <div
          style={{
            fontSize: 13,
            fontFamily: font.family,
            fontWeight: font.weights.semibold,
            color: colors.textSecondary,
            marginBottom: spacing.sm,
          }}
        >
          {label}
        </div>
      )}
      <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'stretch' }}>
        {/* Available */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: font.family,
              fontWeight: font.weights.semibold,
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4,
            }}
          >
            Available ({availableItems.length})
          </div>
          <div
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: radius.sm,
              backgroundColor: colors.bgWhite,
              minHeight: 100,
              overflow: 'hidden',
            }}
          >
            {availableItems.map((item) => (
              <div
                key={item}
                style={{
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  fontSize: 13,
                  fontFamily: font.family,
                  color: colors.textPrimary,
                  borderBottom: `1px solid ${colors.bgPage}`,
                  cursor: 'pointer',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: spacing.sm,
          }}
        >
          <div
            style={{
              width: 32,
              height: 28,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.sm,
              backgroundColor: colors.bgWhite,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14,
              color: colors.sfBlue,
              fontWeight: 'bold',
            }}
          >
            →
          </div>
          <div
            style={{
              width: 32,
              height: 28,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.sm,
              backgroundColor: colors.bgWhite,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 14,
              color: colors.textSecondary,
            }}
          >
            ←
          </div>
        </div>

        {/* Assigned */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: font.family,
              fontWeight: font.weights.semibold,
              color: colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 4,
            }}
          >
            Assigned ({assignedItems.length})
          </div>
          <div
            style={{
              border: `1px solid ${colors.sfBlue}`,
              borderRadius: radius.sm,
              backgroundColor: colors.sfBlueLight,
              minHeight: 100,
              overflow: 'hidden',
            }}
          >
            {assignedItems.map((item) => (
              <div
                key={item}
                style={{
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  fontSize: 13,
                  fontFamily: font.family,
                  color: colors.sfBlueDark,
                  borderBottom: `1px solid ${colors.sfBlue}20`,
                  cursor: 'pointer',
                  fontWeight: font.weights.medium,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
