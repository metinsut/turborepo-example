import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import React from 'react';

const NextButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'blue',
    size = 'large',
    endIcon = <ArrowRightIcon />,
    children = t('common.next'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default NextButton;
