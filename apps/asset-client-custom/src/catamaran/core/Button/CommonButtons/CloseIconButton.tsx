import { CatIconButton } from 'catamaran/core';
import { IconButtonProps } from '@mui/material';
import CloseIcon from 'catamaran/icons/Close';
import React from 'react';

const CloseIconButton = (props: IconButtonProps) => (
  <CatIconButton {...props}>
    <CloseIcon color="darkGrey" fontSize="medium" />
  </CatIconButton>
);

export default CloseIconButton;
