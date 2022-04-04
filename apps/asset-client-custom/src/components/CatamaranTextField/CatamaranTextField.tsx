import { Box, CatIconButton } from 'catamaran/core';
import { ChildInputParams } from './Searchable';
import { FormHelper } from 'hooks/useFormState';
import { TextFieldProps, styled } from 'catamaran/core/mui';
import { useMountedState } from 'react-use';
import CheckIcon from 'catamaran/icons/Check';
import CloseIcon from 'catamaran/icons/Close';
import EditIcon from 'catamaran/icons/Edit';
import EditableTextField from './EditableTextField';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useEffect, useState } from 'react';
import ReadonlyTextField from './ReadonlyTextField';
import ReplayIcon from 'catamaran/icons/Replay';
import TrashIcon from 'catamaran/icons/Trash';
import useHover, { HoverProps } from 'hooks/useHover';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

const Root = styled('div')({
  '& .iconButton': {
    margin: '0px 4px'
  },
  '& .readonlyButton': {
    maxWidth: 0,
    opacity: 0,
    transition: 'all 0.3s ease-out'
  },
  '&:hover .readonlyButton': {
    maxWidth: '96px',
    opacity: 1
  }
});

export type CatamaranAdornment = {
  child: React.ReactNode;
  hover: 'onlyOnHover' | 'onlyOnNotHover' | 'always';
  position: 'start' | 'end';
  priority?: 'high' | 'low';
  show: 'always' | 'readonly' | 'edit';
};

type Props<T> = TextFieldProps &
  ChildInputParams<T> & {
    adornments?: CatamaranAdornment[];
    autoFocus?: boolean;
    confirmButtonMode?: 'add' | 'check';
    className?: string;
    disabled?: boolean;
    deletable?: boolean;
    editable?: boolean;
    editMode?: boolean;
    formHelper: FormHelper<T>;
    label?: string | React.ReactNode;
    loading?: boolean;
    lightIconColors?: boolean;
    isRequired?: boolean;
    isNumericString?: boolean;
    mode?: 'editOnly' | 'editAndConfirm';
    multiline?: boolean;
    name: string & keyof T;
    onConfirm?: (value: T) => Promise<T>;
    onClose?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
    onEditModeChange?: (editMode: boolean) => void;
    parentHover?: boolean;
    parentHoverProps?: HoverProps;
    readonlyFormatValue?: (value: string) => string;
    validatable?: boolean;
  };

