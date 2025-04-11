import {defineField, defineType} from 'sanity'

export const previewWine = defineType({
  name: 'previewWine',
  title: 'Step 2 - Preview Wine',
  type: 'document',
  fields: [
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
      name: 'notSpecified',
      title: 'Not Specified',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
        }),
        defineField({
          name: 'type',
          title: 'Type',
          type: 'string',
        }),
        defineField({
          name: 'volume',
          title: 'Volume',
          type: 'string',
        }),
        defineField({
          name: 'alcoholByVolume',
          title: 'Alcohol by Volume',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
        }),
        defineField({
          name: 'notSpecifiedMessage',
          title: 'Not Specified Message',
          type: 'string',
        }),
      ],
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
          name: 'containsPortionsPhrase',
          title: 'Contains Portions Phrase',
          type: 'object',
          fields: [
            defineField({
              name: 'containsWord',
              title: 'Contains Word',
              type: 'string',
            }),
            defineField({
              name: 'portionsWord',
              title: 'Portions Word',
              type: 'string',
            }),
            defineField({
              name: 'ofWord',
              title: 'Of Word',
              type: 'string',
            }),
          ],
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
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'object',
      fields: [
        defineField({
          name: 'nextButtonLabel',
          title: 'Next Button Label',
          type: 'string',
        }),
        defineField({
          name: 'backButtonLabel',
          title: 'Back Button Label',
          type: 'string',
        }),
      ],
    }),
  ],
})
