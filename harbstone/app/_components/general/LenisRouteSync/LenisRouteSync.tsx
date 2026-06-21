'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

const RESIZE_DELAYS = [80, 240, 600];

export default function LenisRouteSync() {
    const pathname = usePathname();
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) {
            return;
        }

        const sync = () => {
            lenis.resize();
            lenis.scrollTo(0, {
                immediate: true,
                force: true,
            });
            lenis.resize();
        };

        const animationFrame = requestAnimationFrame(sync);
        const timeouts = RESIZE_DELAYS.map((delay) => (
            window.setTimeout(sync, delay)
        ));

        return () => {
            cancelAnimationFrame(animationFrame);
            timeouts.forEach((timeout) => window.clearTimeout(timeout));
        };
    }, [lenis, pathname]);

    return null;
}
