import { Box, CatKeyboardSection, CatTab, CatTabs } from 'catamaran/core';
import { ContractProperty, Cost } from 'store/slices/contracts/types';
import { Typography } from 'catamaran/core/mui';
import { cancelCostForm } from 'store/slices/contracts/slice';
import { costTypes } from 'store/slices/contracts/data';
import { dequal } from 'dequal';
import { selectCostForm, selectInitialCostForm } from 'store/slices/contracts/selectors';
import { updateCostType } from 'store/slices/contracts/actions';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import CostForEachCategory from './CostForEachCategory';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import TotalAndAnnualCost from './TotalAndAnnualCost';

type Props = {
  cost?: Cost;
  onGoBack: () => void;
  onSave: (firm: Cost) => Promise<Cost>;
  sectionProps: ContractProperty;
};

function Edit(props: Props) {
  const { cost: readonlyCost, onGoBack, onSave, sectionProps } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const costForm = useTypedSelector(selectCostForm);
  const initialCostForm = useTypedSelector(selectInitialCostForm);

  const currentCost = costForm[costForm.type];
  const initialCurrentCost = initialCostForm[costForm.type];

  const handleCostTypeChange = (event: any, value: any) => {
    dispatch(updateCostType(value));
  };

  const handleCancel = async () => {
    dispatch(cancelCostForm());
    onGoBack();
  };

  const handleSave = async () => {
    await onSave(currentCost);
    onGoBack();
  };

  const costTypeChanged = !!readonlyCost && costForm.type !== initialCostForm.type;
  const changed = costTypeChanged || !dequal(currentCost, initialCurrentCost);

  let content = null;
  if (costForm.type === 'none') {
    content = null;
  } else if (costForm.type === 'category') {
    content = <CostForEachCategory cost={currentCost} />;
  } else {
    content = <TotalAndAnnualCost cost={currentCost} key={costForm.type} />;
  }

  return (
    <CatKeyboardSection onEnter={handleSave} onEscape={handleCancel} open>
      <>
        <Box mb={2.5}>
          <Typography variant="body1">{t('contracts.edit.cost_section_desc')}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1">{t('contracts.edit.cost_type_desc')}</Typography>
        </Box>
        <CatTabs onChange={handleCostTypeChange} value={costForm.type}>
          {costTypes
            .filter((i) => sectionProps.availableParameters?.includes(i))
            .map((costType) => (
              <CatTab
                key={costType}
                label={t(`contracts.cost_types.${costType}`)}
                value={costType}
              />
            ))}
        </CatTabs>
        <Box height="16px" />
        {content}
        <KeyboardSectionBottomButtons
          isConfirmDisabled={!currentCost.valid}
          mode={readonlyCost ? 'edit' : 'add'}
          touched={changed}
        />
      </>
    </CatKeyboardSection>
  );
}

export default Edit;
