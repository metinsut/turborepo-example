import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import React, { ReactElement } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  descriptionText?: string | ReactElement;
  headerIcon?: React.ReactNode;
  headerText?: string | ReactElement;
};

function EditHeader(props: Props) {
  const classes = useStyles();
  const { className, descriptionText, headerIcon, headerText } = props;

  return (
    <Box alignItems="flex-start" className={clsx(classes.root, className)} flex>
      {headerIcon}
      <Box ml={2} mt="4px">
        <Box mb={1}>
          <Typography style={{ opacity: 0.8 }} variant="subtitle1">
            {headerText}
          </Typography>
        </Box>
        <Box>
          <Typography style={{ opacity: 0.6 }} variant="body2">
            {descriptionText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default EditHeader;
