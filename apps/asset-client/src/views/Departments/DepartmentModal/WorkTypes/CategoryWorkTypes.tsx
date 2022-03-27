import { Box } from 'catamaran/core';
import { DepartmentCategory } from 'store/slices/users/departments/types';
import { Typography } from 'catamaran/core/mui';
import { WorkType } from 'store/slices/common/types';
import { selectMainCategoryById } from 'store/slices/session';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { workTypes } from 'store/slices/contracts/data';
import WorkTypeCard from './WorkTypeCard';

type Props = {
  className?: string;
  departmentCategory: DepartmentCategory;
  onWorkTypeClick: (categoryId: string, workType: WorkType) => void;
};

function CategoryWorkTypes(props: Props) {
  const { className, departmentCategory, onWorkTypeClick } = props;

  const { t } = useTranslation();
  const category = useTypedSelector((state) =>
    selectMainCategoryById(state, departmentCategory.mainCategoryId)
  );

  if (!category) {
    return null;
  }

  return (
    <Box className={className}>
      <Box mb={2} ml={2}>
        <Typography variant="subtitle1">
          {t('users.departments.edit.workType.main_category_field')}
          <b>{category.name}</b>
        </Typography>
      </Box>
      <Box flex flexWrap="wrap" mb={2}>
        {workTypes.map((workType) => (
          <Box key={`${departmentCategory.mainCategoryId};${workType}`} mb={2} mr={2}>
            <WorkTypeCard
              categoryId={departmentCategory.mainCategoryId}
              onClick={() => onWorkTypeClick(departmentCategory.mainCategoryId, workType)}
              selected={departmentCategory.workTypes.includes(workType)}
              workType={workType}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CategoryWorkTypes;
