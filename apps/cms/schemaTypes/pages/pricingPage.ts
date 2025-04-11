import {defineField, defineType} from 'sanity'

export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
})
