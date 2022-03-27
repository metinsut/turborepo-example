import { CatChip, CatTypography } from 'catamaran/core';
import { removeInformationCode } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

const CodeChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.code')}:
      </CatTypography>
      {values.map((code) => (
        <CatChip key={code} label={code} onDelete={() => dispatch(removeInformationCode(code))} />
      ))}
    </div>
  );
};

export default CodeChip;
