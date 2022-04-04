import { CatIconButton, CatKeyboardIconButton, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { clearDraftFilter } from 'store/slices/users/filter/slice';
import { emptyFilter } from 'store/slices/users/filter/data';
import { selectDraftFilter } from 'store/slices/users/filter/selectors';
import { useFindObjectChangesCount, useTypedDispatch, useTypedSelector } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import FilterIcon from 'catamaran/icons/Filter';
import Node from 'components/Node';
import classes from '../Users.module.scss';
import clsx from 'clsx';

const FilterHeader = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const draftFilter = useTypedSelector(selectDraftFilter);
  const count = useFindObjectChangesCount(emptyFilter, draftFilter);
  const isFilterEdited = count > 0;

  const handleClearFilter = () => {
    dispatch(clearDraftFilter());
  };

  return (
    <div className={clsx(classes.filter_header, 'elev-2 opacity-9')}>
      <div className={clsx(classes.filter_header_left)}>
        <FilterIcon color="darkGrey" contained={false} hoverable={false} />
        <CatTypography variant="h2">{t('assets.assetFilter.title')}</CatTypography>
      </div>
      <div className={clsx(classes.filter_header_right)}>
        {isFilterEdited && (
          <>
            <Node
              className="mr8 h-full"
              value={
                <Trans
                  components={{ bold: <b /> }}
                  count={count}
                  i18nKey="users.filter.filtered_field_count"
                  t={t}
                />
              }
            />
            <CatIconButton onClick={handleClearFilter}>
              <FilterCancelIcon color="red" />
            </CatIconButton>
            <div className="divider-vertical" />
          </>
        )}
        <CatKeyboardIconButton keyboardKey="escape">
          <CancelIcon color="darkGrey" />
        </CatKeyboardIconButton>
      </div>
    </div>
  );
};

export default FilterHeader;
