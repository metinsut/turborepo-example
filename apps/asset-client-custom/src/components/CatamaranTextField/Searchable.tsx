/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import {
  CircularProgress,
  ClickAwayListener,
  Paper,
  Popper,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { FormHelper } from 'hooks/useFormState';
import { useFilteredOptions } from 'components/InputItem/helpers';
import { useMountedState } from 'react-use';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { useCallback, useEffect, useState } from 'react';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

const useStyles = makeStyles((theme: Theme) => ({
  circularProgress: {
    justifySelf: 'center'
  },
  content: {
    borderRadius: 16,
    padding: theme.spacing(2, 0, 2, 0)
  },
  scrollContainer: {
    display: 'grid',
    maxHeight: 96
  },
  searchDropdownText: {
    padding: theme.spacing(1)
  }
}));

type Props<T> = {
  className?: string;
  autoFocus?: boolean;
  fixedRowBottom?: React.ReactNode;
  fixedRowTop?: React.ReactNode;
  formHelper: FormHelper<T>;
  minLengthForSearch?: number;
  mode?: 'editOnly' | 'editAndConfirm';
  name: keyof T;
  noItemElement?: React.ReactNode;
  onAddNew?: (option: T) => Promise<T>;
  onConfirm?: (value: T) => Promise<T>;
  onClose?: () => void;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onSearchSelect?: (option: T) => void;
  primaryKey: keyof T;
  renderInput: (params: ChildInputParams<T>) => React.ReactNode;
  searchOptions?: T[];
  searchHelperText?: React.ReactNode;
  searchItemsLoading?: boolean;
  showSearchHelperText?: boolean;
  startWithEditMode?: boolean;
};

export type ChildInputParams<T> = {
  autoFocus?: boolean;
  confirmButtonMode?: 'add' | 'check';
  editMode?: boolean;
  focused?: boolean;
  formHelper: FormHelper<T>;
  loading?: boolean;
  mode?: 'editOnly' | 'editAndConfirm';
  name: keyof T;
  onBlur?: (event: any) => void;
  onConfirm?: (value: T) => Promise<T>;
  onClose?: () => void;
  onFocus?: (event: any) => void;
  onEditModeChange?: (editMode: boolean) => void;
};

function Searchable<T>(props: Props<T>) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    className,
    fixedRowBottom,
    fixedRowTop,
    autoFocus = false,
    formHelper,
    minLengthForSearch = 1,
    mode,
    name,
    noItemElement = (
      <Typography className={classes.searchDropdownText} variant="body1">
        {t('common.search_not_found')}
      </Typography>
    ),
    onAddNew,
    onConfirm,
    onClose,
    onMouseOver,
    onMouseLeave,
    onSearchSelect,
    primaryKey,
    renderInput,
    searchOptions = [],
    searchHelperText,
    searchItemsLoading,
    showSearchHelperText,
    startWithEditMode = false
  } = props;

  const { formState } = formHelper;
  const popperAnchorRef = React.useRef();
  const isMounted = useMountedState();

  const [focus, setFocus] = useState(autoFocus);
  const [childEditMode, setChildEditMode] = useState(mode === 'editOnly' || startWithEditMode);

  useEffect(() => {
    setChildEditMode(mode === 'editOnly' || startWithEditMode);
  }, [mode, startWithEditMode]);

  const [loading, asyncConfirmLoading] = useLoadingWithoutDispatch<T>();
  const [searchSelected, setSearchSelected] = React.useState(false);

  const isValueLongEnough = (formState.values[name] as any as string)?.length >= minLengthForSearch;
  const showHelperText = !isValueLongEnough && showSearchHelperText;
  const isSearchOpen =
    focus && (isValueLongEnough || showSearchHelperText) && childEditMode && !searchSelected;

  const handleClose = useCallback(() => {
    onClose?.();
    setFocus(false);

    if (mode !== 'editOnly') {
      setChildEditMode(false);
    }
  }, [onClose, mode]);

  const handleSearchSelect = useCallback(
    (option: T) => async () => {
      setSearchSelected(true);
      formHelper.setFormState(option);
      if (option[primaryKey] !== formState.defaultValues[primaryKey]) {
        await onSearchSelect?.(option);
        await asyncConfirmLoading(onConfirm?.(option));
      }

      formHelper.reset(option);
      if (isMounted()) {
        handleClose();
      }
    },
    [
      asyncConfirmLoading,
      formHelper,
      formState.defaultValues,
      handleClose,
      isMounted,
      onConfirm,
      onSearchSelect,
      primaryKey
    ]
  );

  const {
    options: filteredOptions,
    perfectMatch,
    handleKeyDown
  } = useFilteredOptions(
    formState.values[name] as any as string,
    searchOptions,
    name,
    primaryKey,
    handleSearchSelect,
    'edit',
    isSearchOpen && !showHelperText
  ) ?? {};

  const handleInputConfirm = async (value: T): Promise<T> => {
    let finalItem = value;

    // If add button is clicked
    if (confirmButtonMode === 'add') {
      finalItem = await asyncConfirmLoading(onAddNew(value));
    } else {
      finalItem = await handleConfirm(finalItem);
    }

    if (isMounted()) {
      handleClose();
    }

    return finalItem;
  };

  const handleConfirm = async (value: T): Promise<T> => {
    let entity: T = value;
    if (perfectMatch) {
      entity = perfectMatch;
    }

    let finalValue = entity;

    if (onConfirm) {
      finalValue = await asyncConfirmLoading(onConfirm(entity));
    }

    return finalValue;
  };

  const handleBlur = async () => {
    const isChanged = !!formState.touchedFields[name];
    const hasError = !!formState.errors[name];

    // Confirm if there is a perfect match
    if (!focus && isChanged && perfectMatch) {
      handleConfirm(formState.values);
    }

    // Show an error if changes are not confirmed
    if (!focus && isChanged && !perfectMatch && !hasError) {
      formHelper.setManualErrorForField(name, t('errors.add_or_confirm'));
    }

    // Close if nothing is changed
    if (!focus && !isChanged && mode === 'editAndConfirm') {
      handleClose();
    }
  };

  const handleFocus = () => {
    setFocus(true);
    setSearchSelected(false);
    formHelper.clearManualErrorForField(name);
  };

  const confirmButtonMode = perfectMatch ? 'check' : 'add';

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      onClickAway={() => setFocus(false)}
      touchEvent="onTouchStart"
    >
      <div
        className={className}
        onKeyDown={handleKeyDown}
        onMouseLeave={onMouseLeave}
        onMouseOver={onMouseOver}
        ref={popperAnchorRef}
      >
        {renderInput({
          autoFocus,
          confirmButtonMode: perfectMatch ? 'check' : 'add',
          editMode: childEditMode,
          focused: focus,
          formHelper,
          loading,
          mode,
          name,
          onBlur: handleBlur,
          onClose: handleClose,
          onConfirm: handleInputConfirm,
          onEditModeChange: (editMode: boolean) => setChildEditMode(editMode),
          onFocus: handleFocus
        })}
        {popperAnchorRef.current && (
          <Popper
            anchorEl={popperAnchorRef.current}
            open={!!isSearchOpen}
            style={{
              width: (popperAnchorRef.current as any).clientWidth,
              zIndex: 1300
            }}
          >
            <Paper className={classes.content}>
              {!showHelperText && filteredOptions?.length !== 0 && fixedRowTop}
              <PerfectScrollbar className={classes.scrollContainer}>
                {showHelperText && searchHelperText}
                {!showHelperText &&
                  filteredOptions?.length === 0 &&
                  (searchItemsLoading ? (
                    <CircularProgress className={classes.circularProgress} />
                  ) : (
                    noItemElement
                  ))}
                {!showHelperText && filteredOptions}
              </PerfectScrollbar>
              {!showHelperText && filteredOptions?.length !== 0 && fixedRowBottom}
            </Paper>
          </Popper>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default Searchable;
