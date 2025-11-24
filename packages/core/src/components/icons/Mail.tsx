import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Mail: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Mail</title>
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="1.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M4 8L12 13L20 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
