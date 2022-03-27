import { Theme, makeStyles } from 'catamaran/core/mui';
import { removePartItem, updatePartItem } from 'store/slices/contracts/slice';
import { useDebounce } from 'react-use';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import React from 'react';
import partItemValidator from 'helpers/validations/PartItemValidator';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  index: number;
  name: string;
};

export interface Part {
  name: string;
}

function PartsItem(props: Props) {
  const classes = useStyles();
  const { index, name } = props;

  const part: Part = {
    name
  };

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const formHelper = useFormState(part, partItemValidator);

  useDebounce(
    () => {
      const { name } = formHelper.formState.values;
      dispatch(updatePartItem({ index, part: name }));
    },
    1000,
    [dispatch, formHelper.formState.values]
  );

  const handleDelete = () => {
    dispatch(removePartItem(index));
  };

  const isNewItem = !name;

  return (
    <CatamaranTextField
      autoFocus={isNewItem}
      formHelper={formHelper}
      label={t('contracts.edit.parts.part_field', { number: index + 1 })}
      mode={isNewItem ? 'editOnly' : 'editAndConfirm'}
      name="name"
      onDelete={handleDelete}
    />
  );
}

export default PartsItem;
