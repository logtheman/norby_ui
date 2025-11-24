import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const MoreHorizontal: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>More Horizontal</title>
    <circle cx="6" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="18" cy="12" r="1.5" fill="currentColor" />
  </Icon>
);
