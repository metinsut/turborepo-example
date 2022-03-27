import {
  CatCenterIcon,
  CatDataCard,
  CatDialog,
  CatDialogAction,
  CatDialogButton,
  CatDialogContent,
  CatDialogTitle,
  CatEmptyIcon,
  CatIconButton,
  CatMainContent,
  CatSidebar,
  CatTypography
} from 'catamaran/core';
import { GoBackButton } from 'catamaran/core/Button';
import { PartsPolicy } from 'store/slices/contracts/types';
import { Trans, useTranslation } from 'react-i18next';
import { useDialogState } from 'hooks';
import ExpandIcon from 'catamaran/icons/Expand';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import React, { useLayoutEffect, useRef, useState } from 'react';

type Props = {
  partsPolicy?: PartsPolicy;
};

const PartPolicy = ({ partsPolicy }: Props) => {
  const { t } = useTranslation();
  const { partList, partPolicyType } = partsPolicy;

  const ref = useRef(null);
  const [showDetailButton, setShowDetailButton] = useState(false);
  useLayoutEffect(() => {
    if (ref.current.clientHeight < ref.current.scrollHeight) {
      setShowDetailButton(true);
    } else {
      setShowDetailButton(false);
    }
  }, [ref, ref?.current?.scrollWidth]);

  const { isOpen, togglePopup } = useDialogState();
  const handleDetailDialogClose = () => {
    togglePopup(false);
  };

  const renderPartItems = (cardView: boolean) => (
    <>
      {partList?.map((part, key) => (
        <CatTypography
          key={part}
          sx={{ whiteSpace: 'pre-line' }}
          variant={cardView ? 'caption' : 'body1'}
        >
          {cardView && key === 4 && '.... \n'}
          {key + 1} - {part}
        </CatTypography>
      ))}
    </>
  );

  return (
    <>
      <CatDataCard color="darkGrey" minWidth="auto" transparentBackground>
        <CatSidebar>
          <CatEmptyIcon />
          <CatCenterIcon component={MaintenanceIcon} />
          <CatEmptyIcon />
        </CatSidebar>
        <CatMainContent className="grid gap-4">
          <div>
            <CatTypography variant="body1">
              {t('tasks.waiting_for_confirmation.policy.parts_policy')}
            </CatTypography>
            <CatTypography className="opacity-8" variant="body1">
              <Trans
                i18nKey={`tasks.waiting_for_confirmation.policy.types.${partPolicyType}`}
                t={t}
              />
            </CatTypography>
          </div>
          <div
            className="grid grid-auto-flow-column gap-4 align-content-between"
            style={{ gridTemplateColumns: '1fr 24px' }}
          >
            <div
              className="grid overflow-hidden align-items-end"
              ref={ref}
              style={{ height: '55px' }}
            >
              {renderPartItems(true)}
            </div>
            {showDetailButton && (
              <div className="flex justify-content-end align-items-end">
                <CatIconButton onClick={() => togglePopup(true)}>
                  <ExpandIcon color="darkGrey" />
                </CatIconButton>
              </div>
            )}
          </div>
        </CatMainContent>
      </CatDataCard>
      {isOpen && (
        <CatDialog onClose={handleDetailDialogClose} open={isOpen}>
          <CatDialogTitle
            closable
            iconComponent={MaintenanceIcon}
            title={t('tasks.detail.breakdown_information.breakdown_explanation')}
          />
          <CatDialogContent>
            <div className="grid">{renderPartItems(false)}</div>
          </CatDialogContent>
          <CatDialogAction>
            <CatDialogButton component={GoBackButton} variant="close" />
          </CatDialogAction>
        </CatDialog>
      )}
    </>
  );
};

export default PartPolicy;
