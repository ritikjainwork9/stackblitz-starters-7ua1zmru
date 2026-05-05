/** Scene 4: Dashboard — KPI tiles count up, license bar chart fills, cleanup health cards pop in */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import KPITile from '../components/KPITile';
import BarChart from '../components/BarChart';
import Card from '../components/Card';
import Badge from '../components/Badge';
import SceneTransition from '../components/SceneTransition';
import OnScreenText from '../components/OnScreenText';
import { countUp } from '../utils/countUp';
import { staggeredFade, popIn } from '../utils/animations';

const CLEANUP_CARDS = [
  { label: 'Inactive Users', count: 18, variant: 'warning' as const, color: colors.chartOrange },
  { label: 'Never Logged In', count: 11, variant: 'purple' as const, color: colors.chartPurple },
  { label: 'Orphan Groups', count: 4, variant: 'info' as const, color: colors.sfBlue },
  { label: 'Orphan Queues', count: 2, variant: 'neutral' as const, color: colors.textMuted },
  { label: 'Unused Profiles', count: 3, variant: 'teal' as const, color: colors.chartTeal },
];

export default function Scene04_Dashboard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalUsers = Math.round(countUp(frame, 312, 5, 60));
  const activeUsers = Math.round(countUp(frame, 287, 10, 60));
  const licensePct = countUp(frame, 78, 15, 60, 0);
  const successRate = countUp(frame, 97, 20, 60, 0);

  const tile1Opacity = staggeredFade(frame, 0, 0, 0, 20);
  const tile2Opacity = staggeredFade(frame, 1, 0, 8, 20);
  const tile3Opacity = staggeredFade(frame, 2, 0, 16, 20);
  const tile4Opacity = staggeredFade(frame, 3, 0, 24, 20);

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
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
                  height: 32,
                  padding: `0 ${spacing.lg}px`,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.sm,
                  backgroundColor: colors.bgWhite,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.sm,
                  fontSize: 13,
                  fontFamily: font.family,
                  color: colors.textPrimary,
                  cursor: 'pointer',
                }}
              >
                Last 30 days ▾
              </div>
            </div>

            {/* KPI Tiles row */}
            <div style={{ display: 'flex', gap: spacing.lg, opacity: 1 }}>
              <div style={{ flex: 1, opacity: tile1Opacity }}>
                <KPITile
                  label="Total Users"
                  value={totalUsers}
                  accentColor={colors.sfBlue}
                />
              </div>
              <div style={{ flex: 1, opacity: tile2Opacity }}>
                <KPITile
                  label="Active Users"
                  value={activeUsers}
                  subtext={`${Math.round((activeUsers / 312) * 100)}% of total`}
                  accentColor={colors.success}
                />
              </div>
              <div style={{ flex: 1, opacity: tile3Opacity }}>
                <KPITile
                  label="Licenses Used"
                  value={`${Math.round(licensePct)}%`}
                  subtext="78% utilization"
                  accentColor={colors.chartPurple}
                />
              </div>
              <div style={{ flex: 1, opacity: tile4Opacity }}>
                <KPITile
                  label="Success Rate"
                  value={`${Math.round(successRate)}%`}
                  subtext="143 ops in 30d"
                  accentColor={colors.chartTeal}
                />
              </div>
            </div>

            {/* Charts row */}
            <div style={{ display: 'flex', gap: spacing.xl, flex: 1 }}>
              {/* License Utilization */}
              <Card style={{ flex: 2 }}>
                <div style={{ marginBottom: spacing.lg }}>
                  <div style={{ fontSize: 15, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                    License Utilization
                  </div>
                  <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: spacing.xs }}>
                    Current allocation across license types
                  </div>
                </div>
                <BarChart
                  rows={[
                    { label: 'Salesforce CRM', current: 47, total: 50 },
                    { label: 'Partner Community', current: 8, total: 25, color: colors.sfBlue },
                    { label: 'Service Cloud', current: 22, total: 30, color: colors.chartTeal },
                  ]}
                  startFrame={30}
                  staggerFrames={15}
                />
              </Card>

              {/* Cleanup Health */}
              <Card style={{ flex: 1 }} padding={spacing.lg}>
                <div style={{ marginBottom: spacing.lg }}>
                  <div style={{ fontSize: 15, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                    Cleanup Health
                  </div>
                  <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: spacing.xs }}>
                    Items requiring attention
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  {CLEANUP_CARDS.map((card, i) => {
                    const cardScale = popIn(frame, fps, 120 + i * 8);
                    return (
                      <div
                        key={card.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: `${spacing.sm}px ${spacing.md}px`,
                          backgroundColor: colors.bgPage,
                          borderRadius: radius.sm,
                          border: `1px solid ${colors.border}`,
                          transform: `scale(${cardScale})`,
                          transformOrigin: 'left center',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: card.color,
                            }}
                          />
                          <span style={{ fontSize: 13, fontFamily: font.family, color: colors.textPrimary }}>
                            {card.label}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 16,
                            fontFamily: font.family,
                            fontWeight: font.weights.bold,
                            color: card.color,
                          }}
                        >
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

        <OnScreenText
          lines={[
            { text: 'Real-time org health.', startFrame: 5 },
            { text: 'License pressure — visible before it\'s a problem.', startFrame: 100 },
            { text: 'Cleanup opportunities — quantified.', startFrame: 200 },
          ]}
        />
      </AbsoluteFill>
    </SceneTransition>
  );
}
