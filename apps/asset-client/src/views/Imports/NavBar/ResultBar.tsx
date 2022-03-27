import { CancelButton, GoBackButton } from 'catamaran/core/Button';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatIconButton,
  CatTypography
} from 'catamaran/core';
import { Grid, LinearProgress, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useDialogState } from 'hooks';
import { useTranslation } from 'react-i18next';
import ArrowRightIcon from 'catamaran/icons/ArrowRight';
import CancelIcon from 'catamaran/icons/Cancel';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  resultGrid: {
    margin: theme.spacing(1, 0)
  },
  root: {
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '100%'
  },
  text: {
    margin: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
  cancelMessage?: string;
  headerMessage?: string;
  onCancelConfirmed?: () => Promise<void>;
  onShowImport?: () => void;
  percentage?: number;
  resultMessage?: string;
};

function NavBarResultBar(props: Props) {
  const {
    className,
    cancelMessage,
    headerMessage,
    onCancelConfirmed,
    onShowImport,
    percentage,
    resultMessage
  } = props;
  const classes = useStyles();

  const { t } = useTranslation();
  const { isOpen, togglePopup } = useDialogState();

  const handleCancelOpen = () => {
    togglePopup(true);
  };

  const handleCancelConfirmed = async () => {
    togglePopup(false);
    await onCancelConfirmed();
  };

  const handleCancelClosed = () => {
    togglePopup(false);
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <CatDialog onAction={handleCancelConfirmed} onClose={handleCancelClosed} open={isOpen}>
        <CatDialogTitle iconComponent={CancelIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">{cancelMessage}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={CancelButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
      <Typography align="center" className={classes.text} component="p" variant="caption">
        {headerMessage}
      </Typography>
      <LinearProgress value={percentage} variant="determinate" />
      <Grid className={classes.resultGrid} container justifyContent="space-between">
        <Grid item>
          <CatIconButton onClick={handleCancelOpen}>
            <CancelIcon color="red" contained fontSize="small" />
          </CatIconButton>
        </Grid>
        <Grid item>
          <Typography align="center" component="p" variant="caption">
            {resultMessage}
          </Typography>
        </Grid>
        <Grid item>
          <CatIconButton onClick={onShowImport}>
            <ArrowRightIcon color="darkGrey" contained fontSize="small" />
          </CatIconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NavBarResultBar;
