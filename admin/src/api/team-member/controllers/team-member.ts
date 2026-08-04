import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::team-member.team-member', ({ strapi }) => ({
  async catalog(ctx) {
    const locale = typeof ctx.query.locale === 'string'
      ? ctx.query.locale
      : undefined;

    const members = await strapi.documents('api::team-member.team-member').findMany({
      status: 'published',
      ...(locale ? { locale } : {}),
      sort: ['position:asc', 'createdAt:asc'],
      populate: {
        photo: true,
      },
    });

    return this.transformResponse(members);
  },
}));
