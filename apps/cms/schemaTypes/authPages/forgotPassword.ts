import {defineField, defineType} from 'sanity'
import {inputField} from '../dashboardWinery/wineryDetails/inputFields'

export const forgotPassword = defineType({
  name: 'forgotPassword',
  title: 'Forgot Password',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'sendButtonLable',
      title: 'Send Button Label',
      type: 'string',
    }),
    defineField({
      name: 'backButtonLable',
      title: 'Back Button Label',
      type: 'string',
    }),
  ],
})
