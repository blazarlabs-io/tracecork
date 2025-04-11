import {defineField, defineType} from 'sanity'

export const verifyEmail = defineType({
  name: 'verifyEmail',
  title: 'Verify Email',
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
      name: 'resendButtonLable',
      title: 'Resend Button Label',
      type: 'string',
    }),
    defineField({
      name: 'resendInMessage',
      title: 'Resend in Message',
      type: 'string',
    }),
  ],
})
