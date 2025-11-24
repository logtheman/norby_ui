import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Eye: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Eye</title>
    <path
      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" strokeWidth="2" />
  </Icon>
);
