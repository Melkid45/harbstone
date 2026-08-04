import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAbout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about';
  info: {
    displayName: 'About Block';
  };
  attributes: {
    breadcrumbs: Schema.Attribute.Component<'shared.breadcrumb', true>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    points: Schema.Attribute.Component<'shared.stat', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksCelebrities extends Struct.ComponentSchema {
  collectionName: 'components_blocks_celebrities';
  info: {
    displayName: 'Celebrities Block';
  };
  attributes: {
    celebrities: Schema.Attribute.Component<'shared.celebrity', true> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksClients extends Struct.ComponentSchema {
  collectionName: 'components_blocks_clients';
  info: {
    displayName: 'Clients Block';
  };
  attributes: {
    clients: Schema.Attribute.Component<'shared.client', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksContacts extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contacts';
  info: {
    displayName: 'Contacts Block';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    breadcrumbs: Schema.Attribute.Component<'shared.breadcrumb', true>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    mapUrl: Schema.Attribute.String & Schema.Attribute.Required;
    phones: Schema.Attribute.Component<'shared.phone', true>;
    socialLinks: Schema.Attribute.Component<'shared.contact-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksEuProjects extends Struct.ComponentSchema {
  collectionName: 'components_blocks_eu_projects';
  info: {
    displayName: 'EU Projects Block';
  };
  attributes: {
    projects: Schema.Attribute.Component<'shared.eu-project', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksFounder extends Struct.ComponentSchema {
  collectionName: 'components_blocks_founders';
  info: {
    displayName: 'Founder Block';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksGallery extends Struct.ComponentSchema {
  collectionName: 'components_blocks_gallery';
  info: {
    displayName: 'Gallery Block';
  };
  attributes: {
    coefficient: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<400>;
    images: Schema.Attribute.Component<'shared.gallery-image', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    description: 'Page heading, description, breadcrumbs and actions';
    displayName: 'Hero Block';
  };
  attributes: {
    actions: Schema.Attribute.Component<'shared.action', true>;
    breadcrumbs: Schema.Attribute.Component<'shared.breadcrumb', true>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    fullText: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    padding: Schema.Attribute.Enumeration<['pb', 'pt']> &
      Schema.Attribute.DefaultTo<'pb'>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksHowWork extends Struct.ComponentSchema {
  collectionName: 'components_blocks_how_work';
  info: {
    displayName: 'How We Work Block';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.process-item', true> &
      Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksIdea extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ideas';
  info: {
    displayName: 'Idea Block';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksInformation extends Struct.ComponentSchema {
  collectionName: 'components_blocks_information';
  info: {
    displayName: 'Information Block';
  };
  attributes: {
    texts: Schema.Attribute.Component<'shared.text-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksReels extends Struct.ComponentSchema {
  collectionName: 'components_blocks_reels';
  info: {
    displayName: 'Vimeo Reels Block';
  };
  attributes: {
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksRelatedWorks extends Struct.ComponentSchema {
  collectionName: 'components_blocks_related_works';
  info: {
    description: 'Works shown after a work detail page; the current work is excluded automatically';
    displayName: 'Related Works Block';
  };
  attributes: {
    description: Schema.Attribute.Text;
    itemLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<2>;
    padding: Schema.Attribute.Enumeration<['y', 'pt', 'pb']> &
      Schema.Attribute.DefaultTo<'y'>;
    showMore: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'More Works'>;
  };
}

export interface BlocksServicesList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_services_lists';
  info: {
    description: 'Services will be connected after the Service collection is created';
    displayName: 'Services Block';
  };
  attributes: {
    dark: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text;
    itemLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    selectedServices: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    >;
    source: Schema.Attribute.Enumeration<['all', 'selected']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'all'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksShare extends Struct.ComponentSchema {
  collectionName: 'components_blocks_share';
  info: {
    description: 'Social sharing buttons for the current work';
    displayName: 'Share Block';
  };
  attributes: {};
}

export interface BlocksShowreel extends Struct.ComponentSchema {
  collectionName: 'components_blocks_showreels';
  info: {
    displayName: 'Showreel Block';
  };
  attributes: {
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface BlocksTeam extends Struct.ComponentSchema {
  collectionName: 'components_blocks_team';
  info: {
    displayName: 'Team Block';
  };
  attributes: {
    selectedMembers: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    >;
    source: Schema.Attribute.Enumeration<['all', 'selected']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'all'>;
  };
}

export interface BlocksTimeline extends Struct.ComponentSchema {
  collectionName: 'components_blocks_timelines';
  info: {
    displayName: 'Timeline Block';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.timeline-item', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksTogether extends Struct.ComponentSchema {
  collectionName: 'components_blocks_together';
  info: {
    displayName: 'Together Block';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.text-item', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksWorksList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_works_lists';
  info: {
    description: 'Work items will be connected after the Work collection is created';
    displayName: 'Works Block';
  };
  attributes: {
    description: Schema.Attribute.Text;
    itemLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    padding: Schema.Attribute.Enumeration<['y', 'pt', 'pb']> &
      Schema.Attribute.DefaultTo<'pt'>;
    selectedWorks: Schema.Attribute.Relation<'oneToMany', 'api::work.work'>;
    showBreadcrumbs: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    showMore: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showSectionNumber: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    source: Schema.Attribute.Enumeration<['all', 'selected']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'all'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    description: 'Search engines and social sharing metadata';
    displayName: 'SEO';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    noFollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    shareImage: Schema.Attribute.Media<'images'>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedAction extends Struct.ComponentSchema {
  collectionName: 'components_shared_actions';
  info: {
    displayName: 'Action';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    popupId: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['link', 'popup']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'link'>;
  };
}

export interface SharedBreadcrumb extends Struct.ComponentSchema {
  collectionName: 'components_shared_breadcrumbs';
  info: {
    displayName: 'Breadcrumb';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCelebrity extends Struct.ComponentSchema {
  collectionName: 'components_shared_celebrities';
  info: {
    displayName: 'Celebrity';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedClient extends Struct.ComponentSchema {
  collectionName: 'components_shared_clients';
  info: {
    displayName: 'Client';
  };
  attributes: {
    href: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedContactLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_links';
  info: {
    displayName: 'Contact Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEuProject extends Struct.ComponentSchema {
  collectionName: 'components_shared_eu_projects';
  info: {
    displayName: 'EU Project';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedGalleryImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_images';
  info: {
    displayName: 'Gallery Image';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface SharedPhone extends Struct.ComponentSchema {
  collectionName: 'components_shared_phones';
  info: {
    displayName: 'Phone';
  };
  attributes: {
    number: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProcessItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_items';
  info: {
    displayName: 'Process Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_members';
  info: {
    displayName: 'Team Member';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: 'Text Item';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_items';
  info: {
    displayName: 'Timeline Item';
  };
  attributes: {
    date: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    year: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about': BlocksAbout;
      'blocks.celebrities': BlocksCelebrities;
      'blocks.clients': BlocksClients;
      'blocks.contacts': BlocksContacts;
      'blocks.eu-projects': BlocksEuProjects;
      'blocks.founder': BlocksFounder;
      'blocks.gallery': BlocksGallery;
      'blocks.hero': BlocksHero;
      'blocks.how-work': BlocksHowWork;
      'blocks.idea': BlocksIdea;
      'blocks.information': BlocksInformation;
      'blocks.reels': BlocksReels;
      'blocks.related-works': BlocksRelatedWorks;
      'blocks.services-list': BlocksServicesList;
      'blocks.share': BlocksShare;
      'blocks.showreel': BlocksShowreel;
      'blocks.team': BlocksTeam;
      'blocks.timeline': BlocksTimeline;
      'blocks.together': BlocksTogether;
      'blocks.works-list': BlocksWorksList;
      'seo.seo': SeoSeo;
      'shared.action': SharedAction;
      'shared.breadcrumb': SharedBreadcrumb;
      'shared.celebrity': SharedCelebrity;
      'shared.client': SharedClient;
      'shared.contact-link': SharedContactLink;
      'shared.eu-project': SharedEuProject;
      'shared.gallery-image': SharedGalleryImage;
      'shared.phone': SharedPhone;
      'shared.process-item': SharedProcessItem;
      'shared.stat': SharedStat;
      'shared.team-member': SharedTeamMember;
      'shared.text-item': SharedTextItem;
      'shared.timeline-item': SharedTimelineItem;
    }
  }
}
