import { CatCheckbox, CatMenuItem, CatSelect } from 'catamaran/core';
import { ListItemText } from 'catamaran/core/mui';
import { contractTypes } from 'store/slices/contracts/data';
import { selectDraftFilterContractTypes } from 'store/slices/asset/filter/selectors';
import { setFilterContractTypes } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';

type Props = {
  className?: string;
  disabled?: boolean;
};

function ContractTypeFilter(props: Props) {
  const { className, disabled = false } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedContractTypes = useTypedSelector(selectDraftFilterContractTypes);

  const getRenderValue = (value: string[]) => t('common.item_selected', { count: value.length });

  const handleMultiple = (event: any) => {
    dispatch(setFilterContractTypes(event.target.value));
  };

  return (
    <>
      <CatSelect
        className={className}
        disabled={disabled}
        fullWidth
        label={t('assets.assetFilter.contract_type')}
        multiple
        onChange={handleMultiple}
        renderValue={(value) => getRenderValue(value as string[])}
        value={selectedContractTypes}
      >
        <CatMenuItem disabled key="" value="">
          {t('common.dropdown_generic_hint')}
        </CatMenuItem>
        {contractTypes.map((type) => (
          <CatMenuItem key={type} value={type}>
            <CatCheckbox
              checked={selectedContractTypes.includes(type)}
              style={{ marginRight: '12px' }}
            />
            <ListItemText primary={t(`contracts.types.${type}`)} />
          </CatMenuItem>
        ))}
      </CatSelect>
    </>
  );
}

export default ContractTypeFilter;
