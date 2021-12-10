import React from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

import StarFull from '../assets/star.svg';
import StarHalf from '../assets/star_half.svg';
import StarEmpty from '../assets/star_empty.svg';
import {startDetecting} from 'react-native/Libraries/Utilities/PixelRatio';

export default ({rate, showStars}) => {
  let starsValues = ['empty', 'empty', 'empty', 'empty', 'empty'];
  let floor = Math.floor(rate);
  let left = rate - floor;

  for (var i = 0; i < floor; i++) {
    starsValues[i] = 'full';
  }

  if (left > 0) {
    starsValues[i] = 'half';
  }

  return (
    <HStack>
      {starsValues.map((value, key) => (
        <View key={key}>
          {value === 'empty' && (
            <StarEmpty width={16} height={16} fill="orange" />
          )}
          {value === 'half' && (
            <StarHalf width={16} height={16} fill="orange" />
          )}
          {value === 'full' && (
            <StarFull width={16} height={16} fill="orange" />
          )}
        </View>
      ))}
      {showStars && (
        <Text color="#737373" fontWeight="bold" marginLeft={2} fontSize={10}>
          {rate}
        </Text>
      )}
    </HStack>
  );
};
