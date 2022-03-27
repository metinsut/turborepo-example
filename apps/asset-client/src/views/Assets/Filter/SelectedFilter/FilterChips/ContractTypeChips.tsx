import { CatChip, CatTypography } from 'catamaran/core';
import { removeContractType } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

const ContractTypeChips = ({ values, modal }: Props) => {
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
        {t('assets.assetFilter.contract_type')}:
      </CatTypography>
      {values.map((types) => (
        <CatChip
          key={types}
          label={t(`contracts.types.${types}`)}
          onDelete={() => dispatch(removeContractType(types))}
        />
      ))}
    </div>
  );
};

export default ContractTypeChips;
