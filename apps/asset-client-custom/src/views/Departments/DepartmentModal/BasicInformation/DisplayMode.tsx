import { Box, CatButton } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import TitleIcon from 'catamaran/icons/Title';
import ValidationBadge from 'components/ValidationBadge';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  displayDepartment?: Department;
  onEditClick?: () => void;
  sectionMode: DisplayType;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, displayDepartment, onEditClick, sectionMode } = props;

  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <Box mb={2}>
        <DisplayHeader
          headerIcon={<TitleIcon color="darkGrey" contained={false} hoverable={false} />}
          headerText={t('users.departments.edit.basicInfo.header')}
        />
      </Box>
      <Box ml={2}>
        {sectionMode === 'edit' ? (
          <>
            <Box alignItems="center" flex mb={2}>
              <Typography className="opacity-6" variant="body1">
                {t('users.departments.edit.basicInfo.title_field')}
              </Typography>
              <Box ml={1}>
                <Typography className="break-word opacity-8" variant="subtitle1">
                  {displayDepartment.name}
                </Typography>
              </Box>
              <Box px={2}>|</Box>
              <Typography className="opacity-6" variant="body1">
                {t('users.departments.edit.basicInfo.notes_field')}
              </Typography>
              <Box ml={1}>
                <Typography className="break-word opacity-8" variant="subtitle1">
                  {displayDepartment.notes}
                </Typography>
              </Box>
            </Box>
            <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
              {t('common.edit')}
            </CatButton>
          </>
        ) : (
          <>
            <Box alignItems="center" flex mb={2}>
              <ValidationBadge isValid={false} />
              <Box ml={1}>
                <Typography style={{ color: theme.palette.red[700] }} variant="caption">
                  {t('common.required')}
                </Typography>
              </Box>
              <Box px={1} style={{ color: theme.palette.red[700] }}>
                |
              </Box>
              <Box>
                <Typography style={{ color: theme.palette.red[400] }} variant="caption">
                  {t('users.departments.edit.basicInfo.no_title_yet')}
                </Typography>
              </Box>
            </Box>
            <CatButton color="green" endIcon={<PlusIcon />} onClick={onEditClick} size="small">
              {t('users.departments.edit.basicInfo.add_title')}
            </CatButton>
          </>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
