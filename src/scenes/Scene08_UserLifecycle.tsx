/** Scene 8: User Lifecycle — guided 4-step deactivation wizard for Sarah Chen, then Bulk Login Control */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Cursor from '../components/Cursor';
import SidebarNav from '../components/SidebarNav';
import StepIndicator from '../components/StepIndicator';
import Toast from '../components/Toast';
import OnScreenText from '../components/OnScreenText';
import UserAvatar from '../components/UserAvatar';
import SceneTransition from '../components/SceneTransition';
import { staggeredFade, popIn, fadeIn } from '../utils/animations';

// Frame boundaries (660 total)
// F23: 0–150   → sidebar visible, search Sarah Chen
// F24: 150–330 → Step 2: opportunities panel, transfer to Marcus
// F25: 330–510 → Step 3 cleanup + Step 4 deactivate button, confirm, toast
// F26: 510–660 → Bulk Login Control

const OPPORTUNITY_NAMES = [
  'Q4 Enterprise Deal — Acme Corp',
  'Platform Renewal — Globex',
  'New Business — Initech',
  'Expansion — Umbrella Ltd',
  'Upgrade — Initech Q1',
  'Cloud Migration — Stark Industries',
  'SaaS Bundle — Wayne Enterprises',
  'Renewal — Cyberdyne',
  'New Prospect — Soylent Corp',
  'Pipeline — Aperture Science',
  'Strategic Deal — Weyland',
  'Q1 Renewal — Massive Dynamic',
  'Enterprise Pilot — Virtus',
  'Platform Expansion — Acme West',
];

const CONTRACTOR_NAMES = [
  'Alex Rivera', 'Sam Torres', 'Jordan Lee', 'Morgan Davis',
  'Casey Brown', 'Riley Quinn', 'Drew Mason', 'Blake Kim',
  'Jamie Chen', 'Skyler Park', 'Reese Liu', 'Avery Chen',
];

