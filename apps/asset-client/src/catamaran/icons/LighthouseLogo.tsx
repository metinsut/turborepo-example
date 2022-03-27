import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fill: 'none',
    height: '40px',
    width: '40px'
  }
}));

function LighthouseLogo(props: IconBaseProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <IconBase className={clsx(className, classes.root)} fill="none" viewBox="0 0 40 43" {...rest}>
      <g opacity={0.5}>
        <path
          d="M19.558 5.544c0-.679.48-1.262 1.147-1.39L31.62 2.041A2 2 0 0134 4.006v3.076a2 2 0 01-2.38 1.964L20.705 6.934a1.416 1.416 0 01-1.147-1.39z"
          fill="url(#prefix__paint0_linear_lighthouselogo)"
        />
        <path
          d="M20.442 5.544c0-.679-.48-1.262-1.147-1.39L8.38 2.041A2 2 0 006 4.006v3.076a2 2 0 002.38 1.964l10.915-2.112a1.416 1.416 0 001.147-1.39z"
          fill="url(#prefix__paint1_linear_lighthouselogo)"
        />
      </g>
      <path
        d="M18.55 2.4l1-.75a.75.75 0 01.9 0l1 .75c.577.432.27 1.35-.45 1.35h-2c-.72 0-1.027-.918-.45-1.35zM24.064 14.104v.031l2.148 23.707a1.75 1.75 0 01-1.743 1.908h-9.22a1.75 1.75 0 01-1.742-1.908l2.147-23.707.001-.016v-.015l-.065-1.853a1.75 1.75 0 011.749-1.811h5.041c.99 0 1.784.821 1.75 1.811l-.066 1.853z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth={0.5}
      />
      <path
        d="M16.25 4a.75.75 0 01.75-.75h6a.75.75 0 01.75.75v2A1.75 1.75 0 0122 7.75h-4A1.75 1.75 0 0116.25 6V4z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth={0.5}
      />
      <path
        d="M19 5.5a1 1 0 112 0 1 1 0 01-2 0z"
        fill="#F3F5F6"
        stroke="#2B444A"
        strokeWidth={0.5}
      />
      <path
        d="M15.5 17h9v4H15l.5-4zM14.666 24H25l.5 4H14.316l.35-4zM14 31h11.458L26 35H13.5l.5-4z"
        fill="#F0552C"
      />
      <g filter="url(#prefix__filter0_d_lighthouselogo)">
        <path
          d="M24.064 14.104v.031l2.148 23.707a1.75 1.75 0 01-1.743 1.908h-9.22a1.75 1.75 0 01-1.742-1.908l2.147-23.707.001-.016v-.015l-.065-1.853a1.75 1.75 0 011.749-1.811h5.041c.99 0 1.784.821 1.75 1.811l-.066 1.853z"
          stroke="#2B444A"
          strokeWidth={0.5}
        />
      </g>
      <g filter="url(#prefix__filter1_d_lighthouselogo)">
        <rect fill="#F3F5F6" height={3} rx={1.5} width={12} x={14} y={8} />
        <rect height={3} rx={1.5} stroke="#2B444A" strokeWidth={0.5} width={12} x={14} y={8} />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint0_linear_lighthouselogo"
          x1={19.558}
          x2={34}
          y1={5.752}
          y2={5.752}
        >
          <stop stopColor="#EDC96E" />
          <stop offset={1} stopColor="#ECB86A" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint1_linear_lighthouselogo"
          x1={20.442}
          x2={6}
          y1={5.752}
          y2={5.752}
        >
          <stop stopColor="#EDC96E" />
          <stop offset={1} stopColor="#ECB86A" stopOpacity={0} />
        </linearGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={33.81}
          id="prefix__filter0_d_lighthouselogo"
          width={17.219}
          x={11.25}
          y={9.19}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix values="0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={7.5}
          id="prefix__filter1_d_lighthouselogo"
          width={16.5}
          x={11.75}
          y={6.75}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feColorMatrix values="0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0 0.286275 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </IconBase>
  );
}

export default LighthouseLogo;
