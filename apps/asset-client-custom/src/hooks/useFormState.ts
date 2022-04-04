import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { Validator } from 'helpers/validations/types';
import { isObjectHasAnyDefinedProperty } from 'utils';

export type FormState<T> = {
  values?: T;
  defaultValues?: T;
  validatable?: boolean;
  isValid?: boolean;
  errors?: Partial<Record<keyof T, string>>;
  manualErrors?: Partial<Record<keyof T, string>>;
  touchedFields?: Partial<Record<keyof T, boolean>>;
  isTouched?: boolean;
};

type Getter<T> = () => T;

function validationHelper<T>(validator: Validator<T>, values: T, target?: any) {
  if (!validator) {
    return {
      isValid: true,
      validationErrors: {}
    };
  }

  const validationErrors = validator(values);
  const isValid = !isObjectHasAnyDefinedProperty(validationErrors);
  const targetErrors = validator(values, target);

  return {
    isValid,
    targetErrors,
    validationErrors
  };
}

function createFormState<T>(values: T | Getter<T>, validator: Validator<T>): FormState<T> {
  let finalValues = values as T;
  if (typeof values === 'function') {
    finalValues = (values as Getter<T>)();
  }
  const { isValid, validationErrors } = validationHelper(validator, finalValues);

  const formState: FormState<T> = {
    defaultValues: finalValues,
    errors: validationErrors,
    isTouched: false,
    isValid,
    manualErrors: {},
    touchedFields: {},
    validatable: !!validator,
    values: finalValues
  };

  return formState;
}

type HandleChange = (event: any, child?: any, overrideValue?: any) => void;

type ResetOptions = {
  forceIfNotChanged: boolean;
};

export type FormHelper<T> = {
  formState?: FormState<T>;
  setFormState?: Dispatch<SetStateAction<T>>;
  setManualErrorForField?: (fieldName: keyof T, error: string) => void;
  clearManualErrorForField?: (fieldName: keyof T) => void;
  handleChange?: HandleChange;
  clear?: () => void;
  reset?: (newValue?: T) => void;
  resetField?: (fieldName: keyof T, value: T[string & keyof T], options?: ResetOptions) => void;
  validate?: () => boolean;
};

