import React from 'react';
import '../../config/i18n';
import { useTranslation } from 'react-i18next';
import './langSelect.css';
import english from '../../assets/Flags/en.svg';
import catalan from '../../assets/Flags/ca.svg';

const LangSelect = () => {
  const { t, i18n } = useTranslation();

  return (
    <div id="flags">
      <label
        htmlFor="idLangEnglish"
        style={{ opacity: i18n.language === 'en' ? '0.3' : '1' }}
      >
        <input
          type="radio"
          name="lang"
          id="idLangEnglish"
          onClick={() => i18n.changeLanguage('en')}
          disabled={i18n.language === 'en'}
        />
        <img src={english} alt="uk flag" />
      </label>
      <label
        htmlFor="idLangCatalan"
        style={{ opacity: i18n.language === 'ca' ? '0.3' : '1' }}
      >
        <input
          type="radio"
          name="lang"
          id="idLangCatalan"
          onClick={() => i18n.changeLanguage('ca')}
          disabled={i18n.language === 'ca'}
        />
        <img src={catalan} alt="catalan flag" />
      </label>
    </div>
  );
};

export default LangSelect;
