import {defineField} from 'sanity'
import {inputField} from '../../dashboardWinery/wineryDetails/inputFields'

export const changePasswordDialog = defineField({
  name: 'changePasswordDialog',
  title: 'Account Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'currentPassword',
      title: 'Current Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'newPassword',
      title: 'New Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'confirmPassword',
      title: 'Confirm Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'cancelButtonLabel',
          title: 'Cancel Button Label',
          type: 'string',
        }),
        defineField({
          name: 'confirmButtonLabel',
          title: 'Confirm Button Label',
          type: 'string',
        }),
      ],
    }),
  ],
})
