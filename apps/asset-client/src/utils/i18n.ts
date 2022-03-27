import { initReactI18next } from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(ChainedBackend)
  .init({
    backend: {
      backends: [
        HttpBackend,
        resourcesToBackend((language, filename, callback) =>
          import(`../translations/${language}/${filename}.json`)
            .then((resources) => callback(null, resources))
            .catch((error) => callback(error, null))
        )
      ]
    },
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: false,
    interpolation: {
      escapeValue: false
    },
    nonExplicitSupportedLngs: true,
    supportedLngs: ['en', 'tr']
  });

export default i18next;
