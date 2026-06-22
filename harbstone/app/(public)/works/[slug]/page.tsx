import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorks, works } from "../works";
import WorkHeroBlock from "@/app/_components/sections/WorksBlock/WorkHeroBlock/WorkHeroBlock";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import ReelsBlock from "@/app/_components/sections/ReelsBlock/ReelsBlock";
import ShareBlock from "@/app/_components/sections/works/ShareBlock/ShareBlock";
import IdeaBlock from "@/app/_components/sections/works/IdeaBlock/IdeaBlock";
import GalleryBlock from "@/app/_components/sections/works/GalleryBlock/GalleryBlock";
import Gallery1 from '@/app/assets/images/gallery/1.jpg';
import Gallery2 from '@/app/assets/images/gallery/2.jpg';
import Gallery3 from '@/app/assets/images/gallery/3.jpg';
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
            <ReelsBlock
                video="https://vimeo.com/547110638"
            />
            <IdeaBlock
                title="Idea"
                desctiption="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            />
            <GalleryBlock
                gallery={[
                    {image: Gallery1},
                    {image: Gallery2},
                ]}
            />
            <IdeaBlock
                desctiption="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
            />
            <GalleryBlock
                gallery={[
                    {image: Gallery3}
                ]}
            />
            <IdeaBlock
                desctiption="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
            />
            <ShareBlock
                title={work.name}
                slug={work.slug}
                image={work.preview}
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
