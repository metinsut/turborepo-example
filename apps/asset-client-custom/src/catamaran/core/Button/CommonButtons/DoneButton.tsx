import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';

const DoneButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'green',
    size = 'large',
    startIcon = <CheckIcon />,
    children = t('common.done'),
    ...rest
  } = props;
  return (
    <CatButton color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </CatButton>
  );
};

export default DoneButton;
