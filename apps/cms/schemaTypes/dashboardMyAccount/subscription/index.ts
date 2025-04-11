import {defineField, defineType} from 'sanity'
import {subscriptionCard} from './subscriptionCard'

export const subscription = defineType({
  name: 'subscription',
  title: 'Subscription',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'string',
    }),
    defineField(subscriptionCard),
  ],
})
