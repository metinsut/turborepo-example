import { Breadcrumbs, Link, Typography } from 'catamaran/core/mui';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import MultipleBranchButton from 'layouts/Dashboard/components/MultipleBranchButton';
import Page from 'components/Page';
import React from 'react';

type Props = {
  branchSelector?: React.ReactNode;
  rightContent?: React.ReactNode;
  loading?: boolean;
  pageTitle: string;
  pageHeader: string | React.ReactNode;
  pageBreadcrumbs?: Array<{ text: string; href?: string }>;
  children: React.ReactNode;
};

function ContentLayout(props: Props) {
  const {
    branchSelector = <MultipleBranchButton disabled />,
    rightContent,
    loading,
    pageTitle,
    pageHeader,
    pageBreadcrumbs,
    children
  } = props;

  return (
    <Page title={pageTitle}>
      <div
        className="grid grid-auto-flow-column justify-content-between gap-24"
        style={{ height: 'var(--breadcrumbs-height)', paddingBottom: '8px', paddingTop: '6px' }}
      >
        <div className="grid gap-4">
          <Typography className={loading ? 'opacity-6' : ''} component="h3" variant="h3">
            {pageHeader}
          </Typography>
          {pageBreadcrumbs && (
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRIcon className="opacity-2" fontSize="small" />}
              sx={{ fontSize: '9px', lineHeight: '10.8px' }}
            >
              {pageBreadcrumbs.map((item, i) => (
                <Link
                  className="opacity-5"
                  color={null}
                  href={item.href || '/'}
                  key={i.toString()}
                  underline="hover"
                  variant="caption"
                >
                  {item.text}
                </Link>
              ))}
            </Breadcrumbs>
          )}
        </div>
        <div>
          {rightContent}
          <div style={{ marginTop: '-55px' }}>{branchSelector}</div>
        </div>
      </div>
      {children}
    </Page>
  );
}

export default ContentLayout;
