import { FormHelper } from './useFormState';

export type FormProps<T> = T & {
  helperText?: string;
  onChange: (date: string) => void;
  touched?: boolean;
  value: string;
  valid?: boolean;
};

type FormHelperProps<K> = {
  formHelper: FormHelper<K>;
  name: string & keyof K;
};

export function withFormHelper<T>(WrappedComponent: React.FunctionComponent<FormProps<T>>) {
  return (props: Partial<T> & FormHelperProps<any>) => {
    const { formHelper, name, ...rest } = props;
    const handleChange = (newValue: string) => {
      formHelper.setFormState((prev: any) => ({
        ...prev,
        [name]: newValue
      }));
    };

    const touched = !!formHelper.formState.touchedFields[name];
    const valid = !formHelper.formState.errors[name];
    const value = formHelper.formState.values[name] as any as string;
    const helperText = formHelper.formState.errors[name];

    return (
      <WrappedComponent
        helperText={helperText}
        onChange={handleChange}
        touched={touched}
        valid={valid}
        value={value}
        {...(rest as any as T)}
      />
    );
  };
}
