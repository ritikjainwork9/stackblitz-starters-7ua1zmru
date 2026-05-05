import React from 'react';
import { colors, font, spacing } from '../theme/tokens';
import Badge, { BadgeVariant } from './Badge';

interface Column {
  key: string;
  label: string;
  width?: number | string;
}

interface CellValue {
  text?: string;
  badge?: { label: string; variant: BadgeVariant };
  link?: string;
}

type RowData = Record<string, CellValue | string>;

interface DataTableProps {
  columns: Column[];
  rows: RowData[];
  selectedRow?: number;
  rowOpacity?: (i: number) => number;
}

export default function DataTable({ columns, rows, selectedRow, rowOpacity }: DataTableProps) {
  return (
    <div style={{ width: '100%', borderCollapse: 'collapse' as const }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.bgPage,
          borderBottom: `2px solid ${colors.border}`,
          padding: `${spacing.sm}px ${spacing.md}px`,
        }}
      >
        {columns.map((col) => (
          <div
            key={col.key}
            style={{
              flex: col.width ? undefined : 1,
              width: col.width,
              fontSize: 12,
              fontFamily: font.family,
              fontWeight: font.weights.semibold,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: `0 ${spacing.sm}px`,
            }}
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, ri) => {
        const isSelected = ri === selectedRow;
        const rowOp = rowOpacity ? rowOpacity(ri) : 1;
        return (
          <div
            key={ri}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: `${spacing.md}px ${spacing.md}px`,
              backgroundColor: isSelected
                ? colors.sfBlueLight
                : ri % 2 === 1
                ? '#FAFAFA'
                : colors.bgWhite,
              borderBottom: `1px solid ${colors.border}`,
              cursor: 'pointer',
              opacity: rowOp,
            }}
          >
            {columns.map((col) => {
              const cell = row[col.key];
              const val: CellValue = typeof cell === 'string' ? { text: cell } : (cell as CellValue);
              return (
                <div
                  key={col.key}
                  style={{
                    flex: col.width ? undefined : 1,
                    width: col.width,
                    fontSize: 13,
                    fontFamily: font.family,
                    color: val.link ? colors.sfBlue : colors.textPrimary,
                    padding: `0 ${spacing.sm}px`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                  }}
                >
                  {val.badge && <Badge label={val.badge.label} variant={val.badge.variant} />}
                  {val.text && (
                    <span style={{ textDecoration: val.link ? 'underline' : 'none' }}>
                      {val.text}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
