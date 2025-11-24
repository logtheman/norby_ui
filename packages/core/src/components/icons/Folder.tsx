import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Folder: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Folder</title>
    <path
      d="M5 8H19C19.55 8 20 8.45 20 9V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V7C4 6.45 4.45 6 5 6H9L11 8H5Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
