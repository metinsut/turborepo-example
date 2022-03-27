import { CatIconButton, CatMenu, CatMenuDivider, CatMenuItem, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { User } from 'store/slices/users/details/types';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { cancelInvitation, resendInvitation } from 'store/slices/users/list/actions';
import {
  demoteUser,
  promoteUser,
  resignUser,
  unresignUser
} from 'store/slices/users/details/actions';
import { useCallback } from 'react';
import { useDialogState, useTypedDispatch } from 'hooks';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import CancelIcon from 'catamaran/icons/Cancel';
import DoNotRenewContractIcon from 'catamaran/icons/DoNotRenewContract';
import EllipsisIcon from 'catamaran/icons/Ellipsis';
import PersonIcon from 'catamaran/icons/Person';
import UpdateIcon from 'catamaran/icons/Update';
import UserCancelInvitationModal from './Operations/UserCancelInvitationModal';
import UserDemoteModal from './Operations/UserDemoteModal';
import UserPromoteModal from './Operations/UserPromoteModal';
import UserResignModal from './Operations/UserResignModal';
import UserUnresignModal from './Operations/UserUnresignModal';
import WthPersonAdminIcon from 'catamaran/icons/WthPersonAdmin';
import useLoading from 'hooks/useLoading';

type Props = {
  onModalTypeChange?: () => void;
  user: User;
};

function UserOperationOptions(props: Props) {
  const { onModalTypeChange, user } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleResignItemClick = () => {
    toggleResignPopup(true);
  };

  const { isOpen: isResignOpen, togglePopup: toggleResignPopup } = useDialogState();

  const handleResignConfirm = useCallback(async () => {
    await dispatch(resignUser(user.id));
  }, [dispatch, user.id]);

  const handleUnresignItemClick = () => {
    toggleUnresignPopup(true);
  };

  const { isOpen: isUnresignOpen, togglePopup: toggleUnresignPopup } = useDialogState();

  const handleUnResignConfirm = useCallback(async () => {
    await dispatch(unresignUser(user.id));
  }, [dispatch, user.id]);

  const [resendInvitationLoading, resendInivationLoadingDispatch] = useLoading();

  const handleResendInvitationClick = useCallback(async () => {
    await resendInivationLoadingDispatch(resendInvitation(user.id));
  }, [resendInivationLoadingDispatch, user.id]);

  const handleCancelInvitationClick = () => {
    toggleCancelInvitationPopup(true);
  };

  const { isOpen: isCancelInvitationOpen, togglePopup: toggleCancelInvitationPopup } =
    useDialogState();

  const handleCancelInvitationConfirm = useCallback(async () => {
    await dispatch(cancelInvitation(user.id));
  }, [dispatch, user.id]);

  const { isOpen: isPromoteOpen, togglePopup: togglePromotePopup } = useDialogState();

  const handlePromoteClick = () => {
    togglePromotePopup(true);
  };

  const handlePromoteConfirm = useCallback(async () => {
    if (user) {
      await dispatch(promoteUser(user.id));
      onModalTypeChange();
    }
  }, [dispatch, onModalTypeChange, user]);

  const { isOpen: isDemoteOpen, togglePopup: toggleDemotePopup } = useDialogState();

  const handleDemoteClick = () => {
    toggleDemotePopup(true);
  };

  const handleDemoteConfirm = useCallback(async () => {
    if (user) {
      await dispatch(demoteUser(user.id));
      onModalTypeChange();
    }
  }, [dispatch, onModalTypeChange, user]);

  const popupState = usePopupState({ popupId: 'userOperationOptions', variant: 'popover' });

  const PopoverContent = (props: any) => (
    <CatMenu {...props} width="292px">
      <CatMenuItem disabled={user.isGeneralAdmin} onClick={handlePromoteClick}>
        <WthPersonAdminIcon color="darkGrey" fontSize="small" />
        <CatTypography variant="body2">
          <Trans i18nKey="users.modal.operations.promote_user_item" t={t} />
        </CatTypography>
      </CatMenuItem>
      <CatMenuItem disabled={!user.isGeneralAdmin} onClick={handleDemoteClick}>
        <PersonIcon color="darkGrey" fontSize="small" />
        <CatTypography variant="body2">
          <Trans i18nKey="users.modal.operations.demote_user_item" t={t} />
        </CatTypography>
      </CatMenuItem>
      <CatMenuDivider />
      <CatMenuItem disabled={user.userStatus !== 'active'} onClick={handleResignItemClick}>
        <DoNotRenewContractIcon color="red" fontSize="small" />
        <CatTypography variant="body2">
          <Trans i18nKey="users.modal.operations.resign_user_item" t={t} />
        </CatTypography>
      </CatMenuItem>
      <CatMenuItem disabled={user.userStatus !== 'resigned'} onClick={handleUnresignItemClick}>
        <UpdateIcon color="green" fontSize="small" />
        <CatTypography variant="body2">
          <Trans i18nKey="users.modal.operations.unresign_user_item" t={t} />
        </CatTypography>
      </CatMenuItem>
      <CatMenuDivider />
      <CatMenuItem disabled={user.userStatus !== 'waiting'} onClick={handleResendInvitationClick}>
        <CatIconButton loading={resendInvitationLoading}>
          <ArrowRightIcon color="green" fontSize="small" />
        </CatIconButton>
        <CatTypography variant="body2">
          <Trans i18nKey="users.modal.operations.resend_invitation_item" t={t} />
        </CatTypography>
      </CatMenuItem>
      <CatMenuItem disabled={user.userStatus !== 'waiting'} onClick={handleCancelInvitationClick}>
        <CancelIcon color="red" fontSize="small" />
        <CatTypography variant="body2">
          <Trans i18nKey="users.modal.operations.cancel_invitation_item" t={t} />
        </CatTypography>
      </CatMenuItem>
    </CatMenu>
  );

  return (
    <>
      <CatIconButton {...bindTrigger(popupState)}>
        <EllipsisIcon color="darkGrey" contained />
      </CatIconButton>
      <PopoverContent {...bindMenu(popupState)} />
      <UserResignModal
        onClose={() => toggleResignPopup(false)}
        onConfirm={handleResignConfirm}
        open={isResignOpen}
        user={user}
      />
      <UserUnresignModal
        onClose={() => toggleUnresignPopup(false)}
        onConfirm={handleUnResignConfirm}
        open={isUnresignOpen}
        user={user}
      />
      <UserCancelInvitationModal
        onClose={() => toggleCancelInvitationPopup(false)}
        onConfirm={handleCancelInvitationConfirm}
        open={isCancelInvitationOpen}
        userName={`${user.firstName ?? ''} ${user.lastName ?? ''}`}
      />
      <UserPromoteModal
        onClose={() => togglePromotePopup(false)}
        onConfirm={handlePromoteConfirm}
        open={isPromoteOpen}
      />
      <UserDemoteModal
        onClose={() => toggleDemotePopup(false)}
        onConfirm={handleDemoteConfirm}
        open={isDemoteOpen}
      />
    </>
  );
}

export default UserOperationOptions;
