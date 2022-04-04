import { CatIconButton } from 'catamaran/core';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import Card from 'components/Card/Card';
import InfoIcon from 'catamaran/icons/Info';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  onEditButtonClick: () => void;
  notAssignedTitle: string;
  notAssignedHoverTitle?: string;
  leftIcon: React.ReactNode;
};

function NotAssigned(props: Props) {
  const classes = useStyles();
  const { className, notAssignedTitle, notAssignedHoverTitle, leftIcon, onEditButtonClick } = props;

  const hoverContent = (
    <Grid alignItems="center" container justifyContent="space-between">
      <Typography color="primary" variant="subtitle1">
        {notAssignedTitle}
      </Typography>
      <CatIconButton onClick={onEditButtonClick}>
        <PlusIcon color="blue" contained fontSize="large" />
      </CatIconButton>
    </Grid>
  );

  const regularContent = (
    <Grid alignItems="center" container direction="row" spacing={1}>
      <InfoIcon color="lightGrey" contained fontSize="small" />
      <Grid item>
        <Typography variant="subtitle1">{notAssignedHoverTitle ?? notAssignedTitle}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card
      cardContent={(hover) => (
        <Grid container item>
          {hover ? hoverContent : regularContent}
        </Grid>
      )}
      cardLeftPanelContent={(_hover) => (
        <Grid alignItems="center" container direction="column" item justifyContent="center">
          {leftIcon}
        </Grid>
      )}
      className={clsx(classes.root, className)}
    />
  );
}

export default NotAssigned;
