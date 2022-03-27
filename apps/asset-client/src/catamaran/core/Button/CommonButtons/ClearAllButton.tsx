import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../Button';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';

const ClearAllButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'red',
    size = 'large',
    endIcon = <TrashIcon />,
    children = t('common.clear_all'),
    ...rest
  } = props;
  return (
    <Button color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </Button>
  );
};

export default ClearAllButton;
