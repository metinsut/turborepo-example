import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

const CloseIcon = (props: Props) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <path
      d="M9.33027 13.2555C8.93975 13.646 8.93974 14.2792 9.33027 14.6697C9.72079 15.0602 10.354 15.0602 10.7445 14.6697L9.33027 13.2555ZM14.7071 10.7071C15.0976 10.3166 15.0976 9.68342 14.7071 9.29289C14.3166 8.90237 13.6834 8.90237 13.2929 9.29289L14.7071 10.7071ZM13.2555 14.7071C13.646 15.0976 14.2792 15.0976 14.6697 14.7071C15.0603 14.3166 15.0603 13.6834 14.6697 13.2929L13.2555 14.7071ZM10.7071 9.33028C10.3166 8.93976 9.68342 8.93976 9.29289 9.33029C8.90237 9.72081 8.90237 10.354 9.29289 10.7445L10.7071 9.33028ZM10.7445 14.6697L14.7071 10.7071L13.2929 9.29289L9.33027 13.2555L10.7445 14.6697ZM14.6697 13.2929L10.7071 9.33028L9.29289 10.7445L13.2555 14.7071L14.6697 13.2929Z"
      fill="currentColor"
    />
  </IconBase>
);

export default CloseIcon;
