import { CatCheckbox, CatMenuItem, CatSelect } from 'catamaran/core';
import { ListItemText, Typography } from 'catamaran/core/mui';
import { contractTypes } from 'store/slices/contracts/data';
import { doesNotHaveContractCheckbox } from 'store/slices/asset/filter/actions';
import {
  selectDraftFilterNoContractAssigned,
  selectDraftFilterNoContractTypes
} from 'store/slices/asset/filter/selectors';
import { setFilterNoContractTypes } from 'store/slices/asset/filter/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';

function DoesNotHaveContractFilter() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const noContract = useTypedSelector(selectDraftFilterNoContractAssigned);
  const selectedContractTypes = useTypedSelector(selectDraftFilterNoContractTypes);
  const allContractTypesSelected = selectedContractTypes.length === contractTypes.length;
  const someContractsSelected = !allContractTypesSelected && selectedContractTypes.length > 0;

  const getRenderValue = (value: string[]) => {
    if (value.length === 0 || value.length === contractTypes.length) {
      return t('assets.assetFilter.all_contracts');
    }
    return t('common.item_selected', { count: value.length });
  };

  const handleCheckboxClick = () => {
    dispatch(doesNotHaveContractCheckbox());
  };

  const handleMultiple = (event: any) => {
    const isAllCheckClicked = event.target.value.includes('all-selected');
    if (isAllCheckClicked && !allContractTypesSelected) {
      dispatch(setFilterNoContractTypes(contractTypes));
    } else if (isAllCheckClicked && allContractTypesSelected) {
      dispatch(setFilterNoContractTypes([]));
    } else {
      dispatch(setFilterNoContractTypes(event.target.value));
    }
  };

  return (
    <>
      <div
        className="grid grid-auto-flow-column align-items-center gap-8 w-full"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <div className="divider-horizontal" />
        <Typography>{t('assets.assetFilter.or')}</Typography>
        <div className="divider-horizontal" />
      </div>
      <label
        className="flex align-items-center cursor-pointer w-full"
        htmlFor="doesNotHaveContract"
      >
        <CatCheckbox
          checked={noContract}
          id="doesNotHaveContract"
          onChange={handleCheckboxClick}
          paddingSize="large"
        />
        <Typography variant="body2">{t('assets.assetFilter.no_assigned_contract')}</Typography>
      </label>
      <CatSelect
        defaultChecked
        disabled={!noContract}
        displayEmpty
        fullWidth
        multiple
        onChange={handleMultiple}
        renderValue={(value) => getRenderValue(value as string[])}
        value={selectedContractTypes}
      >
        <CatMenuItem key="all-selected" value="all-selected">
          <CatCheckbox
            checked={allContractTypesSelected}
            indeterminate={someContractsSelected}
            style={{ marginRight: '12px' }}
          />
          <ListItemText primary={t('assets.assetFilter.all_contracts')} />
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

export default DoesNotHaveContractFilter;
