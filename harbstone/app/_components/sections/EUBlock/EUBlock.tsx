import Image, { StaticImageData } from "next/image";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './EUBlock.module.scss';
interface EUBlockProps {
    projects: {
        title: string;
        description: string;
        image: StaticImageData | string;
    }[];
}

export default function EUBlock({
    projects
}: EUBlockProps) {
    return (
        <BlockWrapper background="white" padding="y" overflow="visible">
            <div className={styles['eu-projects']}>
                {projects.map((item, index) => (
                    <div
                        key={item.title}
                        className={`${styles['eu-projects__item']} ${styles['eu-projects__item--dark-border']}`}
                        style={{ zIndex: index + 1 }}
                    >
                        <div className={styles['eu-projects__content']}>
                            <div className={styles['eu-projects__description']}>
                                <h3
                                    className="heading heading--small heading--font-2 heading--weight-600 heading--dark-color"
                                >
                                    {item.title}
                                </h3>
                                <p className="text text--medium text--dark-color">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <div className={styles['eu-projects__media']}>
                            <Image
                                className={`${styles['preview-image']} ${styles['contain']}`}
                                src={item.image}
                                alt={item.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </BlockWrapper>
    )
}
