import { CatPaper } from 'catamaran/core';
import { Fade, Skeleton, styled } from 'catamaran/core/mui';
import AddButton, { AddButtonProps } from './AddButton';
import React from 'react';

type Props = {
  className?: string;
  addButtonProps?: AddButtonProps;
  content: React.ReactNode;
  emptyContent: React.ReactNode;
  isEmpty: boolean;
  loading: boolean;
  titleContent: React.ReactNode;
};

const StyledPaper = styled(CatPaper)(() => ({
  alignContent: 'start',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  minHeight: '300px',
  width: '357px'
}));

const StyledSkeleton = styled(Skeleton)(() => ({
  borderRadius: '16px',
  height: '32px',
  justifyContent: 'center',
  width: '317px'
}));

function LevelColumn(
  {
    className,
    addButtonProps = {
      disabled: false
    },
    content,
    emptyContent,
    isEmpty,
    loading,
    titleContent
  }: Props,
  ref: any
) {
  return (
    <StyledPaper className={className} ref={ref}>
      <div
        className="grid"
        style={{
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
      >
        {titleContent}
        <AddButton {...addButtonProps} />
        <div className="divider-horizontal my8" />
      </div>
      {loading && (
        <Fade in={loading}>
          <div
            className="grid gap-8 align-content-start"
            style={{
              overflowY: 'auto',
              paddingLeft: '20px',
              paddingRight: '20px'
            }}
          >
            <StyledSkeleton variant="rectangular" />
            <StyledSkeleton variant="rectangular" />
            <StyledSkeleton variant="rectangular" />
            <StyledSkeleton variant="rectangular" />
          </div>
        </Fade>
      )}
      {!loading && !isEmpty && (
        <div
          style={{
            overflowY: 'auto',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
        >
          {content}
        </div>
      )}
      {!loading && isEmpty && (
        <div
          className="grid justify-item-center align-self-center gap-8"
          style={{ marginTop: '-36px' }}
        >
          {emptyContent}
        </div>
      )}
    </StyledPaper>
  );
}

export default React.forwardRef(LevelColumn);
