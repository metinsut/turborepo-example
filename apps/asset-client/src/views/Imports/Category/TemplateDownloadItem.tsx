import { CatButton } from 'catamaran/core';
import { Grid, Paper, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { getCategoryImportTemplate } from 'store/slices/imports/category/actions';
import { useTypedDispatch } from 'hooks';
import ImportIcon from 'catamaran/icons/Import';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
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
  top: {}
}));

type Props = {
  className?: string;
};

function TemplateDownloadItem(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();

  const handleDownload = () => {
    dispatch(getCategoryImportTemplate());
  };

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid className={classes.root} container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography component="p" variant="h5">
            Template
          </Typography>
          <Typography component="p" variant="body1">
            Please inspect the mapping first.
          </Typography>
          <Typography component="p" variant="body1">
            Then go ahead and download the template.
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" variant="h4">
            Template description image here
          </Typography>
        </Grid>
        <Grid item>
          <Grid item>
            <CatButton color="blue" endIcon={<ImportIcon />} onClick={handleDownload}>
              Download Template
            </CatButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TemplateDownloadItem;
