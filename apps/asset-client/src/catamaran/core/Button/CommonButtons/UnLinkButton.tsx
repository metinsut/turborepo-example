import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import React from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';

const UnLinkButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'red',
    size = 'large',
    endIcon = <UnlinkIcon />,
    children = t('common.unlink'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default UnLinkButton;
