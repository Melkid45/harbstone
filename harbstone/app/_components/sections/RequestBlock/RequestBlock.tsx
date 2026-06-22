import BlockTitle from "../../general/block/BlockTitle/BlockTitle";
import BlockWrapper from "../../general/block/BlockWrapper/BlockWrapper";
import RequestForm, { RequestInput } from "./RequestForm";

interface RequestBlockProps {
    title: string;
    inputs: RequestInput[];
    pricing: {
        price: string;
    }[];
}

export default function RequestBlock({
    title,
    inputs,
    pricing
}: RequestBlockProps) {
    return (
        <BlockWrapper padding="y" background="dark">
            <div className="block__header block__header--pb">
                <BlockTitle
                    title={title}
                    type="white"
                />
            </div>
            <RequestForm
                inputs={inputs}
                pricing={pricing}
                variant="footer"
            />
        </BlockWrapper>
    )
}
