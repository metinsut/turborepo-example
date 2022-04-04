import { Box, CatButton, CatTypography } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { useTranslation } from 'react-i18next';
import AssetManIcon from 'catamaran/icons/AssetMan';
import DisplayCategoryWorkTypeRow from './DisplayCategoryWorkTypeRow';
import DisplayHeader from 'components/Sections/DisplayHeader';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';

type Props = {
  displayDepartment: Department;
  onEditClick: () => void;
  sectionMode: DisplayType;
};

function DisplayMode(props: Props) {
  const { displayDepartment, onEditClick, sectionMode } = props;

  const { t } = useTranslation();

  return (
    <Box>
      <Box mb={2}>
        <DisplayHeader
          headerIcon={<AssetManIcon color="darkGrey" contained={false} hoverable={false} />}
          headerText={t('users.departments.edit.workType.header')}
        />
      </Box>
      <Box ml={2}>
        {sectionMode === 'edit' ? (
          <>
            <Box flex flexDirection="column" mb={2}>
              {displayDepartment.mainCategories.map((dc) => (
                <Box key={dc.mainCategoryId} mb={1}>
                  <DisplayCategoryWorkTypeRow departmentCategory={dc} />
                </Box>
              ))}
            </Box>
            <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
              {t('common.edit')}
            </CatButton>
          </>
        ) : (
          <>
            <Box alignItems="center" flex mb={2}>
              <Box>
                <CatTypography variant="caption">
                  {t('users.departments.edit.workType.no_work_types_yet')}
                </CatTypography>
              </Box>
            </Box>
            <CatButton color="green" endIcon={<PlusIcon />} onClick={onEditClick} size="small">
              {t('users.departments.edit.workType.add_work_types')}
            </CatButton>
          </>
        )}
      </Box>
    </Box>
  );
}

export default DisplayMode;
