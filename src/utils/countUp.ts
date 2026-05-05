import { interpolate, Easing } from 'remotion';

export function countUp(
  frame: number,
  target: number,
  startFrame: number,
  durationFrames = 60,
  decimals = 0,
): number {
  const value = interpolate(frame, [startFrame, startFrame + durationFrames], [0, target], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return parseFloat(value.toFixed(decimals));
}

export function formatStat(value: number, decimals = 0): string {
  return value.toFixed(decimals);
}
