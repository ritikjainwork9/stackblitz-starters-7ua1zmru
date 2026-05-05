/** Scene 9: Cleanup & Insights — 3-tier Never Logged In urgency panels, bulk deactivate, reminder email, orphan queues */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Cursor from '../components/Cursor';
import Toast from '../components/Toast';
import OnScreenText from '../components/OnScreenText';
import SceneTransition from '../components/SceneTransition';
import UserAvatar from '../components/UserAvatar';
import { staggeredFade, popIn } from '../utils/animations';

// Frame boundaries (510 total)
// F27: 0–150   → Never Logged In tab, three urgency panels
// F28: 150–300 → Deactivate All, toast
// F29: 300–510 → Inactive Users + Orphan Queues

const NEVER_LOGGED_90 = [
  { name: 'David Kim', days: 94, profile: 'Standard User' },
  { name: 'Elena Voss', days: 102, profile: 'Sales User' },
  { name: 'Frank Osei', days: 87, profile: 'Standard User' },
];

const NEVER_LOGGED_30 = [
  { name: 'Grace Lin', days: 62, profile: 'Read Only' },
  { name: 'Hiro Tanaka', days: 55, profile: 'Standard User' },
];

const NEVER_LOGGED_NEW = [
  { name: 'Iris Patel', days: 12, profile: 'Partner User' },
];

const INACTIVE_USERS = [
  { name: 'James Bond', days: 72, profile: 'Sales User' },
  { name: 'Kim Nguyen', days: 65, profile: 'Standard User' },
  { name: 'Leo Santos', days: 80, profile: 'Sales User' },
];

const ORPHAN_QUEUES = [
  { name: 'Regional Sales Q1 2022', objects: ['Lead', 'Case'] },
  { name: 'Legacy Support Queue', objects: ['Case'] },
  { name: 'Old Marketing Leads', objects: ['Lead'] },
  { name: 'Inactive Team Queue', objects: ['Lead', 'Case', 'Opportunity'] },
];

const SUB_TABS = ['Inactive Users', 'Never Logged In', 'Unused Profiles', 'Unused Permission Sets', 'Orphan Groups', 'Orphan Queues'];

