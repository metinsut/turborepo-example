import { CatCenterIcon, CatDataCard, CatSidebar, CatTypography } from 'catamaran/core';
import { ElementType } from 'react';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import LockIcon from 'catamaran/icons/Lock';

type Props = {
  className?: string;
  icon?: ElementType<IconBaseProps>;
  text?: string;
};

function LockedCard(props: Props) {
  const { className, icon, text } = props;
  return (
    <CatDataCard
      className={className}
      color="darkGrey"
      disabled
      minWidth="auto"
      size="small"
      transparentBackground
    >
      <CatSidebar className="justify-content-center">
        <CatCenterIcon className="opacity-6" component={icon} />
      </CatSidebar>
      <div className="p8 grid h-full w-full grid-auto-flow-column justify-content-between align-content-center">
        <CatTypography className="opacity-8" variant="subtitle1">
          {text}
        </CatTypography>
        <LockIcon className="opacity-8" />
      </div>
    </CatDataCard>
  );
}

export default LockedCard;
