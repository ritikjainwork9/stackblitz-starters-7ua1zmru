import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, font, spacing } from '../theme/tokens';

interface SceneTitleProps {
  title?: string;
  subtitle?: string;
  startFrame?: number;
  endFrame?: number;
  position?: 'bottom' | 'center';
}

export default function SceneTitle({
  title,
  subtitle,
  startFrame = 0,
  endFrame = 9999,
  position = 'bottom',
}: SceneTitleProps) {
  const frame = useCurrentFrame();

  if (!title && !subtitle) return null;
  if (frame < startFrame || frame > endFrame) return null;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + 15, endFrame - 10, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) },
  );

  const translateY = interpolate(frame, [startFrame, startFrame + 20], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const isBottom = position === 'bottom';

  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        bottom: isBottom ? 60 : undefined,
        top: isBottom ? undefined : '50%',
        transform: isBottom
          ? `translateY(${translateY}px)`
          : `translateY(calc(-50% + ${translateY}px))`,
        opacity,
        zIndex: 100,
      }}
    >
      {subtitle && (
        <div
          style={{
            display: 'inline-block',
            backgroundColor: colors.sfBlue,
            color: '#fff',
            fontSize: 13,
            fontFamily: font.family,
            fontWeight: font.weights.semibold,
            padding: `${spacing.xs}px ${spacing.md}px`,
            borderRadius: 3,
            marginBottom: spacing.sm,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {subtitle}
        </div>
      )}
      {title && (
        <div
          style={{
            fontSize: 32,
            fontFamily: font.family,
            fontWeight: font.weights.bold,
            color: colors.textOnDark,
            lineHeight: 1.3,
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
}
