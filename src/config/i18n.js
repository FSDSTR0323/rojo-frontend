import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {carouselContentEn, carouselContentCa, valuePropositionContentEn, valuePropositionContentCa} from '../config/homePageContent'

const resources = {
  ca: {
    translation: {
      //Authentication
      sign_in: 'Iniciar Sessió',
      password: 'Contrasenya',
      email: 'Correu electrónic',
      next: 'Seguent',
      user_name: `Nom de l' usuari`,
      user_details: `Detalls de l' usuari`,
      carouselContent: carouselContentCa,
      valuePropositionContent: valuePropositionContentCa
    },
  },

  en: {
    translation: {
      sign_in: 'Sign in',
      password: 'Password',
      email: 'Email',
      next: 'Next',
      user_name: 'User name',
      user_details: 'User details',
      carouselContent: carouselContentEn,
      valuePropositionContent: valuePropositionContentEn
    },
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'ca',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;