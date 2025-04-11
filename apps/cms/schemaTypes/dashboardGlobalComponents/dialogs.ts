import {defineField} from 'sanity'
import {dialog} from './dialog'

export const dialogs = defineField({
  name: 'dialogs',
  title: 'Dialogs',
  type: 'object',
  fields: [
    defineField({
      name: 'deleteWineDialog',
      title: 'Delete Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'editWineDialog',
      title: 'Edit Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'publishWineDialog',
      title: 'Publish Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'restoreWineDialog',
      title: 'Restore Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'tokenizeWineDialog',
      title: 'Tokenize Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'unpublishWineDialog',
      title: 'Unpublish Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'missingFieldsDialog',
      title: 'Missing Fields Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'qrCodeQuotaExceededDialog',
      title: 'QR Code Quota Exceeded Dialog',
      type: 'object',
      fields: [
        ...dialog.fields.map((f) => defineField(f)),
        defineField({
          name: 'upgradeActionLabel',
          title: 'Upgrade Action Label',
          type: 'string',
        }),
        defineField({
          name: 'description2',
          title: 'Description 2',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'deleteNoticeDialog',
      title: 'Delete Notice Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'upgradeWineDialog',
      title: 'Upgrade Wine Dialog',
      type: 'object',
      fields: [...dialog.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'qrCodeDialog',
      title: 'QR Code Dialog',
      type: 'object',
      fields: [
        defineField({
          name: 'qrCodeAvailable',
          title: 'QR Code Available',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'buttons',
              title: 'Buttons',
              type: 'object',
              fields: [
                defineField({
                  name: 'downloadButtonLabel',
                  title: 'Download Button Label',
                  type: 'string',
                }),
                defineField({
                  name: 'okButtonLabel',
                  title: 'Ok Button Label',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
        defineField({
          name: 'qrCodeUnavailable',
          title: 'QR Code Unavailable',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'buttons',
              title: 'Buttons',
              type: 'object',
              fields: [
                defineField({
                  name: 'downloadButtonLabel',
                  title: 'Download Button Label',
                  type: 'string',
                }),
                defineField({
                  name: 'okButtonLabel',
                  title: 'Ok Button Label',
                  type: 'string',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
