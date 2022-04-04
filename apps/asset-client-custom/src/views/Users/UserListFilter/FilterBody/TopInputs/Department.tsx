import { CatCheckbox, CatMenuItem, CatSelect } from 'catamaran/core';
import { ListItemText } from 'catamaran/core/mui';
import { selectDepartmentIds } from 'store/slices/users/filter/selectors';
import { updateDepartmentIds } from 'store/slices/users/filter/slice';
import { useGetAllDepartments } from 'hooks/useGetAllDepartments';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';

const Department = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const { departments } = useGetAllDepartments();
  const selectedDepartmentIds = useTypedSelector(selectDepartmentIds);

  const handleDepartmentChange = (event: any) => {
    const selectedDepartmentIds = event.target.value;
    dispatch(updateDepartmentIds(selectedDepartmentIds));
  };

  const getRenderValue = (value: string[]) => {
    if (value.length === 1) {
      const departmentName = departments.find((department) => department.id === value[0]).name;
      return departmentName;
    }
    return t('common.item_selected', { count: value.length });
  };

  const clearAllDepartments = () => {
    dispatch(updateDepartmentIds([]));
  };

  const anyDepartmentSelected = selectedDepartmentIds.length !== 0;

  return (
    departments.length > 0 && (
      <CatSelect
        clearActive={anyDepartmentSelected}
        fullWidth
        label={t('users.filter.department')}
        menuOverflow={false}
        multiple
        onChange={handleDepartmentChange}
        onClear={clearAllDepartments}
        renderValue={(value) => getRenderValue(value as string[])}
        value={selectedDepartmentIds}
      >
        <CatMenuItem disabled key="" value="">
          {t('common.dropdown_generic_hint')}
        </CatMenuItem>
        {departments.map(({ name, id }) => (
          <CatMenuItem key={id} value={id}>
            <CatCheckbox checked={selectedDepartmentIds.includes(id)} className="mr12" />
            <ListItemText primary={name} />
          </CatMenuItem>
        ))}
      </CatSelect>
    )
  );
};

export default Department;