function CatamaranTextField<T>(props: Props<T>) {
  const {
    adornments,
    autoFocus,
    className,
    confirmButtonMode = 'check',
    disabled,
    deletable = true,
    editable = true,
    editMode,
    formHelper,
    isRequired,
    isNumericString = false,
    label,
    lightIconColors,
    loading,
    mode = 'editAndConfirm',
    multiline = false,
    name,
    onConfirm,
    onClose,
    onDelete,
    onEdit,
    onEditModeChange,
    parentHover,
    parentHoverProps,
    readonlyFormatValue,
    validatable = true,
    ...rest
  } = props;
  const { onBlur, onFocus } = props;

  const { formState } = formHelper;
  const [localLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<T>();
  const confirmLoading = loading !== undefined ? loading : localLoading;

  const [isEditMode, setIsEditMode] = useState(mode === 'editOnly');
  const finalEditMode = (editMode ?? isEditMode) && !disabled;

  const finalSetEditMode = onEditModeChange ?? setIsEditMode;

  useEffect(() => {
    setIsEditMode(mode === 'editOnly');
  }, [mode]);

  const [localHover, localHoverProps] = useHover();
  const hover = parentHoverProps ? parentHover : localHover;
  const hoverProps = parentHoverProps ?? localHoverProps;

  const isMounted = useMountedState();
  const [focused, setFocused] = useState(autoFocus);
  const isTouched = !!formState.touchedFields[name];

  const canValidate = validatable && formState.validatable && formState.touchedFields[name];
  const isValid = formState.touchedFields[name] && !formState.errors[name];
  const isDeleteButton = !formState.defaultValues[name];

  const handleConfirm = async (event?: any) => {
    event?.preventDefault();
    let finalValue: T = formState.values;

    if (onConfirm) {
      finalValue = await asyncConfirmLoading(onConfirm(formState.values));
    }

    if (isMounted()) {
      formHelper.resetField(name, finalValue[name], { forceIfNotChanged: true });
    }

    if (mode === 'editAndConfirm') {
      finalSetEditMode(false);
    }
    setFocused(false);
  };

  const handleBlur = async (event: any) => {
    if (!onBlur && !formState.errors[name]) {
      handleConfirm(event);
    } else {
      onBlur?.(event);
    }
    setFocused(false);
  };

  const handleFocus = (e: any) => {
    onFocus?.(e);
    setFocused(true);
  };

  const handleDelete = async () => {
    await onDelete?.();
    finalSetEditMode(false);
  };

  const handleEdit = () => {
    onEdit?.();
    finalSetEditMode(true);
    handleFocus(null);
  };

  const handleClose = (event?: any) => {
    onClose?.();

    if (mode === 'editAndConfirm') {
      finalSetEditMode(false);
    }

    setFocused(false);
    event?.preventDefault();
  };

  const handleRevert = (event?: any) => {
    const { defaultValues } = formState;
    formHelper.resetField(name, defaultValues[name]);
    handleClose();
    event?.preventDefault();
  };

  const handleKeyDown = async (e: any) => {
    switch (e.keyCode) {
      case 9: // Tab
        if (e.shiftKey && isTouched) {
          handleRevert();
        } else if (isTouched) {
          if (canValidate && isValid) {
            await handleConfirm();
          } else {
            e.preventDefault();
          }
        } else {
          handleClose();
        }
        break;

      case 27: // Esc
        e.stopPropagation();
        if (isTouched) {
          handleRevert(e);
        } else {
          handleClose(e);
        }
        break;

      case 13: // Enter
        e.stopPropagation();
        if (isTouched && canValidate && isValid && !multiline) {
          await handleConfirm();
        }
        break;

      default:
        break;
    }
  };

  const readonlyAdornments = adornments?.filter((a) => a.show !== 'edit');
  const editAdornments = adornments?.filter((a) => a.show !== 'readonly');

  const getElements = (
    position: 'start' | 'end',
    adornments: CatamaranAdornment[],
    priority?: 'high' | 'low'
  ) => {
    const filtered = adornments?.filter(
      (a) =>
        a.position === position &&
        (a.hover === 'always' ||
          (a.hover === 'onlyOnHover' && hover) ||
          (a.hover === 'onlyOnNotHover' && !hover)) &&
        (!priority || (!a.priority && priority === 'high') || a.priority === priority)
    );

    return filtered?.length ? filtered?.map((a) => a.child) : null;
  };

  return (
    <Root className={className} {...hoverProps}>
      {finalEditMode ? (
        <EditableTextField
          autoFocus={mode === 'editAndConfirm' || autoFocus}
          className={className}
          endAdornment={
            <Box className="flex align-items-center">
              {getElements('end', editAdornments, 'high')}
              {!isTouched && mode === 'editAndConfirm' && (
                <CatIconButton className="iconButton" onMouseDown={handleClose} tabIndex={-1}>
                  <CloseIcon color="darkGrey" />
                </CatIconButton>
              )}
              {isTouched && (
                <CatIconButton className="iconButton" onMouseDown={handleRevert} tabIndex={-1}>
                  {isDeleteButton && deletable ? (
                    <TrashIcon color="red" />
                  ) : (
                    <ReplayIcon color="red" />
                  )}
                </CatIconButton>
              )}
              {isTouched && (
                <CatIconButton
                  className="iconButton"
                  disabled={canValidate && !isValid}
                  loading={confirmLoading}
                  onMouseDown={handleConfirm}
                  tabIndex={-1}
                >
                  {confirmButtonMode === 'check' ? (
                    <CheckIcon color="green" />
                  ) : (
                    <PlusIcon color="blue" />
                  )}
                </CatIconButton>
              )}
              {getElements('end', editAdornments, 'low')}
            </Box>
          }
          focused={focused}
          formHelper={formHelper}
          isNumericString={isNumericString}
          isRequired={isRequired}
          label={label}
          multiline={multiline}
          name={name}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          startAdornment={getElements('start', editAdornments)}
          validatable={validatable}
          {...rest}
        />
      ) : (
        <ReadonlyTextField
          className={className}
          disabled={disabled}
          endAdornment={
            <>
              {getElements('end', readonlyAdornments, 'high')}
              {!disabled && (
                <>
                  {deletable && (
                    <CatIconButton className="iconButton readonlyButton" onClick={handleDelete}>
                      <TrashIcon color={lightIconColors ? 'lightRed' : 'red'} />
                    </CatIconButton>
                  )}
                  {editable && (
                    <CatIconButton className="iconButton readonlyButton" onClick={handleEdit}>
                      <EditIcon color={lightIconColors ? 'lightBlue' : 'blue'} />
                    </CatIconButton>
                  )}
                </>
              )}
              {getElements('end', readonlyAdornments, 'low')}
            </>
          }
          label={label}
          startAdornment={getElements('start', readonlyAdornments)}
          text={
            readonlyFormatValue
              ? readonlyFormatValue(formState.values[name]?.toString())
              : formState.values[name]?.toString()
          }
          {...rest}
        />
      )}
    </Root>
  );
}

export default CatamaranTextField;
