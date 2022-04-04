import { CatCheckbox, CatMenuItem, CatSelect } from 'catamaran/core';
import { ListItemText } from 'catamaran/core/mui';
import { partPolicies } from 'store/slices/contracts/data';
import { selectDraftFilterContractPartsPolicy } from 'store/slices/asset/filter/selectors';
import { setFilterPartsPolicy } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import PartsPolicyItemIcon from 'views/Contracts/PartsPolicy/PartsPolicyItemIcon';

type Props = {
  className?: string;
};

function PartsPolicyFilter(props: Props) {
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedPartsPolicies = useTypedSelector(selectDraftFilterContractPartsPolicy);

  const getRenderValue = (value: string[]) => t('common.item_selected', { count: value.length });

  const selectMultiplePartsPolicy = (event: any) => {
    dispatch(setFilterPartsPolicy(event.target.value));
  };

  return (
    <>
      <CatSelect
        className={className}
        fullWidth
        label={t('assets.assetFilter.parts_policy')}
        multiple
        onChange={selectMultiplePartsPolicy}
        renderValue={(value) => getRenderValue(value as string[])}
        value={selectedPartsPolicies}
      >
        <CatMenuItem disabled key="" value="">
          {t('common.dropdown_generic_hint')}
        </CatMenuItem>
        {partPolicies.map((policy) => (
          <CatMenuItem key={policy} value={policy}>
            <CatCheckbox
              checked={selectedPartsPolicies.includes(policy)}
              style={{ padding: '6px' }}
            />
            <div className="flex align-items-center gap-16">
              <PartsPolicyItemIcon fontSize="small" partsPolicy={policy} />
              <ListItemText primary={t(`contracts.edit.parts.types.${policy}`)} />
            </div>
          </CatMenuItem>
        ))}
      </CatSelect>
    </>
  );
}

export default PartsPolicyFilter;
