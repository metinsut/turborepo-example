import { FormHelper } from 'hooks/useFormState';
import { UserFilter } from 'store/slices/users/filter/types';
import { selectFirstName } from 'store/slices/users/filter/selectors';
import { updateFirstName } from 'store/slices/users/filter/slice';
import { useDebounce } from 'react-use';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';

interface Props {
  formHelper: FormHelper<UserFilter>;
}

const FirstName = ({ formHelper }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const firstNameStore = useTypedSelector(selectFirstName);
  const { firstName: firstNameLocal } = formHelper.formState.values;

  useDebounce(
    () => {
      dispatch(updateFirstName(firstNameLocal));
    },
    500,
    [dispatch, firstNameLocal]
  );

  const { resetField } = formHelper;

  useEffect(() => {
    resetField('firstName', firstNameStore);
  }, [firstNameStore, resetField]);

  return (
    <CatamaranTextField
      formHelper={formHelper}
      label={t('users.filter.first_name')}
      mode="editOnly"
      name="firstName"
    />
  );
};

export default FirstName;
