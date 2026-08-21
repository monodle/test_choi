import React from 'react';

interface ShootingStarConfig {
  id: number;
  top: string;
  left: string;
  width: string;
  angle: string;
  delay: string;
  duration: string;
}

interface TwinkleStarConfig {
  id: number;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
  color?: string;
}

// 은은하고 자연스럽게 가끔 떨어지는 3개의 별똥별 (각도와 궤적을 각각 다르게 구성)
const SHOOTING_STARS: ShootingStarConfig[] = [
  { id: 1, top: '-20px', left: '25%', width: '170px', angle: '38deg', delay: '0s', duration: '2.4s' },
  { id: 2, top: '20px', left: '60%', width: '190px', angle: '48deg', delay: '5.2s', duration: '2.8s' },
  { id: 3, top: '-10px', left: '42%', width: '150px', angle: '32deg', delay: '10.5s', duration: '2.5s' },
];

const TWINKLE_STARS: TwinkleStarConfig[] = [
  { id: 1, top: '10%', left: '15%', size: '2px', delay: '0.2s', duration: '3.1s' },
  { id: 2, top: '18%', left: '35%', size: '2.5px', delay: '1.4s', duration: '4.2s', color: 'rgba(229, 184, 105, 0.9)' },
  { id: 3, top: '28%', left: '72%', size: '2px', delay: '0.8s', duration: '2.8s' },
  { id: 4, top: '12%', left: '85%', size: '2px', delay: '2.1s', duration: '3.5s' },
  { id: 5, top: '35%', left: '50%', size: '3px', delay: '1.1s', duration: '4.0s', color: 'rgba(229, 184, 105, 0.85)' },
  { id: 6, top: '42%', left: '22%', size: '2px', delay: '2.7s', duration: '3.2s' },
  { id: 7, top: '8%', left: '58%', size: '2.5px', delay: '1.6s', duration: '3.7s' },
];

export const ShootingStars: React.FC = () => {
  return (
    <div className="shooting-stars-wrapper" aria-hidden="true">
      {/* Background Twinkling Stars */}
      {TWINKLE_STARS.map((star) => (
        <span
          key={`twinkle-${star.id}`}
          className="twinkle-star"
          style={
            {
              top: star.top,
              left: star.left,
              '--size': star.size,
              '--delay': star.delay,
              '--duration': star.duration,
              '--color': star.color || '#ffffff',
            } as React.CSSProperties
          }
        />
      ))}

      {/* Meteors / Shooting Stars */}
      {SHOOTING_STARS.map((star) => (
        <span
          key={`shooting-${star.id}`}
          className="shooting-star"
          style={
            {
              top: star.top,
              left: star.left,
              width: star.width,
              '--angle': star.angle,
              '--delay': star.delay,
              '--duration': star.duration,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default ShootingStars;
