import { Box, CatPaper, CatTypography } from 'catamaran/core';
import { InvitationType, PersonalInformation } from 'store/slices/users/details/types';
import { NextButton } from 'catamaran/core/Button';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import CatamaranTextField, {
  CatamaranAdornment
} from 'components/CatamaranTextField/CatamaranTextField';
import ImageSelectorRoundButton from 'components/ImageSelector/ImageSelectorRoundButton';
import LockIcon from 'catamaran/icons/Lock';
import classes from './Invitation.module.scss';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';
import userPersonalInformationValidator from 'helpers/validations/User/UserPersonalInformationValidator';

type Props = {
  invitationType: InvitationType;
  onConfirm?: (personalInformation: PersonalInformation) => Promise<void>;
  personalInformation: PersonalInformation;
};

function getLockAdornment(visible: boolean) {
  const lockAdornment: CatamaranAdornment = {
    child: visible && <LockIcon color="red" hoverable={false} key={1} />,
    hover: 'always',
    position: 'end',
    show: 'always'
  };

  return lockAdornment;
}

export function RegisterPersonalInformationCard(props: Props) {
  const { invitationType, onConfirm, personalInformation } = props;

  const { t } = useTranslation();
  const formHelper = useFormState(personalInformation, userPersonalInformationValidator);

  const [confirmLoading, asyncConfirmLoading] = useLoadingWithoutDispatch<any>();

  const handleConfirm = async () => {
    const formUser = { ...formHelper.formState.values };
    await asyncConfirmLoading(onConfirm(formUser));
  };

  return (
    <CatPaper className={classes.personalInfo}>
      <Box className={classes.personalInfo_header}>
        <Box ml={3} mt={2}>
          <CatTypography variant="h2">{t('session.register_page.header')}</CatTypography>
        </Box>
      </Box>
      <hr className="divider-horizontal mx8" />
      <Box className={classes.personalInfo_content}>
        <Box>
          <ImageSelectorRoundButton />
        </Box>
        <Box className={classes.personalInfo_body}>
          <Box className={classes.personalInfo_textField}>
            <CatamaranTextField
              adornments={[getLockAdornment(invitationType === 'add')]}
              disabled={invitationType === 'add'}
              formHelper={formHelper}
              label={t('users.modal.add_user.job_title_field')}
              mode="editOnly"
              name="jobTitle"
            />
          </Box>
          <Box className={classes.personalInfo_textField} style={{ height: '40px' }} />
          <Box className={classes.personalInfo_textField}>
            <CatamaranTextField
              adornments={[getLockAdornment(invitationType === 'add')]}
              disabled={invitationType === 'add'}
              formHelper={formHelper}
              isRequired
              label={t('users.modal.add_user.first_name_field')}
              mode="editOnly"
              name="firstName"
            />
          </Box>
          <Box className={classes.personalInfo_textField}>
            <CatamaranTextField
              adornments={[getLockAdornment(invitationType === 'add')]}
              disabled={invitationType === 'add'}
              formHelper={formHelper}
              isRequired
              label={t('users.modal.add_user.last_name_field')}
              mode="editOnly"
              name="lastName"
            />
          </Box>
          <Box className={classes.personalInfo_textField}>
            <CatamaranTextField
              adornments={[getLockAdornment(true)]}
              disabled
              formHelper={formHelper}
              isRequired
              label={t('users.modal.add_user.email_field')}
              mode="editOnly"
              name="email"
            />
          </Box>
          <Box className={classes.personalInfo_textField}>
            <CatamaranTextField
              adornments={[getLockAdornment(invitationType === 'add')]}
              disabled={invitationType === 'add'}
              formHelper={formHelper}
              isNumericString
              label={t('users.modal.add_user.phone_number_field')}
              mode="editOnly"
              name="phoneNumber"
            />
          </Box>
          <Box className={classes.personalInfo_bottom}>
            <NextButton
              disabled={!formHelper.formState.isValid}
              loading={confirmLoading}
              onClick={handleConfirm}
            />
          </Box>
        </Box>
      </Box>
    </CatPaper>
  );
}

export default RegisterPersonalInformationCard;
