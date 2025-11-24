import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ArrowDown: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Arrow Down</title>
    <path
      d="M12 5V19M12 19L5 12M12 19L19 12"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
