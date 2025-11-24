import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Check: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Check</title>
    <path
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
