import {
  AssignmentInformation,
  Priority as PriorityType
} from 'store/slices/breakdown/common/types';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { confirmBreakdown } from 'store/slices/breakdown/waitingForConfirmation/action';
import { maxDefinitionCharacterCount } from 'store/slices/breakdown/open/data';
import {
  removeAssistantPersonnelIds,
  removeResponsiblePersonnelId,
  setAssignerNote,
  setAssistantPersonnelIds,
  setPriority,
  setResponsiblePersonnelId
} from 'store/slices/breakdown/waitingForConfirmation/slice';
import { selectAssignmentInformation } from 'store/slices/breakdown/waitingForConfirmation/selector';
import { useCallback } from 'react';
import { useDebounce } from 'react-use';
import { useFormState, useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import AssignPersonIcon from 'catamaran/icons/AssignPerson';
import AssistantPerson from '../Common/PersonnelInformation/AssistantPerson';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import InfoIcon from 'catamaran/icons/Info';
import Priority from '../Common/Priority/Priority';
import RemainingCharacters from 'components/RemainingCharacters';
import ResponsiblePerson from '../Common/PersonnelInformation/ResponsiblePerson';
import assignmentInformationValidator from 'helpers/validations/Breakdown/AssignmentInformationValidator';

type Props = {
  assetId: string;
  breakdownId: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function ConfirmModal({ assetId, breakdownId, open, onClose, onConfirm }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const assignmentInformation = useTypedSelector(selectAssignmentInformation);
  const formHelper = useFormState<AssignmentInformation>(
    () => assignmentInformation,
    assignmentInformationValidator
  );

  const handleGoBack = () => {
    onClose?.();
  };

  const handleConfirm = async () => {
    await dispatch(confirmBreakdown(breakdownId, assignmentInformation));
    onClose?.();
    onConfirm?.();
  };

  const handleResponsiblePersonnelIdChange = useCallback(
    (personId: string) => {
      dispatch(setResponsiblePersonnelId(personId));
    },
    [dispatch]
  );

  const handleClearResponsiblePersonnelId = useCallback(() => {
    dispatch(removeResponsiblePersonnelId());
  }, [dispatch]);

  const handleAssistantPersonnelIdChange = useCallback(
    (personIds: string[]) => {
      dispatch(setAssistantPersonnelIds(personIds));
    },
    [dispatch]
  );

  const handleClearAssistantPersonnelId = useCallback(() => {
    dispatch(removeAssistantPersonnelIds());
  }, [dispatch]);

  const handlePriorityChange = useCallback(
    (priority: PriorityType) => {
      dispatch(setPriority(priority));
    },
    [dispatch]
  );

  useDebounce(
    () => {
      const { assignerNote } = formHelper.formState.values;
      dispatch(setAssignerNote(assignerNote));
    },
    500,
    [dispatch, formHelper.formState.values]
  );

  return (
    <CatDialog onAction={handleConfirm} onClose={handleGoBack} open={open} size="medium">
      <CatDialogTitle
        iconComponent={AssignPersonIcon}
        title={t('tasks.breakdowns.confirm_modal.title')}
      />
      <CatDialogContent>
        <div className="grid gap-24">
          <CatTypography variant="body1">
            {t('tasks.breakdowns.confirm_modal.description')}
          </CatTypography>
          <div
            className="grid align-items-center gap-16"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 330px))' }}
          >
            <ResponsiblePerson
              assetId={assetId}
              assistantPersonnelIds={assignmentInformation.assistantPersonnelIds}
              onClearResponsiblePersonnel={handleClearResponsiblePersonnelId}
              onResponsiblePersonnelIdChange={handleResponsiblePersonnelIdChange}
              responsiblePersonnelId={assignmentInformation.responsiblePersonnelId}
            />
            <AssistantPerson
              assetId={assetId}
              assistantPersonnelIds={assignmentInformation.assistantPersonnelIds}
              disabledPersonIds={[assignmentInformation.responsiblePersonnelId]}
              onAssistantPersonnelChange={handleAssistantPersonnelIdChange}
              onClearAssistantPersonnel={handleClearAssistantPersonnelId}
              responsiblePersonnelId={assignmentInformation.responsiblePersonnelId}
            />
          </div>
          <div className="flex align-items-center">
            <InfoIcon color="darkGrey" fontSize="small" hoverable={false} />
            <CatTypography className="opacity-8 ml8" variant="caption">
              {t('tasks.breakdowns.confirm_modal.info')}
            </CatTypography>
          </div>
          <div
            className="grid align-items-center gap-20"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 300px))' }}
          >
            <Priority
              onPriorityChange={handlePriorityChange}
              priority={assignmentInformation.priority}
            />
            <div className="grid relative align-self-stretch">
              <RemainingCharacters
                className="absolute right-0"
                currentCount={formHelper.formState.values.assignerNote.length}
                maxCount={maxDefinitionCharacterCount}
                style={{ marginTop: '-20px' }}
              />
              <CatamaranTextField
                className="w-full h-full m0"
                formHelper={formHelper}
                label={
                  <Trans
                    components={{ italic: <i /> }}
                    i18nKey="tasks.breakdowns.confirm_modal.assigner_info_desc"
                    t={t}
                  />
                }
                mode="editOnly"
                multiline
                name="assignerNote"
                rows={4}
              />
            </div>
          </div>
        </div>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={ConfirmButton} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(ConfirmModal);
