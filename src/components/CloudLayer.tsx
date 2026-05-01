import { useMemo } from 'react';

/* ── Cloud shapes ──────────────────────────────────────────────────────── */
/* Each cloud is a cluster of overlapping CSS circles.                     */

interface CloudProps {
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  layer: 'bg' | 'fg';
}

const Cloud = ({ top, size, duration, delay, opacity, layer }: CloudProps) => {
  const color = layer === 'bg' ? '#6B7A87' : '#4A5568';
  const scale = size / 100;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        width: `${140 * scale}px`,
        height: `${60 * scale}px`,
        opacity,
        zIndex: layer === 'bg' ? 2 : 3,
        animation: `cloud-drift ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: 'none' as const,
        willChange: 'transform',
      }}
    >
      {/* Main body */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: `${20 * scale}px`,
          width: `${100 * scale}px`,
          height: `${30 * scale}px`,
          borderRadius: '50%',
          background: color,
        }}
      />
      {/* Left puff */}
      <div
        style={{
          position: 'absolute',
          bottom: `${10 * scale}px`,
          left: `${10 * scale}px`,
          width: `${50 * scale}px`,
          height: `${40 * scale}px`,
          borderRadius: '50%',
          background: color,
        }}
      />
      {/* Center puff (tallest) */}
      <div
        style={{
          position: 'absolute',
          bottom: `${12 * scale}px`,
          left: `${40 * scale}px`,
          width: `${60 * scale}px`,
          height: `${48 * scale}px`,
          borderRadius: '50%',
          background: color,
        }}
      />
      {/* Right puff */}
      <div
        style={{
          position: 'absolute',
          bottom: `${8 * scale}px`,
          left: `${80 * scale}px`,
          width: `${45 * scale}px`,
          height: `${35 * scale}px`,
          borderRadius: '50%',
          background: color,
        }}
      />
    </div>
  );
};

/* ── Cloud Layer ───────────────────────────────────────────────────────── */

const CloudLayer = () => {
  const clouds = useMemo<CloudProps[]>(() => [
    // Background layer — slow, large, subtle
    { top: '2%',  size: 120, duration: 120, delay: -100, opacity: 0.4, layer: 'bg' },
    { top: '8%',  size: 90,  duration: 140, delay: -40,  opacity: 0.35, layer: 'bg' },
    { top: '18%', size: 100, duration: 110, delay: -80,  opacity: 0.3,  layer: 'bg' },
    { top: '30%', size: 80,  duration: 130, delay: -20,  opacity: 0.25, layer: 'bg' },

    // Foreground layer — faster, darker
    { top: '5%',  size: 110, duration: 60,  delay: -50,  opacity: 0.55, layer: 'fg' },
    { top: '12%', size: 85,  duration: 70,  delay: -10,  opacity: 0.5,  layer: 'fg' },
    { top: '25%', size: 95,  duration: 55,  delay: -35,  opacity: 0.45, layer: 'fg' },
    { top: '35%', size: 70,  duration: 65,  delay: -60,  opacity: 0.4,  layer: 'fg' },
  ], []);

  return (
    <>
      {/* Inject keyframes */}
      <style>{`
        @keyframes cloud-drift {
          from { transform: translateX(110vw); }
          to   { transform: translateX(-30vw); }
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        {clouds.map((c, i) => (
          <Cloud key={i} {...c} />
        ))}
      </div>
    </>
  );
};

export default CloudLayer;
