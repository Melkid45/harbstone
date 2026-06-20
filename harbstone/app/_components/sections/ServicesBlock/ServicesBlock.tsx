'use client';

import { useEffect, useRef, useState, type FocusEvent } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import styles from './ServicesBlock.module.scss';
import Button from "../../general/Button/Button";

interface ServicesBlockProps {
    title: string;
    description: string;
    services: {
        name: string;
        description: string;
        preview: StaticImageData | string;
        video: string;
        href: string;
        children: {
            name: string;
            href: string;
        }[];
    }[];
}

export default function ServicesBlock({
    title,
    description,
    services
}: ServicesBlockProps) {
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

    const handleBlur = (event: FocusEvent<HTMLDivElement>, index: number) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            stopVideo(index);
        }
    };

    return (
        <BlockWrapper padding="pt" background="white" overflow="visible">
            <div className={`${styles.block__header} ${styles['block__header--pb']}`}>
                <BlockTitle
                    title={title}
                    description={description}
                />
            </div>
            <div className={styles.services}>
                {services.map((item, index) => (
                    <div
                        key={item.name}
                        className={`
                            ${styles.services__item}
                            ${styles['services__item--light']}
                            ${styles['services__item--grid']}
                            ${activeIndex === index ? styles['services__item--active'] : ''}
                        `}
                        style={{ zIndex: index + 1 }}
                        onPointerEnter={() => playVideo(index)}
                        onPointerLeave={() => stopVideo(index)}
                        onFocus={() => playVideo(index)}
                        onBlur={(event) => handleBlur(event, index)}
                    >
                        <div className={styles.services__content}>
                            <div className={styles.services__description}>
                                <Link href={item.href} className="heading heading--small heading--font-2 heading--weight-600 heading--dark-color">
                                    {item.name}
                                </Link>
                                <p className="text text--medium text--dark-color">
                                    {item.description}
                                </p>
                            </div>
                            <div className={styles.services__tags}>
                                {item.children.map((item) => (
                                    <Button key={item.name} isLink={true} href={item.href} size="large" background="light" color="dark">
                                        {item.name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.services__media}>
                            <Image
                                src={item.preview}
                                alt={item.name}
                                className={styles.services__image}
                                fill
                                sizes="(max-width: 1200px) 0px, 38vw"
                            />
                            <video
                                ref={(node) => {
                                    videoRefs.current[index] = node;
                                }}
                                className={styles.services__video}
                                preload="metadata"
                                playsInline
                                loop
                                muted
                                aria-hidden="true"
                            >
                                <source src={item.video} type="video/webm" />
                            </video>
                        </div>
                    </div>
                ))}
            </div>
        </BlockWrapper>
    )
}
