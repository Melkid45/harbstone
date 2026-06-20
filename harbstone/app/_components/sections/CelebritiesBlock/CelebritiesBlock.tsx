'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image, { StaticImageData } from 'next/image';
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './CelebritiesBlock.module.scss';
import Button from '../../general/Button/Button';

interface CelebritiesBlockProps {
    title: string;
    description: string;
    celebrities: {
        title: string;
        description: string;
        href: string;
        image: string | StaticImageData;
    }[];
}

const splideOptions = {
    type: "loop",
    perPage: 3,
    perMove: 1,
    arrows: false,
    pagination: false,
    gap: 50,
    breakpoints: {
        1500: { gap: 40, perPage: 3 },
        1300: { gap: 30, perPage: 2 },
        1000: { gap: 24 },
        660: { perPage: 1 },
    },
};

export default function CelebritiesBlock({
    title,
    description,
    celebrities
}: CelebritiesBlockProps) {
    return (
        <BlockWrapper padding="pt" background="white">
            <div className={`${styles.block__header} ${styles['block__header--pb']}`}>
                <BlockTitle
                    title={title}
                    description={description}
                />
            </div>
            <Splide
                className={styles.celebrities}
                aria-label={title}
                options={splideOptions}
            >
                {celebrities.map((slide) => (
                    <SplideSlide key={slide.title}>
                        <a href={slide.href} className={styles.celebrities__item}>
                            <Image
                                className={styles.celebrities__image}
                                src={slide.image}
                                alt={slide.title}
                                loading='eager'
                            />
                            <Button customClass={styles.celebrities__button} background='gradient' size='medium' color='white' border='white'>
                                <svg
                                    width="11"
                                    height="13"
                                    viewBox="0 0 11 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M0 11.2679V1.77296C0 0.994204 0.85084 0.514306 1.5173 0.917161L9.55152 5.77359C10.2027 6.1672 10.1932 7.11497 9.53422 7.49542L1.5 12.134C0.833333 12.5189 0 12.0377 0 11.2679Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Watch now
                            </Button>
                            <span className={styles.celebrities__button}>

                            </span>
                            <div className={styles.celebrities__info}>
                                <h3 className="heading heading--font-1 heading--small heading--white-color">
                                    {slide.title}
                                </h3>
                                <p className="text text--small text--white-color text--weight-300">
                                    {slide.description}
                                </p>
                            </div>
                        </a>
                    </SplideSlide>
                ))}
            </Splide>
        </BlockWrapper>
    );
}
