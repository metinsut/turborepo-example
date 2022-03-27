import { AvatarGroup, Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import {
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatIconButton,
  CatTypography
} from 'catamaran/core';
import { DeleteButton, GoBackButton } from 'catamaran/core/Button';
import { Person } from 'store/slices/persons';
import { useDialogState } from 'hooks';
import { useTranslation } from 'react-i18next';
import AvatarItem from './AvatarItem';
import Card from 'components/Card/Card';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  multiAvatar: {
    alignItems: 'end'
  },
  root: {},
  title: {
    marginBottom: theme.spacing(0.5),
    opacity: 0.4
  }
}));

type Props = {
  className?: string;
  deleteWarningText: string;
  leftIcon: React.ReactNode;
  onEditButtonClick: () => void;
  onDelete: () => void;
  persons: Person[];
  title?: string;
};

function Assigned(props: Props) {
  const classes = useStyles();
  const { className, deleteWarningText, leftIcon, onDelete, onEditButtonClick, persons, title } =
    props;

  const { t } = useTranslation();

  const { isOpen: deleteDialogOpen, togglePopup: toggleDeleteDialog } = useDialogState();
  const handleDeleteDialogConfirm = async () => {
    toggleDeleteDialog(false);
    await onDelete();
  };

  const handleDeleteDialogClose = () => {
    toggleDeleteDialog(false);
  };

  return (
    <>
      <CatDialog
        onAction={handleDeleteDialogConfirm}
        onClose={handleDeleteDialogClose}
        open={deleteDialogOpen}
      >
        <CatDialogTitle iconComponent={TrashIcon} title={t('common.warning')} />
        <CatDialogContent>
          <CatTypography variant="body1">{deleteWarningText}</CatTypography>
        </CatDialogContent>
        <CatDialogAction>
          <CatDialogButton component={GoBackButton} variant="close" />
          <CatDialogButton component={DeleteButton} variant="action" />
        </CatDialogAction>
      </CatDialog>
      <Card
        cardContent={(_hover) => (
          <Grid container direction="row" item justifyContent="space-between">
            {persons.length === 1 && (
              <Grid item>
                {title && (
                  <Typography className={classes.title} variant="subtitle1">
                    {title}
                  </Typography>
                )}
                <Typography variant="body1">
                  {`${persons[0].firstName} ${persons[0].lastName}`}
                </Typography>
                <Typography variant="body2">{t(`users.roles.${persons[0].role}`)}</Typography>
              </Grid>
            )}
            {persons.length > 1 && (
              <Grid item>
                {title && (
                  <Typography className={classes.title} variant="subtitle1">
                    {title}
                  </Typography>
                )}
                <Typography variant="body1">{`${persons.length} people selected`}</Typography>
              </Grid>
            )}
            {persons.length === 1 && <AvatarItem person={persons[0]} size="xLarge" />}
            {persons.length > 1 && (
              <AvatarGroup className={classes.multiAvatar} max={4}>
                {persons.map((person) => (
                  <AvatarItem key={person.id} person={person} />
                ))}
              </AvatarGroup>
            )}
          </Grid>
        )}
        cardLeftPanelContent={(hover) => (
          <Grid
            alignItems="center"
            container
            direction="column"
            item
            justifyContent={hover ? 'space-between' : 'center'}
          >
            {hover && (
              <CatIconButton onClick={onEditButtonClick}>
                <EditIcon color="blue" contained fontSize="medium" />
              </CatIconButton>
            )}
            {leftIcon}
            {hover && (
              <CatIconButton onClick={() => toggleDeleteDialog(true)}>
                <TrashIcon color="red" contained />
              </CatIconButton>
            )}
          </Grid>
        )}
        className={clsx(className, classes.root)}
      />
    </>
  );
}

export default Assigned;
