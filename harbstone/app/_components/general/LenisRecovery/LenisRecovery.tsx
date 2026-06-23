'use client';

import { useLenis } from "lenis/react";
import { useEffect } from "react";

const RECOVERY_DELAYS = [0, 120, 360, 700];

export default function LenisRecovery() {
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) {
            return;
        }

        const timeoutIds: number[] = [];
        let userInteracted = false;

        const clearScheduledRecovery = () => {
            while (timeoutIds.length) {
                const timeoutId = timeoutIds.pop();

                if (timeoutId !== undefined) {
                    window.clearTimeout(timeoutId);
                }
            }
        };

        const handleUserInteraction = () => {
            userInteracted = true;
            clearScheduledRecovery();
        };

        const recover = () => {
            if (userInteracted) {
                return;
            }

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
            clearScheduledRecovery();
            userInteracted = false;

            RECOVERY_DELAYS.forEach((delay) => {
                timeoutIds.push(window.setTimeout(recover, delay));
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
        window.addEventListener('wheel', handleUserInteraction, { passive: true });
        window.addEventListener('touchstart', handleUserInteraction, { passive: true });
        window.addEventListener('keydown', handleUserInteraction);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearScheduledRecovery();
            window.removeEventListener('load', scheduleRecovery);
            window.removeEventListener('pageshow', scheduleRecovery);
            window.removeEventListener('focus', scheduleRecovery);
            window.removeEventListener('preloader:done', scheduleRecovery);
            window.removeEventListener('wheel', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [lenis]);

    return null;
}
