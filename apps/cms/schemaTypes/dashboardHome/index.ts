import {defineField, defineType} from 'sanity'
import {avatarCard} from './avatarCard'
import {statCard} from './statCard'

export const dashboardHome = defineType({
  name: 'dashboardHome',
  title: 'Dashboard Home',
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
      name: 'avatarCard',
      title: 'Avatar Card',
      type: 'object',
      fields: [...avatarCard.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'statCards',
      title: 'Stat Cards',
      type: 'array',
      of: [
        defineField({
          name: 'statCard',
          title: 'Stat Card',
          type: 'object',
          fields: [...statCard.fields.map((f) => defineField(f))],
        }),
      ],
    }),
  ],
})
