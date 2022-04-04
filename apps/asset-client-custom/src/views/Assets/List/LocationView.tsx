import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Node from 'components/Node';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: '#494949',
    display: 'block',
    height: '24px',
    opacity: 0.2,
    width: '9px'
  },
  branchInfo: {
    marginLeft: '2px',
    opacity: '0.6'
  },
  root: {
    height: '29px',
    opacity: 0.8,
    width: '167px'
  }
}));

type Props = {
  locationFullName: string;
  branchName: string;
};

function LocationView(props: Props) {
  const classes = useStyles();
  const { locationFullName, branchName } = props;

  const locationList = locationFullName ? locationFullName.split('-') : [];

  return (
    <Box center className={classes.root} flexDirection="column">
      <Box className={classes.branchInfo} flex>
        <Typography variant="caption">{`@${branchName}`}</Typography>
      </Box>
      <Box alignItems="center" flex>
        {locationList.map((item, index, array) => (
          <React.Fragment key={item}>
            <Box center flex>
              <Node filled={index === array.length - 1} value={item} />
            </Box>
            <Box center flex>
              {index < array.length - 1 && (
                <ArrowForwardIosIcon className={classes.arrow} fontSize="small" />
              )}
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default LocationView;
