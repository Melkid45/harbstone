import HeroBlock from "@/app/_components/sections/HeroBlock/HeroBlock";
import InformationBlock from "@/app/_components/sections/InformationBlock/InformationBlock";

export default function PrivacyPolicy() {
    return (
        <>
            <HeroBlock
                title="Privacy Policy"
                padding="pt"
                description="This page will contain Harbstone Digital privacy policy details."
                breadcrumbs={[
                    { label: 'Main', href: '/' },
                    { label: 'Privacy Policy' },
                ]}
                fullText={true}
            />
            <InformationBlock
                title="Data and communication"
                texts={[
                    {
                        text: 'We use contact form data only to process project requests and communicate with potential clients.'
                    },
                    {
                        text: 'A full legal privacy policy can be managed from Strapi once the content model is connected.'
                    },
                ]}
            />
        </>
    )
}
