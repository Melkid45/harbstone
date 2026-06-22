import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import { categories, getFilteredWorks } from "./works";

interface WorksPageProps {
    searchParams: Promise<{
        service?: string | string[];
        soft?: string | string[];
    }>;
}

const getFirstParam = (value?: string | string[]) => (
    Array.isArray(value) ? value[0] : value
);

export default async function Works({ searchParams }: WorksPageProps) {
    const params = await searchParams;
    const activeFilter = {
        service: getFirstParam(params.service),
        soft: getFirstParam(params.soft),
    };
    const filteredWorks = getFilteredWorks(activeFilter);

    return (
        <WorksBlock
            breadcrumbs={true}
            title="Works"
            works={filteredWorks}
            noMore={false}
            padding="y"
            filtered={true}
            number={true}
            categories={categories}
            activeFilter={activeFilter}
        />
    )
}
