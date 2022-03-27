import { BREAKDOWN_OPEN } from 'routes/constant-route';
import { CatButton, CatMenu, CatMenuItem, CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useHistory } from 'react-router-dom';
import ActionIcon from 'catamaran/icons/Action';
import BreakdownIcon from 'catamaran/icons/Breakdown';

type Props = {
  assetId?: string;
};

function ActionButton(props: Props) {
  const { assetId } = props;
  const { t } = useTranslation();
  const history = useHistory();

  const handleOpenBreakdownClick = () => {
    history.push(`${BREAKDOWN_OPEN}?assetId=${assetId}`);
  };

  const popupState = usePopupState({ popupId: 'assetDetailActionButton', variant: 'popover' });

  return (
    <>
      <CatButton {...bindTrigger(popupState)} color="blue" endIcon={<ActionIcon />}>
        {t('common.action')}
      </CatButton>
      <CatMenu {...bindMenu(popupState)} width="292px">
        <CatMenuItem onClick={handleOpenBreakdownClick}>
          <BreakdownIcon color="orange" fontSize="small" />
          <CatTypography variant="body2">
            <Trans i18nKey="assets.asset_edit.operations.open_breakdown_request" t={t} />
          </CatTypography>
        </CatMenuItem>
      </CatMenu>
    </>
  );
}

export default ActionButton;
