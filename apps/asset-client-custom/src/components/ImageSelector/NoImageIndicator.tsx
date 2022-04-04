import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  onClick?: () => void;
};

function NoImageIndicator(props: Props) {
  const classes = useStyles();
  const { className, onClick } = props;
  const { t } = useTranslation();

  return (
    <div onClick={onClick}>
      <Grid
        alignItems="center"
        className={clsx(classes.root, className)}
        container
        direction="column"
        justifyContent="center"
      >
        <CameraAltIcon color="primary" fontSize="large" />
        <Typography>{t('models.no_photo')}</Typography>
      </Grid>
    </div>
  );
}

export default NoImageIndicator;
