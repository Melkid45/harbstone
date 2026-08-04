import { mergeConfig, type Plugin, type UserConfig } from 'vite';

const brandHtml = (html: string) => {
  const brandedHtml = html.replace(
    /<title>[^<]*<\/title>/i,
    '<title>Harbstone Admin</title>',
  );

  if (brandedHtml.includes('rel="icon"')) {
    return brandedHtml;
  }

  return brandedHtml.replace(
    '</head>',
    '  <link rel="icon" type="image/png" href="/favicon.ico" />\n</head>',
  );
};

const brandingPlugin: Plugin = {
  name: 'harbstone-admin-branding',
  enforce: 'post',
  transformIndexHtml: brandHtml,
  generateBundle(_options, bundle) {
    const indexHtml = bundle['index.html'];

    if (indexHtml?.type === 'asset' && typeof indexHtml.source === 'string') {
      indexHtml.source = brandHtml(indexHtml.source);
    }
  },
};

export default (config: UserConfig) => mergeConfig(config, {
  plugins: [brandingPlugin],
});
