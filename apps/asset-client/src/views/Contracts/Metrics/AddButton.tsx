import { Card, CardActionArea, Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { MetricType } from 'store/slices/contracts/types';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';

import { Box } from 'catamaran/core';
import MetricIcon from './MetricIcon';
import PlusIcon from 'catamaran/icons/Plus';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

const useStyles = makeStyles((theme: Theme) => ({
  darkDivider: {
    backgroundColor: theme.palette.darkGrey[800]
  },
  darkGreyText: {
    color: theme.palette.darkGrey[600]
  },
  greenText: {
    color: theme.palette.green[800]
  },
  greyText: {
    color: theme.palette.lightGrey.main
  },
  lightDivider: {
    backgroundColor: theme.palette.lightGrey.main
  },
  root: {
    '& .MuiCardActionArea-root': {
      height: '100%'
    },
    '&:hover': {
      background: theme.palette.greenGradient[800]
    },
    background: theme.palette.greenGradient[100],
    borderRadius: theme.spacing(2),
    height: '104px',
    margin: theme.spacing(0, 1, 1, 0),
    opacity: '1',
    width: '224px'
  }
}));

type Props = {
  className?: string;
  metricType: MetricType;
  onAddClick?: (type: MetricType) => void;
};

function AddButton(props: Props) {
  const classes = useStyles();
  const { className, metricType, onAddClick } = props;

  const [hover, hoverProps] = useHover();
  const handleClick = () => {
    onAddClick(metricType);
  };

  const { t } = useTranslation();

  const metricTypeResource = metricType.isDefault
    ? t(`contracts.edit.metrics.types.${metricType.name}`)
    : metricType.name;

  return (
    <Card className={clsx(classes.root, className)} elevation={0} {...hoverProps}>
      <CardActionArea onClick={handleClick}>
        <Box flex flexDirection="row">
          <Box flex flexDirection="column" mx={1}>
            <MetricIcon
              color={hover ? 'lightGrey' : 'green'}
              contained={false}
              hoverable={false}
              metricType={metricType}
            />
            <Box my={1}>
              <Divider
                className={clsx({
                  [classes.lightDivider]: hover,
                  [classes.darkDivider]: !hover
                })}
              />
            </Box>
            <PlusIcon color={hover ? 'lightGrey' : 'green'} contained={false} hoverable={false} />
          </Box>
          <Box flex flexDirection="column" justifyContent="center" marginRight={3}>
            <Typography
              className={clsx({
                [classes.greenText]: !hover,
                [classes.greyText]: hover
              })}
              variant="body2"
            >
              <Trans
                components={{ bold: <b /> }}
                i18nKey="contracts.edit.metrics.add_metric_button_text"
                t={t}
                values={{ type: metricTypeResource }}
              />
            </Typography>
            <Box py="2px" />
            <Typography
              className={clsx({
                [classes.darkGreyText]: !hover,
                [classes.greyText]: hover
              })}
              component="p"
              variant="caption"
            >
              {t('contracts.edit.metrics.type_description', { type: metricTypeResource })}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default AddButton;
