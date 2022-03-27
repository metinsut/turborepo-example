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
import PersonIcon from 'catamaran/icons/Person';
import RetireIcon from 'catamaran/icons/Retire';

type Props = {
  className?: string;
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  user?: User;
};

function UserResignModal(props: Props) {
  const { className, onClose, open, onConfirm, user } = props;

  const { t } = useTranslation();

  const handleResign = async () => {
    await onConfirm();
    onClose();
  };

  const userName = `${user.firstName} ${user.lastName}`;

  return (
    <CatDialog className={className} onAction={handleResign} onClose={onClose} open={open}>
      <CatDialogTitle
        iconComponent={PersonIcon}
        title={<Trans i18nKey="users.modal.resign.header" t={t} />}
      />
      <CatDialogContent>
        <CatTypography variant="body1">
          <Trans i18nKey="users.modal.resign.description" t={t} values={{ userName }} />
        </CatTypography>
        <Box alignItems="center" flex mt={3}>
          <RetireIcon color="darkGrey" contained={false} hoverable={false} />
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
        <CatDialogButton color="red" endIcon={<RetireIcon />} size="large" variant="action">
          {t('common.resign')}
        </CatDialogButton>
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(UserResignModal);
