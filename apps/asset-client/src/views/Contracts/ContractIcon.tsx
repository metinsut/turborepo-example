import { ContractType } from 'store/slices/contracts/types';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import CalibrationIcon from 'catamaran/icons/Calibration';
import GuaranteeIcon from 'catamaran/icons/Guarantee';
import LeaseIcon from 'catamaran/icons/Lease';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import NoneIcon from 'catamaran/icons/None';

type Props = IconBaseProps & {
  className?: string;
  contractType: ContractType;
};

function ContractIcon(props: Props) {
  const { className, contractType, ...rest } = props;

  const IconComponent = getContractIconComponent(contractType);
  return <IconComponent className={className} color="darkGrey" {...rest} />;
}

export const getContractIconComponent = (contractType: ContractType) => {
  let IconComponent;

  switch (contractType) {
    case 'calibration':
      IconComponent = CalibrationIcon;
      break;
    case 'warranty':
      IconComponent = GuaranteeIcon;
      break;
    case 'lease':
      IconComponent = LeaseIcon;
      break;
    case 'maintenance':
      IconComponent = MaintenanceIcon;
      break;
    default:
      IconComponent = NoneIcon;
  }
  return IconComponent;
};

export default ContractIcon;
