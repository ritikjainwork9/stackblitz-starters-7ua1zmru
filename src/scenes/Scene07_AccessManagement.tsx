/** Scene 7: Access Management — search Jordan, revoke permissions, set expiry date, grant time-limited access */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Cursor from '../components/Cursor';
import Toast from '../components/Toast';
import OnScreenText from '../components/OnScreenText';
import PermissionChip from '../components/PermissionChip';
import SceneTransition from '../components/SceneTransition';
import UserAvatar from '../components/UserAvatar';
import { fadeIn, popIn } from '../utils/animations';

// Frame boundaries (690 total)
// F19: 0–180   → search Jordan, user card slides in, current access
// F20: 180–360 → check 2 perm sets, click Revoke Selected, they fade out
// F21: 360–540 → toggle Set Expiry, date picker, check items, Grant Selected
// F22: 540–690 → Time-Limited Grants section appears with tooltip

const PERM_SETS_INITIAL = [
  'Cases - Read Write',
  'Accounts - Full Access',
  'Opportunities - Edit',
  'Leads - Read Only',
  'Reports - Run',
  'Sales Cloud - Standard',
];

const PUBLIC_GROUPS_INITIAL = ['West Coast Sales', 'Partner Network'];

const AVAILABLE_PERM_SETS = [
  'Project Alpha Access',
  'Advanced Analytics',
  'Knowledge Base - Edit',
  'Territory - Assign',
];

