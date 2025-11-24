import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const AlarmClock: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Alarm Clock</title>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path
      d="M12 6V12L16 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 3L3 5M21 3L23 5M6 18L4 20M18 18L20 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
