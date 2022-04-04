import { ASSET_DETAIL } from 'routes/constant-route';
import { AssetInformation } from 'store/slices/breakdown/common/types';
import {
  CatIconButton,
  CatPanel,
  CatPanelContent,
  CatPanelHeader,
  CatTypography
} from 'catamaran/core';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import BasicDescriptionItem from './BasicDescriptionItem';
import CalibrationOkIcon from 'catamaran/icons/CalibrationOk';
import CategoryItem from './CategoryItem';
import ContractBasic from './ContractBasic';
import ContractContact from './ContractFirm';
import LocationItem from './LocationItem';
import MaintenanceOkIcon from 'catamaran/icons/MaintenanceOk';
import PartPolicy from './PartPolicy';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';
import clsx from 'clsx';
import styles from '../BreakdownCommon.module.scss';

type Props = {
  assetInformation: AssetInformation;
  contractVisible?: boolean;
};

function AssetInformationPanel({ assetInformation, contractVisible = true }: Props) {
  const {
    brandName,
    branchId,
    locations,
    modelName,
    code,
    contract,
    categories,
    modelPhotoPath,
    assetStatus
  } = assetInformation;
  const { t } = useTranslation();
  const history = useHistory();

  const handleAssetCardClick = () => {
    history.push(`${ASSET_DETAIL.replace(':id', assetInformation.id)}`);
  };

  return (
    <CatPanel className={styles.panel_wrapper}>
      <CatPanelHeader
        actionArea={
          <div className="grid grid-auto-flow-row gap-4 align-items-center">
            <div className="grid grid-auto-flow-column gap-4 align-items-center">
              <StatusIcon fontSize="small" statusType={assetStatus} />
              <MaintenanceOkIcon color="green" contained={false} hoverable={false} />
              <CalibrationOkIcon color="green" contained={false} hoverable={false} />
              <CatIconButton onClick={handleAssetCardClick}>
                <ArrowRightIcon color="darkGrey" hoverable={false} />
              </CatIconButton>
            </div>
            <CatTypography className="opacity-8 text-center" variant="caption">
              {t('tasks.breakdowns.confirm_breakdown.go_to_asset_card')}
            </CatTypography>
          </div>
        }
        title={t('tasks.breakdowns.confirm_breakdown.asset_information_header')}
      />
      <CatPanelContent className={clsx('grid align-items-center', styles.asset_info_content)}>
        <BasicDescriptionItem
          description={brandName}
          title={t('tasks.breakdowns.confirm_breakdown.brand_field')}
        />
        <BasicDescriptionItem
          description={modelName}
          title={t('tasks.breakdowns.confirm_breakdown.model_field')}
        />
        <BasicDescriptionItem
          description={code}
          title={t('tasks.breakdowns.confirm_breakdown.code_field')}
        />
        <CategoryItem categories={categories} modelPhotoPath={modelPhotoPath} />
        <LocationItem branchId={branchId} locations={locations} />
        {contractVisible && (
          <>
            <ContractBasic contract={contract} />
            {contract?.partsPolicy && <PartPolicy partsPolicy={contract?.partsPolicy} />}
            {contract?.firmContact && <ContractContact firmContact={contract?.firmContact} />}
          </>
        )}
      </CatPanelContent>
    </CatPanel>
  );
}

export default AssetInformationPanel;
