export default {
  routes: [
    {
      method: 'GET',
      path: '/team-members/catalog',
      handler: 'team-member.catalog',
      config: {
        auth: false,
      },
    },
  ],
};
