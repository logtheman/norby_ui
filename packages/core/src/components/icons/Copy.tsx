import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Copy: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Copy</title>
    <rect
      x="9"
      y="9"
      width="10"
      height="10"
      rx="1.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M5 15H4C3.45 15 3 14.55 3 14V4C3 3.45 3.45 3 4 3H14C14.55 3 15 3.45 15 4V5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
