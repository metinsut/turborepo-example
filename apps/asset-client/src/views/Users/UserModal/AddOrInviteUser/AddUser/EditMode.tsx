import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import PersonalInformationContent from '../../PersonalInformation/EditMode/PersonalInformationContent';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: '1px solid rgba(73, 73, 73, 0.2)',
    borderRadius: theme.spacing(3),
    boxSizing: 'border-box',
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  mode?: DisplayType;
  onConfirm?: () => Promise<void>;
  onCancel?: () => Promise<void>;
  onValuesChanged?: (changed: boolean) => void;
  userCount?: number;
};

function EditMode(props: Props) {
  const classes = useStyles();
  const { className, mode, onConfirm, onCancel, onValuesChanged, userCount } = props;

  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <Box mb={3}>
        <Typography style={{ opacity: '80%' }} variant="h2">
          <Trans
            components={{ bold: <b /> }}
            i18nKey="users.modal.add_user.title"
            t={t}
            values={{ count: userCount + 1 }}
          />
        </Typography>
      </Box>
      <PersonalInformationContent
        mode={mode}
        onCancel={onCancel}
        onConfirm={onConfirm}
        onValuesChanged={onValuesChanged}
      />
    </Box>
  );
}

export default EditMode;
