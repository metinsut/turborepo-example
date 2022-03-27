import { BREAKDOWN_OPEN, MYREQUESTSLIST } from 'routes/constant-route';
import { CancelButton, ConfirmButton, DeleteButton, GoBackButton } from 'catamaran/core/Button';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatKeyboardButton,
  CatPaper,
  CatTypography
} from 'catamaran/core';
import { ResolveStatuses, StatusKeys } from 'store/slices/tasks/common/type';
import {
  abortMyRequestDetail,
  resolveMyRequestDetail
} from 'store/slices/breakdown/myRequest/action';
import { useDialogState, useLoading, useTypedDispatch } from 'hooks';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'catamaran/icons/Check';
import TrashIcon from 'catamaran/icons/Trash';

type Props = {
  resolveStatus?: ResolveStatuses;
  taskStatus?: StatusKeys;
  taskId: string;
};

const StickyBottomBar = ({ resolveStatus, taskId, taskStatus }: Props) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { isOpen: abortDialogOpen, togglePopup: setAbortDialogOpen } = useDialogState();
  const [resolveLoading, resolveLoadingDispatch] = useLoading();
  const dispatch = useTypedDispatch();
  const handleAbortDialogClose = () => {
    setAbortDialogOpen(false);
  };

  const handleResolveClick = () => {
    resolveLoadingDispatch(resolveMyRequestDetail(taskId));
  };

  const handleAbortClick = () => {
    setAbortDialogOpen(true);
  };

  const handleAbortDialogConfirm = async () => {
    await dispatch(abortMyRequestDetail(taskId));
    history.push(MYREQUESTSLIST);
  };

  const handleReopenClick = () => {
    history.push(`${BREAKDOWN_OPEN}?taskId=${taskId}`);
  };

  return (
    <>
      <CatPaper className="sticky-bottombar">
        <div className="flex align-items-center">
          <CatKeyboardButton component={GoBackButton} keyboardKey="escape" />
        </div>
        {taskStatus === 'waitingForConfirmation' && (
          <div className="flex align-items-center">
            <CancelButton onClick={handleAbortClick}>
              {t('tasks.my_requests.bottom_bar_delete_request')}
            </CancelButton>
            <CatDialog
              onAction={handleAbortDialogConfirm}
              onClose={handleAbortDialogClose}
              open={abortDialogOpen}
            >
              <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
              <CatDialogContent>
                <CatTypography variant="body1">
                  {t('tasks.breakdowns.my_request.delete_warning')}
                </CatTypography>
              </CatDialogContent>
              <CatDialogAction>
                <CatDialogButton component={GoBackButton} variant="close" />
                <CatDialogButton component={DeleteButton} variant="action" />
              </CatDialogAction>
            </CatDialog>
          </div>
        )}
        {taskStatus === 'closed' && resolveStatus === 'waitingToBeResolved' && (
          <div className="flex align-items-center">
            <CancelButton onClick={handleReopenClick}>
              {t('tasks.my_requests.bottom_bar_not_resolved')}
            </CancelButton>
            <div className="divider-vertical" />
            <ConfirmButton
              endIcon={<CheckIcon />}
              loading={resolveLoading}
              onClick={handleResolveClick}
            >
              {t('tasks.my_requests.bottom_bar_resolved')}
            </ConfirmButton>
          </div>
        )}
      </CatPaper>
    </>
  );
};

export default StickyBottomBar;
