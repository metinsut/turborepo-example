import { Box, CatKeyboardSection } from 'catamaran/core';
import { DisplayType } from 'utils';
import { dequal } from 'dequal';
import {
  selectInitialUserPersonalInformation,
  selectUserPersonalInformation
} from 'store/slices/users/details/selectors';
import { updateUserPersonalInformation } from 'store/slices/users/details/slice';
import { useDebounce } from 'react-use';
import { useFormState } from 'hooks/useFormState';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import ImageSelectorRoundButton from 'components/ImageSelector/ImageSelectorRoundButton';
import KeyboardSectionBottomButtons from 'components/KeyboardSectionBottomButtons';
import LockIcon from 'catamaran/icons/Lock';
import React, { useEffect } from 'react';
import userPersonalInformationValidator from 'helpers/validations/User/UserPersonalInformationValidator';

type Props = {
  mode?: DisplayType;
  onConfirm?: () => Promise<void>;
  onCancel?: () => Promise<void>;
  onGoBack?: () => void;
  onValuesChanged?: (changed: boolean) => void;
};

function PersonalInformationContent(props: Props) {
  const { mode, onConfirm, onCancel, onGoBack, onValuesChanged } = props;
  const { t } = useTranslation();

  const dispatch = useTypedDispatch();

  const personalInformation = useTypedSelector(selectUserPersonalInformation);
  const initialPersonalInformation = useTypedSelector(selectInitialUserPersonalInformation);
  const formHelper = useFormState(personalInformation, userPersonalInformationValidator);

  useDebounce(
    () => {
      const changedPersonalInfo = formHelper.formState.values;
      dispatch(updateUserPersonalInformation(changedPersonalInfo));
    },
    500,
    [dispatch, formHelper.formState.values]
  );

  const userChanged = !dequal(personalInformation, initialPersonalInformation);

  useEffect(() => {
    onValuesChanged?.(userChanged);
  }, [onValuesChanged, userChanged]);

  const handleConfirm = async () => {
    await onConfirm();
  };

  const handleCancel = async () => {
    if (mode === 'add') {
      await onCancel();
    } else {
      await onGoBack();
    }
  };

  return (
    <CatKeyboardSection onEnter={handleConfirm} onEscape={handleCancel} open>
      <Box flex flexDirection="row">
        <Box>
          <ImageSelectorRoundButton />
        </Box>
        <Box flex flexWrap="wrap" justifyContent="space-between" ml={2} style={{ width: '100%' }}>
          <Box mb={2} pr={1} width="50%">
            <CatamaranTextField
              formHelper={formHelper}
              label={t('users.modal.add_user.job_title_field')}
              mode="editOnly"
              name="jobTitle"
            />
          </Box>
          <Box mb={2} style={{ height: '40px' }} width="50%" />
          <Box mb={2} pr={1} width="50%">
            <CatamaranTextField
              formHelper={formHelper}
              isRequired
              label={t('users.modal.add_user.first_name_field')}
              mode="editOnly"
              name="firstName"
            />
          </Box>
          <Box mb={2} pl={1} width="50%">
            <CatamaranTextField
              formHelper={formHelper}
              isRequired
              label={t('users.modal.add_user.last_name_field')}
              mode="editOnly"
              name="lastName"
            />
          </Box>
          <Box mb={1} pr={1} width="50%">
            <CatamaranTextField
              adornments={[
                {
                  child: mode === 'edit' && <LockIcon color="red" hoverable={false} key={1} />,
                  hover: 'always',
                  position: 'end',
                  show: 'always'
                }
              ]}
              disabled={mode === 'edit'}
              formHelper={formHelper}
              isRequired
              label={t('users.modal.add_user.email_field')}
              mode="editOnly"
              name="email"
            />
          </Box>
          <Box mb={1} pl={1} width="50%">
            <CatamaranTextField
              formHelper={formHelper}
              isNumericString
              label={t('users.modal.add_user.phone_number_field')}
              mode="editOnly"
              name="phoneNumber"
            />
          </Box>
          <KeyboardSectionBottomButtons
            isConfirmDisabled={!formHelper.formState.isValid || !userChanged}
            mode={mode}
            touched={mode === 'edit' ? userChanged : true}
          />
        </Box>
      </Box>
    </CatKeyboardSection>
  );
}

export default PersonalInformationContent;
