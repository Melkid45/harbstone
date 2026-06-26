import { Fragment, type ReactNode } from "react";
import AboutBlock from "../../sections/AboutBlock/AboutBlock";
import CelebritiesBlock from "../../sections/CelebritiesBlock/CelebritiesBlock";
import ClientsBlock from "../../sections/ClientsBlock/ClientsBlock";
import ContactsBlock from "../../sections/ContactsBlock/ContactsBlock";
import EUBlock from "../../sections/EUBlock/EUBlock";
import FounderBlock from "../../sections/FounderBlock/FounderBlock";
import HeroBlock from "../../sections/HeroBlock/HeroBlock";
import HowWorkBlock from "../../sections/HowWorkBlock/HowWorkBlock";
import InformationBlock from "../../sections/InformationBlock/InformationBlock";
import ReelsBlock from "../../sections/ReelsBlock/ReelsBlock";
import ServicesBlock from "../../sections/ServicesBlock/ServicesBlock";
import ShowreelBlock from "../../sections/ShowreelBlock/ShowreelBlock";
import TeamBlock from "../../sections/TeamBlock/TeamBlock";
import TimeLineBlock from "../../sections/TimeLineBlock/TimeLineBlock";
import TogetgerBlock from "../../sections/TogetgerBlock/TogetgerBlock";
import WorksBlock from "../../sections/WorksBlock/WorksBlock";
import GalleryBlock from "../../sections/works/GalleryBlock/GalleryBlock";
import IdeaBlock from "../../sections/works/IdeaBlock/IdeaBlock";
import ShareBlock from "../../sections/works/ShareBlock/ShareBlock";
import { services as localServices } from "../../../(public)/services/services";
import {
    categories as localWorkCategories,
    works as localWorks,
} from "../../../(public)/works/works";
import {
    buildWorkCategories,
    mapServiceToCard,
    mapTeamMemberToCard,
    mapWorkToCard,
    type TeamMemberCard,
} from "../../../_lib/catalog";
import {
    getStrapiImageSource,
    getStrapiMediaUrl,
} from "../../../_lib/strapi";
import type {
    PageBlock,
    StrapiService,
    StrapiTeamMember,
    StrapiWork,
} from "../../../_types/strapi";
import Team1 from "../../../assets/images/team/1.jpg";
import Team2 from "../../../assets/images/team/2.jpg";
import Team3 from "../../../assets/images/team/3.jpg";

interface PageRendererProps {
    blocks?: PageBlock[];
    services?: StrapiService[];
    works?: StrapiWork[];
    teamMembers?: StrapiTeamMember[];
    currentWork?: StrapiWork;
}

const localTeamMembers: TeamMemberCard[] = [
    {
        photo: Team1,
        name: 'Alice Berga',
        role: 'Project manager',
    },
    {
        photo: Team2,
        name: 'Igor Buls',
        role: 'Creative director',
    },
    {
        photo: Team3,
        name: 'Roberto Sils',
        role: 'Content creator',
    },
];

const renderMultilineText = (value: string): ReactNode => {
    const lines = value.split(/\r?\n/);

    return lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
            {line}
            {index < lines.length - 1 ? <br /> : null}
        </Fragment>
    ));
};

