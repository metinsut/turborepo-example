import { Box } from 'catamaran/core';
import { Grid, Paper, PaperProps } from '@mui/material';
import { styled } from 'catamaran/core/mui';
import CardFooter from 'components/CardFooter';
import PerfectScrollbar from 'react-perfect-scrollbar';
import React, { ReactElement } from 'react';
import Skeleton from '@mui/material/Skeleton';

const StyledBox = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.darkGrey[200]}`
}));

const StyledEmptyBox = styled(Box)(() => ({
  gap: '10px',
  maxWidth: '100%',
  overflowWrap: 'anywhere',
  overflowY: 'clip',
  padding: '0px 55px 55px 55px',
  textAlign: 'center',
  textOverflow: 'ellipsis'
}));

const StyledSkeleton = styled(Skeleton)(() => ({
  borderRadius: '16px',
  height: '32px',
  justifyContent: 'center',
  marginBottom: '5px',
  width: '317px'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - var(--page-space-categories))',
  justifyContent: 'space-between',
  marginRight: theme.spacing(1),
  minHeight: '300px',
  minWidth: '357px',
  width: '357px'
}));

type Props = Omit<PaperProps, 'title'> & {
  addButtonDisabled?: boolean;
  addButtonDisabledTooltipTitle?: string;
  className?: string;
  handleAddClick?: () => void;
  loading: boolean;
  hasTemporary: boolean;
  content?: ReactElement;
  emptyContent: ReactElement;
  buttonText?: string | ReactElement;
  title: ReactElement;
  titleHeight?: number;
  isAddDisabled?: boolean;
  loadingContent?: ReactElement;
};

function PaperSelector(props: Props) {
  const {
    className,
    handleAddClick,
    loading,
    hasTemporary,
    content,
    emptyContent,
    buttonText = '',
    title,
    titleHeight = 48,
    isAddDisabled,
    loadingContent = (
      <Box flexGrow={1} px={1} py={0.5}>
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton variant="rectangular" />
      </Box>
    ),
    addButtonDisabled,
    addButtonDisabledTooltipTitle,
    ...rest
  } = props;

  return (
    <StyledPaper className={className} {...rest}>
      <StyledBox center flex mx={1.5} py={0.5} row>
        {/* <SearchIcon color="darkGrey" contained /> */}
        <Grid
          alignContent="stretch"
          alignItems="center"
          container
          direction="column"
          justifyContent="center"
          style={{ height: titleHeight }}
        >
          {title}
        </Grid>
      </StyledBox>
      <Box
        component={PerfectScrollbar}
        flexGrow={1}
        pt={4}
        px={1.5}
        style={{
          overflowX: 'clip',
          overflowY: 'auto'
        }}
      >
        {!!content && (
          <Box flexGrow={1} px={1} py={0.5}>
            {content}
          </Box>
        )}

        {loading && !content && loadingContent}

        {!loading && !content && !isAddDisabled && (
          <StyledEmptyBox alignItems="center" col flex height={1} justifyContent="center" m="auto">
            {emptyContent}
          </StyledEmptyBox>
        )}
      </Box>
      <CardFooter
        addButtonDisabled={addButtonDisabled}
        addButtonDisabledTooltipTitle={addButtonDisabledTooltipTitle}
        disabled={hasTemporary}
        onClick={handleAddClick}
        text={buttonText}
        visible={!isAddDisabled}
      />
    </StyledPaper>
  );
}

export default PaperSelector;
