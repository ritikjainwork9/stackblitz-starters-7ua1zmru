/** Scene 2: Problem Statement — three sub-frames showing native Salesforce pain points */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import BrowserChrome from '../components/BrowserChrome';
import Cursor from '../components/Cursor';
import OnScreenText from '../components/OnScreenText';
import SceneTransition from '../components/SceneTransition';

function tabGlow(frame: number, startFrame: number): number {
  return interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
}

function SFNewUserForm({ tabHighlight }: { tabHighlight: number }) {
  return (
    <div style={{ padding: spacing.xl, fontFamily: font.family }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: font.weights.bold, color: colors.textPrimary }}>
        New User
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xl }}>
        {[
          { label: 'First Name', val: 'James' },
          { label: 'Last Name', val: 'Okafor' },
          { label: 'Email', val: '' },
          { label: 'Username', val: '' },
          { label: 'Profile', val: '— Select —', isDropdown: true },
          { label: 'Role', val: '' },
        ].map(({ label, val, isDropdown }) => (
          <div key={label}>
            <div style={{ fontSize: 12, fontWeight: font.weights.semibold, color: colors.textSecondary, marginBottom: 4 }}>
              {label}
            </div>
            <div
              style={{
                height: 32,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                backgroundColor: colors.bgWhite,
                display: 'flex',
                alignItems: 'center',
                padding: `0 ${spacing.md}px`,
                fontSize: 13,
                color: val ? colors.textPrimary : colors.textMuted,
                justifyContent: 'space-between',
              }}
            >
              <span>{val || 'Enter value...'}</span>
              {isDropdown && <span style={{ color: colors.textMuted }}>▾</span>}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: spacing.xl,
          padding: spacing.md,
          backgroundColor: '#FFF8E1',
          border: `1px solid #FFD54F`,
          borderRadius: radius.sm,
          fontSize: 13,
          color: '#795548',
        }}
      >
        ⚠ After saving, you'll need to assign Permission Sets and Group Memberships separately.
      </div>
    </div>
  );
}

