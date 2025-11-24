import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const User: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>User</title>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" fill="none" strokeWidth="2" />
    <path
      d="M5 20C5 16.5 8.13 14 12 14C15.87 14 19 16.5 19 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
