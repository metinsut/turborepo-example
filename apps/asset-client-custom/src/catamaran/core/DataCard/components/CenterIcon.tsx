import { IconBaseProps } from '../../../icons/IconBase';
import { useCardContext } from '../useCardContext';
import React from 'react';

type Props = IconBaseProps & {
  component: React.ElementType<IconBaseProps>;
};

function CenterIcon(props: Props) {
  const { component: IconComponent, ...rest } = props;
  const { hovered, color } = useCardContext();
  return (
    <IconComponent
      color={hovered ? 'lightGrey' : color.name}
      contained={false}
      hoverable={false}
      opacity={hovered ? 0.4 : 0.8}
      {...rest}
    />
  );
}

export default CenterIcon;
