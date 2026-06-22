import Services1 from '@/app/assets/images/services/1.webp';
import Services2 from '@/app/assets/images/services/2.webp';
import Services3 from '@/app/assets/images/services/3.webp';

export const services = [
    {
        slug: 'web-dev',
        name: 'Web Dev',
        description: 'Complex digital systems, from CRMs and apps to full-scale platforms, built in-house to solve real business needs.',
        preview: Services1,
        video: '/videos/1.webm',
        children: [
            {
                name: 'Web Design & UX',
                href: '/services/web-dev#web-design-ux',
                description: 'Complex digital systems, from CRMs and apps to full-scale platforms, built in-house to solve real business needs.'
            },
            {
                name: 'Programming',
                href: '/services/web-dev#programming',
                description: 'Concept, production, editing and VFX proven in projects with international companies and world-class celebrities.'
            },
            {
                name: 'Digital strategy',
                href: '/services/web-dev#digital-strategy',
                description: 'Content and campaigns designed to attract attention, spread across platforms, and turn reach into real interest.'
            },
            {
                name: 'SEO / SAO',
                href: '/services/web-dev#seo-sao',
                description: 'Content and campaigns designed to attract attention, spread across platforms, and turn reach into real interest.'
            },
        ]
    },
    {
        slug: 'video-production',
        name: 'Video Production',
        description: 'Concept, production, editing and VFX proven in projects with international companies and world-class celebrities.',
        preview: Services2,
        video: '/videos/2.webm',
        children: [
            {
                name: 'Pre-production',
                href: '/services/video-production#pre-production'
            },
            {
                name: 'Production',
                href: '/services/video-production#production'
            },
            {
                name: 'Post-production',
                href: '/services/video-production#post-production'
            },
            {
                name: 'VFX',
                href: '/services/video-production#vfx'
            },
        ]
    },
    {
        slug: 'viral-promotion',
        name: 'Viral Promotion',
        description: 'Content and campaigns designed to attract attention, spread across platforms, and turn reach into real interest.',
        preview: Services3,
        video: '/videos/3.webm',
        children: [
            {
                name: 'Branding & Identity',
                href: '/services/viral-promotion#branding-identity'
            },
            {
                name: 'Design & Illustration',
                href: '/services/viral-promotion#design-illustration'
            },
            {
                name: 'SMM / SMO',
                href: '/services/viral-promotion#smm-smo'
            },
            {
                name: 'Marketing & Campaigns',
                href: '/services/viral-promotion#marketing-campaigns'
            },
        ]
    },
].map((service) => ({
    ...service,
    href: `/services/${service.slug}`,
}));

export type Service = (typeof services)[number];

export const getService = (slug: string) => (
    services.find((service) => service.slug === slug)
);
