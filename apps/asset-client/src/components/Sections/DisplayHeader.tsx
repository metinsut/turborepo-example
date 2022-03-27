import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React, { ReactElement } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  headerIcon?: React.ReactNode;
  headerText?: string | ReactElement;
};

function DisplayHeader(props: Props) {
  const classes = useStyles();
  const { className, headerIcon, headerText } = props;

  return (
    <Box alignItems="center" className={clsx(classes.root, className)} flex>
      {headerIcon}
      <Box flexDirection="row" ml={2}>
        <Box>
          <Typography style={{ opacity: 0.8 }} variant="subtitle1">
            {headerText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default DisplayHeader;
