import {defineField, defineType} from 'sanity'
import {inputField} from '../dashboardWinery/wineryDetails/inputFields'

export const resetPassword = defineType({
  name: 'resetPassword',
  title: 'Reset Password',
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
      name: 'newPassword',
      title: 'New Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'confirmNewPassword',
      title: 'Confirm New Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'sendButtonLable',
      title: 'Send Button Label',
      type: 'string',
    }),
    defineField({
      name: 'confirmMessage',
      title: 'Confirm Message',
      type: 'string',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
    }),
    defineField({
      name: 'backButtonLable',
      title: 'Back Button Label',
      type: 'string',
    }),
  ],
})
