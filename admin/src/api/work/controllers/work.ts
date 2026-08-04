import { factories } from '@strapi/strapi';
import { blocksPopulate, seoPopulate } from '../../../utils/blocks-populate';

const workCardPopulate = {
  previewImage: true,
  previewVideo: true,
  services: true,
  subservices: {
    populate: {
      service: true,
    },
  },
};

export default factories.createCoreController('api::work.work', ({ strapi }) => ({
  async catalog(ctx) {
    const locale = typeof ctx.query.locale === 'string'
      ? ctx.query.locale
      : undefined;

    const works = await strapi.documents('api::work.work').findMany({
      status: 'published',
      ...(locale ? { locale } : {}),
      sort: ['createdAt:desc'],
      populate: workCardPopulate,
    });

    return this.transformResponse(works);
  },

  async findBySlug(ctx) {
    const slug = String(ctx.params.slug || '').trim();
    const locale = typeof ctx.query.locale === 'string'
      ? ctx.query.locale
      : undefined;

    if (!slug) {
      return ctx.badRequest('Work slug is required');
    }

    const work = await strapi.documents('api::work.work').findFirst({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      status: 'published',
      ...(locale ? { locale } : {}),
      populate: {
        ...workCardPopulate,
        seo: seoPopulate,
        blocks: blocksPopulate,
      },
    });

    if (!work) {
      return ctx.notFound('Work not found');
    }

    return this.transformResponse(work);
  },
}));
