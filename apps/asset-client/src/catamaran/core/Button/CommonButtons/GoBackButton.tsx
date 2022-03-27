import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import React from 'react';

const GoBackButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'darkGrey',
    size = 'large',
    startIcon = <ArrowLeftIcon />,
    children = t('common.back'),
    ...rest
  } = props;
  return (
    <CatButton
      backgroundColor="transparent"
      color={color}
      size={size}
      startIcon={startIcon}
      {...rest}
    >
      {children}
    </CatButton>
  );
};

export default GoBackButton;
