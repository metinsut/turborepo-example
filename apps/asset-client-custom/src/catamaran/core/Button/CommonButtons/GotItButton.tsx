import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';

const GotItButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'green',
    size = 'large',
    startIcon = <CheckIcon />,
    children = t('common.got_it'),
    ...rest
  } = props;
  return (
    <CatButton color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </CatButton>
  );
};

export default GotItButton;
