import { CatTypography } from 'catamaran/core';
import CancelIcon from 'catamaran/icons/Cancel';
import OkIcon from 'catamaran/icons/Ok';
import React from 'react';
import clsx from 'clsx';

interface Props {
  valid?: boolean;
  text?: React.ReactNode;
}

const DialogCheckItem = ({ valid = false, text }: Props) => (
  <div
    className={clsx(
      'dialog-check-item grid justify-content-start align-items-center bg-lightGrey radius-32 p4 gap-16',
      valid && 'bg-gradient-lightRed'
    )}
  >
    {valid ? (
      <CancelIcon alwaysHovered color={valid ? 'red' : 'green'} contained fontSize="small" />
    ) : (
      <OkIcon alwaysHovered color={valid ? 'red' : 'green'} contained fontSize="small" />
    )}
    <CatTypography className={clsx(valid ? 'c-main-red' : '')} variant="body2">
      {text}
    </CatTypography>
  </div>
);

export default DialogCheckItem;
