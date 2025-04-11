import {defineField} from 'sanity'
import {errorMessages} from '../../wineryDetails/errorMessages'

export const crudfield = defineField({
  name: 'crudField',
  title: 'CRUD Field',
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
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'errorMessages',
      title: 'Error Messages',
      type: 'object',
      fields: [...errorMessages.fields.map((f) => defineField(f))],
    }),
  ],
})
