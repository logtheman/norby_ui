import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Warning: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Warning</title>
    <path
      d="M12 4L4 18H20L12 4Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9V13M12 17H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);
