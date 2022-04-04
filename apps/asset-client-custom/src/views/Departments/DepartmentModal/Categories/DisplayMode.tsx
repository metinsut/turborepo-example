import { Box, CatButton, CatTypography } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import Category2Icon from 'catamaran/icons/Category2';
import CategoryChip from './CategoryChip';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  displayDepartment?: Department;
  onEditClick?: () => void;
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, displayDepartment, onEditClick } = props;

  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)}>
      <Box mb={2}>
        <DisplayHeader
          headerIcon={<Category2Icon color="darkGrey" contained={false} hoverable={false} />}
          headerText={t('users.departments.edit.category.header')}
        />
      </Box>
      <Box ml={2}>
        <Box alignItems="center" flex flexWrap="wrap" mb={2}>
          {displayDepartment.mainCategories.map((dc) => (
            <Box key={dc.mainCategoryId} mb={1} mr={1}>
              <CategoryChip categoryId={dc.mainCategoryId} />
            </Box>
          ))}
          <Box mb={1}>
            <CatTypography variant="caption">
              {t('users.departments.edit.category.category_count', {
                count: displayDepartment.mainCategories.length
              })}
            </CatTypography>
          </Box>
        </Box>
        <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
          {t('common.edit')}
        </CatButton>
      </Box>
    </Box>
  );
}

export default DisplayMode;
