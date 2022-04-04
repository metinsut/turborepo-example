import { CatChip, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { removeContractFirm, removeContractFirmNotAssigned } from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: { contractFirms: string[]; noContractFirm: boolean };
  modal?: boolean;
}

interface ContractFirmChipProps {
  firm?: string;
}

const ContractFirmChip = ({ firm }: ContractFirmChipProps) => {
  const dispatch = useTypedDispatch();

  return (
    <CatChip className="mr4" label={firm} onDelete={() => dispatch(removeContractFirm(firm))} />
  );
};

const ContractFirmChips = ({ values, modal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.contract_firm')}:
      </CatTypography>
      {values.contractFirms.map((firm) => (
        <ContractFirmChip firm={firm} key={firm} />
      ))}
      {values.noContractFirm && (
        <CatChip
          key="noContractFirm"
          label={
            <>
              {'<'}
              <Trans i18nKey="assets.assetFilter.blank" tOptions={{}} />
              {'>'}
            </>
          }
          onDelete={() => dispatch(removeContractFirmNotAssigned())}
        />
      )}
    </div>
  );
};

export default ContractFirmChips;
