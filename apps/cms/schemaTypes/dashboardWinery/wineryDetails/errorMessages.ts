import {defineField} from 'sanity'

export const errorMessages = defineField({
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
})