export default function Scene07_AccessManagement() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // User card slide-in
  const userCardOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const userCardX = interpolate(frame, [20, 40], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Revoke state
  const revokeHappened = frame >= 270;
  const revokedItems = revokeHappened ? ['Cases - Read Write', 'Accounts - Full Access'] : [];
  const currentPermSets = PERM_SETS_INITIAL.filter((ps) => !revokedItems.includes(ps));
  const checked1 = frame >= 195 && frame < 270;
  const checked2 = frame >= 215 && frame < 270;

  // Expiry toggle
  const expiryToggled = frame >= 375;
  const datePickerVisible = expiryToggled;
  const dateSelected = frame >= 430 ? 'October 31, 2024' : '';

  // Items to grant
  const grantChecked1 = frame >= 450;
  const grantChecked2 = frame >= 465;
  const grantHappened = frame >= 510;

  // Time-limited grants section
  const timeLimitedVisible = frame >= 545;
  const timeLimitedOpacity = timeLimitedVisible
    ? interpolate(frame, [545, 565], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;
  const timeLimitedBadgeScale = timeLimitedVisible ? popIn(frame, fps, 550) : 0;

  const tooltipOpacity = frame >= 600
    ? interpolate(frame, [600, 618], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  const cursorWaypoints = [
    { frame: 5, x: 640, y: 200 },
    { frame: 25, x: 640, y: 260 },
    { frame: 195, x: 460, y: 460 },
    { frame: 215, x: 460, y: 500 },
    { frame: 255, x: 460, y: 620 },
    { frame: 260, x: 460, y: 620 },
    { frame: 370, x: 1120, y: 380 },
    { frame: 390, x: 1120, y: 380 },
    { frame: 430, x: 1150, y: 440 },
    { frame: 450, x: 1050, y: 480 },
    { frame: 465, x: 1050, y: 520 },
    { frame: 505, x: 1100, y: 640 },
    { frame: 510, x: 1100, y: 640 },
    { frame: 600, x: 960, y: 750 },
  ];

  const clicks = [
    { frame: 195 },
    { frame: 215 },
    { frame: 258 },
    { frame: 375 },
    { frame: 450 },
    { frame: 465 },
    { frame: 508 },
  ];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <AppShell activeTab="Access Management">
          <div
            style={{
              padding: `${spacing.xl}px ${spacing.xxl}px`,
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.xl,
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                Access Management
              </h1>
            </div>

            {/* Search step */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xl,
                backgroundColor: colors.bgWhite,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                padding: spacing.lg,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 36,
                  border: `1px solid ${colors.sfBlue}`,
                  borderRadius: radius.sm,
                  backgroundColor: colors.bgWhite,
                  display: 'flex',
                  alignItems: 'center',
                  padding: `0 ${spacing.md}px`,
                  fontSize: 14,
                  fontFamily: font.family,
                  color: colors.textPrimary,
                  boxShadow: `0 0 0 3px ${colors.sfBlue}20`,
                }}
              >
                🔍 Jordan
              </div>

              {/* User card */}
              {frame >= 20 && (
                <div
                  style={{
                    opacity: userCardOpacity,
                    transform: `translateX(${userCardX}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.lg,
                    backgroundColor: colors.sfBlueLight,
                    border: `1px solid ${colors.sfBlue}`,
                    borderRadius: radius.sm,
                    padding: `${spacing.sm}px ${spacing.xl}px`,
                  }}
                >
                  <UserAvatar name="Jordan Lee" size={36} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                      Jordan Lee
                    </div>
                    <div style={{ fontSize: 12, color: colors.textSecondary }}>Sales Associate</div>
                  </div>
                  <Badge label="Active" variant="success" />
                </div>
              )}
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'flex', gap: spacing.xl, flex: 1, overflow: 'hidden' }}>
              {/* Left: Current Access (revoke) */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: colors.bgWhite,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.sm,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    padding: `${spacing.md}px ${spacing.xl}px`,
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgPage,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                    Current Access — Select to Revoke
                  </div>
                  <Button label="Revoke Selected" variant="destructive" size="sm" />
                </div>

                <div style={{ overflow: 'auto', flex: 1 }}>
                  <div style={{ padding: `${spacing.sm}px ${spacing.xl}px`, fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: spacing.md }}>
                    Permission Sets
                  </div>
                  {PERM_SETS_INITIAL.map((ps) => {
                    const isRevoked = revokedItems.includes(ps);
                    const isChecked = ps === 'Cases - Read Write' ? checked1 : ps === 'Accounts - Full Access' ? checked2 : false;
                    const rowOpacity = isRevoked
                      ? interpolate(frame, [260, 280], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                      : 1;
                    return (
                      <div
                        key={ps}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.md,
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          borderBottom: `1px solid ${colors.bgPage}`,
                          opacity: rowOpacity,
                          backgroundColor: isChecked ? '#FFF5F5' : 'transparent',
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            border: `2px solid ${isChecked ? colors.danger : colors.border}`,
                            borderRadius: 3,
                            backgroundColor: isChecked ? colors.danger : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isChecked && <svg width="8" height="6" viewBox="0 0 8 6"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                        </div>
                        <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{ps}</span>
                      </div>
                    );
                  })}
                  <div style={{ padding: `${spacing.sm}px ${spacing.xl}px`, fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', paddingTop: spacing.md }}>
                    Public Groups
                  </div>
                  {PUBLIC_GROUPS_INITIAL.map((pg) => (
                    <div
                      key={pg}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.md,
                        padding: `${spacing.md}px ${spacing.xl}px`,
                        borderBottom: `1px solid ${colors.bgPage}`,
                      }}
                    >
                      <div style={{ width: 14, height: 14, border: `2px solid ${colors.border}`, borderRadius: 3 }} />
                      <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{pg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Available Access (grant) */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: colors.bgWhite,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.sm,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  style={{
                    padding: `${spacing.md}px ${spacing.xl}px`,
                    borderBottom: `1px solid ${colors.border}`,
                    backgroundColor: colors.bgPage,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: spacing.sm,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                    Available Access — Select to Grant
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                    {/* Toggle */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                      <div
                        style={{
                          width: 36,
                          height: 20,
                          borderRadius: radius.full,
                          backgroundColor: expiryToggled ? colors.sfBlue : colors.border,
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s',
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            position: 'absolute',
                            top: 2,
                            left: expiryToggled ? 18 : 2,
                            transition: 'left 0.2s',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, fontFamily: font.family, color: expiryToggled ? colors.sfBlue : colors.textSecondary, fontWeight: font.weights.semibold }}>
                        Set Expiry Date
                      </span>
                    </div>

                    {/* Date picker */}
                    {datePickerVisible && (
                      <div
                        style={{
                          height: 28,
                          border: `1px solid ${colors.sfBlue}`,
                          borderRadius: radius.sm,
                          backgroundColor: colors.sfBlueLight,
                          display: 'flex',
                          alignItems: 'center',
                          padding: `0 ${spacing.md}px`,
                          fontSize: 12,
                          fontFamily: font.family,
                          color: colors.sfBlueDark,
                          fontWeight: font.weights.semibold,
                          gap: spacing.xs,
                        }}
                      >
                        📅 {dateSelected || 'Pick date...'}
                      </div>
                    )}

                    <Button
                      label="Grant Selected"
                      variant={expiryToggled ? 'success' : 'brand'}
                      size="sm"
                      pressed={grantHappened}
                    />
                  </div>
                </div>

                <div style={{ overflow: 'auto', flex: 1 }}>
                  {AVAILABLE_PERM_SETS.map((ps, i) => {
                    const isChecked = (i === 0 && grantChecked1) || (i === 1 && grantChecked2);
                    const isGranted = grantHappened && isChecked;
                    return (
                      <div
                        key={ps}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.md,
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          borderBottom: `1px solid ${colors.bgPage}`,
                          backgroundColor: isChecked ? '#F0FFF4' : 'transparent',
                          opacity: isGranted ? interpolate(frame, [510, 530], [1, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 1,
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            border: `2px solid ${isChecked ? colors.success : colors.border}`,
                            borderRadius: 3,
                            backgroundColor: isChecked ? colors.success : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isChecked && <svg width="8" height="6" viewBox="0 0 8 6"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                        </div>
                        <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{ps}</span>
                        {i === 0 && <Badge label="Perm Set" variant="info" />}
                        {i === 1 && <Badge label="Queue" variant="neutral" />}
                      </div>
                    );
                  })}
                </div>

                {/* Time-Limited Grants section */}
                {timeLimitedVisible && (
                  <div
                    style={{
                      borderTop: `2px solid ${colors.cyan}`,
                      padding: spacing.xl,
                      backgroundColor: '#EAF9FE',
                      opacity: timeLimitedOpacity,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: font.weights.semibold,
                        color: colors.sfBlueDark,
                        marginBottom: spacing.md,
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.sm,
                      }}
                    >
                      ⏱ Time-Limited Grants (auto-expire)
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.md,
                        transform: `scale(${timeLimitedBadgeScale})`,
                        transformOrigin: 'left center',
                      }}
                    >
                      <span style={{ fontSize: 16 }}>🔑</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontFamily: font.family,
                          fontWeight: font.weights.semibold,
                          color: colors.textPrimary,
                        }}
                      >
                        Project Alpha Access
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          backgroundColor: colors.warningBg,
                          color: colors.warning,
                          padding: `1px ${spacing.sm}px`,
                          borderRadius: radius.full,
                          fontWeight: font.weights.semibold,
                        }}
                      >
                        Expires Oct 31
                      </span>
                    </div>

                    {/* Tooltip */}
                    {frame >= 600 && (
                      <div
                        style={{
                          marginTop: spacing.md,
                          padding: spacing.md,
                          backgroundColor: '#032D60',
                          color: '#fff',
                          borderRadius: radius.sm,
                          fontSize: 12,
                          fontFamily: font.family,
                          opacity: tooltipOpacity,
                          lineHeight: 1.5,
                        }}
                      >
                        ℹ Permission sets, public groups, and queues will be automatically removed on this date by the daily cleanup batch.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </AppShell>

        <OnScreenText
          lines={[
            { text: 'Grant. Revoke. From one screen.', startFrame: 5 },
            { text: 'Set an expiry date — a nightly batch at 1 AM handles the rest.', startFrame: 370 },
            { text: 'No calendar reminder. No manual follow-up.', startFrame: 545 },
          ]}
        />

        <Cursor waypoints={cursorWaypoints} clicks={clicks} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
