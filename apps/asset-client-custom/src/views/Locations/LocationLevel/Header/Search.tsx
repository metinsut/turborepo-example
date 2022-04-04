import { CatIconButton } from 'catamaran/core';
import { Grid, Theme, makeStyles } from 'catamaran/core/mui';
import { useFormState } from 'hooks/useFormState';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SearchIcon from 'catamaran/icons/Search';
import ValidatedTextField from 'components/ValidatedTextField';
import clsx from 'clsx';
import searchValidator from 'helpers/validations/SearchValidator';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: theme.spacing(2, 1)
  },
  iconButton: {
    marginLeft: '3px'
  },
  root: {
    padding: theme.spacing(2, 1)
  },
  subheader: {
    padding: theme.spacing(0, 1, 1)
  }
}));

export type SearchItem = {
  keyword?: string;
};

type Props = {
  className?: string;
  onSearchClick?: () => void;
  searchKeyword?: string;
  setSearchKeyword?: Dispatch<SetStateAction<string>>;
};

function SearchLocationLevelHeader(props: Props) {
  const classes = useStyles();
  const { className, onSearchClick, searchKeyword, setSearchKeyword } = props;

  const searchItem: SearchItem = {
    keyword: searchKeyword
  };
  const formHelper = useFormState(searchItem, searchValidator);

  useEffect(() => {
    const { keyword } = formHelper.formState.values;
    setSearchKeyword(keyword);
  }, [formHelper.formState.values, setSearchKeyword]);

  return (
    <Grid className={clsx(classes.root, className)} container>
      <CatIconButton className={classes.iconButton} onClick={onSearchClick}>
        <SearchIcon color="lightGrey" contained fontSize="medium" />
      </CatIconButton>
      <Grid alignContent="center" container item justifyContent="center" xs>
        <ValidatedTextField
          formHelper={formHelper}
          margin="dense"
          name="keyword"
          size="small"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default SearchLocationLevelHeader;
