import type { Metadata } from "next";
import ContactsBlock from "@/app/_components/sections/ContactsBlock/ContactsBlock";
import CmsPage from "@/app/_components/general/CmsPage/CmsPage";
import { getPageBySlug } from "@/app/_lib/strapi";
import { getPageMetadata } from "@/app/_lib/pageMetadata";
import { getRequestLocale } from "@/app/_i18n/server";

interface ContactPageProps {
    searchParams: Promise<{
        locale?: string | string[];
    }>;
}

function StaticContact() {
    return (
        <ContactsBlock
            title="Contacts"
            breadcrumbs={[
                {label: 'Main', href: '/'},
                {label: 'Contacts'}
            ]}
            numbers={[
                {number: '+371 22-400-200'},
                {number: '+371 22-400-300'},
            ]}
            email="hello@harbstone.digital"
            social={[
                {label: 'X (Twitter)', href: 'https://x.com'},
                {label: 'Instagram', href: 'https://www.instagram.com'},
                {label: 'Vimeo', href: 'https://vimeo.com'},
            ]}
            address="Liepājas iela 2 – 80, Rīga, LV-1002"
            cart="https://snazzymaps.com/embed/739735"
        />
    )
}

export async function generateMetadata({
    searchParams,
}: ContactPageProps): Promise<Metadata> {
    const params = await searchParams;
    const page = await getPageBySlug('contact', await getRequestLocale(params.locale));

    return page ? getPageMetadata(page) : {};
}

export default async function Contact({
    searchParams,
}: ContactPageProps) {
    const params = await searchParams;
    const page = await getPageBySlug('contact', await getRequestLocale(params.locale));

    return page?.blocks?.length
        ? <CmsPage page={page} />
        : <StaticContact />;
}
