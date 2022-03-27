import { ClickAwayListener, Grid } from 'catamaran/core/mui';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps
} from 'react-beautiful-dnd';
import { FormHelper } from 'hooks/useFormState';
import { useMountedState } from 'react-use';
import { useStyles } from './styles';
import InputItemCommon, { Adornment } from './InputItemCommon';
import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import useHover from 'hooks/useHover';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

type InputProps<T> = {
  addMode?: boolean;
  alwaysShowCheckbox?: boolean;
  bodyClickable?: boolean;
  checkable?: boolean;
  checked?: boolean;
  checkboxDisabled?: boolean;
  className?: string;
  defaultReadonly?: boolean;
  deletable?: boolean;
  disableHover?: boolean;
  draggable?: boolean;
  draggableProps?: DraggableProvidedDraggableProps;
  draggableRef?: (element?: HTMLElement) => any;
  draggableStyle?: any;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  editable?: boolean;
  editDisabled?: boolean;
  editDisabledTooltipTitle?: string;
  endAdornment?: Adornment[];
  expandable?: boolean;
  expandButtonDisabled?: boolean;
  expandBodyClickActionEnabled?: boolean;
  expanded?: boolean;
  formHelper?: FormHelper<T>;
  formKey?: keyof T & string;
  formKey2?: keyof T & string;
  indeterminate?: boolean;
  label?: string;
  label2?: string;
  onBeforeActionStart?: () => void;
  onCheck?: () => void;
  onClose?: () => void;
  onConfirm?: (entity: T) => Promise<T>;
  onDelete?: () => void;
  onExpand?: () => void;
  onSelect?: () => void;
  primaryKey?: keyof T & string;
  selectable?: boolean;
  selectButtonDisabled?: boolean;
  selectBodyClickActionEnabled?: boolean;
  selected?: boolean;
  validatable?: boolean;
};

