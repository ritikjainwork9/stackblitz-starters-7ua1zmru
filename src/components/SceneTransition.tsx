import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

interface SceneTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'white';
  durationFrames?: number;
}

export default function SceneTransition({
  children,
  type = 'fade',
  durationFrames = 15,
}: SceneTransitionProps) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
}
