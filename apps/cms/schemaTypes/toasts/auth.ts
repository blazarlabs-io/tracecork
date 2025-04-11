import {defineField, defineType} from 'sanity'
import {toastBase} from './toastBase'

export const auth = defineType({
  name: 'auth',
  title: 'Auth',
  type: 'object',
  fields: [
    defineField({
      name: 'loginSuccess',
      title: 'Login Success',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'verifyEmailError',
      title: 'Verify Email Error',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
  ],
})
