import {defineField, defineType} from 'sanity'
import {footer} from './footer'
import {topBar} from './topBar'
import {login} from './login'
import {signup} from './signup'

export const publicComponents = defineType({
  name: 'publicComponents',
  title: 'Public Components',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField(topBar),
    defineField(login),
    defineField(signup),
    defineField(footer),
  ],
})
