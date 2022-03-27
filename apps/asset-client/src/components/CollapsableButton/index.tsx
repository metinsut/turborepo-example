import { Box, CatButton, CatButtonProps } from 'catamaran/core';
import { Collapse, Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import MinusIcon from 'catamaran/icons/Minus';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  }
}));

type Props = CatButtonProps & {
  open: boolean;
  setOpen: (open: boolean) => void;
  text?: String;
  textExpanded?: String;
  buttonInvisible?: boolean;
};

function CollapsableButton(props: Props) {
  const classes = useStyles();
  const {
    buttonInvisible = false,
    children,
    className,
    disabled = false,
    open,
    setOpen,
    text,
    textExpanded,
    ...rest
  } = props;

  const { t } = useTranslation();

  const finalText = text ?? t('common.see_more');
  const finalExpandedText = textExpanded ?? t('common.see_less');

  return (
    <Box center className={clsx(classes.root, className)} flex flexDirection="column">
      <Collapse in={open} style={{ width: '100%' }}>
        <Paper elevation={0}>{children}</Paper>
      </Collapse>
      {!buttonInvisible && (
        <CatButton
          color="blue"
          disabled={disabled}
          endIcon={
            open ? (
              <MinusIcon color="blue" contained hoverable={false} />
            ) : (
              <PlusIcon color="blue" contained hoverable={false} />
            )
          }
          onClick={() => setOpen(!open)}
          size="small"
          {...rest}
        >
          {open ? finalExpandedText : finalText}
        </CatButton>
      )}
    </Box>
  );
}

export default CollapsableButton;
