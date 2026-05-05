/** Scene 1: Opening Hook — access management screen with stale contractor access, no expiry dates visible */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import UserAvatar from '../components/UserAvatar';
import Cursor from '../components/Cursor';
import OnScreenText from '../components/OnScreenText';
import SceneTransition from '../components/SceneTransition';

const PERM_SETS = [
  'Cases - Read Write',
  'Accounts - Full Access',
  'Opportunities - Edit',
  'Leads - Read Only',
  'Reports - Run',
  'Sales Cloud - Standard',
  'Knowledge Base - View',
  'Analytics - Basic',
  'Service Console - Access',
  'Territory Management',
  'Forecasting - Edit',
];

const PUBLIC_GROUPS = ['West Coast Sales', 'All Partners', 'Contractor Network'];

export default function Scene01_Hook() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow scroll: moves 140px over the full 300 frames
  const scrollY = interpolate(frame, [0, 300], [0, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cursor appears at frame 60, hovers over the list
  const cursorWaypoints = [
    { frame: 60, x: 620, y: 420 },
    { frame: 120, x: 620, y: 480 },
    { frame: 180, x: 620, y: 540 },
    { frame: 240, x: 620, y: 540 },
    { frame: 300, x: 620, y: 600 },
  ];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage, fontFamily: font.family }}>
        <AppShell activeTab="Access Management">
          <div style={{ padding: spacing.xxl, display: 'flex', flexDirection: 'column', gap: spacing.xl, height: '100%', overflow: 'hidden' }}>
            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                  Access Management
                </h1>
                <p style={{ margin: `${spacing.xs}px 0 0`, fontSize: 14, color: colors.textSecondary }}>
                  Grant, revoke, and manage user permission sets, groups, and queues.
                </p>
              </div>
            </div>

            {/* User card */}
            <div
              style={{
                backgroundColor: colors.bgWhite,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                padding: spacing.xl,
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xl,
                boxShadow: shadow.card,
              }}
            >
              <UserAvatar name="Alex Rivera" size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: font.weights.bold, color: colors.textPrimary }}>Alex Rivera</div>
                <div style={{ fontSize: 14, color: colors.textSecondary }}>alex.rivera@contractor.co · Contractor Profile</div>
              </div>
              <div style={{ display: 'flex', gap: spacing.sm, alignItems: 'center' }}>
                <Badge label="Active" variant="success" />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.xs,
                    backgroundColor: colors.dangerBg,
                    color: colors.danger,
                    padding: `${spacing.xs}px ${spacing.md}px`,
                    borderRadius: radius.full,
                    fontSize: 12,
                    fontWeight: font.weights.semibold,
                  }}
                >
                  ⏱ Last Login: 30 days ago
                </div>
              </div>
            </div>

            {/* Two-column access layout */}
            <div style={{ display: 'flex', gap: spacing.xl, flex: 1, overflow: 'hidden' }}>
              {/* Current Access column */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: colors.bgWhite,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.sm,
                  overflow: 'hidden',
                  boxShadow: shadow.card,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    padding: `${spacing.md}px ${spacing.xl}px`,
                    borderBottom: `1px solid ${colors.border}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.bgPage,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                      Current Access
                    </div>
                    <div style={{ fontSize: 12, color: colors.textSecondary }}>
                      {PERM_SETS.length} permission sets · {PUBLIC_GROUPS.length} groups
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: colors.textMuted, fontStyle: 'italic' }}>
                    No expiry dates
                  </div>
                </div>

                <div style={{ overflow: 'hidden', flex: 1 }}>
                  {/* Scrolling permission sets */}
                  <div style={{ transform: `translateY(-${scrollY}px)`, transition: 'none' }}>
                    {/* Permission Sets section */}
                    <div
                      style={{
                        padding: `${spacing.sm}px ${spacing.xl}px`,
                        backgroundColor: colors.sfBlueLight,
                        borderBottom: `1px solid ${colors.border}`,
                        fontSize: 12,
                        fontWeight: font.weights.semibold,
                        color: colors.sfBlueDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Permission Sets ({PERM_SETS.length})
                    </div>
                    {PERM_SETS.map((ps) => (
                      <div
                        key={ps}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          borderBottom: `1px solid ${colors.bgPage}`,
                          gap: spacing.md,
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            border: `2px solid ${colors.border}`,
                            borderRadius: 3,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1, fontSize: 13, color: colors.textPrimary }}>{ps}</span>
                        <span
                          style={{
                            fontSize: 11,
                            color: colors.textMuted,
                            fontStyle: 'italic',
                          }}
                        >
                          — no expiry
                        </span>
                      </div>
                    ))}

                    {/* Public Groups section */}
                    <div
                      style={{
                        padding: `${spacing.sm}px ${spacing.xl}px`,
                        backgroundColor: '#F0F4FF',
                        borderBottom: `1px solid ${colors.border}`,
                        borderTop: `1px solid ${colors.border}`,
                        fontSize: 12,
                        fontWeight: font.weights.semibold,
                        color: colors.sfBlueDark,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Public Groups ({PUBLIC_GROUPS.length})
                    </div>
                    {PUBLIC_GROUPS.map((pg) => (
                      <div
                        key={pg}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          borderBottom: `1px solid ${colors.bgPage}`,
                          gap: spacing.md,
                        }}
                      >
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            border: `2px solid ${colors.border}`,
                            borderRadius: 3,
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ flex: 1, fontSize: 13, color: colors.textPrimary }}>{pg}</span>
                        <span style={{ fontSize: 11, color: colors.textMuted, fontStyle: 'italic' }}>
                          — no expiry
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: empty / available access placeholder */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: colors.bgWhite,
                  border: `1px dashed ${colors.borderHover}`,
                  borderRadius: radius.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.textMuted,
                  fontSize: 14,
                  flexDirection: 'column',
                  gap: spacing.sm,
                }}
              >
                <span style={{ fontSize: 32 }}>🔐</span>
                <span>Available Access</span>
                <span style={{ fontSize: 12 }}>Select a user to see available grants</span>
              </div>
            </div>
          </div>
        </AppShell>

        {/* On-screen text overlay */}
        <OnScreenText
          lines={[
            { text: 'A contractor left your org 30 days ago.', startFrame: 10 },
            { text: 'They still have Salesforce access.', startFrame: 90 },
          ]}
        />

        <Cursor waypoints={cursorWaypoints} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
