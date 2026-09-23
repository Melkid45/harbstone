import { notFound } from "next/navigation";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import { getTranslations, type Locale } from "@/app/_i18n/config";
import {
    buildWorkCategories,
    filterWorkCards,
    getServicesCatalog,
    getWorksCatalog,
    mapWorkToCard,
} from "@/app/_lib/catalog";
import {
    categories as localCategories,
    getFilteredWorks,
} from "../works";
import { getWorksFilterHref } from "@/app/_lib/worksRouting";

interface WorksListingProps {
    locale: Locale;
    service?: string;
    soft?: string;
    strict?: boolean;
}

export default async function WorksListing({
    locale,
    service,
    soft,
    strict = false,
}: WorksListingProps) {
    const t = getTranslations(locale);
    const [cmsServices, cmsWorks] = await Promise.all([
        getServicesCatalog(locale),
        getWorksCatalog(locale),
    ]);
    const cmsWorkCards = cmsWorks.map(mapWorkToCard);
    const cmsCategories = buildWorkCategories(cmsServices, cmsWorkCards);
    const useCmsCatalog = cmsCategories.length > 0;
    const serviceCategories = useCmsCatalog ? cmsCategories : localCategories;
    const categories = [
        {
            label: t.common.allWorks,
            href: getWorksFilterHref(),
            slug: undefined,
            children: [],
        },
        ...serviceCategories,
    ];
    const activeCategory = service
        ? categories.find((category) => category.slug === service)
        : categories[0];
    const requestedSoft = activeCategory?.children.find((child) => (
        child.slug === soft
    ))?.slug;
    const activeSoft = soft
        ? requestedSoft
        : activeCategory?.slug
            ? activeCategory.children[0]?.slug
            : undefined;

    if (
        strict
        && (
            !activeCategory
            || (Boolean(soft) && !requestedSoft)
        )
    ) {
        notFound();
    }

    const activeFilter = {
        service: activeCategory?.slug,
        soft: activeSoft,
    };
    const filteredWorks = useCmsCatalog
        ? filterWorkCards(cmsWorkCards, activeFilter)
        : getFilteredWorks(activeFilter);

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
    );
}
