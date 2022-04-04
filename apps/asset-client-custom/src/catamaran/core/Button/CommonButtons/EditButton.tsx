import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../Button';
import EditIcon from '../../../icons/Edit';
import React from 'react';

const EditButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'blue',
    size = 'large',
    endIcon = <EditIcon />,
    children = t('common.edit'),
    ...rest
  } = props;
  return (
    <Button color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </Button>
  );
};

export default EditButton;
