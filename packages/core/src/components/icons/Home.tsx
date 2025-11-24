import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Home: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Home</title>
    <path
      d="M5 11L12 5L19 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 11.5V17.5C7.5 18.33 8.17 19 9 19H15C15.83 19 16.5 18.33 16.5 17.5V11.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.25 19V14.5H13.75V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
