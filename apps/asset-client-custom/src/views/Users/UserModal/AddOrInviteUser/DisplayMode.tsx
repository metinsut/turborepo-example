import { Box, CatButton } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import AddPersonIcon from 'catamaran/icons/AddPerson';
import DisplayHeader from 'components/Sections/DisplayHeader';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  editDisabled?: boolean;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, editDisabled, onEditClick } = props;
  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<AddPersonIcon contained={false} hoverable={false} opacity={0.8} />}
        headerText={t('users.modal.add_or_invite_users.title')}
      />
      <Box alignItems="center" flex ml={3} my={2}>
        <PlusIcon contained={false} hoverable={false} opacity={0.8} />
        <Box width="8px" />
        <Typography variant="caption">
          {t('users.modal.add_or_invite_users.not_added_description')}
        </Typography>
      </Box>
      <CatButton
        color="green"
        disabled={editDisabled}
        endIcon={<PlusIcon />}
        onClick={onEditClick}
        size="small"
        style={{ marginLeft: '24px' }}
      >
        {t('common.add')}
      </CatButton>
    </Box>
  );
}

export default DisplayMode;
