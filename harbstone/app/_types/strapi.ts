export interface StrapiMedia {
    id: number;
    url: string;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
}

interface StrapiComponent {
    id: number;
    __component: string;
}

export interface StrapiBreadcrumb {
    id: number;
    label: string;
    href?: string | null;
}

export interface StrapiAction {
    id: number;
    label: string;
    type: 'link' | 'popup';
    href?: string | null;
    popupId?: string | null;
}

export interface HeroPageBlock extends StrapiComponent {
    __component: 'blocks.hero';
    title: string;
    description: string;
    fullText?: boolean;
    padding?: 'pb' | 'pt';
    breadcrumbs?: StrapiBreadcrumb[];
    actions?: StrapiAction[];
}

export interface ShowreelPageBlock extends StrapiComponent {
    __component: 'blocks.showreel';
    video: StrapiMedia;
}

export interface ClientsPageBlock extends StrapiComponent {
    __component: 'blocks.clients';
    clients: {
        id: number;
        name: string;
        logo: StrapiMedia;
        href?: string | null;
    }[];
}

export interface WorksPageBlock extends StrapiComponent {
    __component: 'blocks.works-list';
    title: string;
    description?: string | null;
    source?: 'all' | 'selected';
    selectedWorks?: StrapiWork[];
    itemLimit?: number | null;
    padding?: 'y' | 'pt' | 'pb';
    showMore?: boolean;
    showBreadcrumbs?: boolean;
    showSectionNumber?: boolean;
}

export interface RelatedWorksPageBlock extends StrapiComponent {
    __component: 'blocks.related-works';
    title: string;
    description?: string | null;
    itemLimit?: number | null;
    padding?: 'y' | 'pt' | 'pb';
    showMore?: boolean;
}

export interface ServicesPageBlock extends StrapiComponent {
    __component: 'blocks.services-list';
    title?: string | null;
    description?: string | null;
    dark?: boolean;
    source?: 'all' | 'selected';
    selectedServices?: StrapiService[];
    itemLimit?: number | null;
}

export interface CelebritiesPageBlock extends StrapiComponent {
    __component: 'blocks.celebrities';
    title: string;
    description: string;
    celebrities: {
        id: number;
        title: string;
        description: string;
        href: string;
        image: StrapiMedia;
    }[];
}

export interface TogetherPageBlock extends StrapiComponent {
    __component: 'blocks.together';
    title: string;
    items: {
        id: number;
        text: string;
    }[];
}

export interface AboutPageBlock extends StrapiComponent {
    __component: 'blocks.about';
    title: string;
    description: string;
    breadcrumbs?: StrapiBreadcrumb[];
    points: {
        id: number;
        value: string;
        description: string;
    }[];
}

export interface InformationPageBlock extends StrapiComponent {
    __component: 'blocks.information';
    title: string;
    texts: {
        id: number;
        text: string;
    }[];
}

export interface ReelsPageBlock extends StrapiComponent {
    __component: 'blocks.reels';
    videoUrl: string;
}

export interface TimelinePageBlock extends StrapiComponent {
    __component: 'blocks.timeline';
    items: {
        id: number;
        date: string;
        description: string;
        year?: string | null;
    }[];
}

export interface FounderPageBlock extends StrapiComponent {
    __component: 'blocks.founder';
    photo: StrapiMedia;
    name: string;
    role: string;
    description: string;
}

export interface HowWorkPageBlock extends StrapiComponent {
    __component: 'blocks.how-work';
    logo?: StrapiMedia | null;
    items: {
        id: number;
        title: string;
        description: string;
    }[];
}

export interface TeamPageBlock extends StrapiComponent {
    __component: 'blocks.team';
    source?: 'all' | 'selected';
    selectedMembers?: StrapiTeamMember[];
}

export interface ContactsPageBlock extends StrapiComponent {
    __component: 'blocks.contacts';
    title: string;
    breadcrumbs?: StrapiBreadcrumb[];
    phones?: {
        id: number;
        number: string;
    }[];
    email: string;
    socialLinks?: {
        id: number;
        label: string;
        href: string;
    }[];
    address: string;
    mapUrl: string;
}

export interface EuProjectsPageBlock extends StrapiComponent {
    __component: 'blocks.eu-projects';
    projects: {
        id: number;
        title: string;
        description: string;
        image: StrapiMedia;
    }[];
}

export interface GalleryPageBlock extends StrapiComponent {
    __component: 'blocks.gallery';
    images: {
        id: number;
        image: StrapiMedia;
        alt?: string | null;
    }[];
    coefficient?: number;
}

export interface IdeaPageBlock extends StrapiComponent {
    __component: 'blocks.idea';
    title?: string | null;
    description?: string | null;
}

export interface SharePageBlock extends StrapiComponent {
    __component: 'blocks.share';
}

export type PageBlock =
    | HeroPageBlock
    | ShowreelPageBlock
    | ClientsPageBlock
    | WorksPageBlock
    | RelatedWorksPageBlock
    | ServicesPageBlock
    | CelebritiesPageBlock
    | TogetherPageBlock
    | AboutPageBlock
    | InformationPageBlock
    | ReelsPageBlock
    | TimelinePageBlock
    | FounderPageBlock
    | HowWorkPageBlock
    | TeamPageBlock
    | ContactsPageBlock
    | EuProjectsPageBlock
    | GalleryPageBlock
    | IdeaPageBlock
    | SharePageBlock;

export interface StrapiSeo {
    metaTitle?: string | null;
    metaDescription?: string | null;
    keywords?: string | null;
    shareImage?: StrapiMedia | null;
    canonicalUrl?: string | null;
    noIndex?: boolean;
    noFollow?: boolean;
    structuredData?: Record<string, unknown> | null;
}

export interface StrapiPage {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    locale: string;
    seo?: StrapiSeo | null;
    blocks?: PageBlock[];
}

export interface StrapiSubservice {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string | null;
    locale: string;
    service?: Pick<StrapiService, 'id' | 'documentId' | 'name' | 'slug'> | null;
}

export interface StrapiTeamMember {
    id: number;
    documentId: string;
    name: string;
    role?: string | null;
    photo: StrapiMedia;
    position?: number | null;
    locale: string;
}

export interface StrapiService {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    locale: string;
    previewImage: StrapiMedia;
    previewVideo?: StrapiMedia | null;
    subservices?: StrapiSubservice[];
    seo?: StrapiSeo | null;
    blocks?: PageBlock[];
}

export interface StrapiWork {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    locale: string;
    previewImage: StrapiMedia;
    previewVideo?: StrapiMedia | null;
    services?: StrapiService[];
    subservices?: StrapiSubservice[];
    industry?: string | null;
    celebrity?: string | null;
    projectUrl?: string | null;
    projectLinkLabel?: string | null;
    seo?: StrapiSeo | null;
    blocks?: PageBlock[];
}
