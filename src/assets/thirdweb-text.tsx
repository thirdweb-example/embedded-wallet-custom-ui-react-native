import React from 'react';
import Svg, {Defs, LinearGradient, Stop, Text} from 'react-native-svg';

export const ThirdwebText = () => {
  return (
    <Svg height="30" width="160">
      <Defs>
        <LinearGradient id="gradientText0" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#bfa3da" />
          <Stop offset="50%" stopColor="#84309c" />
          <Stop offset="100%" stopColor="#c735b0" />
        </LinearGradient>
      </Defs>
      <Text
        fill="url(#gradientText0)"
        x="0"
        y="30" // Adjust y to position your text correctly
        fontSize={40}
        fontWeight={'bold'}>
        thirdweb
      </Text>
    </Svg>
  );
};
