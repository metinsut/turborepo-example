import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import React from 'react';

const ContinueButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'blue',
    size = 'large',
    endIcon = <ChevronRIcon />,
    children = t('common.continue'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default ContinueButton;
