import { CatCheckbox, CatIconButton, CatPopover, CatRadio } from 'catamaran/core';
import { FilterDateType } from 'store/slices/categoryTasks';
import { FormControl, FormControlLabel, FormGroup, RadioGroup } from 'catamaran/core/mui';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useTranslation } from 'react-i18next';
import BlueEyeIcon from 'catamaran/icons/BlueEye';
import FilterList from 'catamaran/icons/FilterList';

type Props = {
  showCompleted: boolean;
  intervalDateType: FilterDateType;
  onShowCompletedChange: () => void;
  onIntervalDateTypeChange: (event: any) => void;
};

function CategoryTaskFilterMenu(props: Props) {
  const { showCompleted, intervalDateType, onShowCompletedChange, onIntervalDateTypeChange } =
    props;
  const { t } = useTranslation();

  const popupState = usePopupState({ popupId: 'categoryTaskFilter', variant: 'popover' });

  return (
    <>
      <CatIconButton {...bindTrigger(popupState)}>
        <FilterList color="blue" />
      </CatIconButton>
      <CatPopover {...bindPopover(popupState)}>
        <FormControl className="px16 w-full" component="fieldset">
          <FormGroup>
            <div className="flex justify-content-between align-items-center">
              <FormControlLabel
                control={
                  <CatCheckbox checked={showCompleted ?? false} onChange={onShowCompletedChange} />
                }
                label={<>{t('categories.tasks.show_completed')}</>}
              />
              <BlueEyeIcon alwaysHovered color="blue" />
            </div>
            <div className="divider-horizontal my8" />
            <RadioGroup
              onChange={onIntervalDateTypeChange}
              value={showCompleted ? intervalDateType : null}
            >
              <FormControlLabel
                control={<CatRadio />}
                disabled={!showCompleted}
                label={<>{t('categories.tasks.filter_today')}</>}
                value="day"
              />
              <FormControlLabel
                control={<CatRadio />}
                disabled={!showCompleted}
                label={<>{t('categories.tasks.filter_week')}</>}
                value="week"
              />
              <FormControlLabel
                control={<CatRadio />}
                disabled={!showCompleted}
                label={<>{t('categories.tasks.filter_month')}</>}
                value="month"
              />
              <FormControlLabel
                control={<CatRadio />}
                disabled={!showCompleted}
                label={<>{t('categories.tasks.filter_all')}</>}
                value="all"
              />
            </RadioGroup>
          </FormGroup>
        </FormControl>
      </CatPopover>
    </>
  );
}

export default CategoryTaskFilterMenu;
