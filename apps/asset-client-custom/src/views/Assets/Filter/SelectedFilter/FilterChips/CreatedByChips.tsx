import { CatChip, CatTypography } from 'catamaran/core';
import { removeInformationCreatedBy } from 'store/slices/asset/filter/slice';
import { selectPersonById } from 'store/slices/persons';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

interface CreatedByChipProps {
  createdByPersonId?: string;
}

const CreatedByChip = ({ createdByPersonId }: CreatedByChipProps) => {
  const dispatch = useTypedDispatch();
  const createdByPerson = useTypedSelector((state) => selectPersonById(state, createdByPersonId));

  return (
    <CatChip
      label={`${createdByPerson?.firstName} ${createdByPerson?.lastName}` ?? createdByPerson}
      onDelete={() => dispatch(removeInformationCreatedBy(createdByPersonId))}
    />
  );
};

const CreatedByChips = ({ values, modal }: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.created_by')}:
      </CatTypography>
      {values.map((createdById) => (
        <CreatedByChip createdByPersonId={createdById} key={createdById} />
      ))}
    </div>
  );
};

export default CreatedByChips;
