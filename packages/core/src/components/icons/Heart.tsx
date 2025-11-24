import * as React from 'react';
import { Icon, IconProps } from '../Icon';

export const Heart: React.FC<Omit<IconProps, 'children'>> = (props) => (
  <Icon {...props}>
    <title>Heart</title>
    <path
      d="M20.84 4.61C20.33 4.1 19.72 3.7 19.05 3.43C18.38 3.16 17.66 3 16.93 3C16.2 3 15.48 3.16 14.81 3.43C14.14 3.7 13.53 4.1 13.02 4.61L12 5.63L10.98 4.61C9.95 3.58 8.58 3 7.07 3C5.56 3 4.19 3.58 3.16 4.61C2.13 5.64 1.55 7.01 1.55 8.52C1.55 10.03 2.13 11.4 3.16 12.43L4.18 13.45L12 21.27L19.82 13.45L20.84 12.43C21.35 11.92 21.75 11.31 22.02 10.64C22.29 9.97 22.45 9.25 22.45 8.52C22.45 7.79 22.29 7.07 22.02 6.4C21.75 5.73 21.35 5.12 20.84 4.61Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
