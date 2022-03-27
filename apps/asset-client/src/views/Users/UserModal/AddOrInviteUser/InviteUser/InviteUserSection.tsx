import { Box, CatButton, CatChipTextField, CatTypography } from 'catamaran/core';
import { CancelButton } from 'catamaran/core/Button';
import { Divider } from 'catamaran/core/mui';
import { InviteUserResponse } from 'store/slices/users/details/types';
import { Trans, useTranslation } from 'react-i18next';
import { UserModalType } from '../../helpers';
import {
  inviteGeneralAdminsFromEmail,
  inviteUsersFromEmail
} from 'store/slices/users/details/actions';
import { maxEmailCount } from 'store/slices/users/details/data';
import { useDialogState } from 'hooks';
import { useEffect, useMemo, useState } from 'react';
import { validateEmail } from 'helpers/validations/base/EmailValidator';
import Header from './Header';
import InfoIcon from 'catamaran/icons/Info';
import InviteResultDialog from './InviteResultDialog/InviteResultDialog';
import PostIcon from 'catamaran/icons/Post';
import useLoading from 'hooks/useLoading';

type Props = {
  onCancel?: () => void;
  onResultsConfirm?: () => void;
  onValuesChanged?: (changed: boolean) => void;
  userModalType: UserModalType;
};

function InviteUserSection(props: Props) {
  const { onCancel, onResultsConfirm, onValuesChanged, userModalType } = props;
  const { t } = useTranslation();

  const [postLoading, postLoadingDispatch] = useLoading<InviteUserResponse>();
  const [emails, setEmails] = useState<string[]>([]);

  const { isOpen, togglePopup } = useDialogState();
  const [inviteResults, setInviteResults] = useState<InviteUserResponse>();

  const handleConfirm = async () => {
    let inviteResult: InviteUserResponse;
    if (userModalType === 'generalAdmin') {
      inviteResult = await postLoadingDispatch(inviteGeneralAdminsFromEmail(emails));
    } else {
      inviteResult = await postLoadingDispatch(inviteUsersFromEmail(emails));
    }
    setInviteResults(inviteResult);
    togglePopup(true);
  };

  const validEmailCount = useMemo(() => {
    const validMails = emails.filter((email) => validateEmail(email));
    return validMails.length;
  }, [emails]);

  const allValid = emails.length === validEmailCount;
  const postDisabled = !allValid || emails.length === 0 || emails.length > maxEmailCount;

  useEffect(() => {
    onValuesChanged?.(validEmailCount > 0);
  }, [onValuesChanged, validEmailCount]);

  const handleInviteResultClose = () => {
    togglePopup(false);
    onResultsConfirm();
  };

  return (
    <Box className="mt16 mx4">
      <Header emailCount={validEmailCount} />
      <CatChipTextField emails={emails} onChange={(emails) => setEmails(emails)} />
      <Box alignItems="center" flex>
        <InfoIcon color="darkGrey" fontSize="small" hoverable={false} />
        <Box width="8px" />
        <CatTypography variant="caption">
          <Trans
            components={{ bold: <b /> }}
            i18nKey="users.modal.add_or_invite_users.invite_user_section.footer_description"
            t={t}
          />
        </CatTypography>
      </Box>
      <Box alignItems="center" flex ml={5} mt={2}>
        <CancelButton onClick={onCancel} />
        <Divider orientation="vertical" style={{ height: '16px', margin: '0 8px' }} />
        <CatButton
          color="green"
          disabled={postDisabled}
          endIcon={<PostIcon />}
          loading={postLoading}
          onClick={handleConfirm}
          size="large"
        >
          {t('users.modal.add_or_invite_users.invite_user_section.send_button')}
        </CatButton>
      </Box>
      <InviteResultDialog
        inviteResults={inviteResults}
        onClose={handleInviteResultClose}
        open={isOpen}
      />
    </Box>
  );
}

export default InviteUserSection;
