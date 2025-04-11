import {defineField, defineType} from 'sanity'
import {wines} from './wines'
import {userSettings} from './userSettings'
import {globals} from './globals'
import {auth} from './auth'

export const toasts = defineType({
  name: 'toasts',
  title: 'Toasts',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField(globals),
    defineField(auth),
    defineField(wines),
    defineField(userSettings),
  ],
})
