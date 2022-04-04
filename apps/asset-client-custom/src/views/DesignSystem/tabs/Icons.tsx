import { CatPanel, CatPanelContent, CatPanelHeader, CatTypography } from 'catamaran/core';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  makeStyles
} from 'catamaran/core/mui';
import { assetStatuses } from 'store/slices/common/data/asset';
import CheckIcon from 'catamaran/icons/Check';
import EditIcon from 'catamaran/icons/Edit';
import React from 'react';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';
import TrashIcon from 'catamaran/icons/Trash';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2)
  },
  table: {
    backgroundColor: '#FFF',
    minWidth: 650
  }
}));

type PageProps = {
  className?: string;
};

function Icons(props: PageProps) {
  const classes = useStyles();
  const { className } = props;

  return (
    <>
      <TableContainer className={clsx(classes.root, className)} component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Plain</TableCell>
              <TableCell>Color & Not Hoverable</TableCell>
              <TableCell>Contained & Hoverable</TableCell>
              <TableCell>Contained & Not Hoverable</TableCell>
              <TableCell>Always Hovered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <EditIcon />
              </TableCell>
              <TableCell>
                <EditIcon color="blue" contained={false} hoverable={false} />
              </TableCell>
              <TableCell>
                <EditIcon color="blue" />
              </TableCell>
              <TableCell>
                <EditIcon color="blue" hoverable={false} />
              </TableCell>
              <TableCell>
                <EditIcon alwaysHovered color="blue" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <CheckIcon />
              </TableCell>
              <TableCell>
                <CheckIcon color="green" contained={false} hoverable={false} />
              </TableCell>
              <TableCell>
                <CheckIcon color="green" />
              </TableCell>
              <TableCell>
                <CheckIcon color="green" hoverable={false} />
              </TableCell>
              <TableCell>
                <CheckIcon alwaysHovered color="green" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TrashIcon />
              </TableCell>
              <TableCell>
                <TrashIcon color="red" contained={false} hoverable={false} />
              </TableCell>
              <TableCell>
                <TrashIcon color="red" />
              </TableCell>
              <TableCell>
                <TrashIcon color="red" hoverable={false} />
              </TableCell>
              <TableCell>
                <TrashIcon alwaysHovered color="red" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <TrashIcon />
              </TableCell>
              <TableCell>
                <TrashIcon color="orange" contained={false} hoverable={false} />
              </TableCell>
              <TableCell>
                <TrashIcon color="orange" />
              </TableCell>
              <TableCell>
                <TrashIcon color="orange" hoverable={false} />
              </TableCell>
              <TableCell>
                <TrashIcon alwaysHovered color="orange" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <CatPanel className="mt16">
        <CatPanelHeader title="Asset Statuses" />
        <CatPanelContent>
          <div className="grid grid-auto-flow-column gap-4 ">
            {assetStatuses.map((status) => (
              <div className="grid gap-4">
                <CatTypography variant="body1">{status}</CatTypography>
                <div className="grid grid-auto-flow-column gap-24 align-items-center justify-content-start">
                  <StatusIcon statusType={status} />
                  <StatusIcon fontSize="small" statusType={status} />
                </div>
              </div>
            ))}
          </div>
        </CatPanelContent>
      </CatPanel>
    </>
  );
}

export default Icons;
