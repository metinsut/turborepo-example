import {
  Box,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatTypography
} from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { Trans, useTranslation } from 'react-i18next';
import { User } from 'store/slices/users/details/types';
import { withDialogWrapper } from 'hooks';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import UpdateIcon from 'catamaran/icons/Update';

type Props = {
  className?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  user?: User;
};

function UserUnresignModal(props: Props) {
  const { className, onClose, open, onConfirm, user } = props;

  const { t } = useTranslation();

  const handleUnresign = async () => {
    await onConfirm();
    onClose();
  };

  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <CatDialog className={className} onAction={handleUnresign} onClose={onClose} open={open}>
      <CatDialogTitle
        iconComponent={UpdateIcon}
        title={<Trans i18nKey="users.modal.unresign.header" t={t} />}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.modal.unresign.description" t={t} values={{ userName }} />
        </CatTypography>
        <Box alignItems="center" flex mt={3}>
          <UpdateIcon color="darkGrey" contained={false} hoverable={false} />
          <Box ml={1}>
            <AvatarItem size="large" user={user} />
          </Box>
          <Box flex flexDirection="column" ml={1}>
            <CatTypography className="opacity-8" variant="body2">
              {userName}
            </CatTypography>
            {user.jobTitle && (
              <Box mt={0.25}>
                <CatTypography className="opacity-6" variant="caption">
                  {user.jobTitle ?? ''}
                </CatTypography>
              </Box>
            )}
          </Box>
        </Box>
      </CatDialogContent>
      <CatDialogAction>
        <CatDialogButton component={GoBackButton} variant="close" />
        <CatDialogButton color="green" endIcon={<UpdateIcon />} size="large" variant="action">
          {t('common.unresign')}
        </CatDialogButton>
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(UserUnresignModal);
