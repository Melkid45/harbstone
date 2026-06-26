import type { Metadata } from "next";
import { getStrapiMediaUrl } from "./strapi";
import type { StrapiPage, StrapiSeo } from "../_types/strapi";

export const getContentMetadata = (
    title: string,
    seo?: StrapiSeo | null,
    fallbackDescription?: string
): Metadata => {
    const shareImage = getStrapiMediaUrl(seo?.shareImage);

    return {
        title: seo?.metaTitle || title,
        description: seo?.metaDescription || fallbackDescription,
        keywords: seo?.keywords
            ? seo.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean)
            : undefined,
        alternates: seo?.canonicalUrl
            ? { canonical: seo.canonicalUrl }
            : undefined,
        robots: {
            index: !seo?.noIndex,
            follow: !seo?.noFollow,
        },
        openGraph: {
            title: seo?.metaTitle || title,
            description: seo?.metaDescription || fallbackDescription,
            images: shareImage ? [{ url: shareImage }] : undefined,
        },
    };
};

export const getPageMetadata = (page: StrapiPage): Metadata => (
    getContentMetadata(page.title, page.seo)
);
