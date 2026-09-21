import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import styles from './TogetgerBlock.module.scss';
import TextAreaContent from "../../general/TextAreaContent/TextAreaContent";
interface TogetgerBlockProps {
    title: string;
    items: {
        text: string;
    }[];
}


export default function TogetgerBlock({
    title,
    items
}: TogetgerBlockProps) {
    return (
        <BlockWrapper padding="y" background="white">
            <div className={styles.outcomes}>
                <h2 className="heading heading--font-1 heading--medium">
                    {title}
                </h2>
                <div className={styles.outcomes__list}>
                    {items.map((item) => (
                        <TextAreaContent
                            key={item.text}
                            value={item.text}
                            className="text text--medium text--dark-color"
                        />
                    ))}
                </div>
            </div>
        </BlockWrapper>
    )
}
