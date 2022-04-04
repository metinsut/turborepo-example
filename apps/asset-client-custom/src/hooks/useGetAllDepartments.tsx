import { getDepartments } from 'store/slices/users/departments/actions';
import { selectAllDepartments } from 'store/slices/users/departments/selectors';
import { useEffect } from 'react';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';

const useGetAllDepartments = () => {
  const dispatch = useTypedDispatch();
  const departments = useTypedSelector(selectAllDepartments);
  useEffect(() => {
    if (departments.length === 0) {
      dispatch(getDepartments());
    }
  }, [dispatch, departments]);
  return { departments };
};

export { useGetAllDepartments };
