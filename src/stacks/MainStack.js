import React from 'react';
import PreloadScreen from '../screens/PreloadScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import BarberScreen from '../screens/BarberScreen';
import MainTab from './MainTab';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Preload" component={PreloadScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="Barber" component={BarberScreen} />
    <Stack.Screen name="MainTab" component={MainTab} />
  </Stack.Navigator>
);
