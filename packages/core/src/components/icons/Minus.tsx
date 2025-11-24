import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Minus: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Minus</title>
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
      d="M8 12H16"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </Icon>
);
