import { CatTypography } from 'catamaran/core';
import { TASK_DETAIL } from 'routes/constant-route';
import { TableCell, TableRow } from 'catamaran/core/mui';
import { Task } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import { selectTaskById } from 'store/slices/tasks/taskList/taskList';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import LocationView from 'views/Tasks/WaitingForConfirmation/Table/Body/LocationView';
import PriorityIcon from 'views/Tasks/Breakdowns/Common/Priority/PriorityIcon';
import React from 'react';
import StatusIcon from 'views/Tasks/Breakdowns/Common/StatusIcon';

interface Props {
  taskId: string;
}

const Row = ({ taskId }: Props, ref: React.Ref<HTMLTableRowElement>) => {
  const task: Task = useTypedSelector((state) => selectTaskById(state, taskId));
  const { t } = useTranslation();

  const history = useHistory();
  const handleClick = () => {
    history.push(`${TASK_DETAIL.replace(':taskId', task.id)}`);
  };

  return (
    task && (
      <>
        <TableRow className="cursor-pointer opacity-8" hover onClick={handleClick} ref={ref}>
          <TableCell className="border-0">
            <div className="flex align-items-center">
              <BreakdownIcon alwaysHovered className="mr4" color="orange" fontSize="small" />
              <CatTypography className="table_cell_long three-dot" noBreak variant="caption">
                <Trans i18nKey={`tasks.work_types.${task.taskType}`} t={t} />
              </CatTypography>
            </div>
          </TableCell>
          <TableCell className="border-0">
            <div className="flex align-items-center">
              <PriorityIcon className="mr4" priorityType={task.priority} />
              {task.status && (
                <>
                  <StatusIcon className="mr4" statusType={task.status} />
                  <CatTypography className="three-dot table_cell_long" noBreak variant="caption">
                    {task.substatus
                      ? `${t(`tasks.common.statuses.${task.status}`)} - ${task.substatus}`
                      : t(`tasks.common.statuses.${task.status}`)}
                  </CatTypography>
                </>
              )}
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
              {task.responsiblePersonnel && (
                <>
                  <AvatarItem person={task.responsiblePersonnel} size="medium" />
                  <CatTypography className="ml4 three-dot table_cell_long" noBreak variant="body2">
                    {`${task.responsiblePersonnel.firstName} ${task.responsiblePersonnel.lastName}`}
                  </CatTypography>
                </>
              )}
            </div>
          </TableCell>
        </TableRow>
      </>
    )
  );
};

export default React.forwardRef(Row);
