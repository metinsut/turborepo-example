import * as React from 'react';
import { Radio, RadioProps } from '@mui/material';
import RadioCheckedIcon from 'catamaran/icons/RadioCheckedDeprecated';
import RadioIcon from 'catamaran/icons/RadioDeprecated';
import clsx from 'clsx';

export type Props = RadioProps & {
  className?: string;
  zeroPadding?: boolean;
};
function BordaRadio(props: Props, ref: React.Ref<any>) {
  const { className, zeroPadding = false, ...rest } = props;

  return (
    <Radio
      checkedIcon={<RadioCheckedIcon style={{ fontSize: '12px' }} />}
      className={clsx(className, zeroPadding ? 'p0' : '')}
      icon={<RadioIcon style={{ fontSize: '12px' }} />}
      ref={ref}
      {...rest}
    />
  );
}

BordaRadio.displayName = 'BordaRadio';
export default React.forwardRef(BordaRadio);
