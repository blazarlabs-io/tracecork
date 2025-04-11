import {defineField, defineType} from 'sanity'
import {deleteAccountDialog} from './deleteAccountDialog'
import {changePasswordDialog} from './changePasswordDialog'

export const manageAccount = defineType({
  name: 'manageAccount',
  title: 'Manage Account',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'string',
    }),
    defineField({
      name: 'changePassword',
      title: 'Change Password',
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
          name: 'dialog',
          title: 'Dialog',
          type: 'object',
          fields: [...changePasswordDialog.fields.map((f) => defineField(f))],
        }),
      ],
    }),
    defineField({
      name: 'deleteAccount',
      title: 'Delete Account',
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
          name: 'dialog',
          title: 'Dialog',
          type: 'object',
          fields: [...deleteAccountDialog.fields.map((f) => defineField(f))],
        }),
      ],
    }),
  ],
})
