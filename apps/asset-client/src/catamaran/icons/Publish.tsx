import IconBase, { IconBaseProps } from './IconBase';
import PublishIcon from '@mui/icons-material/Publish';

type Props = IconBaseProps;

function Publish(props: Props) {
  return <IconBase {...props} RenderIcon={PublishIcon} />;
}

export default Publish;
