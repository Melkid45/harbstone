'use client';

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";

const RESIZE_DELAYS = [80, 240, 600, 1200, 1800, 2600];
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
            lenis.start();
            lenis.resize();
        };

        const animationFrame = requestAnimationFrame(scrollToTop);
        const timeouts = RESIZE_DELAYS.map((delay) => (
            window.setTimeout(resize, delay)
        ));
        const handlePreloaderDone = () => {
            PRELOADER_RESIZE_DELAYS.forEach((delay) => {
                window.setTimeout(resize, delay);
            });
        };

        window.addEventListener('preloader:done', handlePreloaderDone);

        return () => {
            cancelAnimationFrame(animationFrame);
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
            window.removeEventListener('preloader:done', handlePreloaderDone);
        };
    }, [lenis, routeKey]);

    return null;
}
