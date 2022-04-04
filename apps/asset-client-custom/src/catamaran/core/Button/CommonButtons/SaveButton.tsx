import { useTranslation } from 'react-i18next';
import Button, { ButtonProps } from '../Button';
import React from 'react';
import UploadIcon from '../../../icons/Upload';

const SaveButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'green',
    size = 'large',
    endIcon = <UploadIcon />,
    children = t('common.save'),
    ...rest
  } = props;
  return (
    <Button color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </Button>
  );
};

export default SaveButton;
