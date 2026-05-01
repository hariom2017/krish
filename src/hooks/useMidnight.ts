import { useState, useEffect } from 'react';

import { differenceInSeconds } from 'date-fns';



export const useMidnight = () => {
    const [isMidnight, setIsMidnight] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Final Target Date: May 16, 2026 at 11:00 AM
        const target = new Date('2026-05-16T11:00:00+05:30');

        const checkTime = () => {
            const now = new Date();
            const diff = differenceInSeconds(target, now);

            if (diff <= 0) {
                setIsMidnight(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setIsMidnight(false);
                const days = Math.floor(diff / (3600 * 24));
                const hours = Math.floor((diff % (3600 * 24)) / 3600);
                const minutes = Math.floor((diff % 3600) / 60);
                const seconds = diff % 60;
                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        checkTime(); // Initial check
        const interval = setInterval(checkTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return { isMidnight, timeLeft };
};
