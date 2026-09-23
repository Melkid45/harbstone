'use client';

import { useLayoutEffect, useMemo, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";
import styles from "./ScreenBlock.module.scss";

const DEFAULT_BACKGROUND = '#000';
const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const ENTRANCE_OFFSET_PERCENT = 15;
const EXIT_DURATION = 0.3;

interface WebsiteScreen {
    image: string | StaticImageData;
    alt?: string;
    isMain?: boolean;
}

interface ScreenBlockProps {
    screens: WebsiteScreen[];
    background?: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function ScreenBlock({ screens, background }: ScreenBlockProps) {
    const blockRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
    const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
    const mobileItemRef = useRef<HTMLDivElement | null>(null);
    const mobileTrackRef = useRef<HTMLDivElement | null>(null);
    const { visibleScreens, mainVisualIndex } = useMemo(() => {
        const availableScreens = screens.slice(0, 3);
        const markedMainIndex = availableScreens.findIndex((screen) => screen.isMain);
        const mainIndex = markedMainIndex >= 0 ? markedMainIndex : 0;
        const mainScreen = availableScreens[mainIndex];
        const secondaryScreens = availableScreens.filter((_, index) => index !== mainIndex);
        const [firstSecondary, secondSecondary] = secondaryScreens;
        const arrangedScreens = (
            availableScreens.length === 3
            && firstSecondary
            && mainScreen
            && secondSecondary
        )
            ? [firstSecondary, mainScreen, secondSecondary]
            : availableScreens;

        return {
            visibleScreens: arrangedScreens,
            mainVisualIndex: arrangedScreens.findIndex((screen) => screen === mainScreen),
        };
    }, [screens]);
    const mainScreen = visibleScreens[mainVisualIndex];
    const sectionBackground = background && HEX_COLOR_PATTERN.test(background)
        ? background
        : DEFAULT_BACKGROUND;

    useLayoutEffect(() => {
        const block = blockRef.current;
        const section = sectionRef.current;
        const items = itemRefs.current.slice(0, visibleScreens.length);
        const images = imageRefs.current.slice(0, visibleScreens.length);
        const mobileItem = mobileItemRef.current;
        const mobileTrack = mobileTrackRef.current;

        if (
            !block
            || !section
            || mainVisualIndex < 0
            || images.length !== visibleScreens.length
            || items.length !== visibleScreens.length
            || images.some((image) => !image)
            || items.some((item) => !item)
        ) {
            return;
        }

        const media = gsap.matchMedia();

        const getHeaderMetrics = () => {
            const header = document.querySelector('header');

            if (!header) {
                return {
                    height: 0,
                    edgeGap: 0,
                };
            }

            return {
                height: header.getBoundingClientRect().height,
                edgeGap: parseFloat(getComputedStyle(header).paddingTop) || 0,
            };
        };

        // The screen starts immediately after the full header box. Since the header has
        // equal vertical padding, this makes the gap above its content, the gap below it,
        // and the gap below the pinned screen visually identical at every breakpoint.
        const syncPinnedGeometry = () => {
            const { height, edgeGap } = getHeaderMetrics();
            const availableHeight = Math.max(window.innerHeight - height - edgeGap, 1);

            block.style.setProperty('--screen-pinned-height', `${availableHeight}px`);
        };

        const getPinStart = () => {
            const { height } = getHeaderMetrics();
            const sectionPaddingTop = parseFloat(getComputedStyle(section).paddingTop) || 0;
            const offset = height - sectionPaddingTop;

            return `top top+=${offset}`;
        };

        syncPinnedGeometry();
        ScrollTrigger.addEventListener('refreshInit', syncPinnedGeometry);

        const createTimeline = (
            activeIndexes: number[],
            alternateDirections: boolean,
        ) => {
            const timeline = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: 'none',
                },
                scrollTrigger: {
                    trigger: section,
                    start: getPinStart,
                    end: () => `+=${block.offsetHeight * (1 + EXIT_DURATION)}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            activeIndexes.forEach((index, directionIndex) => {
                const image = images[index];
                const item = items[index];

                if (!image || !item) {
                    return;
                }

                const getEndPosition = () => (
                    Math.min(item.clientHeight - image.offsetHeight, 0)
                );
                const movesDown = alternateDirections && directionIndex % 2 === 1;

                timeline.fromTo(
                    image,
                    {
                        y: () => movesDown ? getEndPosition() : 0,
                    },
                    {
                        y: () => movesDown ? 0 : getEndPosition(),
                    },
                    0
                );
            });

            const activeItems = activeIndexes.flatMap((index) => {
                const item = items[index];

                return item ? [item] : [];
            });

            timeline.to(
                activeItems,
                {
                    yPercent: (index) => (
                        index % 2 === 1
                            ? ENTRANCE_OFFSET_PERCENT
                            : -ENTRANCE_OFFSET_PERCENT
                    ),
                    duration: EXIT_DURATION,
                    ease: 'power2.in',
                },
                1
            );

            return timeline;
        };

        const createEntrance = (activeIndexes: number[]) => {
            const activeItems = activeIndexes.flatMap((index) => {
                const item = items[index];

                return item ? [item] : [];
            });

            gsap.set(
                activeItems,
                {
                    yPercent: (index) => (
                        index % 2 === 1
                            ? -ENTRANCE_OFFSET_PERCENT
                            : ENTRANCE_OFFSET_PERCENT
                    ),
                }
            );

            return gsap.to(
                activeItems,
                {
                    yPercent: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 50%',
                        end: getPinStart,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                    },
                }
            );
        };

        const createAnimations = (
            activeIndexes: number[],
            alternateDirections: boolean,
        ) => {
            const entrance = createEntrance(activeIndexes);
            const timeline = createTimeline(activeIndexes, alternateDirections);

            return () => {
                entrance.scrollTrigger?.kill(true);
                entrance.kill();
                timeline.scrollTrigger?.kill(true);
                timeline.kill();
            };
        };

        const createMobileAnimation = () => {
            if (!mobileItem || !mobileTrack) {
                return;
            }

            gsap.set(mobileItem, { yPercent: ENTRANCE_OFFSET_PERCENT });

            const entrance = gsap.to(mobileItem, {
                yPercent: 0,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 50%',
                    end: getPinStart,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
            const timeline = gsap.timeline({
                defaults: {
                    duration: 1,
                    ease: 'none',
                },
                scrollTrigger: {
                    trigger: section,
                    start: getPinStart,
                    end: () => {
                        const trackDistance = Math.max(
                            mobileTrack.offsetHeight - mobileItem.clientHeight,
                            block.offsetHeight,
                        );

                        return `+=${trackDistance * (1 + EXIT_DURATION)}`;
                    },
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });

            timeline.fromTo(
                mobileTrack,
                { y: 0 },
                {
                    y: () => Math.min(
                        mobileItem.clientHeight - mobileTrack.offsetHeight,
                        0,
                    ),
                },
                0,
            );
            timeline.to(
                mobileItem,
                {
                    yPercent: -ENTRANCE_OFFSET_PERCENT,
                    duration: EXIT_DURATION,
                    ease: 'power2.in',
                },
                1,
            );

            return () => {
                entrance.scrollTrigger?.kill(true);
                entrance.kill();
                timeline.scrollTrigger?.kill(true);
                timeline.kill();
            };
        };

        media.add(
            '(min-width: 801px) and (prefers-reduced-motion: no-preference)',
            () => createAnimations(
                visibleScreens.map((_, index) => index),
                true,
            )
        );

        media.add(
            '(max-width: 800px) and (prefers-reduced-motion: no-preference)',
            createMobileAnimation,
        );

        return () => {
            ScrollTrigger.removeEventListener('refreshInit', syncPinnedGeometry);
            media.revert();
            block.style.removeProperty('--screen-pinned-height');
            gsap.set(items, { clearProps: 'transform' });
            gsap.set(images, { clearProps: 'transform' });
            gsap.set([mobileItem, mobileTrack], { clearProps: 'transform' });
        };
    }, [mainVisualIndex, visibleScreens]);

    if (!visibleScreens.length || !mainScreen) {
        return null;
    }

    const countClass = styles[`screen--${visibleScreens.length}`];

    return (
        <BlockWrapper background="white" overflow="hidden" ref={sectionRef} padding="pt">
            <div
                ref={blockRef}
                className={`${styles.screen} ${countClass}`}
                style={{ backgroundColor: sectionBackground }}
            >
                {visibleScreens.map((item, index) => {
                    const isMain = index === mainVisualIndex;

                    return (
                        <div
                            ref={(node) => {
                                itemRefs.current[index] = node;
                            }}
                            key={`${typeof item.image === 'string' ? item.image : item.image.src}-${index}`}
                            className={`${styles.screen__item} ${styles['screen__item--desktop']} ${isMain ? styles['screen__item--main'] : ''}`}
                            data-main-screen={isMain ? 'true' : undefined}
                        >
                            <Image
                                src={item.image}
                                alt=""
                                aria-hidden="true"
                                fill
                                className={styles.screen__backdrop}
                                sizes="100vw"
                            />
                            <Image
                                ref={(node) => {
                                    imageRefs.current[index] = node;
                                }}
                                src={item.image}
                                alt={item.alt || `Website screen ${index + 1}`}
                                className={styles.screen__image}
                                sizes={visibleScreens.length === 1
                                    ? '(max-width: 800px) 100vw, 44vw'
                                    : `(max-width: 800px) 100vw, ${Math.ceil(100 / visibleScreens.length)}vw`}
                                onLoad={() => ScrollTrigger.refresh()}
                            />
                        </div>
                    );
                })}
                <div
                    ref={mobileItemRef}
                    className={`${styles.screen__item} ${styles['screen__item--mobile']}`}
                >
                    <div ref={mobileTrackRef} className={styles.screen__mobileTrack}>
                        {screens.map((item, index) => (
                            <Image
                                key={`${typeof item.image === 'string' ? item.image : item.image.src}-mobile-${index}`}
                                src={item.image}
                                alt={item.alt || `Website screen ${index + 1}`}
                                className={styles.screen__mobileImage}
                                sizes="100vw"
                                onLoad={() => ScrollTrigger.refresh()}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    );
}
