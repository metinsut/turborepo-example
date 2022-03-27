import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../Button';
import CheckIcon from '../../../icons/Check';
import React from 'react';

const SaveChangesButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'green',
    size = 'large',
    endIcon = <CheckIcon />,
    children = t('common.save_changes'),
    ...rest
  } = props;
  return (
    <Button color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </Button>
  );
};

export default SaveChangesButton;
