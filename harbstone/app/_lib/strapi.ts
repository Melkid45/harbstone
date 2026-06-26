import { cache } from "react";
import type { StaticImageData } from "next/image";
import type { StrapiMedia, StrapiPage } from "../_types/strapi";

const getStrapiApiUrl = () => (
    process.env.STRAPI_INTERNAL_URL
    || process.env.STRAPI_URL
    || process.env.NEXT_PUBLIC_STRAPI_URL
    || ''
).replace(/\/$/, '');

const getStrapiPublicUrl = () => (
    process.env.NEXT_PUBLIC_STRAPI_URL
    || process.env.STRAPI_URL
    || process.env.STRAPI_INTERNAL_URL
    || ''
).replace(/\/$/, '');

export const getStrapiMediaUrl = (media?: StrapiMedia | null) => {
    if (!media?.url) {
        return '';
    }

    if (/^https?:\/\//.test(media.url)) {
        return media.url;
    }

    const strapiUrl = getStrapiPublicUrl();
    return strapiUrl ? `${strapiUrl}${media.url}` : media.url;
};

export const getStrapiImageSource = (
    media: StrapiMedia
): StaticImageData => ({
    src: getStrapiMediaUrl(media),
    width: media.width || 1,
    height: media.height || 1,
});

export const getPageBySlug = cache(async (
    slug: string,
    locale = 'en'
): Promise<StrapiPage | null> => {
    const strapiUrl = getStrapiApiUrl();

    if (!strapiUrl) {
        return null;
    }

    const url = new URL(`/api/pages/by-slug/${encodeURIComponent(slug)}`, strapiUrl);
    url.searchParams.set('locale', locale);

    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(3000),
            next: {
                revalidate: 60,
                tags: [`page:${locale}:${slug}`],
            },
        });

        if (!response.ok) {
            return null;
        }

        const payload = await response.json() as { data?: StrapiPage | null };
        return payload.data ?? null;
    } catch {
        return null;
    }
});
