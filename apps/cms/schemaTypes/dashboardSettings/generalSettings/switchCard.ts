import {defineField} from 'sanity'

export const switchCard = defineField({
  name: 'switchCard',
  title: 'Switch Card',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
})
