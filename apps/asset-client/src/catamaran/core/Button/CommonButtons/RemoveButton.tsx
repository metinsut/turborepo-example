import { ButtonProps } from '../Button';
import { CatButton } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import TrashIcon from 'catamaran/icons/Trash';

const RemoveButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'red',
    size = 'large',
    endIcon = <TrashIcon />,
    children = t('common.remove'),
    ...rest
  } = props;
  return (
    <CatButton color={color} endIcon={endIcon} size={size} {...rest}>
      {children}
    </CatButton>
  );
};

export default RemoveButton;
