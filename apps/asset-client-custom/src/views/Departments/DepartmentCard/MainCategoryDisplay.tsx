import { Box, CatTypography } from 'catamaran/core';
import { DepartmentCategory } from 'store/slices/users/departments/types';
import { Trans, useTranslation } from 'react-i18next';
import { isArrayNullOrEmpty } from 'utils';
import CategoryChip from '../DepartmentModal/Categories/CategoryChip';
import React from 'react';
import WorkTypeIcon from 'views/Contracts/Metrics/DowntimeRules/WorkType/Icon';

type Props = {
  departmentCategory: DepartmentCategory;
  selected?: boolean;
};

function MainCategoryDisplay(props: Props) {
  const { departmentCategory, selected } = props;
  const { t } = useTranslation();

  if (!departmentCategory) {
    return null;
  }

  return (
    <Box flex flexDirection="column">
      <CatTypography variant="body2">
        <Trans
          components={{ bold: <b /> }}
          i18nKey="users.departments.department_card.category_description"
          t={t}
        />
      </CatTypography>
      <Box maxWidth="90%" my="4px">
        <CategoryChip categoryId={departmentCategory.mainCategoryId} reverseColors={selected} />
      </Box>
      {!isArrayNullOrEmpty(departmentCategory.workTypes) && (
        <>
          <CatTypography variant="body2">
            <Trans
              components={{ bold: <b /> }}
              i18nKey="users.departments.department_card.worktype_description"
              t={t}
            />
          </CatTypography>
          <Box flex>
            {departmentCategory.workTypes.map((workType) => (
              <WorkTypeIcon key={workType} style={{ marginRight: '4px' }} workType={workType} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default MainCategoryDisplay;
