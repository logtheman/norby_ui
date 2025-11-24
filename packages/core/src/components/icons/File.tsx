import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const File: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>File</title>
    <path
      d="M14 2H6C5.45 2 5 2.45 5 3V21C5 21.55 5.45 22 6 22H18C18.55 22 19 21.55 19 21V8L14 2Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2V8H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 13H16M8 17H16M8 9H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
