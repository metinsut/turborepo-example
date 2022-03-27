import { CatButton, CatMenuItem } from 'catamaran/core';
import {
  FormControl,
  Grid,
  Paper,
  Select,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { getAssetImportTemplateByCategoryId } from 'store/slices/imports/asset/actions';
import { selectAllMainCategories } from 'store/slices/session';
import { setImportCategoryId } from 'store/slices/imports/asset/slice';
import { useMemo } from 'react';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import ImportIcon from 'catamaran/icons/Import';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  downloadIcon: {
    color: '#69C9FD'
  },
  formControl: {
    width: '100%'
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  icon: {
    fontSize: '30px'
  },
  root: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  row: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1, 2.5)
  },
  top: {}
}));

type Props = {
  className?: string;
  categoryId: string;
};

function TemplateDownloadItem(props: Props) {
  const classes = useStyles();
  const { className, categoryId } = props;

  const dispatch = useTypedDispatch();

  const mainCategories = useTypedSelector(selectAllMainCategories);

  const selectValue = useMemo(() => {
    const isValueInList = mainCategories.find((p) => p.id === categoryId);
    if (isValueInList) {
      return categoryId;
    }
    return '';
  }, [mainCategories, categoryId]);

  const handleChange = (event: any) => {
    dispatch(setImportCategoryId(event.target.value));
  };

  const handleDownload = () => {
    dispatch(getAssetImportTemplateByCategoryId(categoryId));
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid
        alignItems="center"
        className={classes.row}
        container
        direction="row"
        justifyContent="space-around"
      >
        <Grid container direction="column" item spacing={2} xs={6}>
          <Grid item>
            <Typography component="p" variant="h5">
              Select Asset Form Type
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="body1">
              Download the excel template according to the category of assets you want to add in.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" item spacing={2} xs={6}>
          <Grid item>
            <FormControl className={classes.formControl} variant="outlined">
              <Select displayEmpty fullWidth onChange={handleChange} value={selectValue}>
                <CatMenuItem disabled key="" value="">
                  Please select
                </CatMenuItem>
                {mainCategories.map((c) => (
                  <CatMenuItem key={c.id} value={c.id}>
                    <b>{`${c.code} - `}</b>
                    {c.name}
                  </CatMenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {categoryId && (
              <Grid
                alignItems="center"
                container
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Grid item xs={9}>
                  <Typography component="p" variant="body1">
                    Please check <b>Location</b> and <b>Personnel IDs</b> in related tabs in the
                    downloaded excel template
                  </Typography>
                </Grid>
                <Grid container item justifyContent="flex-end" xs={3}>
                  <CatButton color="blue" endIcon={<ImportIcon />} onClick={handleDownload}>
                    Download Template
                  </CatButton>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TemplateDownloadItem;
