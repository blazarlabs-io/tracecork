import {defineField, defineType} from 'sanity'

export const passwordResetSent = defineType({
  name: 'passwordResetSent',
  title: 'Password Reset Sent',
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
      name: 'question',
      title: 'Question',
      type: 'string',
    }),
    defineField({
      name: 'resendInMessage',
      title: 'Resend in Message',
      type: 'string',
    }),
    defineField({
      name: 'resendButtonLable',
      title: 'Resend Button Label',
      type: 'string',
    }),
    defineField({
      name: 'backButtonLable',
      title: 'Back Button Label',
      type: 'string',
    }),
  ],
})
