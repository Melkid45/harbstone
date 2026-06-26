import PageRenderer from "../PageRenderer/PageRenderer";
import type { StrapiPage } from "../../../_types/strapi";
import {
    getServicesCatalog,
    getTeamMembersCatalog,
    getWorksCatalog,
} from "../../../_lib/catalog";

interface CmsPageProps {
    page: StrapiPage;
}

export default async function CmsPage({
    page
}: CmsPageProps) {
    const structuredData = page.seo?.structuredData;
    const hasServicesBlock = page.blocks?.some((block) => (
        block.__component === 'blocks.services-list'
    ));
    const hasWorksBlock = page.blocks?.some((block) => (
        block.__component === 'blocks.works-list'
    ));
    const hasTeamBlock = page.blocks?.some((block) => (
        block.__component === 'blocks.team'
    ));
    const [services, works, teamMembers] = await Promise.all([
        hasServicesBlock || hasWorksBlock
            ? getServicesCatalog(page.locale)
            : [],
        hasWorksBlock
            ? getWorksCatalog(page.locale)
            : [],
        hasTeamBlock
            ? getTeamMembersCatalog(page.locale)
            : [],
    ]);

    return (
        <>
            {structuredData ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
                    }}
                />
            ) : null}
            <PageRenderer
                blocks={page.blocks}
                services={services}
                works={works}
                teamMembers={teamMembers}
            />
        </>
    );
}
