import { AssetStatus } from 'store/slices/common/types';
import { CatChip, CatTypography } from 'catamaran/core';
import { emptyFilter } from 'store/slices/asset/filter/data';
import { removeInformationStatus } from 'store/slices/asset/filter/slice';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: AssetStatus[];
  modal?: boolean;
}

const StatusChips = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const changedStatuses = useMemo(
    () => emptyFilter.information.statusTypes.filter((type) => !values.includes(type)),
    [values]
  );

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.status')}:
      </CatTypography>
      {changedStatuses.map((status) => (
        <CatChip
          key={status}
          label={t(`assets.assetFilter.statuses.${status}`)}
          onDelete={() => dispatch(removeInformationStatus(status))}
        />
      ))}
    </div>
  );
};

export default StatusChips;
