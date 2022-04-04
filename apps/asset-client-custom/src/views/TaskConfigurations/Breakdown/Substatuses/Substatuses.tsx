import {
  getBreakdownStatuses,
  selectAllBreakdownStatuses
} from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { useEffect } from 'react';
import { useTypedSelector } from 'hooks';
import SubstatusesGroup from './SubstatusesGroup';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

type Props = {
  className?: string;
  mainCategoryId: string;
};

function Substatuses({ className, mainCategoryId }: Props) {
  const [breakdownStatusesLoading, breakdownStatusesLoadingDispatch] = useLoading();

  const breakdownTaskStatuses = useTypedSelector(selectAllBreakdownStatuses);

  useEffect(() => {
    if (mainCategoryId) {
      breakdownStatusesLoadingDispatch(getBreakdownStatuses(mainCategoryId));
    }
  }, [breakdownStatusesLoadingDispatch, mainCategoryId]);

  return (
    <div className="flex">
      {breakdownTaskStatuses.map((status, index) => (
        <SubstatusesGroup
          className={clsx({ className, ml32: index > 0 })}
          key={status.key}
          loading={breakdownStatusesLoading}
          mainCategoryId={mainCategoryId}
          status={status}
        />
      ))}
    </div>
  );
}

export default Substatuses;
