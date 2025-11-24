import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Close: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Close</title>
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
