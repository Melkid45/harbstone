import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: env.array('CORS_ORIGINS', ['http://localhost:3000']),
      headers: [
        'Content-Type',
        'Authorization',
        'Origin',
        'Accept',
      ],
    },
  },
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formidable: {
        maxFileSize: env.int('UPLOAD_MAX_FILE_SIZE_BYTES', 1_000_000_000),
      },
    },
  },
  'strapi::session',
  {
    name: 'strapi::favicon',
    config: {
      path: 'public/uploads/icon_81c22cf25f.png',
    },
  },
  'strapi::public',
];

export default config;
