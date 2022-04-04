import { Model, addModel } from 'store/slices/models';
import { SectionMode } from 'utils';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useFormState, useTypedDispatch } from 'hooks';
import { useTranslation } from 'react-i18next';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import ModelWarningAdornment from './ModelWarningAdornment';
import React from 'react';
import SearchDropdownHelper from 'components/CatamaranTextField/SearchDropdownHelper';
import Searchable from 'components/CatamaranTextField/Searchable';
import modelValidator from 'helpers/validations/ModelValidator';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useStyles = makeStyles((theme: Theme) => ({
  searchDropdownText: {
    padding: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
  brandId: string;
  displaySectionMode: SectionMode;
  model: Model;
  onConfirm: (model: Model) => Promise<Model>;
  onEditClick: () => void;
  searchableModels: Model[];
};

function ModelItem(props: Props, ref: React.Ref<HTMLDivElement>) {
  const classes = useStyles();
  const {
    className,
    brandId,
    displaySectionMode: mode,
    model = { name: '' },
    onConfirm,
    onEditClick,
    searchableModels
  } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const formHelper = useFormState(model, modelValidator);

  useDeepCompareEffect(() => {
    formHelper.setFormState(model);
  }, [model, formHelper.setFormState]);

  const handleAddNew = async (model: Model) => {
    const finalModel = (await dispatch(
      addModel(model, undefined, brandId, { showSnackBar: false })
    )) as Model;

    await onConfirm(finalModel);

    return finalModel;
  };

  const isBrandAdded = !!brandId;

  return (
    <Searchable
      className={className}
      formHelper={formHelper}
      minLengthForSearch={0}
      mode={mode === 'edit' && isBrandAdded ? 'editOnly' : 'editAndConfirm'}
      name="name"
      noItemElement={
        <Typography className={classes.searchDropdownText} variant="body1">
          {t('models.no_model_found')}
        </Typography>
      }
      onAddNew={handleAddNew}
      onConfirm={onConfirm}
      primaryKey="id"
      renderInput={(props) => (
        <CatamaranTextField
          adornments={[
            !isBrandAdded && {
              child: <ModelWarningAdornment key={1} />,
              hover: 'always',
              position: 'end',
              show: 'readonly'
            }
          ]}
          deletable={false}
          disabled={!isBrandAdded}
          inputRef={ref}
          isRequired
          label={t('assets.asset_edit.model_field_hint')}
          onEdit={onEditClick}
          validatable
          {...props}
        />
      )}
      searchHelperText={<SearchDropdownHelper messageKey="assets.asset_edit.model_dropdown_hint" />}
      searchOptions={searchableModels}
      showSearchHelperText
    />
  );
}

export default React.forwardRef(ModelItem);
