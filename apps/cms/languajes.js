const languages = [
  {id: 'en', title: 'English', isDefault: true},
  {id: 'es', title: 'Spanish'},
  {id: 'fr', title: 'French'},
  {id: 'ru', title: 'Russian'},
  {id: 'ro', title: 'Romanian'},
  {id: 'bg', title: 'Bulgarian'},
  {id: 'hr', title: 'Croatian'},
  {id: 'cs', title: 'Czech'},
  {id: 'da', title: 'Danish'},
  {id: 'nl', title: 'Dutch'},
  {id: 'et', title: 'Estonian'},
  {id: 'fi', title: 'Finnish'},
  {id: 'de', title: 'German'},
  {id: 'el', title: 'Greek'},
  {id: 'hu', title: 'Hungarian'},
  {id: 'ga', title: 'Irish'},
  {id: 'it', title: 'Italian'},
  {id: 'lv', title: 'Latvian'},
  {id: 'lt', title: 'Lithuanian'},
  {id: 'mt', title: 'Maltese'},
  {id: 'pl', title: 'Polish'},
  {id: 'pt', title: 'Portuguese'},
  {id: 'sk', title: 'Slovak'},
  {id: 'sl', title: 'Slovenian'},
  {id: 'sv', title: 'Swedish'},
]

const i18n = {
  languages,
  base: languages.find((item) => item.isDefault).id,
}

const googleTranslateLanguages = languages.map(({id, title}) => ({id, title}))

// For v2 studio
// module.exports = {i18n, googleTranslateLanguages}

// For v3 studio
export {i18n, googleTranslateLanguages}
