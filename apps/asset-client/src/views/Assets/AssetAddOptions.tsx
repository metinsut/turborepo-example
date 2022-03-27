import { CatIconButton, CatMenuItem, CatPopover, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { getDevelopmentFeaturesEnabled } from 'utils/settings';
import { useState } from 'react';
import AssetSingleAdd from './AssetSingleAdd';
import PlusIcon from 'catamaran/icons/Plus';

function AssetAddOptions() {
  const { t } = useTranslation();

  const [singleRequirementActive, setSingleRequirementActive] = useState(false);

  const handleSingleClick = () => {
    setSingleRequirementActive(true);
  };

  const developmentFeaturesEnabled = getDevelopmentFeaturesEnabled();

  const popoverContent = (
    <>
      <CatMenuItem onClick={handleSingleClick}>
        <PlusIcon color="green" fontSize="small" />
        <CatTypography variant="body2">
          <Trans components={{ bold: <b /> }} i18nKey="assets.asset_list.add_new_single" t={t} />
        </CatTypography>
      </CatMenuItem>
      {developmentFeaturesEnabled && (
        <CatMenuItem disabled>
          <PlusIcon color="green" fontSize="small" />
          <CatTypography variant="body2">
            <Trans components={{ bold: <b /> }} i18nKey="assets.asset_list.add_new_multi" t={t} />
          </CatTypography>
        </CatMenuItem>
      )}
    </>
  );

  const popupState = usePopupState({ popupId: 'assetAddOptions', variant: 'popover' });

  return (
    <>
      {singleRequirementActive && (
        <AssetSingleAdd onDeactivate={() => setSingleRequirementActive(false)} />
      )}
      <CatIconButton {...bindTrigger(popupState)}>
        <PlusIcon color="green" contained />
      </CatIconButton>
      <CatPopover {...bindPopover(popupState)}>{popoverContent}</CatPopover>
    </>
  );
}

export default AssetAddOptions;
