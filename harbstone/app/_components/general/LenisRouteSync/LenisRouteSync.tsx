'use client';

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";

const RESIZE_DELAYS = [80, 240, 600, 1200];

export default function LenisRouteSync() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lenis = useLenis();
    const routeKey = `${pathname}?${searchParams.toString()}`;

    useEffect(() => {
        if (!lenis) {
            return;
        }

        const sync = () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            lenis.start();
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
    }, [lenis, routeKey]);

    return null;
}
