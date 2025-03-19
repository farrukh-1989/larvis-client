import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../public/locales/en.json';

const resources = {
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
});

export default i18n;
