'use client';

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import Image, { StaticImageData } from "next/image";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from './WorksBlock.module.scss';
import Button from "../../general/Button/Button";
import Breadcrumbs from "../../general/Breadcrumbs/Breadcrumbs";
interface WorksBlockProps {
    title: string;
    description?: string;
    padding?: 'y' | 'pt' | 'pb';
    breadcrumbs?: boolean;
    number?: boolean;
    noMore?: boolean;
    filtered?: boolean;
    activeFilter?: {
        service?: string;
        soft?: string;
    };
    categories?: {
        label: string;
        href: string;
        slug?: string;
        children?: {
            label: string;
            href: string;
            slug?: string;
        }[]
    }[];
    works: {
        preview: string | StaticImageData;
        video: string;
        name: string;
        href: string;
        description: string;
        celebritie?: string;
        industry?: string;
        project_link?: string;
        service?: string;
        soft?: string[];
    }[];
}

const slugify = (value: string) => (
    value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
);

const buildWorksFilterHref = (service?: string, soft?: string) => {
    const params = new URLSearchParams();

    if (service) {
        params.set('service', service);
    }

    if (soft) {
        params.set('soft', soft);
    }

    const query = params.toString();

    return query ? `/works?${query}` : '/works';
};

const normalizeHref = (
    href: string | undefined,
    service?: string,
    soft?: string,
) => (
    href && href !== '/' ? href : buildWorksFilterHref(service, soft)
);

export default function WorksBlock({
    title,
    description,
    categories,
    works,
    padding = 'pt',
    breadcrumbs,
    noMore = true,
    number = false,
    filtered = false,
    activeFilter
}: WorksBlockProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const softCategories = categories?.filter((item) => (
        !activeFilter?.service || item.slug === activeFilter.service
    ));
    const worksAnimationKey = filtered
        ? `${activeFilter?.service || 'all'}-${activeFilter?.soft || 'all'}-${works.map((work) => work.href).join('|')}`
        : 'static';

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
        <BlockWrapper number={number} padding={padding} background="white">
            {breadcrumbs && (
                <Breadcrumbs
                    type="dark"
                    breadcrumbs={[
                        { label: 'Main', href: '/' },
                        { label: 'Works' },
                    ]}
                />
            )}
            <div className={`block__header block__header--pb ${!filtered && 'block__header--grid'}`}>
                <BlockTitle
                    title={title}
                    description={description && description}
                />
                {filtered ? (
                    <>
                        <div className="block__nav">
                            <Link
                                href="/works"
                                className={`text text--standard text--dark-color text--weight-400`}
                                scroll={false}
                            >
                                All works
                            </Link>
                            {categories?.map((item) => (
                                <Link
                                    key={item.label}
                                    href={normalizeHref(item.href, item.slug || slugify(item.label))}
                                    className={`text text--standard text--dark-color text--weight-400`}
                                    scroll={false}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="block__actions">
                            {softCategories?.map((item) => (
                                item.children?.map((child, index) => (
                                    <Button
                                        key={`${item.label}-${child.label}-${index}`}
                                        isLink={true}
                                        href={normalizeHref(
                                            child.href,
                                            item.slug || slugify(item.label),
                                            child.slug || slugify(child.label),
                                        )}
                                        size="large"
                                        background={activeFilter?.soft === child.slug ? 'dark' : 'light'}
                                        color={activeFilter?.soft === child.slug ? 'white' : 'dark'}
                                    >
                                        {child.label}
                                    </Button>
                                ))
                            ))}
                        </div>
                    </>
                ) : (
                    categories && (
                        <div className="block__nav block__nav--right">
                            {categories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={normalizeHref(item.href, item.slug || slugify(item.label))}
                                    className="text text--standard text--dark-color text--weight-500"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    )
                )}

            </div>
            <div key={worksAnimationKey} className={styles.works}>
                {works.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        style={{ '--work-index': index } as CSSProperties}
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
                {noMore && (
                    <Button isLink={true} href="/works" customClass={styles.works__more} background="white" border="dark" size="large" color="dark" place="centered">
                        <ArrowUpRight />
                        See all works
                    </Button>
                )}
            </div>
        </BlockWrapper>
    )
}
