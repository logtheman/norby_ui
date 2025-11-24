import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const EyeOff: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Eye Off</title>
    <path
      d="M1 12C1 12 5 4 12 4C15 4 17.5 5.5 19 7.5M23 12C23 12 19 20 12 20C9 20 6.5 18.5 5 16.5M9 9L15 15M15 9L9 15"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
