import { CatIconButton, CatIconButtonProps } from 'catamaran/core';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

const TrashIconButton = (props: CatIconButtonProps) => (
  <CatIconButton {...props}>
    <TrashIcon color="red" fontSize="medium" />
  </CatIconButton>
);

export default TrashIconButton;
