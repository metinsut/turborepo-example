import { CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { selectBranchNameById } from 'store/slices/branches';
import { useTypedSelector } from 'hooks';

type Props = {
  locationName: string;
  branchId: string;
  requestedDate: string;
};

function LocationView(props: Props) {
  const { locationName, branchId, requestedDate } = props;
  const branchName = useTypedSelector((state) => selectBranchNameById(state, branchId));

  const { formatDate, formatTime } = useLocalizationHelpers();

  return (
    <div className="flex justify-item-center flex-auto-flow-column">
      <div className="flex opacity-6">
        <CatTypography
          className="three-dot table_cell_long"
          noBreak
          variant="caption"
        >{`@${branchName}`}</CatTypography>
      </div>
      <div className="flex align-items-center">
        <CatTypography className="three-dot table_cell_long" noBreak variant="body2">
          {locationName}
        </CatTypography>
      </div>
      <div className="flex align-items-center">
        <CatTypography className="three-dot table_cell_long" noBreak variant="caption">
          {`${formatDate(requestedDate)} | ${formatTime(requestedDate)}`}
        </CatTypography>
      </div>
    </div>
  );
}

export default LocationView;
