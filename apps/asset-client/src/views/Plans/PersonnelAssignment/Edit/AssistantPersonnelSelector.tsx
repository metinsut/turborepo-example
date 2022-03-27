import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { removeAssistantPersonIds, updateAssistantPersonIds } from 'store/slices/plans/slice';
import { useTypedDispatch } from 'hooks';
import MultiPersonSelector from 'components/PersonCards/Selector/MultiPersonSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  assistantPersonnelIds?: string[];
  disabledPersonId?: string;
  fetchPersons: (options: PagedRequestOptions, searchText?: string) => Promise<PagedResult<Person>>;
};

function AssistantPersonnelSelector(props: Props) {
  const classes = useStyles();
  const { className, assistantPersonnelIds, fetchPersons, disabledPersonId } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handlePersonSelect = (personIds: string[]) => {
    dispatch(updateAssistantPersonIds(personIds));
  };

  const handleDialogDelete = () => {
    dispatch(removeAssistantPersonIds());
  };

  return (
    <MultiPersonSelector
      addButtonText={t('plans.edit.assistant_personnel_not_assigned_desc')}
      allowEmptySelection
      className={clsx(className, classes.root)}
      disabledPersonIds={[disabledPersonId]}
      fetchPersons={fetchPersons}
      onPersonSelect={handlePersonSelect}
      onPersonsRemove={handleDialogDelete}
      personCardTitle={t('plans.edit.assistant_personnel_field')}
      personIds={assistantPersonnelIds}
      personSelectorDescription={
        <Trans
          components={{ bold: <b /> }}
          i18nKey="plans.edit.assignment_person_multiple_dialog_desc"
          t={t}
        />
      }
      personSelectorTitle={t('plans.edit.assistant_personnel_field')}
    />
  );
}

export default AssistantPersonnelSelector;
