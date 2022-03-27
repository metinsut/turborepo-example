import { Box, CatKeyboardSection } from 'catamaran/core';
import { DisplayType } from 'utils';
import { PagedRequestOptions } from 'store/common';
import { PersonnelAssignment } from 'store/slices/plans/types';
import { Typography } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { searchUsersByAuthorizations } from 'store/slices/persons';
import { selectPlanDraft } from 'store/slices/plans/selectors';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import AssistantPersonnelSelector from './AssistantPersonnelSelector';
import InfoIcon from 'catamaran/icons/Info';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import ResponsiblePersonnelSelector from './ResponsiblePersonnelSelector';
import clsx from 'clsx';
import styles from '../../Plans.module.scss';

type Props = {
  editPersonnelAssignment?: PersonnelAssignment;
  initialPersonnelAssignment?: PersonnelAssignment;
  onCancel?: () => void;
  onGoBack?: () => void;
  onSave?: (assignment: PersonnelAssignment) => Promise<PersonnelAssignment>;
  mode?: DisplayType;
};

function EditMode(props: Props) {
  const { editPersonnelAssignment, initialPersonnelAssignment, onCancel, onGoBack, onSave, mode } =
    props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const changed = !dequal(editPersonnelAssignment, initialPersonnelAssignment);

  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  const handleSave = async () => {
    await onSave(editPersonnelAssignment);
    onGoBack();
  };

  const plan = useTypedSelector(selectPlanDraft);
  const planTypeResource = t(`plans.types.${plan.type}`);
  const isValid =
    editPersonnelAssignment.assistantPersonnelIds.length > 0
      ? !!editPersonnelAssignment.responsiblePersonnelId
      : true;

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(
        searchUsersByAuthorizations(
          plan.branchIds,
          plan.mainCategoryId,
          plan.type,
          searchText,
          options
        )
      ),
    [dispatch, plan.branchIds, plan.mainCategoryId, plan.type]
  );

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box mb={2}>
          <Typography variant="body2">
            {t('plans.edit.assignment_person_helper', { planType: planTypeResource })}
          </Typography>
        </Box>
        <div
          className={clsx('grid align-items-center mb8 gap-16', styles.person_card_grid_content)}
        >
          <ResponsiblePersonnelSelector
            disabledPersonIds={editPersonnelAssignment.assistantPersonnelIds}
            fetchPersons={fetchPersons}
            responsiblePersonId={editPersonnelAssignment.responsiblePersonnelId}
          />
          <AssistantPersonnelSelector
            assistantPersonnelIds={editPersonnelAssignment.assistantPersonnelIds}
            disabledPersonId={editPersonnelAssignment.responsiblePersonnelId}
            fetchPersons={fetchPersons}
          />
        </div>
        <Box alignItems="center" flex mb={2}>
          <InfoIcon color="darkGrey" fontSize="small" hoverable={false} />
          <Box ml={1}>
            <Typography className="opacity-7" variant="caption">
              {t('plans.edit.assignment_info_message', { planType: planTypeResource })}
            </Typography>
          </Box>
        </Box>
        <KeyboardSectionBottomButtons isConfirmDisabled={!isValid} mode={mode} touched={changed} />
      </>
    </CatKeyboardSection>
  );
}

export default EditMode;
