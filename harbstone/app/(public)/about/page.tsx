import AboutBlock from "@/app/_components/sections/AboutBlock/AboutBlock";
import ServicesBlock from "@/app/_components/sections/ServicesBlock/ServicesBlock";
import WorksBlock from "@/app/_components/sections/WorksBlock/WorksBlock";
import Works1 from '@/app/assets/images/services/1.webp'
import Works2 from '@/app/assets/images/services/2.webp'
import Services1 from '@/app/assets/images/services/1.webp';
import Services2 from '@/app/assets/images/services/2.webp';
import Services3 from '@/app/assets/images/services/3.webp';
import TeamBlock from "@/app/_components/sections/TeamBlock/TeamBlock";
import Team1 from '@/app/assets/images/team/1.jpg';
import Team2 from '@/app/assets/images/team/2.jpg';
import Team3 from '@/app/assets/images/team/3.jpg';
import HowWorkBlock from "@/app/_components/sections/HowWorkBlock/HowWorkBlock";
import Logo from '@/app/assets/images/logo.svg';
import ClientsBlock from "@/app/_components/sections/ClientsBlock/ClientsBlock";
import Client1 from '@/app/assets/images/clients/ab.svg';
import Client2 from '@/app/assets/images/clients/melbet.svg';
import Client3 from '@/app/assets/images/clients/optibet.svg';
import Client4 from '@/app/assets/images/clients/orange.svg';
import Client5 from '@/app/assets/images/clients/stefano-ricci.svg';
import Client6 from '@/app/assets/images/clients/telegroup.svg';
import Client7 from '@/app/assets/images/clients/total-transport.svg';
import Client8 from '@/app/assets/images/clients/vave.svg';
import FounderBlock from "@/app/_components/sections/FounderBlock/FounderBlock";
import Founder from '@/app/assets/images/founder.jpg';
import InformationBlock from "@/app/_components/sections/InformationBlock/InformationBlock";
import ReelsBlock from "@/app/_components/sections/ReelsBlock/ReelsBlock";
import TimeLineBlock from "@/app/_components/sections/TimeLineBlock/TimeLineBlock";
const pointsArray = [
    {
        title: '10+',
        description: 'years in the industry'
    },
    {
        title: '300+',
        description: 'projects delivered'
    },
    {
        title: '40+',
        description: 'long-term partnerships'
    },
]
const worksArray = [
    {
        name: 'Mickey Rourke x MelBet',
        preview: Works1,
        description: 'A full-scale commercial campaign featuring Mickey Rourke, delivered end-to-end from concept to final cut.',
        href: '/',
        video: '/videos/1.webm',
    },
    {
        name: 'Pasha Technique x MelBet',
        preview: Works2,
        description: 'New work by Technice',
        href: '/',
        video: '/videos/1.webm',
    },
]
const servicesArray = [
    {
        name: 'Web Dev',
        description: 'Complex digital systems, from CRMs and apps to full-scale platforms, built in-house to solve real business needs.',
        preview: Services1,
        video: '/videos/1.webm',
        href: '/',
        children: [
            {
                name: 'Web Design & UX',
                href: '/'
            },
            {
                name: 'Programming',
                href: '/'
            },
            {
                name: 'Digital strategy',
                href: '/'
            },
            {
                name: 'SEO / SAO',
                href: '/'
            },
        ]
    },
    {
        name: 'Video Production',
        description: 'Concept, production, editing and VFX proven in projects with international companies and world-class celebrities.',
        preview: Services2,
        video: '/videos/2.webm',
        href: '/',
        children: [
            {
                name: 'Pre-production',
                href: '/'
            },
            {
                name: 'Production',
                href: '/'
            },
            {
                name: 'Post-production',
                href: '/'
            },
            {
                name: 'VFX',
                href: '/'
            },
        ]
    },
    {
        name: 'Viral Promotion',
        description: 'Content and campaigns designed to attract attention, spread across platforms, and turn reach into real interest.',
        preview: Services3,
        video: '/videos/3.webm',
        href: '/',
        children: [
            {
                name: 'Branding & Identity',
                href: '/'
            },
            {
                name: 'Design & Illustration',
                href: '/'
            },
            {
                name: 'SMM / SMO',
                href: '/'
            },
            {
                name: 'Marketing & Campaigns',
                href: '/'
            },
        ]
    },
]

