import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Filter: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Filter</title>
    <path
      d="M4 6H20M7 12H17M10 18H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="7" cy="6" r="1.5" fill="currentColor" />
    <circle cx="17" cy="12" r="1.5" fill="currentColor" />
    <circle cx="14" cy="18" r="1.5" fill="currentColor" />
  </Icon>
);
