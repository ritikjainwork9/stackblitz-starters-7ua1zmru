import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing } from '../theme/tokens';

interface TextLine {
  text: string;
  startFrame: number;
}

interface OnScreenTextProps {
  lines: TextLine[];
  position?: 'bottom-left' | 'bottom-center' | 'center';
  dark?: boolean;
}

export default function OnScreenText({ lines, position = 'bottom-left', dark = true }: OnScreenTextProps) {
  const frame = useCurrentFrame();

  const posStyle: React.CSSProperties =
    position === 'bottom-left'
      ? { bottom: 80, left: 80, right: '30%', position: 'absolute' }
      : position === 'bottom-center'
      ? { bottom: 80, left: '50%', transform: 'translateX(-50%)', position: 'absolute' }
      : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' };

  return (
    <div style={{ ...posStyle, zIndex: 200 }}>
      {lines.map((line, i) => {
        const opacity = interpolate(frame, [line.startFrame, line.startFrame + 18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });
        const translateY = interpolate(frame, [line.startFrame, line.startFrame + 18], [16, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });

        if (frame < line.startFrame) return null;

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              fontSize: 28,
              fontFamily: font.family,
              fontWeight: font.weights.bold,
              color: dark ? colors.textOnDark : colors.textPrimary,
              lineHeight: 1.35,
              marginBottom: spacing.sm,
              textShadow: dark ? '0 2px 8px rgba(0,0,0,0.6)' : 'none',
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
}
