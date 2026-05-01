
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
    timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-1 md:mx-3">
        {/* Card: quiet glass panel */}
        <div 
            className="rounded-2xl time-card flex items-center justify-center mb-2"
            style={{
                background: 'rgba(255, 235, 200, 0.06)',
                border: '1px solid rgba(220, 180, 120, 0.18)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AnimatePresence>
                <motion.span
                    key={value}
                    className="time-digit font-bold font-gaegu"
                    style={{ color: '#E8D5B0', position: 'absolute' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                    {String(value).padStart(2, '0')}
                </motion.span>
            </AnimatePresence>
            {/* Invisible placeholder for structural sizing */}
            <span className="time-digit font-bold font-gaegu opacity-0 pointer-events-none select-none">
                00
            </span>
        </div>
        {/* Label */}
        <span
            className="time-label font-bold tracking-widest uppercase font-gaegu"
            style={{
                color: 'rgba(200, 170, 120, 0.75)',
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                marginTop: '4px'
            }}
        >
            {label}
        </span>
    </div>
);

/* Separator dot between units */
const Dot = () => (
    <span
        className="font-black mb-6 select-none"
        style={{ color: 'rgba(228, 213, 176, 0.5)', fontSize: 'clamp(24px, 7vw, 42px)' }}
    >
        :
    </span>
);

export const CountdownTimer = ({ timeLeft }: CountdownTimerProps) => {
    return (
        <motion.div
            className="flex justify-center items-center z-10 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y: 0  }}
            transition={{ duration: 0.6, delay: 0.3 }}
        >
            <TimeUnit value={timeLeft.days}    label="Days" />
            <Dot />
            <TimeUnit value={timeLeft.hours}   label="Hrs"  />
            <Dot />
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <Dot />
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
    );
};
