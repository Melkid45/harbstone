import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroBlock from "@/app/_components/sections/HeroBlock/HeroBlock";
import { getService } from "../services";
import ServicesBlock from "@/app/_components/sections/ServicesBlock/ServicesBlock";
import PageRenderer from "@/app/_components/general/PageRenderer/PageRenderer";
import {
    getServiceBySlug,
    getServicesCatalog,
    getTeamMembersCatalog,
    getWorksCatalog,
} from "@/app/_lib/catalog";
import { getContentMetadata } from "@/app/_lib/pageMetadata";
import { getRequestLocale } from "@/app/_i18n/server";

interface ServicePageProps {
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
}: ServicePageProps): Promise<Metadata> {
    const [{ slug }, query] = await Promise.all([params, searchParams]);
    const locale = await getRequestLocale(query.locale);
    const cmsService = await getServiceBySlug(slug, locale);

    if (cmsService) {
        return getContentMetadata(
            cmsService.name,
            cmsService.seo,
            cmsService.description
        );
    }

    const service = getService(slug);

    if (!service) {
        return {};
    }

    return {
        title: `${service.name} | HarbStone`,
        description: service.description,
    };
}

export default async function ServicePage({
    params,
    searchParams,
}: ServicePageProps) {
    const [{ slug }, query] = await Promise.all([params, searchParams]);
    const locale = await getRequestLocale(query.locale);
    const [cmsService, cmsServices, cmsWorks, teamMembers] = await Promise.all([
        getServiceBySlug(slug, locale),
        getServicesCatalog(locale),
        getWorksCatalog(locale),
        getTeamMembersCatalog(locale),
    ]);

    if (cmsService) {
        return (
            <>
                <HeroBlock
                    breadcrumbs={[
                        { label: 'Main', href: '/' },
                        { label: 'Services', href: '/services' },
                        { label: cmsService.name },
                    ]}
                    title={cmsService.name}
                    description={cmsService.description}
                    fullText={true}
                />
                {cmsService.subservices?.length ? (
                    <ServicesBlock
                        dark={true}
                        services={cmsService.subservices.map((item) => ({
                            name: item.name,
                            description: item.description || cmsService.description,
                            href: `/services/${cmsService.slug}#${item.slug}`,
                        }))}
                    />
                ) : null}
                <PageRenderer
                    blocks={cmsService.blocks}
                    services={cmsServices}
                    works={cmsWorks}
                    teamMembers={teamMembers}
                />
            </>
        );
    }

    const service = getService(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <HeroBlock
                breadcrumbs={[
                    { label: 'Main', href: '/' },
                    { label: 'Services', href: '/services' },
                    { label: service.name },
                ]}
                title={service.name}
                description={service.description}
                fullText={true}
            />
            <ServicesBlock
                dark={true}
                services={service.children.map((item) => ({
                    name: item.name,
                    description: 'description' in item ? item.description : service.description,
                    href: item.href,
                }))}
            />
        </>
    );
}
