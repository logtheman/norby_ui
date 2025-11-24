import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Calendar: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Calendar</title>
    <rect
      x="4"
      y="5"
      width="16"
      height="15"
      rx="2.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M4 9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 3.5V6.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 3.5V6.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="12" r="1.1" fill="currentColor" />
    <circle cx="12.5" cy="14.5" r="1.1" fill="currentColor" />
    <circle cx="16" cy="12" r="1.1" fill="currentColor" />
  </Icon>
);
