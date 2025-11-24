import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ChevronDown: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Chevron Down</title>
    <path
      d="M6 10L12 16L18 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
