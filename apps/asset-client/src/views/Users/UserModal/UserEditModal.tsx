import { CatDialog, CatDialogContent, CatDialogTitle } from 'catamaran/core';
import { DisplayType } from 'utils';
import { SectionType, UserModalType, decideDisabled, decideNextSection } from './helpers';
import {
  checkCurrentUserAuthorizedAllBranches,
  initializeUserModal
} from 'store/slices/users/details/actions';
import { clearUserDetail } from 'store/slices/users/details/slice';
import { selectUser } from 'store/slices/users/details/selectors';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import AddPersonIcon from 'catamaran/icons/AddPerson';
import AdministrativePermissions from './AdministrativePermissions/AdministrativePermissions';
import AssetSpecifications from './AssetSpecifications';
import Branches from './Branches/Branches';
import GeneralAdminSection from './GeneralAdminSection';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import UserOperationOptions from './UserOperationOptions';

type Props = {
  id?: string;
  onClose?: () => void;
  open: boolean;
  userModalType?: UserModalType;
};

function UserEditModal(props: Props) {
  const { id, onClose, open, userModalType } = props;
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const mode: DisplayType = 'edit';

  const [activeSection, setActiveSection] = useState<SectionType>('');
  const [currentModalType, setCurrentModalType] = useState<UserModalType>(userModalType);

  const user = useTypedSelector(selectUser);

  useEffect(() => {
    if (id) {
      dispatch(initializeUserModal(id));
    }
  }, [dispatch, id]);

  useEffect(
    () => () => {
      dispatch(clearUserDetail());
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(checkCurrentUserAuthorizedAllBranches());
  }, [dispatch]);

  const handleModalTypeChange = async () => {
    if (currentModalType === 'standardUser') {
      setCurrentModalType('generalAdmin');
    } else {
      setCurrentModalType('standardUser');
    }
  };

  const getSectionProps = (sectionType: SectionType) => ({
    disabled: decideDisabled(activeSection, sectionType, user?.assetRole?.name ?? ''),
    editVisible: true,
    isActive: activeSection === sectionType,
    mode,
    onActivate: async (active: boolean, cancel: boolean, close: boolean = false) => {
      const nextSection = decideNextSection(
        activeSection,
        sectionType,
        active,
        cancel,
        close,
        mode,
        onClose,
        user?.assetRole?.name ?? ''
      );
      if (nextSection !== undefined) {
        setActiveSection(nextSection);
      }
    },
    userId: id
  });

  return (
    <CatDialog onClose={onClose} open={open} size="large">
      <CatDialogTitle
        actionArea={<UserOperationOptions onModalTypeChange={handleModalTypeChange} user={user} />}
        closable
        iconComponent={AddPersonIcon}
        title={t('users.modal.header_edit')}
      />
      <CatDialogContent>
        <PersonalInformation {...getSectionProps('personalInformation')} onModalClose={onClose} />
        {currentModalType === 'standardUser' && (
          <>
            <div className="divider-horizontal mt16" />
            <AssetSpecifications
              activeSection={activeSection}
              departmentVisible={user?.assetRole?.name !== 'RequestOnly'}
              getSectionProps={getSectionProps}
              mode={mode}
              userId={id}
            />
            <div className="divider-horizontal mt16" />
            <Branches {...getSectionProps('branches')} />
            <div className="divider-horizontal mt16" />
            <AdministrativePermissions {...getSectionProps('permissions')} />
          </>
        )}
        {userModalType === 'generalAdmin' && <GeneralAdminSection className="mt16" mode={mode} />}
      </CatDialogContent>
    </CatDialog>
  );
}

export default withDialogWrapper(UserEditModal);
