import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import React from 'react';

const CancelButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'red',
    size = 'large',
    startIcon = <CancelIcon />,
    children = t('common.cancel'),
    ...rest
  } = props;
  return (
    <CatButton color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </CatButton>
  );
};

export default CancelButton;
