/** Scene 10: Activity Logs — stats count up, table rows, log detail modals with field-level diff */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import Cursor from '../components/Cursor';
import OnScreenText from '../components/OnScreenText';
import SceneTransition from '../components/SceneTransition';
import { countUp } from '../utils/countUp';
import { staggeredFade, popIn } from '../utils/animations';

// Frame boundaries (300 total)
// F30: 0–120  → stats bar, table rows fade in
// F31: 120–300 → modal for deactivation log, then field-change log

const TABLE_ROWS = [
  { status: 'success', category: 'User Deactivation', subject: 'Sarah Chen', admin: 'Ritik Jain', time: '2m ago' },
  { status: 'success', category: 'User Onboarding', subject: 'Marcus Johnson', admin: 'Ritik Jain', time: '1h ago' },
  { status: 'success', category: 'Access Management', subject: 'Jordan Lee', admin: 'Ritik Jain', time: '3h ago' },
  { status: 'success', category: 'Persona Mapping', subject: 'Sales Representative', admin: 'Ritik Jain', time: '5h ago' },
  { status: 'error', category: 'User Onboarding', subject: 'Failed Record', admin: 'System', time: '6h ago' },
  { status: 'success', category: 'Bulk Action', subject: '12 users frozen', admin: 'Ritik Jain', time: '8h ago' },
];

const categoryColors: Record<string, string> = {
  'User Deactivation': colors.chartTeal,
  'User Onboarding': colors.chartOrange,
  'Access Management': colors.sfBlue,
  'Persona Mapping': colors.chartPurple,
  'Bulk Action': colors.textSecondary,
};

