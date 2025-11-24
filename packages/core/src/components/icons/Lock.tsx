import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Lock: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Lock</title>
    <rect
      x="6"
      y="10"
      width="12"
      height="10"
      rx="1.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9 10V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
