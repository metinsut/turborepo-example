import { CatMenuItem, CatTypography } from 'catamaran/core';
import { useStyles } from './styles';
import React from 'react';
import clsx from 'clsx';

export function useFilteredOptions<TEntity>(
  filterValue: string,
  optionValues: TEntity[],
  formKey: keyof TEntity,
  primaryKey: keyof TEntity,
  onSearchSelect: (selectedOption: TEntity) => () => Promise<void>,
  mode: InputMode,
  isSearchOpen?: boolean
) {
  const classes = useStyles();
  const [cursor, setCursor] = React.useState(0);

  React.useEffect(() => {
    if (filterValue) {
      setCursor(0);
    }
  }, [filterValue]);

  return React.useMemo(() => {
    if (!optionValues || mode === 'readonly') {
      return null;
    }

    let perfectMatch: TEntity;
    const filterLower = filterValue.toLocaleLowerCase();

    const filteredValues = optionValues.filter((option) => {
      if (!option) {
        return null;
      }

      const searchField = option[formKey] as any as string;
      const isMatch = searchField.toLocaleLowerCase().match(`^${filterLower}`);
      if (!isMatch) {
        return false;
      }

      const isPerfectMatch = searchField.length === filterLower.length;
      if (isPerfectMatch) {
        perfectMatch = option;
      }

      return true;
    });

    const optionRefs = filteredValues.map((_) => React.createRef());

    const handleKeyDown = (e: any) => {
      if (!isSearchOpen || !options?.length) {
        return;
      }

      const isUpArrow = e.keyCode === 38;
      const isDownArrow = e.keyCode === 40;
      const isEnter = e.keyCode === 13;

      if (isUpArrow || isDownArrow || isEnter) {
        e.preventDefault();
        (optionRefs[cursor].current as any)?.scrollIntoView({ block: 'nearest' });
      }

      if (isUpArrow && cursor > 0) {
        setCursor((prevCursor) => prevCursor - 1);
      } else if (isDownArrow && cursor < filteredValues.length - 1) {
        setCursor((prevCursor) => prevCursor + 1);
      } else if (isEnter) {
        onSearchSelect(filteredValues[cursor])();
        e.target.blur();
      }
    };

    const options = filteredValues.map((option, index) => {
      const searchField = option[formKey] as any as string;
      const key = option[primaryKey] as any as string;

      return (
        <div key={key} ref={optionRefs[index] as React.RefObject<HTMLDivElement>}>
          <CatMenuItem
            className={clsx({
              [classes.activeListItem]: cursor === index
            })}
            onClick={onSearchSelect(option)}
          >
            <CatTypography variant="body2">
              <b>{searchField.substring(0, filterLower.length)}</b>
              {searchField.substring(filterLower.length)}
            </CatTypography>
          </CatMenuItem>
        </div>
      );
    });
    return {
      handleKeyDown,
      options: options.filter((i) => i !== null),
      perfectMatch
    };
  }, [
    classes.activeListItem,
    cursor,
    filterValue,
    formKey,
    isSearchOpen,
    mode,
    onSearchSelect,
    optionValues,
    primaryKey
  ]);
}

type InputMode = 'readonly' | 'add' | 'edit';

export function useSearchOpen(
  mode: InputMode,
  focused: boolean,
  formValue: string,
  showSearchHelperText: boolean,
  searchSelected: boolean,
  isFormValid: boolean
) {
  return React.useMemo(() => {
    const open =
      (mode === 'edit' || mode === 'add') &&
      (focused === undefined || focused) &&
      (formValue?.length > 2 || showSearchHelperText) &&
      searchSelected === false &&
      (isFormValid || showSearchHelperText);
    return open;
  }, [formValue, mode, searchSelected, showSearchHelperText, isFormValid, focused]);
}

export function useInputMode(readonly: boolean, addMode: boolean): InputMode {
  return React.useMemo(() => {
    if (readonly) {
      return 'readonly';
    }

    if (addMode) {
      return 'add';
    }

    return 'edit';
  }, [addMode, readonly]);
}
