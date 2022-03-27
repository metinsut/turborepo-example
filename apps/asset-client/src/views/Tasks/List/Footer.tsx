import { CatChip, CatTypography } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import styles from 'views/Users/Users.module.scss';

type Props = {
  taskCount: string;
};

const Footer = (props: Props) => {
  const { taskCount } = props;
  const { t } = useTranslation();
  const classes = 'bg-white radius-bot-16 w-full opacity-9 elev-7';

  return (
    <div className={clsx(styles.userList_footer, classes)}>
      <CatChip label={taskCount} size="small" variant="outlined" />
      <CatTypography className="ml8 opacity-6" variant="body2">
        {t('users.list.total_item')}
      </CatTypography>
    </div>
  );
};

export default Footer;
