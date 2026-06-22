import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroBlock from "@/app/_components/sections/HeroBlock/HeroBlock";
import { getService, services } from "../services";
import ServicesBlock from "@/app/_components/sections/ServicesBlock/ServicesBlock";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return services.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({
    params,
}: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getService(slug);

    if (!service) {
        return {};
    }

    return {
        title: `${service.name} | HarbStone`,
        description: service.description,
    };
}

export default async function ServicePage({
    params,
}: ServicePageProps) {
    const { slug } = await params;
    const service = getService(slug);

    if (!service) {
        notFound();
    }

    return (
        <>
            <HeroBlock
                breadcrumbs={[
                    { label: 'Main', href: '/' },
                    { label: 'Services', href: '/services' },
                    { label: service.name },
                ]}
                title={service.name}
                description={service.description}
                fullText={true}
            />
            <ServicesBlock
                dark={true}
                services={service.children.map((item) => ({
                    name: item.name,
                    description: 'description' in item ? item.description : service.description,
                    href: item.href,
                }))}
            />
        </>
    );
}
