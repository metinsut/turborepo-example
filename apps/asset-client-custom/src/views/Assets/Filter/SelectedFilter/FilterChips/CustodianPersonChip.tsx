import { CatChip, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import {
  removeInformationCustody,
  removeInformationCustodyNotAssigned
} from 'store/slices/asset/filter/slice';
import { selectPersonById } from 'store/slices/persons';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: { custodies: string[]; noCustody: boolean };
  modal?: boolean;
}

interface CustodianPersonChipProps {
  custodianId?: string;
}

const CustodianPersonChip = ({ custodianId }: CustodianPersonChipProps) => {
  const dispatch = useTypedDispatch();
  const custodian = useTypedSelector((state) => selectPersonById(state, custodianId));

  return (
    <CatChip
      className="mr4"
      label={`${custodian?.firstName} ${custodian?.lastName}` ?? custodianId}
      onDelete={() => dispatch(removeInformationCustody(custodianId))}
    />
  );
};

const CustodianPersonChips = ({ values, modal }: Props) => {
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
        {t('assets.assetFilter.custodian_person')}:
      </CatTypography>
      {values.custodies.map((custodianId) => (
        <CustodianPersonChip custodianId={custodianId} key={custodianId} />
      ))}
      {values.noCustody && (
        <CatChip
          key="noCustody"
          label={
            <>
              {'<'}
              <Trans i18nKey="assets.assetFilter.blank" tOptions={{}} />
              {'>'}
            </>
          }
          onDelete={() => dispatch(removeInformationCustodyNotAssigned())}
        />
      )}
    </div>
  );
};

export default CustodianPersonChips;
