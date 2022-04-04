import { Box } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import DisplayHeader from 'components/Sections/DisplayHeader';
import GeneralAdminIcon from 'catamaran/icons/GeneralAdmin';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '75%'
  }
}));

type Props = {
  className?: string;
  mode: DisplayType;
};

function GeneralAdminSection(props: Props) {
  const classes = useStyles();
  const { className, mode } = props;

  const { t } = useTranslation();
  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<GeneralAdminIcon />}
        headerText={
          <Trans components={{ bold: <b /> }} i18nKey="users.modal.general_admin" t={t} />
        }
      />
      <Box ml={5} mt={2}>
        <Trans
          components={{ bold: <b /> }}
          i18nKey={
            mode === 'add'
              ? 'users.general_admin.modal_description_add'
              : 'users.general_admin.modal_description_edit'
          }
          t={t}
        />
      </Box>
    </Box>
  );
}

export default GeneralAdminSection;
