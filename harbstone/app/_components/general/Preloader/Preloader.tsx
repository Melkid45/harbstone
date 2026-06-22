'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.scss';

export default function Preloader() {
    const [isHidden, setIsHidden] = useState(false);
    const preloaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const preloader = preloaderRef.current;

        if (!preloader) {
            document.body.classList.remove('is-preloading');
            return;
        }

        document.body.classList.add('is-preloading');

        const durationValue = getComputedStyle(preloader)
            .getPropertyValue('--preloader-duration')
            .trim();
        const parsedDuration = Number.parseFloat(durationValue);
        const minimumVisibleMs = Number.isFinite(parsedDuration)
            ? durationValue.endsWith('ms')
                ? parsedDuration
                : parsedDuration * 1000
            : 0;
        const startedAt = performance.now();
        let timeoutId: number | null = null;
        let safetyTimeoutId: number | null = null;
        let isComplete = false;

        const completePreloader = () => {
            if (isComplete) {
                return;
            }

            isComplete = true;
            document.body.classList.remove('is-preloading');
            window.dispatchEvent(new CustomEvent('preloader:done'));
            setIsHidden(true);
        };

        const hidePreloader = () => {
            const elapsedMs = performance.now() - startedAt;
            const delayMs = Math.max(0, minimumVisibleMs - elapsedMs);

            timeoutId = window.setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power1.out',
                    onComplete: completePreloader,
                });
            }, delayMs);
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader, { once: true });
        }

        safetyTimeoutId = window.setTimeout(() => {
            completePreloader();
        }, Math.max(minimumVisibleMs + 2000, 3000));

        return () => {
            window.removeEventListener('load', hidePreloader);

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }

            if (safetyTimeoutId !== null) {
                window.clearTimeout(safetyTimeoutId);
            }

            gsap.killTweensOf(preloader);
            document.body.classList.remove('is-preloading');
        };
    }, []);

    if (isHidden) {
        return null;
    }

    return (
        <div ref={preloaderRef} className={styles.preloader} aria-hidden="true">
            <div className={styles.preloader__body}>
                <span className={`${styles.preloader__text} ${styles['preloader__text--under']}`}> Harbstone </span>
                <span className={`${styles.preloader__text} ${styles['preloader__text--over']}`}> Harbstone </span>
            </div>
        </div>
    )
}
