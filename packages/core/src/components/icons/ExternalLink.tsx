import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const ExternalLink: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>External Link</title>
    <path
      d="M18 13V19C18 19.55 17.55 20 17 20H5C4.45 20 4 19.55 4 19V7C4 6.45 4.45 6 5 6H11"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 3H21V9M10 14L21 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
