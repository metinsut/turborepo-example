import { CatTypography } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import LighthouseNoItemIcon from 'catamaran/icons/LighthouseNoItem';

function EmptyList() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-content-center h-half">
      <div className="justify-content-center flex-auto-flow-column flex mt64">
        <LighthouseNoItemIcon
          contained={false}
          containerClassName="text-48 justify-content-center"
          fontSize="inherit"
          hoverable={false}
        />
        <CatTypography align="center" className="mt16" variant="h1">
          {t('tasks.my_requests.empty_list.header')}
        </CatTypography>
        <CatTypography align="center" color="green" variant="h2">
          {t('tasks.my_requests.empty_list.description')}
        </CatTypography>
        <CatTypography align="center" variant="body1">
          {t('tasks.my_requests.empty_list.info')}
        </CatTypography>
      </div>
    </div>
  );
}

export default EmptyList;
