import { CatCheckbox, CatTypography } from 'catamaran/core';
import { RootState } from 'RootTypes';
import { TableCell, TableRow } from 'catamaran/core/mui';
import { UsersListUser } from 'store/slices/users/list/types';
import { handleUserItemCheckStatus } from 'store/slices/users/list/slice';
import {
  selectHasAnyRowSelected,
  selectIsCheckBoxChecked,
  selectUserById
} from 'store/slices/users/list/selectors';
import { useDialogState , useTypedDispatch, useTypedSelector } from 'hooks';
import AdditionalPermissionsCell from './AdditionalPermissionsCell';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import BranchesCell from './BranchesCell';
import DateAddedCell from './DateAddedCell';
import DepartmentCell from './DepartmentCell';
import LastUpdatedCell from './LastUpdatedCell';
import React, { forwardRef } from 'react';
import StatusCell from './StatusCell';
import UserEditModal from 'views/Users/UserModal/UserEditModal';
import useHover from 'hooks/useHover';

interface Props {
  userId: string;
}

const TableBodyRow = ({ userId }: Props, ref: React.Ref<any>) => {
  const dispatch = useTypedDispatch();
  const [hovered, hoverProps] = useHover();
  const user: UsersListUser = useTypedSelector((state) => selectUserById(state, userId));

  const hasAnyRowSelected = useTypedSelector(selectHasAnyRowSelected);
  const isCheckBoxChecked = useTypedSelector((state: RootState) =>
    selectIsCheckBoxChecked(state, userId)
  );

  const { isOpen, togglePopup } = useDialogState();

  const handleRowClick = () => {
    if (hasAnyRowSelected) {
      dispatch(handleUserItemCheckStatus(userId));
    } else {
      togglePopup(true);
    }
  };

  const handleCheckboxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(handleUserItemCheckStatus(userId));
  };

  return (
    user && (
      <>
        <TableRow
          className="cursor-pointer opacity-8"
          hover
          {...(!hasAnyRowSelected ? hoverProps : {})}
          onClick={handleRowClick}
          ref={ref}
          selected={isCheckBoxChecked}
        >
          <TableCell className="border-0 p4" component="th" scope="row">
            <CatCheckbox
              checked={isCheckBoxChecked}
              onClick={handleCheckboxClick}
              paddingSize="medium"
            />
          </TableCell>
          <DepartmentCell user={user} />
          <AdditionalPermissionsCell additionalPermissions={user?.additionalPermissions} />
          <TableCell className="border-0">
            <div className="align-items-center flex">
              <AvatarItem size="medium" user={user} />
              <CatTypography className="ml16 three-dot table_cell_long" noBreak variant="body2">
                {user?.firstName}
              </CatTypography>
            </div>
          </TableCell>
          <TableCell className="border-0">
            <CatTypography className="three-dot table_cell_long" noBreak variant="body2">
              {user?.lastName}
            </CatTypography>
          </TableCell>
          <BranchesCell allBranches={user?.allBranches} branches={user?.branches} />
          <DateAddedCell addedDate={user?.dateAdded} />
          <LastUpdatedCell lastUpdate={user?.lastUpdate} />
          <StatusCell
            hovered={!isCheckBoxChecked && hovered}
            status={user?.userStatus}
            userId={userId}
          />
        </TableRow>
        <UserEditModal
          id={userId}
          onClose={() => togglePopup(false)}
          open={isOpen}
          userModalType={user.isGeneralAdmin ? 'generalAdmin' : 'standardUser'}
        />
      </>
    )
  );
};

export default forwardRef(TableBodyRow);
