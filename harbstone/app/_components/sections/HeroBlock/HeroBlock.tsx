import { ReactNode } from "react";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Button from "../../general/Button/Button";
import { ArrowUpRight } from "lucide-react";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import styles from './HeroBlock.module.scss';
interface HeroBlockProps {
    title: string | ReactNode;
    description: string;
}

export default function HeroBlock({
    title,
    description
}: HeroBlockProps) {
    return (
        <BlockWrapper number={true} background="white" padding="pb">
            <div className={styles.block__header}>
                <BlockTitle
                    title={title}
                    description={description}
                />
                <div className={styles.block__actions}>
                    <Button background="dark" size="large" color="white">
                        <ArrowUpRight />
                        Start Your Project
                    </Button>
                    <Button isLink={true} href="/works" background="white" size="large" color="dark" border="dark">
                        <ArrowUpRight />
                        See Real Results
                    </Button>
                </div>
            </div>
        </BlockWrapper>

    )
}