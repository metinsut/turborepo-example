import {
  Box,
  CatCardIconButton,
  CatCenterIcon,
  CatCornerContent,
  CatDataCard,
  CatMainContent,
  CatSidebar
} from 'catamaran/core';
import { Person } from 'store/slices/persons';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import AvatarItem from './AvatarItem';
import EditIcon from 'catamaran/icons/Edit';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  onDelete: Function;
  onEdit: () => void;
  person: Person;
};

function Assigned(props: Props) {
  const classes = useStyles();
  const { className, onEdit, person, onDelete } = props;

  const { t } = useTranslation();

  return (
    <CatDataCard className={clsx(className, classes.root)} color="blue">
      <>
        <CatSidebar>
          <CatCardIconButton onClick={onEdit}>
            <EditIcon color="lightBlue" />
          </CatCardIconButton>
          <CatCenterIcon component={PersonIcon} />
          <CatCardIconButton onClick={() => onDelete()}>
            <TrashIcon color="red" />
          </CatCardIconButton>
        </CatSidebar>
        <CatMainContent>
          <Box>
            <Typography variant="body1">{`${person.firstName} ${person.lastName}`}</Typography>
            <Typography variant="body2">{t(`users.roles.${person.role}`)}</Typography>
          </Box>
          <CatCornerContent>
            <Box
              alignItems="flex-end"
              flex
              fontSize={9}
              height={1}
              justifyContent="flex-end"
              textAlign="right"
              whiteSpace="pre-wrap"
            >
              <AvatarItem person={person} size="xLarge" />
            </Box>
          </CatCornerContent>
        </CatMainContent>
      </>
    </CatDataCard>
  );
}

export default Assigned;
