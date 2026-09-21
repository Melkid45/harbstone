import BlockTitle from "@/app/_components/general/block/BlockTitle/BlockTitle";
import BlockWrapper from "@/app/_components/general/block/BlockWrapper/BlockWrapper";

interface IdeaBlockProps {
    title?: string;
    desctiption?: string;
}


export default function IdeaBlock({
    title,
    desctiption
}:IdeaBlockProps) {
    if (!title && !desctiption) {
        return null;
    }

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
