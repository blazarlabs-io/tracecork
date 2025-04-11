import {defineField, defineType} from 'sanity'

export const wineDetails = defineType({
  name: 'wineDetails',
  title: 'Wine Details',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'ingredientsTitle',
      title: 'Ingredients Title',
      type: 'string',
    }),
    defineField({
      name: 'bottledText',
      title: 'Bottled Text',
      type: 'string',
    }),
    defineField({
      name: 'reminderText',
      title: 'Reminder Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'nutritionTable',
      title: 'Nutrition Table',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'perMlText',
          title: 'Per Ml Text',
          type: 'string',
        }),
        defineField({
          name: 'energy',
          title: 'Energy',
          type: 'string',
        }),
        defineField({
          name: 'carbohydrates',
          title: 'Carbohydrates',
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
          ],
        }),
        defineField({
          name: 'fat',
          title: 'Fat',
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
          ],
        }),
        defineField({
          name: 'protein',
          title: 'Protein',
          type: 'string',
        }),
        defineField({
          name: 'salt',
          title: 'Salt',
          type: 'string',
        }),
        defineField({
          name: 'containsPortionsText',
          title: 'Contains Portions Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'drinkResponsiblyText',
      title: 'Drink Responsibly Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
  ],
})
