import type { Metadata } from "next";
import EUBlock from "@/app/_components/sections/EUBlock/EUBlock";
import HeroBlock from "@/app/_components/sections/HeroBlock/HeroBlock";
import CmsPage from "@/app/_components/general/CmsPage/CmsPage";
import { getPageBySlug } from "@/app/_lib/strapi";
import { getPageMetadata } from "@/app/_lib/pageMetadata";
import { getRequestLocale } from "@/app/_i18n/server";
import Eu1 from '@/app/assets/images/eu/1.png';
import Eu2 from '@/app/assets/images/eu/2.png';
import Eu3 from '@/app/assets/images/eu/3.png';

interface EuProjectPageProps {
    searchParams: Promise<{
        locale?: string | string[];
    }>;
}

const euArray = [
    {
        title: 'MVU inovatīvas uzņēmējdarbības attīstība',
        description: 'SIA "Harbstone"14.05.2024. noslēdza ar LIAA līgumu Nr. 17.1-1-L-2024/326 par atbalsta saņemšanu eksporta atbalsta nodrošināšanai projekta "MVU inovatīvas uzņēmējdarbības attīstība" ietvaros, ko līdzfinansē Eiropas Reģionālās attīstības fonds.',
        image: Eu1
    },
    {
        title: 'Atbalsts procesu digitalizācijai',
        description: 'Sabiedrība ar ierobežotu atbildību "Harbstone" ir noslēdzis 04.01.2024 Nr.17.2-5-L-2024/67 ar Latvijas Investīciju un attīstības aģentūru par atbalsta saņemšanu "Digitālā transformācija" ietvaros, ko līdzfinansē Eiropas Reģionālās attīstības fonds.',
        image: Eu2
    },
    {
        title: 'Starptautiskās konkurētspējas veicināšana',
        description: 'Sabiedrība ar ierobežotu atbildību "Harbstone" ir noslēdzis 2022. gada 21. februārī līgumu Nr. SKV-L-2022/141 ar Latvijas Investīciju un attīstības aģentūru par atbalsta saņemšanu pasākuma “Starptautiskās konkurētspējas veicināšana” ietvaros, ko līdzfinansē Eiropas Reģionālās attīstības fonds.',
        image: Eu3
    },
]

function StaticEuProject() {
    return (
        <>
            <HeroBlock
                title="EU Projects"
                padding="pt"
                description="We are collaborating with European funds and the Investment and Development Agency of Latvia (LIAA) to foster growth and innovation in our sector. This partnership aims to leverage financial and strategic support to enhance our capabilities, drive sustainable development, and contribute to the broader economic landscape."
                breadcrumbs={[
                    {label: 'Main', href: '/'},
                    {label: 'EU Projects'},
                ]}
                fullText={true}
            />
            <EUBlock
                projects={euArray}
            />
        </>
    )
}

export async function generateMetadata({
    searchParams,
}: EuProjectPageProps): Promise<Metadata> {
    const params = await searchParams;
    const page = await getPageBySlug('eu-project', await getRequestLocale(params.locale));

    return page ? getPageMetadata(page) : {};
}

export default async function EuProject({
    searchParams,
}: EuProjectPageProps) {
    const params = await searchParams;
    const page = await getPageBySlug('eu-project', await getRequestLocale(params.locale));

    return page?.blocks?.length
        ? <CmsPage page={page} />
        : <StaticEuProject />;
}
