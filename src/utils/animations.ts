import { interpolate, spring, Easing } from 'remotion';
import { motion } from '../theme/tokens';

export function fadeIn(frame: number, startFrame: number, durationFrames = 20): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
}

export function fadeOut(frame: number, startFrame: number, durationFrames = 20): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
}

export function slideUp(frame: number, fps: number, startFrame: number, distance = 40): number {
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: motion.spring,
  });
  return interpolate(s, [0, 1], [distance, 0]);
}

export function slideIn(frame: number, fps: number, startFrame: number, distance = 60): number {
  const s = spring({
    frame: frame - startFrame,
    fps,
    config: motion.spring,
  });
  return interpolate(s, [0, 1], [distance, 0]);
}

export function scaleIn(frame: number, fps: number, startFrame: number, from = 0.85): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: motion.spring,
    from,
    to: 1,
  });
}

export function popIn(frame: number, fps: number, startFrame: number): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: motion.springBouncy,
    from: 0,
    to: 1,
  });
}

export function staggeredFade(
  frame: number,
  index: number,
  startFrame: number,
  staggerFrames = 5,
  durationFrames = 20,
): number {
  const itemStart = startFrame + index * staggerFrames;
  return fadeIn(frame, itemStart, durationFrames);
}

export function staggeredSlide(
  frame: number,
  fps: number,
  index: number,
  startFrame: number,
  staggerFrames = 5,
): number {
  const itemStart = startFrame + index * staggerFrames;
  return slideUp(frame, fps, itemStart);
}

export function cursorInterp(
  frame: number,
  waypoints: Array<{ frame: number; x: number; y: number }>,
): { x: number; y: number } {
  if (waypoints.length === 0) return { x: 0, y: 0 };
  if (frame <= waypoints[0].frame) return { x: waypoints[0].x, y: waypoints[0].y };
  if (frame >= waypoints[waypoints.length - 1].frame) {
    const last = waypoints[waypoints.length - 1];
    return { x: last.x, y: last.y };
  }

  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const t = interpolate(frame, [a.frame, b.frame], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.cubic),
      });
      return {
        x: interpolate(t, [0, 1], [a.x, b.x]),
        y: interpolate(t, [0, 1], [a.y, b.y]),
      };
    }
  }

  return { x: waypoints[0].x, y: waypoints[0].y };
}

export function barFill(frame: number, startFrame: number, durationFrames = 45, targetPct = 1): number {
  return interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, targetPct],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    },
  );
}
