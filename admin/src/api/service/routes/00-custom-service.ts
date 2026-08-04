export default {
  routes: [
    {
      method: 'GET',
      path: '/services/catalog',
      handler: 'service.catalog',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/services/by-slug/:slug',
      handler: 'service.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
