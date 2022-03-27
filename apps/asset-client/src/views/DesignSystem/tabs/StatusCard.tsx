import { CatPanel, CatPanelContent, CatPanelHeader, CatStatusCard } from 'catamaran/core';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';

const StatusCard = () => {
  const handleOnClick = () => {};
  return (
    <div className="grid gap-16 mt16">
      <CatPanel>
        <CatPanelHeader title="Status Card" />
        <CatPanelContent className="grid gap-16">
          <CatStatusCard
            color="green"
            description="This asset is ready to go"
            iconContent={<StatusIcon fontSize="small" statusType="usable" />}
            onClick={handleOnClick}
            title="Usable"
          />
          <CatStatusCard
            color="yellow"
            description="Click to go Protection"
            iconContent={<StatusIcon fontSize="small" statusType="caution" />}
            onClick={handleOnClick}
            title="Caution"
          />
          <CatStatusCard
            color="orange"
            description="Click to go to Tasks"
            iconContent={<StatusIcon fontSize="small" statusType="partialDown" />}
            onClick={handleOnClick}
            title="Partial Down"
          />
          <CatStatusCard
            color="grey"
            description="Passive since: 12.01.2020"
            iconContent={<StatusIcon fontSize="small" statusType="passive" />}
            onClick={handleOnClick}
            title="Passive"
          />
          <CatStatusCard
            color="red"
            description="Click to go to Tasks"
            iconContent={<StatusIcon fontSize="small" statusType="down" />}
            onClick={handleOnClick}
            title="Down"
          />
          <CatStatusCard
            color="darkGrey"
            description="Retirement Date: 12.01.2020"
            iconContent={<StatusIcon fontSize="small" statusType="retired" />}
            onClick={handleOnClick}
            title="Retired"
          />
        </CatPanelContent>
      </CatPanel>
    </div>
  );
};

export default StatusCard;
