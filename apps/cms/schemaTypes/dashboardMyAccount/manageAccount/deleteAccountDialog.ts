import {defineField} from 'sanity'

export const deleteAccountDialog = defineField({
  name: 'deleteAccountDialog',
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
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'deleteInputField',
      title: 'Delete Input Field',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
        }),
      ],
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
