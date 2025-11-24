import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const XCircle: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>X Circle</title>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M15 9L9 15M9 9L15 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
