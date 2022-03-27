import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';

const ConfirmButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'green',
    size = 'large',
    endIcon = <CheckIcon />,
    children = t('common.confirm'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default ConfirmButton;
