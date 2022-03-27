import { AssetRole } from 'store/slices/users/details/types';
import { Box, CatKeyboardButton, CatKeyboardSection } from 'catamaran/core';
import {
  CancelButton,
  GoBackButton,
  NextButton,
  RevertButton,
  SaveButton
} from 'catamaran/core/Button';
import { DisplayType } from 'utils';
import { Fade } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { roleTraitResources } from 'store/slices/users/details/data';
import {
  selectAuthorizedForAllBranches,
  selectInitialUser,
  selectUser
} from 'store/slices/users/details/selectors';
import { setUserAssetRole } from 'store/slices/users/details/slice';
import { useCallback } from 'react';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { userRoles } from 'store/slices/users/common/data';
import EditHeader from 'components/Sections/EditHeader';
import PersonIcon from 'catamaran/icons/Person';
import RoleCard from './RoleCard/RoleCard';
import RoleTraitCard from './RoleTraitCard';

type Props = {
  mode?: DisplayType;
  onCancel?: () => void;
  onGoBack?: () => void;
  onConfirm?: () => void;
  onNext?: () => void;
};

function EditMode(props: Props) {
  const { mode, onCancel, onGoBack, onConfirm, onNext } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const user = useTypedSelector(selectUser);
  const userRole = user.assetRole;
  const hasTrait = userRole && roleTraitResources[userRole.name];
  const userAllBranchesSelected = user.branchAuthorization.allBranches;

  const initialUser = useTypedSelector(selectInitialUser);
  const initialUserRole = initialUser.assetRole;
  const roleNotChanged = userRole?.name === initialUserRole?.name;

  const authorizedForAllBranches = useTypedSelector(selectAuthorizedForAllBranches);

  const handleRoleSelect = useCallback(
    (role: AssetRole) => {
      dispatch(setUserAssetRole(role));
    },
    [dispatch]
  );

  const handleCancel = () => {
    onCancel();
    onGoBack();
  };

  const handleConfirm = async () => {
    await onConfirm();
    onNext();
  };

  const adminEnabledCondition =
    !authorizedForAllBranches || (mode === 'edit' && !userAllBranchesSelected);

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box mt={2}>
        <EditHeader
          descriptionText={t('users.modal.asset_roles.description')}
          headerIcon={<PersonIcon contained={false} hoverable={false} opacity={0.8} />}
          headerText={
            <Trans components={{ bold: <b /> }} i18nKey="users.modal.asset_roles.title" t={t} />
          }
        />
        <Box flex flexWrap="wrap" mt={2}>
          {userRoles.map((role) => (
            <Box key={role.name}>
              <RoleCard
                disabled={!!(role.name === 'Admin' && adminEnabledCondition)}
                hoverText={
                  role.name === 'Admin' &&
                  mode === 'edit' &&
                  !userAllBranchesSelected &&
                  t('users.modal.asset_roles.admin_dynamic_branch_warning')
                }
                onClick={() => handleRoleSelect(role)}
                roleType={role}
                selected={userRole?.name === role?.name}
              />
            </Box>
          ))}
        </Box>
        <Box
          flex
          height={hasTrait ? '180px' : '0px'}
          justifyContent="center"
          mt={2}
          style={{ transition: '0.5s' }}
        >
          {userRoles.map((role) => (
            <Fade in={role.name === userRole?.name} key={role.name}>
              <div style={{ position: 'absolute' }}>
                <RoleTraitCard role={role} />
              </div>
            </Fade>
          ))}
        </Box>
        <Box alignItems="center" flex>
          {roleNotChanged && mode === 'edit' ? (
            <CatKeyboardButton component={GoBackButton} keyboardKey="escape" />
          ) : (
            <CatKeyboardButton
              component={mode === 'add' ? CancelButton : RevertButton}
              keyboardKey="escape"
            />
          )}
          <Box className="divider-vertical mx16" />
          <CatKeyboardButton
            component={mode === 'edit' && userRole.name === 'RequestOnly' ? SaveButton : NextButton}
            disabled={!userRole}
            keyboardKey="enter"
          />
        </Box>
      </Box>
    </CatKeyboardSection>
  );
}

export default EditMode;
