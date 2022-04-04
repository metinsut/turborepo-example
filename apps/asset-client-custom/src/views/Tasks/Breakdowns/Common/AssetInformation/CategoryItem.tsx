import {
  CatCenterIcon,
  CatDataCard,
  CatEmptyIcon,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { Category } from 'store/slices/categories/types';
import { isObjectNullOrEmpty } from 'utils';
import { useGetImage } from 'hooks/useGetImage';
import Category2Icon from 'catamaran/icons/Category2';
import clsx from 'clsx';
import styles from '../BreakdownCommon.module.scss';

type Props = {
  categories: Category[];
  modelPhotoPath?: string;
};

function CategoryItem({ categories, modelPhotoPath }: Props) {
  const { imageLoading, imageUrl } = useGetImage(modelPhotoPath);

  return (
    <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
      <CatSidebar>
        <CatEmptyIcon />
        <CatCenterIcon component={Category2Icon} />
        <CatEmptyIcon />
      </CatSidebar>
      <CatMainContent>
        <div className="grid justify-content-between h-full grid-auto-flow-column">
          <div className="grid gap-4 align-content-start">
            <CatTypography variant="body1">{categories[categories.length - 1]?.name}</CatTypography>
            <CatTypography className="ml16 opacity-6" variant="caption">
              <ul>
                {categories.slice(0, -1).map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </CatTypography>
          </div>
          {!isObjectNullOrEmpty(imageUrl) && !imageLoading && (
            <div className={clsx('radius-8', styles.asset_info_img)}>
              <img alt={imageUrl} src={imageUrl} />
            </div>
          )}
        </div>
      </CatMainContent>
    </CatDataCard>
  );
}

export default CategoryItem;
