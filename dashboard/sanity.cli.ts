import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'fxum4t6f',
    dataset: 'production',
  },
  typegen: {
    enabled: true,
    path: '../website/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../website/sanity.types.ts',
    overloadClientMethods: true,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
