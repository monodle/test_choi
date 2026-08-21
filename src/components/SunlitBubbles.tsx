import React from 'react';

interface BubbleConfig {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  swayAmount: string;
}

interface SunGlintConfig {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

// 라이트모드용 햇빛 반사 비눗방울 설정
const BUBBLES: BubbleConfig[] = [
  { id: 1, left: '18%', size: 36, duration: '8.5s', delay: '0s', swayAmount: '24px' },
  { id: 2, left: '35%', size: 48, duration: '11.0s', delay: '2.3s', swayAmount: '-30px' },
  { id: 3, left: '55%', size: 28, duration: '7.8s', delay: '4.7s', swayAmount: '20px' },
  { id: 4, left: '72%', size: 52, duration: '10.2s', delay: '1.2s', swayAmount: '-28px' },
  { id: 5, left: '84%', size: 32, duration: '9.0s', delay: '5.8s', swayAmount: '22px' },
  { id: 6, left: '44%', size: 40, duration: '12.4s', delay: '7.5s', swayAmount: '-25px' },
  { id: 7, left: '63%', size: 24, duration: '8.0s', delay: '3.6s', swayAmount: '18px' },
];

// 햇빛 반짝임 글린트(Glint)
const SUN_GLINTS: SunGlintConfig[] = [
  { id: 1, top: '22%', left: '26%', size: '14px', delay: '0.5s', duration: '3.2s' },
  { id: 2, top: '15%', left: '68%', size: '18px', delay: '2.1s', duration: '4.0s' },
  { id: 3, top: '38%', left: '80%', size: '12px', delay: '1.4s', duration: '3.6s' },
  { id: 4, top: '48%', left: '38%', size: '16px', delay: '3.2s', duration: '4.5s' },
];

export const SunlitBubbles: React.FC = () => {
  return (
    <div className="sunlit-bubbles-wrapper" aria-hidden="true">
      {/* Sunlight Prismatic Glints */}
      {SUN_GLINTS.map((glint) => (
        <span
          key={`glint-${glint.id}`}
          className="sunlight-glint"
          style={
            {
              top: glint.top,
              left: glint.left,
              '--size': glint.size,
              '--delay': glint.delay,
              '--duration': glint.duration,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Floating Prismatic Soap Bubbles */}
      {BUBBLES.map((bubble) => (
        <div
          key={`bubble-${bubble.id}`}
          className="soap-bubble"
          style={
            {
              left: bubble.left,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              '--duration': bubble.duration,
              '--delay': bubble.delay,
              '--sway': bubble.swayAmount,
            } as React.CSSProperties
          }
        >
          <span className="bubble-specular-main" />
          <span className="bubble-specular-rim" />
          <span className="bubble-shimmer-color" />
        </div>
      ))}
    </div>
  );
};

export default SunlitBubbles;
