import { ReactNode } from "react";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Button from "../../general/Button/Button";
import { ArrowUpRight } from "lucide-react";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import Breadcrumbs from "../../general/Breadcrumbs/Breadcrumbs";
interface HeroBlockProps {
    title: string | ReactNode;
    description: string;
    fullText?: boolean;
    padding?: 'pb' | 'pt';
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
}

export default function HeroBlock({
    title,
    description,
    breadcrumbs,
    fullText = false,
    padding = 'pb'
}: HeroBlockProps) {
    return (
        <BlockWrapper number={true} background="white" padding={padding}>
            {breadcrumbs && (
                <Breadcrumbs
                    breadcrumbs={breadcrumbs}
                    type="dark"
                />
            )}
            <div className="block__header">
                <BlockTitle
                    title={title}
                    description={description}
                    full={fullText}
                />
                <div className="block__actions">
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
