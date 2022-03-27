import { CatChip, CatTypography } from 'catamaran/core';
import { removeJobTitle } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: string[];
  modal?: boolean;
}

const JobTitleChip = ({ values, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const removeJobTitleFromJobTitleArray = (jobTitle: string) => {
    dispatch(removeJobTitle(jobTitle));
  };
  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('users.filter.job_title')}:
      </CatTypography>
      {values.map((item: string) => (
        <CatChip key={item} label={item} onDelete={() => removeJobTitleFromJobTitleArray(item)} />
      ))}
    </div>
  );
};

export default JobTitleChip;
