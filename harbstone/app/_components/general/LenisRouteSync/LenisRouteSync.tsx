'use client';

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";

const RESIZE_DELAYS = [80, 240, 600];
const PRELOADER_RESIZE_DELAYS = [0, 120, 360];

export default function LenisRouteSync() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lenis = useLenis();
    const routeKey = `${pathname}?${searchParams.toString()}`;

    useEffect(() => {
        if (!lenis) {
            return;
        }

        const timeouts: number[] = [];
        let userInteracted = false;

        const clearTimeouts = () => {
            while (timeouts.length) {
                const timeoutId = timeouts.pop();

                if (timeoutId !== undefined) {
                    window.clearTimeout(timeoutId);
                }
            }
        };

        const handleUserInteraction = () => {
            userInteracted = true;
            clearTimeouts();
        };

        const scrollToTop = () => {
            lenis.start();
            lenis.resize();
            lenis.scrollTo(0, {
                immediate: true,
                force: true,
            });
            lenis.resize();
        };

        const resize = () => {
            if (userInteracted) {
                return;
            }

            lenis.start();
            lenis.resize();
        };

        const animationFrame = requestAnimationFrame(scrollToTop);
        RESIZE_DELAYS.forEach((delay) => {
            timeouts.push(window.setTimeout(resize, delay));
        });
        const handlePreloaderDone = () => {
            PRELOADER_RESIZE_DELAYS.forEach((delay) => {
                timeouts.push(window.setTimeout(resize, delay));
            });
        };

        window.addEventListener('preloader:done', handlePreloaderDone);
        window.addEventListener('wheel', handleUserInteraction, { passive: true });
        window.addEventListener('touchstart', handleUserInteraction, { passive: true });
        window.addEventListener('keydown', handleUserInteraction);

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeouts();
            window.removeEventListener('preloader:done', handlePreloaderDone);
            window.removeEventListener('wheel', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
        };
    }, [lenis, routeKey]);

    return null;
}
