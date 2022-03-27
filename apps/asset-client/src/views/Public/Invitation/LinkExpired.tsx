import { Typography } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import Error from 'catamaran/icons/Error';
import React from 'react';
import classes from './Invitation.module.scss';

const LinkExpired = () => {
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Error fontSize="large" />
        <p className="text-xLarge opacity-8 c-main-red">{t('session.link_disabled')}</p>
      </div>
      <Typography className="opacity-6" variant="body1">
        {t('session.link_disabled_warning')}
      </Typography>
    </div>
  );
};

export default LinkExpired;
