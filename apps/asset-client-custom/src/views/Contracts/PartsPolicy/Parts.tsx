import { CatAreaButton } from 'catamaran/core';
import { Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { PartsPolicy } from 'store/slices/contracts/types';
import { addPartToPartPolicy } from 'store/slices/contracts/actions';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { useUniqueIds } from 'hooks/useUniqueIds';
import PartsItem from './PartsItem';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  titleRow: {
    margin: theme.spacing(1, 0)
  }
}));

type Props = {
  className?: string;
  partsPolicy: PartsPolicy;
};

function Parts(props: Props) {
  const classes = useStyles();
  const { className, partsPolicy } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const partIds = useUniqueIds(partsPolicy.partList.length);

  let headerText;
  switch (partsPolicy.partPolicyType) {
    case 'somePartsNotIncluded':
      headerText = t('contracts.edit.parts.list_title_excl');
      break;
    case 'somePartsIncluded':
      headerText = t('contracts.edit.parts.list_title_incl');
      break;
    default:
      headerText = '';
      break;
  }

  const handleAddClick = () => {
    dispatch(addPartToPartPolicy());
  };

  return (
    <Grid className={clsx(classes.root, className)} container direction="row">
      <Grid className={classes.titleRow} container direction="row">
        <Grid item>
          <Typography variant="subtitle1">{headerText}</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        {partsPolicy.partList.map((part, index) => (
          <Grid item key={partIds[index] ?? index} xs={6}>
            <PartsItem index={index} name={part} />
          </Grid>
        ))}
        <Grid item xs={6}>
          <CatAreaButton onClick={handleAddClick}>
            <Typography color="inherit" variant="subtitle2">
              {t('contracts.edit.parts.add_button')}
            </Typography>
          </CatAreaButton>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default Parts;
