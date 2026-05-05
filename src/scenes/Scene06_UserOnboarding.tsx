/** Scene 6: User Onboarding — persona auto-fill, user creation with toast, then clone mode */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Combobox from '../components/Combobox';
import Cursor from '../components/Cursor';
import Toast from '../components/Toast';
import OnScreenText from '../components/OnScreenText';
import SceneTransition from '../components/SceneTransition';
import { fadeIn, popIn } from '../utils/animations';

// Frame boundaries (600 total)
// F15: 0–180   → persona select, auto-fill
// F16: 180–360 → type name/email, license availability
// F17: 360–480 → Create User click, toast
// F18: 480–600 → clone mode

function typeAt(text: string, frame: number, start: number): string {
  const chars = Math.floor((frame - start) * 0.7);
  return text.slice(0, Math.max(0, chars));
}

function ModeButton({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      style={{
        padding: `${spacing.sm}px ${spacing.xl}px`,
        border: `2px solid ${active ? colors.sfBlue : colors.border}`,
        borderRadius: radius.sm,
        backgroundColor: active ? colors.sfBlueLight : colors.bgWhite,
        color: active ? colors.sfBlue : colors.textSecondary,
        fontSize: 14,
        fontFamily: font.family,
        fontWeight: active ? font.weights.semibold : font.weights.regular,
        cursor: 'pointer',
      }}
    >
      {label}
    </div>
  );
}

function FieldRow({ label, value, filled, active }: { label: string; value?: string; filled?: boolean; active?: boolean }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: font.weights.semibold, color: colors.textSecondary, display: 'block', marginBottom: spacing.xs }}>
        {label}
      </label>
      <div
        style={{
          height: 32,
          border: `1px solid ${active ? colors.sfBlue : filled ? colors.success : colors.border}`,
          borderRadius: radius.sm,
          backgroundColor: filled ? '#F6FEF9' : colors.bgWhite,
          display: 'flex',
          alignItems: 'center',
          padding: `0 ${spacing.md}px`,
          justifyContent: 'space-between',
          fontSize: 13,
          fontFamily: font.family,
          color: value ? colors.textPrimary : colors.textMuted,
          boxShadow: active ? `0 0 0 3px ${colors.sfBlue}30` : 'none',
        }}
      >
        <span>{value || 'Enter value...'}</span>
        {filled && !active && (
          <span style={{ color: colors.success, fontSize: 14 }}>✓</span>
        )}
      </div>
    </div>
  );
}

