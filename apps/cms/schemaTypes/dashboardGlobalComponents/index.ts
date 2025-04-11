import {defineField, defineType, FieldDefinition} from 'sanity'
import {topBar} from './topBar'
import {sideBar} from './sideBar'
import {dialogs} from './dialogs'

export const dashboardGlobalComponents = defineType({
  name: 'dashboardGlobalComponents',
  title: 'Dashboard Global Components',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'topBar',
      title: 'Top Bar',
      type: 'object',
      description: 'Top Bar available only on dashboard routes, while the user is logged in.',
      fields: [...(topBar.fields.map((f) => defineField(f)) as FieldDefinition[])],
    }),
    defineField({
      name: 'sideBar',
      title: 'Side Bar',
      type: 'object',
      description: 'Side Bar available only on dashboard routes, while the user is logged in.',
      fields: [...sideBar.fields.map((f) => defineField(f))],
    }),
    defineField(dialogs),
  ],
})
