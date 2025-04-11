import {defineField} from 'sanity'
import {errorMessages} from '../../wineryDetails/errorMessages'

export const grapeVarieties = defineField({
  name: 'grapeVarieties',
  title: 'Grape Varieties',
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
      name: 'name',
      title: 'Name',
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
        defineField(errorMessages),
      ],
    }),
    defineField({
      name: 'percentage',
      title: 'Percentage',
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
        defineField(errorMessages),
      ],
    }),
    defineField({
      name: 'vintage',
      title: 'Vintage',
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
        defineField(errorMessages),
      ],
    }),
  ],
})
