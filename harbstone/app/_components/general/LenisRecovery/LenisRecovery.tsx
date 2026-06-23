'use client';

import { useLenis } from "lenis/react";
import { useEffect } from "react";

const RECOVERY_DELAYS = [0, 120, 360, 800, 1600, 2600, 4200];

export default function LenisRecovery() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) {
            return;
        }

        const recover = () => {
            if (document.documentElement.dataset.scrollLocked === 'true') {
                return;
            }

            if (!document.body.classList.contains('is-preloading')) {
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            }

            lenis.start();
            lenis.resize();
        };

        const scheduleRecovery = () => {
            RECOVERY_DELAYS.forEach((delay) => {
                window.setTimeout(recover, delay);
            });
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                scheduleRecovery();
            }
        };

        scheduleRecovery();
        window.addEventListener('load', scheduleRecovery);
        window.addEventListener('pageshow', scheduleRecovery);
        window.addEventListener('focus', scheduleRecovery);
        window.addEventListener('preloader:done', scheduleRecovery);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('load', scheduleRecovery);
            window.removeEventListener('pageshow', scheduleRecovery);
            window.removeEventListener('focus', scheduleRecovery);
            window.removeEventListener('preloader:done', scheduleRecovery);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [lenis]);

    return null;
}
