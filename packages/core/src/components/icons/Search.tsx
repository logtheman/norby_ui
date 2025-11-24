import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Search: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Search</title>
    <circle
      cx="10.5"
      cy="10.5"
      r="6.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M16 16L20 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
