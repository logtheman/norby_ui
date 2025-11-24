import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Unlock: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Unlock</title>
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
      d="M9 10V6C9 5.17 9.67 4.5 10.5 4.5C11.33 4.5 12 5.17 12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
