import {defineType, defineField} from 'sanity'
import {inputField} from './inputFields'
import {errorMessages} from './errorMessages'

export const wineryDetails = defineType({
  name: 'wineryDetails',
  title: 'Dashboard Winery Details',
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
      name: 'avatar',
      title: 'Avatar',
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
          name: 'instructions',
          title: 'Instructions',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'wineryName',
      title: 'Winery Name',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'foundedIn',
      title: 'Founded In',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'wineCollections',
      title: 'Wine Collections',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'noOfBottlesProduced',
      title: 'No of Bottles Produced',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'vineyardsSurface',
      title: 'Vineyards Surface',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'grapeVarieties',
      title: 'Grape Varieties',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
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
          name: 'errorMessages',
          title: 'Error Messages',
          type: 'object',
          fields: [...errorMessages.fields.map((f) => defineField(f))],
        }),
      ],
    }),
    defineField({
      name: 'wineryHeadquarters',
      title: 'Winery Headquarters',
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
          name: 'latitude',
          title: 'Latitude',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'longitude',
          title: 'Longitude',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
        }),
        defineField({
          name: 'mapButton',
          title: 'Map Button',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'wineryRepresentative',
      title: 'Winery Representative',
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
              fields: [...errorMessages.fields.map((f) => defineField(f))],
            }),
          ],
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
            defineField({
              name: 'errorMessages',
              title: 'Error Messages',
              type: 'object',
              fields: [...errorMessages.fields.map((f) => defineField(f))],
            }),
          ],
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
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
              fields: [...errorMessages.fields.map((f) => defineField(f))],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'autoSaveMessage',
      title: 'Auto Save Message',
      type: 'string',
    }),
    defineField({
      name: 'savingInMessage',
      title: 'Saving In Message',
      type: 'string',
    }),
  ],
})
