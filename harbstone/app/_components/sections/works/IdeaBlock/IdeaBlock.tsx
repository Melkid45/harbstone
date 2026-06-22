import BlockTitle from "@/app/_components/general/block/BlockTitle/BlockTitle";
import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";
import { ReactNode } from "react";

interface IdeaBlockProps {
    title?: string;
    desctiption?: string;
}


export default function IdeaBlock({
    title,
    desctiption
}:IdeaBlockProps) {
    return (
        <BlockWrapper size="narrow" background="white" padding="pt">
            <BlockTitle
                size="medium"
                title={title}
                description={desctiption}
                full={true}
            />
        </BlockWrapper>
    )
}