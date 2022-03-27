import { AssetFormField, SectionMode } from 'store/slices/asset/detail/types';
import { CatIconButton, useLocalizationHelpers } from 'catamaran/core';
import { styled } from 'catamaran/core/mui';
import DynamicInput from './DynamicInput';
import EditIcon from 'catamaran/icons/Edit';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';

const StyledReadonlyTextField = styled(ReadonlyTextField)(() => ({
  '& .edit-icon': {
    opacity: 0,
    transition: 'all 0.30s ease-out'
  },
  '&:hover .edit-icon': {
    opacity: 1
  }
}));

type Props = {
  assetFormField: AssetFormField;
  mode?: SectionMode;
  onEditClick?: () => void;
  onValueChange?: (assetFormId: string, value: string) => void;
  touched?: boolean;
};

function DynamicField({ assetFormField, mode, onEditClick, onValueChange, touched }: Props) {
  const { formatDate } = useLocalizationHelpers();

  if (mode === 'edit') {
    return (
      <DynamicInput
        assetFormField={assetFormField}
        onValueChange={onValueChange}
        touched={touched}
      />
    );
  }

  return (
    <StyledReadonlyTextField
      endAdornment={
        <CatIconButton className="edit-icon" onClick={() => onEditClick()}>
          <EditIcon color="blue" />
        </CatIconButton>
      }
      label={assetFormField.title}
      text={
        assetFormField.dataType === 'dateTime'
          ? formatDate(assetFormField.value)
          : assetFormField.value
      }
    />
  );
}

export default DynamicField;
