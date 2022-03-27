import IconBase, { IconBaseProps } from './IconBase';

type Props = IconBaseProps;

const SmartOffIcon = (props: Props) => (
  <IconBase {...props} viewBox="0 0 24 24">
    <mask fill="#fff" id="a">
      <path
        clipRule="evenodd"
        d="M12 5.25c-3 0-6 2.25-6 5.25 0 .857.306 1.836.743 2.85.04.092.13.15.228.15H17.03a.248.248 0 0 0 .228-.15c.437-1.014.743-1.993.743-2.85 0-3-3-5.25-6-5.25Z"
        fillRule="evenodd"
      />
    </mask>
    <path
      d="m17.257 13.35-.919-.395.919.396Zm-10.514 0-.918.396.918-.395ZM7 10.5c0-1.146.57-2.195 1.515-2.982A5.553 5.553 0 0 1 12 6.25v-2c-1.74 0-3.465.648-4.765 1.732C5.929 7.07 5 8.646 5 10.5h2Zm.662 2.455C7.238 11.973 7 11.147 7 10.5H5c0 1.067.374 2.2.825 3.246l1.837-.791Zm-.69 1.545h10.057v-2H6.97v2ZM17 10.5c0 .647-.238 1.473-.662 2.455l1.837.791c.451-1.047.825-2.18.825-3.246h-2Zm-5-4.25c1.26 0 2.535.477 3.485 1.268C16.429 8.305 17 9.354 17 10.5h2c0-1.854-.93-3.43-2.235-4.518A7.552 7.552 0 0 0 12 4.25v2Zm5.029 8.25c.493 0 .947-.291 1.146-.754l-1.837-.791a.752.752 0 0 1 .69-.455v2Zm-11.204-.754c.199.463.653.754 1.146.754v-2c.295 0 .57.175.69.455l-1.836.791Z"
      fill="currentColor"
      mask="url(#a)"
    />
    <path
      clipRule="evenodd"
      d="M16.46 14.25c.185 0 .305.193.223.358-.24.48-.494.96-.743 1.43-.8 1.513-1.549 2.932-1.66 3.963a.273.273 0 0 1-.263.249h-4a.273.273 0 0 1-.264-.25c-.11-1.03-.86-2.449-1.66-3.962-.248-.47-.502-.95-.742-1.43a.248.248 0 0 1 .222-.358h8.887Z"
      fill="currentColor"
      fillRule="evenodd"
    />
    <path
      d="M10.375 21h3.25a.25.25 0 0 1 .25.25v1.42a1 1 0 0 1-.695.952l-.875.28a1 1 0 0 1-.61 0l-.875-.28a1 1 0 0 1-.695-.952v-1.42a.25.25 0 0 1 .25-.25Z"
      fill="currentColor"
    />
  </IconBase>
);

export default SmartOffIcon;
