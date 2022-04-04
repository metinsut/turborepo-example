import { Box, CatToggleButton } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import Check from 'catamaran/icons/Check';
import DownIcon from 'catamaran/icons/Down';
import React, { useState } from 'react';
import WarningIcon from 'catamaran/icons/Warning';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

type AssetStatusFilter = 'usable' | 'caution' | 'partialDown' | 'down';

function AssetStatusButtons(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const [selectedButton, setSelectedButton] = useState<AssetStatusFilter>('usable');

  const handleChange = (filter: AssetStatusFilter) => {
    if (selectedButton === filter) {
      setSelectedButton(undefined);
    } else {
      setSelectedButton(filter);
    }
  };

  return (
    <Box className={clsx(classes.root, className)} flex flexDirection="row">
      <CatToggleButton
        closable
        color="green"
        icon={<Check />}
        onClick={() => handleChange('usable')}
        selected={selectedButton === 'usable'}
        subtitle="0"
        title="Usable"
      />
      <Box mx={0.5} />
      <CatToggleButton
        closable
        color="yellow"
        icon={<WarningIcon />}
        onClick={() => handleChange('caution')}
        selected={selectedButton === 'caution'}
        subtitle="0"
        title="Caution"
      />
      <Box mx={0.5} />
      <CatToggleButton
        closable
        color="orange"
        icon={<BreakdownIcon />}
        onClick={() => handleChange('partialDown')}
        selected={selectedButton === 'partialDown'}
        subtitle="0"
        title="Partial Down"
      />
      <Box mx={0.5} />
      <CatToggleButton
        closable
        color="red"
        icon={<DownIcon />}
        onClick={() => handleChange('down')}
        selected={selectedButton === 'down'}
        subtitle="0"
        title="Down"
      />
    </Box>
  );
}

export default AssetStatusButtons;
