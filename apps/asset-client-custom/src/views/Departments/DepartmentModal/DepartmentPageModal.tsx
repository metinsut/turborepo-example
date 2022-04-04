import { CatDialog, CatDialogContent } from 'catamaran/core';
import { DisplayType } from 'utils';
import { SectionType, decideNextSection } from './helpers';
import { clearInitialDepartmentForm } from 'store/slices/users/departments/slice';
import {
  createDepartment,
  deleteDepartment,
  initializeDepartmentModal,
  updateDepartment,
  validateDepartment
} from 'store/slices/users/departments/actions';
import { dequal } from 'dequal';
import {
  selectDepartment,
  selectInitialDepartment
} from 'store/slices/users/departments/selectors';
import { useEffect, useMemo, useState } from 'react';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BasicInformation from './BasicInformation/BasicInformation';
import Categories from './Categories/Categories';
import DepartmentPageHeader from './DepartmentPageHeader';
import WorkTypes from './WorkTypes/WorkTypes';

type Props = {
  id?: string;
  onClose?: () => void;
  onConfirm?: () => Promise<void>;
  open: boolean;
};

function DepartmentPageModal(props: Props) {
  const { id, onClose, open, onConfirm } = props;

  const dispatch = useTypedDispatch();
  const department = useTypedSelector(selectDepartment);
  const initialDepartment = useTypedSelector(selectInitialDepartment);
  const [activeSection, setActiveSection] = useState<SectionType>(id ? '' : 'category');
  const mode: DisplayType = id ? 'edit' : 'add';

  const isEditing = activeSection !== '';
  const isValid = useMemo(() => validateDepartment(department), [department]);

  const [isDepartmentChanged, setIsDepartmentChanged] = useState<boolean>(false);

  useEffect(() => {
    if (mode === 'edit') {
      dispatch(initializeDepartmentModal(id));
    }
  }, [dispatch, id, mode]);

  useEffect(
    () => () => {
      dispatch(clearInitialDepartmentForm());
    },
    [dispatch]
  );

  const handleConfirm = async () => {
    if (mode === 'edit') {
      await dispatch(updateDepartment());
    } else {
      await dispatch(createDepartment());
    }
    await onConfirm();
  };

  const handleDelete = async () => {
    await dispatch(deleteDepartment(id));
    await onClose();
  };

  const handleDepartmentChanged = () => {
    setIsDepartmentChanged(true);
  };

  const touched = !dequal(initialDepartment, department);

  const getSectionProps = (sectionType: SectionType) => ({
    disabled: activeSection !== sectionType && activeSection !== '',
    isActive: activeSection === sectionType,
    mode,
    onActivate: async (active: boolean, cancel: boolean, close: boolean = false) => {
      const nextSection = decideNextSection(
        activeSection,
        sectionType,
        active,
        cancel,
        close,
        mode,
        onClose
      );
      if (nextSection !== undefined) {
        setActiveSection(nextSection);
      }
    },
    onDepartmentChanged: handleDepartmentChanged,
    touched
  });

  return (
    <CatDialog fullWidth onAction={handleConfirm} onClose={onClose} open={open} size="large">
      <DepartmentPageHeader
        cancelDisabled={isEditing}
        closeDisabled={isEditing}
        confirmDisabled={isEditing || !isValid}
        deleteDisabled={isEditing}
        isDepartmentChanged={isDepartmentChanged}
        mode={mode}
        onClose={onClose}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
      />
      <CatDialogContent>
        <Categories
          department={department}
          initialDepartment={initialDepartment}
          {...getSectionProps('category')}
        />
        <div className="divider-horizontal my16" />
        <WorkTypes
          department={department}
          initialDepartment={initialDepartment}
          {...getSectionProps('workType')}
        />
        <div className="divider-horizontal my16" />
        <BasicInformation
          department={department}
          initialDepartment={initialDepartment}
          {...getSectionProps('basicInfo')}
        />
      </CatDialogContent>
    </CatDialog>
  );
}

export default withDialogWrapper(DepartmentPageModal);
