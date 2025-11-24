import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Info: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Info</title>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
