import {defineField, defineType} from 'sanity'

export const avatarCard = defineType({
  name: 'avatarCard',
  title: 'Avatar Card',
  type: 'document',
  fields: [
    defineField({
      name: 'foundedInText',
      title: 'Founded In Text',
      type: 'string',
    }),
    defineField({
      name: 'planText',
      title: 'Plan Text',
      type: 'string',
    }),
    defineField({
      name: 'qrCodesRemainingText',
      title: 'QR Codes Remaining Text',
      type: 'string',
    }),
    defineField({
      name: 'upgradeButtonLabel',
      title: 'Upgrade Button Label',
      type: 'string',
    }),
  ],
})
