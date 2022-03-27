import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function RequestIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M9.197 8.162a1.666 1.666 0 012.216 2.234.383.383 0 01.079.061l2.26 2.26a.384.384 0 01.085.129 1.666 1.666 0 012.25 2.207l-1.19-1.19a.384.384 0 00-.543 0l-.242.241a.384.384 0 000 .543l1.19 1.19a1.666 1.666 0 01-2.206-2.25.384.384 0 01-.13-.085l-2.259-2.26a.383.383 0 01-.061-.08 1.666 1.666 0 01-2.234-2.215l1.19 1.19c.15.15.394.15.544 0l.242-.241a.384.384 0 000-.543l-1.19-1.19z"
        fill="currentColor"
      />
      <path d="M14.474 10.116l-.262-.262-3.117 3.118.261.262 3.118-3.118z" fill="currentColor" />
      <path
        d="M11.132 13.01a.384.384 0 00-.393-.094l-.56.187-1.56 1.56a.384.384 0 000 .543l.503.504c.15.15.393.15.543 0l1.56-1.56.187-.56a.384.384 0 00-.093-.393l-.187-.188zM14.71 9.173l-.502.502.447.447.502-.502.412-.59-.268-.269-.591.412z"
        fill="currentColor"
      />
      <rect height={15} rx={1.5} stroke="currentColor" width={11} x={6.75} y={4.5} />
      <path d="M9.25 5h6a1 1 0 01-1 1h-4a1 1 0 01-1-1z" fill="currentColor" />
    </IconBase>
  );
}

export default RequestIcon;
