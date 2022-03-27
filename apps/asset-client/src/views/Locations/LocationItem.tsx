import { Location } from 'store/slices/location/locations/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { checkLocation, expandLocation } from 'store/slices/location/locations/actions';
import {
  selectIsLocationExpanded,
  selectLocationById,
  selectLocationChecked
} from 'store/slices/location/locations/selectors';
import { useFormState, useTypedDispatch, useTypedSelector } from 'hooks';
import { useHistory } from 'react-router-dom';
import InputItem from 'components/InputItem/InputItem';
import React, { useCallback } from 'react';
import clsx from 'clsx';
import locationValidator from 'helpers/validations/LocationValidator';

const useStyles = makeStyles((theme: Theme) => ({
  notSearchResult: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: `${theme.palette.common.white} !important`
    },
    opacity: 0.8
  },
  root: {},
  searchResult: {}
}));

export type LocationItemSharedProps = {
  alwaysShowCheckbox?: boolean;
  checkable?: boolean;
  className?: string;
  deletable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  expandable?: boolean;
  expandButtonDisabled?: boolean;
  level?: number;
  searchModeActive?: boolean;
  selectable?: boolean;
};

type Props = LocationItemSharedProps & {
  id?: string;
  className?: string;
  disabled?: boolean;
  onDelete?: () => void;
  searchKeyword?: string;
  searchResult?: boolean;
};

function LocationItem(props: Props) {
  const classes = useStyles();
  const {
    alwaysShowCheckbox = false,
    className,
    checkable = true,
    deletable = true,
    disabled,
    editable = true,
    expandable = true,
    expandButtonDisabled = false,
    id,
    onDelete,
    searchKeyword,
    searchModeActive,
    searchResult = false,
    selectable = false
  } = props;

  const history = useHistory();
  const dispatch = useTypedDispatch();

  const location = useTypedSelector((state) => selectLocationById(state, id));
  const emptyLocation: Location = {};
  const formHelper = useFormState(location ?? emptyLocation, locationValidator);

  const expanded = useTypedSelector((state) => selectIsLocationExpanded(state, id));
  const checked = useTypedSelector((state) => selectLocationChecked(state, id));

  const handleExpand = useCallback(async () => {
    await dispatch(expandLocation(location, !expanded));
  }, [dispatch, location, expanded]);

  const handleEdit = () => {
    history.push(
      `/location/${location.branchId}/${location.locationLevelId}/${location.parentLocationId}/${location.id}`
    );
  };

  const handleCheck = useCallback(() => {
    dispatch(checkLocation(location));
  }, [dispatch, location]);

  if (
    searchKeyword &&
    !location.name.toLocaleLowerCase('tr-TR').includes(searchKeyword.toLocaleLowerCase('tr-TR'))
  ) {
    return null;
  }

  return (
    <div
      className={clsx({
        [classes.root]: true,
        className,
        [classes.searchResult]: searchModeActive && searchResult,
        [classes.notSearchResult]: searchModeActive && !searchResult
      })}
    >
      <InputItem
        alwaysShowCheckbox={alwaysShowCheckbox}
        checkable={checkable}
        checked={checked === true}
        defaultReadonly
        deletable={deletable}
        disabled={disabled}
        editable={editable}
        expandable={expandable && !searchResult}
        expandButtonDisabled={expandButtonDisabled}
        expanded={expanded}
        formHelper={formHelper}
        formKey="name"
        indeterminate={checked === 'indeterminate'}
        inlineEditable={false}
        onCheck={handleCheck}
        onDelete={onDelete}
        onEdit={handleEdit}
        onExpand={handleExpand}
        selectable={selectable}
      />
    </div>
  );
}

export default React.memo(LocationItem);
