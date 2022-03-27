import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function RepairTime(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M3.468 17.155a2.264 2.264 0 013.067-1.776l.675-.675a5.527 5.527 0 001.914 1.985l-1.187 1.186a2.264 2.264 0 01-3.13 1.688l1.393-.805a.5.5 0 00.25-.41l.031-.721a1 1 0 00-.538-.932l-.64-.333a.5.5 0 00-.48.01l-1.355.783zM20.528 6.838a2.264 2.264 0 01-3.068 1.776l-.674.675a5.527 5.527 0 00-1.914-1.984l1.187-1.187a2.264 2.264 0 013.13-1.687l-1.393.804a.5.5 0 00-.25.41l-.031.722a1 1 0 00.537.931l.641.333a.5.5 0 00.48-.01l1.355-.783z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M11.744 7A5 5 0 007 11.744h.994a.25.25 0 110 .5H7c.046.924.342 1.783.823 2.509l1.092-1.092a3.5 3.5 0 111.412 1.412l-1.092 1.091a4.973 4.973 0 002.509.824v-.994a.25.25 0 11.5 0v.994a5 5 0 004.744-4.744h-.994a.25.25 0 010-.5h.994A5 5 0 0012.244 7v.994a.25.25 0 01-.5 0V7z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M11.492 12.858a1 1 0 10-.363-.362l.004.006a1.008 1.008 0 00.359.356zm-2.985 2.26l2.26-2.26a1.512 1.512 0 00.363.362l-2.26 2.26a.256.256 0 01-.363-.362z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default RepairTime;
