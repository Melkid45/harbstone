export const blocksPopulate = {
  on: {
    'blocks.hero': {
      populate: {
        breadcrumbs: true,
        actions: true,
      },
    },
    'blocks.showreel': {
      populate: {
        video: true,
      },
    },
    'blocks.clients': {
      populate: {
        clients: {
          populate: {
            logo: true,
          },
        },
      },
    },
    'blocks.works-list': {
      populate: {
        selectedWorks: {
          populate: {
            previewImage: true,
            previewVideo: true,
            services: true,
            subservices: {
              populate: {
                service: true,
              },
            },
          },
        },
      },
    },
    'blocks.related-works': {
      populate: '*',
    },
    'blocks.services-list': {
      populate: {
        selectedServices: {
          populate: {
            previewImage: true,
            previewVideo: true,
            subservices: true,
          },
        },
      },
    },
    'blocks.celebrities': {
      populate: {
        celebrities: {
          populate: {
            image: true,
          },
        },
      },
    },
    'blocks.together': {
      populate: {
        items: true,
      },
    },
    'blocks.about': {
      populate: {
        breadcrumbs: true,
        points: true,
      },
    },
    'blocks.information': {
      populate: {
        texts: true,
      },
    },
    'blocks.reels': {
      populate: '*',
    },
    'blocks.timeline': {
      populate: {
        items: true,
      },
    },
    'blocks.founder': {
      populate: {
        photo: true,
      },
    },
    'blocks.how-work': {
      populate: {
        logo: true,
        items: true,
      },
    },
    'blocks.team': {
      populate: {
        selectedMembers: {
          populate: {
            photo: true,
          },
        },
      },
    },
    'blocks.contacts': {
      populate: {
        breadcrumbs: true,
        phones: true,
        socialLinks: true,
      },
    },
    'blocks.eu-projects': {
      populate: {
        projects: {
          populate: {
            image: true,
          },
        },
      },
    },
    'blocks.gallery': {
      populate: {
        images: {
          populate: {
            image: true,
          },
        },
      },
    },
    'blocks.idea': {
      populate: '*',
    },
    'blocks.share': {
      populate: '*',
    },
  },
};

export const seoPopulate = {
  populate: {
    shareImage: true,
  },
};
