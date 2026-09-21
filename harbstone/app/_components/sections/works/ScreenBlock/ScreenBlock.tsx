'use client';

import { useEffect, useMemo, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";
import styles from "./ScreenBlock.module.scss";

const DEFAULT_BACKGROUND = '#000';
const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const PIN_HEADER_GAP = 24;
const ENTRANCE_OFFSET_PERCENT = 10;

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

    useEffect(() => {
        const block = blockRef.current;
        const section = sectionRef.current;
        const items = itemRefs.current.slice(0, visibleScreens.length);
        const images = imageRefs.current.slice(0, visibleScreens.length);

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

        // The fixed header sits above everything (mix-blend-mode: difference) and its
        // height changes per breakpoint, while this section pins flush to the viewport
        // top. Padding alone can't guarantee clearance at every width, so the pin start
        // is nudged down by whatever the header still eats into the section's own
        // top padding, recalculated on every ScrollTrigger refresh.
        const getPinStart = () => {
            const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
            const sectionPaddingTop = parseFloat(getComputedStyle(section).paddingTop) || 0;
            const offset = Math.max(0, headerHeight + PIN_HEADER_GAP - sectionPaddingTop);

            return `top top+=${offset}`;
        };

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
                    end: 'bottom top',
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

            return timeline;
        };

        const createEntrance = (activeIndexes: number[]) => {
            const activeItems = activeIndexes.flatMap((index) => {
                const item = items[index];

                return item ? [item] : [];
            });

            return gsap.fromTo(
                activeItems,
                {
                    yPercent: (index) => (
                        index % 2 === 1
                            ? -ENTRANCE_OFFSET_PERCENT
                            : ENTRANCE_OFFSET_PERCENT
                    ),
                },
                {
                    yPercent: 0,
                    ease: 'power2.out',
                    stagger: 0.035,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 72%',
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
                entrance.scrollTrigger?.kill();
                entrance.kill();
                timeline.scrollTrigger?.kill();
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
            () => createAnimations([mainVisualIndex], false)
        );

        return () => {
            media.revert();
            gsap.set(items, { clearProps: 'transform' });
            gsap.set(images, { clearProps: 'transform' });
        };
    }, [mainVisualIndex, visibleScreens]);

    if (!visibleScreens.length || !mainScreen) {
        return null;
    }

    const countClass = styles[`screen--${visibleScreens.length}`];

    return (
        <BlockWrapper background="white" overflow="hidden" ref={sectionRef} padding="y">
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
                            className={`${styles.screen__item} ${isMain ? styles['screen__item--main'] : ''}`}
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
            </div>
        </BlockWrapper>
    );
}
