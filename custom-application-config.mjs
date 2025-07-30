import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Custom Xcite Dashboard',
  entryPointUriPath: 'custom-xcite-dashboard',
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'practisealghan',
    },
    production: {
      applicationId: 'cmdmwtq0h002lzd016iuftz3i',
      url: 'https://master.d3pwujoh7kyir8.amplifyapp.com/',
    },
  },
  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_products'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Template starter',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;