function InputItemDouble<T>(props: InputProps<T>) {
  const {
    addMode,
    alwaysShowCheckbox,
    bodyClickable = false,
    checkable = false,
    checked,
    checkboxDisabled = false,
    className,
    defaultReadonly = true,
    deletable,
    disableHover,
    draggable = false,
    draggableProps,
    draggableRef,
    draggableStyle,
    dragHandleProps,
    editable,
    editDisabled,
    editDisabledTooltipTitle,
    endAdornment,
    expandable,
    expandBodyClickActionEnabled = false,
    expandButtonDisabled,
    expanded,
    formHelper,
    formKey,
    formKey2,
    indeterminate = false,
    label,
    label2,
    onBeforeActionStart,
    onCheck,
    onClose,
    onConfirm,
    onDelete,
    onExpand,
    onSelect,
    primaryKey,
    selectable = false,
    selectBodyClickActionEnabled = false,
    selectButtonDisabled,
    selected,
    validatable = false
  } = props;
  const classes = useStyles();

  const isMounted = useMountedState();

  const [readonly, setReadonly] = useState(defaultReadonly);
  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<T>();

  const handleCheck = useCallback(() => {
    if (onCheck) {
      onCheck();
    }
  }, [onCheck]);

  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect();
    }
  }, [onSelect]);

  const handleEdit = useCallback(() => {
    setReadonly(false);
  }, []);

  const handleClose = useCallback(() => {
    if (!readonly) {
      if (onClose) {
        onClose();
      }

      if (isMounted()) {
        formHelper.clear();
        setReadonly(true);
      }
    }
  }, [formHelper, isMounted, onClose, readonly]);

  const handleConfirm = useCallback(
    async (entity: T) => {
      let finalItem = entity;
      if (onConfirm) {
        finalItem = await asyncConfirmLoading(onConfirm(entity));
      }

      if (isMounted()) {
        formHelper.reset(finalItem);
        setReadonly(true);
      }

      return finalItem;
    },
    [onConfirm, isMounted, asyncConfirmLoading, formHelper]
  );

  const handleExpand = useCallback(() => {
    if (onExpand) {
      onExpand();
    }
  }, [onExpand]);

  const handleBodyClick = useCallback(
    (event: any) => {
      if (bodyClickable && readonly) {
        event.preventDefault();

        if (selectBodyClickActionEnabled) {
          if (selectable && !selectButtonDisabled) {
            handleSelect();
          }

          if (checkable && !checkboxDisabled) {
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
      checkboxDisabled,
      expandBodyClickActionEnabled,
      expandButtonDisabled,
      handleCheck,
      handleSelect,
      handleExpand,
      readonly,
      selectBodyClickActionEnabled,
      selectButtonDisabled,
      selectable
    ]
  );

  const [hover, hoverProps] = useHover();

  return (
    <ClickAwayListener
      mouseEvent={confirmLoading ? false : 'onMouseDown'}
      onClickAway={handleClose}
      touchEvent="onTouchStart"
    >
      <div onClick={handleBodyClick}>
        <Grid
          className={clsx({
            [classes.hover]: hover,
            [className]: true
          })}
          container
          {...hoverProps}
          {...draggableProps}
          ref={draggableRef}
          style={draggableStyle}
        >
          <Grid
            className={clsx({
              [classes.firstInputContainer]: true,
              [classes.draggableFirstInput]:
                (hover || alwaysShowCheckbox) && readonly && draggable && checkable,
              [classes.selectableFirstInput]:
                (hover || selected) && readonly && (selectable || (checkable && !draggable)),
              [classes.displayFirstInput]: true
            })}
            {...((!hover || disableHover) && dragHandleProps)}
            item
          >
            <InputItemCommon
              addMode={addMode}
              alwaysShowCheckbox={alwaysShowCheckbox}
              bodyClickable={bodyClickable}
              checkable={checkable}
              checked={checked}
              className={classes.firstInput}
              deletable={false}
              draggable={draggable}
              dragHandleProps={dragHandleProps}
              editable={false}
              expanded={expanded}
              formHelper={formHelper}
              formKey={formKey2}
              hover={disableHover ? false : hover}
              indeterminate={indeterminate}
              label={label}
              onBeforeActionStart={onBeforeActionStart}
              onCheck={handleCheck}
              onClose={handleClose}
              onSelect={handleSelect}
              primaryKey={primaryKey}
              readonly={readonly}
              searchable={false}
              selectable={selectable}
              selectButtonDisabled={selectButtonDisabled}
              selected={selected}
              validatable={false}
            />
          </Grid>
          <Grid
            className={clsx({
              [classes.draggableSecondInput]:
                (hover || alwaysShowCheckbox) && readonly && draggable && checkable,
              [classes.selectableSecondInput]:
                (hover || selected) && readonly && (selectable || (checkable && !draggable)),
              [classes.displaySecondInput]: true
            })}
            item
          >
            <InputItemCommon
              addMode={addMode}
              bodyClickable={bodyClickable}
              checkable={false}
              checked={checked}
              className={classes.secondInput}
              deletable={deletable}
              draggable={false}
              editable={editable}
              editDisabled={editDisabled}
              editDisabledTooltipTitle={editDisabledTooltipTitle}
              endAdornment={endAdornment}
              expandable={expandable}
              expandButtonDisabled={expandButtonDisabled}
              expanded={expanded}
              formHelper={formHelper}
              formKey={formKey}
              hover={disableHover ? false : hover}
              label={label2}
              loading={confirmLoading}
              onBeforeActionStart={onBeforeActionStart}
              onClose={handleClose}
              onConfirm={handleConfirm}
              onDelete={onDelete}
              onEdit={handleEdit}
              onExpand={handleExpand}
              primaryKey={primaryKey}
              readonly={readonly}
              searchable={false}
              selectable={false}
              selected={selected}
              validatable={validatable}
            />
          </Grid>
        </Grid>
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(InputItemDouble) as typeof InputItemDouble;
