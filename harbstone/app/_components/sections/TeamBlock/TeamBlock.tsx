'use client'

import { Splide, SplideSlide } from "@splidejs/react-splide";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Image, { StaticImageData } from "next/image";
import styles from './TeamBlock.module.scss';
interface TeamBlockProps {
    members: {
        name: string;
        role?: string;
        photo: StaticImageData | string;
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
    }
}

export default function TeamBlock({
    members
}: TeamBlockProps) {
    return (
        <BlockWrapper padding="y" background="white">
            <Splide options={splideOptions} aria-label="Team Gallery" className={styles['team-splide']}>
                {members.map((item) => (
                    <SplideSlide key={item.name} className={styles.team__person}>
                        <Image
                            className={styles.team__image}
                            src={item.photo}
                            alt={item.name}
                        />
                        <div className={styles['team__person-data']}>
                            <span className="text text--large text--dark-color">
                                {item.name}
                            </span>
                            {item.role && (
                                <p className="text text--small text--dark-color">
                                    {item.role}
                                </p>
                            )}
                        </div>
                    </SplideSlide>
                ))}
            </Splide>
        </BlockWrapper>
    )
}