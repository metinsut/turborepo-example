import { Box } from 'catamaran/core';
import { Person } from 'store/slices/persons';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { getAssetFilterCreatedByPerson } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterInformationCreatedBy,
  selectSelectedFilterId
} from 'store/slices/asset/filter/selectors';
import { setFilterInformationCreatedByUsers } from 'store/slices/asset/filter/slice';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import FilterPersonSelector from '../FilterPersonSelector';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: 'pointer',
    justifyContent: 'left',
    width: '100%'
  }
}));

type Props = {
  className?: string;
};

function CreatedByFilter(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const personIds = useTypedSelector(selectDraftFilterInformationCreatedBy);
  const selectedFilterId = useTypedSelector(selectSelectedFilterId);

  const [createdByPersonsLoading, createdByPersonsDispatch] = useLoading<Person[]>();

  useEffect(() => {
    const fetchCreatedByPersons = async () => {
      if (selectedFilterId) {
        createdByPersonsDispatch(getAssetFilterCreatedByPerson());
      }
    };

    fetchCreatedByPersons();
  }, [createdByPersonsDispatch, selectedFilterId]);

  const handleCreatedByCheckConfirm = (persons: Person[]) => {
    const selectedPersonIds = persons.map((person) => person.id);
    dispatch(setFilterInformationCreatedByUsers(selectedPersonIds));
  };

  let label = t('assets.assetFilter.created_by');
  if (personIds.length > 0) {
    label = t('assets.assetFilter.person_selected', { count: personIds.length });
  }

  return (
    <Box center className={clsx(classes.root, className)} flex>
      <FilterPersonSelector
        description={t('assets.assetFilter.select_filter_created')}
        disabled={createdByPersonsLoading}
        label={label}
        onPersonIdsChange={handleCreatedByCheckConfirm}
        personIds={personIds}
        title={t('assets.assetFilter.select_created')}
      />
    </Box>
  );
}

export default CreatedByFilter;
