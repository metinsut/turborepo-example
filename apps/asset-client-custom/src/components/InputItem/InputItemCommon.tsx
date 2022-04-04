import { CatCheckbox, CatIconButton, CatRadio, CatTooltip } from 'catamaran/core';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { FormHelper } from 'hooks/useFormState';
import { IconButton, Paper, Popper, Typography } from 'catamaran/core/mui';
import { useFilteredOptions, useInputMode, useSearchOpen } from './helpers';
import { useMountedState } from 'react-use';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import CheckIcon from 'catamaran/icons/Check';
import ChevronR from 'catamaran/icons/ChevronR';
import CloseIcon from 'catamaran/icons/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import EditIcon from 'catamaran/icons/Edit';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useCallback } from 'react';
import ReplayIcon from 'catamaran/icons/Replay';
import TrashIcon from 'catamaran/icons/Trash';
import ValidatedTextField from 'components/ValidatedTextField';
import ValidationBadge from 'components/ValidationBadge';
import clsx from 'clsx';

export type Adornment = {
  element: React.ReactNode;
  position?: 'right' | 'left';
  show?: 'always' | 'hover' | 'unhover';
};

export type InputProps<T> = {
  addMode?: boolean;
  alwaysShowCheckbox?: boolean;
  alwaysShowSelect?: boolean;
  bodyClickable?: boolean;
  confirmable?: boolean;
  confirmOnSelect?: boolean;
  checkable?: boolean;
  checked?: boolean;
  className?: string;
  deletable?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  editable?: boolean;
  editDisabled?: boolean;
  editDisabledTooltipTitle?: string;
  endAdornment?: Adornment[];
  expandable?: boolean;
  expandButtonDisabled?: boolean;
  expanded?: boolean;
  focused?: boolean;
  formHelper?: FormHelper<T>;
  formKey?: keyof T & string;
  hover?: boolean;
  indeterminate?: boolean;
  label?: string;
  loading?: boolean;
  noItemFoundText?: string;
  onBeforeActionStart?: () => void;
  onCheck?: () => void;
  onClose?: () => void;
  onConfirm?: (entity: T) => Promise<T>;
  onDelete?: () => void;
  onEdit?: () => void;
  onExpand?: () => void;
  onFocus?: () => void;
  onSearchSelect?: (option: T) => void;
  onSelect?: () => void;
  primaryKey?: keyof T & string;
  searchable?: boolean;
  searchHelperText?: React.ReactNode;
  searchOptions?: T[];
  selectable?: boolean;
  selectButtonDisabled?: boolean;
  selected?: boolean;
  showSearchHelperText?: boolean;
  readonly?: boolean;
  validatable?: boolean;
};

