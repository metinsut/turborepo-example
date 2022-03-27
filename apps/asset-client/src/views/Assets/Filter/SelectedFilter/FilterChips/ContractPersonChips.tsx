import { CatChip, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import {
  removeContractPerson,
  removeContractPersonNotAssigned
} from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: { contactPersons: string[]; noContactPerson: boolean };
  modal?: boolean;
}

interface ContactPersonChipProps {
  contactPerson?: string;
}

const ContractPersonChip = ({ contactPerson }: ContactPersonChipProps) => {
  const dispatch = useTypedDispatch();

  return (
    <CatChip
      className="mr4"
      label={contactPerson}
      onDelete={() => dispatch(removeContractPerson(contactPerson))}
    />
  );
};

const ContractPersonChips = ({ values, modal }: Props) => {
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
        {t('assets.assetFilter.contract_contact')}:
      </CatTypography>
      {values.contactPersons.map((contactPerson) => (
        <ContractPersonChip contactPerson={contactPerson} key={contactPerson} />
      ))}
      {values.noContactPerson && (
        <CatChip
          key="noContactPerson"
          label={
            <>
              {'<'}
              <Trans i18nKey="assets.assetFilter.blank" tOptions={{}} />
              {'>'}
            </>
          }
          onDelete={() => dispatch(removeContractPersonNotAssigned())}
        />
      )}
    </div>
  );
};

export default ContractPersonChips;
