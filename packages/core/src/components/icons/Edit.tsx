import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Edit: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Edit</title>
    <path
      d="M15.5 5.5L18.5 8.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 17L8 13L14.5 6.5L17.5 9.5L11 16L7 17Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M6 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
