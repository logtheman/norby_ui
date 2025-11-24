import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Location: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Location</title>
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9" r="2.5" fill="currentColor" />
  </Icon>
);
