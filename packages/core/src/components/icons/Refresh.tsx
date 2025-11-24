import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Refresh: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Refresh</title>
    <path
      d="M3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 12L7 8M21 12L17 8M12 3L12 7M12 21L12 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
