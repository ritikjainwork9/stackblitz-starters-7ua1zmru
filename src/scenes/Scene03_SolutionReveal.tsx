/** Scene 3: Solution Reveal — white fade to Rapt app, dark background value prop lines, then app title */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors, font, spacing, motion } from '../theme/tokens';
import AppShell from '../components/AppShell';
import SceneTransition from '../components/SceneTransition';

const TAB_LABELS = [
  'Dashboard',
  'Persona Mapping',
  'User Onboarding',
  'Access Management',
  'User Lifecycle',
  'Cleanup & Insights',
  'Activity Logs',
];

// Frame boundaries within Scene 3 (540 total)
// F6: 0–180   → app loads, tabs stagger in
// F7: 180–360 → dark bg with 3 value prop lines
// F8: 360–540 → app full screen with title

export default function Scene03_SolutionReveal() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showApp1 = frame < 180;
  const showDark = frame >= 170 && frame < 360;
  const showApp2 = frame >= 350;

  // Fade between phases
  const app1Opacity = interpolate(frame, [0, 20, 160, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const darkOpacity = interpolate(frame, [170, 190, 340, 360], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const app2Opacity = interpolate(frame, [350, 370], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const app2Scale = interpolate(frame, [350, 500], [1.04, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Tab stagger: each tab fades in 3 frames apart
  const tabOpacities = TAB_LABELS.map((_, i) => {
    const tabStart = 10 + i * 8;
    return interpolate(frame, [tabStart, tabStart + 15], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  });

  // Dark bg: three value prop lines
  const valueLines = [
    { text: 'One form to onboard any user.', startFrame: 195 },
    { text: 'Access that expires automatically.', startFrame: 220 },
    { text: 'A guided workflow when someone leaves.', startFrame: 245 },
  ];

  // "This is Rapt User Management." brand line
  const brandOpacity = interpolate(frame, [285, 310], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      {/* White base */}
      <AbsoluteFill style={{ backgroundColor: '#fff' }} />

      {/* Phase 1: App with tab stagger */}
      {(showApp1 || frame < 185) && (
        <AbsoluteFill style={{ opacity: app1Opacity }}>
          <AppShell activeTab="Dashboard" tabOpacities={tabOpacities}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: spacing.xl,
                padding: spacing.xxxl,
              }}
            >
              <div style={{ fontSize: 22, fontFamily: font.family, fontWeight: font.weights.semibold, color: colors.textSecondary, textAlign: 'center', lineHeight: 1.5 }}>
                Complete Salesforce user lifecycle management —
              </div>
              <div style={{ fontSize: 16, fontFamily: font.family, color: colors.textMuted, textAlign: 'center', maxWidth: 600, lineHeight: 1.6 }}>
                define personas, onboard users, manage access, run lifecycle operations, and audit every action in one place.
              </div>
            </div>
          </AppShell>
        </AbsoluteFill>
      )}

      {/* Phase 2: Dark background with value props */}
      {(showDark || (frame >= 160 && frame < 365)) && (
        <AbsoluteFill
          style={{
            opacity: darkOpacity,
            backgroundColor: colors.bgDark,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: spacing.xxxl,
          }}
        >
          {/* Raptbot logo mark */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: colors.sfBlue,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 28,
              fontFamily: font.family,
              fontWeight: font.weights.extrabold,
              marginBottom: spacing.xxxl,
              boxShadow: '0 4px 20px rgba(1,118,211,0.5)',
            }}
          >
            R
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xl, textAlign: 'center' }}>
            {valueLines.map((line, i) => {
              const lineOpacity = interpolate(frame, [line.startFrame, line.startFrame + 18], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              const lineY = interpolate(frame, [line.startFrame, line.startFrame + 18], [20, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
                easing: Easing.out(Easing.cubic),
              });
              return (
                <div
                  key={i}
                  style={{
                    opacity: lineOpacity,
                    transform: `translateY(${lineY}px)`,
                    fontSize: 36,
                    fontFamily: font.family,
                    fontWeight: font.weights.bold,
                    color: colors.textOnDark,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* Brand name */}
          {frame >= 285 && (
            <div
              style={{
                opacity: brandOpacity,
                marginTop: spacing.xxxl,
                fontSize: 20,
                fontFamily: font.family,
                fontWeight: font.weights.semibold,
                color: colors.textOnDarkMuted,
              }}
            >
              This is{' '}
              <span style={{ color: colors.cyan, fontWeight: font.weights.bold }}>
                Rapt User Management
              </span>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* Phase 3: Full app with subtitle */}
      {showApp2 && (
        <AbsoluteFill
          style={{
            opacity: app2Opacity,
            transform: `scale(${app2Scale})`,
          }}
        >
          <AppShell activeTab="Dashboard">
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: spacing.xl,
                padding: spacing.xxxl,
              }}
            >
              <div
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: spacing.lg,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    backgroundColor: colors.sfBlue,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 32,
                    fontWeight: font.weights.extrabold,
                    fontFamily: font.family,
                  }}
                >
                  R
                </div>
                <div
                  style={{
                    fontSize: 48,
                    fontFamily: font.family,
                    fontWeight: font.weights.extrabold,
                    color: colors.textPrimary,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Rapt User Management
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontFamily: font.family,
                    color: colors.textSecondary,
                    maxWidth: 640,
                    lineHeight: 1.6,
                    textAlign: 'center',
                  }}
                >
                  Complete Salesforce user lifecycle management — define personas, onboard users, manage access, run lifecycle operations, and audit every action in one place.
                </div>
              </div>
            </div>
          </AppShell>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
}
