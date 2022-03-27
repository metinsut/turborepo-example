import { Box, CatIconButton, CatTypography } from 'catamaran/core';
import { TableCell, TableRow } from 'catamaran/core/mui';
import { Task } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import { WAITINGFORCONFIRMATIONDETAIL } from 'routes/constant-route';
import { selectWaitingForConfirmationById } from 'store/slices/tasks/waitingForConformation/waitingForConfirmationList';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import CheckIcon from 'catamaran/icons/Check';
import CloseIcon from 'catamaran/icons/Close';
import LocationView from './LocationView';
import React from 'react';
import useHover from 'hooks/useHover';

interface Props {
  taskId: string;
  onConfirmClick: (taskId: string, assetId: string) => void;
  onDenyClick: (taskId: string) => void;
}

const Row = (
  { taskId, onConfirmClick, onDenyClick }: Props,
  ref: React.Ref<HTMLTableRowElement>
) => {
  const { t } = useTranslation();
  const task: Task = useTypedSelector((state) => selectWaitingForConfirmationById(state, taskId));

  const history = useHistory();
  const handleClick = () => {
    history.push(`${WAITINGFORCONFIRMATIONDETAIL.replace(':breakdownId', task.id)}`);
  };
  const [hovered, hoverProps] = useHover();

  const handleConfirmClick = (event: any) => {
    event.stopPropagation();
    onConfirmClick(task.id, task.assetId);
  };

  const handleDenyClick = (event: any) => {
    event.stopPropagation();
    onDenyClick(task.id);
  };

  return (
    task && (
      <>
        <TableRow
          className="cursor-pointer opacity-8"
          hover
          onClick={handleClick}
          ref={ref}
          {...hoverProps}
        >
          <TableCell className="border-0">
            <div className="flex align-items-center">
              <BreakdownIcon alwaysHovered className="mr4" color="orange" fontSize="small" />
              <CatTypography className="table_cell_long three-dot" noBreak variant="caption">
                <Trans i18nKey={`tasks.work_types.${task.taskType}`} t={t} />
              </CatTypography>
            </div>
          </TableCell>
          <TableCell className="border-0">
            <CatTypography className="table_cell_long three-dot" noBreak variant="body2">
              {task.categoryName}
            </CatTypography>
          </TableCell>
          <TableCell className="border-0">
            <CatTypography className="table_cell_long three-dot" noBreak variant="body2">
              {task.brandName}
            </CatTypography>
          </TableCell>
          <TableCell className="border-0">
            <CatTypography className="table_cell_long three-dot" noBreak variant="body2">
              {task.modelName}
            </CatTypography>
          </TableCell>
          <TableCell className="border-0">
            <CatTypography className="table_cell_long three-dot" noBreak variant="body2">
              {task.code}
            </CatTypography>
          </TableCell>
          <TableCell className="border-0">
            <LocationView
              branchId={task.branchId}
              locationName={task.locationName}
              requestedDate={task.requestedDate}
            />
          </TableCell>
          <TableCell className="border-0">
            <div className="flex align-items-center">
              <AvatarItem person={task.requestedPersonnel} size="medium" />
              <CatTypography
                className="ml4 three-dot w-full table_cell_long"
                noBreak
                variant="body2"
              >
                {`${task.requestedPersonnel.firstName} ${task.requestedPersonnel.lastName}`}
              </CatTypography>
            </div>
          </TableCell>
          <TableCell className="border-0">
            <Box center display="flex" visibility={hovered ? 'visible' : 'hidden'}>
              <CatIconButton onClick={handleConfirmClick}>
                <CheckIcon color="green" />
              </CatIconButton>
              <div className="divider-vertical" />
              <CatIconButton onClick={handleDenyClick}>
                <CloseIcon color="red" />
              </CatIconButton>
            </Box>
          </TableCell>
        </TableRow>
      </>
    )
  );
};

export default React.forwardRef(Row);
