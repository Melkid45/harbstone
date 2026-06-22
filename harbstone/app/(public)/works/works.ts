import Works1 from '@/app/assets/images/services/1.webp'
import Works2 from '@/app/assets/images/services/2.webp'
import { services } from '../services/services';

export type WorksFilter = {
    service?: string;
    soft?: string;
};

const slugify = (value: string) => (
    value
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
);

const getSoftSlug = (href: string, name: string) => href.split('#')[1] || slugify(name);

export const getWorksHref = ({ service, soft }: WorksFilter = {}) => {
    const params = new URLSearchParams();

    if (service) {
        params.set('service', service);
    }

    if (soft) {
        params.set('soft', soft);
    }

    const query = params.toString();

    return query ? `/works?${query}` : '/works';
};

export const works = [
    {
        name: 'Mickey Rourke x MelBet',
        slug: 'mickey-rourke-x-melbet',
        service: 'video-production',
        soft: ['pre-production', 'production', 'post-production'],
        preview: Works1,
        description: 'A full-scale commercial campaign featuring Mickey Rourke, delivered end-to-end from concept to final cut.',
        video: '/videos/1.webm',
        project_link: 'https://vimeo.com/547110638',
        project_link_type: 'Vimeo',
        categories: [
            { label: 'Post-production', href: getWorksHref({ service: 'video-production', soft: 'post-production' }) },
            { label: 'Pre-production', href: getWorksHref({ service: 'video-production', soft: 'pre-production' }) },
            { label: 'Production', href: getWorksHref({ service: 'video-production', soft: 'production' }) },
        ],
        celebritie: 'Mickey Rourke',
        industry: 'Sports & Betting'
    },
    {
        name: 'Pasha Technique x MelBet',
        slug: 'pasha-technique-x-melbet',
        service: 'video-production',
        soft: ['production', 'post-production'],
        preview: Works2,
        description: 'New work by Technice',
        video: '/videos/1.webm',
        project_link: 'https://vimeo.com/547110638',
        project_link_type: 'Vimeo',
        categories: [
            { label: 'Production', href: getWorksHref({ service: 'video-production', soft: 'production' }) },
            { label: 'Post-production', href: getWorksHref({ service: 'video-production', soft: 'post-production' }) },
        ],
        industry: 'Sports & Betting'
    },
].map((work) => ({
    ...work,
    href: `/works/${work.slug}`,
}));

export type Works = (typeof works)[number];

export const getFilteredWorks = ({ service, soft }: WorksFilter = {}) => (
    works.filter((work) => (
        (!service || work.service === service)
        && (!soft || work.soft.includes(soft))
    ))
);

export const categories = services
    .map((service) => {
        const children = service.children
            .map((child) => {
                const soft = getSoftSlug(child.href, child.name);

                return {
                    label: child.name,
                    slug: soft,
                    href: getWorksHref({ service: service.slug, soft }),
                };
            })
            .filter((child) => works.some((work) => (
                work.service === service.slug && work.soft.includes(child.slug)
            )));

        const hasWorks = works.some((work) => work.service === service.slug);

        if (!hasWorks && !children.length) {
            return null;
        }

        return {
            label: service.name,
            slug: service.slug,
            href: getWorksHref({ service: service.slug }),
            children,
        };
    })
    .filter((category): category is NonNullable<typeof category> => Boolean(category));

export type Categories = (typeof categories)[number];

export const getWorks = (slug: string) => (
    works.find((work) => work.slug === slug)
);

export const getCategories = (label: string) => (
    categories.find((category) => category.label === label)
)
