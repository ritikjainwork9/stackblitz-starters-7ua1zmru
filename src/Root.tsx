import React from 'react';
import { Composition } from 'remotion';
import RaptUserMgmtDemo from './Composition';

// Inject Inter font from Google Fonts
const FontLoader: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
  `}</style>
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <FontLoader />
      <Composition
        id="RaptUserMgmtDemo"
        component={RaptUserMgmtDemo}
        durationInFrames={5700}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
