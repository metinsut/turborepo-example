import { Box, CatKeyboardSection } from 'catamaran/core';
import { Department } from 'store/slices/users/departments/types';
import { DisplayType } from 'utils';
import { WorkType } from 'store/slices/common/types';
import { checkDepartmentWorkType } from 'store/slices/users/departments/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import AssetManIcon from 'catamaran/icons/AssetMan';
import CategoryWorkTypes from './CategoryWorkTypes';
import EditHeader from 'components/Sections/EditHeader';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import React from 'react';

type Props = {
  department?: Department;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
  sectionMode: DisplayType;
  touched: boolean;
};

function EditMode(props: Props) {
  const { department, onCancel, onGoBack, onConfirm, onNext, sectionMode, touched } = props;

  const dispatch = useTypedDispatch();

  const { t } = useTranslation();
  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  const handleWorkTypeClick = (categoryId: string, workType: WorkType) => {
    dispatch(checkDepartmentWorkType({ categoryId, workType }));
  };

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box>
        <Box mb={2}>
          <EditHeader
            descriptionText={t('users.departments.edit.workType.description')}
            headerIcon={<AssetManIcon color="darkGrey" contained={false} hoverable={false} />}
            headerText={t('users.departments.edit.workType.header')}
          />
        </Box>
        <Box>
          {department.mainCategories.map((dmc) => (
            <Box key={dmc.mainCategoryId} mb={2}>
              <CategoryWorkTypes departmentCategory={dmc} onWorkTypeClick={handleWorkTypeClick} />
            </Box>
          ))}
        </Box>
        <KeyboardSectionBottomButtons mode={sectionMode} touched={touched} />
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
