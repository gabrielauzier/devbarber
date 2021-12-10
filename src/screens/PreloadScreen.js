import React, {useContext, useEffect} from 'react';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import authApi from '../api/auth';
import {UserContext} from '../contexts/UserContext';

import BarberLogo from '../assets/barber.svg';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#63C2D1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorageLib.getItem('token');
      if (token) {
        // validate token
        let answer = await authApi.checkToken(token);

        if (answer.token) {
          await AsyncStorageLib.setItem('token', answer.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: answer.data.avatar,
            },
          });

          navigation.reset({routes: [{name: 'MainTab'}]});
        } else {
          navigation.navigate('SignIn');
        }
      } else {
        // redirect to login screen
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BarberLogo width="100%" height="160px" />
    </SafeAreaView>
  );
};
