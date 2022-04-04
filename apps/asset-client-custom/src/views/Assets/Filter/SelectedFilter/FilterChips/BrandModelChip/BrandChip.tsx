import { AssetFilterBrandModel } from 'store/slices/asset/filter/types';
import { CatChip, CatTypography } from 'catamaran/core';
import { removeInformationBrand } from 'store/slices/asset/filter/slice';
import { selectBrandById } from 'store/slices/brands/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import ModelChip from './ModelChip';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  brandModel?: AssetFilterBrandModel;
  modal: boolean;
}

const BrandChip = ({ brandModel, modal }: Props) => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const brandName = useTypedSelector((state) => selectBrandById(state, brandModel.brand)).name;

  return (
    <div
      className={clsx(
        classes.selected_filter_chip_item,
        modal && classes.selected_filter_chip_item_modal
      )}
    >
      <CatTypography className="no-wrap" color="inherit" variant="body2">
        {t('assets.assetFilter.brand')}:
      </CatTypography>
      <CatChip
        label={brandName}
        onDelete={() => dispatch(removeInformationBrand(brandModel.brand))}
      />
      {brandModel.models.length !== 0 && (
        <>
          <ArrowRightIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
          <CatTypography className="no-wrap" color="inherit" variant="body2">
            {t('assets.assetFilter.model')}:
          </CatTypography>
          {brandModel.models.map((modelId) => (
            <div key={modelId}>
              <ModelChip brandId={brandModel.brand} modelId={modelId} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BrandChip;
