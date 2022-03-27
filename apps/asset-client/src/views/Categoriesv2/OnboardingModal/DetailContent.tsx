import { CatDialogContent, CatTypography } from 'catamaran/core';
import { selectUserLanguage } from 'store/slices/session';
import { styled } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import BracketsIcon from 'catamaran/icons/Brackets';

const Image = styled('img')({
  height: '32px',
  width: '317px'
});

const DetailContent = () => {
  const { t } = useTranslation();
  const languageCode = useTypedSelector(selectUserLanguage);

  return (
    <CatDialogContent className="grid gap-24">
      <div className="grid gap-8 ">
        <Image
          alt="categories"
          src={`/static/images/onboarding/${languageCode}/category_item.png`}
        />
        <CatTypography>{t('asset_configurations.categories.onboarding.desc1')}</CatTypography>
      </div>
      <div className="divider-horizontal" />
      <div className="grid gap-8 ">
        <Image
          alt="categories"
          src={`/static/images/onboarding/${languageCode}/category_item.png`}
        />
        <div className="grid justify-item-center justify-self-start pl10">
          <BracketsIcon />
          <CatTypography variant="caption">
            {t('asset_configurations.categories.onboarding.category_code')}
          </CatTypography>
        </div>
        <CatTypography>{t('asset_configurations.categories.onboarding.desc2')}</CatTypography>
      </div>
      <div className="divider-horizontal" />
      <div className="grid gap-8">
        <img alt="categories" src={`/static/images/onboarding/${languageCode}/categories.png`} />
        <CatTypography>{t('asset_configurations.categories.onboarding.desc3')}</CatTypography>
        <Image alt="categories" src={`/static/images/onboarding/${languageCode}/approval.png`} />
      </div>
    </CatDialogContent>
  );
};

export default DetailContent;
