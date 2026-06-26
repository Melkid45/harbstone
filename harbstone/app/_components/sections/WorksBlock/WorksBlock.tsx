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
import { useI18n } from "@/app/_i18n/LocaleProvider";
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
    emptyMessage?: string;
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
        video?: string;
        name: string;
        slug?: string;
        href: string;
        description: string;
        celebritie?: string;
        industry?: string;
        project_link?: string;
        services?: string[];
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
    activeFilter,
    emptyMessage,
}: WorksBlockProps) {
    const { localizedHref, translations: t } = useI18n();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
    const activeCategory = categories?.find((item) => (
        item.slug === activeFilter?.service
    )) || categories?.[0];
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
                        { label: t.common.main, href: '/' },
                        { label: t.nav.works },
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
                            {categories?.map((item) => (
                                <Link
                                    key={item.label}
                                    href={localizedHref(normalizeHref(item.href, item.slug || slugify(item.label)))}
                                    className={`
                                        ${styles.works__category}
                                        ${item.slug === activeCategory?.slug ? styles['works__category--active'] : ''}
                                        text text--standard text--dark-color text--weight-400
                                    `}
                                    aria-current={item.slug === activeCategory?.slug ? 'page' : undefined}
                                    scroll={false}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="block__actions">
                            {activeCategory ? (
                                <Button
                                    isLink={true}
                                    href={normalizeHref(
                                        activeCategory.href,
                                        activeCategory.slug || slugify(activeCategory.label),
                                    )}
                                    size="large"
                                    background={!activeFilter?.soft ? 'dark' : 'light'}
                                    color={!activeFilter?.soft ? 'white' : 'dark'}
                                >
                                    {t.common.allWorks}
                                </Button>
                            ) : null}
                            {activeCategory?.children?.map((child, index) => (
                                    <Button
                                        key={`${activeCategory.label}-${child.label}-${index}`}
                                        isLink={true}
                                        href={normalizeHref(
                                            child.href,
                                            activeCategory.slug || slugify(activeCategory.label),
                                            child.slug || slugify(child.label),
                                        )}
                                        size="large"
                                        background={activeFilter?.soft === child.slug ? 'dark' : 'light'}
                                        color={activeFilter?.soft === child.slug ? 'white' : 'dark'}
                                    >
                                        {child.label}
                                    </Button>
                            ))}
                        </div>
                    </>
                ) : (
                    categories && (
                        <div className="block__nav block__nav--right">
                            {categories.map((item) => (
                                <Link
                                    key={item.label}
                                    href={localizedHref(normalizeHref(item.href, item.slug || slugify(item.label)))}
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
                {!works.length ? (
                    <p className={`${styles.works__empty} text text--medium text--dark-color`}>
                        {emptyMessage || t.common.noWorks}
                    </p>
                ) : null}
                {works.map((item, index) => (
                    <Link
                        key={item.slug || item.name}
                        href={localizedHref(item.href)}
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
                            {item.video ? (
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
                            ) : null}
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
                {noMore && works.length > 0 ? (
                    <Button isLink={true} href="/works" customClass={styles.works__more} background="white" border="dark" size="large" color="dark" place="centered">
                        <ArrowUpRight />
                        {t.common.seeAllWorks}
                    </Button>
                ) : null}
            </div>
        </BlockWrapper>
    )
}
