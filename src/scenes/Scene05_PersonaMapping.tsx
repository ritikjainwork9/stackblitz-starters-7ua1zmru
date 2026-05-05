/** Scene 5: Persona Mapping — create a new persona with license filtering, dual listbox, and active badge pop-in */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';
import { colors, font, spacing, radius, shadow } from '../theme/tokens';
import AppShell from '../components/AppShell';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Card from '../components/Card';
import Combobox from '../components/Combobox';
import Cursor from '../components/Cursor';
import DualListbox from '../components/DualListbox';
import OnScreenText from '../components/OnScreenText';
import SceneTransition from '../components/SceneTransition';
import { popIn, fadeIn, slideIn } from '../utils/animations';

const EXISTING_PERSONAS = [
  { name: 'Account Executive', status: 'Active' },
  { name: 'Sales Manager', status: 'Active' },
  { name: 'Service Agent', status: 'Active' },
];

// Frame boundaries within Scene 5 (510 total)
// F12: 0–150   → left panel, click New Persona, form slides in
// F13: 150–300 → type name, license dropdown, profile filter
// F14: 300–510 → DualListbox moves, Create Persona, badge appears

const TYPING_TEXT = 'Sales Representative';

function typeAt(frame: number, start: number): string {
  const lettersPerFrame = 0.8;
  const charsTyped = Math.floor((frame - start) * lettersPerFrame);
  return TYPING_TEXT.slice(0, Math.max(0, charsTyped));
}

