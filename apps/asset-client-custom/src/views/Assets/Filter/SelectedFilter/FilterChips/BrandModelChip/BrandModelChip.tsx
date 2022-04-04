import { AssetFilterBrandModel } from 'store/slices/asset/filter/types';
import BrandChip from './BrandChip';
import classes from 'views/Users/Users.module.scss';
import clsx from 'clsx';

interface Props {
  values?: AssetFilterBrandModel[];
  modal: boolean;
}

const BrandModelChip = ({ values, modal }: Props) => (
  <>
    {values.map((brandModel) => (
      <div
        className={clsx(
          classes.selected_filter_chip_item,
          modal && classes.selected_filter_chip_item_modal
        )}
        key={brandModel.brand}
      >
        <BrandChip brandModel={brandModel} modal={modal} />
      </div>
    ))}
  </>
);

export default BrandModelChip;