function CalendarView() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dateGrid = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, null, null, null, null, null, null],
  ];

  return (
    <div style={{ padding: spacing.xl, fontFamily: font.family }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }}>
        <div style={{ fontSize: 20, fontWeight: font.weights.bold, color: colors.textPrimary }}>November 2024</div>
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <div style={{ padding: `${spacing.xs}px ${spacing.md}px`, border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontSize: 13, cursor: 'pointer' }}>◀</div>
          <div style={{ padding: `${spacing.xs}px ${spacing.md}px`, border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontSize: 13, cursor: 'pointer' }}>▶</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {days.map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: font.weights.semibold, color: colors.textMuted, padding: spacing.sm, textTransform: 'uppercase' }}>
            {d}
          </div>
        ))}
        {dateGrid.flat().map((day, i) => {
          const isToday = day === 15;
          const hasReminder = day === 31;
          return (
            <div
              key={i}
              style={{
                height: 60,
                backgroundColor: isToday ? colors.sfBlue : 'transparent',
                border: hasReminder ? `2px solid ${colors.danger}` : `1px solid ${colors.border}`,
                borderRadius: radius.sm,
                padding: spacing.xs,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {day && (
                <>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: isToday ? font.weights.bold : font.weights.regular,
                      color: isToday ? '#fff' : colors.textPrimary,
                    }}
                  >
                    {day}
                  </div>
                  {day === 31 && (
                    <div
                      style={{
                        fontSize: 9,
                        color: colors.danger,
                        backgroundColor: colors.dangerBg,
                        padding: '1px 3px',
                        borderRadius: 2,
                        marginTop: 2,
                        fontWeight: font.weights.semibold,
                        lineHeight: 1.2,
                      }}
                    >
                      Revoke contractor access
                    </div>
                  )}
                  {isToday && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: 0,
                        right: 0,
                        textAlign: 'center',
                        fontSize: 9,
                        color: '#fff',
                        fontWeight: font.weights.bold,
                      }}
                    >
                      TODAY
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: spacing.lg,
          padding: spacing.md,
          backgroundColor: colors.dangerBg,
          border: `1px solid ${colors.danger}`,
          borderRadius: radius.sm,
          fontSize: 13,
          color: colors.danger,
          fontWeight: font.weights.semibold,
        }}
      >
        ⚠ Missed reminder: Revoke contractor access — was due Oct 31. Today is Nov 15.
      </div>
    </div>
  );
}

function DeactivateError() {
  return (
    <div style={{ padding: spacing.xl, fontFamily: font.family }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: font.weights.bold, color: colors.textPrimary }}>
        Users · Deactivate
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.xl }}>
        <div style={{ flex: 1, fontSize: 14, color: colors.textPrimary }}>
          Deactivating: <strong>Sarah Chen</strong> · sarah.chen@company.com
        </div>
        <div
          style={{
            padding: `${spacing.sm}px ${spacing.xl}px`,
            backgroundColor: colors.danger,
            color: '#fff',
            borderRadius: radius.sm,
            fontSize: 14,
            fontWeight: font.weights.semibold,
            opacity: 0.6,
          }}
        >
          Deactivate
        </div>
      </div>

      {/* Error modal */}
      <div
        style={{
          border: `2px solid ${colors.danger}`,
          borderRadius: radius.md,
          backgroundColor: colors.dangerBg,
          padding: spacing.xl,
          display: 'flex',
          gap: spacing.lg,
          alignItems: 'flex-start',
          boxShadow: shadow.modal,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: colors.danger,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            flexShrink: 0,
          }}
        >
          !
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: font.weights.bold, color: colors.danger, marginBottom: spacing.sm }}>
            Cannot Deactivate User
          </div>
          <div style={{ fontSize: 14, color: colors.textPrimary, lineHeight: 1.6 }}>
            You cannot deactivate a user who owns open records. Please transfer ownership of the following before deactivating:
          </div>
          <div style={{ marginTop: spacing.md, display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            {[
              { type: 'Open Opportunities', count: 14, color: colors.warning },
              { type: 'Accounts', count: 3, color: colors.sfBlue },
              { type: 'Open Cases', count: 7, color: colors.chartPurple },
            ].map(({ type, count, color }) => (
              <div
                key={type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  fontSize: 13,
                  color: colors.textPrimary,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: color,
                    flexShrink: 0,
                  }}
                />
                {type}: <strong>{count} records</strong>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: spacing.md,
              fontSize: 12,
              color: colors.textSecondary,
              fontStyle: 'italic',
            }}
          >
            Go to: Setup → Data Management → Mass Transfer Records (6 more screens)
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Scene02_Problem() {
  const frame = useCurrentFrame();

  // Sub-frame boundaries (relative to scene)
  // Frame 3: 0–150 (0:10-0:15)
  // Frame 4: 150–360 (0:15-0:22)
  // Frame 5: 360–600 (0:22-0:30)

  const showFrame3 = frame < 150;
  const showFrame4 = frame >= 150 && frame < 360;
  const showFrame5 = frame >= 360;

  // Tab highlights for Frame 3
  const tab1Glow = showFrame3 ? tabGlow(frame, 20) : 0;
  const tab2Glow = showFrame3 ? tabGlow(frame, 60) : 0;
  const tab3Glow = showFrame3 ? tabGlow(frame, 100) : 0;

  const cursorWaypointsF3 = [
    { frame: 10, x: 620, y: 340 },
    { frame: 50, x: 820, y: 60 },
    { frame: 90, x: 1050, y: 60 },
    { frame: 140, x: 1050, y: 60 },
  ];

  const errorPulse = showFrame5
    ? interpolate(
        (frame - 360) % 30,
        [0, 15, 30],
        [1, 1.02, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
      )
    : 1;

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage, fontFamily: font.family }}>
        {showFrame3 && (
          <BrowserChrome
            url="https://myorg.lightning.force.com/lightning/setup/ManageUsers/home"
            tabs={[
              { label: 'New User', active: true },
              { label: 'Permission Set Assignments', highlighted: tab2Glow > 0.5 },
              { label: 'Manage Group Membership', highlighted: tab3Glow > 0.5 },
            ]}
          >
            <SFNewUserForm tabHighlight={tab1Glow} />
          </BrowserChrome>
        )}

        {showFrame4 && (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
              padding: spacing.xxxl,
            }}
          >
            <div
              style={{
                maxWidth: 900,
                margin: '0 auto',
                backgroundColor: colors.bgWhite,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                overflow: 'hidden',
                boxShadow: shadow.modal,
              }}
            >
              {/* Calendar header bar */}
              <div
                style={{
                  backgroundColor: '#1a73e8',
                  color: '#fff',
                  padding: `${spacing.md}px ${spacing.xl}px`,
                  fontSize: 16,
                  fontWeight: font.weights.bold,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.lg,
                }}
              >
                <span>📅</span>
                Google Calendar
              </div>
              <CalendarView />
            </div>
          </div>
        )}

        {showFrame5 && (
          <BrowserChrome url="https://myorg.lightning.force.com/lightning/setup/ManageUsers/home">
            <div style={{ transform: `scale(${errorPulse})`, transformOrigin: 'center' }}>
              <DeactivateError />
            </div>
          </BrowserChrome>
        )}

        {showFrame3 && (
          <OnScreenText
            lines={[{ text: 'Every hire: 5 screens, repeated from scratch.', startFrame: 5 }]}
          />
        )}
        {showFrame4 && (
          <OnScreenText
            lines={[{ text: 'Every contractor: permanent access, no expiry.', startFrame: 155 }]}
          />
        )}
        {showFrame5 && (
          <OnScreenText
            lines={[{ text: 'Every departure: whose records? Which permissions?', startFrame: 365 }]}
          />
        )}

        {showFrame3 && <Cursor waypoints={cursorWaypointsF3} />}
      </AbsoluteFill>
    </SceneTransition>
  );
}
