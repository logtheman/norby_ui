import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Menu: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Menu</title>
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Icon>
);
