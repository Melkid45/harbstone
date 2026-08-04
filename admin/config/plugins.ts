import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      sizeLimit: env.int('UPLOAD_MAX_FILE_SIZE_BYTES', 1_000_000_000),
    },
  },
});

export default config;
