import {
  Box,
  CatButton,
  CatDialog,
  CatDialogAction,
  CatDialogContent,
  CatDialogTitle
} from 'catamaran/core';
import { CancelButton } from 'catamaran/core/Button';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { dequal } from 'dequal';
import { emptyFilter } from 'store/slices/asset/filter/data';
import { saveFilter } from 'store/slices/asset/filter/actions';
import { selectDraftFilter } from 'store/slices/asset/filter/selectors';
import { useFormState, useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import FilterIcon from 'catamaran/icons/Filter';
import FilteredList from './SelectedFilter/FilteredList';
import UploadIcon from 'catamaran/icons/Upload';
import assetFilterSaveTitleValidator from 'helpers/validations/AssetFilterSaveTitleValidator';
import userClasses from 'views/Users/Users.module.scss';

const useStyles = makeStyles((theme: Theme) => ({
  textContainerBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '126px',
    justifyContent: 'space-between',
    marginBottom: '15px',
    width: '460px'
  }
}));

type Props = {
  className?: string;
  open: boolean;
  toggle: () => void;
};

function SaveFilterDialog(props: Props) {
  const classes = useStyles();
  const { className, open = false, toggle } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const draftFilter = useTypedSelector(selectDraftFilter);

  const formHelperTitle = useFormState({ title: '' }, assetFilterSaveTitleValidator);
  const isFilterEmpty = useMemo(() => dequal(emptyFilter, draftFilter), [draftFilter]);
  const saveButtonDisabled = !formHelperTitle.formState.isValid || isFilterEmpty;

  const handleSave = async () => {
    await dispatch(saveFilter(formHelperTitle.formState.values.title));
    toggle();
  };

  return (
    <div className={className}>
      <CatDialog onClose={toggle} open={open}>
        <CatDialogTitle
          closable
          iconComponent={FilterIcon}
          title={t('assets.assetFilter.save_filter')}
        />
        <CatDialogContent>
          <Box className={classes.textContainerBox}>
            <Typography variant="body1">
              {t('assets.assetFilter.save_filter_dialog_texts.filter_will_be_saved')}
            </Typography>
            <Typography variant="body1">
              {t('assets.assetFilter.save_filter_dialog_texts.filter_will_derive_from_criteria')}
            </Typography>
            <Typography variant="body1">
              {t('assets.assetFilter.save_filter_dialog_texts.access_saved_filter')}
            </Typography>
          </Box>
          <div
            className={userClasses.selected_filter_modal}
            style={{ height: 'auto', maxHeight: '200px' }}
          >
            <FilteredList activeFilter={draftFilter} modal />
          </div>
          <CatamaranTextField
            className="my24"
            deletable={false}
            formHelper={formHelperTitle}
            isRequired
            label={t('assets.assetFilter.title_of_the_filter')}
            mode="editOnly"
            name="title"
            validatable
          />
          <Box center className="pt8" flex>
            <CancelButton onClick={toggle} />
            <Divider orientation="vertical" style={{ height: '16px', margin: '0 8px' }} />
            <CatButton
              color="green"
              disabled={saveButtonDisabled}
              endIcon={<UploadIcon />}
              onClick={handleSave}
              size="large"
            >
              {t('common.save')}
            </CatButton>
          </Box>
        </CatDialogContent>
        <CatDialogAction />
      </CatDialog>
    </div>
  );
}

export default withDialogWrapper(SaveFilterDialog);
