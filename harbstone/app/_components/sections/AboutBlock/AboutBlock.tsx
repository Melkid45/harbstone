import { ReactNode } from "react";
import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import Breadcrumbs from "../../general/Breadcrumbs/Breadcrumbs";
import AboutCounters from "./AboutCounters";

interface AboutBlockProps {
    title: string | ReactNode;
    description: string;
    breadcrumbs?: {
        label: string;
        href?: string;
    }[];
    points: {
        title: string;
        description: string;
    }[];
}


export default function AboutBlock({
    title,
    description,
    breadcrumbs = [
        {label: 'Main', href: '/'},
        {label: 'About'},
    ],
    points
}: AboutBlockProps) {
    return (
        <BlockWrapper padding="pb" background="dark" number={true}>
            <Breadcrumbs
                breadcrumbs={breadcrumbs}
            />
            <div className="block__header">
                <BlockTitle
                    title={title}
                    description={description}
                    type="white"
                />
                <AboutCounters points={points} />
            </div>
        </BlockWrapper>
    )
}
