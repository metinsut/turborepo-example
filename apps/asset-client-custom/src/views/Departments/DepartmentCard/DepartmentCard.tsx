import { Box, CatToggleCard, CatToggleCardCheckbox } from 'catamaran/core';
import { Typography } from 'catamaran/core/mui';
import { isArrayNullOrEmpty } from 'utils';
import { selectDepartmentById } from 'store/slices/users/departments/selectors';
import { useDialogState } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DepartmentPageModal from '../DepartmentModal/DepartmentPageModal';
import EditIcon from 'catamaran/icons/Edit';
import ExtraMainCategoriesChip from './ExtraMainCategoriesChip';
import MainCategoryDisplay from './MainCategoryDisplay';
import MainCategoryLock from './MainCategoryLock';
import React from 'react';

type Props = {
  className?: string;
  departmentId: string;
  disabled?: boolean;
  editable?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

function DepartmentCard(props: Props) {
  const { className, departmentId, disabled, editable, selected, onClick } = props;

  const department = useTypedSelector((state) => selectDepartmentById(state, departmentId));

  const { isOpen, togglePopup } = useDialogState();

  const handleEditConfirm = React.useCallback(async () => {
    togglePopup();
  }, [togglePopup]);

  const handleEditClick = () => {
    togglePopup();
    if (onClick) {
      onClick();
    }
  };
  if (!department) {
    return null;
  }

  const displayCategory = department.mainCategories?.[0];
  const extraCategories = department.mainCategories?.slice(1) ?? [];
  const isSelectable = selected !== undefined;

  return (
    <>
      <CatToggleCard
        className={className}
        disabled={disabled}
        onClick={editable ? handleEditClick : onClick}
        selected={selected}
        style={{ height: 272 }}
      >
        {(hovered: boolean) => (
          <Box flex flexDirection="column" height="100%" width="100%">
            <Box alignItems="center" flex height="34px" pb={2} width="100%">
              {!disabled && isSelectable && (
                <CatToggleCardCheckbox checked={selected} style={{ paddingRight: '8px' }} />
              )}
              <Typography
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                variant="subtitle1"
              >
                {department.name}
              </Typography>
              <Box flex flexGrow={1} />
              {editable && hovered && !disabled && (
                <EditIcon
                  alwaysHovered
                  style={{
                    backgroundColor: 'rgba(73, 73, 73, 0.1)',
                    marginLeft: '16px'
                  }}
                />
              )}
            </Box>
            {department?.autoAdded && (
              <MainCategoryLock showEditDisabledTooltip={hovered && disabled} />
            )}
            <Box flex flexDirection="column" flexGrow={1} />
            {displayCategory && (
              <MainCategoryDisplay departmentCategory={displayCategory} selected={selected} />
            )}
            {!isArrayNullOrEmpty(extraCategories) && (
              <>
                <Box height="16px" />
                <ExtraMainCategoriesChip
                  departmentCategories={extraCategories}
                  selected={selected}
                />
              </>
            )}
          </Box>
        )}
      </CatToggleCard>
      <DepartmentPageModal
        id={department.id}
        onClose={() => togglePopup()}
        onConfirm={handleEditConfirm}
        open={isOpen}
      />
    </>
  );
}

export default DepartmentCard;
