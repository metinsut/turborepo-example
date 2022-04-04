import { Box, CatIconButton, CatTypography } from 'catamaran/core';
import { EmailResult } from 'store/slices/users/details/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  row: {
    alignItems: 'center',
    border: `1px solid ${theme.palette.darkGrey[100]}`,
    borderRadius: theme.spacing(2),
    height: theme.spacing(4.25),
    margin: theme.spacing(1, 0),
    padding: theme.spacing(0, 3)
  }
}));

type Props = {
  className?: string;
  successResults: EmailResult[];
  onClose: () => void;
};

function SuccessDialog(props: Props) {
  const classes = useStyles();
  const { className, successResults, onClose } = props;

  const { t } = useTranslation();
  const resourceKey = 'users.modal.add_or_invite_users.invite_user_section.results.success_dialog';

  return (
    <Box className={clsx(classes.root, className)}>
      <Box flex mb={2}>
        <CheckIcon color="green" contained={false} hoverable={false} />
        <Box ml={3}>
          <CatTypography className="c-main-green" variant="subtitle1">
            <Trans components={{ bold: <b /> }} i18nKey={`${resourceKey}.title`} t={t} />
          </CatTypography>
          <CatTypography className="opacity-6" variant="body1">
            <Trans
              components={{ bold: <b /> }}
              i18nKey={`${resourceKey}.description`}
              t={t}
              values={{ count: successResults.length }}
            />
          </CatTypography>
        </Box>
        <Box flexGrow={1} />
        <CatIconButton onClick={onClose}>
          <CancelIcon color="darkGrey" />
        </CatIconButton>
      </Box>
      <Scrollbars style={{ height: '250px', width: '100%' }}>
        {successResults.map((result) => (
          <Box className={classes.row} flex key={result.email}>
            <CatTypography variant="body1">{result.email}</CatTypography>
            <Box flex flexGrow={1} />
            <CatTypography className="c-main-green" variant="body1">
              <Trans
                components={{ bold: <b /> }}
                i18nKey={`${resourceKey}.invitation_sent`}
                t={t}
              />
            </CatTypography>
            <CheckIcon color="green" contained={false} hoverable={false} opacity={0.6} />
          </Box>
        ))}
      </Scrollbars>
    </Box>
  );
}

export default SuccessDialog;
