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
import Stars from './Stars';
import {useNavigation} from '@react-navigation/core';

export default ({data}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars,
    });
  };

  return (
    <Pressable onPress={handleClick} bg="white" padding={4} borderRadius={16}>
      <HStack space={8}>
        <Image
          size={20}
          source={{uri: data.avatar}}
          borderRadius={16}
          alt="barber"
        />
        <VStack space={2}>
          <Text color="black" fontSize={14} fontWeight="bold">
            {data.name}
          </Text>

          <Stars rate={data.stars} showStars={true} />
          <Button
            bg="white"
            padding={0}
            width={85}
            height={26}
            alignItems="center"
            justifyContent="center"
            borderRadius={10}
            borderColor="blue.700"
            borderWidth={1}
            _text={{color: 'blue.700', fontSize: 10}}>
            View Profile
          </Button>
        </VStack>
      </HStack>
    </Pressable>
  );
};
