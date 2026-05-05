import React from 'react';
import { colors, radius, shadow, spacing } from '../theme/tokens';

interface CardProps {
  children: React.ReactNode;
  padding?: number;
  style?: React.CSSProperties;
  noBorder?: boolean;
}

export default function Card({ children, padding = spacing.xl, style, noBorder = false }: CardProps) {
  return (
    <div
      style={{
        backgroundColor: colors.bgWhite,
        border: noBorder ? 'none' : `1px solid ${colors.border}`,
        borderRadius: radius.sm,
        boxShadow: shadow.card,
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
