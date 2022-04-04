import {
  Button,
  ClickAwayListener,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip
} from 'catamaran/core/mui';
import { CatDialog } from 'catamaran/core';
import React, { useState } from 'react';
import axios from '../../utils/axiosUtils';

type Props = {
  tokenDialogOpen: boolean;
  setTokenDialogOpen: Function;
};

function TokenDialog(props: Props) {
  const { setTokenDialogOpen, tokenDialogOpen } = props;
  const accessToken = axios.defaults.headers.common.Authorization;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleCopyToken = () => {
    navigator.clipboard.writeText(accessToken);
    setTooltipOpen(true);
  };
  return (
    <CatDialog
      aria-describedby="alert-dialog-description"
      aria-labelledby="alert-dialog-title"
      onClose={() => setTokenDialogOpen(false)}
      open={tokenDialogOpen}
    >
      <DialogTitle id="alert-dialog-title">Api Token</DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            wordWrap: 'break-word'
          }}
        >
          <code
            style={{
              whiteSpace: 'normal'
            }}
          >
            {accessToken}
          </code>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setTokenDialogOpen(false)}>
          Close
        </Button>

        <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
          <div>
            <Tooltip
              disableFocusListener
              disableHoverListener
              disableTouchListener
              onClose={() => setTooltipOpen(false)}
              open={tooltipOpen}
              PopperProps={{
                disablePortal: true
              }}
              title="Copied to Clipboard"
            >
              <Button color="primary" onClick={handleCopyToken}>
                Copy To Clipboard
              </Button>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </DialogActions>
    </CatDialog>
  );
}

export default TokenDialog;
