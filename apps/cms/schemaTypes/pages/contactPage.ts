import {defineField, defineType} from 'sanity'
import {dialog} from '../dashboardGlobalComponents/dialog'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'subHeadline',
      title: 'Sub Headline',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'form',
      title: 'Form',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
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
            defineField({
              name: 'errorMessages',
              title: 'Error Messages',
              type: 'object',
              fields: [
                defineField({
                  name: 'required',
                  title: 'Required',
                  type: 'string',
                }),
                defineField({
                  name: 'invalid',
                  title: 'Invalid',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'message',
          title: 'Message',
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
            defineField({
              name: 'errorMessages',
              title: 'Error Messages',
              type: 'object',
              fields: [
                defineField({
                  name: 'required',
                  title: 'Required',
                  type: 'string',
                }),
                defineField({
                  name: 'invalid',
                  title: 'Invalid',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
    }),
    defineField({
      name: 'messageSuccess',
      title: 'Message Success Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
  ],
})
