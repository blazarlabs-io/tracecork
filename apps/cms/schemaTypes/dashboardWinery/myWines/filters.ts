import {defineField} from 'sanity'

export const filters = defineField({
  name: 'filters',
  title: 'Filters',
  type: 'object',
  fields: [
    defineField({
      name: 'searchBar',
      title: 'Search Bar',
      type: 'object',
      fields: [
        defineField({
          name: 'placeholder',
          title: 'Placeholder',
          type: 'string',
        }),
        defineField({
          name: 'resetButtonLabel',
          title: 'Reset Button Label',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'status',
      title: 'Status',
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
          name: 'states',
          title: 'States',
          type: 'array',
          of: [
            {
              type: 'string',
            },
          ],
        }),
        defineField({
          name: 'noResultsFoundText',
          title: 'No Results Found Text',
          type: 'string',
        }),
        defineField({
          name: 'clearFilterMessage',
          title: 'Clear Filter Message',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'view',
      title: 'View',
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
          name: 'dropdown',
          title: 'Dropdown',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
