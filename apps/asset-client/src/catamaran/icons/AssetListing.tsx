import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AssetListingIcon(props: Props) {
  return (
    <IconBase {...props}>
      <rect height={1} rx={0.5} stroke="currentColor" width={9} x={7.5} y={7.5} />
      <rect height={1} rx={0.5} stroke="currentColor" width={9} x={7.5} y={11.5} />
      <rect height={1} rx={0.5} stroke="currentColor" width={9} x={7.5} y={15.5} />
    </IconBase>
  );
}

export default AssetListingIcon;
