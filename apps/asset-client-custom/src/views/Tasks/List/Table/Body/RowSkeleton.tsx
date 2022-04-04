import { Skeleton, TableCell, TableRow, styled } from 'catamaran/core/mui';
import clsx from 'clsx';

const NoBorderCell = styled(TableCell)(() => ({
  borderBottom: 'none'
}));

type Props = {
  className?: string;
  cellCount: number;
};

const RowSkeleton = (props: Props) => {
  const { className, cellCount } = props;

  return (
    <TableRow className={clsx(className, 'h-48')}>
      {Array.from({ length: cellCount }, (v, i) => i).map((e) => (
        <NoBorderCell key={e}>
          <Skeleton className="list-table-skeleton" />
        </NoBorderCell>
      ))}
    </TableRow>
  );
};

export default RowSkeleton;
