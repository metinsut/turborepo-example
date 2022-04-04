import { CatChip, CatTypography } from 'catamaran/core';
import {
  selectCheckedTotalUserLength,
  selectTotalAllUser
} from 'store/slices/users/list/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import SelectCounter from 'components/SelectCounter';
import clsx from 'clsx';
import styles from '../Users.module.scss';

const Footer = () => {
  const { t } = useTranslation();
  const totalItem = useTypedSelector(selectTotalAllUser);
  const checkedUserLength = useTypedSelector(selectCheckedTotalUserLength);
  const classes = 'bg-white radius-bot-16 w-full opacity-9 elev-7';

  return (
    <div className={clsx(styles.userList_footer, classes)}>
      <CatChip label={totalItem.toString()} size="small" variant="outlined" />
      <CatTypography className="ml8 opacity-6" variant="body2">
        {t('users.list.total_item')}
      </CatTypography>
      {checkedUserLength > 0 && (
        <>
          <span className="divider-vertical mx16" />
          <SelectCounter count={checkedUserLength} size="small" />
          <CatTypography className="ml8" variant="body2">
            {t('common.selected')}
          </CatTypography>
        </>
      )}
    </div>
  );
};

export default Footer;