function InputItemCommon<T>(props: InputProps<T>) {
  const {
    addMode = false,
    alwaysShowCheckbox,
    alwaysShowSelect,
    bodyClickable = false,
    confirmable = true,
    confirmOnSelect = true,
    checkable,
    checked,
    className,
    deletable = true,
    disabled,
    draggable = false,
    dragHandleProps,
    editable = true,
    editDisabled,
    editDisabledTooltipTitle,
    endAdornment,
    expandable,
    expandButtonDisabled,
    expanded,
    focused,
    formHelper,
    formKey,
    hover,
    indeterminate = false,
    label,
    loading,
    noItemFoundText,
    onBeforeActionStart,
    onCheck,
    onClose,
    onConfirm,
    onDelete,
    onEdit,
    onExpand,
    onFocus,
    onSearchSelect,
    onSelect,
    primaryKey,
    searchable,
    searchHelperText,
    searchOptions,
    selectable = false,
    selectButtonDisabled,
    selected,
    showSearchHelperText = false,
    readonly,
    validatable = true
  } = props;
  const classes = useStyles();

  const { formState, clear } = formHelper;
  const formValue = formState.values[formKey] as any as string;
  const isMounted = useMountedState();
  const { t } = useTranslation();

  const popperAnchorRef = React.useRef();

  const mode = useInputMode(readonly, addMode);

  const [searchSelected, setSearchSelected] = React.useState(false);

  const searchOpen = useSearchOpen(
    mode,
    focused,
    formValue,
    showSearchHelperText,
    searchSelected,
    formState.isValid
  );

  const endAdornmentToShow = (endAdornment ?? []).filter(
    (i) => i.show === 'always' || (i.show === 'hover' && hover) || (i.show === 'unhover' && !hover)
  );

  const leftEndAdornments = endAdornmentToShow.filter((i) => i.position === 'left');
  const rightEndAdornments = endAdornmentToShow.filter((i) => i.position === 'right');

  const handleEdit = useCallback(
    (event: any) => {
      onBeforeActionStart?.();
      setSearchSelected(false);
      onEdit();
      if (bodyClickable) {
        event.stopPropagation();
      }
    },
    [bodyClickable, onBeforeActionStart, onEdit]
  );

  const handleDelete = useCallback(
    (event: any) => {
      onBeforeActionStart?.();
      onDelete?.();
      if (bodyClickable) {
        event.stopPropagation();
      }
    },
    [bodyClickable, onBeforeActionStart, onDelete]
  );

  const handleClose = useCallback(() => {
    onBeforeActionStart?.();
    clear();
    onClose();
  }, [clear, onBeforeActionStart, onClose]);

  const handleExpand = useCallback(
    (event: any) => {
      onExpand();
      if (bodyClickable) {
        event.stopPropagation();
      }
    },
    [bodyClickable, onExpand]
  );

  const handleCheck = useCallback(
    (event: any) => {
      onCheck();
      if (bodyClickable) {
        event.stopPropagation();
      }
    },
    [bodyClickable, onCheck]
  );

  const handleSelect = useCallback(
    (event: any) => {
      onBeforeActionStart?.();
      onSelect();
      if (bodyClickable) {
        event.stopPropagation();
      }
    },
    [bodyClickable, onBeforeActionStart, onSelect]
  );

  const handleSearchSelect = useCallback(
    (option: T) => async () => {
      if (option[primaryKey] === formState.defaultValues[primaryKey]) {
        // Self select
        handleClose();
      } else {
        // Set form key
        formHelper.setFormState((prev) => ({
          ...prev,
          [formKey]: option[formKey]
        }));

        if (onSearchSelect) {
          onSearchSelect(option);
        }
        if (confirmOnSelect && onConfirm) {
          await onConfirm(option);
        }

        if (isMounted()) {
          setSearchSelected(true);
        }
      }
    },
    [
      confirmOnSelect,
      formHelper,
      formKey,
      formState.defaultValues,
      handleClose,
      isMounted,
      onConfirm,
      onSearchSelect,
      primaryKey
    ]
  );

  const handlePreventBodyClick = useCallback(
    (event: any) => {
      if (bodyClickable) {
        event.stopPropagation();
      }
    },
    [bodyClickable]
  );

  const { options: filteredOptions, perfectMatch } =
    useFilteredOptions(
      formState.values[formKey] as any as string,
      searchOptions,
      formKey,
      primaryKey,
      handleSearchSelect,
      mode
    ) ?? {};

  const handleConfirm = useCallback(() => {
    let entity: T = formState.values;
    if (perfectMatch) {
      entity = perfectMatch;
    }

    onConfirm(entity);
  }, [formState.values, onConfirm, perfectMatch]);

  const handleKeyDown = async (e: any) => {
    switch (e.keyCode) {
      case 9: // Tab
        if (e.shiftKey) {
          handleClose();
          break;
        }

        if (formState.isTouched) {
          if (validatable && formState.isValid) {
            await handleConfirm();
          } else {
            e.preventDefault(); // tab not valid
          }
          break;
        }

        handleClose();
        break;

      case 27: // Esc
        handleClose();
        break;

      case 13: // Enter
        if (formState.isTouched && validatable && formState.isValid) {
          await handleConfirm();
        }
        break;

      default:
        break;
    }
  };

  const isFieldTouched = formState.touchedFields[formKey] !== undefined;
  const showHelperText =
    (formState.values[formKey] as any as string)?.length < 3 && showSearchHelperText;

  return (
    <div className={classes.outerContainer} ref={popperAnchorRef}>
      <ValidatedTextField
        autoComplete={searchable ? 'off' : 'on'}
        className={clsx({
          [className]: true,
          [classes.input]: true,
          [classes.readonlyInput]: readonly,
          [classes.selectedInput]: selected && readonly,
          [classes.notReadonlyInput]: !readonly,
          [classes.validInput]: !formState.errors[formKey],
          [classes.clearInput]: !formState.touchedFields[formKey],
          expandedInput: expanded
        })}
        disabled={disabled}
        focused={focused ?? !readonly}
        formHelper={formHelper}
        fullWidth
        InputProps={{
          className: clsx({ 'cursor-pointer': bodyClickable }),
          classes: { input: clsx({ 'cursor-pointer': bodyClickable }) },
          endAdornment: (
            <>
              {(readonly || !confirmable) && leftEndAdornments.map((option) => option.element)}
              {hover &&
                !disabled &&
                deletable &&
                readonly &&
                (editDisabled ? (
                  <CatTooltip arrow title={editDisabledTooltipTitle}>
                    <span>
                      <CatIconButton
                        className={classes.iconButton}
                        disabled={editDisabled}
                        onClick={handleDelete}
                        tabIndex={-1}
                      >
                        <TrashIcon
                          color={expanded ? 'lightRed' : 'red'}
                          contained
                          fontSize="medium"
                        />
                      </CatIconButton>
                    </span>
                  </CatTooltip>
                ) : (
                  <CatIconButton
                    className={classes.iconButton}
                    onClick={handleDelete}
                    tabIndex={-1}
                  >
                    <TrashIcon color={expanded ? 'lightRed' : 'red'} contained fontSize="medium" />
                  </CatIconButton>
                ))}
              {hover &&
                !disabled &&
                editable &&
                readonly &&
                (editDisabled ? (
                  <CatTooltip arrow title={editDisabledTooltipTitle}>
                    <span>
                      <CatIconButton
                        className={classes.iconButton}
                        disabled={editDisabled}
                        onClick={handleEdit}
                        tabIndex={-1}
                      >
                        <EditIcon
                          color={expanded ? 'lightBlue' : 'blue'}
                          contained
                          fontSize="medium"
                        />
                      </CatIconButton>
                    </span>
                  </CatTooltip>
                ) : (
                  <CatIconButton className={classes.iconButton} onClick={handleEdit} tabIndex={-1}>
                    <EditIcon color={expanded ? 'lightBlue' : 'blue'} contained fontSize="medium" />
                  </CatIconButton>
                ))}
              {expandable &&
                readonly &&
                (expandButtonDisabled ? (
                  <CatTooltip arrow title={t('categories.disabled_category_tooltip')}>
                    <span>
                      <CatIconButton
                        className={classes.expandIconButton}
                        disabled={expandButtonDisabled}
                        onClick={handleExpand}
                      >
                        <ChevronR
                          color={expanded ? 'lightBlue' : 'darkGrey'}
                          contained={false}
                          fontSize="small"
                          hoverable={false}
                        />
                      </CatIconButton>
                    </span>
                  </CatTooltip>
                ) : (
                  <CatIconButton
                    className={classes.expandIconButton}
                    disabled={expandButtonDisabled}
                    onClick={handleExpand}
                  >
                    <ChevronR
                      color={expanded ? 'lightBlue' : 'darkGrey'}
                      contained={false}
                      fontSize="small"
                      hoverable={false}
                    />
                  </CatIconButton>
                ))}
              {(readonly || !confirmable) && rightEndAdornments.map((option) => option.element)}
              {editable && mode === 'edit' && !formState.isTouched && (
                <>
                  <CatIconButton className={classes.iconButton} onClick={handleClose} tabIndex={-1}>
                    <CloseIcon color="darkGrey" />
                  </CatIconButton>
                </>
              )}
              {editable && mode === 'edit' && formState.isTouched && (
                <CatIconButton className={classes.iconButton} onClick={handleClose} tabIndex={-1}>
                  <ReplayIcon color="red" contained fontSize="medium" />
                </CatIconButton>
              )}
              {editable && mode === 'add' && (
                <CatIconButton
                  className={classes.iconButton}
                  disabled={loading}
                  onClick={handleClose}
                  tabIndex={-1}
                >
                  <TrashIcon color="red" contained fontSize="medium" />
                </CatIconButton>
              )}
              {editable &&
                (mode === 'add' || (mode === 'edit' && formState.isTouched)) &&
                (!validatable || formState.isValid) &&
                searchable &&
                !perfectMatch && (
                  <CatIconButton
                    className={classes.iconButton}
                    loading={loading}
                    onClick={handleConfirm}
                    tabIndex={-1}
                  >
                    <PlusIcon color="blue" contained fontSize="medium" />
                  </CatIconButton>
                )}
              {editable &&
                (mode === 'add' || (mode === 'edit' && formState.isTouched)) &&
                (!validatable || formState.isValid) &&
                (!searchable || perfectMatch) && (
                  <CatIconButton
                    className={classes.iconButton}
                    loading={loading}
                    onClick={handleConfirm}
                    tabIndex={-1}
                  >
                    <CheckIcon color="green" contained fontSize="medium" />
                  </CatIconButton>
                )}
            </>
          ),
          readOnly: readonly,
          startAdornment: !disabled && (
            <>
              {!readonly && validatable && isFieldTouched && (
                <ValidationBadge isValid={!formState.errors[formKey]} />
              )}
              {readonly && draggable && (checked || (!alwaysShowCheckbox && hover)) && (
                <IconButton className={classes.dragButton} {...dragHandleProps} size="large">
                  <DragIndicatorIcon className={classes.dragIcon} />
                </IconButton>
              )}
              {readonly && checkable && (hover || alwaysShowCheckbox) && (
                <CatCheckbox
                  checked={checked}
                  indeterminate={indeterminate}
                  onChange={handleCheck}
                  onClick={handlePreventBodyClick}
                  style={{ margin: 0 }}
                />
              )}
              {readonly && selectable && (!selectButtonDisabled || alwaysShowSelect) && (
                <CatRadio
                  checked={selected}
                  disabled={selectButtonDisabled}
                  onChange={handleSelect}
                  onClick={handlePreventBodyClick}
                  style={{ margin: 0, padding: 0 }}
                />
              )}
            </>
          )
        }}
        label={readonly ? '' : label}
        name={formKey}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        size="small"
        variant="outlined"
      />
      {searchable && popperAnchorRef.current && (
        <Popper
          anchorEl={popperAnchorRef.current}
          open={searchOpen}
          style={{
            marginTop: 5,
            width: (popperAnchorRef.current as any).clientWidth,
            zIndex: 1300
          }}
        >
          <Paper className={classes.content}>
            <PerfectScrollbar className={classes.scrollContainer}>
              {showHelperText && searchHelperText}
              {!showHelperText && filteredOptions?.length === 0 && (
                <Typography className={classes.searchDropdownText} variant="body1">
                  {noItemFoundText}
                </Typography>
              )}
              {!showHelperText && filteredOptions}
            </PerfectScrollbar>
          </Paper>
        </Popper>
      )}
    </div>
  );
}

export default React.memo(InputItemCommon) as typeof InputItemCommon;
