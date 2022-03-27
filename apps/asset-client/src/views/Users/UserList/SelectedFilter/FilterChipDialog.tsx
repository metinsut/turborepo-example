import { CatDialog, CatDialogAction, CatDialogContent, CatDialogTitle } from 'catamaran/core';
import { UserFilter } from 'store/slices/users/filter/types';
import { useTranslation } from 'react-i18next';
import { withDialogWrapper } from 'hooks';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import FilteredList from './FilteredList';
import classes from '../../Users.module.scss';

interface Props {
  onClose: () => void;
  open: boolean;
  activeFilter: UserFilter;
}

const FilterChipDialog = ({ onClose, open, activeFilter }: Props) => {
  const { t } = useTranslation();
  return (
    <CatDialog onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={FilterCancelIcon}
        title={t('common.filters.filters')}
      />
      <CatDialogContent>
        <div className={classes.selected_filter_modal}>
          <FilteredList activeFilter={activeFilter} modal />
        </div>
      </CatDialogContent>
      <CatDialogAction />
    </CatDialog>
  );
};

export default withDialogWrapper(FilterChipDialog);
