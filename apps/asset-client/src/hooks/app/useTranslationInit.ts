import { useEffect } from 'react';
import { useTranslation } from 'react-i18next/';
import axios from 'utils/axiosUtils';

const useTranslationInit = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    axios.defaults.headers.common['Accept-Language'] = i18n.language;
  }, [i18n.language]);
};

export default useTranslationInit;
