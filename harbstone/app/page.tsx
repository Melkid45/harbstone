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
import WorksBlock from "./_components/sections/WorksBlock/WorksBlock";
import { services } from "./(public)/services/services";
import { categories as workCategories, works } from "./(public)/works/works";
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
    href: '/works/mickey-rourke-x-melbet',
    image: Celeb1,
  },
  {
    title: 'Roy Jones',
    description: 'We filmed and produced a comprehensive documentary project about Roy Jones.',
    href: '/works?service=video-production',
    image: Celeb2,
  },
  {
    title: 'Oleksandr Usyk',
    description: 'We filmed and produced a comprehensive documentary project about Oleksandr Usyk.',
    href: '/works?service=video-production',
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
        categories={workCategories}
        works={works.slice(0, 2)}
        padding="y"
      />
      <ServicesBlock
        title="Services"
        description="Our services are limited to what we do best, and that’s exactly why they work."
        services={services}
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
