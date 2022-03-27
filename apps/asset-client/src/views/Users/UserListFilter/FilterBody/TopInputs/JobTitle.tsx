import { CatAutocompleteAsync } from 'catamaran/core';
import { fetchJobTitles } from 'store/slices/users/filter/actions';
import { selectFilterJobTitles } from 'store/slices/users/filter/selectors';
import { updateJobTitles } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import React, { useCallback } from 'react';
import classes from '../../../Users.module.scss';

const JobTitle = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const selectedJobTitles = useTypedSelector(selectFilterJobTitles);

  const handleChange = (values: string[] | string) => {
    dispatch(updateJobTitles(values as string[]));
  };

  const searchJobTitles = useCallback(
    (searchText: string) => dispatch(fetchJobTitles(searchText)),
    [dispatch]
  );

  return (
    <div className={classes.filter_job_title_wrapper}>
      <CatAutocompleteAsync
        fetchResults={searchJobTitles}
        getOptionValue={(option) => option}
        label={t('users.filter.job_title')}
        multiple
        onChange={handleChange}
        selectedValues={selectedJobTitles}
      />
    </div>
  );
};

export default JobTitle;
