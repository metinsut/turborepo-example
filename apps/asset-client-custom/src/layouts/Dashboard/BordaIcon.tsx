import { Box } from 'catamaran/core';
import { Divider, Link, Theme, Typography, makeStyles, useMediaQuery } from 'catamaran/core/mui';
import { getServerSettings } from 'utils/settings';
import LighthouseLogo from 'catamaran/icons/LighthouseLogo';
import React, { useEffect } from 'react';
import clsx from 'clsx';

type StyleProps = {
  isLarge: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  deploymentText: {
    color: '#55959F',
    fontSize: (props: StyleProps) => (props.isLarge ? '10px' : '7px'),
    fontWeight: 400,
    lineHeight: '8px'
  },
  divider: {
    backgroundColor: theme.palette.darkGrey[200],
    height: '0.5px',
    marginBottom: '4px'
  },
  lighthouseText: {
    color: '#F0552C',
    fontSize: '12px',
    fontWeight: 900,
    lineHeight: '14.52px',
    opacity: '0.6'
  },
  root: {
    width: '100%'
  },
  versionText: {
    color: theme.palette.darkGrey.main,
    fontSize: '8px',
    lineHeight: '9.68px',
    opacity: '0.4'
  }
}));

type Props = {
  className?: string;
};

function BordaIcon(props: Props) {
  const { className } = props;
  const showLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const classes = useStyles({ isLarge: showLarge });

  const [deployment, setDeployment] = React.useState('');
  useEffect(() => {
    const getDeployment = async () => {
      const settings = await getServerSettings();
      setDeployment(settings.deployment.toLocaleUpperCase());
    };

    getDeployment();
  }, []);

  const largeIcon = (
    <Box flex>
      <LighthouseLogo />
      <Box flex flexDirection="column" flexGrow={1} mt="2px">
        <Typography className={classes.deploymentText}>{deployment}</Typography>
        <Typography className={classes.lighthouseText}>LIGHTHOUSE</Typography>
        <Divider className={classes.divider} />
        <Box alignItems="center" flex>
          <img
            alt="Borda"
            src="/borda.png"
            style={{
              height: '10px',
              marginBottom: '4px',
              marginRight: 4,
              opacity: '0.4',
              width: '32px'
            }}
          />
          <Typography className={classes.versionText} noWrap>
            {`v${process.env.REACT_APP_VERSION}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const smallIcon = (
    <Box center flex flexDirection="column">
      <LighthouseLogo />
      <img
        alt="Borda"
        src="/borda.png"
        style={{
          height: '10px',
          marginBottom: '4px',
          marginRight: 4,
          opacity: '0.4',
          width: '32px'
        }}
      />
      <Typography className={classes.deploymentText}>{deployment}</Typography>
      <Typography className={classes.versionText} noWrap>
        {`v${process.env.REACT_APP_VERSION}`}
      </Typography>
    </Box>
  );

  return (
    <Link className={clsx(classes.root, className)} href="/" underline="none">
      {showLarge ? largeIcon : smallIcon}
    </Link>
  );
}

export default BordaIcon;
