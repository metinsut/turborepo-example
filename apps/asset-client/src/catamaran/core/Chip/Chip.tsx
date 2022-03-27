import { ChipProps, Chip as MuiChip } from '@mui/material';
import { useMemo } from 'react';
import CloseIcon from 'catamaran/icons/Close';
import clsx from 'clsx';

export type ColorTypes = 'blue' | 'green' | 'red' | 'darkGrey';

export type CatChipProps = {
  className?: string;
  color?: ColorTypes;
} & Omit<ChipProps, 'color'>;

const Chip = ({ className, color, variant, size = 'medium', ...rest }: CatChipProps) => {
  const variantClassNames = useMemo(() => {
    switch (color) {
      case 'darkGrey':
        return variant === 'outlined' ? 'border-1 border-darkgrey-o-8' : 'bg-darkgrey-o-1';
      case 'green':
        return variant === 'outlined'
          ? 'border-1 border-main-green c-main-green'
          : 'bg-gradient-lightGreen c-main-green';
      case 'red':
        return variant === 'outlined'
          ? 'border-1 border-main-red c-main-red'
          : 'bg-gradient-lightRed c-main-red';
      case 'blue':
        return variant === 'outlined'
          ? 'border-1 border-main-blue c-main-blue'
          : 'bg-gradient-lightBlue c-main-blue';
      default:
        return variant === 'outlined' ? 'border-1 border-darkgrey-o-8' : 'bg-darkgrey-o-1';
    }
  }, [color, variant]);

  return (
    <MuiChip
      className={clsx(className, variantClassNames, 'chip-root')}
      deleteIcon={<CloseIcon color="darkGrey" />}
      size={size}
      variant={variant}
      {...rest}
    />
  );
};

export default Chip;
