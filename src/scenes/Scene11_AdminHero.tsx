/** Scene 11: Admin as Hero — improved dashboard with license color transition from orange to blue, slow zoom-out */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import KPITile from '../components/KPITile';
import BarChart from '../components/BarChart';
import Card from '../components/Card';
import SceneTransition from '../components/SceneTransition';
import OnScreenText from '../components/OnScreenText';
import { countUp } from '../utils/countUp';
import { staggeredFade } from '../utils/animations';

// Scene 11: 240 frames (0:08)
// F32: 0–120  → tiles with improved values, license color transitions orange→blue
// F33: 120–240 → slow zoom-out

export default function Scene11_AdminHero() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom out: scale 1.0 → 0.9
  const scale = interpolate(frame, [0, 240], [1.0, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  // License tile: transitions from orange to purple/good color
  // pct was 78%, now 71%
  const licensePct = 71;
  // Color transition: orange → sfBlue (good zone) over 60 frames
  const colorTransition = interpolate(frame, [10, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Interpolate between orange and purple hues
  function lerpColor(a: string, b: string, t: number): string {
    const ah = parseInt(a.slice(1), 16);
    const bh = parseInt(b.slice(1), 16);
    const ar = (ah >> 16) & 0xff, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
    const br = (bh >> 16) & 0xff, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const bv = Math.round(ab + (bb - ab) * t);
    return `rgb(${r},${g},${bv})`;
  }

  const licenseAccentColor = lerpColor(colors.chartOrange, colors.sfBlue, colorTransition);

  const CLEANUP_CARDS_CLEAN = [
    { label: 'Inactive Users', count: 0, color: colors.success },
    { label: 'Never Logged In', count: 1, color: colors.success },
    { label: 'Orphan Groups', count: 0, color: colors.success },
    { label: 'Orphan Queues', count: 0, color: colors.success },
    { label: 'Unused Profiles', count: 0, color: colors.success },
  ];

  const tileScale = interpolate(frame, [0, 20], [0.92, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >
          <AppShell activeTab="Dashboard">
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
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: 22, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                    Org Health Dashboard
                  </h1>
                  <p style={{ margin: `${spacing.xs}px 0 0`, fontSize: 13, color: colors.textSecondary }}>
                    All users · Last 30 days
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm,
                    backgroundColor: colors.successBg,
                    color: colors.success,
                    padding: `${spacing.sm}px ${spacing.lg}px`,
                    borderRadius: radius.sm,
                    fontSize: 13,
                    fontFamily: font.family,
                    fontWeight: font.weights.semibold,
                  }}
                >
                  ✓ Org is clean
                </div>
              </div>

              {/* KPI Tiles */}
              <div style={{ display: 'flex', gap: spacing.lg }}>
                <KPITile
                  label="Total Users"
                  value={312}
                  accentColor={colors.sfBlue}
                  scale={tileScale}
                />
                <KPITile
                  label="Active Users"
                  value={290}
                  subtext="93% of total ↑"
                  accentColor={colors.success}
                  scale={tileScale}
                />
                <KPITile
                  label="Licenses Used"
                  value="71%"
                  subtext="71% utilization ↓"
                  accentColor={licenseAccentColor}
                  scale={tileScale}
                />
                <KPITile
                  label="Success Rate"
                  value="97%"
                  subtext="149 ops in 30d"
                  accentColor={colors.chartTeal}
                  scale={tileScale}
                />
              </div>

              {/* Charts row */}
              <div style={{ display: 'flex', gap: spacing.xl, flex: 1 }}>
                {/* License Utilization - improved */}
                <Card style={{ flex: 2 }}>
                  <div style={{ marginBottom: spacing.lg }}>
                    <div style={{ fontSize: 15, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                      License Utilization
                    </div>
                    <div style={{ fontSize: 12, color: colors.success, marginTop: spacing.xs, fontWeight: font.weights.semibold }}>
                      ↓ Utilization reduced after cleanup
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
                    {[
                      { label: 'Salesforce CRM', current: 44, total: 50, pct: 88, color: colors.sfBlue },
                      { label: 'Partner Community', current: 8, total: 25, pct: 32, color: colors.sfBlue },
                      { label: 'Service Cloud', current: 20, total: 30, pct: 67, color: colors.chartTeal },
                    ].map((row) => (
                      <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontFamily: font.family }}>
                          <span style={{ fontWeight: font.weights.medium, color: colors.textPrimary }}>{row.label}</span>
                          <span style={{ color: colors.textSecondary, fontSize: 13 }}>
                            {row.current}/{row.total} ({row.pct}%)
                          </span>
                        </div>
                        <div style={{ height: 12, backgroundColor: colors.bgPage, borderRadius: radius.full, overflow: 'hidden' }}>
                          <div style={{ width: `${row.pct}%`, height: '100%', backgroundColor: row.color, borderRadius: radius.full }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Cleanup Health — all zeros */}
                <Card style={{ flex: 1 }} padding={spacing.lg}>
                  <div style={{ marginBottom: spacing.lg }}>
                    <div style={{ fontSize: 15, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                      Cleanup Health
                    </div>
                    <div style={{ fontSize: 12, color: colors.success, marginTop: spacing.xs, fontWeight: font.weights.semibold }}>
                      ✓ All clear
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                    {CLEANUP_CARDS_CLEAN.map((card, i) => {
                      const cardOpacity = staggeredFade(frame, i, 10, 6, 20);
                      return (
                        <div
                          key={card.label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: `${spacing.sm}px ${spacing.md}px`,
                            backgroundColor: colors.successBg,
                            borderRadius: radius.sm,
                            border: `1px solid ${colors.success}30`,
                            opacity: cardOpacity,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                            <span style={{ color: colors.success, fontSize: 13 }}>✓</span>
                            <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>{card.label}</span>
                          </div>
                          <span style={{ fontSize: 16, fontFamily: font.family, fontWeight: font.weights.bold, color: colors.success }}>
                            {card.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          </AppShell>
        </div>

        <OnScreenText
          lines={[
            { text: 'Clean org. Right access for the right people.', startFrame: 5 },
            { text: 'Every change on record.', startFrame: 80 },
            { text: 'Every license earning its cost.', startFrame: 130 },
          ]}
        />
      </AbsoluteFill>
    </SceneTransition>
  );
}