function UrgencyPanel({
  title,
  count,
  users,
  color,
  borderColor,
  frame,
  startFrame,
  showDeactivated,
}: {
  title: string;
  count: number;
  users: Array<{ name: string; days: number; profile: string }>;
  color: string;
  borderColor: string;
  frame: number;
  startFrame: number;
  showDeactivated?: boolean;
}) {
  const panelOpacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const panelY = interpolate(frame, [startFrame, startFrame + 18], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        opacity: panelOpacity,
        transform: `translateY(${panelY}px)`,
        border: `1px solid ${borderColor}`,
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: radius.sm,
        overflow: 'hidden',
        backgroundColor: colors.bgWhite,
      }}
    >
      <div
        style={{
          padding: `${spacing.md}px ${spacing.xl}px`,
          backgroundColor: `${borderColor}10`,
          borderBottom: `1px solid ${borderColor}30`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
          <span
            style={{
              fontSize: 13,
              fontFamily: font.family,
              fontWeight: font.weights.bold,
              color: borderColor,
            }}
          >
            {title} ({count} users)
          </span>
          {borderColor === colors.danger && (
            <span
              style={{
                fontSize: 11,
                backgroundColor: colors.dangerBg,
                color: colors.danger,
                padding: `1px ${spacing.sm}px`,
                borderRadius: radius.full,
                fontWeight: font.weights.semibold,
              }}
            >
              Most urgent
            </span>
          )}
        </div>
        <Button label="Deactivate Section" variant={borderColor === colors.danger ? 'destructive' : 'neutral'} size="sm" />
      </div>
      {users.map((user, i) => {
        const rowOpacity = showDeactivated
          ? interpolate(frame, [160, 185], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          : 1;
        return (
          <div
            key={user.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.lg,
              padding: `${spacing.md}px ${spacing.xl}px`,
              borderBottom: `1px solid ${colors.bgPage}`,
              opacity: rowOpacity,
            }}
          >
            <UserAvatar name={user.name} size={32} />
            <span style={{ flex: 1, fontSize: 13, fontFamily: font.family, fontWeight: font.weights.medium, color: colors.textPrimary }}>
              {user.name}
            </span>
            <Badge label={user.profile} variant="neutral" />
            <span
              style={{
                fontSize: 12,
                fontFamily: font.family,
                fontWeight: font.weights.bold,
                color: borderColor,
                backgroundColor: `${borderColor}18`,
                padding: `2px ${spacing.sm}px`,
                borderRadius: radius.full,
              }}
            >
              {user.days} days
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Scene09_CleanupInsights() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showInactive = frame >= 300 && frame < 420;
  const showOrphanQueues = frame >= 420;
  const activeSubTab = showOrphanQueues ? 'Orphan Queues' : showInactive ? 'Inactive Users' : 'Never Logged In';

  const cleanWaypoints = [
    { frame: 5, x: 960, y: 200 },
    { frame: 148, x: 960, y: 350 },
    { frame: 153, x: 960, y: 350 },
    { frame: 295, x: 240, y: 200 },
    { frame: 310, x: 960, y: 550 },
    { frame: 380, x: 960, y: 550 },
    { frame: 385, x: 960, y: 550 },
    { frame: 415, x: 240, y: 200 },
    { frame: 445, x: 1100, y: 400 },
    { frame: 450, x: 1100, y: 400 },
  ];

  const clicks = [{ frame: 150 }, { frame: 383 }, { frame: 448 }];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <AppShell activeTab="Cleanup & Insights">
          <div style={{ padding: `${spacing.xl}px ${spacing.xxl}px`, display: 'flex', flexDirection: 'column', gap: spacing.xl, height: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                Cleanup & Insights
              </h1>
              {activeSubTab === 'Never Logged In' && (
                <Button label="Deactivate All (23)" variant="destructive" />
              )}
              {activeSubTab === 'Inactive Users' && (
                <Button label="Send Reminder to All (7)" variant="brand" />
              )}
            </div>

            {/* Sub-tabs */}
            <div
              style={{
                display: 'flex',
                gap: 2,
                backgroundColor: colors.bgWhite,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                padding: spacing.xs,
                overflow: 'hidden',
              }}
            >
              {SUB_TABS.map((tab) => {
                const isActive = tab === activeSubTab;
                return (
                  <div
                    key={tab}
                    style={{
                      padding: `${spacing.sm}px ${spacing.lg}px`,
                      borderRadius: 4,
                      backgroundColor: isActive ? colors.sfBlue : 'transparent',
                      color: isActive ? '#fff' : colors.textSecondary,
                      fontSize: 13,
                      fontFamily: font.family,
                      fontWeight: isActive ? font.weights.semibold : font.weights.regular,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>

            {/* Content area */}
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              {activeSubTab === 'Never Logged In' && (
                <>
                  <UrgencyPanel
                    title="90+ days old"
                    count={23}
                    users={NEVER_LOGGED_90}
                    color="#BA0517"
                    borderColor={colors.danger}
                    frame={frame}
                    startFrame={10}
                    showDeactivated={frame >= 160}
                  />
                  <UrgencyPanel
                    title="30–89 days old"
                    count={11}
                    users={NEVER_LOGGED_30}
                    color={colors.warning}
                    borderColor={colors.warning}
                    frame={frame}
                    startFrame={25}
                  />
                  <UrgencyPanel
                    title="0–29 days old"
                    count={5}
                    users={NEVER_LOGGED_NEW}
                    color={colors.sfBlue}
                    borderColor={colors.sfBlue}
                    frame={frame}
                    startFrame={40}
                  />
                </>
              )}

              {showInactive && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
                  <div
                    style={{
                      padding: `${spacing.md}px ${spacing.xl}px`,
                      backgroundColor: colors.warningBg,
                      border: `1px solid ${colors.warning}`,
                      borderRadius: radius.sm,
                      fontSize: 13,
                      fontFamily: font.family,
                      color: colors.textPrimary,
                    }}
                  >
                    <strong>Threshold Zone: 60–89 days (7 users)</strong> — Users approaching inactivity limit.
                  </div>
                  {INACTIVE_USERS.map((user, i) => (
                    <div
                      key={user.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: spacing.lg,
                        padding: `${spacing.md}px ${spacing.xl}px`,
                        backgroundColor: colors.bgWhite,
                        border: `1px solid ${colors.border}`,
                        borderRadius: radius.sm,
                        opacity: staggeredFade(frame, i, 305, 8, 20),
                      }}
                    >
                      <UserAvatar name={user.name} size={32} />
                      <span style={{ flex: 1, fontSize: 13, fontFamily: font.family, fontWeight: font.weights.medium, color: colors.textPrimary }}>{user.name}</span>
                      <Badge label={user.profile} variant="neutral" />
                      <span style={{ fontSize: 12, color: colors.warning, fontWeight: font.weights.semibold }}>{user.days} days inactive</span>
                      <Button label="Remind" variant="outline" size="sm" />
                    </div>
                  ))}
                </div>
              )}

              {showOrphanQueues && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button label="Delete All (4)" variant="destructive" size="sm" pressed={frame >= 450} />
                  </div>
                  {ORPHAN_QUEUES.map((queue, i) => {
                    const rowOpacity = frame >= 450
                      ? interpolate(frame, [450, 475], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                      : 1;
                    return (
                      <div
                        key={queue.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.lg,
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          backgroundColor: colors.bgWhite,
                          border: `1px solid ${colors.border}`,
                          borderRadius: radius.sm,
                          opacity: rowOpacity * staggeredFade(frame, i, 425, 8, 20),
                        }}
                      >
                        <span style={{ fontSize: 16 }}>📋</span>
                        <span style={{ flex: 1, fontSize: 13, fontFamily: font.family, fontWeight: font.weights.medium, color: colors.textPrimary }}>{queue.name}</span>
                        <div style={{ display: 'flex', gap: spacing.xs }}>
                          {queue.objects.map((obj) => (
                            <Badge key={obj} label={obj} variant="neutral" />
                          ))}
                        </div>
                        <span style={{ fontSize: 12, color: colors.textMuted }}>No members</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </AppShell>

        <Toast
          message="Deactivated 23 users. 0 errors. 0 skipped."
          variant="success"
          startFrame={155}
          holdFrames={80}
        />
        <Toast
          message="Reminder email sent to 7 users."
          subtext='"Action Required: Your Salesforce account is at risk of deactivation."'
          variant="info"
          startFrame={385}
          holdFrames={60}
        />

        <OnScreenText
          lines={
            activeSubTab === 'Never Logged In'
              ? [
                  { text: '23 accounts. No login. 90+ days. Paid licenses.', startFrame: 5 },
                  { text: 'Bulk-deactivate 23 users. One click.', startFrame: 150 },
                ]
              : activeSubTab === 'Inactive Users'
              ? [{ text: 'Send a reminder email before you deactivate.', startFrame: 305 }]
              : [{ text: 'Orphan groups and queues — one-click deleted.', startFrame: 425 }]
          }
        />

        <Cursor waypoints={cleanWaypoints} clicks={clicks} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
