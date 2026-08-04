export default {
  routes: [
    {
      method: 'GET',
      path: '/works/catalog',
      handler: 'work.catalog',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/works/by-slug/:slug',
      handler: 'work.findBySlug',
      config: {
        auth: false,
      },
    },
  ],
};
