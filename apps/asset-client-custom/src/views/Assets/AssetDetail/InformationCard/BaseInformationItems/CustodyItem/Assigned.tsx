import { CatCardIconButton, CatCenterIcon, CatDataCard, CatSidebar } from 'catamaran/core';
import { Person } from 'store/slices/persons';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import EditIcon from 'catamaran/icons/Edit';
import PersonIcon from 'catamaran/icons/Person';
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
        <div className="grid grid-auto-flow-column justify-content-between align-items-start p8 gap-4 w-full">
          <div className="grid gap-4">
            <Typography className="three-dot" variant="body1">
              {`${person.firstName} ${person.lastName}`}
            </Typography>
            <Typography className="three-dot opacity-8" variant="body2">
              {t(`users.roles.${person.role}`)}
            </Typography>
          </div>
          <AvatarItem person={person} size="xLarge" />
        </div>
      </>
    </CatDataCard>
  );
}

export default Assigned;
