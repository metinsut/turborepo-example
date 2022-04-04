import { CatToggleButton } from 'catamaran/core';
import { selectIsActive, selectIsWaiting } from 'store/slices/users/filter/selectors';
import { selectTotalActiveUsers, selectTotalWaitingUsers } from 'store/slices/users/list/selectors';
import { updateExtraFilter } from 'store/slices/users/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CheckIcon from 'catamaran/icons/Check';
import PostIcon from 'catamaran/icons/Post';
import classes from '../../Users.module.scss';
import clsx from 'clsx';

const CenterAction = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const waitingUsers = useTypedSelector(selectTotalWaitingUsers);
  const isWaiting = useTypedSelector(selectIsWaiting);
  const activeUsers = useTypedSelector(selectTotalActiveUsers);
  const isActive = useTypedSelector(selectIsActive);

  const handleActive = () => {
    dispatch(updateExtraFilter('active'));
  };
  const handleWaiting = () => {
    dispatch(updateExtraFilter('waiting'));
  };

  return (
    <div className={clsx(classes.userList_header__center)}>
      <CatToggleButton
        closable
        color="green"
        icon={<CheckIcon />}
        onClick={handleActive}
        selected={isActive}
        subtitle={activeUsers.toString()}
        title={t('users.status.active')}
      />
      <CatToggleButton
        closable
        color="orange"
        icon={<PostIcon />}
        onClick={handleWaiting}
        selected={isWaiting}
        subtitle={waitingUsers.toString()}
        title={t('users.status.waiting')}
      />
    </div>
  );
};

export default CenterAction;
