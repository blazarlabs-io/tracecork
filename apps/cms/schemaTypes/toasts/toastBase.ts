import {defineField, defineType} from 'sanity'

export const toastBase = defineType({
  name: 'toastBase',
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
      type: 'string',
    }),
  ],
})
