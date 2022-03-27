import { Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    color: '#FFF',
    fontSize: '8px',
    padding: theme.spacing(0.2, 0.4)
  },
  root: {
    backgroundColor: '#69C9FF',
    borderRadius: theme.spacing(1),
    marginLeft: '2px'
  },
  selectedBackground: {
    backgroundColor: '#FFF'
  },
  selectedTextColor: {
    color: '#69C9FF'
  }
}));

type Props = {
  className?: string;
  isSelected?: boolean;
};

function NewBadge(props: Props) {
  const classes = useStyles();
  const { className, isSelected } = props;
  const { t } = useTranslation();

  return (
    <Paper className={clsx(classes.root, className, isSelected && classes.selectedBackground)}>
      <Typography className={clsx(classes.content, isSelected && classes.selectedTextColor)}>
        {t('common.new')}
      </Typography>
    </Paper>
  );
}

export default NewBadge;
