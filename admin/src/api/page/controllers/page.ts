/**
 * page controller
 */

import { factories } from '@strapi/strapi';
import { blocksPopulate, seoPopulate } from '../../../utils/blocks-populate';

export default factories.createCoreController('api::page.page', ({ strapi }) => ({
  async findBySlug(ctx) {
    const slug = String(ctx.params.slug || '').trim();
    const locale = typeof ctx.query.locale === 'string'
      ? ctx.query.locale
      : undefined;

    if (!slug) {
      return ctx.badRequest('Page slug is required');
    }

    const page = await strapi.documents('api::page.page').findFirst({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      status: 'published',
      ...(locale ? { locale } : {}),
      populate: {
        seo: seoPopulate,
        blocks: blocksPopulate,
      },
    });

    if (!page) {
      return ctx.notFound('Page not found');
    }

    return this.transformResponse(page);
  },
}));
