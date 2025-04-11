import {defineField, defineType} from 'sanity'
import {toastBase} from './toastBase'

export const userSettings = defineType({
  name: 'userSettings',
  title: 'User Settins',
  type: 'object',
  fields: [
    defineField({
      name: 'upgradeRequestSent',
      title: 'Upgrade Request Sent',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'autoSave',
      title: 'Auto Save',
      type: 'object',
      fields: [
        ...toastBase.fields.map((f) => defineField(f)),
        defineField({
          name: 'enabled',
          title: 'Enabled Label',
          type: 'string',
        }),
        defineField({
          name: 'disabled',
          title: 'Disabled Label',
          type: 'string',
        }),
        defineField({
          name: 'turnOn',
          title: 'Turn On Label',
          type: 'string',
        }),
        defineField({
          name: 'turnOff',
          title: 'Turn Off Label',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'passwordChanged',
      title: 'Password Changed',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'accountDeleted',
      title: 'Account Deleted',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'accountDeletedError',
      title: 'Account Deleted Error',
      type: 'object',
      fields: [...toastBase.fields.map((f) => defineField(f))],
    }),
  ],
})
