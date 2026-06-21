'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AboutCounterPoint {
    title: string;
    description: string;
}

interface AboutCountersProps {
    points: AboutCounterPoint[];
}

interface AboutCounterStatProps {
    point: AboutCounterPoint;
    index: number;
    canAnimate: boolean;
}

interface ParsedCounterValue {
    prefix: string;
    suffix: string;
    value: number;
}

gsap.registerPlugin(ScrollTrigger);

const parseCounterValue = (rawValue: string): ParsedCounterValue | null => {
    const normalizedValue = rawValue.trim();
    const match = normalizedValue.match(/^([^0-9-]*)(-?[\d\s,.]+)(.*)$/);

    if (!match) {
        return null;
    }

    const [, prefix, numericValue, suffix] = match;
    const value = Number.parseFloat(
        numericValue.replace(/\s/g, '').replace(',', '.')
    );

    if (!Number.isFinite(value)) {
        return null;
    }

    return {
        prefix,
        suffix,
        value,
    };
};

const isPreloadingActive = () => document.body.classList.contains('is-preloading');

function AboutCounterStat({
    point,
    index,
    canAnimate
}: AboutCounterStatProps) {
    const statRef = useRef<HTMLDivElement | null>(null);
    const valueRef = useRef<HTMLDivElement | null>(null);
    const parsedValue = useMemo(
        () => parseCounterValue(point.title),
        [point.title]
    );
    const initialValue = parsedValue
        ? `${parsedValue.prefix}0${parsedValue.suffix}`
        : point.title;

    useEffect(() => {
        const stat = statRef.current;
        const valueElement = valueRef.current;

        if (!canAnimate || !stat || !valueElement || !parsedValue) {
            return;
        }

        const counter = { current: 0 };
        const { prefix, suffix, value } = parsedValue;
        valueElement.textContent = `${prefix}0${suffix}`;

        const context = gsap.context(() => {
            gsap.to(counter, {
                current: value,
                duration: 1.4,
                delay: index * 0.12,
                ease: "power2.out",
                paused: true,
                snap: { current: 1 },
                onUpdate: () => {
                    valueElement.textContent = `${prefix}${Math.round(counter.current)}${suffix}`;
                },
                onComplete: () => {
                    valueElement.textContent = `${prefix}${Math.round(value)}${suffix}`;
                },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%",
                    once: true,
                },
            });
        }, stat);

        return () => {
            context.revert();
        };
    }, [canAnimate, index, parsedValue]);

    return (
        <div ref={statRef} className="block__stat">
            <div
                ref={valueRef}
                data-count={point.title}
                className="block__stat-value heading heading--medium heading--font-2 heading--weight-300 heading--white-color"
            >
                {initialValue}
            </div>
            <p className="text text--medium text--white-color">
                {point.description}
            </p>
        </div>
    );
}

export default function AboutCounters({
    points
}: AboutCountersProps) {
    const [canAnimate, setCanAnimate] = useState(false);

    useEffect(() => {
        if (!isPreloadingActive()) {
            const animationFrame = requestAnimationFrame(() => {
                setCanAnimate(true);
            });

            return () => {
                cancelAnimationFrame(animationFrame);
            };
        }

        const handlePreloaderDone = () => {
            setCanAnimate(true);
        };

        window.addEventListener('preloader:done', handlePreloaderDone, { once: true });

        return () => {
            window.removeEventListener('preloader:done', handlePreloaderDone);
        };
    }, []);

    return (
        <div className="block__stats">
            {points.map((point, index) => (
                <AboutCounterStat
                    key={point.title}
                    point={point}
                    index={index}
                    canAnimate={canAnimate}
                />
            ))}
        </div>
    );
}
