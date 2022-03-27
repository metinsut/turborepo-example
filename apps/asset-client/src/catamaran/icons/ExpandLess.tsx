import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function ExpandLess(props: Props) {
  return <IconBase {...props} RenderIcon={ExpandLessIcon} />;
}

export default ExpandLess;
