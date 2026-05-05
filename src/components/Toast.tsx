import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, radius, shadow, spacing } from '../theme/tokens';

interface ToastProps {
  message: string;
  subtext?: string;
  link?: string;
  variant?: 'success' | 'info' | 'warning' | 'error';
  startFrame: number;
  holdFrames?: number;
  fadeFrames?: number;
}

const icons: Record<string, string> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
};

const accentColors: Record<string, string> = {
  success: colors.success,
  info: colors.sfBlue,
  warning: colors.warning,
  error: colors.danger,
};

export default function Toast({
  message,
  subtext,
  link,
  variant = 'success',
  startFrame,
  holdFrames = 60,
  fadeFrames = 15,
}: ToastProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideInFrames = 15;
  const slideOutStart = startFrame + slideInFrames + holdFrames;
  const endFrame = slideOutStart + fadeFrames;

  if (frame < startFrame || frame > endFrame) return null;

  const translateY = interpolate(
    frame,
    [startFrame, startFrame + slideInFrames],
    [60, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) },
  );

  const opacity = interpolate(
    frame,
    [slideOutStart, endFrame],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const accent = accentColors[variant];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        opacity,
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.md,
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: `${spacing.lg}px ${spacing.xl}px`,
        borderRadius: radius.sm,
        boxShadow: shadow.toast,
        minWidth: 380,
        maxWidth: 520,
        borderLeft: `4px solid ${accent}`,
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: radius.full,
          backgroundColor: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 'bold',
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {icons[variant]}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontFamily: font.family, fontWeight: font.weights.semibold, lineHeight: 1.4 }}>
          {message}
        </div>
        {link && (
          <div
            style={{
              fontSize: 13,
              fontFamily: font.family,
              color: colors.cyan,
              fontWeight: font.weights.medium,
              marginTop: 2,
              textDecoration: 'underline',
            }}
          >
            {link}
          </div>
        )}
        {subtext && (
          <div style={{ fontSize: 13, fontFamily: font.family, color: '#aaa', marginTop: 2 }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
}
