import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/core';
import authApi from '../api/auth';

export default () => {
  const navigation = useNavigation();

  const handleLogoutClick = async () => {
    await authApi.logout();
    navigation.reset({routes: [{name: 'SignIn'}]});
  };

  return (
    <SafeAreaView>
      <Button onPress={handleLogoutClick}>Exit</Button>
    </SafeAreaView>
  );
};
