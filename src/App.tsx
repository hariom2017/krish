import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMidnight } from './hooks/useMidnight';
import { CountdownTimer } from './components/CountdownTimer';
import RandomStickers from './components/RandomStickers';
import { Envelope } from './components/Envelope';
import LetterReveal from './components/LetterReveal';
import RainEffect from './components/RainEffect';
import CloudLayer from './components/CloudLayer';

// ── Phase type ───────────────────────────────────────────────────────────
type Phase = 'countdown' | 'envelope' | 'peek' | 'letter';

// ═══════════════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════════════

function App() {
    const { isMidnight, timeLeft } = useMidnight();
    const [phase, setPhase] = useState<Phase>('countdown');

    // ── Auto-transition to envelope at midnight ─────────────────────────
    useEffect(() => {
        if (isMidnight && phase === 'countdown') {
            setPhase('envelope');
        }
    }, [isMidnight, phase]);

    // ── Phase handlers ──────────────────────────────────────────────────
    const handleFlapOpen = () => setPhase('peek');
    const handleLetterTap = () => setPhase('letter');

    // ── Determine atmosphere ────────────────────────────────────────────
    const showRain = phase === 'countdown' || phase === 'envelope' || phase === 'peek';
    const rainIntensity = phase === 'envelope' || phase === 'peek' ? 'heavy' : 'normal';
    const bgDarkness = phase === 'countdown'
        ? '#1A1410'
        : phase === 'letter'
            ? '#0F0B08'
            : '#0F0B08';

    return (
        <div className="app">
            <div className="app-inner" style={{ background: bgDarkness, transition: 'background 1s ease' }}>

                {/* ── Atmospheric layers (always present) ─────────── */}
                <CloudLayer />
                {showRain && <RainEffect intensity={rainIntensity as 'normal' | 'heavy'} />}

                {/* ── Candle glow (countdown only) ────────────────── */}
                {phase === 'countdown' && <div className="candle-glow" />}

                {/* ── Phase content ───────────────────────────────── */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                        minHeight: '100dvh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: phase === 'letter' ? 'flex-start' : 'center',
                        pointerEvents: phase === 'letter' ? 'auto' : 'none',
                        overflow: phase === 'letter' ? 'auto' : 'hidden',
                    }}
                >
                    <AnimatePresence mode="wait">

                        {/* ════════════════════════════════════════════
                            PHASE 1: COUNTDOWN
                            ════════════════════════════════════════════ */}
                        {phase === 'countdown' && (
                            <motion.div
                                key="countdown"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, filter: 'blur(8px)' }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    pointerEvents: 'auto',
                                }}
                            >
                                {/* Scattered photo stickers behind timer */}
                                <RandomStickers isDraggable={true} useStickersFolder={true} count={12} />

                                {/* Title and Timer Content — positioned above stickers */}
                                <div style={{ position: 'relative', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {/* Title */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        style={{
                                            fontFamily: "'Gaegu', cursive",
                                            color: '#D4C5A9',
                                            textAlign: 'center',
                                            fontSize: 'clamp(16px, 4.5vw, 22px)',
                                            lineHeight: 1.65,
                                            maxWidth: '78%',
                                            textShadow: '0 0 20px rgba(220, 160, 80, 0.3)',
                                            marginBottom: '8px'
                                        }}
                                    >
                                        A few moments before my favorite smile boards a flight.
                                    </motion.div>

                                    {/* Subtitle */}
                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        style={{
                                            fontFamily: "'Gaegu', cursive",
                                            fontSize: 'clamp(11px, 3vw, 13px)',
                                            color: 'rgba(180,160,130,0.6)',
                                            letterSpacing: '0.12em',
                                            marginBottom: '16px'
                                        }}
                                    >
                                        May 16, 2026
                                    </motion.div>

                                    {/* Countdown timer */}
                                    <CountdownTimer timeLeft={timeLeft} />
                                </div>
                            </motion.div>
                        )}

                        {/* ════════════════════════════════════════════
                            PHASE 2 & 3: ENVELOPE + PEEK
                            ════════════════════════════════════════════ */}
                        {(phase === 'envelope' || phase === 'peek') && (
                            <motion.div
                                key="envelope"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
                                transition={{ duration: 0.8 }}
                                style={{ pointerEvents: 'auto' }}
                            >
                                <Envelope
                                    phase={phase}
                                    onFlapOpen={handleFlapOpen}
                                    onLetterTap={handleLetterTap}
                                />
                            </motion.div>
                        )}

                        {/* ════════════════════════════════════════════
                            PHASE 4: LETTER
                            ════════════════════════════════════════════ */}
                        {phase === 'letter' && (
                            <motion.div
                                key="letter"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    width: '100%',
                                    pointerEvents: 'auto',
                                }}
                            >
                                <LetterReveal />
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default App;
