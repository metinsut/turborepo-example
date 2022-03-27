import { SvgIcon, SvgIconProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fill: 'none'
  }
}));

function LighthouseIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest}>
      <g opacity="0.5">
        <path
          d="M11.7344 3.32603C11.7344 2.91901 12.023 2.56917 12.4226 2.49187L18.0656 1.40025C19.2759 1.16611 20.3996 2.09328 20.3996 3.32603C20.3996 4.55878 19.2759 5.48595 18.0656 5.25182L12.4226 4.1602C12.023 4.08289 11.7344 3.73305 11.7344 3.32603Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M12.2646 3.32603C12.2646 2.91901 11.976 2.56917 11.5764 2.49187L5.93344 1.40025C4.72313 1.16611 3.59941 2.09329 3.59941 3.32603C3.59941 4.55878 4.72313 5.48595 5.93344 5.25182L11.5764 4.1602C11.976 4.08289 12.2646 3.73305 12.2646 3.32603Z"
          fill="url(#paint1_linear)"
        />
      </g>
      <path
        d="M12.2814 1.42237C12.6779 1.76227 12.4376 2.41205 11.9153 2.41205C11.393 2.41205 11.1526 1.76227 11.5492 1.42237C11.7599 1.2418 12.0707 1.2418 12.2814 1.42237Z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth="0.5"
      />
      <path
        d="M14.338 8.45843L14.3375 8.47412L14.3389 8.48976L15.5481 21.8421C15.6409 22.8667 14.834 23.7499 13.8052 23.7499H10.0252C8.99643 23.7499 8.18959 22.8667 8.28238 21.8421L9.49157 8.48976L9.49299 8.47412L9.49244 8.45843L9.48248 8.17526C9.44768 7.18527 10.2408 6.36377 11.2314 6.36377H12.5991C13.5897 6.36377 14.3828 7.18527 14.348 8.17526L14.338 8.45843Z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth="0.5"
      />
      <path
        d="M9.96875 2.97604C9.96875 2.59421 10.2783 2.28467 10.6601 2.28467H13.1705C13.5523 2.28467 13.8618 2.59421 13.8618 2.97605C13.8618 3.87779 13.1308 4.6088 12.2291 4.6088H11.6015C10.6998 4.6088 9.96875 3.87779 9.96875 2.97604Z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth="0.5"
      />
      <path
        d="M11.5371 3.28969C11.5371 3.08116 11.7062 2.91211 11.9147 2.91211C12.1232 2.91211 12.2923 3.08116 12.2923 3.28969C12.2923 3.49823 12.1232 3.66728 11.9147 3.66728C11.7062 3.66728 11.5371 3.49823 11.5371 3.28969Z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth="0.5"
      />
      <path d="M9.3 10.2002H14.7V12.6002H9L9.3 10.2002Z" fill="#F0552C" />
      <path d="M8.7002 14.3999H15.0002L15.3002 17.3999H8.7002V14.3999Z" fill="#F0552C" />
      <path d="M8.39961 19.2002H15.2746L15.5996 21.6002H8.09961L8.39961 19.2002Z" fill="#F0552C" />
      <path
        d="M14.338 8.45843L14.3375 8.47412L14.3389 8.48976L15.5481 21.8421C15.6409 22.8667 14.834 23.7499 13.8052 23.7499H10.0252C8.99643 23.7499 8.18959 22.8667 8.28238 21.8421L9.49157 8.48976L9.49299 8.47412L9.49244 8.45843L9.48248 8.17526C9.44768 7.18527 10.2408 6.36377 11.2314 6.36377H12.5991C13.5897 6.36377 14.3828 7.18527 14.348 8.17526L14.338 8.45843Z"
        stroke="#2B444A"
        strokeWidth="0.5"
      />
      <rect
        fill="#F3F5F6"
        height="1.8"
        rx="0.9"
        stroke="#2B444A"
        strokeWidth="0.5"
        width="7.2"
        x="8.40039"
        y="4.7998"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear"
          x1="11.7344"
          x2="20.3996"
          y1="3.45115"
          y2="3.45115"
        >
          <stop stopColor="#EDC96E" />
          <stop offset="1" stopColor="#ECB86A" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear"
          x1="12.2646"
          x2="3.59941"
          y1="3.45115"
          y2="3.45115"
        >
          <stop stopColor="#EDC96E" />
          <stop offset="1" stopColor="#ECB86A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export default LighthouseIcon;
