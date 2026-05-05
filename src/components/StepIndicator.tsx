import React from 'react';
import { colors, font, radius, spacing } from '../theme/tokens';

interface Step {
  number: number;
  label: string;
  status?: 'complete' | 'active' | 'pending';
}

interface StepIndicatorProps {
  steps: Step[];
  style?: React.CSSProperties;
}

export default function StepIndicator({ steps, style }: StepIndicatorProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: spacing.lg,
        alignItems: 'center',
        ...style,
      }}
    >
      {steps.map((step, i) => {
        const isComplete = step.status === 'complete';
        const isActive = step.status === 'active';
        return (
          <React.Fragment key={step.number}>
            {i > 0 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: isComplete ? colors.success : colors.border,
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.sm,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: radius.full,
                  backgroundColor: isComplete ? colors.success : isActive ? colors.sfBlue : colors.bgPage,
                  border: `2px solid ${isComplete ? colors.success : isActive ? colors.sfBlue : colors.border}`,
                  color: isComplete || isActive ? '#fff' : colors.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontFamily: font.family,
                  fontWeight: font.weights.bold,
                  flexShrink: 0,
                }}
              >
                {isComplete ? '✓' : step.number}
              </div>
              <span
                style={{
                  fontSize: 13,
                  fontFamily: font.family,
                  fontWeight: isActive ? font.weights.semibold : font.weights.regular,
                  color: isActive ? colors.textPrimary : colors.textSecondary,
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
