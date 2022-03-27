import { CatChip, CatTypography } from 'catamaran/core';
import { removeBranch } from 'store/slices/asset/filter/slice';
import { selectBranchNameById } from 'store/slices/branches';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

interface ChipProps {
  item?: string;
}

const ChipLabel = ({ item }: ChipProps) => {
  const branchName = useTypedSelector((state) => selectBranchNameById(state, item));
  return <span>{branchName}</span>;
};

const BranchesChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const removeBranchFromFilter = (branch: string) => {
    dispatch(removeBranch(branch));
  };

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.branch')}:
      </CatTypography>
      {values.map((item: string) => (
        <CatChip
          key={item}
          label={<ChipLabel item={item} />}
          onDelete={() => removeBranchFromFilter(item)}
        />
      ))}
    </div>
  );
};

export default BranchesChip;
