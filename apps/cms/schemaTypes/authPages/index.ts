import {defineField, defineType} from 'sanity'
import {confirmEmail} from './confirmEmail'
import {forgotPassword} from './forgotPassword'
import {passwordResetSent} from './passwordResetSent'
import {verifyEmail} from './verifyEmail'
import {resetPassword} from './resetPassword'

export const authPages = defineType({
  name: 'authPages',
  title: 'Auth Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      title: 'Language',
      readOnly: true,
    }),
    defineField(confirmEmail),
    defineField(forgotPassword),
    defineField(passwordResetSent),
    defineField(verifyEmail),
    defineField(resetPassword),
  ],
})
