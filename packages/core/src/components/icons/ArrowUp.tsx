import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ArrowUp: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Arrow Up</title>
    <path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
