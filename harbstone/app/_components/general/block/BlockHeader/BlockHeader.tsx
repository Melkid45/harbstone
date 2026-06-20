import { ReactNode } from "react";
import BlockTitle from "../BlockTitle/BlockTitle";

interface BlockHeaderProps {
    title: string | ReactNode;
    description: string;
}


export default function BlockHeader({
    title,
    description
}: BlockHeaderProps) {
    return (
        <div className="block__header block__header--pb">
            <BlockTitle title={title} description={description} />
        </div>
    )
}
