import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function Usable(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M13.385 5.314A.5.5 0 0012.921 5h-1.843a.5.5 0 00-.464.314l-.146.365a.524.524 0 01-.334.302c-.373.115-.73.264-1.07.444a.524.524 0 01-.45.022l-.361-.154a.5.5 0 00-.55.106L6.398 7.702a.5.5 0 00-.106.55l.155.362a.524.524 0 01-.023.45 6.26 6.26 0 00-.444 1.07.524.524 0 01-.302.335l-.365.146a.5.5 0 00-.314.464v1.843a.5.5 0 00.314.464l.365.146a.524.524 0 01.303.334c.115.373.264.73.443 1.07.074.14.085.305.023.45l-.155.361a.5.5 0 00.106.55l1.304 1.304a.5.5 0 00.55.106l.36-.155a.523.523 0 01.451.023c.34.18.697.328 1.07.444.15.046.275.155.334.302l.146.365a.5.5 0 00.464.314h1.843a.5.5 0 00.464-.314l.146-.364a.523.523 0 01.334-.303 6.253 6.253 0 001.072-.444.524.524 0 01.45-.022l.36.154a.5.5 0 00.55-.106l1.304-1.303a.5.5 0 00.106-.55l-.154-.36a.523.523 0 01.022-.45c.18-.34.33-.699.445-1.072a.524.524 0 01.302-.335l.364-.145a.5.5 0 00.314-.464v-1.843a.5.5 0 00-.314-.464l-.363-.146a.524.524 0 01-.303-.334 6.264 6.264 0 00-.444-1.072.523.523 0 01-.023-.45l.154-.36a.5.5 0 00-.106-.551l-1.303-1.303a.5.5 0 00-.55-.106l-.361.154a.524.524 0 01-.45-.023 6.258 6.258 0 00-1.072-.444.524.524 0 01-.334-.302l-.146-.364zM12 17a5 5 0 100-10 5 5 0 000 10z"
        fill="currentColor"
        fillRule="evenodd"
        opacity={0.8}
      />
      <path
        d="M9.75 12l1.5 1.5 3-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </IconBase>
  );
}

export default Usable;
