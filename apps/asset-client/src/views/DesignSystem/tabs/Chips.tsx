import { Box, CatChip } from 'catamaran/core';
import { Chip, Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { showSnackbarMessage } from 'store/slices/application';
import { useTypedDispatch } from 'hooks';
import CheckIcon from 'catamaran/icons/Check';
import PersonIcon from 'catamaran/icons/Person';
import WarningIcon from 'catamaran/icons/Warning';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(1),
    width: '10vw'
  },
  root: {
    height: '70vh',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    width: '100%'
  }
}));

type Props = {
  className?: string;
};

function Chips(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();

  return (
    <Paper className={clsx(classes.root, className)}>
      <Box flex>
        <Box>
          <CatChip
            label="Deletable"
            onDelete={() => dispatch(showSnackbarMessage('Test success message', 'success'))}
          />
          <Box mt={1}>
            <CatChip
              label="Deletable Outlined"
              onDelete={() => dispatch(showSnackbarMessage('Test success message', 'success'))}
              variant="outlined"
            />
          </Box>
        </Box>
        <Box ml={2}>
          <Chip
            label="Deletable MUI"
            onDelete={() => dispatch(showSnackbarMessage('Test success message', 'success'))}
            size="small"
          />
          <Box mt={1}>
            <Chip
              label="Deletable Outlined MUI"
              onDelete={() => dispatch(showSnackbarMessage('Test success message', 'success'))}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
        <Box ml={2}>
          <CatChip label="Category: 4/9" />
          <Box mt={1}>
            <CatChip label="Category: 4/9" size="small" variant="outlined" />
          </Box>
        </Box>
        <Box ml={2}>
          <CatChip color="green" icon={<CheckIcon />} label="{Confirmed}" />
          <Box mt={1}>
            <CatChip color="green" icon={<CheckIcon />} label="Confirmed" variant="outlined" />
          </Box>
        </Box>
        <Box ml={2}>
          <CatChip color="red" icon={<WarningIcon />} label="Warning" />
          <Box mt={1}>
            <CatChip color="red" icon={<WarningIcon />} label="Warning" variant="outlined" />
          </Box>
        </Box>
        <Box ml={2}>
          <CatChip color="blue" icon={<PersonIcon />} label="New" />
          <Box mt={1}>
            <CatChip color="blue" label="New Outlined" variant="outlined" />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default Chips;
