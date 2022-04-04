import { BreakdownCost } from 'store/slices/breakdown/common/types';
import {
  BreakdownCostType,
  selectAllBreakdownCostTypes
} from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { CatMenuItem, CatPopover, CatRadio, CatSelect, CatTypography } from 'catamaran/core';
import { FormHelper } from 'hooks/useFormState';
import { ValidationIcon } from 'catamaran/core/TextField/TextField';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { isArrayNullOrEmpty } from 'utils';
import { styled } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import CostIcon from 'catamaran/icons/Cost';
import React, { useState } from 'react';

type Props = {
  formHelper: FormHelper<BreakdownCost>;
  renderValue: string;
};

const StyledValidationBadge = styled(ValidationIcon)(() => ({
  left: '-7px',
  position: 'absolute',
  top: '15px',
  zIndex: 2
}));

function CostTypeSelector({ formHelper, renderValue }: Props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null);

  const [selected, setSelected] = React.useState<BreakdownCostType>({
    id: formHelper.formState.values.costTypeId,
    name: formHelper.formState.values.costType,
    parentCostTypeId: formHelper.formState.values.parentCostTypeId
  });

  const [expanded, setExpanded] = React.useState<BreakdownCostType>();

  const handleSelect = (event: any, value: BreakdownCostType) => {
    // if there is no subcostType click should select the value.
    // Filling empty formHelper values for render values
    if (isArrayNullOrEmpty(value.subCostTypes)) {
      formHelper.setFormState((prev) => ({
        ...prev,
        costType: value.name,
        costTypeId: value.id,
        parentCostTypeId: value.parentCostTypeId
      }));
      setSelected(value);
      handleClose();
    } // if there is subcostType click should open sub menu
    else {
      setExpanded(value);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setExpanded(null);
  };

  const handleSubMenuClose = () => {
    setAnchorEl(null);
    setExpanded(null);
  };

  const costTypes = useTypedSelector(selectAllBreakdownCostTypes);
  const selectedCostId = selected?.id;

  const popupStateMain = usePopupState({ popupId: 'costTypeSelectorMain', variant: 'popover' });

  return (
    <>
      <CatSelect
        autoWidth={false}
        displayEmpty
        fullWidth
        InputLabelProps={{
          shrink: !!renderValue
        }}
        label={t('tasks.detail.cost.cost_type_label')}
        open={false}
        renderValue={() => renderValue}
        startAdornment={
          <StyledValidationBadge
            className="validation-badge"
            required
            touched={formHelper.formState.touchedFields.costTypeId}
            valid={!formHelper.formState.errors.costTypeId && !!renderValue}
            validatable
            value={selectedCostId}
          />
        }
        value=""
        {...bindTrigger(popupStateMain)}
      />
      <CatPopover
        {...bindPopover(popupStateMain)}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom'
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top'
        }}
        width="204px"
      >
        {costTypes.map((costType) => (
          <span key={costType.id}>
            <CatMenuItem
              onClick={(e) => handleSelect(e, costType)}
              selected={costType.id === selected?.id || costType.id === selected?.parentCostTypeId}
              value={costType.id as string}
            >
              <CostIcon />
              <CatTypography className="three-dot" variant="body2">
                {costType.name}
              </CatTypography>
              {!isArrayNullOrEmpty(costType.subCostTypes) && (
                <ChevronRIcon className="opacity-8" color="darkGrey" contained fontSize="small" />
              )}
            </CatMenuItem>
            <CatPopover
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: 'right',
                vertical: 'top'
              }}
              key={`${costType.id}-popover`}
              onClose={handleSubMenuClose}
              open={!!anchorEl && expanded?.id === costType.id}
              transformOrigin={{ horizontal: -2, vertical: 'top' }}
              width="204px"
            >
              {costType.subCostTypes.map((subType) => (
                <CatMenuItem
                  key={subType.id}
                  onClick={(e) => handleSelect(e, subType)}
                  selected={selectedCostId === subType.id}
                  value={costType.id as string}
                >
                  <CatRadio checked={selectedCostId === subType.id} zeroPadding />
                  <CatTypography className="three-dot" variant="body2">
                    {subType.name}
                  </CatTypography>
                </CatMenuItem>
              ))}
            </CatPopover>
          </span>
        ))}
      </CatPopover>
    </>
  );
}

export default CostTypeSelector;
