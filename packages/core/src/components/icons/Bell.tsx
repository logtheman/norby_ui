import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Bell: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Bell</title>
    <path
      d="M6 8C6 5.79 7.79 4 10 4H14C16.21 4 18 5.79 18 8V14C18 15.38 19.12 16.5 20.5 16.5H3.5C4.88 16.5 6 15.38 6 14V8Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 18.5C9 19.88 10.12 21 11.5 21H12.5C13.88 21 15 19.88 15 18.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
  </Icon>
);
