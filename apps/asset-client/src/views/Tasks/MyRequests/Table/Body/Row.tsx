import { BREAKDOWN_OPEN, MYREQUESTSDETAIL } from 'routes/constant-route';
import { CatIconButton, CatTooltip, CatTypography } from 'catamaran/core';
import { TableCell, TableRow } from 'catamaran/core/mui';
import { Task } from 'store/slices/tasks/common/type';
import { Trans, useTranslation } from 'react-i18next';
import {
  fetchAllDiscoveredMyRequests,
  resolveMyRequest,
  selectMyRequestsById
} from 'store/slices/tasks/myRequests';
import { useCountdown, useLoading, useTypedDispatch, useTypedSelector } from 'hooks';
import { useHistory } from 'react-router-dom';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import CheckIcon from 'catamaran/icons/Check';
import CloseIcon from 'catamaran/icons/Close';
import LocationView from 'views/Tasks/WaitingForConfirmation/Table/Body/LocationView';
import React, { useCallback } from 'react';
import StatusIcon from '../../../Breakdowns/Common/StatusIcon';
import TimeIcon from 'catamaran/icons/Time';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

interface Props {
  taskId: string;
}

const Row = ({ taskId }: Props, ref: React.Ref<HTMLTableRowElement>) => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const task: Task = useTypedSelector((state) => selectMyRequestsById(state, taskId));

  const [hovered, hoverProps] = useHover();
  const [resolveLoading, resolveLoadingDispatch] = useLoading();

  const handleCountdownEnd = useCallback(() => {
    dispatch(fetchAllDiscoveredMyRequests());
  }, [dispatch]);

  const countdown = useCountdown(
    handleCountdownEnd,
    task.resolveExpiryDate,
    task.resolveStatus === 'waitingToBeResolved'
  );

  const history = useHistory();
  const handleClick = () => {
    history.push(`${MYREQUESTSDETAIL.replace(':breakdownId', task.id)}`);
  };

  const handleResolveClick = (e: any) => {
    resolveLoadingDispatch(resolveMyRequest(taskId));
    e.stopPropagation();
  };

  const handleReopenClick = (e: any) => {
    e.stopPropagation();
    history.push(`${BREAKDOWN_OPEN}?taskId=${taskId}`);
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
          <TableCell className="border-0 justify-items-start">
            <div className="grid">
              <CatTypography className="table_cell_long three-dot" noBreak variant="caption">
                {t(`tasks.common.statusGroup.${task.myRequestStatus}`)}
              </CatTypography>
              <div className="flex align-items-center opacity-6">
                <StatusIcon className="mr4" statusType={task.status} />
                <CatTypography className="table_cell_long three-dot" noBreak variant="caption">
                  {t(`tasks.common.statuses.${task.status}`)}
                </CatTypography>
              </div>
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
                  <CatTypography
                    className="ml4 three-dot w-full table_cell_long"
                    noBreak
                    variant="body2"
                  >
                    {`${task.responsiblePersonnel.firstName} ${task.responsiblePersonnel.lastName}`}
                  </CatTypography>
                </>
              )}
            </div>
          </TableCell>
          <TableCell className="border-0">
            {task.status === 'closed' &&
              task.resolveStatus === 'waitingToBeResolved' &&
              !!countdown && (
                <div
                  className={clsx({
                    'flex justify-item-center align-items-center flex-auto-flow-column': true,
                    hidden: !hovered
                  })}
                >
                  <div className="flex justify-item-center align-items-center">
                    <TimeIcon className="opacity-4" fontSize="small" />
                    <CatTypography fontStyle={{ color: 'orange' }} variant="body2">
                      {countdown}
                    </CatTypography>
                  </div>
                  <div className="flex justify-item-center align-items-center">
                    <CatTooltip placement="top" title={t('tasks.my_requests.accept_completion')}>
                      <span>
                        <CatIconButton loading={resolveLoading} onClick={handleResolveClick}>
                          <CheckIcon color="green" />
                        </CatIconButton>
                      </span>
                    </CatTooltip>
                    <div className="divider-vertical" />
                    <CatTooltip placement="top" title={t('tasks.my_requests.reject_completion')}>
                      <span>
                        <CatIconButton onClick={handleReopenClick}>
                          <CloseIcon color="red" />
                        </CatIconButton>
                      </span>
                    </CatTooltip>
                  </div>
                </div>
              )}
          </TableCell>
        </TableRow>
      </>
    )
  );
};

export default React.forwardRef(Row);
