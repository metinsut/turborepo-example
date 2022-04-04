import { FormHelper } from 'hooks/useFormState';
import { UserFilter } from 'store/slices/users/filter/types';
import { selectLastName } from 'store/slices/users/filter/selectors';
import { updateLastName } from 'store/slices/users/filter/slice';
import { useDebounce } from 'react-use';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';

interface Props {
  formHelper: FormHelper<UserFilter>;
}

const LastName = ({ formHelper }: Props) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const lastNameStore = useTypedSelector(selectLastName);
  const { lastName: lastNameLocal } = formHelper.formState.values;

  useDebounce(
    () => {
      dispatch(updateLastName(lastNameLocal));
    },
    500,
    [dispatch, lastNameLocal]
  );

  const { resetField } = formHelper;
  useEffect(() => {
    resetField('lastName', lastNameStore);
  }, [lastNameStore, resetField]);

  return (
    <CatamaranTextField
      formHelper={formHelper}
      label={t('users.filter.last_name')}
      mode="editOnly"
      name="lastName"
    />
  );
};

export default LastName;
