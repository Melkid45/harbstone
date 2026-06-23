'use client';

import { useLenis } from "lenis/react";
import { useEffect } from "react";

let lockCount = 0;
let previousBodyOverflow = '';
let previousHtmlOverflow = '';
type LockableLenis = {
    start: () => void;
    stop: () => void;
    resize?: () => void;
};

let lockedLenis: LockableLenis | null = null;

function lockScroll(lenis: LockableLenis | null) {
    lockCount += 1;

    if (lenis) {
        lockedLenis = lenis;
        lockedLenis.stop();
    }

    if (lockCount > 1) {
        return;
    }

    previousBodyOverflow = document.body.style.overflow;
    previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.dataset.scrollLocked = 'true';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    lockCount = Math.max(lockCount - 1, 0);

    if (lockCount > 0) {
        return;
    }

    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
    delete document.documentElement.dataset.scrollLocked;
    lockedLenis?.start();
    lockedLenis?.resize?.();
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
