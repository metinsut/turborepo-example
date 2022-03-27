/* eslint-disable no-undef */
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const { NODE_ENV, REACT_APP_GA_MEASUREMENT_ID: GA_MEASUREMENT_ID } =
  process.env;

type Props = {
  title: string;
  children: React.ReactNode;
};

function Page(props: Props) {
  const location = useLocation();
  const { title, children } = props;

  useEffect(() => {
    if (NODE_ENV !== 'production') {
      return;
    }

    if ((window as any).gtag) {
      (window as any).gtag('config', GA_MEASUREMENT_ID, {
        page_name: title,
        page_path: location.pathname
      });
    }

    // eslint-disable-next-line
  }, []);

  const { i18n } = useTranslation();

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}

export default Page;
