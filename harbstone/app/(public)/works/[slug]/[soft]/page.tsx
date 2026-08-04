import { getRequestLocale } from "@/app/_i18n/server";
import WorksListing from "../../_components/WorksListing";

interface WorksFilterPageProps {
    params: Promise<{
        slug: string;
        soft: string;
    }>;
}

export default async function WorksFilterPage({
    params,
}: WorksFilterPageProps) {
    const [{ slug, soft }, locale] = await Promise.all([
        params,
        getRequestLocale(),
    ]);

    return (
        <WorksListing
            locale={locale}
            service={slug}
            soft={soft}
            strict={true}
        />
    );
}
