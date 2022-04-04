import { CatIconButton } from 'catamaran/core';
import { styled } from 'catamaran/core/mui';
import { useEffect, useState } from 'react';
import EditIcon from 'catamaran/icons/Edit';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';

const StyledReadonlyTextField = styled(ReadonlyTextField)({
  '& .edit-button': {
    opacity: 0,
    transition: 'opacity 0.3s ease-out'
  },
  '&:hover .edit-button': {
    opacity: 1
  }
});

type Props = {
  disabled?: boolean;
  editable?: boolean;
  formatValue?: (value: string) => string;
  label: string;
  onEditClick?: () => void;
  readonly: boolean;
  value: string;
};

export type TextFieldProps<T> = T & {
  value: string;
  label: string;
};

export function withReadonlyMode<T>(WrappedComponent: React.FunctionComponent<TextFieldProps<T>>) {
  return (props: T & Props) => {
    const {
      disabled,
      editable = true,
      formatValue = (value) => value,
      label,
      onEditClick,
      readonly,
      value,
      ...rest
    } = props;

    const [autoFocus, setAutoFocus] = useState(false);

    useEffect(() => {
      if (readonly && autoFocus) {
        setAutoFocus(false);
      }
    }, [readonly, autoFocus]);

    const handleEdit = () => {
      setAutoFocus(true);
      onEditClick();
    };

    if (readonly) {
      return (
        <StyledReadonlyTextField
          disabled={disabled}
          endAdornment={
            editable && (
              <CatIconButton className="edit-button" onClick={handleEdit}>
                <EditIcon color="blue" />
              </CatIconButton>
            )
          }
          label={label}
          text={formatValue(value)}
        />
      );
    }

    return (
      <WrappedComponent
        {...(rest as any as T)}
        autoFocus={autoFocus}
        disabled={disabled}
        label={label}
        value={value}
      />
    );
  };
}
