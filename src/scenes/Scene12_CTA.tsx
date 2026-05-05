/** Scene 12: Closing CTA — Raptbot logo draw-in, AppExchange search, Get It Now button hover */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import Cursor from '../components/Cursor';
import SceneTransition from '../components/SceneTransition';
import { fadeIn, popIn } from '../utils/animations';

// Frame boundaries (240 total)
// F34: 0–120  → white bg, Raptbot logo SVG draw-in
// F35: 120–240 → AppExchange screen with search + Get It Now

function RaptbotLogo({ frame }: { frame: number }) {
  const drawProgress = interpolate(frame, [5, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const glowOpacity = interpolate(frame, [60, 100], [0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const brandOpacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const taglineOpacity = interpolate(frame, [80, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // SVG "R" draw-in using strokeDasharray
  const circumference = 400;
  const strokeOffset = circumference * (1 - drawProgress);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xl,
      }}
    >
      {/* Logo mark */}
      <div style={{ position: 'relative' }}>
        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: 28,
            backgroundColor: colors.sfBlue,
            opacity: glowOpacity,
            filter: 'blur(20px)',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: 96,
            height: 96,
            borderRadius: 24,
            backgroundColor: colors.sfBlue,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            {/* Animated R letterform */}
            <path
              d="M14 10 L14 46 M14 10 L34 10 Q42 10 42 20 Q42 30 34 30 L14 30 M30 30 L42 46"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ opacity: brandOpacity, textAlign: 'center' }}>
        <div
          style={{
            fontSize: 56,
            fontFamily: font.family,
            fontWeight: font.weights.extrabold,
            color: colors.textPrimary,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Rapt User Management
        </div>
        <div
          style={{
            opacity: taglineOpacity,
            fontSize: 20,
            fontFamily: font.family,
            color: colors.textSecondary,
            marginTop: spacing.md,
            fontWeight: font.weights.medium,
          }}
        >
          for Salesforce · AppExchange
        </div>
      </div>
    </div>
  );
}

function AppExchangeScreen({ frame, localFrame }: { frame: number; localFrame: number }) {
  const typedSearch = (() => {
    const text = 'Rapt User Management';
    const chars = Math.floor(localFrame * 0.8);
    return text.slice(0, Math.max(0, chars));
  })();

  const resultsOpacity = interpolate(localFrame, [28, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const buttonPulse = interpolate(
    (localFrame - 80) % 30,
    [0, 15, 30],
    [1, 1.04, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#f7f8fb', fontFamily: font.family }}>
      {/* AppExchange header */}
      <div
        style={{
          backgroundColor: '#00A1E0',
          padding: `${spacing.md}px ${spacing.xxxl}px`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.xxl,
        }}
      >
        <div style={{ color: '#fff', fontSize: 22, fontWeight: font.weights.extrabold }}>
          AppExchange
        </div>
        <div
          style={{
            flex: 1,
            maxWidth: 600,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: radius.full,
            display: 'flex',
            alignItems: 'center',
            padding: `0 ${spacing.lg}px`,
            gap: spacing.md,
            fontSize: 15,
            color: typedSearch ? colors.textPrimary : colors.textMuted,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          🔍 {typedSearch || 'Search AppExchange...'}
          {localFrame < 25 && (
            <span style={{ borderRight: `2px solid ${colors.textPrimary}`, height: 18, marginLeft: 1 }} />
          )}
        </div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: font.weights.semibold }}>Sign In</div>
      </div>

      {/* Search results */}
      {localFrame >= 28 && (
        <div style={{ padding: `${spacing.xxl}px ${spacing.xxxl}px`, opacity: resultsOpacity }}>
          <div style={{ fontSize: 15, color: colors.textSecondary, marginBottom: spacing.xl }}>
            Search results for "{typedSearch.slice(0, 20)}"
          </div>

          {/* Featured listing card */}
          <div
            style={{
              backgroundColor: colors.bgWhite,
              border: `2px solid ${colors.sfBlue}`,
              borderRadius: radius.md,
              padding: spacing.xxl,
              display: 'flex',
              gap: spacing.xxl,
              boxShadow: shadow.modal,
              maxWidth: 800,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: colors.sfBlue,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 36,
                fontWeight: font.weights.extrabold,
                flexShrink: 0,
              }}
            >
              R
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary, marginBottom: spacing.sm }}>
                Rapt User Management
              </div>
              <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: spacing.sm }}>
                by Raptbot · Free to install
              </div>
              <div style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.6, marginBottom: spacing.lg }}>
                Complete Salesforce user lifecycle management — persona-based onboarding, guided deactivation with ownership transfer, time-limited access with automatic expiry, and full audit logs.
              </div>
              <div style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.lg }}>
                {['User Management', 'Onboarding', 'Compliance', 'Admin Tools'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 12,
                      backgroundColor: colors.sfBlueLight,
                      color: colors.sfBlue,
                      padding: `2px ${spacing.md}px`,
                      borderRadius: radius.full,
                      fontWeight: font.weights.semibold,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  height: 48,
                  padding: `0 ${spacing.xxl}px`,
                  backgroundColor: colors.sfBlue,
                  color: '#fff',
                  borderRadius: radius.sm,
                  fontSize: 16,
                  fontWeight: font.weights.bold,
                  cursor: 'pointer',
                  transform: localFrame >= 80 ? `scale(${buttonPulse})` : 'scale(1)',
                  boxShadow: localFrame >= 80 ? `0 4px 20px ${colors.sfBlue}60` : 'none',
                }}
              >
                Get It Now →
              </div>
            </div>
          </div>

          {/* Install time badge */}
          <div
            style={{
              marginTop: spacing.xl,
              fontSize: 15,
              color: colors.textSecondary,
              fontStyle: 'italic',
            }}
          >
            ⏱ Install in under 10 minutes. Your first persona is ready before lunch.
          </div>
        </div>
      )}
    </div>
  );
}

export default function Scene12_CTA() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showLogo = frame < 125;
  const showAppExchange = frame >= 110;

  const logoOpacity = interpolate(frame, [0, 15, 105, 120], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const appExchangeOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const cursorWaypoints = [
    { frame: 140, x: 960, y: 400 },
    { frame: 180, x: 640, y: 520 },
    { frame: 220, x: 640, y: 640 },
    { frame: 235, x: 640, y: 640 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      {/* Logo phase */}
      {(showLogo || frame < 125) && (
        <AbsoluteFill
          style={{
            opacity: logoOpacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}
        >
          <RaptbotLogo frame={frame} />
        </AbsoluteFill>
      )}

      {/* AppExchange phase */}
      {showAppExchange && (
        <AbsoluteFill style={{ opacity: appExchangeOpacity }}>
          <AppExchangeScreen frame={frame} localFrame={frame - 120} />
        </AbsoluteFill>
      )}

      {/* Final text overlay */}
      {frame >= 130 && (
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            opacity: interpolate(frame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: font.family,
              fontWeight: font.weights.bold,
              color: colors.textPrimary,
            }}
          >
            Available now on the Salesforce AppExchange
          </div>
          <div style={{ fontSize: 16, fontFamily: font.family, color: colors.textSecondary, marginTop: spacing.sm }}>
            Install in under 10 minutes.
          </div>
        </div>
      )}

      <Cursor waypoints={cursorWaypoints} />
    </AbsoluteFill>
  );
}
