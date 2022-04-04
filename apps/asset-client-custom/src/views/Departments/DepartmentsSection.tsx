import { getDepartments } from 'store/slices/users/departments/actions';
import { selectAllDepartments } from 'store/slices/users/departments/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DepartmentList from './DepartmentList';
import React, { useEffect } from 'react';
import useLoading from 'hooks/useLoading';

function DepartmentsSection() {
  const [departmentsLoading, departmentsLoadingDispatch] = useLoading();

  const departments = useTypedSelector(selectAllDepartments);

  useEffect(() => {
    departmentsLoadingDispatch(getDepartments());
  }, [departmentsLoadingDispatch]);

  return (
    <>
      <DepartmentList departments={departments} loading={departmentsLoading} />
    </>
  );
}

export default DepartmentsSection;
