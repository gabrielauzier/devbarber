import React, {useContext} from 'react';
import {HStack, Icon, Image} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {UserContext} from '../contexts/UserContext';

import CommunityMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);
  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <HStack
      height={60}
      bg="#4EADBE"
      space={8}
      alignItems="center"
      justifyContent="center">
      <TouchableOpacity onPress={() => goTo('Home')}>
        <Icon
          opacity={state.index === 0 ? 1 : 0.5}
          as={CommunityMaterial}
          size={6}
          name="home"
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo('Search')}>
        <Icon
          opacity={state.index === 1 ? 1 : 0.5}
          as={CommunityMaterial}
          size={6}
          name="magnify"
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 35,
          borderColor: '#4EADBE',
          borderWidth: 2,
          marginTop: -20,
        }}
        onPress={() => goTo('Appointments')}>
        <Icon
          opacity={state.index === 2 ? 1 : 0.5}
          as={CommunityMaterial}
          size={6}
          name="calendar-clock"
          color="#4EADBE"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo('Favorites')}>
        <Icon
          opacity={state.index === 3 ? 1 : 0.5}
          as={CommunityMaterial}
          size={6}
          name="heart-outline"
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo('Profile')}>
        {user.avatar !== '' ? (
          <Image source={{uri: user.avatar}} size={8} borderRadius={24} />
        ) : (
          <Icon
            opacity={state.index === 4 ? 1 : 0.5}
            as={CommunityMaterial}
            size={6}
            name="account-circle"
            color="white"
          />
        )}
      </TouchableOpacity>
    </HStack>
  );
};
