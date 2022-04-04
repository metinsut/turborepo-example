import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../Button';
import CheckIcon from '../../../icons/Check';
import React from 'react';

const SelectButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'green',
    size = 'large',
    startIcon = <CheckIcon />,
    children = t('common.select'),
    ...rest
  } = props;
  return (
    <Button backgroundColor="transparent" color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </Button>
  );
};

export default SelectButton;
