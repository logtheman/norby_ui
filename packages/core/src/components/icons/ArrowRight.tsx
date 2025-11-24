import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ArrowRight: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Arrow Right</title>
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
