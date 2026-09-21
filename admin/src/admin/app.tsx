import type { StrapiApp } from '@strapi/strapi/admin';

const HARBSTONE_LOGO = '/uploads/icon_81c22cf25f.png';
const BRANDING_STYLE_ID = 'harbstone-admin-branding';

const translations = {
  en: {
    'Auth.form.button.login.strapi': 'Log in',
    'Auth.form.email.placeholder': 'name@example.com',
    'Auth.form.register.subtitle':
      'Credentials are only used to authenticate in this administration panel. All saved data remains in your database.',
    'Auth.form.welcome.subtitle': 'Log in to the Harbstone administration panel',
    'Auth.form.welcome.title': 'Welcome to Harbstone!',
    'Settings.application.strapi-version': 'CMS version',
    'Settings.application.strapiVersion': 'CMS version',
    'Settings.permissions.users.listview.header.subtitle':
      'All users who have access to this administration panel',
    'app.components.BlockLink.blog.content': 'Read the latest product news.',
    'app.components.BlockLink.cloud': 'Cloud hosting',
    'app.components.BlockLink.cloud.content': 'Fully managed hosting for your project.',
    'app.components.BlockLink.tutorial.content':
      'Follow step-by-step instructions to use and customize the CMS.',
    'app.components.FreeTrialWelcomeModal.description1':
      'For the next 30 days, you will have access to advanced administration features.',
    'app.components.LeftMenu.navbrand.title': 'Harbstone Dashboard',
    'app.components.NpsSurvey.banner-title':
      'How likely are you to recommend this administration panel?',
    'components.AutoReloadBlocker.description':
      'Run the CMS in development mode with one of the following commands:',
    'global.plugins.sentry.description': 'Send CMS error events to Sentry.',
    'notification.ee.warning.over-.message':
      'Add seats to {licenseLimitStatus, select, OVER_LIMIT {invite} AT_LIMIT {re-enable}} users. If the change is not reflected yet, restart the application.',
    'notification.version.update.message': 'A new CMS version is available!',
    'tours.contentTypeBuilder.AIChat.content':
      '<p>Ask the assistant about the Content-Type Builder or your schema.</p><p>It can generate schemas tailored to your needs, including dates, email fields, media and UIDs.</p>',
    'tours.overview.subtitle': 'Follow the guided tour to get the most out of the CMS.',
    'tours.overview.strapiCloud.label': 'Deploy your application',
    'HomePage.widget.deploy-now.description': 'Deploy your project',
    'i18n.Settings.list.empty.description':
      'This is not usual behavior and may mean that the database was modified manually. Save at least one locale to use localization correctly.',
    'email.Settings.email.plugin.placeholder.defaultFrom':
      'e.g. Harbstone No-Reply <no-reply@example.com>',
    'email.Settings.email.plugin.placeholder.defaultReplyTo':
      'e.g. Harbstone <hello@example.com>',
    'content-type-builder.notification.info.autoreaload-disable':
      'The CMS is in production mode, so editing content types is disabled. Start the application in development mode to edit them.',
    'content-type-builder.chat.input.defaults.strapi': 'Tell me about the CMS',
    'content-type-builder.chat.input.thinking': 'The CMS assistant is thinking...',
    'content-type-builder.chat.input.placeholder': 'Ask the CMS assistant...',
    'content-type-builder.chat.input.strapi-ai-can-make-errors':
      'The CMS assistant can make mistakes.',
  },
};

const installRuntimeBranding = () => {
  const existingStyle = document.getElementById(BRANDING_STYLE_ID);

  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = BRANDING_STYLE_ID;
    style.textContent = `
      a[href*="strapi.io"],
      a[href*="github.com/strapi"],
      a[href*="market.strapi"] {
        display: none !important;
      }
    `;
    document.head.append(style);
  }

  const updateTitle = () => {
    const title = document.title.replace(/\bStrapi\b/gi, 'Harbstone');

    if (title !== document.title) {
      document.title = title;
    }
  };

  updateTitle();

  const title = document.querySelector('title');
  if (title && !title.dataset.brandObserverInstalled) {
    title.dataset.brandObserverInstalled = 'true';
    new MutationObserver(updateTitle).observe(title, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
};

export default {
  config: {
    auth: {
      logo: HARBSTONE_LOGO,
    },
    menu: {
      logo: HARBSTONE_LOGO,
    },
    notifications: {
      releases: false,
    },
    translations,
    tutorials: false,
  },
  register(app: StrapiApp) {
    installRuntimeBranding();

    app.customFields.register({
      name: 'colorPicker',
      type: 'string',
      intlLabel: {
        id: 'global.colorPicker.label',
        defaultMessage: 'Background color',
      },
      intlDescription: {
        id: 'global.colorPicker.description',
        defaultMessage: 'Choose the background color for the entire screenshots section.',
      },
      components: {
        Input: async () => import('./components/ColorPickerInput'),
      },
    });

    app.addRBACMiddleware(() => (next) => (permissions) => (
      next(permissions.filter(({ action }) => action !== 'admin::marketplace.read'))
    ));

    app.widgets.register((widgets) => (
      widgets.filter(({ id, pluginId }) => id !== 'deploy-now' || pluginId !== 'admin')
    ));
  },
};
