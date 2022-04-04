import { Box, CatButton, CatTooltip } from 'catamaran/core';
import { Divider, Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { ReactElement } from 'react';
import PlusIcon from 'catamaran/icons/Plus';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  addButton: {
    borderRadius: theme.spacing(0, 0, 2, 2),
    boxShadow: theme.shadows[2],
    height: '100% !important',
    justifyContent: 'flex-end',
    paddingRight: '16px !important',
    width: '100% !important'
  },
  root: { minHeight: '48px' }
}));

type Props = {
  addButtonDisabled?: boolean;
  addButtonDisabledTooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  text: string | ReactElement;
  visible?: boolean;
};

function CardFooter(props: Props) {
  const classes = useStyles();
  const {
    className,
    disabled = false,
    onClick,
    text,
    visible = true,
    addButtonDisabled,
    addButtonDisabledTooltipTitle
  } = props;

  if (!visible) {
    return null;
  }

  const renderContent = () => (
    <>
      <Box bgcolor="darkGrey.main" component={Divider} height="1px" opacity={0.1} />
      <CatButton
        className={classes.addButton}
        color="blue"
        disabled={disabled || addButtonDisabled}
        endIcon={<PlusIcon />}
        onClick={onClick}
        overflowThreeDot
        transformText={false}
      >
        {text}
      </CatButton>
    </>
  );

  return (
    <Grid className={clsx(classes.root, className)} item>
      {addButtonDisabled ? (
        <CatTooltip placement="top" title={addButtonDisabledTooltipTitle}>
          <span>{renderContent()}</span>
        </CatTooltip>
      ) : (
        <>{renderContent()}</>
      )}
    </Grid>
  );
}

export default CardFooter;