export default function PageRenderer({
    blocks = [],
    services = [],
    works = [],
    teamMembers = [],
    currentWork,
}: PageRendererProps) {
    const cmsServiceCards = services.map(mapServiceToCard);
    const cmsWorkCards = works.map(mapWorkToCard);
    const cmsWorkCategories = buildWorkCategories(services, cmsWorkCards);

    return blocks.map((block) => {
        const key = `${block.__component}-${block.id}`;

        switch (block.__component) {
            case 'blocks.hero':
                return (
                    <HeroBlock
                        key={key}
                        title={renderMultilineText(block.title)}
                        description={block.description}
                        fullText={block.fullText}
                        padding={block.padding}
                        breadcrumbs={block.breadcrumbs?.map((item) => ({
                            label: item.label,
                            href: item.href || undefined,
                        }))}
                        actions={block.actions?.map((item) => ({
                            label: item.label,
                            type: item.type,
                            href: item.href || undefined,
                            popupId: item.popupId || undefined,
                        }))}
                    />
                );

            case 'blocks.showreel':
                return (
                    <ShowreelBlock
                        key={key}
                        showreel={getStrapiMediaUrl(block.video)}
                    />
                );

            case 'blocks.clients':
                return (
                    <ClientsBlock
                        key={key}
                        clients={block.clients.map((item) => ({
                            name: item.name,
                            logo: getStrapiImageSource(item.logo),
                            href: item.href || undefined,
                        }))}
                    />
                );

            case 'blocks.works-list':
                const selectedWorks = block.source === 'selected'
                    ? (block.selectedWorks || []).map(mapWorkToCard)
                    : cmsWorkCards;
                const visibleWorks = block.source === 'selected'
                    ? selectedWorks
                    : selectedWorks.slice(0, block.itemLimit || undefined);
                const blockWorks = block.source === 'selected'
                    ? visibleWorks
                    : visibleWorks.length
                        ? visibleWorks
                        : localWorks.slice(0, block.itemLimit || 2);

                return (
                    <WorksBlock
                        key={key}
                        title={block.title}
                        description={block.description || undefined}
                        works={blockWorks}
                        categories={cmsWorkCategories.length
                            ? cmsWorkCategories
                            : localWorkCategories}
                        padding={block.padding}
                        noMore={block.showMore}
                        breadcrumbs={block.showBreadcrumbs}
                        number={block.showSectionNumber}
                    />
                );

            case 'blocks.related-works':
                const relatedWorks = cmsWorkCards
                    .filter((work) => work.slug !== currentWork?.slug)
                    .slice(0, block.itemLimit || 2);

                return (
                    <WorksBlock
                        key={key}
                        title={block.title}
                        description={block.description || undefined}
                        works={relatedWorks}
                        categories={cmsWorkCategories}
                        padding={block.padding}
                        noMore={block.showMore}
                    />
                );

            case 'blocks.services-list':
                const selectedServices = block.source === 'selected'
                    ? (block.selectedServices || []).map(mapServiceToCard)
                    : cmsServiceCards;
                const blockServices = selectedServices.length
                    ? selectedServices
                    : localServices;

                return (
                    <ServicesBlock
                        key={key}
                        title={block.title || undefined}
                        description={block.description || undefined}
                        dark={block.dark}
                        services={block.itemLimit
                            ? blockServices.slice(0, block.itemLimit)
                            : blockServices}
                    />
                );

            case 'blocks.celebrities':
                return (
                    <CelebritiesBlock
                        key={key}
                        title={block.title}
                        description={block.description}
                        celebrities={block.celebrities.map((item) => ({
                            title: item.title,
                            description: item.description,
                            href: item.href,
                            image: getStrapiImageSource(item.image),
                        }))}
                    />
                );

            case 'blocks.together':
                return (
                    <TogetgerBlock
                        key={key}
                        title={block.title}
                        items={block.items.map((item) => ({ text: item.text }))}
                    />
                );

            case 'blocks.about':
                return (
                    <AboutBlock
                        key={key}
                        title={renderMultilineText(block.title)}
                        description={block.description}
                        breadcrumbs={block.breadcrumbs?.map((item) => ({
                            label: item.label,
                            href: item.href || undefined,
                        }))}
                        points={block.points.map((item) => ({
                            title: item.value,
                            description: item.description,
                        }))}
                    />
                );

            case 'blocks.information':
                return (
                    <InformationBlock
                        key={key}
                        title={block.title}
                        texts={block.texts.map((item) => ({ text: item.text }))}
                    />
                );

            case 'blocks.reels':
                return <ReelsBlock key={key} video={block.videoUrl} />;

            case 'blocks.timeline':
                return (
                    <TimeLineBlock
                        key={key}
                        timelines={block.items.map((item) => ({
                            date: item.date,
                            description: item.description,
                            year: item.year || undefined,
                        }))}
                    />
                );

            case 'blocks.founder':
                return (
                    <FounderBlock
                        key={key}
                        photo={getStrapiImageSource(block.photo)}
                        name={block.name}
                        role={block.role}
                        description={renderMultilineText(block.description)}
                    />
                );

            case 'blocks.how-work':
                return (
                    <HowWorkBlock
                        key={key}
                        logo={block.logo ? getStrapiImageSource(block.logo) : undefined}
                        items={block.items.map((item) => ({
                            title: item.title,
                            description: item.description,
                        }))}
                    />
                );

            case 'blocks.team':
                const selectedTeamMembers = block.source === 'selected'
                    ? (block.selectedMembers || []).map(mapTeamMemberToCard)
                    : teamMembers.map(mapTeamMemberToCard);
                const visibleTeamMembers = block.source === 'selected'
                    ? selectedTeamMembers
                    : selectedTeamMembers.length
                        ? selectedTeamMembers
                        : localTeamMembers;

                return (
                    <TeamBlock
                        key={key}
                        members={visibleTeamMembers}
                    />
                );

            case 'blocks.contacts':
                return (
                    <ContactsBlock
                        key={key}
                        title={block.title}
                        breadcrumbs={(block.breadcrumbs || []).map((item) => ({
                            label: item.label,
                            href: item.href || undefined,
                        }))}
                        numbers={block.phones?.map((item) => ({
                            number: item.number,
                        }))}
                        email={block.email}
                        social={(block.socialLinks || []).map((item) => ({
                            label: item.label,
                            href: item.href,
                        }))}
                        address={block.address}
                        cart={block.mapUrl}
                    />
                );

            case 'blocks.eu-projects':
                return (
                    <EUBlock
                        key={key}
                        projects={block.projects.map((item) => ({
                            title: item.title,
                            description: item.description,
                            image: getStrapiImageSource(item.image),
                        }))}
                    />
                );

            case 'blocks.gallery':
                return (
                    <GalleryBlock
                        key={key}
                        coeff={block.coefficient}
                        gallery={block.images.map((item) => ({
                            image: getStrapiImageSource(item.image),
                            alt: item.alt || item.image.alternativeText || undefined,
                        }))}
                    />
                );

            case 'blocks.idea':
                return (
                    <IdeaBlock
                        key={key}
                        title={block.title || undefined}
                        desctiption={block.description || undefined}
                    />
                );

            case 'blocks.share':
                return currentWork ? (
                    <ShareBlock
                        key={key}
                        title={currentWork.name}
                        slug={currentWork.slug}
                        image={getStrapiImageSource(currentWork.previewImage)}
                    />
                ) : null;

            default:
                return null;
        }
    });
}
