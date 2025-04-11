import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {i18n} from './languajes'

import {documentInternationalization} from '@sanity/document-internationalization'

export default defineConfig({
  name: 'default',
  title: 'tracecork-cms',

  projectId: '00hinjno',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: [
        'authPages',
        'systemVariables',
        'publicPages',
        'publicComponents',
        'dashboardHome',
        'dashboardGlobalComponents',
        'wineryDetails',
        'myWines',
        'wineStepper',
        'subscription',
        'manageAccount',
        'generalSettings',
        'wineDetails',
        'toasts',
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
