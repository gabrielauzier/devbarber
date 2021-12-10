import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  View,
  Spinner,
  Box,
  Image,
  VStack,
  HStack,
  Button,
  Icon,
  Pressable,
} from 'native-base';
import {
  NavigationHelpersContext,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {TouchableOpacity} from 'react-native-gesture-handler';

import barberApi from '../api/barber';

import Swiper from 'react-native-swiper';

import CommunityMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../assets/back.svg';
import NavPrevIcon from '../assets/nav_prev.svg';
import NavNextIcon from '../assets/nav_next.svg';

import BarberModal from '../components/BarberModal';
import Stars from '../components/Stars';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalShowing, setIsModalShowing] = useState(false);

  const [barberInfo, setBarberInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });

  const handleFavoritedClick = () => {
    setFavorited(!favorited);
    barberApi.setFavorite(barberInfo.id);
  };

  const handleServiceChoose = key => {
    setSelectedService(key);
    setIsModalShowing(true);
    console.log('aquasdpasjjk');
  };

  useEffect(() => {
    const getBarberInfo = async () => {
      setIsLoading(true);
      let answer = await barberApi.getBarberById(barberInfo.id);
      if (answer.error == '') {
        setBarberInfo(answer.data);
        setFavorited(answer.data.favorited);
      } else {
        alert('Error: ', answer.error);
      }
      setIsLoading(false);
    };
    getBarberInfo();
  }, []);

  return (
    <>
      <ScrollView bg="white">
        {/* {barberInfo.photos && barberInfo.photos.length > 0 ? (
        <Swiper style={{height: 240}}></Swiper>
      ) : (
          )} */}
        <View bg="#63C2D1" height={240}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <BackButton
              style={{position: 'absolute', left: 0, right: 0}}
              width={44}
              height={44}
              fill="white"
            />
          </Pressable>
        </View>

        <View bg="white" borderTopLeftRadius={50} height="100%" marginTop={-20}>
          <Box marginX={8} marginTop={-5}>
            <HStack space={4}>
              <Image
                borderColor="white"
                borderWidth={2}
                borderRadius={12}
                size="lg"
                source={{uri: barberInfo.avatar}}
              />
              <VStack space={2} marginTop={10}>
                <Text color="black" fontWeight="bold" fontSize="md">
                  {barberInfo.name}
                </Text>
                <Stars rate={barberInfo.stars} showStars={true} />
              </VStack>
              <Pressable
                style={{
                  backgroundColor: 'white',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  borderColor: '#171717:alpha.10',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  marginLeft: 30,
                }}
                onPress={handleFavoritedClick}>
                {!favorited ? (
                  <Icon
                    as={CommunityMaterial}
                    size={6}
                    name="heart-outline"></Icon>
                ) : (
                  <Icon
                    as={CommunityMaterial}
                    size={6}
                    name="heart"
                    color="#F00"></Icon>
                )}
              </Pressable>
            </HStack>
          </Box>

          {isLoading ? (
            <Spinner size="lg" marginTop={30} />
          ) : (
            <View>
              <Box margin={8}>
                <VStack space={4}>
                  <Text fontSize={16} color="#268596" fontWeight="bold">
                    Services list
                  </Text>
                  {barberInfo.services &&
                    barberInfo.services.map((item, key) => (
                      <HStack key={key} justifyContent="space-between">
                        <VStack>
                          <Text fontSize={16} color="#268596" fontWeight="bold">
                            {item.name}
                          </Text>
                          <Text fontSize={14} color="#268596">
                            R$ {item.price.toFixed(2)}
                          </Text>
                        </VStack>
                        <Button
                          onPress={() => handleServiceChoose(key)}
                          borderRadius={10}>
                          Book
                        </Button>
                      </HStack>
                    ))}
                </VStack>
              </Box>

              {barberInfo.testimonials && barberInfo.testimonials.length > 0 && (
                <View marginBottom={30}>
                  <Swiper
                    style={{height: 110}}
                    showsPagination={false}
                    showsButtons={true}
                    prevButton={<NavPrevIcon size="md" fill="black" />}
                    nextButton={<NavNextIcon size="md" fill="black" />}>
                    {barberInfo.testimonials.map((item, key) => (
                      <VStack
                        key={key}
                        bg="#268596"
                        height={110}
                        marginX={10}
                        padding={4}
                        borderRadius={10}
                        space={2}>
                        <HStack justifyContent="space-between">
                          <Text color="white" fontWeight="bold">
                            {item.name}
                          </Text>
                          <Stars rate={item.rate} showStars={false} />
                        </HStack>
                        <Text color="white">{item.body}</Text>
                      </VStack>
                    ))}
                  </Swiper>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <BarberModal
        show={isModalShowing}
        setShow={setIsModalShowing}
        barber={barberInfo}
        service={selectedService}
      />
    </>
  );
};
