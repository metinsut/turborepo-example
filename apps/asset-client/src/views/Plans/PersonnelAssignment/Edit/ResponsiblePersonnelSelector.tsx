import { PagedRequestOptions, PagedResult } from 'store/common';
import { Person } from 'store/slices/persons';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { removeResponsiblePersonId, updateResponsiblePersonIds } from 'store/slices/plans/slice';
import { useTypedDispatch } from 'hooks';
import React from 'react';
import SinglePersonSelector from 'components/PersonCards/Selector/SinglePersonSelector';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  fetchPersons: (options: PagedRequestOptions, searchText?: string) => Promise<PagedResult<Person>>;
  responsiblePersonId?: string;
  disabledPersonIds?: string[];
};

function ResponsiblePersonSelector(props: Props) {
  const classes = useStyles();
  const { className, fetchPersons, responsiblePersonId, disabledPersonIds } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handlePersonSelect = (personId: string) => {
    dispatch(updateResponsiblePersonIds(personId));
  };

  const handleDialogDelete = () => {
    dispatch(removeResponsiblePersonId());
  };

  return (
    <>
      <SinglePersonSelector
        addButtonText={t('plans.edit.responsible_personnel_not_assigned_desc')}
        className={clsx(className, classes.root)}
        disabledPersonIds={disabledPersonIds}
        fetchPersons={fetchPersons}
        onPersonRemove={handleDialogDelete}
        onPersonSelect={handlePersonSelect}
        personCardTitle={t('plans.edit.responsible_personnel_field')}
        personId={responsiblePersonId}
        personSelectorDescription={
          <Trans
            components={{ bold: <b /> }}
            i18nKey="plans.edit.assignment_person_dialog_desc"
            t={t}
          />
        }
        personSelectorTitle={t('plans.edit.responsible_personnel_field')}
      />
    </>
  );
}

export default ResponsiblePersonSelector;
