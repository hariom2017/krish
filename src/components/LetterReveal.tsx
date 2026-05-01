import React from 'react';
import { motion } from 'framer-motion';

// ── Photo imports ────────────────────────────────────────────────────────
import together1 from '../assets/photos/together1.png';
import together2 from '../assets/photos/together2.png';
import together3 from '../assets/photos/together3.png';
import together4 from '../assets/photos/together4.png';
import together5 from '../assets/photos/together5.png';

// ── Sticker config ───────────────────────────────────────────────────────
const STICKERS = [
    { src: together1, className: 'sticker-1', tape: 'var(--tape-yellow)', delay: 0.3 },
    { src: together2, className: 'sticker-2', tape: 'var(--tape-pink)',   delay: 0.5 },
    { src: together3, className: 'sticker-3', tape: 'var(--tape-blue)',   delay: 0.7 },
    { src: together4, className: 'sticker-4', tape: 'var(--tape-yellow)', delay: 0.9 },
    { src: together5, className: 'sticker-5', tape: 'var(--tape-pink)',   delay: 1.1 },
];

const StickerImage = ({ sticker, index, float }: { sticker: any, index: number, float: 'left' | 'right' }) => (
    <motion.div
        className="sticker-float"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: sticker.delay + 0.5, duration: 0.5, type: 'spring', stiffness: 150 }}
        style={{
            float,
            margin: float === 'left' ? '6px 18px 12px -20px' : '6px -20px 12px 18px',
            transform: `rotate(${index % 2 === 0 ? -6 : 8}deg)`,
            position: 'relative',
            zIndex: 10,
        }}
    >
        <div className="sticker-tape" style={{ background: sticker.tape }} />
        <img
            src={sticker.src}
            alt="memory"
            style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '1px',
            }}
        />
    </motion.div>
);

// ── Heart SVG doodle ─────────────────────────────────────────────────────
const HeartDoodle = ({ style }: { style: React.CSSProperties }) => (
    <svg
        viewBox="0 0 24 24"
        style={{
            position: 'absolute',
            width: 'clamp(18px, 5vw, 28px)',
            opacity: 0.25,
            pointerEvents: 'none',
            ...style,
        }}
    >
        <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="none"
            stroke="#8B3A2A"
            strokeWidth="1.5"
            strokeDasharray="3 2"
        />
    </svg>
);

// ── Postmark Stamp SVG ───────────────────────────────────────────────────
const PostmarkStamp = ({ style }: { style: React.CSSProperties }) => (
    <svg
        viewBox="0 0 250 120"
        style={{
            position: 'absolute',
            width: 'clamp(160px, 40vw, 260px)',
            pointerEvents: 'none',
            zIndex: 15,
            ...style,
        }}
    >
        <g stroke="#A65D50" fill="none" opacity="0.6" transform="rotate(-8 170 60)">
            {/* Cancellation waves (4 wavy lines) */}
            <path d="M 0 35 Q 15 20 30 35 T 60 35 T 90 35 T 120 35 T 150 35" strokeWidth="1.5" />
            <path d="M 0 50 Q 15 35 30 50 T 60 50 T 90 50 T 120 50 T 150 50" strokeWidth="1.5" />
            <path d="M 0 65 Q 15 50 30 65 T 60 65 T 90 65 T 120 65 T 150 65" strokeWidth="1.5" />
            <path d="M 0 80 Q 15 65 30 80 T 60 80 T 90 80 T 120 80 T 150 80" strokeWidth="1.5" />

            {/* Outer double ring */}
            <circle cx="180" cy="60" r="45" strokeWidth="2.5" />
            <circle cx="180" cy="60" r="41" strokeWidth="1" />

            {/* Inner ring */}
            <circle cx="180" cy="60" r="26" strokeWidth="1" strokeDasharray="3 2" />

            {/* Circular Path for Text */}
            <defs>
                <path id="top-curve" d="M 144 60 A 36 36 0 0 1 216 60" />
                <path id="bottom-curve" d="M 216 60 A 36 36 0 0 1 144 60" />
            </defs>

            {/* Circular Text */}
            <text fontFamily="'Courier New', monospace" fontWeight="bold" fontSize="13" fill="#A65D50" stroke="none">
                <textPath href="#top-curve" startOffset="50%" textAnchor="middle" letterSpacing="2">WITH LOVE</textPath>
            </text>
            <text fontFamily="'Courier New', monospace" fontWeight="bold" fontSize="13" fill="#A65D50" stroke="none">
                <textPath href="#bottom-curve" startOffset="50%" textAnchor="middle" letterSpacing="4">♡ ♡ ♡</textPath>
            </text>

            {/* Center Heart */}
            <path 
                d="M180,65 c-0.8-0.8-7-7-7-10.5 c0-2.5,2-4.5,4.5-4.5 c1.5,0,2.8,0.7,3.5,1.8 c0.7-1.1,2-1.8,3.5-1.8 c2.5,0,4.5,2,4.5,4.5 C189,58,180.8,64.2,180,65 z" 
                fill="#A65D50" 
                stroke="none" 
            />
        </g>
    </svg>
);

