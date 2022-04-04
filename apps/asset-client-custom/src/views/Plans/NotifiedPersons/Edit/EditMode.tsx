import { Box, CatKeyboardSection } from 'catamaran/core';
import { DisplayType } from 'utils';
import { PagedRequestOptions } from 'store/common';
import { Typography } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { removeNotifyPersonIds, updateNotifyPersonIds } from 'store/slices/plans/slice';
import { searchUsersByBranches } from 'store/slices/persons';
import { selectPlanDraft } from 'store/slices/plans/selectors';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InfoIcon from 'catamaran/icons/Info';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import MultiPersonSelector from 'components/PersonCards/Selector/MultiPersonSelector';
import clsx from 'clsx';
import styles from '../../Plans.module.scss';

type Props = {
  editNotifyPersonIds?: string[];
  initialNotifyPersonIds?: string[];
  onCancel?: () => void;
  onGoBack?: () => void;
  onSave?: (personIds: string[]) => Promise<string[]>;
  mode?: DisplayType;
};

function EditMode(props: Props) {
  const { editNotifyPersonIds, initialNotifyPersonIds, onCancel, onGoBack, onSave, mode } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const plan = useTypedSelector(selectPlanDraft);
  const planTypeResource = t(`plans.types.${plan.type}`);

  const changed = !dequal(editNotifyPersonIds, initialNotifyPersonIds);

  const handlePersonSelect = (personIds: string[]) => {
    dispatch(updateNotifyPersonIds(personIds));
  };

  const handleDialogDelete = () => {
    dispatch(removeNotifyPersonIds());
  };

  const handleCancel = async () => {
    await onCancel();
    onGoBack();
  };

  const handleSave = async () => {
    await onSave(editNotifyPersonIds);
    onGoBack();
  };

  const fetchPersons = useCallback(
    async (options: PagedRequestOptions, searchText?: string) =>
      dispatch(searchUsersByBranches(plan.branchIds, searchText, options)),
    [dispatch, plan.branchIds]
  );

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box mb={2}>
          <Typography variant="body2">{t('plans.edit.notify_person_helper')}</Typography>
        </Box>
        <div className={clsx('grid align-items-center gap-16', styles.person_card_grid_content)}>
          <MultiPersonSelector
            addButtonText={t('plans.edit.notify_person_not_assigned_desc')}
            allowEmptySelection
            className="mb8"
            fetchPersons={fetchPersons}
            onPersonSelect={handlePersonSelect}
            onPersonsRemove={handleDialogDelete}
            personCardTitle={t('plans.edit.notified_person_field')}
            personIds={editNotifyPersonIds}
            personSelectorDescription={t('plans.edit.notify_person_dialog_desc')}
            personSelectorTitle={t('plans.edit.notified_person_field')}
          />
        </div>

        <Box alignItems="center" flex mb={2}>
          <InfoIcon color="darkGrey" fontSize="small" hoverable={false} />
          <Box ml={1}>
            <Typography className="opacity-7" variant="caption">
              {t('plans.edit.notify_info_message', { planType: planTypeResource })}
            </Typography>
          </Box>
        </Box>

        <KeyboardSectionBottomButtons isConfirmDisabled={false} mode={mode} touched={changed} />
      </>
    </CatKeyboardSection>
  );
}

export default EditMode;
