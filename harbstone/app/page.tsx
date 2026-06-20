import ClientsBlock from "./_components/sections/ClientsBlock/ClientsBlock";
import HeroBlock from "./_components/sections/HeroBlock/HeroBlock";
import ShowreelBlock from "./_components/sections/ShowreelBlock/ShowreelBlock";
import Client1 from '@/app/assets/images/clients/ab.svg';
import Client2 from '@/app/assets/images/clients/melbet.svg';
import Client3 from '@/app/assets/images/clients/optibet.svg';
import Client4 from '@/app/assets/images/clients/orange.svg';
import Client5 from '@/app/assets/images/clients/stefano-ricci.svg';
import Client6 from '@/app/assets/images/clients/telegroup.svg';
import Client7 from '@/app/assets/images/clients/total-transport.svg';
import Client8 from '@/app/assets/images/clients/vave.svg';
import CelebritiesBlock from "./_components/sections/CelebritiesBlock/CelebritiesBlock";
import Celeb1 from '@/app/assets/images/celeb/1.png';
import Celeb2 from '@/app/assets/images/celeb/2.png';
import TogetgerBlock from "./_components/sections/TogetgerBlock/TogetgerBlock";
import ServicesBlock from "./_components/sections/ServicesBlock/ServicesBlock";
import Services1 from '@/app/assets/images/services/1.webp';
import Services2 from '@/app/assets/images/services/2.webp';
import Services3 from '@/app/assets/images/services/3.webp';
import WorksBlock from "./_components/sections/WorksBlock/WorksBlock";
import Works1 from '@/app/assets/images/services/1.webp'
import Works2 from '@/app/assets/images/services/2.webp'
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
const celebritySlides = [
  {
    title: 'Mickey Rourke',
    description: 'Mickey Rourke was invited as the face of a MelBet advertising campaign produced by us turnkey.',
    href: '/work-mickey-rourke-x-melbet',
    image: Celeb1,
  },
  {
    title: 'Roy Jones',
    description: 'We filmed and produced a comprehensive documentary project about Roy Jones.',
    href: '/work-roy-jones',
    image: Celeb2,
  },
  {
    title: 'Oleksandr Usyk',
    description: 'We filmed and produced a comprehensive documentary project about Oleksandr Usyk.',
    href: '/work-oleksandr-usyk',
    image: Celeb2,
  },
];
const TogetherArray = [
  {
    text: '...digitalize and optimize the core processes of your company.'
  },
  {
    text: '...take your brand to a completely new level.'
  },
  {
    text: '...grow your brand awareness and build the right positioning.'
  },
  {
    text: '...keep your customers loyal and growing.'
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
export default function Home() {
  return (
    <>
      <HeroBlock
        title={<>
          Digital.<br />
          Precise. In-house.
        </>}
        description="Behind every project stands a team investing its skills, ideas, and lived experience — transforming work into progress and progress into success."
      />
      <ShowreelBlock
        showreel="/videos/showreel.webm"
      />
      <ClientsBlock
        clients={clientsArray}
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
      />
      <ServicesBlock
        title="Services"
        description="Our services are limited to what we do best, and that’s exactly why they work."
        services={servicesArray}
      />
      <CelebritiesBlock
        title="Celebrities"
        description="Our services are limited to what we do best, and that’s exactly why they work."
        celebrities={celebritySlides}
      />
      <TogetgerBlock
        title="Together, we can..."
        items={TogetherArray}
      />
    </>
  );
}
