import { FormHelper } from 'hooks/useFormState';
import { OpenBreakdown } from 'store/slices/breakdown/open/types';
import { maxDefinitionCharacterCount } from 'store/slices/breakdown/open/data';
import { setDefinition } from 'store/slices/breakdown/open/slice';
import { useDebounce } from 'react-use';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import CatamaranTextField from 'components/CatamaranTextField/CatamaranTextField';
import RemainingCharacters from 'components/RemainingCharacters';

type Props = {
  formHelper?: FormHelper<OpenBreakdown>;
};

function DefinitionItem({ formHelper }: Props) {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  useDebounce(
    () => {
      dispatch(setDefinition(formHelper.formState.values.definition));
    },
    500,
    [dispatch, formHelper.formState.values.definition]
  );

  return (
    <div className="gap-8 grid">
      <RemainingCharacters
        className="justify-self-end"
        currentCount={formHelper.formState.values.definition.length}
        maxCount={maxDefinitionCharacterCount}
      />
      <CatamaranTextField
        formHelper={formHelper}
        isRequired
        label={t('tasks.breakdowns.open_breakdown.definition_label')}
        mode="editOnly"
        multiline
        name="definition"
        rows={4}
      />
    </div>
  );
}

export default DefinitionItem;
