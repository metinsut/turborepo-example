import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Avatar from '.';
import Box from '../Box';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: (props: StyleProps) => ({
    '& .Avatar-large:not(:first-child)': {
      marginLeft: -16
    },
    '& .Avatar-medium:not(:first-child)': {
      marginLeft: -12
    },
    '& .Avatar-small:not(:first-child)': {
      marginLeft: -8
    },
    '& .Avatar-xLarge:not(:first-child)': {
      marginLeft: -48
    },
    [`& .MuiAvatar-root:nth-child(n+${props.maxCount})`]: {
      display: 'none'
    },
    '& .MuiAvatar-root.Avatar-count': {
      display: props.childCount - props.maxCount + 1 > 0 ? 'flex' : 'none'
    }
  })
}));

type Props = {
  className?: string;
  children: React.ReactNode;
  maxCount?: number;
};

type StyleProps = {
  maxCount: number;
  childCount: number;
};

function AvatarGroup(props: Props) {
  const { className, children, maxCount = 4 } = props;
  const childrenArray = React.Children.toArray(children);
  const classes = useStyles({ childCount: childrenArray.length, maxCount });
  const { size } = (childrenArray[0] as any).props;

  return (
    <Box className={clsx(classes.root, className)} flex>
      {children}
      <Avatar className="Avatar-count" key="more" size={size}>
        +{childrenArray.length - maxCount + 2}
      </Avatar>
    </Box>
  );
}

export default AvatarGroup;
