import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../Button';
import React from 'react';
import RevertIcon from '../../../icons/Revert';

const RevertButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'red',
    size = 'large',
    startIcon = <RevertIcon />,
    children = t('common.revert'),
    ...rest
  } = props;
  return (
    <Button color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </Button>
  );
};

export default RevertButton;
