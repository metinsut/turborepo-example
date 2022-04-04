import {
  Box,
  CatButton,
  CatMultiActionResultButton,
  CatResultAction,
  CatTypography
} from 'catamaran/core';
import { Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { InviteDialogType } from '../types';
import { InviteUserResponse } from 'store/slices/users/details/types';
import { Trans, useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import DownloadIcon from 'catamaran/icons/Download';
import ExpandIcon from 'catamaran/icons/Expand';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    color: theme.palette.red.main,
    fontWeight: 700
  },
  root: {}
}));

type Props = {
  className?: string;
  inviteResults: InviteUserResponse;
  onClose: () => void;
  onChangeDialog: (dialogType: InviteDialogType) => void;
};

function GeneralDialog(props: Props) {
  const classes = useStyles();
  const { className, inviteResults, onClose, onChangeDialog } = props;

  const { t } = useTranslation();
  const successCount = inviteResults?.successUsers?.length;
  const errorCount = inviteResults?.errorUsers?.length;
  const resultDialogKey =
    'users.modal.add_or_invite_users.invite_user_section.results.general_dialog';

  return (
    <Box className={clsx(classes.root, className)}>
      <Box alignItems="center" flex>
        <PersonIcon color="darkGrey" contained={false} hoverable={false} opacity={0.8} />
        <Box width="8px" />
        <CatTypography variant="h2">{t(`${resultDialogKey}.title`)}</CatTypography>
      </Box>
      <Divider style={{ margin: '16px 0' }} />
      {!!successCount && (
        <CatTypography variant="body1">
          {t(`${resultDialogKey}.success_desc`, { count: successCount })}
        </CatTypography>
      )}
      {!!errorCount && (
        <CatTypography className={classes.errorText} variant="body1">
          <Trans
            components={{ bold: <b /> }}
            i18nKey={`${resultDialogKey}.error_desc`}
            t={t}
            values={{ count: errorCount }}
          />
        </CatTypography>
      )}
      <Box height="16px" />
      <CatMultiActionResultButton
        color="green"
        description={
          <Trans
            components={{ bold: <b /> }}
            i18nKey={`${resultDialogKey}.button_desc`}
            t={t}
            values={{ count: successCount }}
          />
        }
        onClick={() => onChangeDialog('success')}
        primaryAction={
          <CatResultAction>
            <ExpandIcon />
          </CatResultAction>
        }
        startIcon={<CheckIcon />}
        title={t(`${resultDialogKey}.success_btn_title`)}
      />
      <Box height="16px" />
      <CatMultiActionResultButton
        color="red"
        description={
          <Trans
            components={{ bold: <b /> }}
            i18nKey={`${resultDialogKey}.button_desc`}
            t={t}
            values={{ count: errorCount }}
          />
        }
        onClick={() => onChangeDialog('error')}
        primaryAction={
          <CatResultAction>
            <ExpandIcon />
          </CatResultAction>
        }
        secondaryActions={[
          <CatResultAction key={0}>
            <DownloadIcon />
          </CatResultAction>
        ]}
        startIcon={<CancelIcon />}
        title={
          <Trans
            components={{ bold: <b /> }}
            i18nKey={`${resultDialogKey}.error_btn_title`}
            t={t}
          />
        }
      />
      <Box center flex mt={4}>
        <CatButton color="green" endIcon={<CheckIcon />} onClick={onClose} size="large">
          {t('common.confirm')}
        </CatButton>
      </Box>
    </Box>
  );
}

export default GeneralDialog;
