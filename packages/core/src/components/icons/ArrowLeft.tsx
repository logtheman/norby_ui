import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ArrowLeft: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Arrow Left</title>
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
