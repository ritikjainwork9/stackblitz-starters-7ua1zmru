import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import Scene01_Hook from './scenes/Scene01_Hook';
import Scene02_Problem from './scenes/Scene02_Problem';
import Scene03_SolutionReveal from './scenes/Scene03_SolutionReveal';
import Scene04_Dashboard from './scenes/Scene04_Dashboard';
import Scene05_PersonaMapping from './scenes/Scene05_PersonaMapping';
import Scene06_UserOnboarding from './scenes/Scene06_UserOnboarding';
import Scene07_AccessManagement from './scenes/Scene07_AccessManagement';
import Scene08_UserLifecycle from './scenes/Scene08_UserLifecycle';
import Scene09_CleanupInsights from './scenes/Scene09_CleanupInsights';
import Scene10_ActivityLogs from './scenes/Scene10_ActivityLogs';
import Scene11_AdminHero from './scenes/Scene11_AdminHero';
import Scene12_CTA from './scenes/Scene12_CTA';

// Total: 5700 frames at 30 FPS = 190 seconds = 3:10
// Scene durations:
// 01_Hook:           300 frames  (0:00–0:10)
// 02_Problem:        600 frames  (0:10–0:30)
// 03_SolutionReveal: 540 frames  (0:30–0:48)
// 04_Dashboard:      510 frames  (0:48–1:05)
// 05_PersonaMapping: 510 frames  (1:05–1:22)
// 06_UserOnboarding: 600 frames  (1:22–1:42)
// 07_AccessMgmt:     690 frames  (1:42–2:05)
// 08_UserLifecycle:  660 frames  (2:05–2:27)
// 09_CleanupInsights:510 frames  (2:27–2:44)
// 10_ActivityLogs:   300 frames  (2:44–2:54)
// 11_AdminHero:      240 frames  (2:54–3:02)
// 12_CTA:            240 frames  (3:02–3:10)
// Total:            5700 frames

export default function RaptUserMgmtDemo() {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={300}>
          <Scene01_Hook />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
          <Scene02_Problem />
        </Series.Sequence>
        <Series.Sequence durationInFrames={540}>
          <Scene03_SolutionReveal />
        </Series.Sequence>
        <Series.Sequence durationInFrames={510}>
          <Scene04_Dashboard />
        </Series.Sequence>
        <Series.Sequence durationInFrames={510}>
          <Scene05_PersonaMapping />
        </Series.Sequence>
        <Series.Sequence durationInFrames={600}>
          <Scene06_UserOnboarding />
        </Series.Sequence>
        <Series.Sequence durationInFrames={690}>
          <Scene07_AccessManagement />
        </Series.Sequence>
        <Series.Sequence durationInFrames={660}>
          <Scene08_UserLifecycle />
        </Series.Sequence>
        <Series.Sequence durationInFrames={510}>
          <Scene09_CleanupInsights />
        </Series.Sequence>
        <Series.Sequence durationInFrames={300}>
          <Scene10_ActivityLogs />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Scene11_AdminHero />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <Scene12_CTA />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
