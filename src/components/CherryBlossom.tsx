import React, { useEffect, useRef } from 'react';

interface FallingPetal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  baseOpacity: number;
  swayAmp: number;
  swaySpeed: number;
  swayOffset: number;
}

const PETAL_COLORS = [
  '#ffd1dc',
  '#ffb7c5',
  '#ffaec0',
  '#ffe4ea',
  '#ffccd7',
  '#ffffff',
];

export const CherryBlossom: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 1100);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 1100;
    };

    window.addEventListener('resize', handleResize);

    const MAX_PETALS = 48;
    const petals: FallingPetal[] = [];

    const createPetal = (spawnFromTop = true): FallingPetal => {
      return {
        x: Math.random() * width,
        y: spawnFromTop ? -20 - Math.random() * 80 : Math.random() * height,
        size: 5.5 + Math.random() * 4.5,
        speedY: 1.0 + Math.random() * 1.5,
        speedX: 0.25 + Math.random() * 0.65,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.035,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.025 + Math.random() * 0.035,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        baseOpacity: 0.85 + Math.random() * 0.15,
        swayAmp: 1.0 + Math.random() * 1.6,
        swaySpeed: 0.02 + Math.random() * 0.025,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    // 초기 꽃잎 생성 (화면 전체에 골고루 분포)
    for (let i = 0; i < MAX_PETALS; i++) {
      petals.push(createPetal(false));
    }

    // 벚꽃잎 하나 그리기 함수
    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      flip: number,
      color: string,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.scale(1, Math.cos(flip));

      c.globalAlpha = Math.max(0, Math.min(1, opacity));
      c.fillStyle = color;
      c.shadowColor = 'rgba(244, 114, 182, 0.2)';
      c.shadowBlur = 2;

      c.beginPath();
      // 전형적인 벚꽃잎 곡선 (오목한 하트 물방울)
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.7, -size * 0.8, size * 0.9, size * 0.3, 0, size);
      c.bezierCurveTo(-size * 0.9, size * 0.3, -size * 0.7, -size * 0.8, 0, -size);
      c.fill();

      // 꽃잎 중심부 미세 하이라이트
      c.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      c.lineWidth = 0.4;
      c.beginPath();
      c.moveTo(0, -size * 0.6);
      c.lineTo(0, size * 0.5);
      c.stroke();

      c.restore();
    };

    // 메인 렌더 루프
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const fadeStartDistance = 90; // Marquee 영역 진입 시 페이드아웃 시작 거리
      const fadeStartY = height - fadeStartDistance;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // 물리 좌표 업데이트
        p.swayOffset += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayOffset) * p.swayAmp;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        p.flip += p.flipSpeed;

        // 상단 페이드인 & 하단 페이드아웃 계산
        let currentOpacity = p.baseOpacity;

        // 상단 등장 시 부드러운 페이드인
        if (p.y < 40) {
          currentOpacity *= Math.max(0, (p.y + 20) / 60);
        }

        // Marquee 영역 도달 시 부드러운 페이드아웃
        if (p.y > fadeStartY) {
          const fadeProgress = (p.y - fadeStartY) / fadeStartDistance;
          currentOpacity *= Math.max(0, 1 - fadeProgress);
        }

        // Marquee 하단 경계(height)에 도달하거나 화면 좌우를 벗어나면 즉시 상단 재생성
        if (p.y >= height || currentOpacity <= 0.02 || p.x > width + 40 || p.x < -40) {
          petals[i] = createPetal(true);
        } else {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.flip, p.color, currentOpacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="cherry-blossom-wrapper" aria-hidden="true">
      {/* Gradual Soft Pink Ambient Background Tint */}
      <div className="sakura-ambient-tint" />
      <canvas ref={canvasRef} className="cherry-blossom-canvas" />
    </div>
  );
};

export default CherryBlossom;