export function useFormState<TEntity>(
  defaultValue: TEntity | Getter<TEntity>,
  validator?: Validator<TEntity>,
  options?: {
    autoCapitalizeProps: Partial<Record<keyof TEntity, boolean>>;
  }
): FormHelper<TEntity> {
  const [formState, setFormState] = useState(() => createFormState(defaultValue, validator));

  const handleChange = useCallback(
    (event: any, childObj?: any, overrideValue?: any) => {
      if (event.persist) {
        event.persist();
      }

      // For select and switches, target read from event.target.name, for text inputs, first condition isvalid
      const target: keyof TEntity = event.target.dataset?.name ?? event.target.name;

      // TODO: Type value
      let value: any;
      if (event.target.type === 'checkbox') {
        value = event.target.checked;
      } else {
        value = event.target.value;
        if (options?.autoCapitalizeProps[target]) {
          value = (value as string).toLocaleUpperCase();
        }
      }

      if (overrideValue !== undefined && overrideValue !== null) {
        value = overrideValue;
      }

      // @ts-ignore
      setFormState((prevFormState) => {
        const newValues = {
          ...prevFormState.values,
          [target]: value
        };

        const { isValid, targetErrors } = validationHelper(validator, newValues, target);
        const newErrors = {
          ...prevFormState.errors,
          ...targetErrors
        };

        const newTouchedFields = {
          ...prevFormState.touchedFields,
          [target]: prevFormState.defaultValues[target] !== newValues[target]
        };

        const isTouched = Object.values(newTouchedFields).reduce((acc, val) => acc || val, false);

        const { manualErrors } = prevFormState;
        delete manualErrors[target];

        const newFormState = {
          ...prevFormState,
          errors: newErrors,
          isTouched,
          isValid,
          manualErrors,
          touchedFields: newTouchedFields,
          values: newValues
        };

        return newFormState;
      });
    },
    [options, validator]
  );

  const setFormManually = useCallback(
    (newValue: SetStateAction<TEntity>): void => {
      let newValues = newValue as TEntity;
      setFormState((prevFormState) => {
        if (typeof newValues === 'function') {
          const tempFunc = newValue as (prev: TEntity) => TEntity;
          newValues = tempFunc(prevFormState.values);
        }

        const { isValid, validationErrors } = validationHelper(validator, newValues);

        // Touched fields
        const newTouchedFields = prevFormState.touchedFields;
        Object.keys(prevFormState.defaultValues).forEach((key) => {
          const typedKey = key as keyof TEntity;
          newTouchedFields[typedKey] =
            prevFormState.defaultValues[typedKey] !== newValues[typedKey];
        });

        const isTouched = Object.values(newTouchedFields).reduce(
          (acc, val) => acc || val,
          false
        ) as boolean;

        const newFormState = {
          ...prevFormState,
          errors: validationErrors,
          isTouched,
          isValid,
          touchedFields: newTouchedFields,
          values: newValues
        };

        return newFormState;
      });
    },
    [validator]
  );

  const setManualErrorForField = useCallback((fieldName: keyof TEntity, error: string): void => {
    setFormState((prevFormState) => {
      const newFormState = {
        ...prevFormState,
        manualErrors: {
          ...prevFormState.manualErrors,
          [fieldName]: error
        }
      };

      return newFormState;
    });
  }, []);

  const clearManualErrorForField = useCallback((fieldName: keyof TEntity): void => {
    setFormState((prevFormState) => {
      const { manualErrors } = prevFormState;
      delete manualErrors[fieldName];

      const newFormState = {
        ...prevFormState,
        manualErrors
      };

      return newFormState;
    });
  }, []);

  const validate = useCallback(() => {
    let valid = false;

    setFormState((prevFormState) => {
      const { isValid, validationErrors } = validationHelper(validator, prevFormState.values);
      valid = isValid;

      const newState = {
        ...prevFormState,
        errors: validationErrors,
        isValid
      };
      return newState;
    });

    return valid;
  }, [validator]);

  const clear = useCallback((): void => {
    setFormState((prevFormState) => createFormState(prevFormState.defaultValues, validator));
  }, [validator]);

  const reset = useCallback(
    (newValues: TEntity): void => {
      setFormState(() => createFormState(newValues, validator));
    },
    [validator]
  );

  const resetField = useCallback(
    (
      fieldName: keyof TEntity,
      value: TEntity[string & keyof TEntity],
      options: ResetOptions = { forceIfNotChanged: false }
    ): void => {
      const { forceIfNotChanged } = options;
      setFormState((previousFormState) => {
        const touchedFields = { ...previousFormState.touchedFields };
        const manualErrors = { ...previousFormState.manualErrors };
        const defaultValues = { ...previousFormState.defaultValues };
        const values = {
          ...previousFormState.values,
          [fieldName]: value
        };
        const { isValid, validationErrors } = validationHelper(validator, values);

        if (previousFormState.values[fieldName] !== value || forceIfNotChanged) {
          delete manualErrors[fieldName];
          delete touchedFields[fieldName];
          defaultValues[fieldName] = value;
        }

        return {
          ...previousFormState,
          defaultValues,
          errors: validationErrors,
          isValid,
          manualErrors,
          touchedFields,
          values
        };
      });
    },
    [validator]
  );

  const formHelper = useMemo(
    () => ({
      clear,
      clearManualErrorForField,
      formState,
      handleChange,
      reset,
      resetField,
      setFormState: setFormManually,
      setManualErrorForField,
      validate
    }),
    [
      clear,
      clearManualErrorForField,
      formState,
      handleChange,
      reset,
      resetField,
      setFormManually,
      setManualErrorForField,
      validate
    ]
  );

  return formHelper;
}
