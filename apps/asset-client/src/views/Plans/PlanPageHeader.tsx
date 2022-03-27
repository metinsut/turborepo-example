import { CatDialogTitle, CatIconButton } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Plan, PlanAssociatedInformation } from 'store/slices/plans/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getPlanAssociatedInformation } from 'store/slices/plans/actions';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CancelIcon from 'catamaran/icons/Cancel';
import CheckIcon from 'catamaran/icons/Check';
import PlanDeleteDialog from './PlanDeleteDialog';
import PlanDisassociateDialog from './PlanDisassociateDialog';
import PlanTypeIcon from './PlanTypeIcon';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import UnlinkIcon from 'catamaran/icons/Unlink';
import useLoading from 'hooks/useLoading';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    margin: theme.spacing(0, 1.5)
  },
  iconButton: {
    margin: theme.spacing(0, 1)
  },
  marginSmall: {
    margin: theme.spacing(1)
  },
  multiSelector: {
    marginLeft: theme.spacing(1),
    width: '20%'
  },
  root: {}
}));

type Props = {
  plan: Plan;
  closeDisabled?: boolean;
  confirmDisabled?: boolean;
  deleteDisabled?: boolean;
  disassociateDisabled?: boolean;
  mode: DisplayType;
  onClose?: () => Promise<void>;
  onConfirm?: () => Promise<void>;
  onDelete?: () => Promise<void>;
  onDisassociate?: () => Promise<void>;
};

function PlanPageHeader(props: Props) {
  const classes = useStyles();
  const {
    plan,
    closeDisabled,
    confirmDisabled,
    deleteDisabled,
    disassociateDisabled,
    mode,
    onClose,
    onConfirm,
    onDelete,
    onDisassociate
  } = props;

  const { t } = useTranslation();

  const asset = useTypedSelector(selectAsset);

  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<any>();
  const [deleteInfoLoading, deleteInfoLoadingDispatch] = useLoading();
  const [disassociateLoading, asyncDisassociateLoading] = useLoadingWithoutDispatch<any>();

  const commonLoading = confirmLoading || disassociateLoading;

  const handleConfirm = async () => {
    await asyncConfirmLoading(onConfirm());
  };
  const [disassociateDialogOpen, setDisassocaiteDialogOpen] = React.useState(false);

  const onDisassociateButtonClick = () => {
    setDisassocaiteDialogOpen(true);
  };

  const handleDisassociate = async () => {
    await asyncDisassociateLoading(onDisassociate());
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [planAssociatedInformation, setPlanAssociatedInformation] =
    React.useState<PlanAssociatedInformation>(undefined);

  const onDeleteButtonClick = async () => {
    const info = await deleteInfoLoadingDispatch(getPlanAssociatedInformation(plan.id));
    setPlanAssociatedInformation(info);
    setDeleteDialogOpen(true);
  };

  const iconComponent = () => (
    <PlanTypeIcon contained={false} hoverable={false} planType={plan.type} />
  );

  const dialogTitle =
    mode === 'add'
      ? t('plans.edit.create_header', { type: t(`plans.types.${plan.type}`) })
      : t('plans.edit.edit_header', { type: t(`plans.types.${plan.type}`) });

  const actionArea = () => (
    <>
      <CatIconButton
        className={classes.iconButton}
        disabled={deleteDisabled || deleteInfoLoading || commonLoading}
        loading={deleteInfoLoading}
        onClick={onDeleteButtonClick}
      >
        <TrashIcon color="red" contained fontSize="medium" />
      </CatIconButton>
      {!!asset.id && (
        <CatIconButton
          className={classes.iconButton}
          disabled={disassociateDisabled || commonLoading}
          onClick={onDisassociateButtonClick}
        >
          <UnlinkIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      )}
      {mode === 'add' && (
        <CatIconButton
          className={classes.iconButton}
          disabled={confirmDisabled || commonLoading}
          onClick={handleConfirm}
        >
          <CheckIcon color="green" contained fontSize="medium" />
        </CatIconButton>
      )}
      {mode === 'edit' && (
        <CatIconButton
          className={classes.iconButton}
          disabled={closeDisabled || commonLoading}
          onClick={onClose}
        >
          <CancelIcon color="darkGrey" contained fontSize="medium" />
        </CatIconButton>
      )}
    </>
  );

  return (
    <>
      <CatDialogTitle actionArea={actionArea()} iconComponent={iconComponent} title={dialogTitle} />
      <PlanDeleteDialog
        associatedInformation={planAssociatedInformation}
        branchCount={plan.branchIds.length}
        onCancel={() => setDeleteDialogOpen(false)}
        onDelete={onDelete}
        open={deleteDialogOpen}
      />
      <PlanDisassociateDialog
        onCancel={() => setDisassocaiteDialogOpen(false)}
        onDisassociate={handleDisassociate}
        open={disassociateDialogOpen}
      />
    </>
  );
}

export default PlanPageHeader;
