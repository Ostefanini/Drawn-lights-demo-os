import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocizeBackend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';

void i18n
    .use(LocizeBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            projectId: 'd4b20cc3-2dfc-4ea8-967b-e02a4810a14d',
            apiKey: 'lz_api_cDMr0aBCBMDuHFr0u7pakciz9PfKnrb0',
            referenceLng: 'fr-FR',
            version: 'latest',
            cacheInterval: 60 * 60 * 1000, // Cache 1 heure
        },
        fallbackLng: 'en-US',
        supportedLngs: ['en-US', 'fr-FR'],
        ns: ['translation'],
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: [], // Désactiver le cache en dev pour forcer Locize
            lookupLocalStorage: 'i18nextLng',
        },
        debug: false,
        load: 'all',
    });

export default i18n;
