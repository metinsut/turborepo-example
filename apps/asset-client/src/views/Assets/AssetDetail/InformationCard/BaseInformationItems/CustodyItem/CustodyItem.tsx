import { Asset } from 'store/slices/asset/detail/types';
import { PagedRequestOptions } from 'store/common';
import {
  Person,
  getPersonById,
  searchUsersByBranches,
  selectPersonById
} from 'store/slices/persons';
import { removeAssetCustody, setAssetCustodyUserId } from 'store/slices/asset/detail/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import Assigned from './Assigned';
import CustodyDeleteDialog from './CustodyDeleteDialog';
import NotAssigned from './NotAssigned';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import PersonCardSkeleton from 'components/PersonCards/Card/PersonCardSkeleton';
import PersonSelectorDialog from 'views/Persons/PersonSelectorDialog';
import useLoading from 'hooks/useLoading';

type Props = {
  asset: Asset;
  className?: string;
  onEditClick?: () => void;
};

function CustodyItem(props: Props) {
  const { asset, className, onEditClick } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const [userLoading, userLoadingDispatch] = useLoading();

  const [personSelectDialogOpen, setPersonSelectDialogOpen] = React.useState(false);

  const selectedPerson = useTypedSelector((state) => selectPersonById(state, asset.custodyUserId));

  const assigned = !!asset.custodyUserId;

  useEffect(() => {
    if (asset?.custodyUserId) {
      userLoadingDispatch(getPersonById(asset.custodyUserId));
    }
  }, [asset.custodyUserId, userLoadingDispatch]);

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchUsersByBranches([asset.branchId], searchText, options)),
    [asset.branchId, dispatch]
  );

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCustodyDeleteClick = useCallback(() => {
    setDeleteOpen(true);
  }, []);

  const handleDelete = useCallback(async () => {
    await dispatch(removeAssetCustody());
    setDeleteOpen(false);
    onEditClick?.();
  }, [dispatch, onEditClick]);

  const handleEdit = useCallback(() => {
    setPersonSelectDialogOpen(true);
    onEditClick?.();
  }, [onEditClick]);

  const handleClose = () => {
    setPersonSelectDialogOpen(false);
  };

  const handleConfirm = (selectedPersons: Person[]) => {
    const selectedUserId = selectedPersons[0]?.id ?? undefined;
    dispatch(setAssetCustodyUserId(selectedUserId));
  };

  const selectedPersons: Person[] = selectedPerson ? [selectedPerson] : [];

  const cardContent = useMemo(() => {
    let content = <></>;

    if (userLoading || (assigned && !selectedPerson)) {
      content = <PersonCardSkeleton className={className} />;
    } else if (assigned) {
      content = (
        <Assigned
          className={className}
          onDelete={handleCustodyDeleteClick}
          onEdit={handleEdit}
          person={selectedPerson}
        />
      );
    } else {
      content = <NotAssigned className={className} onEdit={handleEdit} />;
    }

    return content;
  }, [assigned, className, handleCustodyDeleteClick, handleEdit, selectedPerson, userLoading]);

  return (
    <>
      <PersonSelectorDialog
        defaultSelectedPersons={selectedPersons}
        description={t('assets.asset_edit.custody_dialog_desc')}
        fetchPersons={fetchPersons}
        multiSelect={false}
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={personSelectDialogOpen}
        title={t('assets.asset_edit.custody_dialog_title')}
      />
      <CustodyDeleteDialog
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        open={deleteOpen}
      />
      {cardContent}
    </>
  );
}

export default CustodyItem;
