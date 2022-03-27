import { Chip, Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginLeft: theme.spacing(1)
  },
  root: {
    margin: theme.spacing(0.2, 1),
    width: 'auto'
  }
}));

type Props = {
  className?: string;
  fieldKey: string;
  fieldValue: string[];
  onDelete: (index: number) => void;
};

function FilterTopbarItem(props: Props) {
  const classes = useStyles();
  const { className, fieldKey, fieldValue, onDelete } = props;

  const { t } = useTranslation();

  return (
    <Grid alignItems="center" className={clsx(classes.root, className)} container item>
      <Typography>{`${t(fieldKey)}:`}</Typography>
      {fieldValue.map((value, index) => (
        <Chip
          className={classes.chip}
          color="primary"
          // eslint-disable-next-line react/no-array-index-key
          key={fieldKey + index}
          label={value}
          onDelete={() => onDelete(index)}
          size="small"
        />
      ))}
    </Grid>
  );
}

export default FilterTopbarItem;
