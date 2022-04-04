import { Box, CatTypography } from 'catamaran/core';
import { DepartmentCategory } from 'store/slices/users/departments/types';
import { isArrayNullOrEmpty } from 'utils';
import { useTranslation } from 'react-i18next';
import CategoryChip from '../Categories/CategoryChip';
import React from 'react';
import WorkTypeIcon from 'views/Contracts/Metrics/DowntimeRules/WorkType/Icon';

type Props = {
  departmentCategory: DepartmentCategory;
};

function DisplayCategoryWorkTypeRow(props: Props) {
  const { departmentCategory } = props;

  const { t } = useTranslation();

  return (
    <Box alignItems="center" flex flexDirection="row">
      <CategoryChip categoryId={departmentCategory.mainCategoryId} />
      {isArrayNullOrEmpty(departmentCategory.workTypes) ? (
        <Box ml={2}>
          <CatTypography variant="caption">
            {t('users.departments.edit.workType.no_work_types')}
          </CatTypography>
        </Box>
      ) : (
        <>
          {departmentCategory.workTypes.map((workType) => (
            <Box key={workType} ml={1}>
              <WorkTypeIcon workType={workType} />
            </Box>
          ))}
          <Box ml={1}>
            <CatTypography variant="caption">
              {t('users.departments.edit.workType.work_type_count', {
                count: departmentCategory.workTypes.length
              })}
            </CatTypography>
          </Box>
        </>
      )}
    </Box>
  );
}

export default DisplayCategoryWorkTypeRow;
