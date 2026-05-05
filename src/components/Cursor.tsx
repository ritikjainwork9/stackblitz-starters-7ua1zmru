import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { cursorInterp } from '../utils/animations';

interface Waypoint {
  frame: number;
  x: number;
  y: number;
}

interface ClickEvent {
  frame: number;
}

interface CursorProps {
  waypoints: Waypoint[];
  clicks?: ClickEvent[];
  color?: string;
}

export default function Cursor({ waypoints, clicks = [], color = '#0070d2' }: CursorProps) {
  const frame = useCurrentFrame();
  const { x, y } = cursorInterp(frame, waypoints);

  const isVisible = waypoints.length > 0 && frame >= waypoints[0].frame;
  if (!isVisible) return null;

  const activeClick = clicks.find((c) => frame >= c.frame && frame < c.frame + 20);

  const cursorScale = activeClick
    ? interpolate(frame, [activeClick.frame, activeClick.frame + 8, activeClick.frame + 16], [1, 0.8, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.cubic),
      })
    : 1;

  const rippleProgress = activeClick
    ? interpolate(frame, [activeClick.frame, activeClick.frame + 20], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  const rippleScale = interpolate(rippleProgress, [0, 1], [0, 2.5]);
  const rippleOpacity = interpolate(rippleProgress, [0, 0.3, 1], [0.5, 0.4, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 10000,
        transform: 'translate(-4px, -4px)',
      }}
    >
      {activeClick && (
        <div
          style={{
            position: 'absolute',
            left: 8,
            top: 8,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: rippleOpacity,
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
          }}
        />
      )}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style={{ transform: `scale(${cursorScale})`, transformOrigin: '4px 4px' }}
      >
        <path
          d="M4 2L4 18L8 14L11 20L13 19L10 13L16 13Z"
          fill="white"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
