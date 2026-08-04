import { factories } from '@strapi/strapi';
import { blocksPopulate, seoPopulate } from '../../../utils/blocks-populate';

export default factories.createCoreController('api::service.service', ({ strapi }) => ({
  async catalog(ctx) {
    const locale = typeof ctx.query.locale === 'string'
      ? ctx.query.locale
      : undefined;

    const services = await strapi.documents('api::service.service').findMany({
      status: 'published',
      ...(locale ? { locale } : {}),
      sort: ['createdAt:asc'],
      populate: {
        previewImage: true,
        previewVideo: true,
        subservices: {
          filters: {
            publishedAt: {
              $notNull: true,
            },
          },
          sort: ['createdAt:asc'],
        },
      },
    });

    return this.transformResponse(services);
  },

  async findBySlug(ctx) {
    const slug = String(ctx.params.slug || '').trim();
    const locale = typeof ctx.query.locale === 'string'
      ? ctx.query.locale
      : undefined;

    if (!slug) {
      return ctx.badRequest('Service slug is required');
    }

    const service = await strapi.documents('api::service.service').findFirst({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      status: 'published',
      ...(locale ? { locale } : {}),
      populate: {
        previewImage: true,
        previewVideo: true,
        subservices: {
          filters: {
            publishedAt: {
              $notNull: true,
            },
          },
          sort: ['createdAt:asc'],
        },
        seo: seoPopulate,
        blocks: blocksPopulate,
      },
    });

    if (!service) {
      return ctx.notFound('Service not found');
    }

    return this.transformResponse(service);
  },
}));
