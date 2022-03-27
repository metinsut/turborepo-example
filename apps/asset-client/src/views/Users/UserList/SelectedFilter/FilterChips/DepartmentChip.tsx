import { CatChip, CatTypography } from 'catamaran/core';
import { removeDepartment } from 'store/slices/users/filter/slice';
import { selectDepartmentById } from 'store/slices/users/departments/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

interface ChipProps {
  item?: string;
}

const ChipLabel = ({ item }: ChipProps) => {
  const department = useTypedSelector((state) => selectDepartmentById(state, item));
  return <span>{department.name}</span>;
};
const DepartmentChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const removeDepartmentFromFilter = (branch: string) => {
    dispatch(removeDepartment(branch));
  };
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('users.filter.department')}:
      </CatTypography>
      {values.map((item: string) => (
        <CatChip
          key={item}
          label={<ChipLabel item={item} />}
          onDelete={() => removeDepartmentFromFilter(item)}
        />
      ))}
    </div>
  );
};

export default DepartmentChip;
