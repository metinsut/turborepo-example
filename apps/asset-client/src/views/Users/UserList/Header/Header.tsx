import CenterAction from './CenterAction';
import React from 'react';
import RightAction from './RightAction';
import classes from '../../Users.module.scss';

const Header = () => (
  <div className={classes.userList_header}>
    <div />
    <CenterAction />
    <RightAction />
  </div>
);

export default Header;
