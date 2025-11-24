import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Image: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Image</title>
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
    <circle cx="8.5" cy="10.5" r="1.5" fill="currentColor" />
    <path
      d="M4 16L8 12L12 16L16 12L20 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
