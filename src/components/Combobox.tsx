import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

interface ComboboxProps {
  label?: string;
  value?: string;
  placeholder?: string;
  open?: boolean;
  options?: string[];
  hint?: string;
  disabled?: boolean;
}

export default function Combobox({ label, value, placeholder, open, options = [], hint, disabled }: ComboboxProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
      {label && (
        <label
          style={{
            fontSize: 13,
            fontFamily: font.family,
            fontWeight: font.weights.semibold,
            color: disabled ? colors.textMuted : colors.textSecondary,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            height: 36,
            border: `1px solid ${open ? colors.sfBlue : colors.border}`,
            borderRadius: radius.sm,
            backgroundColor: disabled ? colors.bgPage : colors.bgWhite,
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${spacing.md}px`,
            justifyContent: 'space-between',
            cursor: disabled ? 'not-allowed' : 'pointer',
            boxShadow: open ? `0 0 0 3px ${colors.sfBlue}30` : 'none',
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontFamily: font.family,
              color: value ? colors.textPrimary : colors.textMuted,
              fontWeight: value ? font.weights.medium : font.weights.regular,
            }}
          >
            {value || placeholder || 'Select...'}
          </span>
          <span style={{ color: colors.textMuted, fontSize: 12 }}>▾</span>
        </div>

        {open && options.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 38,
              left: 0,
              right: 0,
              backgroundColor: colors.bgWhite,
              border: `1px solid ${colors.border}`,
              borderRadius: radius.sm,
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
              zIndex: 100,
              overflow: 'hidden',
            }}
          >
            {hint && (
              <div
                style={{
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  fontSize: 11,
                  fontFamily: font.family,
                  color: colors.sfBlue,
                  backgroundColor: colors.sfBlueLight,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                {hint}
              </div>
            )}
            {options.map((opt) => (
              <div
                key={opt}
                style={{
                  padding: `${spacing.md}px ${spacing.md}px`,
                  fontSize: 14,
                  fontFamily: font.family,
                  color: colors.textPrimary,
                  cursor: 'pointer',
                  borderBottom: `1px solid ${colors.bgPage}`,
                }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
