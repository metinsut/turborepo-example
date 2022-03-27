import { Box, CatAvatarGroup, CatButton } from 'catamaran/core';
import { DisplayType } from 'utils';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { selectPersonsByIds } from 'store/slices/persons';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import CloseIcon from 'catamaran/icons/Close';
import EditIcon from 'catamaran/icons/Edit';
import PlusIcon from 'catamaran/icons/Plus';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  notifyPersonIds?: string[];
  onEditClick?: () => void;
  mode?: DisplayType;
};

function ReadonlyMode(props: Props) {
  const classes = useStyles();
  const { notifyPersonIds, onEditClick, mode } = props;

  const { t } = useTranslation();

  const notifyPersons = useTypedSelector((state) => selectPersonsByIds(state, notifyPersonIds));

  return mode === 'add' ? (
    <>
      <Box alignItems="center" className="opacity-8" display="flex" mb={1}>
        <CloseIcon fontSize="large" />
        <Typography variant="subtitle1">{t('contracts.edit.no_info_added_yet')}</Typography>
      </Box>
      <CatButton color="green" endIcon={<PlusIcon />} onClick={onEditClick} size="small">
        {t('common.add')}
      </CatButton>
    </>
  ) : (
    <>
      <Box alignItems="center" display="flex" mb={2}>
        <Typography className="opacity-6" variant="body1">
          {t('plans.edit.notified_person_field')}
        </Typography>
        <Box alignItems="center" flex ml={1}>
          {notifyPersons.length === 1 && (
            <>
              <AvatarItem person={notifyPersons[0]} size="medium" />
              <Box ml={0.5}>
                <Typography variant="body2">
                  {`${notifyPersons[0].firstName} ${notifyPersons[0].lastName}`}
                </Typography>
              </Box>
            </>
          )}
          {notifyPersons.length > 1 && (
            <>
              <CatAvatarGroup>
                {notifyPersons.map((person) => (
                  <AvatarItem key={person.id} person={person} size="medium" />
                ))}
              </CatAvatarGroup>
              <Box ml={0.5}>
                <Typography variant="body2">
                  <i>{t('plans.edit.multi_person_selected', { count: notifyPersons.length })}</i>
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default ReadonlyMode;
