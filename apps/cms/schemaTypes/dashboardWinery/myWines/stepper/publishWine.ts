import {defineField, defineType} from 'sanity'

export const publishWine = defineType({
  name: 'publishWine',
  title: 'Step 3 - Publish Wine',
  type: 'document',
  fields: [
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
    defineField({
      name: 'alertMessage',
      title: 'Alert Message',
      type: 'string',
    }),
    defineField({
      name: 'buttonLabels',
      title: 'Button Labels',
      type: 'object',
      fields: [
        defineField({
          name: 'backButtonLabel',
          title: 'Back Button Label',
          type: 'string',
        }),
        defineField({
          name: 'publishButtonLabel',
          title: 'Publish Button Label',
          type: 'string',
        }),
      ],
    }),
  ],
})
