import { CatDialog, CatDialogContent, CatDialogTitle } from 'catamaran/core';
import { DisplayType } from 'utils';
import {
  SectionProps,
  SectionType,
  UserModalType,
  decideDisabled,
  decideNextSection
} from './helpers';
import {
  checkCurrentUserAuthorizedAllBranches,
  validateUserPermissions
} from 'store/slices/users/details/actions';
import { clearUserDetail } from 'store/slices/users/details/slice';
import {
  selectAddedUserIds,
  selectInitialUser,
  selectUser
} from 'store/slices/users/details/selectors';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, withDialogWrapper } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AddOrInviteUser from './AddOrInviteUser/AddOrInviteUser';
import AddPersonIcon from 'catamaran/icons/AddPerson';
import AdministrativePermissions from './AdministrativePermissions/AdministrativePermissions';
import AssetSpecifications from './AssetSpecifications';
import Branches from './Branches/Branches';
import GeneralAdminSection from './GeneralAdminSection';
import UserAddedWarning from './UserAddedWarning';

type Props = {
  onClose?: () => void;
  onConfirm?: () => void;
  open: boolean;
  userModalType?: UserModalType;
};

function UserAddModal(props: Props) {
  const { onClose, onConfirm, open, userModalType } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const mode: DisplayType = 'add';

  const initialActiveSection: SectionType = userModalType === 'generalAdmin' ? 'invite' : 'role';
  const [activeSection, setActiveSection] = useState<SectionType>(initialActiveSection);

  const addedUserIds = useTypedSelector(selectAddedUserIds);
  const editVisible = addedUserIds.length === 0;

  const user = useTypedSelector(selectUser);
  const initialUser = useTypedSelector(selectInitialUser);

  useEffect(() => {
    dispatch(checkCurrentUserAuthorizedAllBranches());
  }, [dispatch]);

  useEffect(
    () => () => {
      dispatch(clearUserDetail());
    },
    [dispatch]
  );

  const arePermissionsValid = useMemo(() => validateUserPermissions(user), [user]);

  const getSectionProps = (sectionType: SectionType): SectionProps => ({
    disabled: decideDisabled(activeSection, sectionType, user?.assetRole?.name ?? ''),
    editVisible,
    isActive: activeSection === sectionType,
    mode,
    onActivate: async (active: boolean, cancel: boolean) => {
      const roleSaved = !!initialUser.assetRole;
      const nextSection = decideNextSection(
        activeSection,
        sectionType,
        active,
        cancel,
        roleSaved,
        mode,
        onClose,
        user?.assetRole?.name ?? ''
      );
      if (nextSection !== undefined) {
        setActiveSection(nextSection);
      }
    }
  });

  const headerText = useMemo(() => {
    if (userModalType === 'generalAdmin') {
      return t('users.modal.general_admin_header');
    }
    return t('users.modal.header_add');
  }, [t, userModalType]);

  return (
    <CatDialog onClose={onClose} open={open} size="large">
      <CatDialogTitle closable iconComponent={AddPersonIcon} title={headerText} />
      <CatDialogContent>
        {userModalType === 'standardUser' && (
          <>
            <AssetSpecifications
              activeSection={activeSection}
              departmentVisible={user?.assetRole?.name !== 'RequestOnly'}
              getSectionProps={getSectionProps}
              mode={mode}
            />
            <div className="divider-horizontal mt16" />
            <Branches {...getSectionProps('branches')} />
            <div className="divider-horizontal mt16" />
            <AdministrativePermissions {...getSectionProps('permissions')} />
            <UserAddedWarning visible={!editVisible} />
          </>
        )}
        {userModalType === 'generalAdmin' && <GeneralAdminSection className="mt16" mode={mode} />}
        <AddOrInviteUser
          {...getSectionProps('invite')}
          editDisabled={!arePermissionsValid}
          onClose={onClose}
          onConfirm={onConfirm}
          userModalType={userModalType}
        />
      </CatDialogContent>
    </CatDialog>
  );
}

export default withDialogWrapper(UserAddModal);
