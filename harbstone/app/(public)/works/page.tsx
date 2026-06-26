import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import {
    buildWorkCategories,
    filterWorkCards,
    getServicesCatalog,
    getWorksCatalog,
    mapWorkToCard,
} from "@/app/_lib/catalog";
import { getRequestLocale } from "@/app/_i18n/server";
import { getTranslations } from "@/app/_i18n/config";

interface WorksPageProps {
    searchParams: Promise<{
        service?: string | string[];
        soft?: string | string[];
        locale?: string | string[];
    }>;
}

const getFirstParam = (value?: string | string[]) => (
    Array.isArray(value) ? value[0] : value
);

export default async function Works({ searchParams }: WorksPageProps) {
    const params = await searchParams;
    const locale = await getRequestLocale(params.locale);
    const t = getTranslations(locale);
    const [cmsServices, cmsWorks] = await Promise.all([
        getServicesCatalog(locale),
        getWorksCatalog(locale),
    ]);
    const cmsWorkCards = cmsWorks.map(mapWorkToCard);
    const categories = buildWorkCategories(cmsServices, cmsWorkCards);
    const requestedService = getFirstParam(params.service);
    const activeCategory = categories.find((category) => (
        category.slug === requestedService
    )) || categories[0];
    const requestedSoft = getFirstParam(params.soft);
    const activeSoft = activeCategory?.children.some((child) => (
        child.slug === requestedSoft
    ))
        ? requestedSoft
        : undefined;
    const activeFilter = {
        service: activeCategory?.slug,
        soft: activeSoft,
    };
    const filteredWorks = activeCategory
        ? filterWorkCards(cmsWorkCards, activeFilter)
        : [];

    return (
        <WorksBlock
            breadcrumbs={true}
            title={t.nav.works}
            works={filteredWorks}
            noMore={false}
            padding="y"
            filtered={true}
            number={true}
            categories={categories}
            activeFilter={activeFilter}
            emptyMessage={t.common.noWorksCategory}
        />
    )
}
