import AddedDateFilter from './AddedDateFilter';
import React from 'react';
import UpdatedDateFilter from './LastUpdatedDateFilter';
import classes from 'views/Users/Users.module.scss';

const DatesFilter = () => (
  <div className={classes.filter_date_wrapper}>
    <AddedDateFilter />
    <UpdatedDateFilter />
  </div>
);

export default DatesFilter;
