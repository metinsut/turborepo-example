import { CatChip, CatIconButton, CatTextField } from 'catamaran/core';
import { InputAdornment } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import LoadingIcon from 'catamaran/icons/Loading';
import NotFoundIcon from 'catamaran/icons/NotFound';
import SearchIcon from 'catamaran/icons/Search';

type Props = {
  onChange?: (inputText: string) => void;
  loading?: boolean;
  searchText?: string;
  found?: boolean;
};

const InputField = (props: Props) => {
  const { onChange, loading, searchText, found } = props;
  const { t } = useTranslation();

  const handleInputChange = (e: any) => {
    onChange(e.target.value);
  };

  const clearInputValue = () => {
    onChange('');
  };

  const renderEndIcon = () => {
    if (loading) {
      return <LoadingIcon color="blue" contained={false} />;
    }
    if (!found && searchText) {
      return (
        <CatChip
          icon={<NotFoundIcon fontSize="small" />}
          label={t('layout.content_layout.search.not_found')}
          onClick={clearInputValue}
          onDelete={clearInputValue}
          onMouseDown={(e) => e.preventDefault()}
          size="medium"
          variant="outlined"
        />
      );
    }
    if (searchText) {
      return (
        <CatIconButton onClick={() => clearInputValue()} onMouseDown={(e) => e.preventDefault()}>
          <CancelIcon color="darkGrey" />
        </CatIconButton>
      );
    }
    return <div />;
  };

  return (
    <CatTextField
      autoFocus
      focused
      InputProps={{
        endAdornment: <InputAdornment position="end">{renderEndIcon()}</InputAdornment>,
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon contained={false} fontSize="medium" hoverable={false} opacity={0.8} />
          </InputAdornment>
        )
      }}
      onChange={handleInputChange}
      placeholder={t('layout.content_layout.search.search_placeholder')}
      value={searchText}
    />
  );
};

export default InputField;
