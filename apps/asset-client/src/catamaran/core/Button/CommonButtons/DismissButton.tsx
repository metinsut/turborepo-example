import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import CloseIcon from 'catamaran/icons/Close';
import React from 'react';

const DismissButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'darkGrey',
    size = 'large',
    startIcon = <CloseIcon />,
    children = t('common.dismiss'),
    ...rest
  } = props;
  return (
    <CatButton color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </CatButton>
  );
};

export default DismissButton;
