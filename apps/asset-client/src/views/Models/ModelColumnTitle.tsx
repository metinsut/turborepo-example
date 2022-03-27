import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxHeight: 48,
    minHeight: 48
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
}));

type Props = {
  disabled?: boolean;
  brandName?: string;
};

function ModelColumnTitle(props: Props) {
  const classes = useStyles();
  const { disabled, brandName } = props;
  const { t } = useTranslation();

  return (
    <Grid
      alignContent="stretch"
      alignItems="center"
      className={classes.root}
      container
      direction="column"
      justifyContent="center"
    >
      {!disabled ? (
        <>
          <Typography
            align="center"
            component="div"
            style={{
              maxWidth: '100%',
              overflow: 'hidden'
            }}
            variant="body1"
          >
            <Trans
              components={{ bold: <p className={classes.title} /> }}
              i18nKey="models.model_group_title"
              t={t}
              values={{ brandName }}
            />
          </Typography>
        </>
      ) : (
        <Typography component="p" variant="body1">
          Model
        </Typography>
      )}
    </Grid>
  );
}

export default ModelColumnTitle;
