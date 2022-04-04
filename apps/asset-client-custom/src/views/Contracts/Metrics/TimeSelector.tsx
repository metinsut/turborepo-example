import { CatMenuItem, CatSelect } from 'catamaran/core';
import { SelectProps } from 'catamaran/core/mui';
import { intervalToHoursConverter } from 'utils/converters';
import { useMemo } from 'react';

type Props = SelectProps & {
  interval?: number;
  defaultValue?: string;
};

function TimeSelector(props: Props) {
  const { interval = 30, defaultValue = '', ...rest } = props;

  const hours: string[] = useMemo(() => intervalToHoursConverter(interval), [interval]);

  return (
    <CatSelect fullWidth value={defaultValue} {...rest}>
      {hours.map((option) => (
        <CatMenuItem key={option} value={option}>
          {option}
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default TimeSelector;
