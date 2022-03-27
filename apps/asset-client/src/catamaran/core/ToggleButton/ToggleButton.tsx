import * as React from 'react';
import { CatTypography } from 'catamaran/core';
import { useStyles } from './styles';
import Cancel from 'catamaran/icons/Cancel';
import LoadingIcon from 'catamaran/icons/Loading';
import ToggleButton, { ToggleButtonProps } from '@mui/material/ToggleButton';
import clsx from 'clsx';

export type ColorTypes = 'blue' | 'darkGrey' | 'green' | 'grey' | 'orange' | 'red' | 'yellow';

export type SizeTypes = 'small' | 'medium' | 'large' | 'xLarge';

const colorCssClasses = {
  blue: 'colorBlue',
  darkGrey: 'colorDarkGrey',
  green: 'colorGreen',
  grey: 'colorGrey',
  orange: 'colorOrange',
  red: 'colorRed',
  yellow: 'colorYellow'
};

const sizeCssClasses = {
  large: 'large',
  medium: 'medium',
  small: 'small',
  xLarge: 'xLarge'
};

export type Props = Omit<ToggleButtonProps, 'color' | 'value' | 'size' | 'title'> & {
  className?: string;
  closable?: boolean;
  color?: ColorTypes;
  loading?: boolean;
  keepIconColor?: boolean;
  icon?: React.ReactNode;
  reverse?: boolean;
  selectedIcon?: React.ReactNode;
  size?: SizeTypes;
  subtitle?: string;
  title?: React.ReactNode;
  value?: boolean;
};

function BordaToggleButton(props: Props, ref: React.Ref<any>) {
  const classes = useStyles();
  const {
    className,
    closable = false,
    color = 'darkGrey',
    icon,
    keepIconColor = false,
    loading = false,
    selected,
    selectedIcon,
    size = 'medium',
    subtitle,
    title,
    value = false,
    reverse = false,
    ...rest
  } = props;

  const titleVariant = size === 'xLarge' || size === 'large' ? 'body2' : 'caption';
  const subtitleVariant = size === 'xLarge' ? 'h2' : 'body1';

  const finalIcon = () => {
    if (loading) {
      return <LoadingIcon />;
    }

    if (selected && closable) {
      return <Cancel />;
    }

    if (selectedIcon) {
      return selectedIcon;
    }

    return icon;
  };

  return (
    <ToggleButton
      className={clsx({
        [classes.root]: true,
        [colorCssClasses[color]]: true,
        [sizeCssClasses[size]]: true,
        [className]: true,
        keepIconColorClass: keepIconColor,
        'p0 grid radius-16 justify-content-stretch': true
      })}
      ref={ref}
      selected={selected}
      value={value}
      {...rest}
    >
      <div
        className={clsx(
          'grid grid-auto-flow-column align-items-center h-full',
          size === 'small' || size === 'medium' ? 'px4' : 'px8',
          size === 'xLarge' ? 'py8' : '',
          reverse ? 'justify-content-start' : 'justify-content-between',
          reverse && size === 'xLarge' ? 'justify-content-between' : '',
          title ? '' : 'justify-content-center'
        )}
        style={{ gridTemplateColumns: reverse && title ? 'auto 1fr' : 'auto auto' }}
      >
        {title && (
          <div
            className={clsx(
              'grid px8 text-left',
              reverse && size === 'xLarge' ? 'align-self-start justify-self-end' : '',
              size === 'xLarge' ? 'align-self-start' : ''
            )}
            style={{ gridColumn: reverse ? '2/3' : '' }}
          >
            <CatTypography
              className="MuiToggleButton-title three-dot"
              noBreak
              variant={titleVariant}
            >
              {title}
            </CatTypography>
            {subtitle && size !== 'small' && (
              <CatTypography
                className="MuiToggleButton-subtitle three-dot"
                noBreak
                variant={subtitleVariant}
              >
                <b>{subtitle}</b>
              </CatTypography>
            )}
          </div>
        )}
        <div
          className={clsx(
            reverse && size === 'xLarge' ? 'align-self-end' : '',
            size === 'xLarge' ? 'align-self-end' : '',
            'grid grid-auto-flow-column'
          )}
        >
          {finalIcon()}
        </div>
      </div>
    </ToggleButton>
  );
}

BordaToggleButton.displayName = 'BordaToggleButton';
export default React.forwardRef(BordaToggleButton);
