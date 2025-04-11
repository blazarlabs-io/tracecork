import {defineField, defineType} from 'sanity'

export const statCard = defineType({
  name: 'statCard',
  title: 'Stat Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
    }),
  ],
})
