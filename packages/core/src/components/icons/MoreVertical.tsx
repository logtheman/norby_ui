import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const MoreVertical: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>More Vertical</title>
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
  </Icon>
);
