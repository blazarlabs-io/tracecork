import {defineField, defineType} from 'sanity'
import {filters} from './filters'
import {table} from './table'
import {pagination} from './pagination'

export const myWines = defineType({
  name: 'myWines',
  title: 'Dashboard My Wines',
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
      name: 'upgradeButtonLabel',
      title: 'Upgrade Button Label',
      type: 'string',
    }),
    defineField({
      name: 'qrCodesRemainingText',
      title: 'QR Codes Remaining Text',
      type: 'string',
    }),
    defineField({
      name: 'ofText',
      title: 'Of Text',
      type: 'string',
    }),
    defineField({
      name: 'addNewWineButtonLabel',
      title: 'Add New Wine Button Label',
      type: 'string',
    }),
    defineField(filters),
    defineField(table),
    defineField(pagination),
  ],
})
