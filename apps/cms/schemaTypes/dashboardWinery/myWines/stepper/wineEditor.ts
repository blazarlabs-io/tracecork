import {defineField, defineType} from 'sanity'
import {inputField} from '../../wineryDetails/inputFields'
import {grapeVarieties} from './grapeVarieties'
import {crudfield} from './crudField'

export const wineEditor = defineType({
  name: 'wineryDetails',
  title: 'Step 1 - Wine Editor',
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
      name: 'generalInformation',
      title: 'General Information',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
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
            defineField({
              name: 'qrCodeUnavailableText',
              title: 'QR Code Unavailable Text',
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
          name: 'collectionName',
          title: 'Collection Name',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'volume',
          title: 'Volume',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'typeOfWine',
          title: 'Type of Wine',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'sweetness',
          title: 'Sweetness',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField(grapeVarieties),
        defineField({
          name: 'cdo',
          title: 'Controlled Designation of Origin',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'countries',
          title: 'Countries',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'collectionSize',
          title: 'Collection Size',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
      ],
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'rawMaterial',
          title: 'Raw Material',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'alcoholbyVolume',
          title: 'Alcohol by Volume',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'sugar',
          title: 'Sugar',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'acidityRegulators',
          title: 'Acidity Regulators',
          type: 'object',
          fields: [...crudfield.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'stabilizers',
          title: 'Stabilizers',
          type: 'object',
          fields: [...crudfield.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'finingAgents',
          title: 'Fining Agents',
          type: 'object',
          fields: [...crudfield.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'antioxidants',
          title: 'Antioxidants',
          type: 'object',
          fields: [...crudfield.fields.map((f) => defineField(f))],
        }),
      ],
    }),
    defineField({
      name: 'nutritionalInformation',
      title: 'Nutritional Information',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'energy',
          title: 'Energy',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'fat',
          title: 'Fat',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'carbohydrates',
          title: 'Carbohydrates',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'protein',
          title: 'Protein',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
        defineField({
          name: 'salt',
          title: 'Salt',
          type: 'object',
          fields: [...inputField.fields.map((f) => defineField(f))],
        }),
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
