import { CatButton, CatMenu, CatMenuDivider, CatMenuItem, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import Action from 'catamaran/icons/Action';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import CalibrationIcon from 'catamaran/icons/Calibration';
import ContractIcon from 'catamaran/icons/Contract';
import EditIcon from 'catamaran/icons/Edit';
import ExportIcon from 'catamaran/icons/Export';
import GroupIcon from 'catamaran/icons/Group';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import PassiveIcon from 'catamaran/icons/Passive';
import RetireIcon from 'catamaran/icons/Retire';
import UngroupIcon from 'catamaran/icons/Ungroup';

type Props = {
  onAssetEdit?: (id: string) => void;
  checkedIdList: string[];
};

function AssetActionButton(props: Props) {
  const { onAssetEdit, checkedIdList } = props;
  const { t } = useTranslation();

  const singleSelected = checkedIdList?.length === 1;
  const multiSelected = checkedIdList?.length > 1;

  let buttonLabel = t('common.action');
  if (checkedIdList?.length > 0) {
    buttonLabel += `(${checkedIdList?.length})`;
  }

  const popupState = usePopupState({ popupId: 'ListStatusFilter', variant: 'popover' });

  return (
    <>
      <CatButton
        {...bindTrigger(popupState)}
        color="blue"
        disabled={!(singleSelected || multiSelected)}
        endIcon={<Action />}
      >
        {buttonLabel}
      </CatButton>
      <CatMenu {...bindMenu(popupState)}>
        <CatMenuItem>
          <BreakdownIcon color="orange" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.breakdown_request" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <RetireIcon color="red" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.retirement_request" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <PassiveIcon color="darkGrey" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.passive_assets" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuDivider />
        <CatMenuItem disabled={!singleSelected} onClick={() => onAssetEdit(checkedIdList[0])}>
          <EditIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.edit_information" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <ContractIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.edit_contracts" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <MaintenanceIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.edit_maintenance_plans" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <CalibrationIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.edit_calibration_plans" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuDivider />
        <CatMenuItem>
          <MaintenanceIcon color="darkGrey" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.one_time_maintenance" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <CalibrationIcon color="darkGrey" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.one_time_calibration" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuDivider />
        <CatMenuItem>
          <GroupIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.group_asset" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <UngroupIcon color="blue" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.ungroup_asset" t={t} />
          </CatTypography>
        </CatMenuItem>
        <CatMenuItem>
          <ExportIcon color="darkGrey" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_list.actions.export_assets" t={t} />
          </CatTypography>
        </CatMenuItem>
      </CatMenu>
    </>
  );
}

export default AssetActionButton;
