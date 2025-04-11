import {defineField, defineType} from 'sanity'
import {inputField} from '../dashboardWinery/wineryDetails/inputFields'

export const login = defineType({
  name: 'login',
  title: 'Login',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'googleButtonLabel',
      title: 'Google Button Label',
      type: 'string',
    }),
    defineField({
      name: 'googleButtonTooltip',
      title: 'Google Button Tooltip',
      type: 'string',
    }),
    defineField({
      name: 'separatorText',
      title: 'Separator Text',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'forgotPassword',
      title: 'Forgot Password',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Url',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'loginButtonLabel',
      title: 'Login Button Label',
      type: 'string',
    }),
    defineField({
      name: 'register',
      title: 'Register',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Url',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'legalText',
      title: 'Legal Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'loginSuccessMessage',
      title: 'Login Success Message',
      type: 'string',
    }),
    defineField({
      name: 'loginErrorMessage',
      title: 'Login Error Message',
      type: 'string',
    }),
  ],
})
