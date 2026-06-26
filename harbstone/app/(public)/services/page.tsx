import HeroBlock from "@/app/_components/sections/HeroBlock/HeroBlock";
import ServicesBlock from "@/app/_components/sections/ServicesBlock/ServicesBlock";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import { services as localServices } from "./services";
import {
    categories as localWorkCategories,
    works as localWorks,
} from "../works/works";
import {
    buildWorkCategories,
    getServicesCatalog,
    getWorksCatalog,
    mapServiceToCard,
    mapWorkToCard,
} from "@/app/_lib/catalog";
import { getRequestLocale } from "@/app/_i18n/server";

interface ServicesPageProps {
    searchParams: Promise<{
        locale?: string | string[];
    }>;
}

export default async function Services({
    searchParams
}: ServicesPageProps) {
    const params = await searchParams;
    const locale = await getRequestLocale(params.locale);
    const [cmsServices, cmsWorks] = await Promise.all([
        getServicesCatalog(locale),
        getWorksCatalog(locale),
    ]);
    const serviceCards = cmsServices.length
        ? cmsServices.map(mapServiceToCard)
        : localServices;
    const cmsWorkCards = cmsWorks.map(mapWorkToCard);
    const workCards = cmsWorkCards.length
        ? cmsWorkCards
        : localWorks;
    const workCategories = cmsServices.length && cmsWorkCards.length
        ? buildWorkCategories(cmsServices, cmsWorkCards)
        : localWorkCategories;

    return (
        <>
            <HeroBlock
                breadcrumbs={[
                    { label: 'Main', href: '/' },
                    { label: 'Services' },
                ]}
                title="Services"
                description="Our services are limited to what we do best, and that’s exactly why they work."
            />
            <ServicesBlock
                services={serviceCards}
            />
            <WorksBlock
                works={workCards.slice(0, 2)}
                categories={workCategories}
                title="Popular works"
                padding="pb"
            />
        </>
    )
}
