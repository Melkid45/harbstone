import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorks, works as localWorks } from "../works";
import WorkHeroBlock from "@/app/_components/sections/WorksBlock/WorkHeroBlock/WorkHeroBlock";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import ReelsBlock from "@/app/_components/sections/ReelsBlock/ReelsBlock";
import ShareBlock from "@/app/_components/sections/works/ShareBlock/ShareBlock";
import IdeaBlock from "@/app/_components/sections/works/IdeaBlock/IdeaBlock";
import GalleryBlock from "@/app/_components/sections/works/GalleryBlock/GalleryBlock";
import Gallery1 from '@/app/assets/images/gallery/1.jpg';
import Gallery2 from '@/app/assets/images/gallery/2.jpg';
import Gallery3 from '@/app/assets/images/gallery/3.jpg';
import PageRenderer from "@/app/_components/general/PageRenderer/PageRenderer";
import {
    buildWorkCategories,
    getServicesCatalog,
    getSubserviceCategories,
    getTeamMembersCatalog,
    getWorkBySlug,
    getWorksCatalog,
    mapWorkToCard,
} from "@/app/_lib/catalog";
import { getContentMetadata } from "@/app/_lib/pageMetadata";
import { getRequestLocale } from "@/app/_i18n/server";
import { getTranslations } from "@/app/_i18n/config";
interface WorkPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        locale?: string | string[];
    }>;
}

export async function generateMetadata({
    params,
    searchParams,
}: WorkPageProps): Promise<Metadata> {
    const [{ slug }, query] = await Promise.all([params, searchParams]);
    const locale = await getRequestLocale(query.locale);
    const cmsWork = await getWorkBySlug(slug, locale);

    if (cmsWork) {
        return getContentMetadata(
            cmsWork.name,
            cmsWork.seo,
            cmsWork.description
        );
    }

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
    searchParams,
}: WorkPageProps) {
    const [{ slug }, query] = await Promise.all([params, searchParams]);
    const locale = await getRequestLocale(query.locale);
    const t = getTranslations(locale);
    const [cmsWork, cmsServices, cmsWorks, teamMembers] = await Promise.all([
        getWorkBySlug(slug, locale),
        getServicesCatalog(locale),
        getWorksCatalog(locale),
        getTeamMembersCatalog(locale),
    ]);

    if (cmsWork) {
        const workCards = cmsWorks.map(mapWorkToCard);
        const categories = [
            ...(cmsWork.services || []).map((service) => ({
                label: service.name,
                href: `/works?service=${encodeURIComponent(service.slug)}`,
            })),
            ...getSubserviceCategories(cmsWork),
        ];

        return (
            <>
                <WorkHeroBlock
                    title={cmsWork.name}
                    description={cmsWork.description}
                    project_link={cmsWork.projectUrl || undefined}
                    project_link_type={cmsWork.projectLinkLabel || undefined}
                    industry={cmsWork.industry || undefined}
                    categories={categories}
                    celebritie={cmsWork.celebrity || undefined}
                />
                <PageRenderer
                    blocks={cmsWork.blocks}
                    services={cmsServices}
                    works={cmsWorks}
                    teamMembers={teamMembers}
                    currentWork={cmsWork}
                />
                {!cmsWork.blocks?.some((block) => (
                    block.__component === 'blocks.related-works'
                )) ? (
                    <WorksBlock
                        title={t.common.moreWorks}
                        padding="y"
                        works={workCards.filter((item) => item.slug !== cmsWork.slug)}
                        categories={buildWorkCategories(cmsServices, workCards)}
                    />
                ) : null}
            </>
        );
    }

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
                works={localWorks}
            />
        </>
    );
}
