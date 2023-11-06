import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

export const EmailIcon = () => {
  return (
    <Svg
      fill="none"
      height="24"
      stroke={'white'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24">
      <Rect height="16" rx="2" width="20" x="2" y="4" />
      <Path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
  );
};
