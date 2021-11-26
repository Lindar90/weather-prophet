import React, {
  useState, useEffect,
} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { debounce } from 'debounce';

interface IProps<T> {
  label: string,
  value: T | null,
  onChange: (value: T | null) => void,
  fetchOptions: (searchTerm: string) => Promise<T[]>
  searchThreshold?: number,
}

const SearchableAsyncSelect = <T,>(props: IProps<T>) => {
  const {
    label, value, fetchOptions, onChange, searchThreshold = 3,
  } = props;

  const [options, setOptions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleSearch = debounce(async () => {
      const foundOptions = await fetchOptions(inputValue);
      setOptions(foundOptions);
    }, 300);

    if (inputValue.length > searchThreshold) {
      handleSearch();
    }
  }, [inputValue, fetchOptions, searchThreshold]);

  return (
    <Autocomplete
      options={options}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
      filterOptions={(x) => x}
      value={value}
      autoComplete
      includeInputInList
    />
  );
};

SearchableAsyncSelect.defaultProps = {
  searchThreshold: 3,
};

export default SearchableAsyncSelect;
