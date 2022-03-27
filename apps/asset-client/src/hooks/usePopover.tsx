import { Fade, Paper, PopoverProps, Popper, Theme, makeStyles } from 'catamaran/core/mui';
import React, { useCallback } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: 16,
    maxWidth: 120,
    padding: 10
  },
  paperLarge: {
    borderRadius: 16,
    maxWidth: 350,
    padding: 10
  },
  paperMedium: {
    borderRadius: 8,
    padding: 8,
    width: 150
  },
  popover: {
    pointerEvents: 'none',
    zIndex: theme.zIndex.tooltip
  }
}));

type Options = {
  popoverProps?: Partial<PopoverProps>;
  popoverContent: React.ReactNode;
  modalSize?: 'default' | 'medium' | 'large';
};

export const usePopover = (options: Options) => {
  const classes = useStyles();
  const { popoverContent, modalSize = 'default', ...rest } = options;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | SVGSVGElement | null>(null);

  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);

  const defaultPaperClass = React.useMemo(() => {
    switch (modalSize) {
      case 'default':
        return classes.paper;
      case 'medium':
        return classes.paperMedium;
      case 'large':
        return classes.paperLarge;
      default:
        return classes.paper;
    }
  }, [classes.paper, classes.paperLarge, classes.paperMedium, modalSize]);

  const popoverElement = React.useMemo(
    () => (
      <Popper
        {...rest}
        anchorEl={anchorEl}
        className={classes.popover}
        id="mouse-over-popover"
        open={open}
        placement="bottom"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={defaultPaperClass}>{popoverContent}</Paper>
          </Fade>
        )}
      </Popper>
    ),
    [anchorEl, classes.popover, open, popoverContent, rest, defaultPaperClass]
  );

  return {
    handlePopoverClose,
    handlePopoverOpen,
    open,
    popoverElement
  };
};
