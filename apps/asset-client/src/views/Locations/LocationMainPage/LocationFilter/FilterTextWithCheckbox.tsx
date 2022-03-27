import {
  Checkbox,
  FormControlLabel,
  Grid,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { FormHelper } from 'hooks/useFormState';
import { LocationFilter } from 'store/slices/location/locationFilter/types';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import StyledValidatedTextField from 'components/StyledValidatedTextField';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    padding: theme.spacing(3, 3, 3, 2)
  },
  seperator: {
    alignSelf: 'center',
    padding: theme.spacing(1)
  }
}));

type Props = {
  checkboxLabel: string;
  checkboxName: keyof LocationFilter;
  className?: string;
  formHelper: FormHelper<LocationFilter>;
  textFieldLabel: string;
  textFieldName: keyof LocationFilter;
};

function FilterTextWithCheckbox(props: Props) {
  const classes = useStyles();
  const { checkboxLabel, checkboxName, className, formHelper, textFieldLabel, textFieldName } =
    props;

  const { t } = useTranslation();
  const handleCheckboxChange = (e: any) => {
    const value: boolean = e.target.checked;
    formHelper.handleChange({
      target: {
        name: textFieldName,
        value: ''
      }
    });

    formHelper.handleChange({
      target: {
        name: checkboxName,
        value
      },
      type: 'checkbox'
    });
  };

  return (
    <Grid className={clsx(classes.root, className)} container>
      <Grid item xs>
        <StyledValidatedTextField
          disabled={!!formHelper.formState.values[checkboxName]}
          formHelper={formHelper}
          label={textFieldLabel}
          margin="dense"
          name={textFieldName}
          variant="outlined"
        />
      </Grid>
      <Typography className={classes.seperator} variant="caption">
        OR
      </Typography>
      <Grid item xs={3}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!formHelper.formState.values[checkboxName]}
              onChange={handleCheckboxChange}
            />
          }
          label={<Trans components={{ bold: <b /> }} i18nKey={checkboxLabel} t={t} />}
          style={{ margin: 0 }}
        />
      </Grid>
    </Grid>
  );
}

export default FilterTextWithCheckbox;
