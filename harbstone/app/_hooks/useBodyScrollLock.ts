'use client';

import { useLenis } from "lenis/react";
import { useEffect } from "react";

let lockCount = 0;
let lockedScrollY = 0;
let previousBodyOverflow = '';
let previousBodyPosition = '';
let previousBodyTop = '';
let previousBodyWidth = '';
let previousHtmlOverflow = '';
let lockedLenis: { start: () => void; stop: () => void } | null = null;

function lockScroll(lenis: { start: () => void; stop: () => void } | null) {
    lockCount += 1;

    if (lenis) {
        lockedLenis = lenis;
        lockedLenis.stop();
    }

    if (lockCount > 1) {
        return;
    }

    lockedScrollY = window.scrollY;
    previousBodyOverflow = document.body.style.overflow;
    previousBodyPosition = document.body.style.position;
    previousBodyTop = document.body.style.top;
    previousBodyWidth = document.body.style.width;
    previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.width = '100%';
}

function unlockScroll() {
    lockCount = Math.max(lockCount - 1, 0);

    if (lockCount > 0) {
        return;
    }

    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
    document.body.style.position = previousBodyPosition;
    document.body.style.top = previousBodyTop;
    document.body.style.width = previousBodyWidth;
    window.scrollTo(0, lockedScrollY);
    lockedLenis?.start();
    lockedLenis = null;
}

export default function useBodyScrollLock(isLocked: boolean) {
    const lenis = useLenis();

    useEffect(() => {
        if (!isLocked) {
            return;
        }

        lockScroll(lenis || null);

        return () => {
            unlockScroll();
        };
    }, [isLocked, lenis]);
}
