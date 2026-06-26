import { cache } from "react";
import type { StaticImageData } from "next/image";
import {
    getStrapiImageSource,
    getStrapiMediaUrl,
} from "./strapi";
import type {
    StrapiService,
    StrapiSubservice,
    StrapiTeamMember,
    StrapiWork,
} from "../_types/strapi";

const getStrapiUrl = () => (
    process.env.STRAPI_INTERNAL_URL
    || process.env.STRAPI_URL
    || process.env.NEXT_PUBLIC_STRAPI_URL
    || ''
).replace(/\/$/, '');

const fetchStrapi = async <T>(
    path: string,
    tag: string
): Promise<T | null> => {
    const strapiUrl = getStrapiUrl();

    if (!strapiUrl) {
        return null;
    }

    try {
        const response = await fetch(`${strapiUrl}${path}`, {
            signal: AbortSignal.timeout(3000),
            next: {
                revalidate: 60,
                tags: [tag],
            },
        });

        if (!response.ok) {
            return null;
        }

        const payload = await response.json() as { data?: T | null };
        return payload.data ?? null;
    } catch {
        return null;
    }
};

export const getServicesCatalog = cache(async (
    locale = 'en'
): Promise<StrapiService[]> => (
    await fetchStrapi<StrapiService[]>(
        `/api/services/catalog?locale=${encodeURIComponent(locale)}`,
        `services:${locale}`
    ) || []
));

export const getServiceBySlug = cache(async (
    slug: string,
    locale = 'en'
): Promise<StrapiService | null> => (
    fetchStrapi<StrapiService>(
        `/api/services/by-slug/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
        `service:${locale}:${slug}`
    )
));

export const getWorksCatalog = cache(async (
    locale = 'en'
): Promise<StrapiWork[]> => (
    await fetchStrapi<StrapiWork[]>(
        `/api/works/catalog?locale=${encodeURIComponent(locale)}`,
        `works:${locale}`
    ) || []
));

export const getWorkBySlug = cache(async (
    slug: string,
    locale = 'en'
): Promise<StrapiWork | null> => (
    fetchStrapi<StrapiWork>(
        `/api/works/by-slug/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
        `work:${locale}:${slug}`
    )
));

export const getTeamMembersCatalog = cache(async (
    locale = 'en'
): Promise<StrapiTeamMember[]> => (
    await fetchStrapi<StrapiTeamMember[]>(
        `/api/team-members/catalog?locale=${encodeURIComponent(locale)}`,
        `team-members:${locale}`
    ) || []
));

export interface ServiceCard {
    name: string;
    description: string;
    preview?: StaticImageData | string;
    video?: string;
    href: string;
    children?: {
        name: string;
        href: string;
        description?: string;
    }[];
}

export interface WorkCard {
    preview: StaticImageData | string;
    video?: string;
    name: string;
    slug: string;
    href: string;
    description: string;
    celebritie?: string;
    industry?: string;
    project_link?: string;
    services: string[];
    soft: string[];
}

export interface WorkCategory {
    label: string;
    href: string;
    slug: string;
    children: {
        label: string;
        href: string;
        slug: string;
    }[];
}

export interface TeamMemberCard {
    name: string;
    role?: string;
    photo: StaticImageData | string;
}

const getWorksHref = (service?: string, soft?: string) => {
    const params = new URLSearchParams();

    if (service) {
        params.set('service', service);
    }

    if (soft) {
        params.set('soft', soft);
    }

    const query = params.toString();
    return query ? `/works?${query}` : '/works';
};

export const mapServiceToCard = (
    service: StrapiService
): ServiceCard => ({
    name: service.name,
    description: service.description,
    preview: service.previewImage
        ? getStrapiImageSource(service.previewImage)
        : undefined,
    video: service.previewVideo
        ? getStrapiMediaUrl(service.previewVideo)
        : undefined,
    href: `/services/${service.slug}`,
    children: service.subservices?.map((subservice) => ({
        name: subservice.name,
        description: subservice.description || undefined,
        href: `/services/${service.slug}#${subservice.slug}`,
    })),
});

export const mapWorkToCard = (
    work: StrapiWork
): WorkCard => ({
    name: work.name,
    slug: work.slug,
    description: work.description,
    preview: getStrapiImageSource(work.previewImage),
    video: work.previewVideo
        ? getStrapiMediaUrl(work.previewVideo)
        : undefined,
    href: `/works/${work.slug}`,
    celebritie: work.celebrity || undefined,
    industry: work.industry || undefined,
    project_link: work.projectUrl || undefined,
    services: (work.services || []).map((service) => service.slug),
    soft: (work.subservices || []).map((subservice) => subservice.slug),
});

export const mapTeamMemberToCard = (
    member: StrapiTeamMember
): TeamMemberCard => ({
    name: member.name,
    role: member.role || undefined,
    photo: getStrapiImageSource(member.photo),
});

export const buildWorkCategories = (
    services: StrapiService[],
    works: WorkCard[]
): WorkCategory[] => (
    services.flatMap((service) => {
        const hasServiceWorks = works.some((work) => (
            work.services.includes(service.slug)
        ));
        const children = (service.subservices || []).flatMap((subservice) => {
            const hasSubserviceWorks = works.some((work) => (
                work.services.includes(service.slug)
                && work.soft.includes(subservice.slug)
            ));

            return hasSubserviceWorks ? [{
                label: subservice.name,
                slug: subservice.slug,
                href: getWorksHref(service.slug, subservice.slug),
            }] : [];
        });

        return hasServiceWorks ? [{
            label: service.name,
            slug: service.slug,
            href: getWorksHref(service.slug),
            children,
        }] : [];
    })
);

export const filterWorkCards = (
    works: WorkCard[],
    filters: {
        service?: string;
        soft?: string;
    }
) => (
    works.filter((work) => (
        (!filters.service || work.services.includes(filters.service))
        && (!filters.soft || work.soft.includes(filters.soft))
    ))
);

export const getSubserviceCategories = (
    work: StrapiWork
) => (
    (work.subservices || []).map((subservice: StrapiSubservice) => {
        const serviceSlug = subservice.service?.slug
            || work.services?.find((service) => (
                service.subservices?.some((item) => item.slug === subservice.slug)
            ))?.slug;

        return {
            label: subservice.name,
            href: getWorksHref(serviceSlug, subservice.slug),
        };
    })
);
