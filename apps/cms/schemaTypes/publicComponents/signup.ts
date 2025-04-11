import {defineField, defineType} from 'sanity'
import {inputField} from '../dashboardWinery/wineryDetails/inputFields'

export const signup = defineType({
  name: 'signup',
  title: 'Sign Up',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'confirmPassword',
      title: 'Confirm Password',
      type: 'object',
      fields: [...inputField.fields.map((f) => defineField(f))],
    }),
    defineField({
      name: 'signUpButtonLabel',
      title: 'Sign Up Button Label',
      type: 'string',
    }),
    defineField({
      name: 'loginText',
      title: 'Login Text',
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
      name: 'separatorText',
      title: 'Separator Text',
      type: 'string',
    }),
    defineField({
      name: 'googleButtonLabel',
      title: 'Google Button Label',
      type: 'string',
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
      name: 'signInSuccessMessage',
      title: 'Sign In Success Message',
      type: 'string',
    }),
    defineField({
      name: 'signInErrorMessage',
      title: 'Sign In Error Message',
      type: 'string',
    }),
  ],
})
