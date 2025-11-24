import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Settings: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Settings</title>
    <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" strokeWidth="2" />
    <path
      d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Icon>
);
