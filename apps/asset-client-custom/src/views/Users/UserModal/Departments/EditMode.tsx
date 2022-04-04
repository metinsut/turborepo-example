import { Box, CatAreaButton, CatKeyboardButton, CatKeyboardSection } from 'catamaran/core';
import { ConfirmButton, GoBackButton, SaveButton } from 'catamaran/core/Button';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType, isArrayNullOrEmpty } from 'utils';
import { Trans, useTranslation } from 'react-i18next';
import { selectAllDepartments } from 'store/slices/users/departments/selectors';
import { selectDraftUserDepartments } from 'store/slices/users/details/selectors';
import { toggleSelectedDepartment } from 'store/slices/users/details/slice';
import { useDialogState, useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DepartmentCard from 'views/Departments/DepartmentCard/DepartmentCard';
import DepartmentCardSkeleton from 'views/Departments/DepartmentCard/DepartmentCardSkeleton';
import DepartmentPageModal from 'views/Departments/DepartmentModal/DepartmentPageModal';
import EditHeader from 'components/Sections/EditHeader';
import HomeIcon from 'catamaran/icons/Home';

type Props = {
  loading?: boolean;
  mode?: DisplayType;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
};

function EditMode(props: Props) {
  const { loading, mode, onCancel, onGoBack, onConfirm, onNext } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { isOpen, togglePopup } = useDialogState();

  const departments = useTypedSelector(selectAllDepartments);
  const selectedDepartments = useTypedSelector(selectDraftUserDepartments);

  const handleDepartmentClick = (department: Department) => {
    dispatch(toggleSelectedDepartment(department.id));
  };

  const handleCancel = () => {
    onCancel();
    onGoBack();
  };

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box>
        <EditHeader
          descriptionText={t('users.modal.departments.description')}
          headerIcon={<HomeIcon contained={false} hoverable={false} opacity={0.8} />}
          headerText={
            <Trans components={{ bold: <b /> }} i18nKey="users.modal.departments.title" t={t} />
          }
        />
        <Box flex flexWrap="wrap" mt={2}>
          {loading && isArrayNullOrEmpty(departments) ? (
            <>
              <DepartmentCardSkeleton className="mb16 mr16" />
              <DepartmentCardSkeleton className="mb16 mr16" />
            </>
          ) : (
            <>
              {departments.map((department) => (
                <Box key={department.id} mb={2} mr={2}>
                  <DepartmentCard
                    departmentId={department.id}
                    editable={false}
                    key={department.id}
                    onClick={() => handleDepartmentClick(department)}
                    selected={selectedDepartments.includes(department.id)}
                  />
                </Box>
              ))}
              <Box mb={2} mr={2}>
                <CatAreaButton
                  onClick={() => togglePopup(true)}
                  style={{ height: 272, width: 196 }}
                >
                  {t('users.departments.department_add')}
                </CatAreaButton>
              </Box>
            </>
          )}
        </Box>
        <Box alignItems="center" flex>
          <CatKeyboardButton component={GoBackButton} keyboardKey="escape" />
          <Box className="divider-vertical mx16" />
          <CatKeyboardButton
            component={mode === 'add' ? SaveButton : ConfirmButton}
            disabled={selectedDepartments.length === 0}
            keyboardKey="enter"
          />
        </Box>
        <DepartmentPageModal
          onClose={() => togglePopup()}
          onConfirm={async () => togglePopup()}
          open={isOpen}
        />
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
