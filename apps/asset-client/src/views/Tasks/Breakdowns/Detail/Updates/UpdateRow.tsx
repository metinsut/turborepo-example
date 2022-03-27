import { CatTypography, useLocalizationHelpers } from 'catamaran/core';
import { History, HistoryDetail } from 'store/slices/breakdown/taskDetail/types';
import { TableCell, TableRow } from 'catamaran/core/mui';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import UpdateIcon from './UpdateIcon';

type Props = {
  historyItem: History;
};
function getHistoryDetailString(detail: HistoryDetail) {
  let returnText = '';

  if (detail.historySubKey) {
    returnText = detail.historySubKey;

    if (detail.newValue) {
      returnText += ': ';
    }
  }

  if (detail.newValue) {
    returnText = detail.oldValue
      ? `${returnText}${detail.oldValue} -> ${detail.newValue}`
      : `${returnText}${detail.newValue}`;
  }

  return returnText;
}

function UpdateRow({ historyItem }: Props) {
  const { formatDate, formatTime } = useLocalizationHelpers();

  return (
    <TableRow className="opacity-8">
      <TableCell className="border-0">
        <div className="flex align-items-center">
          <UpdateIcon className="mr24" updateType={historyItem.historyTypeKey} />
          <CatTypography className="opacity-9 three-dot" noBreak variant="body2">
            {historyItem.historyType}
          </CatTypography>
        </div>
      </TableCell>
      <TableCell className="border-0 justify-items-start opacity-9">
        <div className="flex">
          <CatTypography className="mr16 three-dot" noBreak variant="body2">
            {formatDate(historyItem.createdDate)}
          </CatTypography>
          <CatTypography className="three-dot" noBreak variant="body2">
            {formatTime(historyItem.createdDate)}
          </CatTypography>
        </div>
      </TableCell>
      <TableCell className="border-0">
        <div className="flex align-items-center">
          <AvatarItem person={historyItem.createdPerson} size="medium" />
          <CatTypography className="ml4 opacity-9 three-dot" noBreak variant="body2">
            {`${historyItem.createdPerson.firstName} ${historyItem.createdPerson.lastName}`}
          </CatTypography>
        </div>
      </TableCell>
      <TableCell className="border-0 opacity-9">
        <div className="grid align-items-center">
          <CatTypography className="three-dot" noBreak variant="body2">
            {historyItem.historyKey}
          </CatTypography>
          <div className="grid" key={historyItem.createdDate}>
            {historyItem.details.map((detail) => (
              <CatTypography className="three-dot" key={detail.historySubKey} variant="caption">
                {getHistoryDetailString(detail)}
              </CatTypography>
            ))}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default UpdateRow;
