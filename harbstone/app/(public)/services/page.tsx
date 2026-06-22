import HeroBlock from "@/app/_components/sections/HeroBlock/HeroBlock";
import ServicesBlock from "@/app/_components/sections/ServicesBlock/ServicesBlock";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import { services } from "./services";
import { works } from "../works/works";

export default function Services() {
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
                services={services}
            />
            <WorksBlock
                works={works.slice(0, 2)}
                title="Popular works"
                padding="pb"
            />
        </>
    )
}
