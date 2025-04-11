import {defineField, defineType} from 'sanity'
import {toastBase} from './toastBase'

export const globals = defineType({
  name: 'globals',
  title: 'Globals',
  type: 'object',
  fields: [
    defineField({
      name: 'somethingWentWrong',
      title: 'Something Went Wrong',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'error',
      title: 'Error',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
  ],
})
