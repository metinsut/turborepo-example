import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Theme,
  Typography,
  makeStyles
} from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import AutoCodeIcon from 'catamaran/icons/AutoCode';
import CodeDemoCard from './CodeDemoCard';
import ManualCodeIcon from 'catamaran/icons/ManualCode';
import React from 'react';
import clsx from 'clsx';

type StyleProps = {
  selected: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: '100%'
  },
  iconBox: {
    padding: theme.spacing(1),
    width: '5rem'
  },
  root: (props: StyleProps) => ({
    backgroundColor: props.selected ? 'white' : 'transparent',
    border: props.selected ? '2px solid #69C9FF' : '2px solid rgba(73, 73, 73, 0.1)',
    borderRadius: theme.spacing(2),
    opacity: props.selected ? '1' : '0.8'
  })
}));

type Props = {
  className?: string;
  onClick: () => void;
  selected?: boolean;
  type: 'autoCode' | ('manual' & string);
};

function CodeTypeSelectionButton(props: Props) {
  const { className, onClick, selected, type } = props;
  const classes = useStyles({ selected });
  const { t } = useTranslation();

  return (
    <>
      <Card className={clsx(classes.root, className)} elevation={0}>
        <CardActionArea onClick={onClick} style={{ height: '100%' }}>
          <CardContent>
            <Typography variant="subtitle1">
              {type === 'autoCode'
                ? t('locations.code_creation.autoCodeSelectionDesc')
                : t('locations.code_creation.manualCodeSelectionDesc')}
            </Typography>
            <Box className={classes.iconBox}>
              {type === 'autoCode' ? (
                <AutoCodeIcon className={classes.icon} fontSize="large" />
              ) : (
                <ManualCodeIcon className={classes.icon} fontSize="large" />
              )}
              <Divider />
              <Typography>
                {type === 'autoCode' ? (
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="locations.code_creation.autoCodeSelectionIconText"
                    t={t}
                  />
                ) : (
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="locations.code_creation.manualCodeSelectionIconText"
                    t={t}
                  />
                )}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      <CodeDemoCard style={{ visibility: selected ? 'visible' : 'hidden' }} type={type} />
    </>
  );
}

export default CodeTypeSelectionButton;
