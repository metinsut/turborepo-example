import { AssociateItems, CheckedListType } from 'store/slices/categories/types';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Skeleton } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { getMainCategoryAssociate, removeCategory } from 'store/slices/categories/actions';
import { selectCategoryById } from 'store/slices/categories/selectors';
import {
  useCheckAllObjectValuesStatus,
  useTypedDispatch,
  useTypedSelector,
  withDialogWrapper
} from 'hooks';
import { useEffect, useState } from 'react';
import CheckAllItemsForDeleteCategory from './CheckAllItemsForDeleteCategory';
import InfoCautionIcon from 'catamaran/icons/InfoCaution';
import MissingItemForDeleteCategory from './MissingItemForDeleteCategory';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

interface Props {
  open: boolean;
  togglePopup: () => void;
  categoryId: string;
}

const checkItems: CheckedListType = {
  auto_flow: false,
  brand_model: false,
  breakdown_costs: false,
  breakdown_types: false,
  department: false,
  form_builder: false,
  maintenance_costs: false,
  retirement_reasons: false,
  sub_statuses: false,
  subcategories: false
};

const DeleteMainCategoryModal = ({ open, togglePopup, categoryId }: Props) => {
  const dispatch = useTypedDispatch();
  const [associate, setAssociate] = useState<AssociateItems>();
  const [checkList, setCheckList] = useState<CheckedListType>(checkItems);
  const isAllAssociateTrue = useCheckAllObjectValuesStatus(associate, false);
  const isAllCheckListTrue = useCheckAllObjectValuesStatus(checkList, true);
  const [loading, loadingDispatch] = useLoadingWithoutDispatch();
  const category = useTypedSelector((state) => selectCategoryById(state, categoryId));
  const { t } = useTranslation();

  const handleDeleteCategory = async (id: string) => {
    await dispatch(removeCategory(id));
    togglePopup();
  };

  const handleCheckBoxClick = (id: keyof CheckedListType) => {
    setCheckList((prevState): CheckedListType => {
      const newObject = { ...prevState };
      newObject[id] = !newObject[id];
      return newObject;
    });
  };

  useEffect(() => {
    const fetchAssociate = async () => {
      const associate = await dispatch(getMainCategoryAssociate(categoryId));
      setAssociate(associate);
    };
    loadingDispatch(fetchAssociate());
  }, [categoryId, dispatch, loadingDispatch]);

  const onClose = () => togglePopup();
  return (
    <CatDialog onAction={() => handleDeleteCategory(categoryId)} onClose={onClose} open={open}>
      <CatDialogTitle
        closable
        iconComponent={InfoCautionIcon}
        title={
          <Trans
            i18nKey={`categories.main_category_delete_modal.${
              isAllAssociateTrue ? 'delete_title' : 'no_delete_title'
            }`}
            t={t}
            values={{ categoryName: category?.name ?? '' }}
          />
        }
      />
      <CatDialogContent>
        {loading && <Skeleton />}
        {associate && (
          <MissingItemForDeleteCategory
            associate={associate}
            isAllAssociateTrue={isAllAssociateTrue}
          />
        )}
        {isAllAssociateTrue && associate && (
          <CheckAllItemsForDeleteCategory
            checkList={checkList}
            handleCheckBoxClick={handleCheckBoxClick}
          />
        )}
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton component={DeleteButton} disabled={!isAllCheckListTrue} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
};

export default withDialogWrapper(DeleteMainCategoryModal);
