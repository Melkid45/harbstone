import Image, { StaticImageData } from "next/image";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './FounderBlock.module.scss';
import { ReactNode } from "react";
interface FounderBlockProps {
    photo: StaticImageData | string;
    name: string;
    role: string;
    description: ReactNode | string;
}


export default function FounderBlock({
    photo,
    name,
    description,
    role
}: FounderBlockProps) {
    return (
        <BlockWrapper padding="none" background="dark-deep">
            <div className={styles.founder}>
                <div className={styles.founder__body}>
                    <div className={styles.founder__content}>
                        <div className={styles.founder__container}>
                            <p className={`${styles.founder__quote} text text--huge text--white-color`}>
                                {description}
                            </p>
                            <div className={styles.founder__signature}>
                                <span className="text text--large text--white-color">
                                    {name}
                                </span>
                                <p className="text text--small text--white-color">
                                    {role}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Image
                        src={photo}
                        alt={name}
                        className={styles.founder__image}
                    />
                </div>
            </div>
        </BlockWrapper>
    )
}