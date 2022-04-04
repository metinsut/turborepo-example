import { Box, CatTooltip } from 'catamaran/core';
import { DepartmentCategory } from 'store/slices/users/departments/types';
import { Divider, Typography } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import MainCategoryDisplay from './MainCategoryDisplay';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

type Props = {
  departmentCategories: DepartmentCategory[];
  selected?: boolean;
};

function ExtraMainCategoriesChip(props: Props) {
  const { departmentCategories, selected } = props;
  const { t } = useTranslation();
  const [hover, hoverProps] = useHover();

  const popoverContent = (
    <Box flex flexDirection="column">
      {departmentCategories.map((category, index) => (
        <Box key={category.mainCategoryId}>
          <MainCategoryDisplay departmentCategory={category} />
          {index !== departmentCategories.length - 1 && <Divider style={{ margin: '8px 0' }} />}
        </Box>
      ))}
    </Box>
  );

  const chipClasses =
    'flex align-items-center border-1 border-solid radius-8 w-fit-content h-16 px6 py1';

  const getBG = () => {
    if (selected && hover) {
      return 'bg-white';
    }
    if (hover) {
      return 'bg-darkgrey-o-8';
    }
    return 'bg-none';
  };

  // TODO Typo element is getting color css somewhere, It shouldn't take inline css.
  // Instead of this we have to add class name like border and background.
  const getColor = (isLight: boolean) => (isLight ? '#F3F5F6' : 'rgba(73, 73, 73, 0.8)');

  return (
    <CatTooltip arrow title={popoverContent}>
      <div
        className={clsx(
          chipClasses,
          selected ? 'border-lightgray' : 'border-darkgrey-o-8',
          getBG()
        )}
        {...hoverProps}
      >
        <Typography style={hover ? { color: getColor(!selected) } : {}} variant="caption">
          {`+${departmentCategories.length} ${t('users.departments.department_card.more')}`}
        </Typography>
      </div>
    </CatTooltip>
  );
}

export default ExtraMainCategoriesChip;
