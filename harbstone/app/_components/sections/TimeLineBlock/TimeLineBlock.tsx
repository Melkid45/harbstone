'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './TimeLineBlock.module.scss';

interface TimeLineItem {
    date: string;
    description: string;
    year?: string | number;
}

interface TimeLineBlockProps {
    timelines: TimeLineItem[];
}

interface PreparedTimelineItem extends TimeLineItem {
    label: string;
    displayYear: string;
}

const AUTOPLAY_DURATION = 3200;
const YEAR_DIGIT_COUNT = 4;
const YEAR_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
type DigitStyle = CSSProperties & {
    '--digit-index': string;
};

const cn = (...classes: Array<string | false | null | undefined>) => (
    classes.filter(Boolean).join(' ')
);

const getPreparedTimeline = (item: TimeLineItem): PreparedTimelineItem => {
    const dateYear = item.date.match(/\b(?:19|20)\d{2}\b/)?.[0];
    const displayYear = `${item.year ?? dateYear ?? ''}`;
    const label = dateYear
        ? item.date.replace(dateYear, '').replace(/[,\s]+$/, '').trim()
        : item.date;

    return {
        ...item,
        label: label || item.date,
        displayYear,
    };
};

export default function TimeLineBlock({
    timelines
}: TimeLineBlockProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const preparedTimelines = useMemo(
        () => timelines.map(getPreparedTimeline),
        [timelines]
    );
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const fillRef = useRef<HTMLDivElement | null>(null);
    const pointRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const animationFrameRef = useRef(0);
    const activeIndexRef = useRef(0);
    const lastTimestampRef = useRef(0);
    const segmentProgressRef = useRef(0);
    const isPausedRef = useRef(false);
    const selectPointRef = useRef<((index: number) => void) | null>(null);
    const startAutoplayRef = useRef<(() => void) | null>(null);
    const pauseAutoplayRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        activeIndexRef.current = Math.min(activeIndex, preparedTimelines.length - 1);
    }, [activeIndex, preparedTimelines.length]);

    useEffect(() => {
        const viewport = viewportRef.current;
        const track = trackRef.current;
        const fill = fillRef.current;

        if (!preparedTimelines.length || !viewport || !track || !fill) {
            return;
        }

        const points = pointRefs.current.filter(Boolean) as HTMLButtonElement[];

        if (!points.length) {
            return;
        }

        const setFillWidth = (width: number) => {
            fill.style.setProperty("--timeline__fill", `${Math.max(width, 0)}px`);
        };

        const updateLineGeometry = () => {
            const firstPoint = points[0];
            const lastPoint = points[points.length - 1];
            const firstCenter = firstPoint.offsetLeft + firstPoint.offsetWidth / 2;
            const lastCenter = lastPoint.offsetLeft + lastPoint.offsetWidth / 2;

            track.style.setProperty("--timeline__line-start", `${firstCenter}px`);
            track.style.setProperty(
                "--timeline__line-width",
                `${Math.max(lastCenter - firstCenter, 0)}px`
            );
        };

        const getRelativeCenter = (index: number) => {
            const lineStart = parseFloat(
                getComputedStyle(track).getPropertyValue("--timeline__line-start")
            ) || 0;
            const point = points[index];

            if (!point) {
                return 0;
            }

            return point.offsetLeft + point.offsetWidth / 2 - lineStart;
        };

        const updateStaticState = (index = activeIndexRef.current) => {
            const activePoint = points[index];

            if (!activePoint) {
                return;
            }

            updateLineGeometry();

            const targetScrollLeft =
                activePoint.offsetLeft -
                viewport.clientWidth / 2 +
                activePoint.offsetWidth / 2;

            viewport.scrollTo({
                left: Math.max(targetScrollLeft, 0),
                behavior: "smooth",
            });
        };

        const stepAutoplay = (timestamp: number) => {
            if (isPausedRef.current) {
                return;
            }

            if (!lastTimestampRef.current) {
                lastTimestampRef.current = timestamp;
            }

            const activePointIndex = activeIndexRef.current;
            const delta = timestamp - lastTimestampRef.current;
            const nextIndex = activePointIndex === points.length - 1 ? 0 : activePointIndex + 1;
            const startWidth = getRelativeCenter(activePointIndex);
            const endWidth = nextIndex === 0 ? startWidth : getRelativeCenter(nextIndex);

            lastTimestampRef.current = timestamp;
            segmentProgressRef.current = Math.min(
                segmentProgressRef.current + delta / AUTOPLAY_DURATION,
                1
            );

            setFillWidth(
                startWidth + (endWidth - startWidth) * segmentProgressRef.current
            );

            if (segmentProgressRef.current >= 1) {
                activeIndexRef.current = nextIndex;
                segmentProgressRef.current = 0;
                lastTimestampRef.current = 0;
                setActiveIndex(nextIndex);
                updateStaticState(nextIndex);
                setFillWidth(getRelativeCenter(nextIndex));
            }

            animationFrameRef.current = requestAnimationFrame(stepAutoplay);
        };

        const startAutoplay = () => {
            cancelAnimationFrame(animationFrameRef.current);
            isPausedRef.current = false;
            lastTimestampRef.current = 0;
            animationFrameRef.current = requestAnimationFrame(stepAutoplay);
        };

        const pauseAutoplay = () => {
            isPausedRef.current = true;
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = 0;
            lastTimestampRef.current = 0;
        };

        const handleResize = () => {
            updateStaticState();
            setFillWidth(getRelativeCenter(activeIndexRef.current));
        };

        selectPointRef.current = (index: number) => {
            activeIndexRef.current = index;
            segmentProgressRef.current = 0;
            lastTimestampRef.current = 0;
            setActiveIndex(index);
            updateStaticState(index);
            setFillWidth(getRelativeCenter(index));
            startAutoplay();
        };
        startAutoplayRef.current = startAutoplay;
        pauseAutoplayRef.current = pauseAutoplay;

        updateStaticState();
        setFillWidth(getRelativeCenter(activeIndexRef.current));
        startAutoplay();

        window.addEventListener("resize", handleResize);

        return () => {
            pauseAutoplay();
            selectPointRef.current = null;
            startAutoplayRef.current = null;
            pauseAutoplayRef.current = null;
            window.removeEventListener("resize", handleResize);
        };
    }, [preparedTimelines.length]);

    const activeYear = preparedTimelines[activeIndex]?.displayYear ?? '';
    const yearDigits = activeYear
        .toString()
        .padStart(YEAR_DIGIT_COUNT, "0")
        .slice(-YEAR_DIGIT_COUNT)
        .split("");

    if (!preparedTimelines.length) {
        return null;
    }

    return (
        <BlockWrapper background="white" padding="y">
            <div
                ref={timelineRef}
                className={styles.timeline}
                data-timeline
                onMouseEnter={() => pauseAutoplayRef.current?.()}
                onMouseLeave={() => startAutoplayRef.current?.()}
            >
                <div className={styles.timeline__nav}>
                    <div
                        className={cn(
                            styles.timeline__year,
                            "heading heading--font-1 heading--large heading--dark-color"
                        )}
                        data-timeline__year
                        aria-label="Current timeline year"
                    >
                        {yearDigits.map((digit, index) => (
                            <span key={index} className={styles['timeline__year-digit']}>
                                <span
                                    className={styles['timeline__year-track']}
                                    data-timeline__year-track
                                    style={{ '--digit-index': digit } as DigitStyle}
                                >
                                    {YEAR_DIGITS.map((yearDigit) => (
                                        <span key={yearDigit}>{yearDigit}</span>
                                    ))}
                                </span>
                            </span>
                        ))}
                    </div>
                    <div
                        ref={viewportRef}
                        className={styles.timeline__viewport}
                        data-timeline__viewport
                    >
                        <div
                            ref={trackRef}
                            className={styles.timeline__track}
                            data-timeline__track
                        >
                            <div className={styles.timeline__line} />
                            <div
                                ref={fillRef}
                                className={styles.timeline__fill}
                                data-timeline__fill
                            />
                            {preparedTimelines.map((item, index) => (
                                <button
                                    key={`${item.date}-${item.description}`}
                                    ref={(node) => {
                                        pointRefs.current[index] = node;
                                    }}
                                    className={cn(
                                        styles.timeline__point,
                                        index === activeIndex && styles['is-active'],
                                        index < activeIndex && styles['is-past']
                                    )}
                                    type="button"
                                    data-timeline__point
                                    data-index={index}
                                    data-year={item.displayYear}
                                    onClick={() => selectPointRef.current?.(index)}
                                >
                                    <span
                                        className={cn(
                                            styles.timeline__label,
                                            "heading heading--font-1 heading--small heading--dark-color"
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                    <span className={styles.timeline__dot} aria-hidden="true" />
                                    <p className={cn(styles.timeline__text, "text text--small text--dark-color")}>
                                        {item.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}
