import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import common_en from 'translations/en/common.json'

const options = {
  interpolation: {
    escapeValue: false // not needed for react!!
  },

  debug: true,

  resources: {
    en: {
      common: common_en
    }
  },
  lng: 'en',
  fallbackLng: 'en',

  ns: ['common'],

  defaultNS: 'common'
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init(options)


export default i18n

