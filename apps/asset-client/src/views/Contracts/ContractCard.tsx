import {
  Box,
  CatCenterIcon,
  CatCornerContent,
  CatDataCard,
  CatDataCardProps,
  CatEmptyIcon,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography,
  useLocalizationHelpers
} from 'catamaran/core';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { getContractIconComponent } from './ContractIcon';
import { selectContractById } from 'store/slices/contracts/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DownloadIcon from 'catamaran/icons/Download';
import React from 'react';
import clsx from 'clsx';
import theme from 'catamaran/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = Omit<CatDataCardProps, 'title'> & {
  className?: string;
  contractId?: string;
  iconComponent?: React.ElementType<IconBaseProps>;
  height?: number;
  showContractDocument?: boolean;
  title?: React.ReactNode;
};

function ContractCard(props: Props) {
  const classes = useStyles();
  const {
    className,
    color = 'blue',
    contractId,
    iconComponent,
    height = 116,
    showContractDocument = false,
    style,
    title,
    ...rest
  } = props;

  const { t } = useTranslation();
  const { formatDate } = useLocalizationHelpers();

  const contract = useTypedSelector((state) => selectContractById(state, contractId));

  const handleDownloadClick = () => {};

  if (!contract) {
    return null;
  }

  return (
    <>
      <CatDataCard
        className={clsx(className, classes.root, 'break-word')}
        color={color}
        style={{ ...style, minHeight: height }}
        {...rest}
      >
        {(hover, color) => (
          <>
            <CatSidebar>
              <CatEmptyIcon />
              <CatCenterIcon component={iconComponent ?? getContractIconComponent(contract.type)} />
              <CatEmptyIcon />
            </CatSidebar>
            <CatMainContent col color={color} flex justifyContent="space-between">
              <CatTypography color="inherit" variant="subtitle1">
                {title ?? contract.title}
              </CatTypography>
              <Box col flex>
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="contracts.item.type_field"
                    t={t}
                    values={{ type: t(`contracts.types.${contract?.type}`) }}
                  />
                </CatTypography>
                <Box height={3} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="contracts.item.title_field"
                    t={t}
                    values={{ title: contract.title }}
                  />
                </CatTypography>
                <Box height={8} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="contracts.item.start_date_field"
                    t={t}
                    values={{ date: formatDate(contract.startDate) }}
                  />
                </CatTypography>
                <Box height={3} />
                <CatTypography variant="body2">
                  <Trans
                    components={{ bold: <b /> }}
                    i18nKey="contracts.item.end_date_field"
                    t={t}
                    values={{ date: formatDate(contract.endDate) }}
                  />
                </CatTypography>
              </Box>
              {showContractDocument && (
                <CatCornerContent>
                  <Box center color={theme.palette.blue.main} flex>
                    <CatTypography color="inherit" variant="caption">
                      {t('contracts.item.contract_document')}
                    </CatTypography>
                    <Box width={4} />
                    <CatIconButton onClick={handleDownloadClick}>
                      <DownloadIcon color="blue" />
                    </CatIconButton>
                  </Box>
                </CatCornerContent>
              )}
            </CatMainContent>
          </>
        )}
      </CatDataCard>
    </>
  );
}

export default ContractCard;
