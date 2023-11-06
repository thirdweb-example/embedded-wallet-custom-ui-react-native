import React from 'react';
import Svg, {Circle, Line} from 'react-native-svg';

export const GoogleIcon = () => {
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
      <Circle cx="12" cy="12" r="10" />
      <Circle cx="12" cy="12" r="4" />
      <Line x1="21.17" x2="12" y1="8" y2="8" />
      <Line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <Line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </Svg>
  );
};
