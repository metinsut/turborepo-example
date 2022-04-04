import {
  InputLabelProps,
  FormControl as MuiFormControl,
  InputLabel as MuiInputLabel,
  Select as MuiSelect,
  SelectProps,
  Theme
} from '@mui/material';
import { Root, ValidationIcon, styledOptions } from '../TextField/TextField';
import { makeStyles } from '@mui/styles';
import { styled } from '../mui';
import ChevronDownIcon from 'catamaran/icons/ChevronDown';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import LoadingIcon from 'catamaran/icons/Loading';
import React, { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  denseDisplay: {
    '& .MuiSelect-icon': {
      backgroundColor: theme.palette.darkGrey[100],
      fontSize: '16px',
      top: '8px'
    },
    '& .MuiSelect-select': {
      '&:focus': {
        backgroundColor: 'white',
        borderRadius: '24px'
      },
      minHeight: '11px',
      padding: '8px'
    },
    '&.Mui-focused': {
      backgroundColor: 'white'
    },
    '&:after': {
      marginLeft: '10px',
      marginRight: '10px'
    },
    backgroundColor: 'white',
    borderRadius: '16px',
    fontSize: '9px',
    lineHeight: '10.8px',
    minHeight: '32px'
  },
  label: {
    '&.MuiInputLabel-shrink': {
      transform: 'translate(8px, 1px) scale(0.7)'
    },
    color: theme.palette.darkGrey[600],
    fontSize: '13px',
    lineHeight: '18.28px',
    maxWidth: 'calc(100% - 32px)',
    transform: 'translate(8px, 11px) scale(1)'
  },
  overflow: {
    '& .MuiTypography-root': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    maxWidth: '0'
  },
  select: {
    '&:before': {
      border: 'none !important'
    },
    color: theme.palette.darkGrey.main
  }
}));

const StyledMuiSelect = styled(MuiSelect)<{ clearactive: number }>(({ clearactive }) => ({
  '& .MuiSelect-select': {
    paddingRight: clearactive ? '52px !important' : ''
  }
}));

const StyledFormControl = styled(MuiFormControl)(styledOptions);

export type Props = SelectProps & {
  clearActive?: boolean;
  densed?: boolean;
  InputLabelProps?: InputLabelProps;
  loading?: boolean;
  menuOverflow?: boolean;
  onClear?: () => void;
};

function Select(props: Props, ref: React.Ref<any>) {
  const {
    className,
    clearActive,
    children,
    densed = false,
    fullWidth = true,
    InputLabelProps,
    label,
    loading = false,
    menuOverflow = true,
    onClear,
    onClose,
    onOpen,
    required,
    value,
    ...rest
  } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleOpen = (e: any) => {
    onOpen?.(e);
    setOpen(true);
  };

  const handleClose = (e: any) => {
    onClose?.(e);
    setOpen(false);
  };

  const handleToggle = () => setOpen((prev) => !prev);

  const renderIcons = () => (
    <div
      className="flex align-items-center gap-4 cursor-pointer p8 absolute right-0"
      onClick={handleToggle}
    >
      {clearActive && (
        <FilterCancelIcon
          color="red"
          onClick={(e: any) => {
            e.stopPropagation();
            onClear();
          }}
        />
      )}
      <ChevronDownIcon color="darkGrey" contained={false} hoverable={false} />
    </div>
  );

  const labelId = label?.toString() ?? '';
  const FormControlComponent = densed ? MuiFormControl : StyledFormControl;

  const Icon = loading ? LoadingIcon : ChevronDownIcon;

  return (
    <Root
      className={clsx({
        'w-full': fullWidth
      })}
    >
      {required && (
        <ValidationIcon
          className="validation-badge"
          required={required}
          valid={!!value}
          validatable={required}
          value={value}
        />
      )}
      <FormControlComponent className="default" fullWidth={fullWidth} size="small" variant="filled">
        {label && (
          <MuiInputLabel id={labelId} {...InputLabelProps}>
            {label}
          </MuiInputLabel>
        )}
        <StyledMuiSelect
          className={clsx({
            [className ?? '']: true,
            [classes.select]: densed,
            [classes.denseDisplay]: densed
          })}
          clearactive={clearActive ? 1 : 0}
          fullWidth={fullWidth}
          IconComponent={clearActive ? renderIcons : Icon}
          labelId={labelId}
          MenuProps={{
            MenuListProps: {
              style: {
                padding: '0 !important'
              }
            },
            PaperProps: {
              className: clsx({
                [classes.overflow]: !menuOverflow
              }),
              style: {
                maxHeight: 200
              }
            },
            variant: 'menu'
          }}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          ref={ref}
          required={required}
          value={value}
          {...rest}
        >
          {children}
        </StyledMuiSelect>
      </FormControlComponent>
    </Root>
  );
}

export default React.forwardRef(Select);
