import { CatTypography } from 'catamaran/core';
import { IconBaseProps } from 'catamaran/icons/IconBase';

interface Props {
  actionArea?: React.ReactNode;
  iconComponent?: React.ComponentType<IconBaseProps>;
  title: React.ReactNode;
}

const PanelHeader = ({ actionArea, title, iconComponent: Icon }: Props) => (
  <>
    <div className="panel-title">
      <div className="panel-title-left">
        {Icon && (
          <Icon
            className="opacity-6"
            color="darkGrey"
            contained={false}
            fontSize="medium"
            hoverable={false}
          />
        )}
        <CatTypography className="opacity-8" variant="h2">
          {title}
        </CatTypography>
      </div>
      <div className="panel-title-right">{actionArea}</div>
    </div>
  </>
);

export default PanelHeader;
