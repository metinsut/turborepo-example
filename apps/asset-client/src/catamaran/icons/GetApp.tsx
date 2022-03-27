import GetAppIcon from '@mui/icons-material/GetApp';
import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

function GetApp(props: Props) {
  return <IconBase {...props} RenderIcon={GetAppIcon} />;
}

export default GetApp;
