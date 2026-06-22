import Button from "@/app/_components/general/Button/Button";
import { ArrowUpRight } from "lucide-react";
import { StaticImageData } from "next/image";
import styles from './ShareBlock.module.scss';
import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";
interface ShareBlockProps {
    title: string;
    slug: string;
    image: StaticImageData | string;
}


export default function ShareBlock({
    title,
    slug,
    image
}: ShareBlockProps) {
    return (
        <BlockWrapper background="white" padding="pt">
            <div className={styles.share}>
                <Button isLink={true} href="" size="large" background="light" color="dark">
                    <ArrowUpRight />
                    Facebook
                </Button>
                <Button isLink={true} href="" size="large" background="light" color="dark">
                    <ArrowUpRight />
                    X (Twitter)
                </Button>
                <Button isLink={true} href="" size="large" background="light" color="dark">
                    <ArrowUpRight />
                    LinkedIn
                </Button>
            </div>
        </BlockWrapper>
    )
}