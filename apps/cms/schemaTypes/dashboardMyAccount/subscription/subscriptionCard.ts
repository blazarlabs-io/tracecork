import {defineField, defineType} from 'sanity'

export const subscriptionCard = defineType({
  name: 'subscriptionCard',
  title: 'Subscription Card',
  type: 'object',
  fields: [
    defineField({
      name: 'planText',
      title: 'Plan Text',
      type: 'string',
    }),
    defineField({
      name: 'labelsRemainingText',
      title: 'Labels Remaining Text',
      type: 'string',
    }),
    defineField({
      name: 'perYearText',
      title: 'Per Year Text',
      type: 'string',
    }),
    defineField({
      name: 'upgradeButtonLabel',
      title: 'Upgrade Button Label',
      type: 'string',
    }),
  ],
})
