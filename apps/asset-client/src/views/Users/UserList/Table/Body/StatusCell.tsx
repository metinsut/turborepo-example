import { CatButton, CatTypography } from 'catamaran/core';
import { TableCell } from 'catamaran/core/mui';
import { UserStatus } from 'store/slices/users/common/types';
import { cancelInvitation, resendInvitation } from 'store/slices/users/list/actions';
import { selectUserById } from 'store/slices/users/list/selectors';
import { useDialogState, useTypedDispatch } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CancelIcon from 'catamaran/icons/Cancel';
import PostIcon from 'catamaran/icons/Post';
import UserCancelInvitationModal from 'views/Users/UserModal/Operations/UserCancelInvitationModal';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  status: UserStatus;
  userId: string;
  hovered: boolean;
}

const StatusCell = ({ status, userId, hovered }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const user = useTypedSelector((state) => selectUserById(state, userId));
  const { isOpen, togglePopup } = useDialogState();
  const handleCancelConfirm = () => {
    dispatch(cancelInvitation(userId));
    togglePopup();
  };

  const handleResendInvitation = (event: any) => {
    event.stopPropagation();
    dispatch(resendInvitation(userId));
  };

  const openCancelModal = (event: any) => {
    event.stopPropagation();
    togglePopup();
  };

  const renderWaiting = () =>
    hovered ? (
      <>
        <CancelIcon color="red" contained onClick={openCancelModal} />
        <hr className="divider-vertical" />
        <CatButton
          className="upper-case text-left"
          color="blue"
          endIcon={<PostIcon />}
          onClick={handleResendInvitation}
          size="small"
        >
          {t('users.list.body.resend_button')}
        </CatButton>
      </>
    ) : (
      <>
        <CatTypography className="pl10" noBreak variant="body2">
          {t('users.list.body.invited')}
        </CatTypography>
        <CatButton
          className="upper-case text-left"
          color="blue"
          disabled
          endIcon={<PostIcon />}
          size="small"
        >
          {t('users.list.body.sent_button')}
        </CatButton>
      </>
    );

  return (
    <>
      <TableCell className="border-0">
        <div className={clsx(classes.userList_tableRow)}>
          {status === 'waiting' ? (
            renderWaiting()
          ) : (
            <CatTypography className="pl10" noBreak variant="body2">
              {t(`users.list.body.${status}`)}
            </CatTypography>
          )}
        </div>
      </TableCell>
      <UserCancelInvitationModal
        onClose={() => togglePopup(false)}
        onConfirm={handleCancelConfirm}
        open={isOpen}
        userName={`${user.firstName ?? ''} ${user.lastName ?? ''}`}
      />
    </>
  );
};

export default StatusCell;
