import { Box, ClickAwayListener, Grid } from 'catamaran/core/mui';
import { useMountedState } from 'react-use';
import { useStyles } from './styles';
import InputItemCommon, { InputProps } from './InputItemCommon';
import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type Props<T> = InputProps<T> & {
  borderRadius?: 'small' | 'medium';
  className?: string;
  closeOnClickAway?: boolean;
  inlineEditable?: boolean;
  defaultFocused?: boolean;
  defaultReadonly?: boolean;
  expandBodyClickActionEnabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  selectBodyClickActionEnabled?: boolean;
};

function InputItem<T>(props: Props<T>) {
  const {
    borderRadius = 'medium',
    bodyClickable = false,
    closeOnClickAway = true,
    confirmable = true,
    checkable = false,
    checked,
    className,
    defaultFocused,
    defaultReadonly = false,
    expandBodyClickActionEnabled = false,
    expandButtonDisabled,
    formHelper,
    inlineEditable = true,
    onCheck,
    onClose,
    onConfirm,
    onEdit,
    onExpand,
    onMouseEnter,
    onMouseLeave,
    onSelect,
    selectBodyClickActionEnabled = false,
    selectable = false,
    ...rest
  } = props;
  const classes = useStyles();

  const isMounted = useMountedState();

  const [focused, setFocused] = useState(defaultFocused ?? !defaultReadonly);
  const [readonly, setReadonly] = useState(defaultReadonly);
  const [hover, setHover] = useState(false);
  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<T>();

  const handleCheck = useCallback(() => {
    if (onCheck) {
      onCheck();
    }
  }, [onCheck]);

  const handleEdit = useCallback(() => {
    setFocused(true);
    onEdit?.();

    if (inlineEditable) {
      setReadonly(false);
    }
  }, [inlineEditable, onEdit]);

  const handleConfirm = useCallback(
    async (entity: T) => {
      let finalItem = entity;
      if (onConfirm) {
        finalItem = await asyncConfirmLoading(onConfirm(entity));
      }

      if (isMounted()) {
        formHelper.reset(finalItem);
        setFocused(false);
        setReadonly(true);
      }

      return finalItem;
    },
    [asyncConfirmLoading, onConfirm, isMounted, formHelper]
  );

  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  const handleExpand = useCallback(() => {
    if (onExpand) {
      onExpand();
    }
  }, [onExpand]);

  const handleClose = useCallback(() => {
    setFocused(false);
    if (!confirmable || !closeOnClickAway) {
      return;
    }

    if (!readonly) {
      if (onClose) {
        onClose();
      }

      if (isMounted()) {
        formHelper.clear();
        setReadonly(true);
      }
    }
  }, [closeOnClickAway, confirmable, readonly, formHelper, isMounted, onClose]);

  const handleFocus = useCallback(() => setFocused(true), []);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
    if (onMouseEnter) {
      onMouseEnter();
    }
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  }, [onMouseLeave]);

  const handleBodyClick = useCallback(
    (event: any) => {
      if (bodyClickable && readonly) {
        event.preventDefault();

        if (selectBodyClickActionEnabled) {
          if (selectable) {
            handleSelect();
          }

          if (checkable) {
            handleCheck();
          }
        }

        if (expandBodyClickActionEnabled && !expandButtonDisabled) {
          handleExpand();
        }
      }
    },
    [
      bodyClickable,
      checkable,
      expandBodyClickActionEnabled,
      expandButtonDisabled,
      handleCheck,
      handleSelect,
      handleExpand,
      readonly,
      selectBodyClickActionEnabled,
      selectable
    ]
  );
  return (
    <ClickAwayListener
      mouseEvent={confirmLoading ? false : 'onMouseDown'}
      onClickAway={handleClose}
      touchEvent="onTouchStart"
    >
      <div className={className} onClick={handleBodyClick}>
        <Grid
          className={clsx({
            [classes.hover]: hover
          })}
          container
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <InputItemCommon
            {...rest}
            bodyClickable={bodyClickable}
            checkable={checkable}
            checked={checked}
            className={clsx({
              [classes.singleInput]: borderRadius === 'medium',
              [classes.formInput]: borderRadius === 'small'
            })}
            confirmable={confirmable}
            expandButtonDisabled={expandButtonDisabled}
            focused={focused}
            formHelper={formHelper}
            hover={hover}
            loading={confirmLoading}
            onCheck={handleCheck}
            onClose={handleClose}
            onConfirm={handleConfirm}
            onEdit={handleEdit}
            onExpand={onExpand}
            onFocus={handleFocus}
            onSelect={handleSelect}
            readonly={readonly}
            selectable={selectable}
          />
        </Grid>
        <Box height={5} />
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(InputItem) as any as typeof InputItem;
