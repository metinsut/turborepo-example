import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import StartTypingIcon from 'catamaran/icons/StartTyping';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  helperDropdownText: {
    width: '50%'
  },
  root: { padding: theme.spacing(1) }
}));

type Props = {
  className?: string;
  messageKey: string;
};

function SearchDropdownHelper(props: Props) {
  const classes = useStyles();
  const { className, messageKey } = props;
  const { t } = useTranslation();

  return (
    <Grid
      alignItems="center"
      className={clsx(classes.root, className)}
      container
      direction="row"
      justifyContent="space-between"
    >
      <Grid className={classes.helperDropdownText} item>
        <Typography>
          <Trans components={{ bold: <b /> }} i18nKey={messageKey} t={t} />
        </Typography>
      </Grid>
      <Grid item>
        <StartTypingIcon fontSize="large" />
      </Grid>
    </Grid>
  );
}

export default SearchDropdownHelper;
