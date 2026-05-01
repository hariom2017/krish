import { useRef, useEffect } from 'react';

interface RainEffectProps {
  intensity?: 'normal' | 'heavy';
}

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

const RainEffect = ({ intensity = 'normal' }: RainEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize drops
    const count = intensity === 'heavy' ? 90 : 60;
    const baseOpacity = intensity === 'heavy' ? 0.25 : 0.15;
    const maxOpacity = intensity === 'heavy' ? 0.5 : 0.35;

    dropsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 2 + Math.random() * 3,
      length: 10 + Math.random() * 10,
      opacity: baseOpacity + Math.random() * (maxOpacity - baseOpacity),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const drop of dropsRef.current) {
        const dx = drop.speed * 0.3;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + dx, drop.y + drop.length);
        ctx.strokeStyle = `rgba(200, 210, 220, ${drop.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Move drop
        drop.y += drop.speed;
        drop.x += dx * 0.15;

        // Reset if off screen
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default RainEffect;
