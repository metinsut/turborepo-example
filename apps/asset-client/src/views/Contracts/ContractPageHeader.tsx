import { CatDialogTitle, CatIconButton } from 'catamaran/core';
import { Contract, ContractAssociatedInformation } from 'store/slices/contracts/types';
import { DisplayType } from 'utils';
import { TrashIconButton } from 'catamaran/core/Button';
import { getContractAssociatedInformation } from 'store/slices/contracts/actions';
import { getContractIconComponent } from './ContractIcon';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import ContractDeleteDialog from './ContractDeleteDialog';
import ContractDisassociateDialog from './ContractDisassociateDialog';
import React from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';
import useLoading from 'hooks/useLoading';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props = {
  contract?: Contract;
  closeDisabled?: boolean;
  confirmDisabled?: boolean;
  deleteDisabled?: boolean;
  disassociateDisabled?: boolean;
  mode: DisplayType;
  onClose?: (() => Promise<void>) | (() => void);
  onConfirm?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onDisassociate?: () => Promise<void>;
};

function ContractPageHeader({
  closeDisabled,
  confirmDisabled,
  contract,
  deleteDisabled,
  disassociateDisabled,
  mode,
  onConfirm,
  onClose,
  onDelete,
  onDisassociate
}: Props) {
  const { t } = useTranslation();
  const contractTypeResource = t(`contracts.types.${contract.type}`);

  const asset = useTypedSelector(selectAsset);

  const [closeLoading, asyncCloseLoading] = useLoadingWithoutDispatch<any>();
  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<any>();
  const [deleteInfoLoading, deleteInfoLoadingDispatch] = useLoading();
  const [disassociateLoading, asyncDisassociateLoading] = useLoadingWithoutDispatch<any>();

  const commonLoading = closeLoading || confirmLoading || disassociateLoading;

  const handleClose = async () => {
    await asyncCloseLoading(onClose());
  };

  const handleConfirm = async () => {
    await asyncConfirmLoading(onConfirm());
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [contractAssociatedInformation, setContractAssociatedInformation] =
    React.useState<ContractAssociatedInformation>(undefined);

  const onDeleteButtonClick = async () => {
    const info = await deleteInfoLoadingDispatch(getContractAssociatedInformation(contract.id));
    setContractAssociatedInformation(info);
    setDeleteDialogOpen(true);
  };

  const [disassociateDialogOpen, setDisassocaiteDialogOpen] = React.useState(false);
  const onDisassociateButtonClick = () => {
    setDisassocaiteDialogOpen(true);
  };

  const handleDisassociate = async () => {
    await asyncDisassociateLoading(onDisassociate());
  };

  return (
    <>
      <CatDialogTitle
        actionArea={
          <div className="grid grid-auto-flow-column align-items-center gap-8">
            <div className="divider-vertical" />
            <TrashIconButton
              disabled={deleteDisabled || commonLoading}
              loading={deleteInfoLoading}
              onClick={onDeleteButtonClick}
            />
            {!!asset.id && (
              <CatIconButton
                disabled={disassociateDisabled || commonLoading}
                onClick={onDisassociateButtonClick}
              >
                <UnlinkIcon color="red" contained fontSize="medium" />
              </CatIconButton>
            )}
            {mode === 'add' && (
              <CatIconButton disabled={confirmDisabled || commonLoading} onClick={handleConfirm}>
                <CheckIcon color="green" contained fontSize="medium" />
              </CatIconButton>
            )}
            {mode === 'edit' && (
              <CatIconButton disabled={closeDisabled || commonLoading} onClick={handleClose}>
                <CancelIcon color="darkGrey" contained fontSize="medium" />
              </CatIconButton>
            )}
          </div>
        }
        iconComponent={getContractIconComponent(contract.type)}
        title={t('contracts.edit.create_header', { type: contractTypeResource })}
      />
      <ContractDisassociateDialog
        contractId={contract.id}
        onCancel={() => setDisassocaiteDialogOpen(false)}
        onDisassociate={handleDisassociate}
        open={disassociateDialogOpen}
      />
      <ContractDeleteDialog
        associatedInformation={contractAssociatedInformation}
        branchCount={contract.branchIds.length}
        onCancel={() => setDeleteDialogOpen(false)}
        onDelete={onDelete}
        open={deleteDialogOpen}
      />
    </>
  );
}

export default ContractPageHeader;
