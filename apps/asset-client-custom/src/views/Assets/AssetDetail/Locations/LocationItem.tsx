import { Theme, makeStyles } from 'catamaran/core/mui';
import {
  checkLocation,
  expandLocation,
  setSelectedLocation
} from 'store/slices/asset/locations/actions';
import {
  isLocationChecked,
  selectIsLocationSelected,
  selectLocationById,
  selectLocationIsExpanded
} from 'store/slices/asset/locations/selectors';
import { useFormState } from 'hooks/useFormState';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import InputItem from 'components/InputItem/InputItem';
import React, { useCallback } from 'react';
import assetLocationValidator from 'helpers/validations/AssetLocationValidator';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

export type ItemSharedProps = {
  alwaysShowCheckbox?: boolean;
  allowModifyBrandModel?: boolean;
  checkable?: boolean;
  className?: string;
  deletable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  expandable?: boolean;
  level?: number;
  selectable?: boolean;
  validatable?: boolean;
};

type Props = ItemSharedProps & {
  className?: string;
  expandBodyActionEnabled?: boolean;
  locationId?: string;
  onExpand?: () => void;
  selectBodyActionEnabled?: boolean;
};

function LocationItem(props: Props) {
  const classes = useStyles();
  const {
    alwaysShowCheckbox,
    checkable,
    className,
    expandable = true,
    expandBodyActionEnabled = false,
    locationId,
    onExpand,
    selectable = false,
    selectBodyActionEnabled = false
  } = props;
  const dispatch = useTypedDispatch();

  const location = useTypedSelector((state) => selectLocationById(state, locationId));
  const expanded = useTypedSelector((state) => selectLocationIsExpanded(state, locationId));
  const selected = useTypedSelector((state) => selectIsLocationSelected(state, locationId));
  const checked = useTypedSelector((state) => isLocationChecked(state, locationId));
  const formHelper = useFormState(location, assetLocationValidator);

  const handleExpand = useCallback(async () => {
    await dispatch(expandLocation(location, !expanded));
    onExpand?.();
  }, [dispatch, location, expanded, onExpand]);

  const handleSelect = useCallback(async () => {
    dispatch(setSelectedLocation(locationId));
  }, [dispatch, locationId]);

  const handleCheck = useCallback(() => {
    dispatch(checkLocation(location));
  }, [dispatch, location]);

  return (
    <div className={clsx(classes.root, className)}>
      <InputItem
        alwaysShowCheckbox={alwaysShowCheckbox}
        bodyClickable
        checkable={checkable}
        checked={checked === true}
        defaultFocused={false}
        defaultReadonly
        deletable={false}
        editable={false}
        expandable={expandable}
        expandBodyClickActionEnabled={expandBodyActionEnabled}
        expandButtonDisabled={location.childLocationsCount === 0}
        expanded={expanded}
        formHelper={formHelper}
        formKey="name"
        indeterminate={checked === 'indeterminate'}
        inlineEditable={false}
        onCheck={handleCheck}
        onExpand={handleExpand}
        onSelect={handleSelect}
        selectable={selectable}
        selectBodyClickActionEnabled={selectBodyActionEnabled}
        selected={selected}
      />
    </div>
  );
}

export default LocationItem;
