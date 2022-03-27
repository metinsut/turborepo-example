import {
  CatButton,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatPanel,
  CatPanelContent,
  CatTypography
} from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { commitTask } from 'store/slices/breakdown/taskDetail/action';
import { useDialogState, useTypedDispatch } from 'hooks';
import AssignPersonIcon from 'catamaran/icons/AssignPerson';
import styles from '../Detail.module.scss';

type Props = {
  taskId: string;
  onTaskCommitted: () => void;
};

function CommitTaskPanel({ taskId, onTaskCommitted }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const { isOpen, togglePopup } = useDialogState();

  const handleCommitClose = () => {
    togglePopup(false);
  };

  const handleCommitConfirm = async () => {
    await dispatch(commitTask(taskId));
    togglePopup(false);
    onTaskCommitted();
  };

  return (
    <>
      <CatPanel className={styles.panel_wrapper}>
        <CatPanelContent className="flex justify-content-between w-full">
          <div className="grid grid-auto-flow-column align-items-center gap-16">
            <AssignPersonIcon />
            <div>
              <CatTypography className="opacity-8" variant="body1">
                {t('tasks.detail.commit.not_assigned_yet')}
              </CatTypography>
              <CatTypography variant="subtitle1">
                {t('tasks.detail.commit.click_to_handle')}
              </CatTypography>
            </div>
          </div>
          <CatButton
            color="blue"
            endIcon={<AssignPersonIcon />}
            onClick={() => togglePopup(true)}
            size="large"
          >
            {t('tasks.detail.commit.commit_task')}
          </CatButton>
        </CatPanelContent>
      </CatPanel>
      <CatDialog onAction={handleCommitConfirm} onClose={handleCommitClose} open={isOpen}>
        <CatDialogTitle
          iconComponent={AssignPersonIcon}
          title={t('tasks.detail.commit.modal_title')}
        />
        <CatDialogContent>
          <CatTypography variant="body1">
            <Trans i18nKey="tasks.detail.commit.modal_description" t={t} />
          </CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton
            color="blue"
            endIcon={<AssignPersonIcon />}
            size="large"
            variant="action"
          >
            {t('tasks.detail.commit.commit_task')}
          </CatDialogButton>
        </CatDialogAction>
      </CatDialog>
    </>
  );
}

export default CommitTaskPanel;
