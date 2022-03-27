import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ActionIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M12 5a.422.422 0 00-.42.38l-.068.678a.299.299 0 01-.26.263.297.297 0 01-.319-.187l-.24-.637a.422.422 0 00-.812.217l.11.672a.299.299 0 01-.184.321.298.298 0 01-.356-.097l-.398-.553a.422.422 0 00-.727.42l.281.622a.298.298 0 01-.094.357.297.297 0 01-.369-.002l-.528-.432a.422.422 0 00-.594.594l.432.528c.088.107.086.26.002.37a.298.298 0 01-.357.093l-.622-.28a.422.422 0 00-.42.727l.553.397c.112.08.15.229.098.357a.298.298 0 01-.322.183l-.672-.11a.422.422 0 00-.217.811l.638.242a.297.297 0 01.187.317.299.299 0 01-.263.261l-.68.068a.422.422 0 000 .84l.68.068a.299.299 0 01.263.26.297.297 0 01-.187.319l-.638.241a.422.422 0 00.217.811l.673-.11a.298.298 0 01.32.183.297.297 0 01-.097.357l-.553.398a.422.422 0 00.42.727l.622-.281a.298.298 0 01.357.093.297.297 0 01-.002.37l-.432.528a.422.422 0 00.594.594l.528-.432a.297.297 0 01.37-.002c.109.084.15.231.093.357l-.28.622a.422.422 0 00.726.42l.398-.553a.297.297 0 01.357-.098.298.298 0 01.183.322l-.11.672a.422.422 0 00.811.217l.241-.638a.296.296 0 01.318-.186.299.299 0 01.261.262l.068.68a.422.422 0 00.84 0l.068-.68a.299.299 0 01.26-.262.297.297 0 01.319.187l.241.637a.422.422 0 00.811-.217l-.11-.672a.298.298 0 01.184-.321.297.297 0 01.356.098l.397.552a.422.422 0 00.728-.42l-.281-.621a.298.298 0 01.094-.358.298.298 0 01.37.002l.527.432a.422.422 0 00.594-.594l-.432-.527a.298.298 0 01-.002-.37.298.298 0 01.358-.094l.621.28a.422.422 0 00.42-.726l-.552-.397a.298.298 0 01-.098-.357.299.299 0 01.322-.184l.67.11a.422.422 0 00.218-.811l-.637-.24a.297.297 0 01-.186-.319.299.299 0 01.263-.261l.677-.068a.422.422 0 000-.84l-.677-.068a.3.3 0 01-.264-.26.297.297 0 01.187-.32l.637-.24a.422.422 0 00-.217-.81l-.671.109a.299.299 0 01-.322-.184.298.298 0 01.098-.357l.552-.396a.422.422 0 00-.42-.728l-.62.28a.298.298 0 01-.358-.093.298.298 0 01.002-.37l.431-.527a.422.422 0 00-.594-.594l-.527.432a.298.298 0 01-.37.001.298.298 0 01-.094-.357l.28-.621a.422.422 0 00-.727-.42l-.397.552a.297.297 0 01-.356.098.299.299 0 01-.184-.321l.11-.672a.422.422 0 00-.811-.217l-.24.637a.297.297 0 01-.32.187.299.299 0 01-.26-.263l-.068-.678A.422.422 0 0012 5zm0 11.2a4.2 4.2 0 100-8.4 4.2 4.2 0 000 8.4z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={12} cy={12} fill="currentColor" r={1.4} />
    </IconBase>
  );
}

export default ActionIcon;