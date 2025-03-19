import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@Assets/locales/en/en.json';

const resources = {
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18n;
