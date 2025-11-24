import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ChevronLeft: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Chevron Left</title>
    <path
      d="M14 18L8 12L14 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
