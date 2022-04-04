import { CatChip, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import {
  removeInformationPurchasedFirm,
  removeInformationPurchasedFirmNotAssigned
} from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: { purchasedFirms: string[]; noPurchasedFirm: boolean };
  modal?: boolean;
}

interface PurcasedFirmChipProps {
  firm?: string;
}

const PurchasedFirmChip = ({ firm }: PurcasedFirmChipProps) => {
  const dispatch = useTypedDispatch();

  return (
    <CatChip
      className="mr4"
      label={firm}
      onDelete={() => dispatch(removeInformationPurchasedFirm(firm))}
    />
  );
};

const PurchasedFirmChips = ({ values, modal }: Props) => {
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
        {t('assets.assetFilter.purchased_firm')}:
      </CatTypography>
      {values.purchasedFirms.map((firm) => (
        <PurchasedFirmChip firm={firm} key={firm} />
      ))}
      {values.noPurchasedFirm && (
        <CatChip
          key="noPurchasedFirm"
          label={
            <>
              {'<'}
              <Trans i18nKey="assets.assetFilter.blank" tOptions={{}} />
              {'>'}
            </>
          }
          onDelete={() => dispatch(removeInformationPurchasedFirmNotAssigned())}
        />
      )}
    </div>
  );
};

export default PurchasedFirmChips;
