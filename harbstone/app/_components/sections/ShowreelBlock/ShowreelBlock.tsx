'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ShowreelBlock.module.scss';

interface ShowreelBlockProps {
    showreel: string;
}

const SHOWREEL_BREAKPOINT = 1024;

gsap.registerPlugin(ScrollTrigger);

export default function ShowreelBlock({
    showreel
}: ShowreelBlockProps) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        video.defaultMuted = true;
        video.muted = true;

        const playVideo = () => {
            void video.play().catch(() => undefined);
        };

        if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
            playVideo();
            return;
        }

        video.addEventListener('canplay', playVideo, { once: true });

        return () => {
            video.removeEventListener('canplay', playVideo);
        };
    }, []);

    useEffect(() => {
        const wrap = wrapRef.current;
        const video = videoRef.current;

        if (!wrap || !video) {
            return;
        }

        const body = document.body;
        const initialBackground = body.style.background;
        const initialBackgroundColor = body.style.backgroundColor;
        const media = gsap.matchMedia();

        media.add(`(min-width: ${SHOWREEL_BREAKPOINT + 1}px)`, () => {
            const backgroundTween = gsap.to(body, {
                backgroundColor: '#242323',
                ease: 'none',
                scrollTrigger: {
                    id: 'showreel-bg',
                    trigger: wrap,
                    scrub: true,
                    start: 'top +=30%',
                    end: '+=30%',
                },
            });

            const videoTween = gsap.to(video, {
                yPercent: -27,
                scale: 0.85,
                ease: 'none',
                scrollTrigger: {
                    id: 'showreel-video',
                    trigger: wrap,
                    scrub: true,
                    start: 'top +=30%',
                    end: '+=40%',
                },
            });

            const pinTrigger = ScrollTrigger.create({
                id: 'showreel-pin',
                trigger: wrap,
                scrub: true,
                start: 'top +=30%',
                end: '+=200%',
                pin: true,
                pinSpacing: false,
            });

            return () => {
                backgroundTween.kill();
                videoTween.kill();
                pinTrigger.kill();
                gsap.set(video, { clearProps: 'transform' });
            };
        });

        return () => {
            media.revert();
            gsap.killTweensOf([body, video]);
            gsap.set(video, { clearProps: 'transform' });
            body.style.background = initialBackground;
            body.style.backgroundColor = initialBackgroundColor;
        };
    }, []);

    return (
        <section className={styles.showreel}>
            <div className={styles.showreel__body}>
                <div ref={wrapRef} className={styles.showreel__wrap}>
                    <video
                        ref={videoRef}
                        className={styles.showreel__video}
                        preload="auto"
                        loop
                        muted
                        autoPlay
                        playsInline
                    >
                        <source src={showreel} type="video/webm" />
                    </video>
                </div>
            </div>
        </section>
    );
}
