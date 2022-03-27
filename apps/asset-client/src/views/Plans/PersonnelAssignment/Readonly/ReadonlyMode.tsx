import { Box, CatAvatarGroup, CatButton } from 'catamaran/core';
import { DisplayType, isArrayNullOrEmpty } from 'utils';
import { PersonnelAssignment } from 'store/slices/plans/types';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';

import { selectPersonById, selectPersonsByIds } from 'store/slices/persons';
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
  personnelAssignment?: PersonnelAssignment;
  onEditClick?: () => void;
  mode?: DisplayType;
};

function ReadonlyMode(props: Props) {
  const classes = useStyles();
  const { personnelAssignment, onEditClick, mode } = props;

  const { t } = useTranslation();
  const assistantPersonnels = useTypedSelector((state) =>
    selectPersonsByIds(state, personnelAssignment.assistantPersonnelIds)
  );

  const responsiblePersonnel = useTypedSelector((state) =>
    selectPersonById(state, personnelAssignment.responsiblePersonnelId)
  );

  const hasNoAssistants = isArrayNullOrEmpty(personnelAssignment.assistantPersonnelIds);
  const hasUndefined = assistantPersonnels.some((i) => i === undefined);

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
          {t('plans.edit.responsible_personnel_field')}
        </Typography>
        <Box alignItems="center" flex ml={1}>
          {responsiblePersonnel && (
            <>
              <AvatarItem person={responsiblePersonnel} size="medium" />
              <Box ml={0.5}>
                <Typography variant="body2">
                  {`${responsiblePersonnel.firstName} ${responsiblePersonnel.lastName}`}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
      {!hasNoAssistants && (
        <Box alignItems="center" display="flex" mb={2}>
          <Typography variant="body1">{t('plans.edit.assistant_personnel_field')}</Typography>
          <Box alignItems="center" flex ml={1}>
            {assistantPersonnels.length === 1 && !hasUndefined && (
              <>
                <AvatarItem person={assistantPersonnels[0]} size="medium" />
                <Box ml={0.5}>
                  <Typography variant="body2">
                    {`${assistantPersonnels[0].firstName} ${assistantPersonnels[0].lastName}`}
                  </Typography>
                </Box>
              </>
            )}
            {assistantPersonnels.length > 1 && !hasUndefined && (
              <>
                <CatAvatarGroup>
                  {assistantPersonnels.map((person) => (
                    <AvatarItem key={person.id} person={person} size="medium" />
                  ))}
                </CatAvatarGroup>
                <Box ml={0.5}>
                  <Typography variant="body2">
                    <i>
                      {t('plans.edit.multi_person_selected', { count: assistantPersonnels.length })}
                    </i>
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
      <CatButton color="blue" endIcon={<EditIcon />} onClick={onEditClick} size="small">
        {t('common.edit')}
      </CatButton>
    </>
  );
}

export default ReadonlyMode;
