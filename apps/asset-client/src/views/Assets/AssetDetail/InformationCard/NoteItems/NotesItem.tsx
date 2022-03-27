import { Asset } from 'store/slices/asset/detail/types';
import { FormHelper } from 'hooks/useFormState';
import { SectionMode } from 'utils';
import { setAssetNotes } from 'store/slices/asset/detail/slice';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import React from 'react';

type Props = {
  className?: string;
  formHelper: FormHelper<Asset>;
  mode?: SectionMode;
  onEditClick?: () => void;
};

function NotesItem(props: Props) {
  const { className, formHelper, mode, onEditClick } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  useDebounce(
    () => {
      dispatch(setAssetNotes(formHelper.formState.values.notes));
    },
    500,
    [dispatch, formHelper.formState.values.notes]
  );

  return (
    <CatamaranTextField
      className={className}
      deletable={false}
      formHelper={formHelper}
      label={t('assets.asset_edit.notes_field_hint')}
      mode={mode === 'edit' ? 'editOnly' : 'editAndConfirm'}
      multiline
      name="notes"
      onEdit={onEditClick}
    />
  );
}

export default NotesItem;