export default function Scene06_UserOnboarding() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showClone = frame >= 480;
  const personaSelected = frame >= 30;

  const badgeOpacity = personaSelected
    ? interpolate(frame, [30, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;
  const badgeScale = personaSelected ? popIn(frame, fps, 30) : 0;

  const autoFillProfile = frame >= 38;
  const autoFillLicense = frame >= 44;
  const autoFillRole = frame >= 50;

  const firstName = frame >= 185 ? typeAt('Marcus', frame, 185) : '';
  const lastName = frame >= 220 ? typeAt('Johnson', frame, 220) : '';
  const email = frame >= 255 ? typeAt('marcus.johnson@company.com', frame, 255) : '';
  const username = frame >= 295 ? typeAt('marcus.johnson@company.com.prod', frame, 295) : '';

  const cloneSource = frame >= 500 ? 'Sarah Chen' : '';

  const cursorWaypoints = [
    { frame: 15, x: 550, y: 230 },
    { frame: 25, x: 550, y: 230 },
    { frame: 180, x: 400, y: 390 },
    { frame: 220, x: 400, y: 450 },
    { frame: 255, x: 400, y: 510 },
    { frame: 295, x: 400, y: 570 },
    { frame: 350, x: 960, y: 700 },
    { frame: 365, x: 960, y: 700 },
    { frame: 480, x: 680, y: 200 },
  ];

  const clicks = [{ frame: 27 }, { frame: 363 }, { frame: 483 }];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <AppShell activeTab="User Onboarding">
          <div style={{ padding: spacing.xxl, display: 'flex', flexDirection: 'column', gap: spacing.xl, height: '100%', overflow: 'hidden' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                User Onboarding
              </h1>
              <p style={{ margin: `${spacing.xs}px 0 0`, fontSize: 13, color: colors.textSecondary }}>
                Create new users with automatic persona assignment.
              </p>
            </div>

            {/* Mode buttons */}
            {!showClone && (
              <div style={{ display: 'flex', gap: spacing.md }}>
                <ModeButton label="Internal User" active />
                <ModeButton label="Partner Portal User" />
                <ModeButton label="Clone Existing User" />
              </div>
            )}
            {showClone && (
              <div style={{ display: 'flex', gap: spacing.md }}>
                <ModeButton label="Internal User" />
                <ModeButton label="Partner Portal User" />
                <ModeButton label="Clone Existing User" active />
              </div>
            )}

            {!showClone ? (
              <div style={{ display: 'flex', gap: spacing.xl, flex: 1 }}>
                {/* Main form */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
                  {/* Persona selector */}
                  <div
                    style={{
                      backgroundColor: colors.bgWhite,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.xl,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Combobox
                      label="Select Persona"
                      value={personaSelected ? 'Sales Representative' : ''}
                      placeholder="Choose a persona to auto-fill profile & permissions..."
                      open={frame >= 18 && frame < 32}
                      options={['Sales Representative', 'Account Executive', 'Service Agent', 'Sales Manager']}
                    />

                    {/* Persona badge */}
                    {personaSelected && (
                      <div
                        style={{
                          opacity: badgeOpacity,
                          transform: `scale(${badgeScale})`,
                          transformOrigin: 'left center',
                          marginTop: spacing.md,
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing.sm,
                          backgroundColor: colors.sfBlueLight,
                          border: `1px solid ${colors.sfBlue}`,
                          borderRadius: radius.sm,
                          padding: `${spacing.sm}px ${spacing.md}px`,
                          fontSize: 13,
                          fontFamily: font.family,
                          color: colors.sfBlueDark,
                          fontWeight: font.weights.semibold,
                        }}
                      >
                        ✓ Persona selected: Sales Representative · 3 permission set(s) · 2 group(s)
                      </div>
                    )}
                  </div>

                  {/* Auto-filled fields */}
                  <div
                    style={{
                      backgroundColor: colors.bgWhite,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.xl,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: font.weights.semibold, color: colors.textSecondary, marginBottom: spacing.lg, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 11 }}>
                      Auto-filled from Persona
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing.lg }}>
                      <FieldRow label="Profile" value={autoFillProfile ? 'Standard User' : ''} filled={autoFillProfile} />
                      <FieldRow label="License" value={autoFillLicense ? 'Salesforce CRM' : ''} filled={autoFillLicense} />
                      <FieldRow label="Role" value={autoFillRole ? 'Sales Rep' : ''} filled={autoFillRole} />
                    </div>
                  </div>

                  {/* User details */}
                  <div
                    style={{
                      backgroundColor: colors.bgWhite,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.xl,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: font.weights.semibold, color: colors.textSecondary, marginBottom: spacing.lg, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      User Details
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
                      <FieldRow
                        label="First Name *"
                        value={firstName}
                        filled={firstName === 'Marcus'}
                        active={frame >= 185 && frame < 220 && firstName !== 'Marcus'}
                      />
                      <FieldRow
                        label="Last Name *"
                        value={lastName}
                        filled={lastName === 'Johnson'}
                        active={frame >= 220 && frame < 255 && lastName !== 'Johnson'}
                      />
                      <FieldRow
                        label="Email *"
                        value={email}
                        filled={email.length > 10}
                        active={frame >= 255 && frame < 295 && email.length < 10}
                      />
                      <FieldRow
                        label="Username *"
                        value={username}
                        filled={username.length > 10}
                        active={frame >= 295 && frame < 350 && username.length < 10}
                      />
                    </div>

                    <div style={{ marginTop: spacing.xl, display: 'flex', gap: spacing.md }}>
                      <Button label="Create User" variant="brand" size="lg" />
                      <Button label="Cancel" variant="neutral" size="lg" />
                    </div>
                  </div>
                </div>

                {/* Right sidebar: License Availability */}
                <div style={{ width: 240, flexShrink: 0 }}>
                  <div
                    style={{
                      backgroundColor: colors.bgWhite,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm,
                      padding: spacing.lg,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: font.weights.semibold, color: colors.textSecondary, marginBottom: spacing.md }}>
                      License Availability
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                      {[
                        { type: 'Salesforce CRM', avail: 3, total: 50, color: colors.warning },
                        { type: 'Partner Community', avail: 17, total: 25, color: colors.success },
                        { type: 'Service Cloud', avail: 8, total: 30, color: colors.sfBlue },
                      ].map(({ type, avail, total, color }) => (
                        <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 12, fontFamily: font.family, color: colors.textSecondary }}>{type}</span>
                            <span
                              style={{
                                fontSize: 11,
                                backgroundColor: avail <= 5 ? colors.warningBg : colors.successBg,
                                color: avail <= 5 ? colors.warning : colors.success,
                                padding: `1px ${spacing.sm}px`,
                                borderRadius: radius.full,
                                fontWeight: font.weights.semibold,
                              }}
                            >
                              {avail} left
                            </span>
                          </div>
                          <div style={{ height: 6, backgroundColor: colors.bgPage, borderRadius: radius.full, overflow: 'hidden' }}>
                            <div style={{ width: `${((total - avail) / total) * 100}%`, height: '100%', backgroundColor: color, borderRadius: radius.full }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Clone mode */
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing.xl,
                }}
              >
                <div
                  style={{
                    backgroundColor: colors.bgWhite,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.sm,
                    padding: spacing.xl,
                  }}
                >
                  <Combobox
                    label="Source User"
                    value={cloneSource}
                    placeholder="Search for a user to clone..."
                    open={frame >= 490 && frame < 510}
                    options={['Sarah Chen', 'James Park', 'Maria Lopez']}
                  />

                  {cloneSource && (
                    <div style={{ marginTop: spacing.xl }}>
                      <div style={{ fontSize: 12, fontWeight: font.weights.semibold, color: colors.textSecondary, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Access to Clone from Sarah Chen
                      </div>
                      <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap' }}>
                        {[
                          { label: frame >= 550 ? 'Permission Sets (3 of 5)' : 'Permission Sets (5 of 5)', active: true },
                          { label: 'Perm. Set Groups (0 of 0)', active: false },
                          { label: 'Public Groups (2 of 2)', active: true },
                          { label: 'Queues (1 of 1)', active: true },
                        ].map(({ label, active }) => (
                          <div
                            key={label}
                            style={{
                              padding: `${spacing.sm}px ${spacing.lg}px`,
                              border: `2px solid ${active ? colors.sfBlue : colors.border}`,
                              borderRadius: radius.sm,
                              backgroundColor: active ? colors.sfBlueLight : colors.bgPage,
                              color: active ? colors.sfBlue : colors.textMuted,
                              fontSize: 13,
                              fontFamily: font.family,
                              fontWeight: font.weights.semibold,
                              cursor: 'pointer',
                            }}
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: spacing.md }}>
                  <Button label="Create Cloned User" variant="brand" />
                  <Button label="Cancel" variant="neutral" />
                </div>
              </div>
            )}
          </div>
        </AppShell>

        <Toast
          message="User created successfully"
          link="Marcus Johnson"
          subtext="Password reset email sent."
          variant="success"
          startFrame={370}
          holdFrames={70}
        />

        <OnScreenText
          lines={
            !showClone
              ? [
                  { text: 'Profile. License. Role. Auto-filled.', startFrame: 40 },
                  { text: 'License Availability: 3 remaining.', startFrame: 200 },
                  { text: 'Password reset email sent automatically.', startFrame: 370 },
                ]
              : [{ text: 'Clone mode: pick exactly which access to copy.', startFrame: 485 }]
          }
        />

        <Cursor waypoints={cursorWaypoints} clicks={clicks} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
