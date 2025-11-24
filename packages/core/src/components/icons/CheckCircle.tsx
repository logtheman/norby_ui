import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const CheckCircle: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Check Circle</title>
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
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
