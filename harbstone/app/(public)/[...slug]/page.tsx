import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CmsPage from "@/app/_components/general/CmsPage/CmsPage";
import { getPageMetadata } from "@/app/_lib/pageMetadata";
import { getPageBySlug } from "@/app/_lib/strapi";
import { getRequestLocale } from "@/app/_i18n/server";

interface DynamicPageProps {
    params: Promise<{
        slug: string[];
    }>;
    searchParams: Promise<{
        locale?: string | string[];
    }>;
}

const getPageRequest = async ({
    params,
    searchParams
}: DynamicPageProps) => {
    const [{ slug }, query] = await Promise.all([params, searchParams]);
    const pageSlug = slug.join('/');
    const locale = await getRequestLocale(query.locale);

    return getPageBySlug(pageSlug, locale);
};

export async function generateMetadata(
    props: DynamicPageProps
): Promise<Metadata> {
    const page = await getPageRequest(props);
    return page ? getPageMetadata(page) : {};
}

export default async function DynamicPage(
    props: DynamicPageProps
) {
    const page = await getPageRequest(props);

    if (!page) {
        notFound();
    }

    return <CmsPage page={page} />;
}