export default function Scene10_ActivityLogs() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalVal = Math.round(countUp(frame, 847, 5, 50));
  const successVal = Math.round(countUp(frame, 831, 10, 50));
  const errorsVal = Math.round(countUp(frame, 16, 15, 50));

  const showModal1 = frame >= 125 && frame < 215;
  const showModal2 = frame >= 215 && frame < 295;

  const modal1Opacity = showModal1
    ? interpolate(frame, [125, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })
    : 0;
  const modal1Y = showModal1
    ? interpolate(frame, [125, 145], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })
    : 40;

  const modal2Opacity = showModal2
    ? interpolate(frame, [215, 235], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })
    : 0;

  const cursorWaypoints = [
    { frame: 5, x: 960, y: 300 },
    { frame: 120, x: 960, y: 480 },
    { frame: 125, x: 960, y: 480 },
    { frame: 210, x: 960, y: 530 },
    { frame: 215, x: 960, y: 530 },
    { frame: 290, x: 960, y: 600 },
  ];

  const clicks = [{ frame: 123 }, { frame: 213 }];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <AppShell activeTab="Activity Logs">
          <div style={{ padding: `${spacing.xl}px ${spacing.xxl}px`, display: 'flex', flexDirection: 'column', gap: spacing.xl, height: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                Activity Logs
              </h1>
              <div style={{ display: 'flex', gap: spacing.md }}>
                <div style={{ height: 32, padding: `0 ${spacing.lg}px`, border: `1px solid ${colors.border}`, borderRadius: radius.sm, backgroundColor: colors.bgWhite, display: 'flex', alignItems: 'center', fontSize: 13, fontFamily: font.family, color: colors.textSecondary, cursor: 'pointer' }}>
                  Filter by Category ▾
                </div>
                <div style={{ height: 32, padding: `0 ${spacing.lg}px`, border: `1px solid ${colors.border}`, borderRadius: radius.sm, backgroundColor: colors.bgWhite, display: 'flex', alignItems: 'center', fontSize: 13, fontFamily: font.family, color: colors.textSecondary, cursor: 'pointer' }}>
                  ⚙ Retention Settings
                </div>
              </div>
            </div>

            {/* Stats bar */}
            <div style={{ display: 'flex', gap: spacing.xl }}>
              {[
                { label: 'Total Records', value: totalVal, color: colors.sfBlue },
                { label: 'Success', value: successVal, color: colors.success },
                { label: 'Errors', value: errorsVal, color: colors.danger },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    backgroundColor: colors.bgWhite,
                    border: `1px solid ${colors.border}`,
                    borderTop: `4px solid ${color}`,
                    borderRadius: radius.sm,
                    padding: `${spacing.md}px ${spacing.xl}px`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing.xs,
                  }}
                >
                  <div style={{ fontSize: 12, fontFamily: font.family, fontWeight: font.weights.semibold, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 36, fontFamily: font.family, fontWeight: font.weights.extrabold, color, fontVariantNumeric: 'tabular-nums' }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Data table */}
            <div style={{ flex: 1, backgroundColor: colors.bgWhite, border: `1px solid ${colors.border}`, borderRadius: radius.sm, overflow: 'hidden' }}>
              <div style={{ display: 'flex', backgroundColor: colors.bgPage, borderBottom: `2px solid ${colors.border}`, padding: `${spacing.sm}px ${spacing.xl}px` }}>
                {['Status', 'Category', 'Subject', 'Admin', 'Time'].map((h) => (
                  <div key={h} style={{ flex: 1, fontSize: 11, fontFamily: font.family, fontWeight: font.weights.semibold, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
                ))}
              </div>
              {TABLE_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: `${spacing.md}px ${spacing.xl}px`,
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: i % 2 === 1 ? '#FAFAFA' : colors.bgWhite,
                    cursor: 'pointer',
                    opacity: staggeredFade(frame, i, 20, 8, 20),
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Badge label={row.status} variant={row.status === 'success' ? 'success' : 'danger'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: font.family,
                        fontWeight: font.weights.semibold,
                        color: categoryColors[row.category] || colors.textSecondary,
                        backgroundColor: `${categoryColors[row.category] || colors.textSecondary}18`,
                        padding: `2px ${spacing.sm}px`,
                        borderRadius: radius.full,
                      }}
                    >
                      {row.category}
                    </span>
                  </div>
                  <div style={{ flex: 1, fontSize: 13, fontFamily: font.family, color: colors.sfBlue, textDecoration: 'underline', cursor: 'pointer' }}>
                    {row.subject}
                  </div>
                  <div style={{ flex: 1, fontSize: 13, fontFamily: font.family, color: colors.textSecondary }}>
                    {row.admin}
                  </div>
                  <div style={{ flex: 1, fontSize: 12, fontFamily: font.family, color: colors.textMuted }}>
                    {row.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppShell>

        {/* Modal 1: Deactivation log */}
        {showModal1 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 500,
              opacity: modal1Opacity,
            }}
          >
            <div
              style={{
                backgroundColor: colors.bgWhite,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                width: 600,
                boxShadow: shadow.modal,
                transform: `translateY(${modal1Y}px)`,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: `${spacing.lg}px ${spacing.xxl}px`, borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.bgPage, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                  Log Details — LOG-00000847
                </div>
                <Badge label="User Deactivation" variant="teal" />
              </div>
              <div style={{ padding: spacing.xxl, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: spacing.sm }}>Status</div>
                  <Badge label="Success" variant="success" size="md" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: spacing.sm }}>Admin</div>
                  <div style={{ fontSize: 14, fontFamily: font.family, color: colors.textPrimary }}>Ritik Jain</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: spacing.sm }}>Description</div>
                  <div
                    style={{
                      fontSize: 13,
                      fontFamily: font.family,
                      color: colors.textPrimary,
                      lineHeight: 1.7,
                      backgroundColor: colors.bgPage,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.lg,
                    }}
                  >
                    Deactivated user: <strong>Sarah Chen</strong>. Transferred 14 Opportunities to Marcus Johnson. Removed 8 Permission Sets, 3 Public Groups. Role cleared.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: Field change log */}
        {showModal2 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 500,
              opacity: modal2Opacity,
            }}
          >
            <div
              style={{
                backgroundColor: colors.bgWhite,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                width: 600,
                boxShadow: shadow.modal,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: `${spacing.lg}px ${spacing.xxl}px`, borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.bgPage, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                  Log Details — LOG-00000831
                </div>
                <Badge label="Access Management" variant="info" />
              </div>
              <div style={{ padding: spacing.xxl, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: spacing.sm }}>
                    Field-Level Changes
                  </div>
                  <div
                    style={{
                      backgroundColor: colors.bgPage,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.lg,
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.lg,
                      fontSize: 14,
                      fontFamily: font.family,
                    }}
                  >
                    <span style={{ fontWeight: font.weights.semibold, color: colors.textSecondary, flexShrink: 0 }}>Title:</span>
                    <span
                      style={{
                        padding: `${spacing.xs}px ${spacing.md}px`,
                        backgroundColor: colors.dangerBg,
                        color: colors.danger,
                        borderRadius: radius.sm,
                        fontWeight: font.weights.semibold,
                        textDecoration: 'line-through',
                      }}
                    >
                      "Account Executive"
                    </span>
                    <span style={{ color: colors.textMuted, fontWeight: font.weights.bold, fontSize: 20 }}>→</span>
                    <span
                      style={{
                        padding: `${spacing.xs}px ${spacing.md}px`,
                        backgroundColor: colors.successBg,
                        color: colors.success,
                        borderRadius: radius.sm,
                        fontWeight: font.weights.semibold,
                      }}
                    >
                      "Senior Account Executive"
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: spacing.sm }}>Retention</div>
                  <div style={{ fontSize: 13, fontFamily: font.family, color: colors.textSecondary }}>
                    Retain logs for: <strong>30 days</strong> · Configurable 1–3,650 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <OnScreenText
          lines={[
            { text: '847 actions logged. 97% success rate.', startFrame: 5 },
            { text: 'Every action. Every field changed. Every admin who did it.', startFrame: 125 },
            { text: 'Field-level diff: "Account Executive" → "Senior Account Executive."', startFrame: 215 },
          ]}
        />

        <Cursor waypoints={cursorWaypoints} clicks={clicks} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
