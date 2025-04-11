import {defineField} from 'sanity'

export const table = defineField({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
            }),
            defineField({
              name: 'dropdown',
              title: 'Dropdown',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'rowsActions',
      title: 'Rows Actions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'tooltip',
              title: 'Tooltip',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
})
