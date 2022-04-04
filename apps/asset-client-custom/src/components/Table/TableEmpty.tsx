import { CatTypography } from 'catamaran/core';
import { Trans, useTranslation } from 'react-i18next';
import NotFoundIcon from 'catamaran/icons/NotFound';

interface Props {
  descriptionKey: string;
  infoKey: string;
}

const TableEmpty = ({ descriptionKey, infoKey }: Props) => {
  const { t } = useTranslation();
  return (
    <tr>
      <td className="w-full absolute table_empty">
        <NotFoundIcon className="text-48" contained={false} fontSize="inherit" hoverable={false} />
        <CatTypography align="center" className="mt16" variant="h2">
          <Trans i18nKey={descriptionKey} t={t} />
        </CatTypography>
        <CatTypography variant="body1">{t(infoKey)}</CatTypography>
      </td>
    </tr>
  );
};

export default TableEmpty;
