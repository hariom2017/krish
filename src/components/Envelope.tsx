import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
    phase: 'envelope' | 'peek';
    onFlapOpen: () => void;
    onLetterTap: () => void;
}

export const Envelope = ({ phase, onFlapOpen, onLetterTap }: EnvelopeProps) => {
    const isFlapOpen = phase === 'peek';

    const handleEnvelopeTap = () => {
        if (phase === 'envelope') {
            onFlapOpen();
        }
    };

    const handleLetterTap = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        if (phase === 'peek') {
            onLetterTap();
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], type: 'tween' }}
        >
            {/* Swaying wrapper */}
            <div
                className={phase === 'envelope' ? 'envelope-sway' : ''}
                onClick={handleEnvelopeTap}
            >
                <div className="envelope-container tappable" style={{ perspective: '800px' }}>

                    {/* ── Envelope back (shadow catcher) ──────────────── */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: '#C4A56A',
                            borderRadius: '4px',
                            zIndex: 0,
                        }}
                    />

                    {/* ── Envelope body (front face) ──────────────────── */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'var(--envelope-cream)',
                            borderRadius: '0 0 4px 4px',
                            zIndex: 10,
                            overflow: 'hidden',
                            boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.06)',
                        }}
                    >
                        {/* Front fold triangle (bottom) */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(180, 150, 100, 0.08)',
                                clipPath: 'polygon(0 40%, 50% 100%, 100% 40%)',
                            }}
                        />

                        {/* Address content */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '35%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                textAlign: 'center',
                                fontFamily: "'Gaegu', cursive",
                                color: 'var(--letter-ink)',
                                zIndex: 5,
                            }}
                        >
                            <div style={{ fontSize: 'clamp(12px, 3.5vw, 16px)', opacity: 0.6, marginBottom: '4px' }}>
                                To,
                            </div>
                            <div style={{ fontSize: 'clamp(18px, 5.5vw, 26px)', fontWeight: 700 }}>
                                Shraddha
                            </div>
                            <div style={{
                                marginTop: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                alignItems: 'center',
                                opacity: 0.25,
                            }}>
                                <div style={{ width: 'clamp(100px, 30vw, 160px)', height: '1px', background: 'var(--letter-ink)' }} />
                                <div style={{ width: 'clamp(80px, 24vw, 130px)', height: '1px', background: 'var(--letter-ink)' }} />
                            </div>
                        </div>

                        {/* Postage stamp corner */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '8%',
                                right: '8%',
                                width: 'clamp(28px, 8vw, 40px)',
                                height: 'clamp(34px, 10vw, 48px)',
                                border: '2px solid rgba(139, 105, 20, 0.3)',
                                borderRadius: '2px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'clamp(14px, 4vw, 20px)',
                                background: 'rgba(255,240,210,0.5)',
                            }}
                        >
                            ♡
                        </div>
                    </div>

                    {/* ── Envelope flap (top triangle) ────────────────── */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '55%',
                            transformStyle: 'preserve-3d',
                            transformOrigin: 'top center',
                            zIndex: isFlapOpen ? 5 : 20,
                            cursor: 'pointer',
                        }}
                        animate={{
                            rotateX: isFlapOpen ? -180 : 0,
                        }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        {/* Front of flap */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'var(--envelope-cream)',
                                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                                backfaceVisibility: 'hidden',
                                filter: 'brightness(0.96)',
                            }}
                        >
                            {/* Fold line */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '20%',
                                    left: '25%',
                                    right: '25%',
                                    height: '1px',
                                    background: 'rgba(139, 105, 20, 0.12)',
                                    transform: 'rotate(-2deg)',
                                }}
                            />
                        </div>

                        {/* Back of flap (airmail lining) — visible when flap opens */}
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                                backfaceVisibility: 'hidden',
                                transform: 'rotateX(180deg)',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="airmail-stripe" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </motion.div>

                    {/* ── Wax seal ─────────────────────────────────────── */}
                    <motion.div
                        className="wax-seal"
                        style={{
                            position: 'absolute',
                            top: '55%',
                            left: '50%',
                            x: '-50%',
                            y: '-50%',
                            zIndex: isFlapOpen ? 4 : 25,
                        }}
                        animate={{
                            opacity: isFlapOpen ? 0 : 1,
                            scale: isFlapOpen ? 0.5 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        K
                    </motion.div>

                    {/* ── Peeking letter (Phase: peek) ────────────────── */}
                    <AnimatePresence>
                        {isFlapOpen && (
                            <motion.div
                                className="tappable"
                                onClick={handleLetterTap}
                                style={{
                                    position: 'absolute',
                                    left: '6%',
                                    right: '6%',
                                    bottom: '20%',
                                    height: '80%',
                                    background: 'var(--letter-bg)',
                                    borderRadius: '2px 2px 0 0',
                                    zIndex: 8,
                                    cursor: 'pointer',
                                    boxShadow: '0 -2px 10px rgba(0,0,0,0.15)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    paddingTop: 'clamp(14px, 4vw, 22px)',
                                    paddingLeft: 'clamp(20px, 6vw, 32px)',
                                }}
                                initial={{ y: 0 }}
                                animate={{ y: '-45%' }}
                                exit={{ y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                            >
                                {/* Fold crease lines */}
                                <div style={{
                                    position: 'absolute',
                                    top: '33%',
                                    left: '5%',
                                    right: '5%',
                                    height: '1px',
                                    background: 'rgba(100,80,60,0.15)',
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '66%',
                                    left: '5%',
                                    right: '5%',
                                    height: '1px',
                                    background: 'rgba(100,80,60,0.15)',
                                }} />

                                <span
                                    style={{
                                        fontFamily: "'Gaegu', cursive",
                                        fontSize: 'clamp(16px, 4.5vw, 20px)',
                                        fontWeight: 700,
                                        color: 'var(--letter-ink)',
                                        opacity: 0.7,
                                    }}
                                >
                                    To Shraddha,
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* ── Prompt text below envelope ───────────────────── */}
            <AnimatePresence mode="wait">
                {phase === 'envelope' && (
                    <motion.p
                        key="tap-envelope"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            marginTop: 'clamp(20px, 5vw, 32px)',
                            fontFamily: "'Gaegu', cursive",
                            fontSize: 'clamp(16px, 4.5vw, 20px)',
                            color: '#E8D5B0',
                        }}
                    >
                        tap to open 💌
                    </motion.p>
                )}
                {phase === 'peek' && (
                    <motion.p
                        key="tap-letter"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            marginTop: 'clamp(20px, 5vw, 32px)',
                            fontFamily: "'Gaegu', cursive",
                            fontSize: 'clamp(14px, 3.8vw, 18px)',
                            color: '#C4956A',
                        }}
                    >
                        (tap the letter to read)
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
