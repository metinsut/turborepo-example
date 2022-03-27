import { Box, CatIconButton, CatTypography } from 'catamaran/core';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import React from 'react';
import clsx from 'clsx';

type Props = {
  activePage: number;
  className?: string;
  nextPageLoading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  pageCount: number;
  previousPageLoading: boolean;
};

function PaginationItem(props: Props) {
  const {
    activePage,
    className,
    nextPageLoading,
    onNextPage,
    onPreviousPage,
    pageCount,
    previousPageLoading
  } = props;

  return (
    <div className={clsx(className, 'flex')}>
      <CatIconButton
        className="mr24"
        disabled={nextPageLoading || activePage === 1}
        loading={previousPageLoading}
        onClick={onPreviousPage}
        sx={{ transform: 'matrix(-1, 0, 0, 1, 0, 0)' }}
      >
        <ChevronRIcon color="darkGrey" fontSize="small" />
      </CatIconButton>
      <div className="grid w-full justify-item-center">
        <CatTypography className="opacity-8" variant="caption">
          {`${activePage} of ${pageCount}`}
        </CatTypography>
        <div className="flex gap-4 justify-content-center">
          {Array.from(Array(pageCount)).map((_val, index) => (
            <Box
              className={clsx({
                'bg-darkgray': index === activePage - 1,
                'border-1 border-solid border-darkgrey': index !== activePage - 1,
                'opacity-3': true
              })}
              key={index.toString()}
              sx={{
                borderRadius: '50%',
                height: '4px',
                width: '4px'
              }}
            />
          ))}
        </div>
      </div>
      <CatIconButton
        className="ml24"
        disabled={previousPageLoading || activePage === pageCount}
        loading={nextPageLoading}
        onClick={onNextPage}
      >
        <ChevronRIcon color="darkGrey" fontSize="small" />
      </CatIconButton>
    </div>
  );
}

export default PaginationItem;