const howArray = [
    {
        title: 'Start with listening.',
        description: 'We dive into your idea, your vision, how you see the product.'
    },
    {
        title: 'Define the goal.',
        description: 'Through questions, we get to the actual goal — not just what you say, but why.'
    },
    {
        title: 'The concept is built.',
        description: 'Clear direction before anything gets designed or developed.'
    },
    {
        title: 'The product is delivered.',
        description: 'No guesswork. Everything is built on decisions made earlier.'
    },
]

const membersArray = [
    {
        photo: Team1,
        name: 'Alice Berga',
        role: 'Project manager'
    },
    {
        photo: Team2,
        name: 'Igor Buls',
        role: 'Creative director'
    },
    {
        photo: Team3,
        name: 'Roberto Sils',
        role: 'Content creator'
    },
]
const clientsArray = [
    {
        name: 'Primer',
        logo: Client1,
    },
    {
        name: 'Primer',
        logo: Client2,
    },
    {
        name: 'Primer',
        logo: Client3,
    },
    {
        name: 'Primer',
        logo: Client4,
    },
    {
        name: 'Primer',
        logo: Client5,
    },
    {
        name: 'Primer',
        logo: Client6,
    },
    {
        name: 'Primer',
        logo: Client7,
    },
    {
        name: 'Primer',
        logo: Client8,
    },
]

const timelineArray = [
    {
        date: '16 Jan',
        description: 'International reach',
        year: '2010'
    },
    {
        date: '26 Jan',
        description: 'International reach'
    },
    {
        date: '22 Feb',
        description: 'International reach',
        year: '2012'
    },
    {
        date: '16 Marc',
        description: 'International reach'
    },
    {
        date: '30 Jun',
        description: 'International reach',
        year: '2018'
    },
    {
        date: '22 Aug',
        description: 'International reach'
    },
]

export default function About() {
    return (
        <>
            <AboutBlock
                title={<>
                    Digital products <br /> that perform
                </>}
                description="Digital production without compromise: web platforms, video content, and PR campaigns built in-house with precision and intent."
                points={pointsArray}
            />
            <InformationBlock
                title="Everything stays entirely in-house"
                texts={[
                    {
                        text: 'We are not a management layer sitting between clients and outsourced teams, because the work is done by the people who understand the idea from the start.'
                    },
                    {
                        text: 'Strategy, design, development, video and production stay inside one team, keeping decisions faster, communication cleaner and the final result more controlled.'
                    }
                ]}
            />
            <ReelsBlock
                video="https://vimeo.com/547110638"
            />
            <TimeLineBlock
                timelines={timelineArray}
            />
            <FounderBlock
                photo={Founder}
                name="Vladimir Gubin"
                description={<>
                    Great products are built from details. <br />
                    Getting them right takes time. <br />
                    We don’t do shortcuts.
                </>}
                role="Harbstone Digital Founder"
            />
            <ClientsBlock
                clients={clientsArray}
            />
            <HowWorkBlock
                logo={Logo}
                items={howArray}
            />
            <TeamBlock
                members={membersArray}
            />
            <ServicesBlock
                title="Services"
                dark={true}
                description="Our services are limited to what we do best, and that’s exactly why they work."
                services={servicesArray}
            />
            <WorksBlock
                title="Works"
                description="Why waste words describing what we’re capable of, when every project already shows the story better than we ever could."
                categories={[
                    {
                        label: 'Web Dev',
                        href: '/'
                    },
                    {
                        label: 'Video Production',
                        href: '/'
                    },
                ]}
                works={worksArray}
                padding="y"
            />
        </>
    )
}
