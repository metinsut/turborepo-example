import { initReactI18next } from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

import translationEN from '../translations/en/translation.json';
import translationTR from '../translations/tr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

let options: any = {};

switch (process.env.NODE_ENV) {
  case 'test':
    options = {
      whitelist: ['en', 'tr'],
      fallbackLng: 'en',
      resources,
      ns: 'translation',
      defaultNS: 'translation'
    };
    break;
  case 'production':
    options = {
      whitelist: ['en', 'tr'],
      fallbackLng: {
        en: ['en'],
        tr: ['tr'],
        default: ['en']
      },
      ns: ['button', 'common', 'lng', 'info'],
      defaultNS: 'common',
      backend: {
        loadPath: './json/locales/{{lng}}/{{ns}}.json'
      },
      detection: {
        order: ['querystring', 'cookie', 'navigator', 'localStorage']
      },
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie'],
      react: {
        wait: true
      }
    };
    break;
  case 'development':
    options = {
      whitelist: ['en', 'tr'],
      fallbackLng: {
        en: ['en'],
        tr: ['tr'],
        default: ['en']
      },
      ns: ['button', 'common', 'lng', 'info'],
      defaultNS: 'common',
      backend: {
        loadPath: './src/translations/{{lng}}/{{ns}}.json'
      },
      detection: {
        order: ['querystring', 'cookie', 'navigator', 'localStorage']
      },
      lookupQuerystring: 'lng',
      caches: ['localStorage', 'cookie'],
      react: {
        wait: true
      }
    };
    break;
}

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(ChainedBackend)
  .init(options);
// .init({
//   resources,
//   fallbackLng: 'en', // use en if detected lng is not available

//   keySeparator: false, // we do not use keys in form messages.welcome

//   interpolation: {
//     escapeValue: false // react already safes from xss
//   }
// });
// .init({
//   backend: {
//     backends: [
//       HttpBackend,
//       resourcesToBackend((language, filename, callback) =>
//         import(`../translations/${language}/${filename}.json`)
//           .then((resources) => callback(null, resources))
//           .catch((error) => callback(error, null))
//       )
//     ]
//   },
//   debug: process.env.NODE_ENV === 'development',
//   fallbackLng: false,
//   interpolation: {
//     escapeValue: false
//   },
//   nonExplicitSupportedLngs: true,
//   supportedLngs: ['en', 'tr']
// });

export default i18next;
