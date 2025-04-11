import {defineField, defineType} from 'sanity'
import {toastBase} from './toastBase'

export const wines = defineType({
  name: 'wines',
  title: 'Wines',
  type: 'object',
  fields: [
    defineField({
      name: 'archivedWine',
      title: 'Archived Wine',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'publishWine',
      title: 'Publish Wine',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'unpublishWine',
      title: 'Unpublish Wine',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'restoreWine',
      title: 'Restore Wine',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'wineSaved',
      title: 'Wine Saved',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'wineryInfoUpdated',
      title: 'Winery Info Updated',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
  ],
})
