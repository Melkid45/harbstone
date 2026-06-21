import Image, { StaticImageData } from "next/image";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './HowWorkBlock.module.scss';
interface HowWorkBlockProps {
    logo?: StaticImageData | string;
    items: {
        title: string;
        description: string;
    }[];
}


export default function HowWorkBlock({
    logo,
    items
}: HowWorkBlockProps) {
    return (
        <>
            {logo && (
                <BlockWrapper padding="pt" background="white">
                    <div className="block__header">
                        <div className="block__title block__title--full">
                            <Image src={logo} alt="Logo" className="invert" />
                        </div>
                    </div>
                </BlockWrapper>
            )}
            <BlockWrapper padding="pt" background="white">
                <div className={styles['how-it-works']}>
                    {items.map((item) => (
                        <div key={item.title} className={styles['how-it-works__item']}>
                            <h3 className="text text--large text--dark-color text--weight-600">
                                {item.title}
                            </h3>
                            <p className="text text--medium text--dark-color">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </BlockWrapper>
        </>
    )
}