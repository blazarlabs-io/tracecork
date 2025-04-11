import {defineField} from 'sanity'

export const inputField = defineField({
  name: 'inputField',
  title: 'Input Field',
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
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'errorMessages',
      title: 'Error Messages',
      type: 'object',
      fields: [
        defineField({
          name: 'required',
          title: 'Required',
          type: 'string',
        }),
        defineField({
          name: 'invalid',
          title: 'Invalid',
          type: 'string',
        }),
      ],
    }),
  ],
})
