import {defineField, defineType} from 'sanity'

export const confirmEmail = defineType({
  name: 'confirmEmail',
  title: 'Confirm Email',
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
      name: 'continueButtonLabel',
      title: 'Continue Button Label',
      type: 'string',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
    }),
    defineField({
      name: 'confirmMessage',
      title: 'Confirm Message',
      type: 'string',
    }),
  ],
})
