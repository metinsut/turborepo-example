import { Box } from 'catamaran/core';
import { DisplayType, isArrayNullOrEmpty } from 'utils';
import { User } from 'store/slices/users/details/types';
import { UserModalType } from '../../helpers';
import { addGeneralAdmin, addStandardUser } from 'store/slices/users/details/actions';
import { clearPersonalInformation, insertAddedUserId } from 'store/slices/users/details/slice';
import { selectAddedUserIds } from 'store/slices/users/details/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AddedUserSummaryCard from 'views/Users/UserCards/AddedUserSummaryCard';
import DisplayMode from './DisplayMode';
import EditMode from './EditMode';
import React, { useCallback, useEffect } from 'react';

type Props = {
  userId?: string;
  onCancel?: () => void;
  onSubSectionEditingChange?: (editing: boolean) => void;
  onValuesChanged?: (changed: boolean) => void;
  subSectionEditing?: boolean;
  userModalType: UserModalType;
};

function AddUserSection(props: Props) {
  const {
    userId,
    onCancel,
    onSubSectionEditingChange,
    onValuesChanged,
    subSectionEditing,
    userModalType
  } = props;

  const dispatch = useTypedDispatch();
  const addedUserIds = useTypedSelector(selectAddedUserIds);

  const handleConfirm = useCallback(async () => {
    let addedUser: User;
    if (userModalType === 'standardUser') {
      addedUser = await dispatch(addStandardUser());
    } else {
      addedUser = await dispatch(addGeneralAdmin());
    }

    dispatch(clearPersonalInformation());
    dispatch(insertAddedUserId(addedUser.id));
    onSubSectionEditingChange(false);
  }, [dispatch, onSubSectionEditingChange, userModalType]);

  const handleCancel = async () => {
    dispatch(clearPersonalInformation());
    onSubSectionEditingChange(false);
    onValuesChanged(false);
    onCancel();
  };

  const handleAddClick = () => {
    onSubSectionEditingChange(true);
  };

  useEffect(
    () => () => {
      dispatch(clearPersonalInformation());
    },
    [dispatch]
  );

  const mode: DisplayType = userId ? 'edit' : 'add';

  return (
    <>
      {!isArrayNullOrEmpty(addedUserIds) && (
        <Box mb={2}>
          <AddedUserSummaryCard userIds={addedUserIds} />
        </Box>
      )}
      {subSectionEditing ? (
        <EditMode
          mode={mode}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onValuesChanged={onValuesChanged}
          userCount={addedUserIds.length}
        />
      ) : (
        <DisplayMode onAddClick={handleAddClick} userIds={addedUserIds} />
      )}
    </>
  );
}

export default AddUserSection;
