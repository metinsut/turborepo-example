import { Box, CatButton, CatTypography } from 'catamaran/core';
import { Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { selectInitialUser } from 'store/slices/users/details/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  editVisible?: boolean;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, editVisible = true, onEditClick } = props;

  const { t } = useTranslation();
  const user = useTypedSelector(selectInitialUser);

  return (
    <Box className={clsx(classes.root, className)}>
      <DisplayHeader
        headerIcon={<PersonIcon contained={false} hoverable={false} opacity={0.8} />}
        headerText={t('users.modal.personal_information.title')}
      />
      <Box ml={5}>
        <Divider style={{ margin: '16px 0px', width: '120px' }} />
        <Box alignItems="center" display="flex" mb={2}>
          <CatTypography className="opacity-6" variant="body1">
            {t('users.modal.personal_information.first_name_field')}
          </CatTypography>
          <CatTypography className="opacity-8 ml8" variant="subtitle1">
            {user.firstName}
          </CatTypography>
          <Box px={2}>|</Box>
          <CatTypography className="opacity-6" variant="body1">
            {t('users.modal.personal_information.last_name_field')}
          </CatTypography>
          <CatTypography className="opacity-8 ml8" variant="subtitle1">
            {user.lastName}
          </CatTypography>
          <Box px={2}>|</Box>
          <Box flex style={{ maxWidth: '33%' }}>
            <CatTypography className="opacity-6" variant="body1">
              {t('users.modal.personal_information.job_title_field')}
            </CatTypography>
            <CatTypography className="opacity-8 ml8 three-dot" variant="subtitle1">
              {user.jobTitle}
            </CatTypography>
          </Box>
        </Box>
        <Divider style={{ margin: '16px 0px', width: '120px' }} />
        <Box alignItems="center" display="flex" mb={2}>
          <CatTypography className="opacity-6" variant="body1">
            {t('users.modal.personal_information.email_field')}
          </CatTypography>
          <Box ml={1}>
            <CatTypography className="opacity-8" variant="subtitle1">
              {user.email}
            </CatTypography>
          </Box>
          <Box px={2}>|</Box>
          <CatTypography className="opacity-6" variant="body1">
            {t('users.modal.personal_information.phone_number_field')}
          </CatTypography>
          <Box ml={1}>
            <CatTypography className="opacity-8" variant="subtitle1">
              {user.phoneNumber}
            </CatTypography>
          </Box>
        </Box>
        {editVisible && (
          <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
            {t('common.edit')}
          </CatButton>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
