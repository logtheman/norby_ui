import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ChevronUp: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Chevron Up</title>
    <path
      d="M18 14L12 8L6 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
