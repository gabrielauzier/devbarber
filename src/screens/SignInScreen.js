import React, {useState, useContext} from 'react';
import {Box, Button, Center, VStack, Input, Text, Icon} from 'native-base';

import {UserContext} from '../contexts/UserContext';
import authApi from '../api/auth';
import Feather from 'react-native-vector-icons/Feather';
import BarberLogo from '../assets/barber.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/core';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSubmit = async () => {
    if (emailField !== '' && passwordField !== '') {
      let answer = await authApi.signIn(emailField, passwordField);
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
        alert('Email or password invalid.');
      }
    } else {
      alert('Put your data.');
    }
  };

  return (
    <Center flex={1} padding={8} bg="#63C2D1">
      <BarberLogo width="100%" height="160px" />

      <VStack margin={8} width="100%" space={4}>
        <Input
          placeholder="Email"
          bg="blue.200"
          borderRadius={30}
          borderColor="#00000000"
          placeholderTextColor="blue.700"
          paddingLeft={8}
          value={emailField}
          onChangeText={text => setEmailField(text)}
          InputLeftElement={
            <Icon left={4} as={Feather} name="mail" size={4} color="blue.700" />
          }
        />
        <Input
          bg="blue.200"
          placeholder="Password"
          borderRadius={30}
          borderColor="#00000000"
          placeholderTextColor="blue.700"
          paddingLeft={8}
          secureTextEntry={true}
          value={passwordField}
          onChangeText={text => setPasswordField(text)}
          InputLeftElement={
            <Icon left={4} as={Feather} name="lock" size={4} color="blue.700" />
          }
        />
        <Button
          width="100%"
          height={12}
          borderRadius={30}
          bg="blue.800"
          onPress={handleSubmit}>
          SIGN IN
        </Button>

        <Box justifyContent="center" flexDirection="row">
          <Text color="blue.700:alpha.70">Ainda não possui uma conta? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({routes: [{name: 'SignUp'}]});
            }}>
            <Text color="blue.900">Cadastre-se</Text>
          </TouchableOpacity>
        </Box>
      </VStack>
    </Center>
  );
};
