import {defineField, defineType, FieldDefinition} from 'sanity'
import {homePage} from './homePage'
import {pricingPage} from './pricingPage'
import {contactPage} from './contactPage'

export const publicPages = defineType({
  name: 'publicPages',
  title: 'Public Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField({
      name: 'homePage',
      title: 'Home Page',
      type: 'object',
      fields: [...(homePage.fields.map((f) => defineField(f)) as FieldDefinition[])],
    }),
    defineField({
      name: 'pricingPage',
      title: 'Pricing Page',
      type: 'object',
      fields: [...(pricingPage.fields.map((f) => defineField(f)) as FieldDefinition[])],
    }),
    defineField({
      name: 'contactPage',
      title: 'Contact Page',
      type: 'object',
      fields: [...(contactPage.fields.map((f) => defineField(f)) as FieldDefinition[])],
    }),
  ],
})
