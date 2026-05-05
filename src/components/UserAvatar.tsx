import React from 'react';
import { font, radius } from '../theme/tokens';

interface UserAvatarProps {
  name: string;
  size?: number;
  fontSize?: number;
}

const palette = [
  '#0176D3', '#2E844A', '#9050E9', '#04AAA1',
  '#FE9339', '#BA0517', '#032D60', '#1AB9FF',
];

function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

function initials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function UserAvatar({ name, size = 36, fontSize = 13 }: UserAvatarProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius.full,
        backgroundColor: nameToColor(name),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize,
        fontFamily: font.family,
        fontWeight: font.weights.bold,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}
