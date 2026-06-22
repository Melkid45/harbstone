import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorks, works } from "../works";
import WorkHeroBlock from "@/app/_components/sections/WorksBlock/WorkHeroBlock/WorkHeroBlock";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";

interface WorkPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return works.map((work) => ({
        slug: work.slug,
    }));
}

export async function generateMetadata({
    params,
}: WorkPageProps): Promise<Metadata> {
    const { slug } = await params;
    const work = getWorks(slug);

    if (!work) {
        return {};
    }

    return {
        title: `${work.name} | HarbStone`,
        description: work.description,
    };
}

export default async function ServicePage({
    params,
}: WorkPageProps) {
    const { slug } = await params;
    const work = getWorks(slug);

    if (!work) {
        notFound();
    }

    return (
        <>
            <WorkHeroBlock
                title={work.name}
                description={work.description}
                project_link={work.project_link}
                project_link_type={work.project_link_type}
                industry={work.industry}
                categories={work.categories}
                celebritie={work.celebritie}
            />
            <WorksBlock
                title="More Works"
                padding="y"
                description="Why waste words describing what we’re capable of, when every project already shows the story better than we ever could."
                works={works}
            />
        </>
    );
}
