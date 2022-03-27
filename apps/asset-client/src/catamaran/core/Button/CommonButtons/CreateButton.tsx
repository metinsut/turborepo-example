import { useTranslation } from 'react-i18next';
import CatButton, { ButtonProps } from '../Button';
import PlusIcon from 'catamaran/icons/Plus';

const CreateButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  const {
    color = 'blue',
    size = 'large',
    startIcon = <PlusIcon />,
    children = t('common.create'),
    ...rest
  } = props;
  return (
    <CatButton color={color} size={size} startIcon={startIcon} {...rest}>
      {children}
    </CatButton>
  );
};

export default CreateButton;
