import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function Replay(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path
        d="M12.3592 7.40946C13.3265 7.39787 14.2687 7.67339 15.0666 8.20119C15.8645 8.72899 16.4823 9.48536 16.8417 10.3747C17.2012 11.2639 17.2863 12.2462 17.0862 13.1973C16.8861 14.1483 16.4098 15.0254 15.7176 15.7176C15.0254 16.4099 14.1483 16.8861 13.1972 17.0862C12.2462 17.2863 11.2639 17.2013 10.3746 16.8418C9.48533 16.4823 8.72896 15.8645 8.20116 15.0667C7.67336 14.2688 7.39784 13.3266 7.40943 12.3592"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M6.22632 11.0511C6.22632 11.7828 6.81952 12.376 7.55127 12.376C8.28302 12.376 8.87622 11.7828 8.87622 11.0511C8.87622 10.3193 8.28302 9.72611 7.55127 9.72611C6.81952 9.72611 6.22632 10.3193 6.22632 11.0511Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <path
        d="M12.6255 5.71143L10.9115 7.75425L12.9543 9.46829"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </IconBase>
  );
}

export default Replay;
