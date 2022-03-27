import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import React from 'react';

const DiscardButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'red',
    size = 'large',
    endIcon = <CancelIcon />,
    children = t('common.discard'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default DiscardButton;
