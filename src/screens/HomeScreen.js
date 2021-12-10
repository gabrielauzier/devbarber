import React, {useState, useEffect} from 'react';
import {Platform, RefreshControl} from 'react-native';
import {
  ScrollView,
  VStack,
  Text,
  HStack,
  Icon,
  Input,
  Spinner,
} from 'native-base';
import CommunityMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import CardItem from '../components/CardItem';

import barberApi from '../api/barber';

export default () => {
  const navigation = useNavigation();
  const [locationText, setLocationText] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [barbersList, setBarbersList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationFinder = async () => {
    setCoordinates(null);
    let result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result == 'granted') {
      setIsLoading(true);
      setLocationText('');
      setBarbersList([]);

      Geolocation.getCurrentPosition(info => {
        setCoordinates(info.coords);
        getBarbers();
      });
    }
  };

  const getBarbers = async () => {
    setIsLoading(true);
    setBarbersList([]);

    let latitude = null;
    let longitude = null;

    if (coordinates) {
      latitude = coordinates.lattitude;
      longitude = coordinates.longitude;
    }

    let answer = await barberApi.getBarbers(latitude, longitude, locationText);
    if (answer.error == '') {
      if (answer.loc) {
        setLocationText(answer.loc);
      }
      setBarbersList(answer.data);
    } else {
      alert('Error: ', answer.error);
    }

    setIsLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  const handleLocationSearch = () => {
    setCoordinates({});
    getBarbers();
  };

  useEffect(() => {
    getBarbers();
  }, []);

  return (
    <ScrollView
      bg="#63C2D1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <VStack justifyContent="center" margin={4} space={4}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <HStack
            space={6}
            margin={10}
            alignItems="center"
            justifyContent="center">
            <Text width={250} fontSize={24} color="white" fontWeight="bold">
              Find your favorite barber near to you
            </Text>
            <Icon
              as={CommunityMaterial}
              size={8}
              name="magnify"
              color="white"
            />
          </HStack>
        </TouchableOpacity>
        <Input
          placeholder="Where are you at?"
          bg="blue.700:alpha.50"
          borderRadius={30}
          borderColor="transparent"
          placeholderTextColor="white"
          tintColor="white"
          paddingLeft={8}
          color="white"
          value={locationText}
          onChangeText={text => {
            setLocationText(text);
          }}
          onEndEditing={handleLocationSearch}
          InputRightElement={
            <Icon
              right={4}
              as={CommunityMaterial}
              name="crosshairs-gps"
              size={6}
              color="white"
              onPress={handleLocationFinder}
            />
          }
        />

        {isLoading && <Spinner size="lg" color="white" marginTop={40} />}
        {barbersList.map((barber, key) => (
          <CardItem data={barber} key={key} />
        ))}
      </VStack>
    </ScrollView>
  );
};