export default function Scene05_PersonaMapping() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const showForm = frame >= 30;
  const formSlide = showForm
    ? interpolate(frame, [30, 55], [80, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      })
    : 80;
  const formOpacity = showForm
    ? interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  const personaName = frame >= 50 ? typeAt(frame, 50) : '';
  const showLicenseOpen = frame >= 155 && frame < 200;
  const licenseSelected = frame >= 185 ? 'Salesforce CRM' : '';
  const showProfileHint = frame >= 200;
  const profileSelected = frame >= 230 ? 'Standard User' : '';

  // DualListbox: items move across at frame 310
  const movedCount = frame >= 310 ? Math.min(3, Math.floor((frame - 310) / 20)) : 0;
  const allPermSets = ['Cases - Read Write', 'Reports - Run', 'Sales Cloud - Standard', 'Dashboards - View', 'Campaigns - Basic'];
  const assignedPermSets = allPermSets.slice(0, movedCount);
  const availablePermSets = allPermSets.slice(movedCount);

  const movedGroupCount = frame >= 385 ? Math.min(2, Math.floor((frame - 385) / 20)) : 0;
  const allGroups = ['West Coast Sales', 'Sales Enablement', 'All Internal', 'Marketing'];
  const assignedGroups = allGroups.slice(0, movedGroupCount);
  const availableGroups = allGroups.slice(movedGroupCount);

  // New persona badge pop-in
  const newPersonaBadge = frame >= 450;
  const newPersonaScale = newPersonaBadge ? popIn(frame, fps, 450) : 0;

  const cursorWaypoints = [
    { frame: 20, x: 380, y: 260 },
    { frame: 40, x: 380, y: 260 },
    { frame: 50, x: 720, y: 320 },
    { frame: 150, x: 680, y: 360 },
    { frame: 185, x: 680, y: 400 },
    { frame: 230, x: 680, y: 440 },
    { frame: 310, x: 820, y: 520 },
    { frame: 380, x: 1100, y: 520 },
    { frame: 445, x: 820, y: 680 },
    { frame: 450, x: 820, y: 680 },
  ];

  const clicks = [
    { frame: 25 },
    { frame: 186 },
    { frame: 232 },
    { frame: 448 },
  ];

  return (
    <SceneTransition>
      <AbsoluteFill style={{ backgroundColor: colors.bgPage }}>
        <AppShell activeTab="Persona Mapping">
          <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            {/* Left panel: persona list */}
            <div
              style={{
                width: 280,
                backgroundColor: colors.bgWhite,
                borderRight: `1px solid ${colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                padding: spacing.lg,
                gap: spacing.md,
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
                <div style={{ fontSize: 14, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                  Personas ({EXISTING_PERSONAS.length + (newPersonaBadge ? 1 : 0)})
                </div>
                <Button label="+ New" variant="brand" size="sm" />
              </div>

              {EXISTING_PERSONAS.map((p) => (
                <div
                  key={p.name}
                  style={{
                    padding: `${spacing.md}px ${spacing.lg}px`,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.sm,
                    backgroundColor: colors.bgPage,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 13, fontFamily: font.family, fontWeight: font.weights.medium, color: colors.textPrimary }}>
                    {p.name}
                  </span>
                  <Badge label="Active" variant="success" />
                </div>
              ))}

              {/* New persona entry */}
              {newPersonaBadge && (
                <div
                  style={{
                    padding: `${spacing.md}px ${spacing.lg}px`,
                    border: `2px solid ${colors.success}`,
                    borderRadius: radius.sm,
                    backgroundColor: colors.successBg,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transform: `scale(${newPersonaScale})`,
                    transformOrigin: 'top center',
                  }}
                >
                  <span style={{ fontSize: 13, fontFamily: font.family, fontWeight: font.weights.semibold, color: colors.textPrimary }}>
                    Sales Representative
                  </span>
                  <Badge label="Active" variant="success" />
                </div>
              )}
            </div>

            {/* Right panel: form */}
            <div
              style={{
                flex: 1,
                padding: spacing.xxl,
                overflow: 'auto',
                opacity: formOpacity,
                transform: `translateX(${formSlide}px)`,
              }}
            >
              <div style={{ marginBottom: spacing.xl }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: font.weights.bold, color: colors.textPrimary }}>
                  New Persona
                </h2>
                <p style={{ margin: `${spacing.xs}px 0 0`, fontSize: 13, color: colors.textSecondary }}>
                  Define a reusable template: profile, license, role, permission sets, and groups.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xl }}>
                {/* Persona Name */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: font.weights.semibold, color: colors.textSecondary, display: 'block', marginBottom: spacing.xs }}>
                    Persona Name *
                  </label>
                  <div
                    style={{
                      height: 36,
                      border: `1px solid ${frame >= 50 && frame < 160 ? colors.sfBlue : colors.border}`,
                      borderRadius: radius.sm,
                      backgroundColor: colors.bgWhite,
                      display: 'flex',
                      alignItems: 'center',
                      padding: `0 ${spacing.md}px`,
                      fontSize: 14,
                      fontFamily: font.family,
                      color: colors.textPrimary,
                      boxShadow: frame >= 50 && frame < 160 ? `0 0 0 3px ${colors.sfBlue}30` : 'none',
                    }}
                  >
                    {personaName}
                    {frame >= 50 && frame < 160 && (
                      <span style={{ borderRight: `2px solid ${colors.textPrimary}`, height: 16, marginLeft: 1 }} />
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xl }}>
                  <Combobox
                    label="License Type *"
                    value={licenseSelected}
                    placeholder="Select license type..."
                    open={showLicenseOpen}
                    options={['Salesforce CRM', 'Partner Community', 'Service Cloud', 'Platform']}
                  />
                  <Combobox
                    label="Profile *"
                    value={profileSelected}
                    placeholder={licenseSelected ? 'Select profile...' : 'Select license first...'}
                    disabled={!licenseSelected}
                    hint={showProfileHint ? `Showing profiles for: ${licenseSelected}` : undefined}
                    open={frame >= 215 && frame < 240}
                    options={licenseSelected ? ['Standard User', 'System Administrator', 'Read Only', 'Custom: Sales User'] : []}
                  />
                  <Combobox
                    label="Role"
                    value=""
                    placeholder="Select role (optional)..."
                  />
                </div>

                {/* Permission Sets DualListbox */}
                {frame >= 290 && (
                  <DualListbox
                    label="Permission Sets"
                    availableItems={availablePermSets}
                    assignedItems={assignedPermSets}
                  />
                )}

                {/* Public Groups DualListbox */}
                {frame >= 360 && (
                  <DualListbox
                    label="Public Groups"
                    availableItems={availableGroups}
                    assignedItems={assignedGroups}
                  />
                )}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: spacing.md, paddingTop: spacing.md }}>
                  <Button label="Create Persona" variant="brand" />
                  <Button label="Cancel" variant="neutral" />
                </div>
              </div>
            </div>
          </div>
        </AppShell>

        <OnScreenText
          lines={[
            { text: 'Define once. Apply to every user in this role.', startFrame: 5 },
            { text: 'Profile · License · Role · Permission Sets · Groups', startFrame: 200 },
            { text: '3 permission sets. 2 groups. Saved.', startFrame: 400 },
          ]}
        />

        <Cursor waypoints={cursorWaypoints} clicks={clicks} />
      </AbsoluteFill>
    </SceneTransition>
  );
}
