import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ca: {
    translation: {
      //Authentication
      sign_in: 'Iniciar Sesió',
      password: 'Contrasenya',
      email: 'Correo electrónico',
      next: 'Siguiente',
      user_name: `Nom de l' usuari`
    },
  },
  en: {
    translation: {
      sign_in: 'Sign in',
      password: 'Password',
      email: 'Email',
      next: 'Next',
      user_name: 'User name'
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ca',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;