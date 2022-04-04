import { CatCheckbox, CatTypography } from 'catamaran/core';
import { styled } from '../mui';
import React from 'react';
import clsx from 'clsx';

interface Props {
  text?: React.ReactNode;
  checked: boolean;
  onClick: () => void;
  index: string;
}

const StyledLabel = styled('label')({
  transition: 'all 0.3s ease-out'
});
const DialogCheckBox = ({ text, checked, onClick, index }: Props) => (
  <StyledLabel
    className={clsx(
      'dialog-check-item-checkbox grid justify-content-start align-items-center radius-32 p4 gap-16 cursor-pointer border-1 border-solid',
      checked
        ? 'bg-none  border-main-red-o-1 opacity-none'
        : 'bg-main-red-o-1 opacity-6 border-transparent'
    )}
    htmlFor={index}
  >
    <CatCheckbox checked={checked} id={index} onClick={onClick} paddingSize="none" />
    <CatTypography className={clsx(checked ? 'c-main-red' : '')} variant="body2">
      {text}
    </CatTypography>
  </StyledLabel>
);

export default DialogCheckBox;
