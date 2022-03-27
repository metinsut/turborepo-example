import { CatChip } from 'catamaran/core';
import { TFunction, Trans, useTranslation } from 'react-i18next';
import { removeNoContractTypes } from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: { contractTypes: string[]; noContract: boolean };
  modal?: boolean;
}

const noContractsText = (contractTypes: string[], t: TFunction<'translation'>) => {
  const text = contractTypes.map((contractType) => t(`contracts.types.${contractType}`)).join(', ');
  return text;
};

const NoContractAssignedChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatChip
        className="mr4"
        label={
          <Trans
            components={{ italic: <i /> }}
            i18nKey="assets.assetFilter.not_have_contracts"
            t={t}
            values={{ type: noContractsText(values.contractTypes, t) }}
          />
        }
        onDelete={() => dispatch(removeNoContractTypes())}
      />
    </div>
  );
};

export default NoContractAssignedChip;
