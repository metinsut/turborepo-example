import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import BottomBar from 'components/BottomBar';
import CategoryIcon from 'catamaran/icons/Category';
import CodeTypeSelectionButton from './CodeTypeSelectionButton';
import InfoIcon from 'catamaran/icons/Info';
import React, { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  bottomBar: {
    marginTop: theme.spacing(5),
    width: '100%'
  },
  codeInstruction: {
    borderRadius: theme.spacing(2),
    width: '100%'
  },
  codeInstructionGrid: {
    height: '100%',
    padding: theme.spacing(2)
  },
  codeInstructionText: {
    padding: theme.spacing(2)
  },
  root: {
    whiteSpace: 'pre-line'
  },
  verticalCenter: {
    alignSelf: 'center'
  }
}));

type Props = {
  className?: string;
  onConfirm: (isAutoCode: boolean) => void;
};

function CodeTypeSelectionPage(props: Props) {
  const classes = useStyles();
  const { className, onConfirm } = props;
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<string>();

  return (
    <div className={clsx(classes.root, className)}>
      <Paper className={classes.codeInstruction}>
        <Grid className={classes.codeInstructionGrid} container>
          <Grid className={classes.verticalCenter} item>
            <CategoryIcon contained />
          </Grid>
          <Grid item xs>
            <Typography className={classes.codeInstructionText} variant="h2">
              {t('locations.code_creation.title')}
            </Typography>
            <Typography className={classes.codeInstructionText} variant="body1">
              {t('locations.code_creation.desc')}
            </Typography>
          </Grid>
          <Grid className={classes.verticalCenter} item>
            <InfoIcon color="lightGrey" contained />
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={3} style={{ paddingTop: '20px' }}>
        <Grid item xs={6}>
          <CodeTypeSelectionButton
            onClick={() => setSelectedType('manual')}
            selected={selectedType === 'manual'}
            type="manual"
          />
        </Grid>
        <Grid item xs={6}>
          <CodeTypeSelectionButton
            onClick={() => setSelectedType('autoCode')}
            selected={selectedType === 'autoCode'}
            type="autoCode"
          />
        </Grid>
      </Grid>
      <BottomBar
        className={classes.bottomBar}
        isCancelDisabled
        isConfirmDisabled={!selectedType}
        isGoBackDisabled
        onCancel={async () => {}}
        onConfirm={async () => onConfirm(selectedType === 'autoCode')}
        onGoBack={() => {}}
      />
    </div>
  );
}

export default CodeTypeSelectionPage;
