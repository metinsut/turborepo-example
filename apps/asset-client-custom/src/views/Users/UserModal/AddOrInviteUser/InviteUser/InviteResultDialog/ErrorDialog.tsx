import { Box, CatIconButton } from 'catamaran/core';
import { EmailResult } from 'store/slices/users/details/types';
import { Theme, Tooltip, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import DownloadIcon from 'catamaran/icons/Download';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  row: {
    alignItems: 'center',
    border: `1px solid ${theme.palette.darkGrey[100]}`,
    borderRadius: theme.spacing(1),
    height: theme.spacing(4.25),
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 3)
  }
}));

type Props = {
  className?: string;
  errorResults: EmailResult[];
  onClose: () => void;
};

function ErrorDialog(props: Props) {
  const classes = useStyles();
  const { className, errorResults, onClose } = props;

  const { t } = useTranslation();
  const resourceKey = 'users.modal.add_or_invite_users.invite_user_section.results.error_dialog';

  return (
    <Box className={clsx(classes.root, className)}>
      <Box alignItems="center" flex mb={2}>
        <CancelIcon color="red" contained={false} hoverable={false} />
        <Box ml={3}>
          <Typography className="c-main-red" variant="subtitle1">
            <Trans components={{ bold: <b /> }} i18nKey={`${resourceKey}.title`} t={t} />
          </Typography>
          <Typography className="opacity-6" variant="body1">
            <Trans
              components={{ bold: <b /> }}
              i18nKey={`${resourceKey}.description`}
              t={t}
              values={{ count: errorResults.length }}
            />
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Typography
          style={{
            textAlign: 'right',
            width: '120px'
          }}
          variant="caption"
        >
          <Trans components={{ bold: <b /> }} i18nKey={`${resourceKey}.download_desc`} t={t} />
        </Typography>
        <Box width="8px" />
        <DownloadIcon color="darkGrey" hoverable={false} />
        <Box className="divider-vertical" />
        <CatIconButton onClick={onClose}>
          <CancelIcon color="darkGrey" />
        </CatIconButton>
      </Box>
      <Scrollbars style={{ height: '250px', width: '100%' }}>
        {errorResults.map((result) => (
          <Box flex key={result.email}>
            <Box className={classes.row} flex maxWidth="240px" width="40%">
              <Tooltip title={result.email}>
                <Typography noWrap variant="body1">
                  {result.email}
                </Typography>
              </Tooltip>
            </Box>
            <Box width="8px" />
            <Box className={classes.row} flex width="60%">
              <Tooltip title={result.message}>
                <Typography className="c-main-red" noWrap variant="body1">
                  {result.message}
                </Typography>
              </Tooltip>
              <CancelIcon color="red" contained={false} hoverable={false} opacity={0.6} />
            </Box>
          </Box>
        ))}
      </Scrollbars>
    </Box>
  );
}

export default ErrorDialog;
