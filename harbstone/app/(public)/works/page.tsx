import { getRequestLocale } from "@/app/_i18n/server";
import WorksListing from "./_components/WorksListing";

export default async function Works() {
    const locale = await getRequestLocale();

    return <WorksListing locale={locale} />;
}
