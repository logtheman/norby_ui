import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Download: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Download</title>
    <rect
      x="4"
      y="15"
      width="16"
      height="5"
      rx="1.5"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 15V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
