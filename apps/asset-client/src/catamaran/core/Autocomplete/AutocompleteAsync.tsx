import { isArrayNullOrEmpty } from 'utils';
import { useDebounce } from 'react-use';
import { useMemo, useState } from 'react';
import Autocomplete, { AutoCompleteProps } from './Autocomplete';

type AutocompleteAsyncProps<T, K> = Omit<AutoCompleteProps<T, K>, 'options' | 'value'> & {
  fetchResults?: (searchText?: string) => Promise<T[]>;
};

function AutocompleteAsync<T, K>(props: AutocompleteAsyncProps<T, K>) {
  const { fetchResults, inputValue, onInputChange, selectedValues, multiple, ...rest } = props;

  const [localOptions, setLocalOptions] = useState<T[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const [input, setInput] = useState('');

  const handleInputChange = (event: any, value: string, reason: any) => {
    if (onInputChange) {
      onInputChange(event, value, reason);
    }

    if (reason !== 'reset' && reason !== 'clear') {
      setSearchLoading(true);
    }

    // When you select an item from list autocomplete trigger this callback with reason reset.
    if (reason !== 'reset') {
      setInput(value);
    }
  };

  useDebounce(
    async () => {
      if (input === '') {
        setLocalOptions([]);
      } else {
        let data: T[] = [];
        if (fetchResults) {
          data = await fetchResults(input);
        }
        const hasItem = (selectedValues as K[]).some((value: any) => data.includes(value));
        if (hasItem) {
          setLocalOptions(data);
        } else {
          setLocalOptions([...data, ...(selectedValues as any)]);
        }
      }
      setSearchLoading(false);
    },
    500,
    [input, fetchResults]
  );

  const finalOptions = useMemo(() => {
    if (!isArrayNullOrEmpty(localOptions)) return localOptions as any as T[];

    if (!selectedValues) {
      return [];
    }

    return Array.isArray(selectedValues)
      ? (selectedValues as any as T[])
      : [selectedValues as any as T];
  }, [localOptions, selectedValues]);

  const handleClose = () => {
    setInput('');
  };

  return (
    <Autocomplete
      clearOnBlur={false}
      inputValue={inputValue ?? input}
      loading={searchLoading}
      multiple={multiple}
      onClose={handleClose}
      onInputChange={handleInputChange}
      options={finalOptions ?? []}
      selectedValues={selectedValues}
      {...rest}
    />
  );
}

export default AutocompleteAsync;
