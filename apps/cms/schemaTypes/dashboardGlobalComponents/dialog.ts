import {defineType, defineField} from 'sanity'

export const dialog = defineType({
  name: 'dialog',
  title: 'Dialog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'cancelButtonLabel',
          title: 'Cancel Button Label',
          type: 'string',
        }),
        defineField({
          name: 'confirmButtonLabel',
          title: 'Confirm Button Label',
          type: 'string',
        }),
      ],
    }),
  ],
})
