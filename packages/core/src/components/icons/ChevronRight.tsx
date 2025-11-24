import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ChevronRight: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Chevron Right</title>
    <path
      d="M10 18L16 12L10 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
