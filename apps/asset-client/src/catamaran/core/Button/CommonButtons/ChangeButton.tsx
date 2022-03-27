import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';

const ChangeButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'blue',
    size = 'small',
    endIcon = <EditIcon />,
    children = t('common.change'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default ChangeButton;
