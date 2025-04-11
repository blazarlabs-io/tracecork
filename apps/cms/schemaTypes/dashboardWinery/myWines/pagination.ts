import {defineField} from 'sanity'

export const pagination = defineField({
  name: 'pagination',
  title: 'Pagination',
  type: 'object',
  fields: [
    defineField({
      name: 'rowsPerPage',
      title: 'Rows Per Page',
      type: 'string',
    }),
    defineField({
      name: 'currentPage',
      title: 'Current Page',
      type: 'string',
    }),
  ],
})
