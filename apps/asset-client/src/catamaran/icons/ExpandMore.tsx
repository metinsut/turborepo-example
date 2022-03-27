import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function ExpandMore(props: Props) {
  return <IconBase {...props} RenderIcon={ExpandMoreIcon} />;
}

export default ExpandMore;
