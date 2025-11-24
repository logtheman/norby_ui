import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Trash: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Trash</title>
    <rect
      x="6"
      y="6"
      width="12"
      height="14"
      rx="1.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M9 6V4C9 3.45 9.45 3 10 3H14C14.55 3 15 3.45 15 4V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M10 10V16M14 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