// ── Letter paragraphs ────────────────────────────────────────────────────
const PARAGRAPHS = [
    { text: "Funny how sometimes the most unexpected people become the most unforgettable part of your life." },
    { text: "I didn't know that replying to one story would become one of my favorite decisions. I never thought one random reply would turn into late-night convos, movie scenes, shy moments, and memories that would start meaning this much to me." },
    { text: "You came into my life unexpectedly, yet in such a short time, you gave me memories that feel rare… the kind people usually search years for." },
    { text: "I still remember the first time we properly met at your place… that hug." },
    { text: "I don't know if you realized it then, but for me, it felt like time paused for a second. It felt warm, safe… and honestly, I didn't want that moment to end." },
    { text: "And then there was you…" },
    { text: "Your pretty eyes, your cute smile, and that shy little version of you that appeared every time I said something cringe or flirty." },
    { text: "I don't know if you realize it, but those tiny reactions of yours became some of my favorite memories." },
    { text: "Maybe that's when I realized there was something different about you.", special: true as const },
    { text: "Maybe it was in how much we somehow had in common… like listening to the exact same song at the same time while being miles apart." },
    { text: "And then there was our movie date…" },
    { text: "I probably won't remember the movie as much as I'll remember you sitting beside me." },
    { text: "You thought I didn't enjoy it enough… but if only you knew... the best part was never the screen, it was your company." },
    { text: "The voucher confusion, awkward KFC ordering, our tiny little mistakes… even waiting to share the last part of our cone ice cream, maybe to anyone else, these were small things." },
    { text: "But with you… even the smallest moments felt special." },
    { text: "Your handwritten letter, the Monster, the little things you remembered about me…" },
    { text: "All of it means more than I probably say out loud." },
    { text: "You made me feel seen.", emphasis: true as const },
    { text: "And trust me… that's rare.", italic: true as const },
    { text: "Maybe it's a sweet coincidence…" },
    { text: "I'm Krish, and somewhere in your name, there's Radha.", krish_radha: true as const },
    { text: "I don't know what life has written for us… maybe our story won't be perfect, maybe it'll stay unfinished… but some stories are still beautiful enough to be admired, simply because they happened." },
    { text: "So Truly Thank you…" },
    { text: "For your time, your warmth, your effort, your smile, your shy moments, your heart…" },
    { text: "Wherever Bangalore takes you, wherever life pushes us…" },
    { text: "I'll always be grateful that in this huge world, somehow… I got my Summer chapter." },
    { text: "So chase your dreams, do everything your heart wants, become everything you're meant to be…" },
    { text: "And somewhere between all of it, I hope you remember…" },
    { text: "That there was once a guy named Krish" },
    { text: "Who genuinely cherished knowing you." },
    { text: "And if life ever feels heavy…" },
    { text: "Please remember, you can always reach out to me. Anytime. Without hesitation." },
    { text: "And lastly… because I know you love quotes :—" },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const LetterReveal = () => {
    return (
        <motion.div
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100dvh',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 'clamp(24px, 6vw, 48px)',
                paddingBottom: 'clamp(40px, 10vw, 80px)',
                background: 'linear-gradient(180deg, #0F0B08 0%, #1A1410 20%, #0F0B08 100%)',
                overflow: 'visible',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* ── Background blurred stickers ─────────────────── */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                {STICKERS.map((s, i) => (
                    <motion.img
                        key={`bg-${i}`}
                        src={s.src}
                        alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.06 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                        style={{
                            position: 'absolute',
                            width: 'clamp(120px, 35vw, 200px)',
                            filter: 'blur(3px) saturate(0.4)',
                            top: `${10 + i * 18}%`,
                            left: i % 2 === 0 ? '-5%' : '70%',
                            transform: `rotate(${-15 + i * 8}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* ── Letter unfold animation ─────────────────────── */}
            <motion.div
                initial={{ scaleY: 0.35, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                style={{
                    transformOrigin: 'top center',
                    position: 'relative',
                    zIndex: 5,
                }}
            >
                <div className="letter-paper" id="letter-paper">

                    {/* ── Washi tape strips at top ────────────── */}
                    <div className="tape tape-yellow" style={{ top: '-8px', left: '8%', transform: 'rotate(-8deg)' }} />
                    <div className="tape tape-pink"   style={{ top: '-6px', right: '12%', transform: 'rotate(5deg)' }} />
                    <div className="tape tape-blue"   style={{ top: '2px', left: '35%', transform: 'rotate(-2deg)' }} />
                    <div className="tape tape-yellow" style={{ top: '-4px', right: '35%', transform: 'rotate(12deg)' }} />

                    {/* ── Postmark stamp ───────────────────────── */}
                    <PostmarkStamp style={{ top: 'clamp(-15px, -3vw, 5px)', right: 'clamp(10px, 2vw, 24px)' }} />

                    {/* ── Fold crease lines ────────────────────── */}
                    <div style={{
                        position: 'absolute',
                        top: '33.3%',
                        left: '3%',
                        right: '3%',
                        height: '1px',
                        background: 'rgba(100,80,60,0.12)',
                        pointerEvents: 'none',
                        zIndex: 15,
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '66.6%',
                        left: '3%',
                        right: '3%',
                        height: '1px',
                        background: 'rgba(100,80,60,0.12)',
                        pointerEvents: 'none',
                        zIndex: 15,
                    }} />

                    {/* ══════════════════════════════════════════════
                        LETTER CONTENT
                        ══════════════════════════════════════════════ */}
                    <div className="letter-content" style={{ position: 'relative', zIndex: 5 }}>

                        {/* Salutation */}
                        <motion.p
                            className="letter-salutation"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            To Shraddha,
                        </motion.p>

                        {/* Body paragraphs */}
                        {PARAGRAPHS.map((para, i) => {
                            let className = 'letter-paragraph';
                            let style: React.CSSProperties = {};

                            if ('emphasis' in para && para.emphasis) {
                                className += ' letter-emphasis';
                            }
                            if ('italic' in para && para.italic) {
                                className += ' letter-italic';
                            }
                            if ('krish_radha' in para && para.krish_radha) {
                                className += ' letter-special';
                            }

                            // First letter of entire letter — slightly larger
                            const isFirst = i === 0;

                            // Insert floated stickers at specific intervals
                            let stickerNode = null;
                            if (i === 0) {
                                stickerNode = <StickerImage sticker={STICKERS[0]} index={0} float="left" />;
                            } else if (i === 6) {
                                stickerNode = <StickerImage sticker={STICKERS[1]} index={1} float="right" />;
                            } else if (i === 13) {
                                stickerNode = <StickerImage sticker={STICKERS[2]} index={2} float="left" />;
                            } else if (i === 20) {
                                stickerNode = <StickerImage sticker={STICKERS[3]} index={3} float="right" />;
                            } else if (i === 26) {
                                stickerNode = <StickerImage sticker={STICKERS[4]} index={4} float="left" />;
                            }

                            return (
                                <React.Fragment key={i}>
                                    {stickerNode}
                                    <motion.p
                                        className={className}
                                        style={style}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 + i * 0.04, duration: 0.4 }}
                                    >
                                        {isFirst ? (
                                            <>
                                                <span style={{ fontSize: 'clamp(20px, 5.5vw, 26px)', fontWeight: 700 }}>
                                                    {para.text.charAt(0)}
                                                </span>
                                                {para.text.slice(1)}
                                            </>
                                        ) : (
                                            para.text
                                        )}
                                    </motion.p>
                                </React.Fragment>
                            );
                        })}

                        {/* ── Closing quote ────────────────────── */}
                        <motion.div
                            className="closing-quote"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2, duration: 0.6 }}
                        >
                            "You came into my life like a line from a poem I wasn't ready for… and somehow, you became my favorite verse."
                        </motion.div>

                        {/* ── Signature ─────────────────────────── */}
                        <motion.div
                            style={{ overflow: 'hidden', paddingTop: '8px', paddingBottom: '24px' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5, duration: 0.5 }}
                        >
                            <p className="letter-sign">— Krish</p>
                        </motion.div>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LetterReveal;
