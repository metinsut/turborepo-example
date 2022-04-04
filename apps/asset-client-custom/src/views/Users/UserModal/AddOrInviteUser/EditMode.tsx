import { Box } from 'catamaran/core';
import { CloseButton, ConfirmButton, GoBackButton } from 'catamaran/core/Button';
import { Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { UserModalType } from '../helpers';
import { isArrayNullOrEmpty } from 'utils';
import { selectAddedUserIds } from 'store/slices/users/details/selectors';
import { useDialogState } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AddOrInviteOptionCard from './AddOrInviteOptionCard';
import AddPersonIcon from 'catamaran/icons/AddPerson';
import AddUserSection from './AddUser/AddUserSection';
import EditHeader from 'components/Sections/EditHeader';
import InviteUserSection from './InviteUser/InviteUserSection';
import MailIcon from 'catamaran/icons/Mail';
import OptionChangedModal from './OptionChangedModal';
import PlusIcon from 'catamaran/icons/Plus';
import React, { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type AddInviteOption = 'add' | 'invite';

type Props = {
  className?: string;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
  userModalType: UserModalType;
};

function EditMode(props: Props) {
  const classes = useStyles();
  const { className, onGoBack, onConfirm, onNext, userModalType } = props;

  const { t } = useTranslation();
  const [selectedSubSection, setSelectedSubSection] = useState<AddInviteOption>(undefined);
  const [subSectionEditing, setSubSectionEditing] = useState<boolean>(false);
  const addedUserIds = useTypedSelector(selectAddedUserIds);

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  const handleGoBack = () => {
    onGoBack();
  };

  const handleSubSectionClick = (subSection: AddInviteOption) => {
    if (subSectionValuesChanged && subSection !== selectedSubSection) {
      toggleOptionChangedPopup(true);
    } else {
      if (!selectedSubSection) {
        setSubSectionEditing(true);
      }
      setSelectedSubSection(subSection);
    }
  };

  const handleSubSectionEditingChange = (editing: boolean) => {
    setSubSectionEditing(editing);
  };

  const [subSectionValuesChanged, setSubSectionValuesChanged] = useState<boolean>(false);
  const handleValuesChanged = (isChanged: boolean) => {
    setSubSectionValuesChanged(isChanged);
  };

  const { isOpen: optionChangedOpen, togglePopup: toggleOptionChangedPopup } = useDialogState();

  const optionChangedConfirm = () => {
    setSelectedSubSection(selectedSubSection === 'add' ? 'invite' : 'add');
    setSubSectionValuesChanged(false);
    toggleOptionChangedPopup();
  };

  const handleSubSectionCancel = () => {
    setSelectedSubSection(undefined);
    setSubSectionValuesChanged(false);
  };

  return (
    <>
      <Box className={clsx(classes.root, className)}>
        <EditHeader
          descriptionText={t('users.modal.add_or_invite_users.description')}
          headerIcon={<AddPersonIcon contained={false} hoverable={false} opacity={0.8} />}
          headerText={t('users.modal.add_or_invite_users.title')}
        />
        <Box flex mt={2}>
          <AddOrInviteOptionCard
            description={t('users.modal.add_or_invite_users.invite_user_description')}
            disabled={!isArrayNullOrEmpty(addedUserIds)}
            icon={<MailIcon />}
            onClick={() => handleSubSectionClick('invite')}
            selected={selectedSubSection === 'invite'}
            title={t('users.modal.add_or_invite_users.invite_user_title')}
          />
          <AddOrInviteOptionCard
            description={t('users.modal.add_or_invite_users.add_user_description')}
            icon={<PlusIcon />}
            onClick={() => handleSubSectionClick('add')}
            selected={selectedSubSection === 'add'}
            title={t('users.modal.add_or_invite_users.add_user_title')}
          />
        </Box>
        {selectedSubSection === 'add' && (
          <Box mt={2}>
            <AddUserSection
              onCancel={handleSubSectionCancel}
              onSubSectionEditingChange={handleSubSectionEditingChange}
              onValuesChanged={handleValuesChanged}
              subSectionEditing={subSectionEditing}
              userModalType={userModalType}
            />
          </Box>
        )}
        {selectedSubSection === 'invite' && (
          <InviteUserSection
            onCancel={handleSubSectionCancel}
            onResultsConfirm={handleConfirm}
            onValuesChanged={handleValuesChanged}
            userModalType={userModalType}
          />
        )}
        {(!selectedSubSection || (selectedSubSection === 'add' && !subSectionEditing)) && (
          <Box alignItems="center" flex ml={5} mt={2}>
            {userModalType === 'standardUser' ? (
              <GoBackButton disabled={!isArrayNullOrEmpty(addedUserIds)} onClick={handleGoBack} />
            ) : (
              <CloseButton disabled={!isArrayNullOrEmpty(addedUserIds)} onClick={onGoBack} />
            )}
            <Divider orientation="vertical" style={{ height: '16px', margin: '0 8px' }} />
            <ConfirmButton disabled={isArrayNullOrEmpty(addedUserIds)} onClick={handleConfirm} />
          </Box>
        )}
      </Box>
      <OptionChangedModal
        onClose={() => toggleOptionChangedPopup(false)}
        onDelete={optionChangedConfirm}
        open={optionChangedOpen}
      />
    </>
  );
}

export default EditMode;
