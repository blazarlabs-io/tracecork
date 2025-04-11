import {defineField, defineType} from 'sanity'
import {wineEditor} from './wineEditor'
import {previewWine} from './previewwine'
import {publishWine} from './publishWine'

export const wineStepper = defineType({
  name: 'wineStepper',
  title: 'Wine Stepper',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'currentStep',
      title: 'Current Step',
      type: 'string',
    }),
    defineField(wineEditor),
    defineField(previewWine),
    defineField(publishWine),
    defineField({
      name: 'autosave',
      title: 'Autosave',
      type: 'object',
      fields: [
        defineField({
          name: 'enabledText',
          title: 'Enabled Text',
          type: 'string',
        }),
        defineField({
          name: 'savingInText',
          title: 'Saving in Text',
          type: 'string',
        }),
        defineField({
          name: 'secondsText',
          title: 'Seconds Text',
          type: 'string',
        }),
      ],
    }),
  ],
})
