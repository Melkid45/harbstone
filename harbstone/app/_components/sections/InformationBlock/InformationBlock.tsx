import { ReactNode } from "react";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './InformationBlock.module.scss';
interface InformationBlockProps {
    title: string;
    texts: {
        text: string;
    }[];
}


export default function InformationBlock({
    title,
    texts
}: InformationBlockProps) {
    return (
        <BlockWrapper background="white" padding="pt">
            <div className={styles.about}>
                <div>
                    <h2
                        className="heading heading--font-1 heading--large heading--dark-color"
                    >
                        {title}
                    </h2>
                </div>
                <div className={styles.about__content}>
                    {texts.map((item) => (
                        <p key={item.text} className="text text--medium text--dark-color">
                            {item.text}
                        </p>
                    ))}
                </div>
            </div>
        </BlockWrapper>
    )
}