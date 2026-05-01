import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const modules = import.meta.glob('../assets/stickers/*.{png,jpg,jpeg,svg,gif}', { eager: true });
const STICKER_SOURCES = Object.values(modules).map((mod: any) => mod.default);

import together1 from '../assets/photos/together1.png';
import together2 from '../assets/photos/together2.png';
import together3 from '../assets/photos/together3.png';
import together4 from '../assets/photos/together4.png';
import together5 from '../assets/photos/together5.png';

const PHOTO_SOURCES = [together1, together2, together3, together4, together5];

// ── Placement algorithm ──────────────────────────────────────────────────────
// Stratified Best-Candidate: divide screen into N horizontal bands
// (one per sticker) for even top-to-bottom spread.

const CANDIDATES = 40;
const Y_MIN = 6;
const Y_MAX = 94;
const X_MIN = 6;
const X_MAX = 94;

function euclidean(ax: number, ay: number, bx: number, by: number) {
    const dx = ax - bx;
    const dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildPositions(count: number) {
    if (count === 0) return [];

    const bandHeight = (Y_MAX - Y_MIN) / count;
    const bandCenters = Array.from({ length: count }, (_, i) =>
        Y_MIN + bandHeight * i + bandHeight / 2
    );
    const shuffledBands = shuffle(bandCenters);

    const placed: { left: number; top: number }[] = [];
    const result: {
        top: number; left: number;
        rotate: number; scale: number; delay: number;
    }[] = [];

    for (let i = 0; i < count; i++) {
        const bandY = shuffledBands[i];
        const jitterRange = bandHeight * 0.4;

        let best = { left: 50, top: bandY };
        let bestScore = -1;

        for (let c = 0; c < CANDIDATES; c++) {
            const cx = Math.random() * (X_MAX - X_MIN) + X_MIN;
            const cy = bandY + (Math.random() * 2 - 1) * jitterRange;

            let minD = Number.MAX_VALUE;
            for (const p of placed) {
                const d = euclidean(cx, cy, p.left, p.top);
                if (d < minD) minD = d;
            }
            if (placed.length === 0) minD = Number.MAX_VALUE;

            if (minD > bestScore) {
                bestScore = minD;
                best = { left: cx, top: cy };
            }
        }

        placed.push(best);
        result.push({
            top:    Math.max(Y_MIN, Math.min(Y_MAX, best.top)),
            left:   best.left,
            rotate: getRandomInt(-15, 15),
            scale:  parseFloat((Math.random() * 0.40 + 0.60).toFixed(3)),
            delay:  parseFloat((Math.random() * 2.0).toFixed(2)),
        });
    }

    return result;
}

// ────────────────────────────────────────────────────────────────────────────

interface RandomStickersProps {
    isDraggable?: boolean;
    desaturate?: boolean;
    useStickersFolder?: boolean;
    count?: number;
}

const RandomStickers = ({ isDraggable = true, desaturate = false, useStickersFolder = false, count = 5 }: RandomStickersProps) => {
    const [positions, setPositions] = useState<
        { top: number; left: number; rotate: number; scale: number; delay: number }[]
    >([]);
    const [sources, setSources] = useState<string[]>([]);

    useEffect(() => {
        let selectedSources = PHOTO_SOURCES;
        
        if (useStickersFolder && STICKER_SOURCES.length > 0) {
            const shuffled = shuffle(STICKER_SOURCES);
            selectedSources = shuffled.slice(0, Math.min(count, shuffled.length));
        } else {
            selectedSources = PHOTO_SOURCES.slice(0, count);
        }

        setSources(selectedSources);
        setPositions(buildPositions(selectedSources.length));
    }, [useStickersFolder, count]);

    if (positions.length === 0 || sources.length === 0) return null;

    // Cap sticker size dynamically
    const maxSize = typeof window !== 'undefined'
        ? Math.min(window.innerWidth * 0.28, 150)
        : 150;

    return (
        <div 
            className="absolute inset-0 overflow-hidden pointer-events-none" 
            style={{ zIndex: 1, isolation: 'isolate' }}
        >
            {sources.map((src, i) => {
                const pos = positions[i];
                if (!pos) return null;

                return (
                    <motion.img
                        key={i}
                        src={src}
                        alt="memory"
                        draggable={false}
                        drag={isDraggable}
                        dragElastic={0.1}
                        whileHover={isDraggable ? { scale: (pos.scale) * 1.1, cursor: 'grab' } : undefined}
                        whileDrag={isDraggable ? { scale: (pos.scale) * 1.2, cursor: 'grabbing', zIndex: 100 } : undefined}
                        initial={{ opacity: 0, scale: 0, rotate: pos.rotate - 15 }}
                        animate={{
                            opacity: desaturate ? 0.5 : 0.85,
                            scale: pos.scale,
                            rotate: pos.rotate,
                        }}
                        transition={{
                            duration: 0.9,
                            delay: pos.delay,
                            type: 'spring',
                            stiffness: 140,
                            damping: 16,
                        }}
                        className={`absolute drop-shadow-lg ${isDraggable ? 'pointer-events-auto' : 'pointer-events-none'}`}
                        style={{
                            top:       `${pos.top}%`,
                            left:      `${pos.left}%`,
                            transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                            maxWidth:  `${maxSize}px`,
                            maxHeight: `${maxSize}px`,
                            boxShadow: '2px 3px 10px rgba(0,0,0,0.3)',
                            filter:    desaturate ? 'saturate(0.5) blur(1px)' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.15))',
                            borderRadius: '2px',
                        }}
                    />
                );
            })}
        </div>
    );
};

export default RandomStickers;
