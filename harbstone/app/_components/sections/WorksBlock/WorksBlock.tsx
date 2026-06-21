'use client';

import { useEffect, useRef, useState, type FocusEvent } from "react";
import Image, { StaticImageData } from "next/image";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from './WorksBlock.module.scss';
import Button from "../../general/Button/Button";
interface WorksBlockProps {
    title: string;
    description: string;
    padding?: 'y' | 'pt' | 'pb';
    categories: {
        label: string;
        href: string
    }[];
    works: {
        preview: string | StaticImageData;
        video: string;
        name: string;
        href: string;
        description: string;
    }[];
}

export default function WorksBlock({
    title,
    description,
    categories,
    works,
    padding = 'pt'
}: WorksBlockProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

    useEffect(() => {
        const videos = videoRefs.current;

        return () => {
            videos.forEach((video) => {
                video?.pause();
            });
        };
    }, []);

    const playVideo = (index: number) => {
        const video = videoRefs.current[index];

        setActiveIndex(index);

        if (!video) {
            return;
        }

        video.muted = true;
        video.currentTime = 0;
        void video.play().catch(() => {
            setActiveIndex((currentIndex) => currentIndex === index ? null : currentIndex);
        });
    };

    const stopVideo = (index: number) => {
        const video = videoRefs.current[index];

        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        setActiveIndex((currentIndex) => currentIndex === index ? null : currentIndex);
    };

    const handleBlur = (event: FocusEvent<HTMLAnchorElement>, index: number) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            stopVideo(index);
        }
    };

    return (
        <BlockWrapper padding={padding} background="white">
            <div className="block__header block__header--grid block__header--pb">
                <BlockTitle
                    title={title}
                    description={description}
                />
                <div className="block__nav block__nav--right">
                    {categories.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text text--standard text--dark-color text--weight-500"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.works}>
                {works.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`
                            ${styles.works__item}
                            ${activeIndex === index ? styles['works__item--active'] : ''}
                        `}
                        onPointerEnter={() => playVideo(index)}
                        onPointerLeave={() => stopVideo(index)}
                        onFocus={() => playVideo(index)}
                        onBlur={(event) => handleBlur(event, index)}
                    >
                        <div className={styles.works__media}>
                            <Image
                                src={item.preview}
                                alt={item.name}
                                className={styles.works__image}
                                fill
                                sizes="(max-width: 1000px) 100vw, 50vw"
                            />
                            <video
                                ref={(node) => {
                                    videoRefs.current[index] = node;
                                }}
                                className={styles.works__video}
                                preload="metadata"
                                playsInline
                                loop
                                muted
                                aria-hidden="true"
                            >
                                <source src={item.video} type="video/webm" />
                            </video>
                        </div>
                        <div className={styles.works__info}>
                            <h3
                                className="heading heading--small heading--font-2 heading--weight-600 heading--dark-color"
                            >
                                {item.name}
                            </h3>
                            <p className="text text--medium text--dark-color">
                                {item.description}
                            </p>
                        </div>
                    </Link>
                ))}
                <Button isLink={true} href="/works" customClass={styles.works__more} background="white" border="dark" size="large" color="dark" place="centered">
                    <ArrowUpRight />
                    See all works
                </Button>
            </div>
        </BlockWrapper>
    )
}
