import { CatToggleCard, CatTypography } from 'catamaran/core';
import { UserStatus } from 'store/slices/users/common/types';
import { availableStatuses } from 'store/slices/users/common/data';
import { selectFilterUserStatuses } from 'store/slices/users/filter/selectors';
import { updateUserStatuses } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import OkIcon from 'catamaran/icons/Ok';
import PostIcon from 'catamaran/icons/Post';
import RetireIcon from 'catamaran/icons/Retire';
import classes from '../../../Users.module.scss';
import clsx from 'clsx';

const icons = {
  active: <OkIcon alwaysHovered color="lightGreen" fontSize="small" />,
  resigned: <RetireIcon alwaysHovered color="darkGrey" fontSize="small" />,
  waiting: <PostIcon alwaysHovered color="lightOrange" fontSize="small" />
};

const StatusFilter = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const userStatuses = useTypedSelector(selectFilterUserStatuses);
  const handleToggleClick = (status: UserStatus) => {
    dispatch(updateUserStatuses(status));
  };

  return (
    <div className={clsx(classes.filter_item_wrapper, 'px16')}>
      <CatTypography variant="body2">{t('users.filter.status')}</CatTypography>
      <div className={classes.filter_status_toggle_wrapper}>
        {availableStatuses.map((status) => (
          <CatToggleCard
            className={classes.filter_status_toggle}
            keepIconColor
            key={status}
            onClick={() => handleToggleClick(status)}
            selected={userStatuses.includes(status)}
          >
            <div className={clsx(classes.filter_status_toggle_content, 'p6')}>
              {icons[status]}
              <CatTypography variant="caption">{t(`users.status.${status}`)}</CatTypography>
            </div>
          </CatToggleCard>
        ))}
      </div>
    </div>
  );
};
export default StatusFilter;
