import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Share: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Share</title>
    <circle cx="18" cy="5" r="2.5" stroke="currentColor" fill="none" strokeWidth="2" />
    <circle cx="6" cy="12" r="2.5" stroke="currentColor" fill="none" strokeWidth="2" />
    <circle cx="18" cy="19" r="2.5" stroke="currentColor" fill="none" strokeWidth="2" />
    <path
      d="M15.5 6.5L8.5 10.5M8.5 13.5L15.5 17.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