export default function Scene08_UserLifecycle() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showBulk = frame >= 510;
  const activeNav = showBulk ? 'Bulk Login Control' : 'Deactivate User';

  const sidebarItemOpacities = [0, 1, 2, 3, 4].map((i) =>
    staggeredFade(frame, i, 5, 6, 18),
  );

  // Step 2: transfer
  const transferHappened = frame >= 280;
  const step2Collapsed = frame >= 295;
  const transferGreen = step2Collapsed
    ? interpolate(frame, [295, 315], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  // Step 4: deactivate
  const deactivateClicked = frame >= 430;
  const confirmShown = frame >= 440 && frame < 470;
  const deactivateDone = frame >= 470;

  // Bulk freeze list build-up
  const bulkCount = showBulk
    ? Math.min(12, Math.floor((frame - 515) / 8) + 1)
    : 0;

  const freezeClicked = frame >= 600;

  const cursorWaypoints = showBulk
    ? [
        { frame: 510, x: 120, y: 380 },
        { frame: 530, x: 960, y: 500 },
        { frame: 595, x: 960, y: 700 },
        { frame: 600, x: 960, y: 700 },
      ]
    : [
        { frame: 5, x: 540, y: 240 },
        { frame: 30, x: 540, y: 280 },
        { frame: 150, x: 640, y: 390 },
        { frame: 200, x: 1120, y: 390 },
        { frame: 260, x: 800, y: 700 },
        { frame: 280, x: 800, y: 700 },
        { frame: 400, x: 800, y: 750 },
        { frame: 425, x: 900, y: 820 },
        { frame: 430, x: 900, y: 820 },
        { frame: 460, x: 900, y: 500 },
        { frame: 465, x: 900, y: 500 },
      ];

  const clicks = showBulk ? [{ frame: 600 }] : [{ frame: 280 }, { frame: 430 }, { frame: 463 }];

  const steps = [
    { number: 1, label: 'Find User', status: (frame >= 60 ? 'complete' : 'active') as 'complete' | 'active' | 'pending' },
    { number: 2, label: 'Transfer Records', status: (step2Collapsed ? 'complete' : frame >= 150 ? 'active' : 'pending') as 'complete' | 'active' | 'pending' },
    { number: 3, label: 'Cleanup Access', status: (deactivateClicked ? 'complete' : frame >= 330 ? 'active' : 'pending') as 'complete' | 'active' | 'pending' },
    { number: 4, label: 'Deactivate', status: (deactivateDone ? 'complete' : frame >= 400 ? 'active' : 'pending') as 'complete' | 'active' | 'pending' },
  ];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <AppShell activeTab="User Lifecycle">
          <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            <SidebarNav activeItem={activeNav} itemOpacities={sidebarItemOpacities} />

            {/* Main content */}
            <div style={{ flex: 1, overflow: 'auto', padding: spacing.xxl, display: 'flex', flexDirection: 'column', gap: spacing.xl }}>
              {!showBulk ? (
                <>
                  {/* Step indicator */}
                  <div style={{ backgroundColor: colors.bgWhite, border: `1px solid ${colors.border}`, borderRadius: radius.sm, padding: spacing.xl }}>
                    <StepIndicator steps={steps} />
                  </div>

                  {/* Step 1: Find User */}
                  <div
                    style={{
                      backgroundColor: colors.bgWhite,
                      border: `1px solid ${frame >= 60 ? colors.success : colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.xl,
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.xl,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 36,
                        border: `1px solid ${colors.border}`,
                        borderRadius: radius.sm,
                        backgroundColor: colors.bgPage,
                        display: 'flex',
                        alignItems: 'center',
                        padding: `0 ${spacing.md}px`,
                        fontSize: 14,
                        fontFamily: font.family,
                        color: colors.textPrimary,
                      }}
                    >
                      🔍 Sarah Chen
                    </div>
                    {frame >= 60 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
                        <UserAvatar name="Sarah Chen" size={36} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: font.weights.semibold, color: colors.textPrimary }}>Sarah Chen</div>
                          <div style={{ fontSize: 12, color: colors.textSecondary }}>Sales Manager · sarah.chen@company.com</div>
                        </div>
                        <Badge label="Active" variant="success" />
                      </div>
                    )}
                  </div>

                  {/* Step 2: Transfer Records */}
                  {frame >= 150 && (
                    <div
                      style={{
                        backgroundColor: colors.bgWhite,
                        border: `1px solid ${step2Collapsed ? colors.success : colors.border}`,
                        borderRadius: radius.sm,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          backgroundColor: colors.bgPage,
                          borderBottom: `1px solid ${colors.border}`,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ fontSize: 15, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                          Step 2: Transfer Record Ownership (Recommended)
                        </div>
                        {step2Collapsed && (
                          <span style={{ color: colors.success, fontWeight: font.weights.semibold, fontSize: 13 }}>✓ 14 Opportunities transferred to Marcus Johnson</span>
                        )}
                      </div>

                      {!step2Collapsed && (
                        <div style={{ padding: spacing.xl }}>
                          <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: spacing.lg }}>
                            The following records are owned by Sarah Chen and should be transferred before deactivation.
                          </div>

                          {/* Opportunities table */}
                          <div style={{ border: `1px solid ${colors.border}`, borderRadius: radius.sm, overflow: 'hidden', marginBottom: spacing.lg }}>
                            <div style={{ padding: `${spacing.sm}px ${spacing.lg}px`, backgroundColor: colors.sfBlueLight, borderBottom: `1px solid ${colors.border}`, fontSize: 12, fontWeight: font.weights.semibold, color: colors.sfBlueDark, display: 'flex', justifyContent: 'space-between' }}>
                              <span>Open Opportunities ({OPPORTUNITY_NAMES.length})</span>
                              <span style={{ color: colors.sfBlue, cursor: 'pointer' }}>Select All</span>
                            </div>
                            {OPPORTUNITY_NAMES.slice(0, 5).map((opp) => (
                              <div key={opp} style={{ display: 'flex', alignItems: 'center', gap: spacing.md, padding: `${spacing.sm}px ${spacing.lg}px`, borderBottom: `1px solid ${colors.bgPage}` }}>
                                <div style={{ width: 14, height: 14, border: `2px solid ${transferHappened ? colors.success : colors.sfBlue}`, borderRadius: 3, backgroundColor: colors.sfBlue, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                  <svg width="8" height="6" viewBox="0 0 8 6"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                </div>
                                <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{opp}</span>
                              </div>
                            ))}
                            <div style={{ padding: `${spacing.sm}px ${spacing.lg}px`, fontSize: 12, color: colors.textMuted, fontStyle: 'italic' }}>
                              + 9 more opportunities...
                            </div>
                          </div>

                          {/* New owner */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                            <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textSecondary, whiteSpace: 'nowrap' }}>Transfer to:</span>
                            <div
                              style={{
                                flex: 1,
                                height: 32,
                                border: `1px solid ${colors.sfBlue}`,
                                borderRadius: radius.sm,
                                backgroundColor: colors.sfBlueLight,
                                display: 'flex',
                                alignItems: 'center',
                                padding: `0 ${spacing.md}px`,
                                fontSize: 13,
                                fontFamily: font.family,
                                color: colors.sfBlueDark,
                                fontWeight: font.weights.semibold,
                              }}
                            >
                              👤 Marcus Johnson
                            </div>
                            <Button label="Transfer 14 Records" variant="brand" />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Pre-Deactivation Cleanup */}
                  {frame >= 330 && (
                    <div
                      style={{
                        backgroundColor: colors.bgWhite,
                        border: `1px solid ${colors.border}`,
                        borderRadius: radius.sm,
                        padding: spacing.xl,
                      }}
                    >
                      <div style={{ fontSize: 15, fontWeight: font.weights.semibold, color: colors.textPrimary, marginBottom: spacing.lg }}>
                        Step 3: Pre-Deactivation Cleanup (Optional)
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing.lg }}>
                        {[
                          { label: 'Remove 8 Permission Sets', checked: true },
                          { label: 'Remove 3 Public Groups', checked: true },
                          { label: 'Remove 2 Queues', checked: true },
                          { label: 'Clear Role Assignment', checked: true },
                          { label: 'Revoke Manager Status', checked: true },
                        ].map(({ label, checked }) => (
                          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                            <div style={{ width: 14, height: 14, border: `2px solid ${colors.success}`, borderRadius: 3, backgroundColor: colors.success, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="8" height="6" viewBox="0 0 8 6"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            </div>
                            <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Deactivate button */}
                  {frame >= 400 && (
                    <div
                      style={{
                        backgroundColor: colors.dangerBg,
                        border: `2px solid ${colors.danger}`,
                        borderRadius: radius.sm,
                        padding: spacing.xl,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: spacing.xl,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: font.weights.bold, color: colors.danger }}>
                          Step 4: Deactivate User
                        </div>
                        <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: spacing.xs }}>
                          This will immediately revoke Salesforce access for Sarah Chen.
                        </div>
                      </div>
                      <div
                        style={{
                          height: 44,
                          padding: `0 ${spacing.xxl}px`,
                          backgroundColor: colors.danger,
                          color: '#fff',
                          borderRadius: radius.sm,
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.sm,
                          fontSize: 15,
                          fontFamily: font.family,
                          fontWeight: font.weights.semibold,
                          cursor: 'pointer',
                          transform: deactivateClicked ? 'scale(0.95)' : 'scale(1)',
                        }}
                      >
                        ⛔ Deactivate Sarah Chen
                      </div>
                    </div>
                  )}

                  {/* Confirmation dialog */}
                  {confirmShown && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 500,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: colors.bgWhite,
                          border: `1px solid ${colors.border}`,
                          borderRadius: radius.md,
                          padding: spacing.xxl,
                          width: 480,
                          boxShadow: shadow.modal,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: spacing.lg,
                        }}
                      >
                        <div style={{ fontSize: 18, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                          Confirm Deactivation
                        </div>
                        <div style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.6 }}>
                          You are about to deactivate <strong>Sarah Chen</strong>. All access has been pre-cleared. This action cannot be undone without re-activating the user.
                        </div>
                        <div style={{ display: 'flex', gap: spacing.md, justifyContent: 'flex-end' }}>
                          <Button label="Cancel" variant="neutral" />
                          <Button label="Yes, Deactivate" variant="destructive" />
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Bulk Login Control */
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xl }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                      Bulk Login Control
                    </h2>
                    <p style={{ margin: `${spacing.xs}px 0 0`, fontSize: 13, color: colors.textSecondary }}>
                      Freeze or unfreeze multiple users at once.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: spacing.md }}>
                    {['Freeze', 'Unfreeze'].map((action) => (
                      <div
                        key={action}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.sm,
                          cursor: 'pointer',
                        }}
                      >
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            border: `2px solid ${action === 'Freeze' ? colors.sfBlue : colors.border}`,
                            backgroundColor: action === 'Freeze' ? colors.sfBlue : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {action === 'Freeze' && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#fff' }} />}
                        </div>
                        <span style={{ fontSize: 14, fontFamily: font.family, color: action === 'Freeze' ? colors.sfBlue : colors.textSecondary, fontWeight: action === 'Freeze' ? font.weights.semibold : font.weights.regular }}>
                          {action}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ backgroundColor: colors.bgWhite, border: `1px solid ${colors.border}`, borderRadius: radius.sm, overflow: 'hidden' }}>
                    <div style={{ padding: `${spacing.sm}px ${spacing.xl}px`, backgroundColor: colors.bgPage, borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: font.weights.semibold, color: colors.textSecondary }}>
                        Users in Freeze Queue ({bulkCount})
                      </span>
                      <Button
                        label={`❄️ Freeze All (${bulkCount})`}
                        variant="brand"
                        pressed={freezeClicked}
                      />
                    </div>
                    {CONTRACTOR_NAMES.slice(0, bulkCount).map((name, i) => (
                      <div
                        key={name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.lg,
                          padding: `${spacing.md}px ${spacing.xl}px`,
                          borderBottom: `1px solid ${colors.bgPage}`,
                          opacity: staggeredFade(frame, i, 515, 8, 15),
                        }}
                      >
                        <UserAvatar name={name} size={28} />
                        <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{name}</span>
                        <Badge label="Contractor" variant="neutral" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </AppShell>

        <Toast
          message="Sarah Chen has been deactivated."
          subtext="8 permission sets, 3 groups removed."
          variant="success"
          startFrame={475}
          holdFrames={50}
        />
        <Toast
          message="12 users frozen."
          subtext="Login suspended until unfrozen."
          variant="info"
          startFrame={605}
          holdFrames={50}
        />

        <OnScreenText
          lines={
            !showBulk
              ? [
                  { text: '4 steps. Every owned record handled before you deactivate.', startFrame: 5 },
                  { text: '14 open opportunities transferred to a new owner.', startFrame: 155 },
                  { text: 'Revoke access. Deactivate. One workflow.', startFrame: 400 },
                ]
              : [{ text: 'Bulk Login Control: freeze a team in one action.', startFrame: 515 }]
          }
        />

        <Cursor waypoints={cursorWaypoints} clicks={clicks} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
