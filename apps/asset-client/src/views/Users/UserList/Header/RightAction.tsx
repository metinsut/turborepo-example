import EditAction from './EditAction';
import FilterButton from './FilterButton';
import React from 'react';
import UserAddOptions from 'views/Users/UserAddOptions';
import classes from '../../Users.module.scss';

const RightAction = () => (
  <div className={classes.userList_header__right}>
    <EditAction />
    <UserAddOptions />
    <FilterButton />
  </div>
);

export default RightAction;
