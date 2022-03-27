import { AssociateItems } from 'store/slices/categories/types';
import { CatDialogCheckItem, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface Props {
  associate: AssociateItems;
  isAllAssociateTrue: boolean;
}

const MissingItemForDeleteCategory = ({ associate, isAllAssociateTrue }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="grid gap-24">
      <div className="mb8">
        <CatTypography variant="body1">
          <Trans
            components={{ bold: <b /> }}
            i18nKey={`categories.main_category_delete_modal.${
              isAllAssociateTrue ? 'delete_warning' : 'no_delete_warning'
            }`}
            t={t}
          />
        </CatTypography>
      </div>
      <div className={clsx('grid', isAllAssociateTrue ? 'gap-8' : 'gap-16')}>
        <CatDialogCheckItem
          text={
            <Trans
              components={{ bold: <b /> }}
              i18nKey="categories.main_category_delete_modal.no_user"
              t={t}
            />
          }
          valid={associate.user}
        />
        <CatDialogCheckItem
          text={
            <Trans
              components={{ bold: <b /> }}
              i18nKey="categories.main_category_delete_modal.no_asset"
              t={t}
            />
          }
          valid={associate.asset}
        />
        <CatDialogCheckItem
          text={
            <Trans
              components={{ bold: <b /> }}
              i18nKey="categories.main_category_delete_modal.no_contract"
              t={t}
            />
          }
          valid={associate.contract}
        />
        <CatDialogCheckItem
          text={
            <Trans
              components={{ bold: <b /> }}
              i18nKey="categories.main_category_delete_modal.no_plan"
              t={t}
            />
          }
          valid={associate.plan}
        />
      </div>
    </div>
  );
};

export default MissingItemForDeleteCategory;
